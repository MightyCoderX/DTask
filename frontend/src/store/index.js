import { reactive } from 'vue';
// import API from '../config/API';
// import { tryFetchJson } from '../utils/http';
import user from './user.js';
import tasks from './tasks.js';
import stats from './stats.js';

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