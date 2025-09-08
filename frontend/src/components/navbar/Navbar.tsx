import { getSessionQueryOptions } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { NavProfile } from "./NavProfile";

export function NavBar() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { data: session } = useQuery(getSessionQueryOptions);

    async function signOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: getSessionQueryOptions.queryKey,
                    });
                    navigate({ to: "/login" });
                },
            },
        });
    }
    return (
        <NavigationMenu className="z-5 max-w-4xl mt-4 mb-4 flex justify-between">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link to="/">
                        <h1 className="text-2xl p-2">DailySketch!</h1>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>

            <div className="p-2 flex gap-4 items-center justify-between">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link to="/about">About</Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
                {session && (
                    <>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link to="/create">Create</Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                        <NavProfile session={session} signOut={signOut} />
                    </>
                )}
                {!session && (
                    <>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link to="/register">Register</Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link to="/login">Login</Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </>
                )}
            </div>
        </NavigationMenu>
    );
}
