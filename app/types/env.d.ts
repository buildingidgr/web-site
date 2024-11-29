declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_PROFILE_API_URL: string;
      NEXT_PUBLIC_AUTH_API_URL: string;
      NEXT_PUBLIC_WEB_URL: string;
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
      CLERK_SECRET_KEY: string;
    }
  }
}

export {} 