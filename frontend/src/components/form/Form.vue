<template>
    <form class="form" :="$props" @submit="submit">
        <slot></slot>
    </form>
</template>

<script>
    import store from '../../store.js';

    export default {
        methods: {
            submit(e)
            {
                e.preventDefault();

                const data = new URLSearchParams(new FormData(e.target));

                fetch(e.target.action, { 
                    method: e.target.method,
                    body: data
                })
                .then(res => res.json())
                .then(data =>
                {
                    store.auth.setToken(data.token);
                    this.$router.push({ name: 'Dashboard' });
                })
                .catch(console.error);
            }
        }
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
</style>