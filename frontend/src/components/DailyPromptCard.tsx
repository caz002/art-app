import { useState, useEffect } from "react";
import { useDataContext } from "../contexts/DataContextProvider";
import Canvas from "./Canvas";
import { createPost } from "../api";

const DailyPromptCard = () => {
  const { fetchImageData } = useDataContext();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [prompt, setPrompt] = useState<string>("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("postImage", file);
    try {
      await createPost(formData);
      // refresh here
      fetchImageData();
    } catch (err) {
      // authorization error check here and ask user to relog again
      console.error("Upload failed", err);
    }
  };
  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await fetch("http://localhost:5001/prompt/gemini");
        const result = await response.json();
        setPrompt(result);
      } catch (error) {
        setPrompt("ERROR");
        console.log("Error fetching prompt: ", error);
      }
    };
    fetchPrompt();
  }, []);

  return (
    <div className="bg-[#3B3682] flex flex-col items-center justify-center px-10 py-10 rounded-3xl gap-6">
      <div className="text-3xl font-bold text-indigo-300">
        Today's Drawing Prompt
      </div>
      <div className="flex flex-1 w-full bg-indigo-50 px-10 py-2 rounded-3xl text-[#3B3682] items-center justify-between text-xl border-4 border-solid border-indigo-300">
        <div>{prompt == "" ? "Loading..." : prompt}</div>
        <div className="rounded-3xl border-4 border-solid border-indigo-300 text-indigo-400 px-4 py-2 ">
          Add Post
        </div>
      </div>

      {/* <div className="flex gap-4 mt-4">
        <button className="button" onClick={() => setIsPopupOpen(true)}>
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
      </div> */}

      {isPopupOpen && <Canvas onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default DailyPromptCard;
