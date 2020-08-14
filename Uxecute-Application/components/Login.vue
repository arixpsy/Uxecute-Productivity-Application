<template>
    <div class="container">
        <div>
            <div><img src="./assets/icons/png/icon.png" /></div>
            <span class="title">Uxecute</span>
            <form v-on:submit.prevent="login">
                <div class="field">
                <input type="text" v-model="email" placeholder=" "/>
                <label class="input-text-label">Email</label>
                </div>
                <div class="field">
                    <input type="password" v-model="password" placeholder=" "/>
                    <label class="input-text-label">Password</label>
                </div>
                <button class="dark">Login</button>
            </form>
            <div class="error-msg" v-if="hasError">{{error}}</div>
        </div>
        <Crossicon class="exit" v-on:clicked="quit"/>
    </div>
</template>
<script>

module.exports = {
    data(){
        return {
            email: '',
            password: '',
            error: '',
        }
    },
    components: {
        'Crossicon' :  httpVueLoader('./icons/Crossicon.vue')
    },
    computed: {
        hasError: function(){
            return this.error != ''
        }
    },
    methods: {
        login: function(){
            axios({
                method: 'post',
                url: process.env.API_BASEURL + 'users/login',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then((response) => {
                let user = response.data;
                if (user.error){
                    this.error = user.error
                    this.email = ''
                    this.password = ''
                }else{
                    this.error = ''
                    this.$emit('user-login', user)
                }
            })
            .catch((error) => {
                console.log(error);
                this.error = user.error
            })
            .finally(() => {});  
        },
        quit: function(){
            // Exit Application
            const {ipcRenderer} = electron;
            ipcRenderer.send('app:exit');
        },
    },
}
</script>
<style scoped>
.container{
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container > div{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.error-msg{
    font-size: 1rem;
    color: red;
}
.exit{
    display: block !important;
    position: fixed;
    top: 15px;
    right: 25px;
    transform-origin: center;
}
img {
    -webkit-app-region: drag;
}
.title {
    color: var(--dark-grey);
    font-weight: 600;
    font-size: 2rem;
    margin-left: 10px;
}
button {
    
}
button:hover{
    
}
</style>