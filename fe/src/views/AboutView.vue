<template>
    <div class="container">
        <h1>About the app</h1>
        <h3>This is a web application for searching movies based on various criteria.</h3>
        <p>
            On the Home page, you can download a bulk record of all movies in JSON or CSV format. On the Search page,
            you can search the movie database using desired attributes. To perform attribute search, you need to select
            fields (checkboxes) based on which you want to conduct the search. After that, you should enter a string of
            words, a word, or a part of a word into the input field. The checkbox <span>*</span> symbolizes searching
            across all fields.
        </p>
        <p><span>Tip: </span>to display all movies, check the <span>*</span> checkbox and leave the input empty.</p>
        <h3>Go to <RouterLink to="/search" class="search-link">Search</RouterLink> page and try it!</h3>
    </div>
</template>

<script>
import { RouterLink } from "vue-router";
</script>

<style scoped>
h3,
p {
    margin: 20px;
}
p {
    line-height: 1.5;
    font-size: 15px;
}
h1 {
    margin: 30px 20px;
}
span {
    font-weight: bold;
}
.search-link {
    color: green;
    text-decoration: none;
}
</style>
