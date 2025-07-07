import { Link } from "react-router-dom";
import { useUsernameContext } from "../contexts/UsernameContextProvider";

export default function Login(){
     const { username, setUsername } = useUsernameContext();
    return(
        <>
        <div className="text-3xl">Login</div>
        <label htmlFor="username">Username</label>
        <input name = "username" type="text" value = {username} onChange = {(e) => setUsername(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
        <label htmlFor="password">Password</label>
        <input name = "password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
        <Link to="profile"> Login</Link>
        </>
    )
}