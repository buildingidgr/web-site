import { authMiddleware } from "@clerk/nextjs";

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_WEB_URL || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up"],
  apiRoutes: ["/api/(.*)"],
  ignoredRoutes: ["/api/auth/exchange", "/api/auth/refresh"],
  beforeAuth: (req) => {
    if (req.method === 'OPTIONS') {
      return new Response(null, { 
        status: 204, 
        headers: corsHeaders 
      });
    }
  },
  afterAuth: (auth, req, evt) => {
    evt.headers.set('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
    evt.headers.set('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
    evt.headers.set('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

