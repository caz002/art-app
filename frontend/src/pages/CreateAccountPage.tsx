import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";
import { useDataContext } from "../contexts/DataContextProvider";

export default function CreateAccountPage() {
    const { setIsLoggedIn } = useDataContext();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(null);
        try {
            await register(email, name, password);
            navigate("/profile");
            setIsLoggedIn(true);
        } catch (err: any) {
            setError(err.message || "Registration failed");
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
                    <div className="text-4xl">Create an account</div>
                    <div className="text-lg text-gray-500">
                        Start your journey!
                    </div>
                </div>
                <form
                    onSubmit={handleRegister}
                    className="flex flex-col w-full text-lg gap-4"
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <input
                            className={inputStyle}
                            type="email"
                            name="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Name</label>
                        <input
                            className={inputStyle}
                            name="name"
                            placeholder="Enter your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                        Get Started
                    </button>
                </form>
            </div>
        </div>
    );
}
