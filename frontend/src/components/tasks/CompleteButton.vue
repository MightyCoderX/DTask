<template>
    <Icon class="complete" name="check" />
</template>

<script>
    import Icon from '../Icon.vue';

    export default {
        components: { Icon }
    }
</script>

<style scoped>
    .complete
    {
        cursor: pointer;
        transition: color 0.2s;
        color: #186318;
    }

    .complete:hover
    {
        color: forestgreen;
    }
</style>