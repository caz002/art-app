import { Card } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
    component: About,
});

function About() {
    return (
        <div className="max-w-4xl m-auto">
            <Card>This is DailySketch! This is the about page!</Card>
        </div>
    );
}
