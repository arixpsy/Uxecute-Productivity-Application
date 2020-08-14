<template>
    <div class="task">
        <div class="task-box">
            <input :id="task._id" type="checkbox" v-model="task.completed" v-on:input="checked"/>
            <label :for="task._id"></label>
            <div></div>
        </div>
        <div class="task-text">{{task.description}}</div>
        <div class="task-date">{{deadlineDisplay}}</div>
    </div>
</template>
<script>
module.exports = {
    props: ['task', 'month'],
    data(){
        return {
            deadlineDisplay: ""
        }
    },
    created() {
        let date = new Date(this.task.deadline);
        this.deadlineDisplay = `${date.getDate()} ${this.month[date.getMonth()]}`;
    },
    methods: {
        checked: function(){
            let completedDate = null
            if (!this.task.completed){
                completedDate = new Date().toJSON();
                this.task.completed_date = completedDate;
            }else{
                this.task.completed_date = null;
            }
            let updateOptions = [
                {
                    propName: "completed",
                    value: !this.task.completed
                },
                {
                    propName: "completed_date",
                    value: completedDate
                }
            ];
            axios({
                method: 'patch',
                url: process.env.API_BASEURL + `tasks/${this.task._id}`,
                data: updateOptions
            })
            .then((response) => {
                console.log("Task Updated");
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {

            });   
        }
    },
}
</script>
<style scoped>
.task{
    padding: 5px 0;
    display: grid;
    grid-template-columns: min-content auto min-content;
    font-size: 0.8rem;
    position: relative;
}
.task-box > label{
    display: block;
    height: 1rem;
    width: 1rem;
    border: 1px solid var(--dark-grey);
    border-radius: 5px;
    position: relative;
}
input{
    display: none;
}
input[type="checkbox"] ~ div{
    position: absolute;
    height: 1px;
    width: 90%;
    right: 0;
    top: 13px;
    background-color: var(--dark-grey);
    transition: 0.5s ease-out transform;
    transform-origin: left;
    transform: scaleX(0);
}
input[type="checkbox"]:checked ~ div{
    transform: scaleX(1);
}
input[type="checkbox"] ~ label::after, input[type="checkbox"] ~ label::before{
    content: '';
    position: absolute;
    height: 2px;
    width: 8px;
    background-color: var(--dark-grey);
    transform-origin: left;
    top: 4px;
    left: 2px;
    transition: 0.25s ease-out transform;
}
input[type="checkbox"] ~ label::after{
    transform: rotate(45deg) scaleX(0);
    transition-delay: 0.25s;
}
input[type="checkbox"] ~ label::before{
    transform: rotate(-45deg) scaleX(0);
    width: 15px;
    top: 10px;
    left: 7px;
}
input[type="checkbox"]:checked ~ label::after{
    transform: rotate(45deg) scaleX(1);
    transition-delay: 0s;
}
input[type="checkbox"]:checked ~ label::before{
    transform: rotate(-45deg) scaleX(1);
    transition-delay: 0.25s;
}
.task > .task-text{
    overflow: hidden;
    padding-left: 10px;
}
.task > .task-date{
    white-space: nowrap;
}
</style>