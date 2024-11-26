# MechHub Public Site

This is the public site for MechHub, built with Next.js and custom authentication using Clerk's API.

## Features

- Custom sign-up and sign-in pages
- Integration with Clerk's authentication API
- Responsive design using Tailwind CSS
- Accessible UI components from shadcn/ui

## Deployment to Railway

To deploy this project to Railway, follow these steps:

1. Push your code to a GitHub repository.

2. Go to [Railway](https://railway.app/) and create a new project.

3. Choose "Deploy from GitHub repo" and select your repository.

4. In the Railway dashboard, go to the "Variables" tab and add the following environment variables:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
   - `CLERK_SECRET_KEY`: Your Clerk secret key

5. Railway will automatically detect that this is a Next.js project and set up the build and start commands for you.

6. Once deployed, Railway will provide you with a URL for your application.

## Clerk Setup

1. Sign up for a Clerk account at [https://clerk.com/](https://clerk.com/)
2. Create a new application in the Clerk dashboard
3. In your application settings, add the following to your "Allowed Origins":
   - `http://localhost:3000`
   - Your Railway deployment URL (once you have it)
4. Copy your Clerk Publishable Key and Secret Key from the Clerk dashboard

## Local Development

To run this project locally:

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env.local` file in the root directory and add your Clerk keys:

