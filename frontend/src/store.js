import { reactive } from 'vue';

export default reactive({
    auth: {
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
});