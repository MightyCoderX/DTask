<template>
    <div class="login">
        <Form @submit.prevent="login">
            <h1>Login</h1>

            <FormField label="Email" :input-options="{
                type: 'email',
                name: 'email',
                autocomplete: 'email',
                required: true
            }" />

            <FormField label="Password" :input-options="{
                type: 'password',
                name: 'password',
                autocomplete: 'current-password',
                required: true
            }"/>

            <PrimaryButton type="submit" label="Login" />
        </Form>
    </div>
</template>

<script>
    import Form from '@/components/form/Form.vue';
    import FormField from '@/components/form/FormField.vue';
    import PrimaryButton from '@/components/PrimaryButton.vue';
    import store from '../store';

    export default {
        components: { Form, FormField, PrimaryButton },
        methods:
        {
            async login(e)
            {
                await store.user.login(new FormData(e.target));
                this.$router.push({ name: 'Dashboard' });
            }
        }
    }
</script>

<style scoped>
    .login
    {
        padding: 1rem;
        display: grid;
        place-items: center;
    }

    .login form
    {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        gap: 2rem;
    }

    .login form .field
    {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }
</style>