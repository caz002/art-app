import { useState } from "react";
import BlankImage from "../images/NoImageAvaliable.png";
import { Link } from "react-router-dom";
import PostPopup from "./PostPopup";
import { useDataContext } from "../contexts/DataContextProvider";
import NavBar from "../components/NavBar";
import CalenderHeatmap from "react-calendar-heatmap";

export default function UserProfile() {
    const [showPopup, setShowPopup] = useState(false);
    const { imageData } = useDataContext();
    const [popupURL, setPopupURL] = useState("");

    return (
        <div className="font-display flex flex-col justify-center items-align m-auto max-w-7xl p-8 gap-10">
            {showPopup && (
                <PostPopup setShowPopup={setShowPopup} imageUrl={popupURL} />
            )}

            <div className="flex flex-col flex-1 gap-5">
                <NavBar />
                <div className="flex flex-row flex-1 justify-between gap-5  flex-wrap">
                    {/* User Info Section */}
                    <div className="container-border bg-indigo-200 p-5 flex flex-col flex-1 gap-5">
                        <div className="flex flex-row flex-1 gap-5">
                            <img
                                src={BlankImage}
                                className="w-24 h-24 rounded-md"
                            ></img>
                            <div className="flex flex-col flex-1">
                                <h1>Name</h1>
                                <h4>Username</h4>
                                <p>This is my biography</p>
                            </div>
                        </div>
                        <button className="button">Edit Profile</button>
                    </div>
                    {/* Stats Section*/}
                    <div className="container-border bg-indigo-200 p-5 flex flex-col flex-1 gap-5">
                        <h1>Stats</h1>
                        <div className="flex flex-row flex-1 gap-3 items-center">
                            <img src="/ViewsIcon.svg" className="w-6 h-6" />
                            <p>Views</p>
                            <p>50 K</p>
                        </div>
                        <div className="flex flex-row flex-1 gap-3 items-center">
                            <img src="/PostsIcon.svg" className="w-6 h-6" />
                            <p>Posts</p>
                            <p>273</p>
                        </div>
                        <div className="flex flex-row flex-1 gap-3 items-center">
                            <img src="/FollowersIcon.svg" className="w-6 h-6" />
                            <p>Followers</p>
                            <p>10 K</p>
                        </div>
                    </div>
                    {/*Progress Section */}
                    <div className="container-border bg-indigo-200 p-5 flex flex-col flex-2 gap-5 justify-center">
                        <h1>Progress</h1>
                        <div>
                            <CalenderHeatmap
                                startDate={new Date("2025-02-01")}
                                endDate={new Date("2025-7-31")}
                                showMonthLabels={true}
                                values={[
                                    { date: "2025-04-01", count: 12 },
                                    { date: "2025-04-22", count: 12 },
                                    { date: "2025-0-30", count: 38 },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* Posts Section */}
                <div className={`container-border bg-indigo-200 p-8 gap-5`}>
                    <div className="flex flex-row flex-1 gap-2">
                        <h1>Posts</h1>
                        <Link to="/create">
                            <h1>+</h1>
                        </Link>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mt-5">
                        {imageData.length > 0 ? (
                            imageData.map((image) => (
                                <img
                                    src={image.imageUrl}
                                    key={image.imageKey}
                                    className="rounded-sm"
                                    onClick={() => {
                                        setShowPopup(true);
                                        setPopupURL(image.imageUrl);
                                    }}
                                />
                            ))
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
