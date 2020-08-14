<template>
    <tr>
        <td>
            <input :id="task._id" type="checkbox" :checked="task.completed" v-on:input="checked"/>
            <label :for="task._id"></label>
        </td>
        <td>{{task.description}}</td>
        <td>{{`${new Date(task.deadline).getDate()} ${month[new Date(task.deadline).getMonth()]} ${new Date(task.deadline).getFullYear()}`}}</td>
        <td v-if="task.completed_date">{{`${new Date(task.completed_date).getDate()} ${month[new Date(task.completed_date).getMonth()]} ${new Date(task.completed_date).getFullYear()}`}}</td>
        <td v-else></td>
        <td><span v-on:click="deleted">❌</span></td>
    </tr>
</template>
<script>
module.exports = {
    props: ['task'],
    data(){
        return {
            month : ['January','February','March','April','May','June','July','August','September','October','November','December']
        }
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
                    value: this.task.completed_date
                }
            ];

            axios({
                method: 'patch',
                url: process.env.API_BASEURL + `tasks/${this.task._id}`,
                data: updateOptions
            })
            .then((response) => {
                console.log("Task Updated");
                this.task.completed = !this.task.completed
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});   
        },
        deleted: function(){
            axios({
                method: 'delete',
                url: process.env.API_BASEURL + `tasks/${this.task._id}`,
            })
            .then((response) => {
                this.$emit('task-removed', this.task);
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
<style>

</style>