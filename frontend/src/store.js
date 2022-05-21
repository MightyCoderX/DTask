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
    tasks: [],
    notCompleted: [],
    completed: [],
    update()
    {
        this.tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        this.notCompleted = this.tasks.filter(task => !task.completed);
        this.completed = this.tasks.filter(task => task.completed);
    },
    create(taskData)
    {
        if(!taskData.text.trim()) return;
        fetch('//localhost:5000/api/tasks',
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
    async getAll()
    {
        this.update();

        try
        {
            const data = await (await fetch('//localhost:5000/api/tasks', {
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
        fetch(`//localhost:5000/api/tasks/${task._id}`, {
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
            const targetTask = this.tasks.find(t => t._id == task._id);

            targetTask.completed = data.completed;
            this.update();
        });
    },
    delete(task)
    {
        fetch(`//localhost:5000/api/tasks/${task._id}`, {
            headers:
            {
                'Authorization': 'Bearer ' + auth.getToken()
            },
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data =>
        {
            this.tasks = this.tasks.filter(t => t._id !== data._id);
            this.update();
        });
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