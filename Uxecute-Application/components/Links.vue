<template>
    <div class="container">
        <div>
            <div>Links</div>
            <Addicon v-on:clicked="toggleModal"></Addicon>
        </div>
        <div class="link-container">
            <div class="link-grid">
                <Linkitem 
                    v-for="(link, index) in links" 
                    :id="'item'+index"
                    :key="index" 
                    :link="link" 
                    :index="index"
                    :focus="focusedIndex"
                    v-on:edit="editItem"
                    v-on:delete="deleteItem"
                    >
                </Linkitem>
            </div>
        </div>
        <transition name="fade">
        <Addlink 
            v-show="showModal" 
            v-on:clicked="toggleModal" 
            :edit="editLink"
            v-on:add-item="addItem"
            v-on:update-item="updateItem">
        </Addlink>
        </transition>
    </div>
</template>
<script>
module.exports = {
    props: ["links", "user"],
    components: {
        'Addicon' :  httpVueLoader('./icons/Addicon.vue'),
        'Linkitem' :  httpVueLoader('./Linkitem.vue'),
        'Addlink' :  httpVueLoader('./Addlink.vue')
    },
    data(){
        return{
            focused: false, 
            focusedIndex: -1,
            showModal: false,
            editLink: {}
        }
    },
    created() {
        document.onkeydown = this.keyCheck;
    },
    mounted() {},
    methods:{
        toggleModal: function (){
            this.resetFocus();
            if (this.showModal) this.editLink = {}
            this.showModal = !this.showModal;
        },
        resetFocus: function (e){
            this.focused = false
            this.focusedIndex = -1
        },
        keyCheck: function (e){
            // Check if tab or esc key pressed  
            if (e.keyCode == '9' || e.keyCode == '27')
            {
                this.resetFocus();
                return;
            }
            // Only Continue if Arrow or Enter is pressed
            if(!(e.keyCode == '37' || e.keyCode == '38' || e.keyCode == '39'|| e.keyCode == '40'|| e.keyCode == '13'))
            {
                return;
            }
            // If not focused previously, set focus to index 0
            if(!this.focused)
            {
                this.focused = true;
                this.focusedIndex = 0;
                return;
            }
            // Prevent default solve scrolling issues
            e.preventDefault();

            let lastIndex = this.links.length - 1;
            let currentIndex = this.focusedIndex

            // Up arrow key pressed
            if (e.keyCode == '38') {
                let indexUp = currentIndex - 3;
                this.focusedIndex = (indexUp >= 0) ? indexUp : this.focusedIndex 
            }
            // Down arrow key pressed
            else if (e.keyCode == '40') {
                let indexDown = currentIndex + 3;
                this.focusedIndex = (indexDown <= lastIndex) ? indexDown : this.focusedIndex 
            }
            // Left arrow key pressed
            else if (e.keyCode == '37') {
                let indexLeft = currentIndex - 1;
                this.focusedIndex = (indexLeft >= 0) ? indexLeft : this.focusedIndex 
            }
            // Right arrow key pressed
            else if (e.keyCode == '39') {
                let indexRight = currentIndex + 1;
                this.focusedIndex = (indexRight <= lastIndex) ? indexRight : this.focusedIndex 
            }
            // Enter key pressed
            else if (e.keyCode == '13'){
                const {shell} = electron;
                shell.openExternal(this.links[this.focusedIndex].url);
            }
            // Scroll to element
            let focusedElement = document.getElementById('item' + this.focusedIndex);
            focusedElement.scrollIntoView(false)
        },
        editItem: function(link){
            this.editLink = link
            this.toggleModal();
        },
        deleteItem: function(link){
            axios({
                method: 'delete',
                url: process.env.API_BASEURL + `links/${link._id}`,
            })
            .then((response) => {
                this.$emit('link-removed', link);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {

            });  
        },
        addItem: function(link){
            let data = link
            data.position = this.links.length
            data.user = this.user.email
            axios({
                method: 'post',
                url: process.env.API_BASEURL + 'links',
                data: data
            })
            .then((response) => {
                this.$emit('link-added', response.data.link)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {

            });  
        },
        updateItem: function(link){
            let updateOptions = [
                {
                    propName: "name",
                    value: link.name
                },
                {
                    propName: "url",
                    value: link.url
                },
                {
                    propName: "icon",
                    value: link.icon
                }
            ];
            axios({
                method: 'patch',
                url: process.env.API_BASEURL + `links/${link._id}`,
                data: updateOptions
            })
            .then((response) => {
                console.log("Item Updated");
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {

            });  
        }
    }
}
</script>
<style scoped>
.container > div:first-child{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}
.link-grid{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    gap: 15px;
}
.container::-webkit-scrollbar {
  display: none;
}
</style>