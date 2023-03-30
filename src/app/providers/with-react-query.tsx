import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"

export const withReactQuery = (component: () => React.ReactNode) => {
    const queryClient = new QueryClient()
    return () => (
        <QueryClientProvider client={queryClient}>
            {component()}
        </QueryClientProvider>
    )
}