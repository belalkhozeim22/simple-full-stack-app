import { buttonVariants } from "@/components/ui/button";
import { LoginFormCard } from "@/features/auth/components/login-form-card";
import { sleep } from "@/lib/helpers.utils";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

const LoginPage = async () => {
  await sleep(1);
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href={"/"}
          className={buttonVariants({
            variant: "default",
            size: "icon-lg",
            className: "mx-auto",
          })}
        >
          <HomeIcon />
        </Link>

        <LoginFormCard />
      </div>
    </div>
  );
};

export default LoginPage;
