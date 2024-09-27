import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SearchView from "../views/SearchView.vue";
import notFoundView from "../views/notFoundView.vue";

const AboutView = () => import("../views/AboutView.vue");

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/search",
            name: "search",
            component: SearchView,
        },
        {
            path: "/about",
            name: "about",
            component: AboutView,
        },
        {
            path: "/:catchAll(.*)",
            name: "notFound",
            component: notFoundView,
        },
    ],
});

export default router;
