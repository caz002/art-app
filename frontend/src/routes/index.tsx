import { createFileRoute } from "@tanstack/react-router";
import { PromptCard } from "@/components/prompts/prompt";
import { HomeGallery } from "@/components/gallery/HomeGallery";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="grid gap-4">
      <PromptCard />
      <HomeGallery />
    </div>
  );
}
