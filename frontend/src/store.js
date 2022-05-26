import { reactive } from 'vue';
import API from './config/API';

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
    selected: [],
    update()
    {
        if(!this.tasks) return;
        this.tasks?.sort?.((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        this.tasks?.forEach?.(task => task.selected = false);
        this.notCompleted = this.tasks?.filter?.(task => !task.completed);
        this.completed = this.tasks?.filter?.(task => task.completed);
    },
    create(taskData)
    {
        if(!taskData.text.trim()) return;
        fetch(API.TASKS,
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
        return this.tasks?.find?.(t => t._id === id);
    },
    async getAll()
    {
        this.update();

        try
        {
            const data = await (await fetch(API.TASKS, {
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
            return null;
        }
        
    },
    toggleCompleted(task)
    {
        fetch(`${API.TASKS}/${task._id}`, {
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
        fetch(`${API.TASKS}/${task._id}`, {
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
    },
    toggleSelect(id, value)
    {
        if(this.selected.includes(id) || !value)
        {
            this.selected = this.selected.filter(selId => selId !== id);
        }
        else
        {
            const task = this.tasks.find(task => task._id === id);
            this.selected.push(task._id);
        }
    },
    isSelected(id)
    {
        return this.selected.find(task => task._id === id) || false;
    },
    clearSelection()
    {
        this.selected = [];
    }
}

const stats = {
    all: null,
    daily: null,
    weekly: null,
    monthly: null,
    async getAll()
    {
        try
        {
            const data = await (await fetch(API.ALL_STATS, {
                headers: {
                    'Authorization': 'Bearer ' + auth.getToken()
                }
            })).json();

            this.all = data;

            this.update();
            return this.all;
        }
        catch(err)
        {
            console.error(err);
            return null;
        }
    },
    async getDaily(day)
    {
        try
        {
            const data = await (await fetch(API.DAILY_STATS, {
                query: {
                    day: day || ''
                },
                headers: {
                    'Authorization': 'Bearer ' + auth.getToken()
                }
            })).json();

            this.daily = data;

            this.update();
            return this.daily;
        }
        catch(err)
        {
            console.error(err);
            return null;
        }
    },
    async getWeekly()
    {
        try
        {
            const data = await (await fetch(API.WEEKLY_STATS, {
                headers: {
                    'Authorization': 'Bearer ' + auth.getToken()
                }
            })).json();

            this.weekly = data;

            this.update();
            return this.weekly;
        }
        catch(err)
        {
            console.error(err);
            return null;
        }
    },
    async getMonthly()
    {
        try
        {
            const data = await (await fetch(API.MONTHLY_STATS, {
                headers: {
                    'Authorization': 'Bearer ' + auth.getToken()
                }
            })).json();

            this.monthly = data;

            this.update();
            return this.monthly;
        }
        catch(err)
        {
            console.error(err);
            return null;
        }
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