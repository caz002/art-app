import { useState } from "react";
import BlankImage from "../images/NoImageAvaliable.png"
import { Link } from "react-router-dom";
import PostPopup from "./PostPopup";
import { useDataContext } from "../contexts/DataContextProvider";
import { Suspense } from "react";

export default function UserProfile(){
    const [showPopup, setShowPopup] = useState(false);
    const {imageData} = useDataContext();

    //TODO: replace later with popup context
    const [popupURL, setPopupURL] = useState("");
    const boxStyling = "bg-[#282828] rounded-md p-5 flex flex-col flex-1 gap-5";
    return(
        <div className = "bg-[#1A1A1A] flex flex-1">
            {showPopup && <PostPopup setShowPopup={setShowPopup} imageUrl={popupURL}/>}
            <div className="flex flex-col flex-1 gap-5">
                <div className= "flex flex-row flex-1 justify-between gap-5 flex-wrap">
                    <div className ={boxStyling}>
                        <div className="flex flex-row flex-1 gap-5">
                            <img src={BlankImage} className="w-24 h-24 rounded-md"></img>
                            <div className="flex flex-col flex-1">
                                <h1>Name</h1>
                                <h4>Username</h4>
                                <p>This is my biography</p>
                            </div>
                        </div>
                        <button className="bg-white text-[#1A1A1A] rounded-md p-2">Edit Profile</button>
                    </div>
                    <div className = {boxStyling}>
                        <h1>Stats</h1>
                        <div className="flex flex-row flex-1 gap-3 items-center">
                            <img src="/ViewsIcon.svg" className="w-6 h-6"/>
                            <p>Views</p>
                            <p>50 K</p>
                        </div>
                        <div className="flex flex-row flex-1 gap-3 items-center">
                            <img src="/PostsIcon.svg" className="w-6 h-6"/>
                            <p>Posts</p>
                            <p>273</p>
                        </div>
                        <div className="flex flex-row flex-1 gap-3 items-center">
                            <img src="/FollowersIcon.svg" className="w-6 h-6"/>
                            <p>Followers</p>
                            <p>10 K</p>
                        </div>
                    </div>
                    <div className = {`${boxStyling} flex-2`}>
                        <h1>Progress</h1>          
                    </div>
                </div>
                <div className={`bg-[#282828] rounded-md p-5 gap-5`}>
                    <div className = "flex flex-row flex-1 gap-2">
                    <h1>Posts</h1>
                    <Link to="/create"><h1>+</h1></Link>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mt-5">
                    {imageData.length > 0 ? imageData.map(image => <img src={image.imageUrl} key = {image.imageKey}className="rounded-sm" onClick = {() => {setShowPopup(true); setPopupURL(image.imageUrl)}}/>) : <div>Loading...</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}