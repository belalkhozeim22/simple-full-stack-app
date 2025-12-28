import { buttonVariants } from "@/components/ui/button";
import { LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";

export const DashboardButton = () => {
  return (
    <Link href={"/dashboard"} className={buttonVariants()}>
      <LayoutDashboardIcon /> Dashboard
    </Link>
  );
};
