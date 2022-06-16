<template>
    <Icon class="edit" name="edit" />
</template>

<script>
    import Icon from '../Icon.vue';

    export default {
        components: { Icon }
    }
</script>

<style scoped>
    .edit
    {
        cursor: pointer;
        transition: color 0.2s;
        color: #23275e;

    }

    .edit:hover
    {
        color: #303682;
    }
</style>