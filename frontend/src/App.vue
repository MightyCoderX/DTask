<script setup>
    import Header from '@/components/Header.vue';
</script>

<template>
    <Header />
    <main>
        <RouterView class="view main" />
    </main>
</template>

<style>
    *,
    *::before,
    *::after
    {
        margin: 0;
        padding: 0;
        box-sizing: border-box;font-family: 'Montserrat', sans-serif;
    }

    :root
    {
        --bg-color: #0c0c0c;
        --accent-color: #0022b8;
    }

    html, body
    {
        width: 100%;
        min-height: 100vh;
        overflow: hidden;
    }

    body
    {
        background-color: var(--bg-color);
        color: #eee;
        display: grid;
        grid-template-rows: max-content 1fr;
    }

    body > main > .view
    {
        height: 100%;
    }

    form > .btn
    {
        font-size: 1rem;
    }
</style>
