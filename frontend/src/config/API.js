const PORT = 5000;

const endpoints = {
    USER_REGISTER: '/users',
    USER_LOGIN: '/users/login',
    AUTHED_USER_INFO: '/users/me',
    TASKS: '/tasks',
    ALLTIME_STATS: '/stats/alltime',
    DAILY_STATS: '/stats/daily',
    WEEKLY_STATS: '/stats/weekly',
    MONTHLY_STATS: '/stats/monthly'
};

export default (() =>
{
    for(let endpoint in endpoints)
    {
        endpoints[endpoint] = `//${location.hostname}:${PORT}/api` + endpoints[endpoint];
    }

    return Object.freeze(endpoints);
})();
