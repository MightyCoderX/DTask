<template>
    <div class="tasks">
        <h1 class="title">Tasks</h1>
        <LoadSpinner v-if="tasksStore.tasks === null" />

        <NamedList v-else listTitle="To Do">
            <div class="new-task">
                <FormField ref="newTaskInput" label="Text" :input-options="{
                    type: 'text',
                    autocomplete: 'off',
                    name: 'text',
                    required: true
                }" v-model="text" @keyup.enter="createTask"/>
                
                <IconButton class="add-task" @click="createTask" icon-name="add" />
            </div>
            <Task v-for="task of tasksStore.notCompleted" :key="task._id" :task="task"/>
            <p class="placeholder" v-if="!tasksStore.notCompleted.length">You've completed all tasks! <br>Great job!</p>
        </NamedList>

        <hr class="spacer">

        <NamedList class="completed" listTitle="Completed">
            <Task v-for="task of tasksStore.completed" :key="task._id" :task="task" completed/>
            <p class="placeholder" v-if="!tasksStore.completed.length">You've not completed any task yet!</p>
        </NamedList>
    </div>
</template>

<script>
    import FormField from '../../../components/form/FormField.vue';
import Icon from '../../../components/Icon.vue';
import IconButton from '../../../components/IconButton.vue';
import LoadSpinner from '../../../components/LoadSpinner.vue';
import PrimaryButton from '../../../components/PrimaryButton.vue';
import store from '../../../store';
import NamedList from './NamedList.vue';
import Task from './Task.vue';

    export default {
        components: { Task, PrimaryButton, FormField, LoadSpinner, Icon, IconButton, NamedList },
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
        align-items: center;
        align-content: flex-start;
        gap: 2rem;
    }

    .title
    {
        text-align: center;
    }

    .load-spinner
    {
        place-self: center;
    }

    .task
    {
        background-color: #111;
    }

    .task:first-of-type
    {
        border-radius: 0.5em 0.5em 0 0;
    }

    .task:last-of-type
    {
        border-radius: 0 0 0.5em 0.5em;
    }

    .task:only-of-type
    {
        border-radius: 0.5em;
    }

    .task:nth-child(odd)
    {
        background-color: #151515;
    }

    .named-list.completed .task .text
    {
        text-decoration: line-through;
    }

    .named-list .placeholder
    {
        text-align: center;
        color: #666;
    }

    .spacer
    {
        border-color: #444;
        width: 90%;
    }
    
    .new-task
    {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 0.5rem;
        flex-wrap: wrap;
        max-width: 500px;
        margin-bottom: 1rem;
    }

    .new-task .form-field
    {
        flex: 10 0 12em;
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
        border-radius: 100vw;
        text-align: center;
        max-width: 5em;
        flex: 1 1 0;
    }
</style>
