<template>
    <form class="form" :="$props">
        <slot></slot>
    </form>
</template>

<script>
    export default {
    
    }
</script>

<style scoped>
    .form
    {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        gap: 2rem;
        padding: 1rem;
        width: 60vmin;
        min-width: 250px;
    }

    .form .btn
    {
        font-size: 1rem;
    }
</style>