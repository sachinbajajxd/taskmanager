import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // publicRoutes: ["/"], // Include the root path as public
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
