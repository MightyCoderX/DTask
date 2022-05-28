<template>
    <div class="num-stat-card">
        <p class="value">{{ value }}</p>
        <p class="name">{{ name }}</p>
    </div>
</template>

<script>
    export default {
        props:
        {
            value: Number,
            name: String
        }
    }
</script>

<style scoped>
    .num-stat-card
    {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background-color: #222;
        padding: 1rem;
        border-radius: 1rem;
    }

    .num-stat-card .value
    {
        font-size: 6vw;
        text-align: center;
    }

    .num-stat-card
    {
        text-align: center;
    }
</style>