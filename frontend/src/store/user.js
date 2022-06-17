import API from '../config/API';
import { tryFetchJson } from '../utils/http';

export default {
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
            body: formData
        });

        if(!resData) return;
        
        this.setToken(resData.token);
    },
    async register(formData)
    {
        const resData = await tryFetchJson(API.USER_REGISTER, {
            method: 'POST',
            body: formData
        });

        if(!resData) return;
        
        this.setToken(resData.token);
    },
    async getInfo()
    {
        if(this.info) return this.info;
        
        const userInfo = await tryFetchJson(API.AUTHED_USER_INFO, {
            headers:
            {
                'Authorization': 'Bearer ' + this.getToken()
            }
        }, {});

        this.info = userInfo;

        return userInfo;
    }
}