export default function PostPopup({setShowPopup, imageUrl}: {setShowPopup:  React.Dispatch<React.SetStateAction<boolean>>, imageUrl: string}){

    return(
         <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto backdrop-brightness-50">
            <div className="mt-20 max-h-screen">
                <div className="flex flex-col rounded-md bg-[#282828] p-4">
                    <div className="align-center relative flex flex-row justify-center">
                        <div className="py-3 text-lg font-bold"> Post Page </div>
                            <button title="close" className="l-36 absolute right-0 self-start text-3xl rounded-3xl" onClick={() => setShowPopup(false)}>x</button>
                    </div>
                    <div className="align-center relative flex flex-row justify-center">
                        <img src={imageUrl} className="w-[50%]"></img>
                        <div className="flex flex-1">Comments Section</div>
                    </div>
                </div>
            </div>
         </div>
    );
}