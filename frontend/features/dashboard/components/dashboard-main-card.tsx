"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLogout } from "@/features/auth/hooks/use-logout.hook";
import { LogOutIcon } from "lucide-react";

export const DashboardMainCard = () => {
  const { mutate: logout, isPending } = useLogout();

  return (
    <Card className="container mx-auto mt-3 max-w-xs">
      <CardHeader>
        <CardTitle>Main dashboard page</CardTitle>
        <CardDescription>The page where you can logout</CardDescription>
      </CardHeader>
      <Separator />
      <CardFooter>
        <Button
          variant={"destructive"}
          onClick={() => {
            logout();
          }}
          disabled={isPending}
        >
          <LogOutIcon /> Logout
        </Button>
      </CardFooter>
    </Card>
  );
};
