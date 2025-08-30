import { authClient } from "@/lib/auth-client";
import { type QueryClient } from "@tanstack/react-query";
import {
    Link,
    Outlet,
    createRootRouteWithContext,
    useNavigate,
} from "@tanstack/react-router";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

function ProfileMenu({
    session,
    signOut,
}: {
    session: { user: { id: string } };
    signOut: () => void;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Link
                    to="/profile/$userId"
                    params={{ userId: session.user.id }}
                    className="cursor-pointer [&.active]:font-bold"
                >
                    Profile
                </Link>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center" className="w-20">
                <DropdownMenuItem asChild>
                    <Link
                        to="/profile/$userId"
                        params={{ userId: session.user.id }}
                    >
                        <User />
                        My Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className=" text-red-600">
                    <LogOut />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

interface MyRouterContext {
    queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: Root,
});

function Root() {
    return (
        <div>
            <NavBar />
            <hr />
            <Outlet />
            <Toaster />
        </div>
    );
}

function NavBar() {
    const navigate = useNavigate();
    const {
        data: session,
        // isPending, //loading state
        // error, //error object
        // refetch, //refetch the session
    } = authClient.useSession();
    async function signOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    navigate({ to: "/login" });
                },
            },
        });
    }
    return (
        <div className="p-2 flex justify-between max-w-4xl m-auto items-baseline">
            <Link to="/" className="[&.active]:font-bold">
                <h1 className="text-2xl font-bold">DailySketch!</h1>
            </Link>{" "}
            <div className="p-2 flex gap-8">
                <Link to="/about" className="[&.active]:font-bold">
                    About
                </Link>
                {session && (
                    <>
                        {" "}
                        <Link to="/create" className="[&.active]:font-bold">
                            Create
                        </Link>
                        <ProfileMenu session={session} signOut={signOut} />
                    </>
                )}
                {!session && (
                    <>
                        {" "}
                        <Link to="/register" className="[&.active]:font-bold">
                            Register
                        </Link>
                        <Link to="/login" className="[&.active]:font-bold">
                            Login
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
