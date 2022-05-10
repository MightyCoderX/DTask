<template>
    <div class="tasks">
        <h1 class="title">Tasks</h1>
        <ul class="list">
            <Task v-for="task of tasks.filter(task => !task.completed)" :key="task._id" :task="task"/>
            <Button class="new" label="New" />
        </ul>
        <ul class="list completed">
            <Task v-for="task of tasks.filter(task => task.completed)" :key="task._id" :task="task"/>
        </ul>
    </div>
</template>

<script>
    import store from '../../../store';
    import Task from './Task.vue';
    import Button from '../../../components/Button.vue';

    export default {
        components: { Task, Button },
        data()
        {
            return {
                tasks: []
            }
        },
        created()
        {
            fetch('//localhost:5000/api/tasks', {
                headers: {
                    'Authorization': 'Bearer ' + store.auth.getToken()
                }
            })
            .then(res => res.json())
            .then(data =>
            {
                console.log(data);
                this.tasks = data;
            })
            .catch(console.error);
        }
    }
</script>

<style scoped>
    .tasks
    {
        display: flex;
        flex-direction: column;
        align-items: center;
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
        width: 50vw;
    }

    .tasks .btn
    {
        align-self: flex-start;
    }
</style>
