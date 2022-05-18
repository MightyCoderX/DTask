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
            
            <Icon class="add-task" @click="createTask" name="add" />
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
    import FormField from '../../../components/form/FormField.vue';
import Icon from '../../../components/Icon.vue';
import LoadSpinner from '../../../components/LoadSpinner.vue';
import PrimaryButton from '../../../components/PrimaryButton.vue';
import store from '../../../store';
import Task from './Task.vue';

    export default {
        components: { Task, PrimaryButton, FormField, LoadSpinner, Icon },
        data: () => ({
            tasksStore: store.tasks,
            text: ''
        }),
        methods:
        {
            createTask()
            {
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
        padding-bottom: 5rem !important;
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
        align-items: center;
        width: 100%;
        gap: 0.5rem;
    }

    .new-task .form-field
    {
        width: 100%;
    }

    .new-task .form-field .input
    {
        color: red;
    }

    .new-task .add-task
    {
        font-size: 2rem;
        background-color: var(--accent-color);
        padding: 0.2rem;
        border-radius: 100%;
        cursor: pointer;
        opacity: 0.7;
        transition: 0.3s opacity;
    }
    
    .new-task .add-task:hover,
    .new-task .add-task:focus-visible
    {
        opacity: 1;
    }
</style>
