<template>
    <div class="register">
        <Form action="//192.168.1.74:5000/api/users/" method="post" :on-response="register">
            <h1>Register</h1>


            <FormField label="Name" :input-options="{
                type: 'text',
                name: 'name',
                autocomplete: 'name',
                required: true
            }"/>

            <FormField label="Email" :input-options="{
                type: 'email',
                name: 'email',
                autocomplete: 'email',
                required: true
            }"/>

            <FormField label="Password" :input-options="{
                type: 'password',
                name: 'password',
                autocomplete: 'new-password',
                required: true
            }"/>

            <FormField label="Confirm Password" :input-options="{
                type: 'password',
                name: 'password2',
                autocomplete: 'new-password',
                required: true
            }"/>

            <PrimaryButton type="submit" label="Register" />
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
            register(data)
            {
                store.auth.setToken(data.token);
                this.$router.push({ name: 'Dashboard' });
            }
        }
    }
</script>

<style>
    .register
    {
        padding: 1rem;
        display: grid;
        place-items: center;
    }
</style>