<template>
    <li class="task" :class="{ completed, selected, expanded, editing }" >
        <Checkbox class="select" v-model="selected" v-if="showSelect" />
        <TaskText 
            class="text"
            type="text" 
            :contenteditable="editing" 
            v-model="currentText"
            :title="currentText"
            @select.prevent="" 
            @dblclick="isMobile ? null : edit()"
            @touchend="expand"
            @click.prevent.right="expand"
            contenteditable=""
            ref="textInput"
        />
        <time class="created-date" :title="dateCreated.toDateString() + ' ' + dateCreated.toLocaleTimeString()">{{ dateCreated.toLocaleDateString() }}</time>
        <div class="buttons" v-if="showControls">
            <EditButton @click="edit" v-if="!completed" title="Edit text"/>
            <CompleteButton @click="complete" v-if="!completed" title="Complete task"/>
            <DeleteButton @click="del" title="Delete task"/>
        </div>
    </li>
</template>

<script>
    import Checkbox from '../../../components/Checkbox.vue';
    import Icon from '../../../components/Icon.vue';
    import CompleteButton from '../../../components/tasks/CompleteButton.vue';
    import DeleteButton from '../../../components/tasks/DeleteButton.vue';
    import EditButton from '../../../components/tasks/EditButton.vue';
    import API from '../../../config/API';
    import store, {tryFetchJson} from '../../../store';
    import TaskText from './TaskText.vue';
    
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
                isMobile: store.isMobile,
                expanded: false
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
            expand()
            {
                this.expanded = !this.expanded;
            },
            edit()
            {
                if(this.task.completed) return;
                if(this.editing) return;

                const prevText = this.currentText;

                const txtInput = this.$refs.textInput.$el;

                setTimeout(() =>
                {
                    txtInput.focus();
                }, 0);
                
                this.editing = true;

                const edited = () =>
                {
                    this.editing = false;

                    txtInput.style.height = '100%';
                    txtInput.removeAttribute('style');
                    
                    txtInput.removeEventListener('keydown', pressEnter);
                    txtInput.removeEventListener('blur', edited);

                    if(prevText.trim() === this.currentText.trim()) return;
                    console.log({ prevText, currentText: this.currentText});

                    console.log('Edited ' + this.task._id);

                    tryFetchJson(`${API.TASKS}/${this.task._id}`, {
                        headers:
                        {
                            'Authorization': 'Bearer ' + store.user.getToken()
                        },
                        method: 'PUT',
                        body:
                        {
                            text: this.currentText.trim()
                        }
                    });
                }

                const pressEnter = e =>
                {
                    if(e.key !== 'Enter') return;
                    
                    edited(e);
                }

                txtInput.addEventListener('keydown', pressEnter);
                txtInput.addEventListener('blur', edited);
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
        components: { Icon, Checkbox, DeleteButton, CompleteButton, EditButton, TaskText }
    }
</script>

<style scoped>
    .task
    {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 3rem;
        max-height: 100px;
        padding: 0 0.5em;
        position: relative;
        z-index: 1;
        gap: 1rem;
    }

    .task.expanded,
    .task.editing
    {
        height: 100px;
    }

    /* .checkbox
    {
        margin-right: 0.5rem;
    } */

    .text
    {
        background-color: inherit;
        color: #ddd;
        border: 0.15em solid var(--accent-color);
        padding: 0.5em;
        border-radius: 0.5em;
        outline: none;
        font-size: 1rem;
        width: 100%;
        align-self: stretch;
        height: 100%;
        min-height: 3rem;
        max-height: inherit;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: pre;
    }

    .task.expanded .text
    {
        white-space: initial;
        overflow-y: auto;
        position: absolute;
    }

    .task.editing .text
    {
        white-space: initial;
        resize: vertical;
        position: absolute;
    }

    :not(.task.editing) .text
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