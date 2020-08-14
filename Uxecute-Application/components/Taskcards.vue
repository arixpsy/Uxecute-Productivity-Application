<template>
    <div class="card-container">
        <div class="card">
            <div>{{card.completed}}</div>
            <div>Completed Tasks</div>
        </div>
        <div class="card">
            <div>{{card.incompleted}}</div>
            <div>Incompleted Task</div>
        </div>
        <div class="card">
            <div>{{card.due}}</div>
            <div>Tasks Due Today</div>
        </div>
    </div>
</template>
<script>
module.exports = {
    props:['tasks'],
    data(){
        return {
            card:{
                incompleted: 0,
                completed: 0,
                due: 0
            }
        }
    },
    created() {
        this.updatedCards();
    },
    methods: {
        sameDate: function(date1, date2){
            return date1.getMonth() == date2.getMonth() && date1.getYear() == date2.getYear() && date1.getDate() == date2.getDate()
        },
        updatedCards: function(){
            this.card.due = this.tasks.filter(task => this.sameDate(new Date(task.deadline), new Date) && !task.completed).length;
            this.card.completed = this.tasks.filter(task => this.sameDate(new Date(task.completed_date), new Date)).length;
            this.card.incompleted = this.tasks.filter(task => !task.completed).length;
        }
    },
    watch: {
        tasks: {
            handler: function(newTask, oldTask){
                this.updatedCards();
            },
            deep: true
        }
    },
}
</script>
<style scoped>
.card{
    width: 30%;
    height: 100px;
    border-radius: 15px;
    padding: 15px 15px;
    color: var(--dark-grey);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.card > div:nth-child(1){
    font-size: 2.5rem;
    font-weight: 600;
}
.card > div:nth-child(2){
    font-size: 0.9rem;
}
.card:nth-child(1){
    background-color: var(--blue);
}
.card:nth-child(2){
    background-color: var(--yellow);
}
.card:nth-child(3){
    background-color: var(--red);
}
.card-container{
    margin-bottom: 10px;
}
</style>