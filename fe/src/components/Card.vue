<template>
    <div class="card">
        <div class="download-link" @click="download">{{ title }}</div>
        <p v-if="format === 'CSV'">
            CSV, or Comma-Separated Values, is a versatile file format used for storing structured data. Each row in a
            CSV file represents a record, with data separated by commas. While the standard delimiter is a comma, other
            delimiters like semicolons or tabs can be used. CSV files find extensive use in data exchange and storage
            due to their simplicity and broad support among various software applications.
        </p>
        <p v-else>
            JSON, or JavaScript Object Notation, is a widely used data interchange format. It is a lightweight,
            human-readable format that is easy for both people and machines to understand. JSON data is structured as
            key-value pairs, making it ideal for representing complex data structures. JSON's simplicity and flexibility
            have led to its widespread adoption in web development, APIs, and data storage.
        </p>
    </div>
</template>

<script>
import { exportToJSON, toCSV } from "../utils/exportFunctions.js";
export default {
    props: ["format"],
    data() {
        return {
            title: `Download movie list in ${this.format}`,
        };
    },
    methods: {
        async download() {
            if (this.format === "CSV") {
                let response = await fetch("http://localhost:3000/data/movies.csv");
                let data = await response.text();
                toCSV(data).click();
            } else {
                let response = await fetch("http://localhost:3000/data/movies.json");
                let data = await response.json();
                exportToJSON(data).click();
            }
        },
    },
};
</script>

<style>
.card {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border-radius: 10px;
    border: 1px solid #a9fbd6fe;
}

.card:hover {
    background-color: #a9fbd6fe;
}
p {
    margin: 20px;
    font-size: large;
    letter-spacing: 1px;
    line-height: 1.5;
}
</style>
