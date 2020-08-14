<template>
    <div class="overlay">
        <div class="modal-exit" v-on:click="click"></div>
        <div class="modal">
            <form v-on:submit.prevent="add">
                <span>New Task</span>
                <div class="field">
                <input type="text" id="newTaskDescription" v-model="taskDescription"  placeholder=" "/>
                <label class="input-text-label">Task Description</label>
                </div>
                <div class="field">
                    <input type="date" id="newTaskDeadline" v-model="taskDeadline" placeholder=" "/>
                    <label class="input-text-label">Deadline</label>
                </div>
                <button>Add</button>
            </form>
        </div>
    </div>
</template>
<script>
module.exports =  {
    data(){
        return{
            taskDescription: "",
            taskDeadline: "",
        }
    },
    methods:{
        click: function(){
            this.$emit('clicked');
        },
        getInput: function(){
            return {
                description: document.getElementById("newTaskDescription").value,
                deadline: new Date(document.getElementById("newTaskDeadline").value),
            }
        },
        add: async function(){
            if (this.fieldIsEmpty()) return;
            this.$emit('clicked');
            this.$emit('add-task', this.getInput())   
        },
        fieldIsEmpty: function(){
            if (document.getElementById("newTaskDescription").value == "") return true
            if (document.getElementById("newTaskDeadline").value == "") return true
            return false
        }
    }
}
</script>
<style scoped>
.modal{
    display: flex;
    flex-direction: column;
    width: 350px;
}
</style>