import { Card } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

export default function UserCard({
  img,
  name,
  githubLink,
}: {
  img: string;
  name: string;
  githubLink: string;
}) {
  return (
    <Card className="flex flex-row flex-1 text-xl gap-10 p-8">
      <Card className="p-0">
        <img
          className="w-20 h-20 rounded-md"
          src={img}
          onClick={() =>
            window.open(githubLink, "_blank", "noopener,noreferrer")
          }
        />
      </Card>
      <div className="flex flex-col">
        <div>
          <span className="font-medium pr-2">Name:</span>
          <span className="font-normal">{name}</span>
        </div>
      </div>
    </Card>
  );
}
function About() {
  return (
    <div className="max-w-4xl m-auto text-lg">
      <Card>
        <div className="p-8 flex flex-col gap-10 font-normal">
          <div className="text-bold text-3xl font-semibold">About</div>
          DailySketch is a habit tracking site that encourages people to draw
          and share their creations, with creative daily prompt suggestions.
          <div className="text-3xl font-semibold">Dev Team</div>
          <div className="flex flex-row flex-1 gap-10">
            <UserCard
              img="https://avatars.githubusercontent.com/Hiroeme"
              name="Hiroeme"
              githubLink="https://github.com/Hiroeme"
            />
            <UserCard
              img="https://avatars.githubusercontent.com/caz002"
              name="caz002"
              githubLink="https://github.com/caz002"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
