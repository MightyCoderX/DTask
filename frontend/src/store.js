import { reactive } from 'vue';

const auth = {
    token: '',
    authenticated: !!localStorage.getItem('token'),
    setToken(value)
    {
        if(!value) return;
        this.token = value;
        localStorage.setItem('token', value);
        this.authenticated = true;
    },
    getToken()
    {
        if(!localStorage.getItem('token')) return '';
        
        return localStorage.getItem('token');
    },
    removeToken()
    {
        localStorage.removeItem('token');
        this.authenticated = false;
    }
}

const tasks = {
    tasks: null,
    notCompleted: [],
    completed: [],
    update()
    {
        if(!this.tasks) return;
        this.tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        this.tasks.forEach(task => task.selected = false);
        this.notCompleted = this.tasks.filter(task => !task.completed);
        this.completed = this.tasks.filter(task => task.completed);
    },
    create(taskData)
    {
        if(!taskData.text.trim()) return;
        fetch('//192.168.1.74:5000/api/tasks',
        {
            method: 'POST',
            body: new URLSearchParams({
                text: taskData.text.trim()
            }),
            headers:
            {
                'Authorization': 'Bearer ' + auth.getToken()
            }
        })
        .then(res => res.json())
        .then(data =>
        {
            this.tasks.push(data);
            
            this.update();
        })
        .catch(console.error);
    },
    get(id)
    {
        return this.tasks.find(t => t._id === id);
    },
    async getAll()
    {
        this.update();

        try
        {
            const data = await (await fetch('//192.168.1.74:5000/api/tasks', {
                headers: {
                    'Authorization': 'Bearer ' + auth.getToken()
                }
            })).json();

            this.tasks = data;

            this.update();
            return this.tasks;
        }
        catch(err)
        {
            console.error(err);
            return [];
        }
        
    },
    toggleCompleted(task)
    {
        fetch(`//192.168.1.74:5000/api/tasks/${task._id}`, {
            headers:
            {
                'Authorization': 'Bearer ' + auth.getToken()
            },
            method: 'PUT',
            body: new URLSearchParams({
                completed: !task.completed
            })
        })
        .then(res => res.json())
        .then(data =>
        {
            const targetTask = this.get(data._id);

            targetTask.completed = data.completed;
            this.update();
        });
    },
    delete(task)
    {
        fetch(`//192.168.1.74:5000/api/tasks/${task._id}`, {
            headers:
            {
                'Authorization': 'Bearer ' + auth.getToken()
            },
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data =>
        {
            this.tasks = this.get(data._id);
            this.update();
        });
    },
    toggleSelect(id)
    {
        const i = this.tasks.findIndex(task => task._id === id);
        this.tasks[i].selected = !this.tasks[i]?.selected;
    }
}

const widthMediaQuery = matchMedia('screen and (max-width: 450px)');

const store = reactive(
{
    isMobile: widthMediaQuery.matches,
    sidebarShown: true,
    auth,
    tasks
});

widthMediaQuery.addEventListener('change', e =>
{
    if(!e.matches) store.sidebarShown = true;
    store.isMobile = e.matches;
});

export default store;