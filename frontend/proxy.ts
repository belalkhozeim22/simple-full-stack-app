import { hasLocale } from "next-intl";
import createMiddleware from "next-intl/middleware";
import { NextProxy, NextResponse } from "next/server";
import { checkAuthCookies } from "./features/auth/actions/auth-cookies.actions";
import { routing } from "./i18n/routing";
import { getEnv } from "./lib/env.utils";

const publicRoutes = ["/"];

const authRoutes = [
  "/login",
  "/register",
  // "/forgot-password"
];

const createPathnameRegex = (routes: string[]) =>
  RegExp(
    `^(/(${routing.locales.join("|")}))?(${routes
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );

const publicPathnameRegex = createPathnameRegex(publicRoutes);
const authPathnameRegex = createPathnameRegex(authRoutes);

const handleI18nRouting = createMiddleware(routing);

const proxy: NextProxy = async (request) => {
  const { pathname } = request.nextUrl;

  const locale = pathname.split("/")[1];
  const isValidLocale = hasLocale(routing.locales, locale);
  if (!isValidLocale) return handleI18nRouting(request);

  const isPublicPage = publicPathnameRegex.test(pathname);
  if (isPublicPage) return handleI18nRouting(request);

  const hasAuthCookies = await checkAuthCookies();
  const isAuthPage = authPathnameRegex.test(pathname);
  if (hasAuthCookies) {
    if (!isAuthPage) return handleI18nRouting(request);

    const dashboardUrl = new URL(
      `/${locale}${getEnv("AFTER_LOGIN_REDIRECT_URL")}`,
      request.url,
    );

    return NextResponse.redirect(dashboardUrl);
  }

  if (isAuthPage) return handleI18nRouting(request);

  const signInUrl = new URL(
    `/${locale}${getEnv("AFTER_LOGOUT_REDIRECT_URL")}`,
    request.url,
  );
  signInUrl.searchParams.set(
    "callbackUrl",
    pathname.replace(new RegExp(`^/${locale}`), ""),
  );

  return NextResponse.redirect(signInUrl);
};

export default proxy;

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
