import { reactive } from 'vue';

const auth = {
    token: '',
    setToken(value)
    {
        if(!value) return;
        this.token = value;
        localStorage.setItem('token', value);
    },
    getToken()
    {
        if(!localStorage.getItem('token')) return '';
        
        return localStorage.getItem('token');
    },
    removeToken()
    {
        localStorage.removeItem('token');
    },
    authenticated()
    {
        return !!this.getToken();
    }
}

const tasks = {
    tasks: [],
    notCompleted: [],
    completed: [],
    update()
    {
        this.notCompleted = this.tasks.filter(task => !task.completed);
        this.completed = this.tasks.filter(task => task.completed);
    },
    create(data)
    {
        fetch('//localhost:5000/api/tasks', {
            method: 'POST',
            body: new URLSearchParams({
                text: data.text.trim()
            }),
            headers:
            {
                'Authorization': 'Bearer ' + auth.getToken()
            }
        })
        .then(res => res.json())
        .then(data =>
        {
            console.log(data);
            
            this.update();
        })
        .catch(console.error);
    },
    async getAll()
    {
        this.update();

        if(this.tasks.length) return this.tasks;

        try
        {
            const data = await (await fetch('//localhost:5000/api/tasks', {
                headers: {
                    'Authorization': 'Bearer ' + auth.getToken()
                }
            })).json();

            console.log(data);
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
            console.log(data);
            this.tasks.find(t => t.id == task.id).completed = data.completed;
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
            console.log(data);
            this.update();
        });
    }
}

export default reactive({ auth, tasks });