<template>
    <div class="dashboard">
        <Sidebar />
        <RouterView class="view" />
    </div>
</template>

<script>
    import store from "../../store";
    import Sidebar from "./Sidebar.vue";

    export default {
        components: { Sidebar },
        setup()
        {
            store.sidebarShown = !matchMedia('screen and (max-width: 450px)').matches;
        }
    }
</script>

<style scoped>
    .dashboard
    {
        display: grid;
        grid-template-columns: max-content 1fr;
        max-height: 100%;
    }

    .dashboard > .view
    {
        padding: 1rem;
    }

    @media screen and (max-width: 450px)
    {
        .dashboard
        {
            grid-template-columns: 1fr;
        }
    }
</style>