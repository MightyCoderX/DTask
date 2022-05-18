<template>
    <aside class="sidebar">
        <RouterLink class="sidebar-item" :to="{ name: 'Tasks' }">
            <Icon name="assignment" />
            <span class="label">Tasks</span>
        </RouterLink>
        <RouterLink class="sidebar-item" :to="{ name: 'Stats' }">
            <Icon name="assignment" />
            <span class="label">Stats</span>
        </RouterLink>
        <!-- <RouterLink :to="{ name: 'Stats' }">Stats</RouterLink> -->
        <PrimaryButton label="Logout" @click="logout" />
    </aside>
</template>

<script>
    import store from '../../store.js';
    import Icon from '../../components/Icon.vue';
    import PrimaryButton from '../../components/PrimaryButton.vue';
    
    export default {
        components: { Icon, PrimaryButton },
        methods:
        {
            logout(e) {
                store.auth.removeToken();
                this.$router.push({ name: "Login" });
            }
        }
    }
</script>

<style scoped>
    .sidebar
    {
        background-color: #151515;
        display: flex;
        flex-direction: column;
    }

    .sidebar .sidebar-item
    {
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1em;
        text-decoration: none;
        outline: none;
        color: #ddd;
        position: relative;
        transition: color 0.2s;
    }

    .sidebar .sidebar-item:hover,
    .sidebar .sidebar-item:focus-visible
    {
        color: var(--accent-color);
    }

    .sidebar .sidebar-item.router-link-active
    {
        color: var(--accent-color);
    }

    .sidebar .sidebar-item.router-link-active::before
    {
        content: '';
        position: absolute;
        left: 0.2rem;
        height: 70%;
        width: 0.25rem;
        border-radius: 1rem;
        background-color: var(--accent-color);
    }

    .sidebar Button
    {
        margin: 1rem;
    }


</style>