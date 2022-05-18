<template>
    <form class="form" :="$props" @submit.prevent="submit">
        <slot></slot>
    </form>
</template>

<script>
    export default {
        props: 
        {
            onResponse: Function
        },
        methods:
        {
            submit(e)
            {
                const data = new URLSearchParams(new FormData(e.target));

                fetch(e.target.action, { 
                    method: e.target.method,
                    body: data
                })
                .then(res => res.json())
                .then(data =>
                {
                    this.onResponse(data);
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