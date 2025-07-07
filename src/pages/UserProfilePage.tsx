import { useState } from "react";
import BlankImage from "../images/NoImageAvaliable.png"
import { Link } from "react-router-dom";
import PostPopup from "./PostPopup";

export default function UserProfile(){
    const [showPopup, setShowPopup] = useState(false);
    const boxStyling = "bg-[#282828] rounded-md p-5 flex flex-col flex-1 gap-5";
    return(
        <div className = "bg-[#1A1A1A] flex flex-1">
            {showPopup && <PostPopup/>}
            <div className="flex flex-col flex-1 gap-5">
                <div className= "flex flex-row flex-1 justify-between gap-5 flex-wrap">
                    <div className ={boxStyling}>
                        <div className="flex flex-row flex-1 gap-5">
                            <img src={BlankImage} className="w-32 h-32 rounded-md"></img>
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
                        <div className="flex flex-row flex-1 gap-5">
                            <p>Views</p>
                            <p>50 K</p>
                        </div>
                        <div className="flex flex-row flex-1 gap-5">
                            <p>Posts</p>
                            <p>273</p>
                        </div>
                        <div className="flex flex-row flex-1 gap-5">
                            <p>Followers</p>
                            <p>10 K</p>
                        </div>
                    </div>
                    <div className = {boxStyling}>
                        <h1>Progress</h1>          
                    </div>
                </div>
                <div className={`min-h-screen ${boxStyling}`}>
                    <div className = "flex flex-row flex-1 gap-2">
                    <h1>Posts</h1>
                    <Link to="/create"><h1>+</h1></Link>
                    </div>
                    <img className = "rounded-md w-64 h-64" src={BlankImage} onClick={() => setShowPopup(true)}></img>
                </div>
            </div>
        </div>
    )
}