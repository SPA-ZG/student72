<template>
    <div>
        <img src="https://www.pngall.com/wp-content/uploads/2/Question-Mark-PNG-Picture.png" alt="question-marks" />
        <h2>
            Ups, we found nothing for path <span>{{ catchAllPath }}</span>
        </h2>
        <h3>Try going <RouterLink :to="homePath" class="home-link">Home</RouterLink></h3>
    </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
    data() {
        return {
            catchAllPath: this.$route.params.catchAll,
            homePath: "/",
        };
    },
};
</script>

<style scoped>
* {
    color: rgb(14, 8, 46);
}
img {
    width: 200px;
    margin: 20px;
}
h2,
h3 {
    margin: 10px;
}
div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.home-link {
    color: green;
    text-decoration: none;
}
span {
    color: red;
    font-style: italic;
    text-decoration: underline;
}
</style>
