import { useNavigate } from "react-router-dom";

export default function CreatePost(){
    const boxStyling = "bg-[#282828] rounded-md p-5 gap-5";
    const navigate = useNavigate();

    //TODO: flesh out more later
    const handleButtonClick = () => {
        navigate('/profile');
      };
    return(
        <div className = "flex flex-col gap-5">
            <h1>Create Post</h1>
            <div className="flex flex-row flex-1 gap-5">
                <div className={`flex flex-1 h-[80vh] ${boxStyling}`}></div>
                <div className="flex flex-col flex-1 gap-5 justify-between">
                    <input className={`${boxStyling} text-top align-top leading-none h-[40vh]`} type="text" placeholder="Write description here..." >
                    </input>
                    <div className="flex flex-row justify-around">
                        <button onClick = { handleButtonClick}>Cancel</button>
                        <button className = "bg-white text-[#1A1A1A] rounded-md p-2" onClick = {handleButtonClick}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}