import React from "react";
import NavBar from "../components/NavBar";

const ErrorPage = () => {
  return (
    <div>
      <NavBar />
      <div className="flex flex-1 flex-col justify-center items-center min-h-screen gap-4">
        <div className="text-gray-800 text-4xl font-semibold">404 Error</div>
        <div className="text-gray-400 text-xl">Page Not Found</div>
        <div className="text-gray-500 text-xl">
          The page you are looking for does not exist, or another error
          occurred.
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
