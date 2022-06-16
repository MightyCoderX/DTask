<template>
    <div class="tasks">
        <PrimaryButton class="select-button" label="Select" @click="selecting = !selecting" v-if="!selecting"/>
        <div class="selection-controls" v-else>
                <p class="selected-count">Selected: <span class="count">{{ selectedLength }}</span></p>
                <div class="buttons">
                    <CompleteButton v-if="selectedLength" class="complete-selected" @click="complete"/>
                    <DeleteButton v-if="selectedLength" class="delete-selected" @click="del"/>
                    <IconButton icon-name="close" class="clear-selection" @click="selecting = !selecting"/>
                </div>
        </div>
        <div class="title">
            <h1>Tasks</h1>
        </div>

        
        <NamedList listTitle="To Do">
            <div class="new-task">
                <FormField ref="newTaskInput" label="Text" :input-options="{
                    type: 'text',
                    autocomplete: 'off',
                    name: 'text',
                    required: true
                }" v-model="text" @keyup.enter="createTask"/>
                
                <IconButton class="add-task" @click="createTask" icon-name="add" />
            </div>
            <LoadSpinner v-if="tasksStore.tasks === null" />
            <Task 
                v-else 
                v-for="task of tasksStore.notCompleted" 
                :key="task._id" 
                :task="task"
                :show-select="selecting"
                :show-controls="!selecting"
            />
            <p class="placeholder" v-if="tasksStore.tasks !== null && tasksStore.notCompleted?.length === 0">You've completed all tasks! <br>Great job!</p>
        </NamedList>

        <hr class="spacer">

        <NamedList class="completed" listTitle="Completed">
            <Task 
                v-for="task of tasksStore.completed" 
                :key="task._id" 
                :task="task" 
                completed
                :show-select="selecting"
                :show-controls="!selecting"
            />
            <p class="placeholder" v-if="!tasksStore.completed?.length">You've not completed any task yet!</p>
        </NamedList>
    </div>
</template>

<script>
    import FormField from '../../../components/form/FormField.vue';
    import Icon from '../../../components/Icon.vue';
    import IconButton from '../../../components/IconButton.vue';
    import LoadSpinner from '../../../components/LoadSpinner.vue';
    import PrimaryButton from '../../../components/PrimaryButton.vue';
    import CompleteButton from '../../../components/tasks/CompleteButton.vue';
    import DeleteButton from '../../../components/tasks/DeleteButton.vue';
    import store from '../../../store';
    import NamedList from './NamedList.vue';
    import Task from './Task.vue';

    export default {
        components: { Task, PrimaryButton, FormField, LoadSpinner, Icon, IconButton, NamedList, CompleteButton, DeleteButton },
        data()
        {
            return {
                tasksStore: store.tasks,
                text: '',
                selectingVal: false,
                syncInterval: null
            }
        },
        computed: 
        {
            selecting:
            {
                get()
                {
                    return this.selectingVal;
                },
                set(val)
                {
                    this.selectingVal = val;
                    if(!val)
                    {
                        this.tasksStore.clearSelection();
                    }
                }
            },
            selectedLength()
            {
                return this.tasksStore?.selected.length;
            }
        },
        methods:
        {
            createTask()
            {
                this.tasksStore.create({text: this.text});

                this.$refs.newTaskInput.value = '';
            },
            complete()
            {
                this.tasksStore.tasks
                .filter(task => this.tasksStore.selected.includes(task._id))
                .forEach(task =>
                {
                    this.tasksStore.complete(task);
                });
                
                console.log(this.tasksStore.tasks);

                this.selecting = false;
                this.tasksStore.clearSelection();
            },
            del()
            {
                this.tasksStore.tasks
                .filter(task => this.tasksStore.selected.includes(task._id))
                .forEach(task =>
                {
                    this.tasksStore.delete(task);
                });

                this.selecting = false;
                this.tasksStore.clearSelection();
            }
        },
        async created()
        {
            const syncTasks = async () =>
            {
                await this.tasksStore.getAll();
            }

            await syncTasks();
            this.syncInterval = setInterval(syncTasks, 5000);
        },
        unmounted()
        {
            clearInterval(this.syncInterval);
        }
    }
</script>

<style scoped>
    .tasks
    {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        width: 100%;
        position: relative;
    }

    .title
    {
        text-align: center;
        position: relative;
    }

    .title :nth-child(2)
    {
        /* position: absolute; */
        top: 0;
    }

    .select-button
    {
        position: absolute;
        top: 1.5rem;
        left: 1rem;
    }

    .selection-controls
    {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #111;
        padding: 0.8em;
        border-radius: 0.5em;
        width: calc(100% - 2rem);
        position: absolute;
        top: 1.5rem;
        left: 1rem;
        z-index: 100;
    }

    .selection-controls .selected-count
    {
        font-weight: 300;
    }
    
    .selection-controls .selected-count .count
    {
        font-weight: 500;
    }

    .selection-controls .buttons
    {
        display: flex;
        gap: 1rem;
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

    .named-list
    {
        z-index: 2;
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
