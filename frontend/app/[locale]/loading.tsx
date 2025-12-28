import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center">
      <p
        className={buttonVariants({
          variant: "ghost",
          size: "icon-lg",
          className: "mx-auto",
        })}
      >
        <Skeleton className="size-9" />
      </p>
      <Card className="container mx-auto mt-3 max-w-sm">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-4 w-44" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-3 w-32" />
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <Skeleton className="h-28 w-full" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-9 w-24" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default loading;
