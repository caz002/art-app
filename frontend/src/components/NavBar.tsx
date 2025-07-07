import { Link } from "react-router-dom"
export default function NavBar(){
    return(
        <div className = "flex flex-row flex-1 text-xl gap-10">
            <Link to="/profile">Go to Profile</Link>
            <Link to="/">Go to Login</Link>
        </div>
    )
}