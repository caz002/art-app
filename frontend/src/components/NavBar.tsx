import MainTitle from "./MainTitle";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();
    return (
        <div className = "relative flex justify-between items-center w-full container-border p-4 bg-indigo-200">
            <button className="button" onClick = {() => navigate("/")}><img src="/HouseIcon.svg" alt="house icon"></img> </button>
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <MainTitle/>
            </div>
            <div className="flex flex-row gap-2">
                <button className="button" onClick = {() => window.location.href= "https://buymeacoffee.com/"}><img src="/CoffeeIcon.svg" alt="house icon"></img> </button>
                <button className="button" onClick = {() => navigate("/profile")}><img src="/ProfileIcon.svg" alt="house icon"></img> </button>
            </div>
        </div>
    );
}
