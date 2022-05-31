<template>
    <li class="task" :class="{ 'completed': completed, 'selected': selected }" >
        <Checkbox class="select" v-model="selected" v-if="showSelect" />
        <input 
            class="text" 
            type="text" 
            :readonly="!editing" 
            v-model="currentText" 
            :title="currentText" 
            @click="edit"
        >
        <time class="created-date" :title="dateCreated.toDateString() + ' ' + dateCreated.toLocaleTimeString()">{{ dateCreated.toLocaleDateString() }}</time>
        <div class="buttons" v-if="showControls">
            <CompleteButton @click="complete" v-if="!completed" title="Complete task"/>
            <DeleteButton @click="del" title="Delete task"/>
        </div>
    </li>
</template>

<script>
    import Checkbox from '../../../components/Checkbox.vue';
    import Icon from '../../../components/Icon.vue';
    import store from '../../../store';
    import CompleteButton from '../../../components/tasks/CompleteButton.vue';
    import DeleteButton from '../../../components/tasks/DeleteButton.vue';
    import API from '../../../config/API';
    
    export default {
        props:
        {
            task: Object,
            completed: Boolean,
            showControls: Boolean,
            showSelect: Boolean
        },
        data()
        {
            return {
                editing: false,
                currentText: '',
                dateCreated: new Date(this.task.createdAt),
            }
        },
        computed:
        {
            selected:
            {
                get()
                {
                    return store.tasks.selected.includes(this.task._id);
                },
                set(val)
                {
                    store.tasks.toggleSelect(this.task._id, val);
                }
            }
        },
        created()
        {
            this.currentText = this.task.text;
        },
        methods:
        {
            edit(e)
            {
                if(this.task.completed) return;
                if(this.editing) return;

                const prevText = this.currentText;

                const spanText = e.target;

                spanText.focus();
                this.editing = true;

                const edited = () =>
                {
                    this.editing = false;
                    
                    spanText.removeEventListener('keydown', pressEnter);
                    spanText.removeEventListener('blur', edited);

                    if(prevText.trim() === this.currentText.trim()) return;

                    console.log('Edited ' + this.task._id);

                    

                    fetch(`${API.TASKS}/${this.task._id}`, {
                        headers:
                        {
                            'Authorization': 'Bearer ' + store.user.getToken()
                        },
                        method: 'PUT',
                        body:
                        {
                            text: this.currentText.trim()
                        }
                    })
                    .then(res => res.json())
                    .then(data =>
                    {
                        console.log(data);
                    });
                }

                const pressEnter = e =>
                {
                    if(e.key !== 'Enter') return;
                    
                    edited(e);
                }

                spanText.addEventListener('keydown', pressEnter);
                spanText.addEventListener('blur', edited);
            },
            del(e)
            {
                store.tasks.delete(this.task);
            },
            complete(e)
            {
                store.tasks.complete(this.task);
            }
        },
        components: { Icon, Checkbox, DeleteButton, CompleteButton }
    }
</script>

<style scoped>
    .task
    {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0 0.5em;
        position: relative;
        z-index: 1;
        gap: 1rem;
    }

    /* .checkbox
    {
        margin-right: 0.5rem;
    } */

    .text
    {
        background-color: transparent;
        color: #ddd;
        border: 0.15em solid var(--accent-color);
        padding: 0.5em;
        border-radius: 0.5em;
        outline: none;
        font-size: 1rem;
        width: 100%;
        text-overflow: ellipsis;
    }

    .task .text:read-only
    {
        border-color: transparent;
    }

    .created-date
    {
        color: #999;
        font-size: 0.8rem;
    }

    .buttons
    {
        display: flex;
        gap: 1rem;
    }

    .task.completed .text
    {
        text-decoration: line-through;
        color: #999;
    }

    .task.selected::before
    {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        border-radius: inherit;
        background-color: #0000aa22 !important;
    }
</style>