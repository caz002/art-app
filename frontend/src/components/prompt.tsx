import { Card, CardContent } from "@/components/ui/card";

export function PromptCard() {
    return (
        <Card className="flex flex-col items-center justify-center p-4 max-w-4xl">
            <h1 className="font-bold text-lg">Daily Prompt</h1>

            <CardContent className="w-full">
                <div className="p-3 bg-accent-foreground rounded-md text-gray-900 text-center">
                    <p>Draw a giant dog eating a hamburger</p>
                </div>
            </CardContent>
        </Card>
    );
}
