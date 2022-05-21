<template>
    <div class="named-list">
        <h2 class="title">{{ listTitle }}</h2>
        <ul class="list">
            <slot></slot>
        </ul>
    </div>
</template>

<script>
    export default {
        props:
        {
            listTitle: String
        },

    }
</script>

<style scoped>
    .title
    {
        margin-bottom: 1em;
    }

    .list
    {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
    }
</style>