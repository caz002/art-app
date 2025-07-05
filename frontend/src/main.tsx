import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Profile from './pages/Homepage.tsx'
import Login from './pages/Login.tsx';
import { UsernameProvider } from './contexts/UsernameContextProvider.tsx';
import Post from './pages/PostPage.tsx';
import { DataProvider } from './contexts/DataContextProvider.tsx';
import UserProfile from './pages/UserProfilePage.tsx';
import CreatePost from './pages/CreatePostPopup.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "profile",
    element: <UserProfile />,
  },
  {
    path: "create",
    element: <CreatePost />,
  },
  {
    path: "post/:id",
    element: <Post/>,
  }
]);
 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataProvider>
      <UsernameProvider>
        <RouterProvider router={router} />
      </UsernameProvider>
    </DataProvider>
  </StrictMode>,
)
