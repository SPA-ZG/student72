<template>
    <nav>
        <div class="nav">
            <h1>{{ title }}</h1>
            <div class="links">
                <RouterLink :to="link.href" v-for="link in links"
                    ><div class="link" :class="{ 'link-active': $route.path === link.href }">
                        {{ link.name }}
                    </div>
                </RouterLink>
            </div>
        </div>
    </nav>
    <RouterView />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";

export default {
    data() {
        return {
            title: "Movies Dataset",
            links: [
                {
                    name: "Home",
                    href: "/",
                },
                {
                    name: "Search",
                    href: "/search",
                },
                {
                    name: "About",
                    href: "/about",
                },
            ],
        };
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #383838;
}

body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

h1 {
    margin: 20px;
    font-weight: bold;
}

.flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

div.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #00874b;
    border-radius: 0px 0px 10px 10px;
}

div.links {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.link {
    margin: 15px 15px 15px 0;
    padding: 15px;
    background-color: #00874b;
    border-radius: 5px;
    font-weight: bold;
    color: #383838;
}

.link:hover {
    cursor: pointer;
}

.link-active {
    background-color: #10e887;
    color: white;
}

nav a {
    font-weight: bold;
    text-decoration: none;
}

nav a.router-link-exact-active {
    color: white;
}
</style>
