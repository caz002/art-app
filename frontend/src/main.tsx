import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Home from './pages/Home.tsx';
import { DataProvider } from './contexts/DataContextProvider.tsx';
import UserProfile from './pages/UserProfilePage.tsx';
import CreatePost from './pages/CreatePostPage.tsx';

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
    path: "create",
    element: <CreatePost />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataProvider>
        <RouterProvider router={router} />
    </DataProvider>
  </StrictMode>,
)
