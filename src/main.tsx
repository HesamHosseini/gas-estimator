import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "./components/ui/sonner.tsx";
import { PriceProvider } from "./context/price-context.tsx";
import "./index.css";
import { router } from "./router.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <PriceProvider>
            <RouterProvider router={router} />
            <Toaster richColors />
        </PriceProvider>
    </StrictMode>
);
