<template>
    <header>
        <h1 class="logo">DTask</h1>
        <nav>
            <RouterLink :to="{ name: 'Dashboard' }" v-if="authStore.authenticated">Dashboard</RouterLink>
            <RouterLink :to="{ name: 'Login'     }" v-if="!authStore.authenticated">Login</RouterLink>
            <RouterLink :to="{ name: 'Register'  }" v-if="!authStore.authenticated">Register</RouterLink>
        </nav>
    </header>
</template>

<script>
    import store from '../store';

    export default {
        data()
        {
            return {
                authStore: store.auth
            }
        }
    }
</script>

<style>
    header
    {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        background-color: #181818;
    }

    header .logo
    {
        font-size: 2rem;
    }

    header nav
    {
        display: flex;
        align-items: center;
        gap: 1.5em;
    }

    header nav a
    {
        text-decoration: none;
        color: #fff;
        padding: 0.5em;
        position: relative;
    }

    header nav a.router-link-active::before
    {
        content: '';
        height: 0.15em;
        width: 100%;
        position: absolute;
        transform: translateX(-50%);
        left: 50%;
        bottom: 0.2em;
        background-color: var(--accent-color);
        border-radius: 100vh;
    }
</style>