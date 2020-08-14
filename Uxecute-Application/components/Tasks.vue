<template>
    <div class="container">
        <div>
            <div>Tasks</div>
            <Addicon v-on:clicked="toggleModal"></Addicon>
        </div>
        <table border="0">
            <thead >
                <tr>
                    <th></th>
                    <th>Task Description</th>
                    <th>Deadline</th>
                    <th>Date Completed</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr is="Taskitemrow"
                    v-for="task in tasks.filter(task => !task.completed)" 
                    v-bind:key="task._id"
                    :task="task"
                    v-on:task-removed="deleteTask"
                    >
                </tr>
            </tbody>
            <tbody><tr><td colspan="5"><hr></td></tr></tbody>
            <tbody>
                <tr is="Taskitemrow"
                    v-for="task in tasks.filter(task => task.completed)" 
                    v-bind:key="task._id"
                    :task="task"
                    v-on:task-removed="deleteTask"
                    >
                </tr>
            </tbody>
        </table>
        <transition name="fade">
            <Addtask 
                v-show="showModal" 
                v-on:clicked="toggleModal" 
                v-on:add-task="addTask"
                >
            </Addtask>
        </transition>
    </div>
</template>
<script>
module.exports = {
    props: ['tasks', 'user'],
    components: {
        'Addicon' :  httpVueLoader('./icons/Addicon.vue'),
        'Addtask' :  httpVueLoader('./Addtask.vue'),
        'Taskitemrow': httpVueLoader('./Taskitemrow.vue')
    },
    created(){
    },
    methods: {
        toggleModal: function (){
            this.showModal = !this.showModal;
        },
        addTask: function(task){
            let data = task
            data.user = this.user.email
            axios({
                method: 'post',
                url: process.env.API_BASEURL + 'tasks',
                data: data
            })
            .then((response) => {
                this.$emit('task-added', response.data.task)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {

            });  
        },
        deleteTask: function(task){
            this.$emit('task-removed', task);
        }
    },
    data(){
        return {
            showModal: false,
            month : ['January','February','March','April','May','June','July','August','September','October','November','December']
        }
    }
}
</script>
<style scoped>
.container > div:first-child{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
.container::-webkit-scrollbar {
  display: none;
}
table{
    border-collapse: collapse;
    font-size: 0.8rem;
    width: 100%;
}
th {
    color: var(--light-grey);
     border-bottom: 1px solid var(--light-grey);
     text-align: left;
     padding-bottom: 7px;
}
td{
    padding: 7px 0;
}
hr {
    border: none;
    border-bottom: solid 1px var(--light-grey);
}

tbody > tr > td:nth-child(5) > span{
    opacity: 0;
    transition: 0.5s ease-out opacity;
    cursor: pointer;
}
tr:hover > td:nth-child(5) > span{
    opacity: 1;
}



/* Check box */
td > label{
    display: block;
    height: 1rem;
    width: 1rem;
    border: 1px solid var(--dark-grey);
    border-radius: 5px;
    position: relative;
}
input[type="checkbox"]{
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
</style>