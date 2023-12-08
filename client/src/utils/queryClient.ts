import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 60, 
            cacheTime: 1000 * 60 * 60 * 2,
            retry: false,
            refetchInterval: 1000 * 60 * 60,
            refetchIntervalInBackground: true,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
        },
    },
});
