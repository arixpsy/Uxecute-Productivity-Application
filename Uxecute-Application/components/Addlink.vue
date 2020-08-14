<template>
    <div class="overlay">
        <div class="modal-exit" v-on:click="click"></div>
        <div class="modal">
            <form v-if="edit._id" v-on:submit.prevent="update">
                <span>Update Link</span>
                <div class="field">
                <input type="text" id="newLinkName" :value="edit.name"  placeholder=" "/>
                <label class="input-text-label">Name</label>
                </div>
                <div class="field">
                    <input type="text" id="newLinkURL" :value="edit.url" placeholder=" "/>
                    <label class="input-text-label">URL</label>
                </div>
                <div class="field">
                    <input type="text" id="newLinkIcon" :value="edit.icon" placeholder=" "/>
                    <label class="input-text-label">Icon</label>
                </div>
                <button>Update</button>
            </form>
            <form v-else v-on:submit.prevent="add">
                <span>New Link</span>
                <div class="field">
                <input type="text" id="newLinkName"  placeholder=" "/>
                <label class="input-text-label">Name</label>
                </div>
                <div class="field">
                    <input type="text" id="newLinkURL" placeholder=" "/>
                    <label class="input-text-label">URL</label>
                </div>
                <div class="field">
                    <input type="text" id="newLinkIcon"  placeholder=" "/>
                    <label class="input-text-label">Icon</label>
                </div>
                <button>Add</button>
            </form>
        </div>
    </div>
</template>
<script>
module.exports =  {
    props: ['edit'],
    methods:{
        click: function(){
            this.$emit('clicked');
        },
        getInput: function(){
            return {
                name: document.getElementById("newLinkName").value,
                url: document.getElementById("newLinkURL").value,
                icon: document.getElementById("newLinkIcon").value
            }
        },
        update: function(){
            if (this.fieldIsEmpty()) return;
            let updatedLink = this.edit
            let newInput = this.getInput()
            updatedLink.name = newInput.name
            updatedLink.url = newInput.url
            updatedLink.icon = newInput.icon
            this.$emit('clicked');
            this.$emit('update-item', updatedLink);
        },
        add: async function(){
            if (this.fieldIsEmpty()) return;
            this.$emit('clicked');
            this.$emit('add-item', this.getInput())   
            document.getElementById("newLinkName").value = ""
            document.getElementById("newLinkURL").value = ""
            document.getElementById("newLinkIcon").value = ""
        },
        fieldIsEmpty: function(){
            if (document.getElementById("newLinkName").value == "") return true
            if (document.getElementById("newLinkURL").value == "") return true
            if (document.getElementById("newLinkIcon").value == "") return true
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