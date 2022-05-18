<template>
    <div class="load-spinner"></div>
</template>

<style scoped>
    .load-spinner
    {
        display: block;
        border: 0.3rem solid transparent;
        border-bottom-color: var(--accent-color);
        height: 15%;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin
    {
        to
        {
            transform: rotate(1turn);
        }
    }
</style>