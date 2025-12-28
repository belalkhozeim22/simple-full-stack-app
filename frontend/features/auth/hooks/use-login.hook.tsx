"use client";

import { showToastFromError } from "@/hooks/show-error-toast";
import { useRouter } from "@/i18n/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { loginAction } from "../actions/login.actions";
import { useSearchParams } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return useMutation({
    mutationFn: loginAction, // The server action to call

    // This is the most important part!
    onSuccess: (data) => {
      toast.success("Welcome Back!");

      const callbackUrl = searchParams.get("callbackUrl");

      if (callbackUrl) {
        router.push(callbackUrl);
        return;
      }

      if (data.redirectURL) {
        router.push(data.redirectURL);
      }
    },
    onError: (error) => {
      showToastFromError(error);
    },
  });
};
