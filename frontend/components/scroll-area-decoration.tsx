import { cn } from "@/lib/utils";
import { Empty } from "./ui/empty";
import { ClassNameValue } from "tailwind-merge";

export const ScrollAreaDecoration = ({
  position,
  className,
}: {
  position: "top" | "right" | "bottom" | "left";
  className?: ClassNameValue;
}) => {
  return (
    <Empty
      className={cn(
        "from-card absolute rounded-none border-0 to-transparent opacity-75 outline-0",
        {
          "inset-x-0 top-0 bg-linear-to-b": position === "top",
          "inset-y-0 right-0 bg-linear-to-l": position === "right",
          "inset-x-0 bottom-0 bg-linear-to-t": position === "bottom",
          "inset-y-0 left-0 bg-linear-to-r": position === "left",
        },
        className,
      )}
    />
  );
};
