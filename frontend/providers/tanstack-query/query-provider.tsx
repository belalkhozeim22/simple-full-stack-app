"use client";

import { getEnv } from "@/lib/env.utils";
import { queryClient } from "./query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {getEnv('NEXT_PUBLIC_SHOW_REACT_QUERY_DEV_TOOLS',{defaultValue: 'false'})==='true' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
