<template>
    <div class="tasks">
        <h1 class="title">Tasks</h1>

        <LoadSpinner class="load-spinner" v-if="!tasksStore.notCompleted.length" />
        <ul v-else class="list">
            <Task v-for="task of tasksStore.notCompleted" :key="task._id" :task="task"/>
        </ul>
        
        <div class="new-task">
            <FormField ref="newTaskInput" label="Text" :input-options="{
                type: 'text',
                autocomplete: 'off',
                name: 'text',
                required: true
            }" v-model="text" @keyup.enter="createTask"/>
            <PrimaryButton class="new" type="submit" label="New" @click.left="createTask"/>
        </div>

        <h2>Completed</h2>
        <p v-if="!tasksStore.completed.length">
            No Completed Tasks
        </p>
        <ul v-else class="list completed">
            <Task v-for="task of tasksStore.completed" :key="task._id" :task="task"/>
        </ul>
    </div>
</template>

<script>
    import store from '../../../store';
    import Task from './Task.vue';
    import FormField from '../../../components/form/FormField.vue';
    import LoadSpinner from '../../../components/LoadSpinner.vue';
    import PrimaryButton from '../../../components/PrimaryButton.vue';

    export default {
        components: { Task, PrimaryButton, FormField, LoadSpinner },
        data: () => ({
            tasksStore: store.tasks,
            text: ''
        }),
        methods:
        {
            createTask()
            {
                console.log(this.text);
                this.tasksStore.create({text: this.text});

                this.$refs.newTaskInput.value = '';
            }
        },
        mounted()
        {
            this.tasksStore.getAll();
        }
    }
</script>

<style scoped>
    .tasks
    {
        display: grid;
        grid-template-columns: 50vw;
        justify-content: center;
        justify-items: center;
        align-items: center;
        gap: 2rem;
    }

    .tasks .title
    {
        margin-bottom: 1em;
    }

    .tasks .list
    {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;
        width: 100%;
    }
    
    .new-task
    {
        display: flex;
        gap: 1rem;
        align-items: center;
        width: 100%;
    }

    .new-task .form-field
    {
        width: 100%;
    }

    .new-task .btn
    {
        font-size: 1rem;
    }
</style>
