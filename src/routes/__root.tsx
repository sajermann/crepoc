import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { VerifyAuth } from "~/shared/components/VerifyAuth";

// eslint-disable-next-line react-refresh/only-export-components
function InjectProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryClientProvider
        client={
          new QueryClient({
            defaultOptions: {
              queries: {
                refetchOnWindowFocus: false,
                retry: false,
                // cacheTime: 1000 * 60 * 60 * 24, // 24 hours
                // staleTime: 1000, // 1 Second to void multiples call api
              },
            },
          })
        }
      >
        <VerifyAuth />
        {children}
      </QueryClientProvider>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const RootLayout = () => (
  <InjectProvider>
    <Outlet />
    <TanStackRouterDevtools position="bottom-right" />
  </InjectProvider>
);

export const Route = createRootRoute({ component: RootLayout });
