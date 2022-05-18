<template>
    <li class="task">
        <input class="text" type="text" :readonly="!editing" v-model="currentText" @click="edit" >
        <div class="buttons">
            <Icon class="complete" @click="complete" name="check" />
            <Icon class="del" @click="del" name="delete" />
        </div>
    </li>
</template>

<script>
    import store from '../../../store'; 
    import Icon from '../../../components/Icon.vue';
    
    export default {
        props: 
        {
            task: Object
        },
        data()
        {
            return {
                editing: false,
                currentText: ''
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

                spanText.addEventListener('keydown', pressEnter, { once: true });
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
        components: { Icon }
    }
</script>

<style scoped>
    .task
    {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1em;
        border-bottom: 0.2em solid #000e33;
        width: 100%;
        padding: 0 1em 0 0;
    }

    .task .text
    {
        background-color: transparent;
        color: #ddd;
        border: 0.15em solid var(--accent-color);
        padding: 0.5em;
        border-radius: 0.5em;
        outline: none;
        font-size: 1rem;
    }

    .task .text:read-only
    {
        border-color: transparent;
    }

    .task .md-icon
    {
        cursor: pointer;
        transition: color 0.2s;
    }

    .task .md-icon.del
    {
        color: #891a1a;
    }

    .task .md-icon.del:hover
    {
        color: firebrick;
    }

    .task .md-icon.complete
    {
        color: #186318;
    }

    .task .md-icon.complete:hover
    {
        color: forestgreen;
    }
</style>