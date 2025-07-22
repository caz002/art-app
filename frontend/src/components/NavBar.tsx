import MainTitle from "./MainTitle";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();
    const buttonStyle = "text-xl px-4 py-2 rounded-lg hover:bg-gray-300"
    return (
        <div className = "z-10 fixed top-0 flex justify-between items-center border-b-black border-solid border-b-2 w-full p-8 bg-white">       
            <MainTitle/>
            <div className="flex flex-row gap-10">
                <button className={buttonStyle} onClick = {() => navigate("/")}>Home</button>
                <button className={buttonStyle} onClick = {() => window.location.href= "https://buymeacoffee.com/"}>Support Us</button>
                <button className={`${buttonStyle} bg-black text-white`} onClick = {() => navigate("/login")}>Login</button>
            </div>
        </div>
    );
}
