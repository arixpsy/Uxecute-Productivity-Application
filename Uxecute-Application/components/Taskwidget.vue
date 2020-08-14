<template>
    <div class="task-widget">
        <div>
            <span :class="{ active: date.date > 0 }"
                class="tab-item"
                v-if="new Date(date.year, date.month - 1, date.date).valueOf() == today.valueOf() || date.date < 0"
                v-on:click="$emit('today-selection')">
                Today
            </span>
            <span class="not-today tab-item" :class="{ active: date.date > 0}"  
                v-else>{{date.date}} {{month[date.month - 1]}}</span>
        </div>
        <div><span class="tab-item" v-on:click="$emit('week-selection')" :class="{ active: date.date == -1 }" >This Week</span></div>
        <div><span class="tab-item" v-on:click="$emit('month-selection')" :class="{ active: date.date == -2 }" >This Month</span></div>

        <div class="horizontal-break"></div>
        <div class="task-container">
            <transition-group name="fade-right" >
            <Taskitem 
                v-for="deadline in deadlines" 
                :key="deadline._id" 
                :task="deadline" 
                :month="month"
                :tablerow="false"
                >
            </Taskitem>
            </transition-group>
        </div>
    </div>
</template>
<script>
module.exports = {
    props: ['date', 'month', 'tasks'],
    components: {
        'Taskitem': httpVueLoader('./Taskitem.vue')
    },
    data(){
        return{
            today: new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()),
            deadlines: []
        }
    },
    methods: {
        updatedFilter: function(){
            // check if display week
            if ( this.date.date == -1 ){
                let startWeek = new Date(this.today)
                let endWeek = new Date(this.today)
                let startWeekDate = this.today.getDate() - this.today.getDay() + (this.today.getDay() === 0 ? -6 : 1);
                let endWeekDate = this.today.getDate() - (this.today.getDay() - 1) + 6;
                startWeek.setDate(startWeekDate)
                endWeek.setDate(endWeekDate)
                this.deadlines = this.tasks.filter((task) => {
                    let deadline = new Date(task.deadline)
                    deadline.setHours(0,0,0,0)
                    return deadline.valueOf() >= startWeek.valueOf() && deadline.valueOf() <= endWeek.valueOf()
                });
               return;
            }

            // check if display month
            if ( this.date.date == -2 ){
                let startMonth = new Date(this.today)
                let endMonth = new Date(this.today)
                startMonth.setDate(1)
                endMonth.setMonth(endMonth.getMonth() + 1)
                endMonth.setDate(0)
                this.deadlines = this.tasks.filter((task) => {
                    let deadline = new Date(task.deadline)
                    deadline.setHours(0,0,0,0)
                    return deadline.valueOf() >= startMonth.valueOf() && deadline.valueOf() <= endMonth.valueOf()
                });
                return
            }
            
            // check if selectedDate is past, future or current
            let selectedDate =  new Date(this.date.year, this.date.month - 1, this.date.date);
            if ( selectedDate.valueOf() < this.today.valueOf() ) {
                this.deadlines = this.tasks.filter((task) => {
                    if (task.completed_date == null) return false;
                    let completed = new Date(task.completed_date)
                    completed.setHours(0,0,0,0)
                    let focusDate = new Date(this.date.year, this.date.month - 1, this.date.date)
                    return completed.valueOf() == focusDate.valueOf()
                });
            } else if ( selectedDate.valueOf() > this.today.valueOf() ) {
                this.deadlines = this.tasks.filter((task) => {
                    let deadline = new Date(task.deadline)
                    deadline.setHours(0,0,0,0)
                    let focusDate = new Date(this.date.year, this.date.month - 1, this.date.date)
                    return deadline.valueOf() == focusDate.valueOf()
                });
            } else{
                this.deadlines = this.tasks.filter((task) => {
                    let deadline = new Date(task.deadline)
                    deadline.setHours(0,0,0,0)
                    let focusDate = new Date(this.date.year, this.date.month - 1, this.date.date)
                    return deadline.valueOf() == focusDate.valueOf()
                });
            }
        },
        clearFilter: function(){
            this.deadlines = [];
            this.$nextTick(()=>{
                this.updatedFilter();
            });
        }
    },
    created(){
        this.clearFilter();
    },
    watch: {
        date: {
            handler: function(newDate, oldDate){
                this.clearFilter();
            },
            deep: true
        }
    },
}
</script>
<style scoped>
.task-widget{
    display: grid;
    grid-template-columns: repeat(3, auto);
    column-gap: 10px;
    grid-template-rows: min-content min-content auto;
    justify-items: center;
}
.horizontal-break{
    grid-column: 1 / span 3;
    height: 1px;
    width: 100%;
    background-color: var(--light-grey);
    margin: 10px 0px;
}
.tab-item{
   cursor: pointer;
   padding: 5px 8px;
   border-radius: 100vh;
   font-size: 0.8rem;
   transition: 0.25s ease-out background-color;
}
.tab-item:not(.active):hover{
    background-color: var(--orange);
}
.active{
    background-color: var(--orange);
}
.active.not-today{
    background-color: var(--green);
}
.task-container{
    grid-column: 1 / span 3;
    width: 100%;
    list-style-position: inside;
    color: var(--dark-grey);
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 15px;
}
.fade-right-enter-active{
    transition: all 0.5s ease-out;
}
.fade-right-leave-active {
    transition: all 0.25s ease-out;
}
.fade-right-enter-active{
    transition-delay: 0.25s;
}
.fade-right-enter{
    opacity: 0;
    transform: translateX(100px);
}
.fade-right-leave-to{
    opacity: 0;
}
</style>