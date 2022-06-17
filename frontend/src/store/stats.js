import API from '../config/API';
import { tryFetchJson } from '../utils/http';
import user from './user';

export default {
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