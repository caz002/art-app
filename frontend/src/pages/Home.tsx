import { useEffect, useState } from "react";
import MainTitle from "../components/MainTitle";
import DailyPromptCard from "../components/DailyPromptCard";
import Gallery from "../components/Gallery";

type ImageData = {
    id: number;
    imageKey: string;
    createdAt: string;
    updatedAt: string;
    authorId: number;
    imageUrl: string;
};

export default function Home() {
    const [imageData, setImageData] = useState<ImageData[]>([]);

    useEffect(() => {
        const fetchImageData = async () => {
            fetch("http://localhost:5001/api/posts", {
                method: "GET",
            })
                .then((data) => data.json())
                .then((data) => setImageData(data));
        };
        fetchImageData();
    }, []);

    return (
        <div className="font-display flex flex-col justify-center items-align m-auto max-w-7xl p-8">
            <MainTitle />
            <DailyPromptCard />
            <Gallery data={imageData} />
        </div>
    );
}
