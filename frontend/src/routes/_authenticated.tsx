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
    const { auth } = Route.useRouteContext();

    if (!auth) {
        return <Login />;
    }

    return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
    beforeLoad: async ({ context }) => {
        const queryClient = context.queryClient;

        try {
            const info = await queryClient.fetchQuery(userQueryOptions);

            return { auth: info };
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            }

            return { auth: null };
        }
    },
    component: Component,
});
