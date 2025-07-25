import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";

export default function CreateAccountPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean | undefined>(undefined);

  const { session, signUpNewUser } = UserAuth();
  console.log(session);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signUpNewUser(email, password);

      if (result.success) {
        navigate("/profile");
      }
    } catch (err) {
      setError("An error occured");
    } finally {
      setLoading(false);
    }
  };

  // Custom page styling
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
          <div className="text-lg text-gray-500">Start your journey!</div>
        </div>
        <form
          onSubmit={handleSignUp}
          className="flex flex-col w-full text-lg gap-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={inputStyle}
              type="text"
              name="username"
              placeholder="Enter your username"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className={inputStyle}
              type="text"
              name="password"
              placeholder="Password"
            />
          </div>
          <button
            className={`bg-[#1F252B] text-white ${buttonBase}`}
            type="submit"
          >
            Get Started
          </button>
          <button
            className={`border-2 border-solid border-[#1F252B] ${buttonBase}`}
          >
            Sign up with Google
          </button>
          {error && <p className="text-red-600 text-center pt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
}
