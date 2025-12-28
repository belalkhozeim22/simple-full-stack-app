"use client";

import { showToastFromError } from "@/hooks/show-error-toast";
import { useRouter } from "@/i18n/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { logoutAction } from "../actions/logout.action";

export const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: logoutAction, // The server action to call

    // This is the most important part!
    onSuccess: (data) => {
      toast.success("Seeeeeee Yaaaaaaa§!");

      if (data.redirectURL) {
        router.push(data.redirectURL);
      }
    },
    onError: (error) => {
      showToastFromError(error);
    },
  });
};
