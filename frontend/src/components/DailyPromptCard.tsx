import { useState } from "react";
import { useDataContext } from "../contexts/DataContextProvider";
import Canvas from "./Canvas";

const DailyPromptCard = () => {
    const { fetchImageData } = useDataContext();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("postImage", file);

        try {
            await fetch("http://localhost:5001/api/posts", {
                method: "POST",
                body: formData,
            });

            // refresh here
            fetchImageData();
        } catch (err) {
            console.error("Upload failed", err);
        }
    };

    return (
        <div className="container-border bg-indigo-200 p-4">
            <div className="flex flex-col items-center justify-center">
                <h2 className="mb-2 text-xl font-bold">Daily Prompt</h2>
                <div className="container-border text-lg break-words max-w-full bg-indigo-100 pl-30 pr-30 pt-2 pb-2">
                    This is a 10-word sample prompt for this lovely website.
                </div>

                <div className="flex gap-4 mt-4">
                    <button
                        className="button"
                        onClick={() => setIsPopupOpen(true)}
                    >
                        Canvas to Gallery
                    </button>

                    <label className="button cursor-pointer">
                        Upload to Gallery
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
            </div>

            {isPopupOpen && <Canvas onClose={() => setIsPopupOpen(false)} />}
        </div>
    );
};

export default DailyPromptCard;
