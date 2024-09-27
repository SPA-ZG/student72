<template>
    <div class="grid height-40">
        <Card v-for="format in formats" :format="format" />
    </div>
</template>

<script>
import Card from "../components/Card.vue";
export default {
    components: { Card },
    data() {
        return {
            formats: ["JSON", "CSV"],
        };
    },
};
</script>

<style>
.grid {
    display: grid;
    grid-gap: 80px;
    grid-template-columns: 1fr 1fr;
    margin: 80px;
}

.height-40 {
    height: 40vh;
}
</style>
