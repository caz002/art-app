import { useParams } from "react-router-dom";
import { useDataContext } from "../contexts/DataContextProvider";
import { useState, useEffect} from "react";
import { DefaultImageData, type ImageData } from "../lib/types";
import NavBar from "../components/NavBar";

export default function Post(){
    const { id } = useParams();
    
    const {imageData} = useDataContext();
    const [postData, setPostData] = useState<ImageData>(imageData.find(item => item.id == Number(id)) ?? DefaultImageData);
    useEffect(() => {
        console.log(imageData);
        setPostData(imageData.find(item => item.id == Number(id))?? DefaultImageData);
    }, [id, imageData]);

    return postData != DefaultImageData ? (
        <>
        <NavBar></NavBar>
        <div>Post {id} WIP</div>
        <img src={postData.src}></img>
        <div> Likes: {postData.likes} </div>
        <div> Comments: {postData.comments} </div>
        </>
    ) : (<div>Error: invalid ID </div>);
}