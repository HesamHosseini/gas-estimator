import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import App from "./App";
import Home from "./pages/Home";

const rootRoute = createRootRoute({ component: App });

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Home,
});

const routeTree = rootRoute.addChildren([homeRoute]);

export const router = createRouter({ routeTree });
