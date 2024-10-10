import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "./services/AuthService";

const authRoutes = ["/login", "/register"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  USER: [/^\/user-dashboard/],
  ADMIN: [/^\/admin-dashboard/],
};

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const user = await getCurrentUser();

  if (!user) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}${search}`, request.url)
      );
    }
  }

  if (
    pathname === "/postDetails" ||
    pathname === "/profile" ||
    pathname === "/user-profile"
  ) {
    return NextResponse.next();
  }

  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const routes = roleBasedRoutes[user?.role as Role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/postDetails",
    "/profile",
    "/user-profile",
    "/user-dashboard",
    "/admin-dashboard",
    "/user-dashboard/:page*",
    "/admin-dashboard/:page*",
  ],
};