
import { useQuery } from "@tanstack/react-query"
import { fetchResources } from "../services/api"

export function useResourceData() {
  return useQuery({
    queryKey: ["resources"],
    queryFn: fetchResources,

    // Keep fetched resource data fresh for 5 minutes.
    // During this time, TanStack Query can reuse the cached data
    // instead of making another API request.
    staleTime: 5 * 60 * 1000,

    // Keep unused cached data for 10 minutes.
    gcTime: 10 * 60 * 1000,

    // Avoid unnecessary refetching when the user returns to the tab.
    refetchOnWindowFocus: false,

    // Retry failed requests twice before showing the error state.
    retry: 2,
  })
}

