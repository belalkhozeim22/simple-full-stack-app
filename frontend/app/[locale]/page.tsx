import { buttonVariants } from "@/components/ui/button";
import { getMeAction } from "@/features/auth/actions/protected.actions";
import { LoginButton } from "@/features/auth/components/login-button";
import { DashboardButton } from "@/features/dashboard/components/dashboard-button";
import { asyncHandler } from "@/lib/async-handler.utils";
import { capitalizeWords } from "@/lib/string.utils";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { data: currentUser } = await asyncHandler(getMeAction, true)();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl leading-10 font-semibold tracking-tight text-black dark:text-zinc-50">
            A simple Next.JS app.
          </h1>
          {!currentUser && (
            <ul className="max-w-md list-inside list-disc text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              <li>You add a user to Strapi.</li>
              <li>
                You go to
                <Link
                  href={"/login"}
                  className={buttonVariants({
                    variant: "link",
                  })}
                >
                  Login
                </Link>
                page.
              </li>
              <li>
                You can access the
                <Link
                  href={"/dashboard"}
                  className={buttonVariants({
                    variant: "link",
                  })}
                >
                  Dashboard
                </Link>
                and logout.
              </li>
            </ul>
          )}

          {currentUser && (
            <p className="max-w-md list-inside list-disc text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Welcome, {capitalizeWords(currentUser.username)}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          {!currentUser && <LoginButton />}

          {currentUser && <DashboardButton />}
        </div>
      </main>
    </div>
  );
}
