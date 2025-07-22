import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const navigate = useNavigate();

    const inputStyle = "border-gray-300 border-2 border-solid px-4 py-2 rounded-md";
    const buttonBase = "px-4 py-2 rounded-md text-lg";
    return(
        <div className="flex flex-col flex-1 justify-center items-center h-screen">
            <div className="flex flex-col w-96 gap-10">
                <div className="flex flex-col gap-2 items-center">
                    <img className="w-36 mb-8" src="/ArtevaTempLogo.svg" alt="Arteva Temp Logo"/>
                    <div className="text-4xl">Log into your account</div>
                    <div className="text-lg text-gray-500">Welcome back! Please enter your details.</div>
                </div>
                <form className="flex flex-col w-full text-lg gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username">Username</label>
                        <input 
                            className={inputStyle}
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
                    <input
                        className={inputStyle}
                        type="text"
                        name="password"
                        placeholder="Password"
                    />
                    </div>
                    <button className={`bg-[#1F252B] text-white ${buttonBase}`} type="submit" onClick={() => navigate("/profile")}>Sign In</button>
                    <button className={`border-2 border-solid border-[#1F252B] ${buttonBase}`}>Sign in with Google</button>
                </form>
                <div className="text-lg text-gray-500 text-center ">Don't have an account? <span className="underline underline-offset-2" onClick = {() => navigate("/register")}>Sign up</span></div>
            </div>
        </div>
    )
}