import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.tsx";
import { DataProvider } from "./contexts/DataContextProvider.tsx";
import UserProfile from "./pages/UserProfilePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import CreateAccountPage from "./pages/CreateAccountPage.tsx";

// Defines different URL paths for website
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "profile",
        element: <UserProfile />,
    },
    {
        path: "login",
        element: <LoginPage />,
    },
    {
        path: "register",
        element: <CreateAccountPage />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <DataProvider>
        <RouterProvider router={router} />
    </DataProvider>
);
