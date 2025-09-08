import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import { LogOut, User } from "lucide-react";

export function NavProfile({
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
                    className="cursor-pointer"
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
                <DropdownMenuItem onClick={signOut}>
                    <LogOut />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
