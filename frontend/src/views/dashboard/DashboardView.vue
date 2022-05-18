<script setup>
    import Sidebar from './Sidebar.vue';
</script>

<template>
    <div class="dashboard">
        <Sidebar />
        <RouterView class="view" />
    </div>
</template>

<style scoped>
    .dashboard
    {
        display: grid;
        grid-template-columns: 20% 1fr;
    }

    .dashboard > .view
    {
        padding: 1rem;
    }
</style>