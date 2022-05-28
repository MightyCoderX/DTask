<template>
    <div class="stats">
        <div class="header">
            <h1 class="title">Stats</h1>
            <div class="inputs">
                <select class="select-period" v-model="period">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="alltime">All Time</option>
                </select>
                <input type="date" v-model="date" v-if="showDateInput" class="select-date">
            </div>
        </div>
        <div class="num-stats">
            <NumStatCard :value="currentStats?.addedTasks || 0" name="Added"/>
            <NumStatCard :value="currentStats?.editedTasks || 0" name="Edited"/>
            <NumStatCard :value="currentStats?.completedTasks || 0" name="Completed"/>
            <NumStatCard :value="currentStats?.deletedTasks || 0" name="Deleted"/>
        </div>
    </div>
</template>

<script>
    import store from '../../../store';
    import NumStatCard from './NumStatCard.vue';

    export default {
        data()
        {
            return {
                statsStore: store.stats,
                periodVal: 'daily',
                dateVal: (new Date()).toISOString().split('T')[0],
                currentStats: null,
                showDateInput: this.periodVal !== 'alltime'
            };
        },
        computed:
        {
            period: 
            {
                get()
                {
                    return this.periodVal;
                },
                set(val) {
                    this.showDateInput = val !== 'alltime';
                    this.periodVal = val;
                    this.updateStats(this.period, this.date);
                }
            },
            date:
            {
                get()
                {
                    return this.dateVal;
                },
                set(val)
                {
                    this.dateVal = val;
                    this.updateStats(this.period, val);
                }
            }
        },
        methods:
        {
            async updateStats(period, dateStr)
            {
                const functionName = `get${this.period[0].toUpperCase() + this.period.slice(1)}`;
                console.log(functionName);
                await this.statsStore[functionName](dateStr);
                this.currentStats = this.statsStore[period];
            }
        },
        mounted()
        {
            this.updateStats(this.period, this.date);
        },
        components: { NumStatCard }
    }
</script>

<style scoped>
    .header
    {
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.5rem 1rem;
        margin-bottom: 2rem;
    }

    .header .title
    {
        flex: 1 0;
    }

    .header .inputs
    {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex: 0 0;
    }

    .header .inputs *
    {
        display: block;
        height: 2rem;
        padding: 0 1em;
    }

    .num-stats
    {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 1rem;
    }

</style>