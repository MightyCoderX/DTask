import { reactive } from 'vue';
import API from './config/API';

async function tryFetchJson(url, options, errReturnValue)
{
    try
    {
        const data = await (await fetch(url, options)).json();
        return data;
    }
    catch(err)
    {
        console.error(err);
        return errReturnValue;
    }
}

const user = {
    token: '',
    authenticated: !!localStorage.getItem('token'),
    info: null,
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
    },
    async login(formData)
    {
        const resData = await tryFetchJson(API.USER_LOGIN, {
            method: 'POST',
            body: new URLSearchParams(formData)
        });
        
        this.setToken(resData.token);
    },
    async register(formData)
    {
        const resData = await tryFetchJson(API.USER_REGISTER, {
            method: 'POST',
            body: new URLSearchParams(formData)
        });
        
        this.setToken(resData.token);
    },
    async getInfo()
    {
        const userInfo = await tryFetchJson(API.AUTHED_USER_INFO, {
            headers:
            {
                'Authorization': 'Bearer ' + user.getToken()
            }
        }, {});

        this.info = userInfo;

        return userInfo;
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
    async create(taskData)
    {
        if(!taskData.text.trim()) return;
        const data = await tryFetchJson(API.TASKS,
        {
            method: 'POST',
            body: new URLSearchParams({
                text: taskData.text.trim()
            }),
            headers:
            {
                'Authorization': 'Bearer ' + user.getToken()
            }
        });

        this.tasks.push(data);
        
        this.update();
    },
    get(id)
    {
        return this.tasks?.find?.(t => t._id === id);
    },
    async getAll()
    {
        this.update();

        const data = await tryFetchJson(API.TASKS, {
            headers:
            {
                'Authorization': 'Bearer ' + user.getToken()
            }
        });

        this.tasks = data;

        this.update();
        return this.tasks;
        
    },
    async complete(task)
    {
        if(task.completed === true) return;
        const data = await tryFetchJson(`${API.TASKS}/${task._id}`, {
            headers:
            {
                'Authorization': 'Bearer ' + user.getToken()
            },
            method: 'PUT',
            body: new URLSearchParams({
                completed: true
            })
        });
        
        task.completed = data.completed;
        this.update();
    },
    delete(task)
    {
        const data = fetch(`${API.TASKS}/${task._id}`, {
            headers:
            {
                'Authorization': 'Bearer ' + user.getToken()
            },
            method: 'DELETE'
        });
        
        if(!data) return;

        this.tasks = this.tasks.filter(t => t._id !== data._id);
        this.update();
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
    alltime: null,
    daily: null,
    weekly: null,
    monthly: null,
    async getAlltime()
    {
        const data = await tryFetchJson(API.ALLTIME_STATS, {
            headers:
            {
                'Authorization': 'Bearer ' + user.getToken()
            }
        });

        delete data._id;
        this.alltime = data;

        return this.alltime;
    },
    async getDaily(date)
    {
        const data = await tryFetchJson(API.DAILY_STATS+'?'+new URLSearchParams({
            date: date || ''
        }),
        {
            headers:
            {
                'Authorization': 'Bearer ' + user.getToken()
            }
        });

        delete data._id;
        this.daily = data;

        return this.daily;
    },
    async getWeekly(date)
    {
        const data = await tryFetchJson(API.WEEKLY_STATS+'?'+new URLSearchParams({
            date: date || ''
        }),
        {
            headers:
            {
                'Authorization': 'Bearer ' + user.getToken()
            }
        });

        delete data._id;
        this.weekly = data;

        return this.weekly;
    },
    async getMonthly(date)
    {
        const data = await tryFetchJson(API.MONTHLY_STATS+'?'+new URLSearchParams({
            date: date || ''
        }),
        {
            headers:
            {
                'Authorization': 'Bearer ' + user.getToken()
            }
        });

        delete data._id;
        this.monthly = data;

        return this.monthly;
    }
}

const widthMediaQuery = matchMedia('screen and (max-width: 450px)');

const store = reactive(
{
    isMobile: widthMediaQuery.matches,
    sidebarShown: true,
    user,
    tasks,
    stats
});

widthMediaQuery.addEventListener('change', e =>
{
    if(!e.matches) store.sidebarShown = true;
    store.isMobile = e.matches;
});

export default store;