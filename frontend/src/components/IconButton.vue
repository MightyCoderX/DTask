<template>
    <Icon :name="iconName" />
</template>

<script>
    import Icon from './Icon.vue';
    export default {
        components: { Icon },
        props:
        {
            iconName: String
        }
    }
</script>

<style scoped>
    .md-icon
    {
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.2s;
    }

    .md-icon:hover,
    .md-icon:focus-visible
    {
        opacity: 1;
    }
</style>
