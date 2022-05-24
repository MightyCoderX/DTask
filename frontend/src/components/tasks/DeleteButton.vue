<template>
    <Icon class="delete" name="delete" />
</template>

<script>
    import Icon from '../Icon.vue';

    export default {
        components: { Icon }
    }
</script>

<style scoped>
    .delete
    {
        cursor: pointer;
        transition: color 0.2s;
        color: #891a1a;
    }

    .delete:hover
    {
        color: firebrick;
    }
</style>