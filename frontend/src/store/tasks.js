import API from '../config/API';
import { tryFetchJson } from '../utils/http';
import user from './user';

export default {
    all: null,
    notCompleted: [],
    completed: [],
    selected: [],
    update()
    {
        if(!this.all) return;
        this.all?.sort?.((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        this.all?.forEach?.(task => task.selected = false);
        this.notCompleted = this.all?.filter?.(task => !task.completed);
        this.completed = this.all?.filter?.(task => task.completed);
    },
    async create(taskData)
    {
        if(!taskData.text.trim()) return;
        const data = await tryFetchJson(API.TASKS,
        {
            method: 'POST',
            body:
            {
                text: taskData.text.trim()
            },
            headers:
            {
                'Authorization': 'Bearer ' + user.getToken()
            }
        });

        if(!data) return;

        this.all.push(data);
        
        this.update();
    },
    get(id)
    {
        return this.all?.find?.(t => t._id === id);
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

        if(!data) return;

        this.all = data;

        this.update();
        return this.all;
        
    },
    async complete(task)
    {
        this.get(task._id).completed = true;
        if(task.completed === true) return;
        const data = await tryFetchJson(`${API.TASKS}/${task._id}`, {
            headers:
            {
                'Authorization': 'Bearer ' + user.getToken()
            },
            method: 'PUT',
            body:
            {
                completed: true
            }
        });

        console.log('Completed task:', task._id, data);
        
        this.update();
    },
    async edit(task, newText)
    {
        this.get(task._id).text = newText;
        
        await tryFetchJson(`${API.TASKS}/${task._id}`, {
            headers:
            {
                'Authorization': 'Bearer ' + user.getToken()
            },
            method: 'PUT',
            body:
            {
                text: newText
            }
        });

        this.update();
    },
    async delete(task)
    {
        this.all = this.all.filter(t => t._id !== task._id);
        this.update();

        await tryFetchJson(`${API.TASKS}/${task._id}`, {
            headers:
            {
                'Authorization': 'Bearer ' + user.getToken()
            },
            method: 'DELETE'
        });
        
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
            const task = this.all.find(task => task._id === id);
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