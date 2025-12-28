import { buttonVariants } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <Link href={"/login"} className={buttonVariants()}>
      <LogInIcon /> Login
    </Link>
  );
};
