import { isIP } from "node:net";

/*
 * The lead-intake route forwards names, phones and emails to a CRM whose base
 * URL comes from an environment variable. That value must never be able to
 * point the server at itself or an internal address (SSRF), so every host is
 * validated before the first byte is sent: http/https only, no local or
 * internal names, and IP literals must be global unicast.
 *
 * Ranges are checked with plain integer math: on this Node (v24) BlockList
 * returns false for every IPv6 lookup, including exact addresses.
 */
const ipv4ToInt = (host: string): number =>
  host.split(".").reduce((acc, octet) => acc * 256 + Number(octet), 0);

const cidr4 = (base: string, bits: number): [number, number] => {
  const start = ipv4ToInt(base);
  return [start, start + (1 << (32 - bits)) - 1];
};

const ipv6ToBigInt = (host: string): bigint | null => {
  const bare = host.split("%")[0].toLowerCase();
  if (!bare.includes(":")) return null;
  const halves = bare.split("::");
  if (halves.length > 2) return null;
  const head = halves[0] === "" ? [] : halves[0].split(":");
  const tail = halves.length === 2 && halves[1] !== "" ? halves[1].split(":") : [];
  const groups = [...head, ...tail];
  if (groups.some((g) => !/^[0-9a-f]{1,4}$/.test(g))) return null;
  const missing = 8 - groups.length;
  if (halves.length === 2 ? missing < 0 : missing !== 0) return null;
  const full = [...head, ...Array(halves.length === 2 ? missing : 0).fill("0"), ...tail];
  /* No BigInt literals: tsconfig targets ES2017, which forbids them. */
  return full.reduce((acc, g) => (acc << BigInt(16)) + BigInt(parseInt(g, 16)), BigInt(0));
};

const cidr6 = (base: string, bits: number): [bigint, bigint] => {
  const start = ipv6ToBigInt(base);
  if (start === null) throw new Error(`invalid IPv6 range base: ${base}`);
  return [start, start + (BigInt(1) << BigInt(128 - bits)) - BigInt(1)];
};

const inRange = (n: number | bigint, [lo, hi]: [number, number] | [bigint, bigint]) => n >= lo && n <= hi;

const BLOCKED_IPV4: [number, number][] = [
  cidr4("0.0.0.0", 8), cidr4("10.0.0.0", 8), cidr4("100.64.0.0", 10), cidr4("127.0.0.0", 8),
  cidr4("169.254.0.0", 16), cidr4("172.16.0.0", 12), cidr4("192.0.0.0", 24), cidr4("192.0.2.0", 24),
  cidr4("192.88.99.0", 24), cidr4("192.168.0.0", 16), cidr4("198.18.0.0", 15), cidr4("198.51.100.0", 24),
  cidr4("203.0.113.0", 24), cidr4("224.0.0.0", 3),
];

/** Global unicast IPv6 is 2000::/3; the entries below shrink it further. */
const GLOBAL_IPV6 = cidr6("2000::", 3);
const BLOCKED_IPV6: [bigint, bigint][] = [
  cidr6("2001::", 32), cidr6("2001:db8::", 32), cidr6("2001:10::", 28), cidr6("2001:20::", 28),
  cidr6("2620:db8::", 32),
];

const BLOCKED_HOST_SUFFIXES = [".localhost", ".local", ".internal", ".home.arpa", ".corp", ".lan"] as const;

/** Returns the validated CRM intake endpoint, or throws an operator-facing error. */
export function crmIntakeUrl(base: string): URL {
  let url: URL;
  try {
    url = new URL(base);
  } catch {
    throw new Error("CRM_BASE_URL must be a valid absolute http(s) URL.");
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("CRM_BASE_URL must use the http or https protocol.");
  }
  if (url.username || url.password) {
    throw new Error("CRM_BASE_URL must not embed credentials.");
  }
  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (host === "localhost" || BLOCKED_HOST_SUFFIXES.some((s) => host.endsWith(s))) {
    throw new Error("CRM_BASE_URL must not target local or internal hostnames.");
  }
  const family = isIP(host);
  if (family === 4 && BLOCKED_IPV4.some((r) => inRange(ipv4ToInt(host), r))) {
    throw new Error("CRM_BASE_URL must not target loopback, private or reserved addresses.");
  }
  const ipv6 = family === 6 ? ipv6ToBigInt(host) : null;
  if (ipv6 !== null && !(inRange(ipv6, GLOBAL_IPV6) && !BLOCKED_IPV6.some((r) => inRange(ipv6, r)))) {
    throw new Error("CRM_BASE_URL must not target loopback, private or reserved addresses.");
  }
  /* Same concatenation the route always used, so path-mounted CRM bases keep working. */
  return new URL(`${base}/api/leads/intake`);
}
