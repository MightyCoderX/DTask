<template>
    <div class="not-found">
        <h1 class="title">404</h1>
        <p class="subtitle">
            Not found!
        </p>
        <RouterLink class="back" to="/">Home</RouterLink> 
    </div>
</template>

<style scoped>
    .not-found
    {
        display: grid;
        place-content: center;
        justify-items: center;
        gap: 1rem;
    }

    .title
    {
        font-size: 30vmin;
        font-weight: 500;
        color: #ddd;
    }

    .subtitle
    {
        font-size: 2rem;
    }

    .back
    {
        font-size: 1rem;
        color: var(--accent-color);
    }
</style>