import { NextRequest, NextResponse } from "next/server";

/**
 * /thank-you is a conversion page, not a destination anyone should reach by
 * typing the URL. Both cookies below are dropped only when a real lead
 * submission happens:
 *  - `lp_lead_ok`   set client-side by the lead form right before redirecting
 *  - `lp_lead_srv`  httpOnly, set by /api/lead-intake on every intake attempt
 * Anyone arriving with neither is bounced to the homepage.
 */
export function middleware(request: NextRequest) {
  const allowed =
    request.cookies.has("lp_lead_ok") || request.cookies.has("lp_lead_srv");
  if (allowed) return NextResponse.next();
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/thank-you"],
};
