<template>
    <button class="btn" :="$props">{{ label }}</button>
</template>

<script>
    export default {
        props: {
            label: String
        }
    }
</script>

<style scoped>
    .btn
    {
        display: block;
        padding: 0.5em 1em;
        outline: none;
        border: 0.15em solid var(--accent-color);
        background-color: var(--accent-color);
        color: #eee;
        border-radius: 0.5em;
        transition: background-color 0.2s ease;
        font-weight: 400;
    }

    .btn:hover,
    .btn:focus-visible
    {
        background-color: #0000ff22;
    }


</style>