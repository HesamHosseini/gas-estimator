import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import App from "./App";
import About from "./pages/About";
import Home from "./pages/Home";

const rootRoute = createRootRoute({ component: App });

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Home,
});

const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/about",
    component: About,
});

const routeTree = rootRoute.addChildren([homeRoute, aboutRoute]);

export const router = createRouter({ routeTree });
