import Home from "../pages/Home.tsx";
import UserProfile from "../pages/UserProfilePage.tsx";
import CreatePost from "../pages/CreatePostPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import CreateAccountPage from "../pages/CreateAccountPage.tsx";
import PrivateRoute from "../components/PrivateRoute.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
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
];

export default routes;
