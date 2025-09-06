import { useQuery, type QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { getSessionQueryOptions } from "@/lib/api";
import { NavBar } from "@/components/navbar/Navbar";
import { Toaster } from "sonner";

interface MyRouterContext {
    queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: Root,
});

function Root() {
    useQuery(getSessionQueryOptions);

    return (
        <div className="max-w-4xl m-auto">
            <NavBar />
            <Outlet />
            <Toaster />
        </div>
    );
}
