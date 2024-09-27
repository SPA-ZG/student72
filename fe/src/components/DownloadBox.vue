<template>
    <div class="download-container flex-container">
        <div class="download-link" @click="emitJSON">Download JSON</div>
        <div class="download-link" @click="emitCSV">Download CSV</div>
    </div>
</template>

<script>
export default {
    emits: ["downloadJson", "downloadCsv"],
    methods: {
        emitJSON() {
            this.$emit("downloadJson");
        },
        emitCSV() {
            this.$emit("downloadCsv");
        },
    },
};
</script>

<style>
.download-link {
    background-color: #00af60;
    border-radius: 5px;
    font-weight: bold;
    padding: 20px;
    margin: 20px;
}
.download-link:hover {
    cursor: pointer;
    background-color: #10e887;
}

.download-container {
    background-color: white;
}
</style>
