import { type QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import { NavBar } from "@/components/navbar/Navbar";
import { Toaster } from "sonner";

interface MyRouterContext {
    queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: Root,
});

function Root() {
    return (
        <div className="max-w-4xl m-auto">
            <NavBar />
            <Outlet />
            <Toaster />
        </div>
    );
}
