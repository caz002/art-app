import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DataProvider } from "./contexts/DataContextProvider.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import routes from "./routes/routes.tsx";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </AuthContextProvider>
  </StrictMode>
);
