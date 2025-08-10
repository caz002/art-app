import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { useDataContext } from "../contexts/DataContextProvider";

export default function LoginPage() {
    const { setIsLoggedIn } = useDataContext();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(null);
        try {
            await login(email, password);
            navigate("/profile");
            setIsLoggedIn(true);
        } catch (err: any) {
            setError(err.message || "Login failed");
        }
    };

    const inputStyle =
        "border-gray-300 border-2 border-solid px-4 py-2 rounded-md";
    const buttonBase = "px-4 py-2 rounded-md text-lg";

    return (
        <div className="flex flex-col flex-1 justify-center items-center h-screen">
            <div className="flex flex-col w-96 gap-10">
                <div className="flex flex-col gap-2 items-center">
                    <img
                        className="w-36 mb-8"
                        src="/ArtevaTempLogo.svg"
                        alt="Arteva Temp Logo"
                    />
                    <div className="text-4xl">Log into your account</div>
                    <div className="text-lg text-gray-500">
                        Welcome back! Please enter your details.
                    </div>
                </div>

                <form
                    onSubmit={handleLogin}
                    className="flex flex-col w-full text-lg gap-4"
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <input
                            className={inputStyle}
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Password</label>
                        <input
                            className={inputStyle}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className="text-red-500">{error}</div>}

                    <button
                        className={`bg-[#1F252B] text-white ${buttonBase}`}
                        type="submit"
                    >
                        Sign In
                    </button>
                    {/* <button className={`border-2 border-solid border-[#1F252B] ${buttonBase}`} type="button">
            Sign in with Google
          </button> */}
                </form>

                <div className="text-lg text-gray-500 text-center ">
                    Don't have an account?{" "}
                    <span
                        className="underline underline-offset-2 cursor-pointer"
                        onClick={() => navigate("/register")}
                    >
                        Sign up
                    </span>
                </div>
            </div>
        </div>
    );
}
