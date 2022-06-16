<template>
    <span class="md-icon material-icons-round" translate="no">
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
    .md-icon
    {
        user-select: none;
    }
</style>