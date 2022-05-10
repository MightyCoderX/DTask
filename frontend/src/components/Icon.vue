<template>
    <span class="md-icon material-icons-round">
        {{ name }}
    </span>
</template>

<script>
    export default {
        props: {
            name: String
        }
    }
</script>

<style scoped>
    /* .material-icons-round
    {
        display: block;
    } */
</style>