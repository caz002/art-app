import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.tsx";
import { DataProvider } from "./contexts/DataContextProvider.tsx";
import UserProfile from "./pages/UserProfilePage.tsx";
import CreatePost from "./pages/CreatePostPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import CreateAccountPage from "./pages/CreateAccountPage.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";

// Defines different URL paths for website
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "profile",
    element: (
      <PrivateRoute>
        <UserProfile />
      </PrivateRoute>
    ),
  },
  {
    path: "create",
    element: <CreatePost />,
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
  <StrictMode>
    <AuthContextProvider>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </AuthContextProvider>
  </StrictMode>
);
