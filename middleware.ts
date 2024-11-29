import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up", "/api/auth/exchange", "/api/auth/refresh"],
  apiRoutes: ["/api/(.*)"],
  ignoredRoutes: ["/api/profiles/me"]
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

