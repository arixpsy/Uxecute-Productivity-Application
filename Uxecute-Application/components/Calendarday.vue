<template>
    <div v-on:click="clicked" :style="'animation-delay:'+ (date*25)+'ms'">
        <span class="date" 
            :class="{
                today: new Date(year, month - 1, date).valueOf() == today.valueOf(),
                selected: selecteddate.date == date && selecteddate.month == month && selecteddate.year == year
                }">{{date}}</span>
        <span class="dot" v-if="deadlinePresent"></span>
        <span class="dot completed" v-if="completedPresent"></span>
    </div>
</template>
<script>
module.exports = {
    props: ['year', 'month', 'date', 'selecteddate', 'tasks'],
    data(){
        return {
            today: new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()),
            itemDate: new Date(this.year, this.month - 1, this.date),
            deadlinePresent: false,
            completedPresent: false,
        }
    },
    created() {
        if (this.itemDate.valueOf() < this.today.valueOf()){
            let completedTasks = this.tasks.filter((task) => {
                let completed_date = new Date(task.completed_date);
                completed_date.setHours(0,0,0,0);
                return completed_date.valueOf() == this.itemDate.valueOf();
            })
            if (completedTasks.length > 0) this.completedPresent =  true;
        } else {
            let deadlines = this.tasks.filter((task) => {
                let deadline = new Date(task.deadline);
                deadline.setHours(0,0,0,0);
                return deadline.valueOf() == this.itemDate.valueOf();
            })
            if (deadlines.length > 0) this.deadlinePresent =  true;
        }
        
    },
    methods: {
        clicked: function(){
            this.$emit("calendar-date-clicked", this.year, this.month, this.date);
        }
    }
}
</script>
<style scoped>
div{
    display: grid;
    grid-template-rows: min-content 1fr;
    align-items: center;
    justify-items: center;
    height: 31px;
    font-size: 0.8rem;
    cursor: pointer;
    animation: appear 0.5s ease-out forwards;
    position: relative;
    opacity: 0;
    transform: translateY(15px);
    transition: .5s ease-out background-color;
}
@keyframes appear {
    from{
        opacity: 0;
        transform: translateY(15px);
    }
    to{
        opacity: 1;
        transform: translateY(0px);
    }
}
div:hover .date{
    background-color:var(--green);
}
span{
    display: block;
}
.dot{
    height: 5px;
    width: 5px;
    background-color: var(--red);
    border-radius: 100vh;
}
.dot.completed {
    background-color: var(--green);
}
.date{
    height: 20px;
    width: 20px;
    border-radius: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: ease-out 0.25s background-color;
}
.date.today, .date.selected.today{
    background-color: var(--orange);
}
.date.selected{
    background-color: var(--green);
}
</style>