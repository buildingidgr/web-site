import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up"],
  apiRoutes: ["/api/(.*)"],
  ignoredRoutes: ["/api/auth/exchange", "/api/auth/refresh"]
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

