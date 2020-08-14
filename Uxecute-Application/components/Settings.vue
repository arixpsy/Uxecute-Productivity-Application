<template>
    <div class="container">
        <div>
            <div>Settings</div>
            <div class="container-content">
                <form v-on:submit.prevent="updateSettings">
                    <div class="field">
                    <input type="text" v-model="user.name" placeholder=" "/>
                    <label class="input-text-label">Name</label>
                    </div>
                    <div class="field">
                        <input type="text" v-model="user.country" placeholder=" "/>
                        <label class="input-text-label">Country</label>
                    </div>
                    <button>Update Settings</button>
                </form>
                <div class="error-msg" v-if="hasError">{{error}}</div>
                <button class="dark" v-on:click="$emit('logout')">Logout</button>
            </div>
        </div>
    </div>
</template>
<script>
module.exports = {
    props: ['user'],
    data(){
        return {
            error: '',
        }
    },
    methods:{
        updateSettings: function(){
            let updateOptions = [
                {
                    propName: "name",
                    value: this.user.name
                },
                {
                    propName: "country",
                    value: this.user.country
                }
            ];
            axios({
                method: 'patch',
                url: process.env.API_BASEURL + `users/${this.user.email}`,
                data: updateOptions
            })
            .then((response) => {
                console.log("Item Updated");
            })
            .catch((error) => {
               this.error != "Update Error"
            })
            .finally(() => {

            });  
        }
    },
    computed: {
        hasError: function(){
            return this.error != ''
        }
    },
}
</script>
<style scoped>
.container-content{
    width: 300px;
    margin: auto;
    margin-top: 50px;
}
</style>
