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
        <div class="buttons" v-if="showControls">
            <CompleteButton @click="complete"/>
            <DeleteButton @click="del" />
        </div>
    </li>
</template>

<script>
    import Checkbox from '../../../components/Checkbox.vue';
    import Icon from '../../../components/Icon.vue';
    import store from '../../../store';
    import CompleteButton from '../../../components/tasks/CompleteButton.vue';
    import DeleteButton from '../../../components/tasks/DeleteButton.vue';
    
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
                currentText: ''
            }
        },
        computed:
        {
            selected:
            {
                get()
                {
                    return store.tasks.get(this.task._id).selected;
                },
                set(val)
                {
                    store.tasks.get(this.task._id).selected = val;
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
                if(this.editing) return;

                const prevText = this.currentText;

                const spanText = e.target;

                spanText.focus();
                this.editing = true;

                const edited = () =>
                {
                    this.editing = false;

                    if(prevText.trim() === this.currentText.trim()) return;

                    console.log('Edited ' + this.task._id);

                    fetch(`//localhost:5000/api/tasks/${this.task._id}`, {
                        headers:
                        {
                            'Authorization': 'Bearer ' + store.auth.getToken()
                        },
                        method: 'PUT',
                        body: new URLSearchParams({
                            text: this.currentText.trim()
                        })
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

                    spanText.removeEventListener('keydown', pressEnter);
                }

                spanText.addEventListener('keydown', pressEnter);
                spanText.addEventListener('blur', edited, { once: true });
            },
            del(e)
            {
                store.tasks.delete(this.task);
            },
            complete(e)
            {
                store.tasks.toggleCompleted(this.task);
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
    }

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

    .buttons
    {
        display: flex;
        gap: 1rem;
    }

    .task.completed .text
    {
        text-decoration: line-through;
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