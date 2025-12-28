import { buttonVariants } from "@/components/ui/button";
import { DashboardMainCard } from "@/features/dashboard/components/dashboard-main-card";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center">
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
      <DashboardMainCard />
    </div>
  );
};

export default DashboardPage;
