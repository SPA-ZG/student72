import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", {
    state: () => ({
        filters: [],
        wildcard: true,
        input: "",
        movies: [],
        links: [],
    }),
    getters: {
        getFilters: (state) => state.filters,
        getWildcard: (state) => state.wildcard,
        getInput: (state) => state.input,
        getMovies: (state) => state.movies,
        getLinks: (state) => state.links,
    },
    actions: {
        setFilters(filters) {
            this.filters = [...filters];
        },
        setWildcard(wildcard) {
            this.wildcard = wildcard;
        },
        setInput(input) {
            this.input = input;
        },
        setMovies(movies) {
            this.movies = [...movies];
        },
        setLinks(links) {
            this.links = [...links];
        },
    },
});
