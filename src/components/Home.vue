<template>
    <div>
        <Header></Header>
        <websites-list></websites-list>
    </div>
</template>

<script>
import Header from './partials/Header.vue';
import WebsitesList from './Website/List.vue';

export default {
    name: "Home",

    components: {Header, WebsitesList},
};
</script>
