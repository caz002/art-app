import { UserData } from "@/lib/types";
import { Card, CardContent } from "../ui/card";

export function ProfileInfo(user: UserData) {
    return (
        <Card>
            <CardContent>
                <div className="m-auto flex gap-x-2">
                    <p>
                        <b>Joined </b>
                        {new Date(user.createdAt).toDateString()}
                    </p>
                    <p>
                        <b>Likes </b>
                        {user.likes}
                    </p>
                    <p>
                        <b>Occupation </b>
                        {user.occupation}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
