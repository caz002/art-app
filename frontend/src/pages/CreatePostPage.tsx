import { useNavigate } from "react-router-dom";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { useDataContext } from "../contexts/DataContextProvider";

export default function CreatePost() {
    const [file, setFile] = useState<File | null>(null);
    const [caption, setCaption] = useState<string>("");
    const navigate = useNavigate();
    const { imageData, setImageData } = useDataContext();

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!file) return;

        const formData = new FormData();
        formData.append("postImage", file);
        formData.append("caption", caption);

        const response = await fetch("http://localhost:5001/api/posts", {
            method: "POST",
            body: formData,
        });
        if (response.ok) {
            setImageData([...imageData, formData]);
            navigate("/profile");
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <h1>Create Post</h1>
            <form onSubmit={submit}>
                <input
                    onChange={handleFileChange}
                    type="file"
                    accept="image/*"
                />
                <input
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    type="text"
                    placeholder="Caption"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
