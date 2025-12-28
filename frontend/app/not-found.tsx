import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "Not Found!",
  description: "This page is not found!",
};

const NotFoundPage = () => {
  return (
    <body className="dark">
      <div className="bg-background grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
          <h2 className="mb-6 text-5xl font-semibold">Whoops!</h2>
          <h3 className="mb-1.5 text-3xl font-semibold">
            This page is not found!
          </h3>
          <p className="text-muted-foreground mb-6 max-w-sm">
            We suggest you back to home.
          </p>
          <Button asChild size="lg" className="rounded-lg text-base">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/">Back to home page</a>
          </Button>
        </div>

        {/* Right Section: Illustration */}
        <div className="relative max-h-screen w-full p-2 max-lg:hidden">
          <div className="h-full w-full rounded-2xl bg-black"></div>
          <Image
            src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/error/image-1.png"
            alt="404 illustration"
            width={704}
            height={407}
            className="absolute top-1/2 left-1/2 h-[clamp(260px,25vw,406px)] -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </body>
  );
};

export default NotFoundPage;
