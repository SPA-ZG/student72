<template>
    <form @submit.prevent="handleSubmit">
        <div class="div-form container">
            <div class="checkboxes">
                <div v-for="filter in filters" class="checkbox-item">
                    <input type="checkbox" v-model="filter[2]" />
                    <label>{{ filter[1] }}</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" v-model="wildcard" />
                    <label>* (wildcard)</label>
                </div>
            </div>
            <div>
                <input type="text" v-model="input" /><br />
                <button class="submit">Search</button>
            </div>
        </div>
    </form>
    <div class="container stats flex-container">
        {{ noOfFields }} / 12 fields selected {{ this.wildcard ? "(wildcard checked)" : "" }}
    </div>
    <DataTable v-if="movies.length" :data="movies" />
    <DownloadBox v-if="movies.length" @download-json="downloadJSON" @download-csv="downloadCSV" />
</template>

<script>
import DataTable from "../components/DataTable.vue";
import DownloadBox from "../components/DownloadBox.vue";
import { parseData } from "../utils/parseData";
import { mapActions, mapState } from "pinia";
import { useSearchStore } from "../stores/index.js";
import { exportToCSV, exportToJSON } from "../utils/exportFunctions.js";

export default {
    components: { DataTable, DownloadBox },
    data() {
        return {
            filters: [
                ["title", "Title", false],
                ["release_date", "Release date", false],
                ["director.firstname", "Director's firstname", false],
                ["director.lastname", "Director's lastname", false],
                ["producer.firstname", "Producer's firstname", false],
                ["producer.lastname", "Producer's lastname", false],
                ["actors.firstname", "Actor's firstname", false],
                ["actors.lastname", "Actor's lastname", false],
                ["duration", "Duration", false],
                ["genres", "Genre", false],
                ["oscars", "No. of Oscars", false],
                ["box_office", "Box office revenue", false],
            ],
            wildcard: true,
            input: "",
            movies: [],
            link_json: null,
            link_csv: null,
        };
    },
    computed: {
        ...mapState(useSearchStore, ["getFilters", "getWildcard", "getInput", "getMovies", "getLinks"]),
        noOfFields() {
            let count = 0;
            if (this.wildcard) {
                return 12;
            } else {
                this.filters.forEach((filter) => {
                    count += +filter[2];
                });
                return count;
            }
        },
    },
    watch: {
        filters: {
            handler: function (newVal, oldVal) {
                this.setFilters(newVal);
            },
            deep: true,
        },
        input(newVal, oldVal) {
            this.setInput(newVal);
        },
        wildcard(newVal, oldVal) {
            this.setWildcard(newVal);
        },
    },
    created() {
        if (this.getFilters.length) {
            this.filters = [...this.getFilters];
            this.wildcard = this.getWildcard;
            this.input = this.getInput;
            this.movies = [...this.getMovies];
            [this.link_json, this.link_csv] = this.getLinks;
        }
    },
    methods: {
        ...mapActions(useSearchStore, ["setFilters", "setWildcard", "setInput", "setMovies", "setLinks"]),
        packCriteria() {
            let arr = [];
            this.filters.forEach((filter) => {
                if (filter[2]) {
                    if (filter[0] === "oscars" || filter[0] === "box_office" || filter[0] === "duration") {
                        arr.push({ [filter[0]]: parseFloat(this.input) });
                    } else if (filter[0] === "release_date") {
                        arr.push({ [filter[0]]: `${this.input}` });
                    } else {
                        arr.push({ [filter[0]]: `.*${this.input}.*` });
                    }
                }
            });

            return {
                criteria: arr,
                everything: this.wildcard,
                input: this.input,
            };
        },
        async handleSubmit() {
            try {
                this.movies = [];
                this.setMovies([]);
                this.link_json = null;
                this.link_csv = null;
                this.setLinks([]);

                let body = this.packCriteria();

                let response = await fetch("http://localhost:3000/search", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });

                let data = await response.json();

                if (response.status === 400) {
                    console.log(data.error);
                } else {
                    this.movies = parseData(data);
                    this.setMovies(this.movies);
                    if (this.movies.length) {
                        this.link_json = exportToJSON(data);
                        this.link_csv = exportToCSV(data);
                        this.setLinks([this.link_json, this.link_csv]);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        downloadJSON() {
            this.link_json.click();
        },
        downloadCSV() {
            this.link_csv.click();
        },
    },
};
</script>

<style>
.div-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    align-items: center;
}
.container {
    background-color: #a9fbd6fe;
    border-radius: 8px;
    padding: 50px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 60vw;
    margin: 50px auto 0 auto;
}
.stats {
    padding: 20px 50px;
    margin: 20px auto;
    font-size: large;
}
.checkboxes {
    width: 100%;
    height: 100%;
}
.checkbox-item {
    margin: auto;
    width: 70%;
    height: 30px;
}
input[type="checkbox"] {
    display: inline-block;
    margin: 0 30px 0 70px;
    position: relative;
    top: 4px;
    width: 18px;
    height: 18px;
    border: 2px solid black;
}
input[type="checkbox"]:checked {
    accent-color: green;
}
input[type="text"] {
    height: 30px;
    width: 200px;
    padding: 3px;
    border-radius: 5px;
    border: 2px solid #00af60;
    background-color: #a9fbd6fe;
}
.submit {
    font-weight: bold;
    margin: 15px auto;
    padding: 10px;
    background-color: #00af60;
    border-radius: 5px;
    border: 1px solid #00af60;
}
.submit:hover {
    cursor: pointer;
    background-color: #10e887;
    border: 1px solid #10e887;
}
</style>
