"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export const SearchParamsToast = () => {
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  useEffect(() => {
    if (!callbackUrl) return;

    toast.warning(`You can't access (${callbackUrl}) page. Login First!`);
  }, [callbackUrl]);
  return <></>;
};
