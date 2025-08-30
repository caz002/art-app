import { createFileRoute, Outlet } from "@tanstack/react-router";
import { userQueryOptions } from "../lib/api";
import { Button } from "@/components/ui/button";

const Login = () => {
    return (
        <div className="flex flex-col gap-y-2 max-w-3xl m-auto">
            <p>You have to login to create sketches!</p>
            <Button asChild>
                <a href="/login">Login</a>
            </Button>
            <Button asChild>
                <a href="/register">Register</a>
            </Button>
        </div>
    );
};

const Component = () => {
    const { userId } = Route.useRouteContext();

    if (!userId) {
        return <Login />;
    }

    return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
    beforeLoad: async ({ context }) => {
        // check if user is logged in
        const queryClient = context.queryClient;

        try {
            const data = await queryClient.fetchQuery(userQueryOptions);

            return data;
        } catch (e) {
            return { userId: null };
        }
    },
    component: Component,
});
