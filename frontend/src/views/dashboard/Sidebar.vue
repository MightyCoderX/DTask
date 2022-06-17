<template>
    <aside class="sidebar" :class="{hidden: !store.sidebarShown}">
        <RouterLink class="sidebar-item" :to="{ name: 'Tasks' }">
            <Icon name="assignment" />
            <span class="label">Tasks</span>
        </RouterLink>
        <RouterLink class="sidebar-item" :to="{ name: 'Stats' }">
            <Icon name="trending_up" />
            <span class="label">Stats</span>
        </RouterLink>
        <RouterLink class="sidebar-item" :to="{ name: 'Account' }">
            <Icon name="person" />
            <span class="label">Account</span>
        </RouterLink>
        <PrimaryButton label="Logout" @click="logout" />
    </aside>
</template>

<script>
    import Icon from '../../components/Icon.vue';
    import PrimaryButton from '../../components/PrimaryButton.vue';
    import store from '../../store';
        
    export default {
        components: { Icon, PrimaryButton },
        data()
        {
            return {
                store
            }
        },
        methods:
        {
            logout(e)
            {
                store.user.removeToken();
                this.$router.push({ name: "Login" });
            }
        }
    }

    window.addEventListener('click', (e) =>
    {
        if(store.isMobile && !e.target.matches('.toggle-sidebar'))
            store.sidebarShown = false;
    });
</script>

<style scoped>
    .sidebar
    {
        background-color: #151515;
        display: flex;
        flex-direction: column;
        width: 25vw;
        min-width: 150px;
        max-width: 200px;
        transform-origin: left;
        opacity: 1;
        transition: 0.3s transform 0s, 0.2s opacity 0s, 0s flex-basis;
        z-index: 10000;
    }

    @media screen and (max-width: 450px)
    {
        .sidebar
        {
            position: fixed;
            height: 100%;
        }
    }

    .sidebar.hidden
    {
        transform: translateX(-100%);
        opacity: 0;
        transition: 0.3s transform 0s, 0.2s opacity 0s;
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