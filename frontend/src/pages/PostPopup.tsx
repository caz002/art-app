import BlankImage from "../images/NoImageAvaliable.png"

export default function PostPopup({setShowPopup, imageUrl}: {setShowPopup:  React.Dispatch<React.SetStateAction<boolean>>, imageUrl: string}){
    return(
        // Outer dimmed background
         <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto backdrop-brightness-50">
            <div className="mt-20 max-h-screen">
                {/* Start of Post Popup Inner Part*/}
                <div className="flex flex-col rounded-md bg-[#282828] p-4">
                    <div className="align-center relative flex flex-row justify-center">
                        <div className="py-3 text-lg font-bold"> Post Page </div>
                            <button title="close" className="l-36 absolute right-0 self-start text-2xl rounded-3xl" onClick={() => setShowPopup(false)}>x</button>
                    </div>
                    <div className="align-center relative flex flex-row justify-center">
                        {/* Left Side - Image*/}
                        <img src={imageUrl} className="w-[50%]"></img>
                        {/* Right Side - Info and Comments */}
                        <div className="flex flex-1 flex-col m-4">
                            <div className="flex flex-1 flex-row gap-5">
                                <img src={BlankImage} className="w-16 h-16 rounded-md"></img>
                                <div className="flex flex-col">
                                    <div>Username</div>
                                    <div>This is the description.</div>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="flex flex-row flex-3">
                                <div className="flex flex-1">Comments</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    );
}