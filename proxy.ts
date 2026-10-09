import { NextRequest, NextResponse } from "next/server";
import { RECEIPT_COOKIE, verifyLeadReceipt } from "@/lib/lead-receipt";

export function proxy(request: NextRequest) {
  const id = verifyLeadReceipt(request.cookies.get(RECEIPT_COOKIE)?.value, process.env.CRM_LEAD_INTAKE_API_KEY);
  if (!id) return NextResponse.redirect(new URL("/", request.url));
  const headers = new Headers(request.headers);
  headers.set("x-dolce-lead-event", id);
  const response = NextResponse.next({ request: { headers } });
  // Consume the receipt so refresh/back/direct visits cannot fire a second page conversion.
  response.cookies.delete(RECEIPT_COOKIE);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
export const config = { matcher: ["/thank-you"] };
