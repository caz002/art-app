import { Suspense, lazy } from "react";
const DailyPromptCard = lazy(() => import("../components/DailyPromptCard"));
const Gallery = lazy(() => import("../components/Gallery"));
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className="bg-indigo-400">
        <NavBar />

        <div className="font-display flex flex-col justify-center items-align m-auto max-w-6xl p-8 gap-10 mt-30">
          <div className="flex flex-col items-center">
            <img src="/DailySketchTempLogo.svg" alt="DailySketch Temp Logo" />
          </div>
          <DailyPromptCard />
          <Gallery />
        </div>
      </div>
    </Suspense>
  );
}
