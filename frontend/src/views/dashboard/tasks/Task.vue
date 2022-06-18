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
        <time class="created-date" 
            :title="'Created' + dateCreated.toDateString() + ' ' + dateCreated.toLocaleTimeString()"
            :datetime="dateCreated">
            {{ dateCreated.toLocaleDateString() }}
        </time>
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
    import store from '../../../store';
    import TaskText from './TaskText.vue';
        
    export default {
        props:
        {
            taskId: String,
            completed: Boolean,
            showControls: Boolean,
            showSelect: Boolean
        },
        data()
        {
            return {
                editing: false,
                currentText: '',
                dateCreated: new Date(0),
                isMobile: store.isMobile,
                expanded: false,
                task: {}
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
            this.task = store.tasks.get(this.taskId);
            this.currentText = this.task.text;
            this.dateCreated = new Date(this.task.createdAt);
        },
        updated()
        {
            if(this.editing) return;
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
                    const range = document.createRange();
                    const selection = window.getSelection();
                    range.selectNodeContents(txtInput);
                    range.collapse(false);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }, 0);
                
                this.editing = true;

                const edited = async () =>
                {
                    this.editing = false;

                    txtInput.style.height = '100%';
                    txtInput.removeAttribute('style');
                    
                    txtInput.removeEventListener('keydown', pressEnter);
                    txtInput.removeEventListener('blur', edited);

                    if(!this.currentText.trim())
                    {
                        this.currentText = prevText;
                        return;
                    }

                    if(prevText.trim() === this.currentText.trim()) return;

                    this.task.text = this.currentText.trim();
                    await store.tasks.edit(this.task, this.currentText.trim());
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
        color: #ddd;
        border: 0.15em solid var(--accent-color);
        padding: 0.5em;
        border-radius: 0.5em;
        outline: none;
        font-size: 1rem;
        width: 100%;
        max-height: inherit;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: pre;
    }

    .task.expanded .text,
    .task.editing .text
    {
        position: absolute;
        white-space: initial;
        background-color: inherit;
        z-index: 2;
        align-self: stretch;
        min-height: 3rem;
        height: 100%;
    }

    .task.expanded .text
    {
        overflow-y: auto;
    }

    .task.editing .text
    {
        resize: vertical;
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