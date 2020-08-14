<template>
    <div class="container">

        <div>
            <div class="greeting">{{greeting}}</div>
            <div class="clock">{{dateTime.time}}</div>
        </div>

        <div>
            <div class="date">{{dateTime.date}}</div>
            <div class="weather" :title="location.description">{{location.location}}, {{location.temp}}°C</div>
        </div>

        <Taskcards 
            :tasks="tasks">
        </Taskcards>

        <div class="calendar-container">
            <div>Calendar</div>
            <div>Tasks</div>
            <Calendar 
                :month="month"
                :week="week"
                :date="focusedDate"
                :tasks="tasks"
                v-on:calendar-date-clicked="focusedDateChange">
            </Calendar>
            <Taskwidget 
                :date="focusedDate" 
                :month="month" 
                :tasks="tasks"
                v-on:today-selection="focusToday"
                v-on:week-selection="focusWeek"
                v-on:month-selection="focusMonth">
            </Taskwidget>
        </div>
    </div>
</template>
<script>
module.exports = {
    props: ['user', 'location', 'tasks'],
    components: {
        'Taskcards': httpVueLoader('./Taskcards.vue'),
        'Calendar': httpVueLoader('./Calendar.vue'),
        'Taskwidget': httpVueLoader('./Taskwidget.vue')
    },
    data(){
        return{
            greeting: '',
            dateTime: {
                time: '',
                date : '',
            },
            week : ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            month : ['January','February','March','April','May','June','July','August','September','October','November','December'],
            focusedDate: {
                year: 0,
                month: 0,
                date: 0,
            }
        }
    },
    created() {
        this.updateDateTime();
        this.focusedDate.month = new Date().getMonth() + 1;
        this.focusedDate.year = new Date().getFullYear();
        this.focusedDate.date = new Date().getDate();
    },
    mounted(){
        setInterval(this.updateDateTime , 1000);
    },
    methods: {
        updateDateTime: function(){
            let cd = new Date();
            let hour = `${cd.getHours()}`;
            let minute = `${this.zeroPadding(cd.getMinutes(), 2)}`;
            let dayNight = 'PM';
            if(cd.getHours() == 0){
                hour = '12';
            }else if(cd.getHours() > 12){
                hour = `${cd.getHours() - 12}`;
            }
            if(cd.getHours() < 12){
                dayNight = 'AM';
            }
            this.updateGreeting(cd.getHours());
            this.dateTime.time = `${hour}:${minute}${dayNight}`;
            this.dateTime.date = `${this.week[cd.getDay()]}, ${cd.getDate()} ${this.month[cd.getUTCMonth()]} ${cd.getFullYear()}`;
        },
        zeroPadding: function(num, digit) {
            var zero = '';
            for(var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
        updateGreeting: function(hour){
            if(hour >= 17 && hour < 24){
                this.greeting = `Good Evening, ${this.user.name}`
            }else if(hour >= 12 && hour < 17){
                this.greeting = `Good Afternoon, ${this.user.name}`
            }else{
                this.greeting = `Good Morning, ${this.user.name}`
            }
        },
        focusedDateChange: function(year, month, date){
            this.focusedDate.year = year;
            this.focusedDate.month = month;
            this.focusedDate.date = date;
        },
        focusToday: function(){
            this.focusedDate.date = new Date().getDate();
        },
        focusWeek : function(){
            this.focusedDate.date = -1;
        },
        focusMonth : function(){
            this.focusedDate.date = -2;
        }
    },
}
</script>
<style scoped>
.container{
    display: grid;
    grid-template-rows: min-content min-content min-content 1fr;
    padding: 15px 25px 0px 15px;
}
.container > div:not(:last-child){
    display: flex;
    justify-content: space-between;
}
.container > div:nth-child(2){
    font-weight: normal;
    font-size: .8rem;
    font-style: normal;
    color: var(--dark-grey);
    margin-bottom: 15px;
}
.calendar-container{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: min-content 1fr;
    column-gap: 15px;
}
.calendar-container > div:first-child, .calendar-container > div:nth-child(2){
    font-weight: 600;
    font-size: 1.3rem;
    font-style: normal;
    color: var(--dark-grey);
    margin-bottom: 15px;
    /* grid-column: 1 / span 2; */
}
</style>