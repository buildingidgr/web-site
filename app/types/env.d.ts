declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_PROFILE_SERVICE_INTERNAL: string;
      NEXT_PUBLIC_AUTH_SERVICE_INTERNAL: string;
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
      CLERK_SECRET_KEY: string;
    }
  }
}

export {} 