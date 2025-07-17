import MainTitle from "../components/MainTitle";
import DailyPromptCard from "../components/DailyPromptCard";
import Gallery from "../components/Gallery";

export default function Home() {
    return (
        <div className="font-display flex flex-col justify-center items-align m-auto max-w-7xl p-8">
            <MainTitle />
            <DailyPromptCard />
            <Gallery />
        </div>
    );
}
