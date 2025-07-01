import "../App.css"
import { useState } from "react"
import DefaultImage from "../images/NoImageAvaliable.png"
import { PostCard } from "../components/PostCard";
function Profile() {
    const image_list = [];
    const [imagesrc, setImagesrc] = useState(DefaultImage);
    const handleFileSubmit = (e) =>{
        const file = e.target.files[0];
        setImagesrc(URL.createObjectURL(file));
    };
    return (
    <>
        <div className = "flex flex-row text-center text-xl"> Username </div>
        <div className = "text-3xl"> Posts</div>

        <PostCard src={imagesrc} />
        <input type="file" accept = "image/png, image/jpeg" onChange={handleFileSubmit}/>
    </>
    )
}

export default Profile