import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from 'next/server';

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
      return NextResponse.json({}, { 
        status: 204, 
        headers: corsHeaders 
      });
    }
  },
  afterAuth: (auth, req) => {
    const response = NextResponse.next();
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

