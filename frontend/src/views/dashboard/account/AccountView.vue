<template>
    <div class="account">
        <h1 class="title">Account</h1>
        <LoadSpinner v-if="!userInfo" />
        <div v-else class="info">
            <div class="field">
                <label class="label">User ID</label>
                <p class="value">{{ userInfo?.id }}</p>
            </div>
            <div class="field">
                <label class="label">Name</label>
                <p class="value">{{ userInfo?.name }}</p>
            </div>
            <div class="field">
                <label class="label">Email</label>
                <p class="value">{{ userInfo?.email }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../../../store';
    import LoadSpinner from '../../../components/LoadSpinner.vue';

    export default {
        data()
        {
            return {
                userInfo: null
            };
        },
        async mounted() 
        {
            this.userInfo = await store.user.getInfo();
        },
        components: { LoadSpinner }
    }
</script>

<style scoped>
    .account
    {
        display: flex;
        flex-direction: column;
    }

    .title
    {
        margin-bottom: 0.8em;
    }

    .load-spinner
    {
        align-self: center;
        justify-self: center;
    }

    .info
    {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .field
    {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }

    .field .label
    {
        font-weight: 500;
    }

    .field .value
    {
        color: #ddd;
        background-color: #0007;
        padding: 1em;
        width: 100%;
        border-radius: 0.5em;
    }
</style>