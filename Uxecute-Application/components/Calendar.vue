<template>
    <div class="calendar">
        <div>
            <div>
                <Arrowicon :direction="'left'" v-on:clicked="previousMonth"></Arrowicon>
                <Arrowicon :direction="'right'" v-on:clicked="nextMonth"></Arrowicon>
            </div>
            <div>
                {{month[selectedMonth - 1]}} {{selectedYear}}
            </div>
        </div>
        <div class="calendar-grid">
            <div class="day-header" v-for="day in week" v-bind:key="day">{{day.substring(0, 3)}}</div>
            <div v-for="n in blankDays" v-bind:key="'blank'+n"></div>
            <Calendarday 
                v-for="n in daysInMonth"
                v-bind:key="'day'+n"
                :tasks="tasks"
                :year="selectedYear" 
                :month="selectedMonth"
                :selecteddate="date"
                :date="n"
                v-on:calendar-date-clicked="focusedDateChange">
            </Calendarday>
        </div>
    </div>
</template>
<script>
module.exports = {
    props: ['month', 'week', 'date', 'tasks'],
    components: {
        'Arrowicon' :  httpVueLoader('./icons/Arrowicon.vue'),
        'Calendarday' :  httpVueLoader('./Calendarday.vue'),
    },
    data(){
        return {
            selectedMonth: 0,
            selectedYear: 0,
            daysInMonth: 0,
            blankDays: 0,
        }
    },
    methods: {
        nextMonth: function() {
            if (this.selectedMonth == 12) {
                this.selectedMonth = 1;
                this.selectedYear++;
            } else {
                this.selectedMonth++;
            }
            this.resetDaysInMonth();
            this.resetBlankDays();
        },
        previousMonth: function() {
            if (this.selectedMonth == 1) {
                this.selectedMonth = 12;
                this.selectedYear--;
            } else {
                this.selectedMonth--;
            }
            this.resetDaysInMonth();
            this.resetBlankDays();
        },
        resetDaysInMonth: function() {
            this.daysInMonth = 0
            this.$nextTick(()=>{
                this.daysInMonth = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
            });
            
        },
        resetBlankDays: function() {
            this.blankDays = 0
            let firstDay = new Date(this.selectedYear, this.selectedMonth - 1).getDay();
            this.blankDays = firstDay
        },
        focusedDateChange: function(year, month, date){
            this.$emit("calendar-date-clicked", year, month, date);
        }
    },
    created() {
        this.selectedMonth = this.date.month
        this.selectedYear = this.date.year
        this.resetDaysInMonth();
        this.resetBlankDays();
    },
}
</script>
<style scoped>
.calendar {
    height: 100%;
    width: 300px;
    color: var(--dark-grey);
    overflow: hidden;
}
.calendar > div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.calendar > div:first-child > div:first-child{
    display: flex;
    width: 45px;
    justify-content: space-between;
}
.calendar-grid, .calendar-grid-days{
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}
.calendar-grid-days{
    grid-column: span 7;
}
.day-header{
    color: var(--light-grey);
    padding: 15px 0px;
    text-align: center;
    font-size: 0.8rem;
}
</style>