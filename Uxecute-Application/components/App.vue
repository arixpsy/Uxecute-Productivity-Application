<template>
    <main>
        <section v-if="!isLogin">
            <Login v-on:user-login="userLogin"/>
        </section>
        <section v-else-if="isInitializing" style="justify-content:center;align-items:center;">
            Loading...
        </section>
        <section v-else>
            <!-- Sidebar Navigation -->
            <Navigation 
                :active="activeTab" 
                :links="navigation" 
                v-on:quit="quit" 
                v-on:change="changeTab">
            </Navigation>
            <div class="section-display">
                <transition name="fade">
                    <!-- Home Dashboard -->
                    <Home 
                        v-if="activeTab === 0" 
                        :user="user" 
                        :location="location" 
                        :tasks="tasks">
                    </Home>
                    
                    <!-- Task Dashboard -->
                    <Tasks 
                        v-else-if="activeTab === 1" 
                        :tasks="tasks"
                        :user="user"
                        v-on:task-added="taskAdded"
                        v-on:task-removed="taskRemoved">
                    </Tasks>
                    
                    <!-- Links -->
                    <Links 
                        v-else-if="activeTab === 2" 
                        :links="links"
                        :user="user"
                        v-on:link-added="linkAdded"
                        v-on:link-removed="linkRemoved">
                    </Links>
                    
                    <!-- Settings -->
                    <Settings :user="user" v-on:logout="userLogout" v-else></Settings>
                </transition>
            </div>
        </section>
    </main>
</template>
<script>
module.exports = {
    components:{
         'Navigation': httpVueLoader('./Navigation.vue'),
         'Home': httpVueLoader('./Home.vue'),
         'Tasks': httpVueLoader('./Tasks.vue'),
         'Links': httpVueLoader('./Links.vue'),
         'Settings': httpVueLoader('./Settings.vue'),
         'Login': httpVueLoader('./Login.vue')
    },
    methods:{
        quit: function(){
            // Exit Application
            const {ipcRenderer} = electron;
            ipcRenderer.send('app:exit');
        },
        changeTab: function(e){
            if ( this.activeTab != e.target.tabIndex ) {
                // Remove keydown event listener
                document.onkeydown = null;
                // Change the active tab index
                this.activeTab = e.target.tabIndex;
            }
        },
        retrieveTasks: function(){
            axios({
                method: 'get',
                url: process.env.API_BASEURL + 'tasks',
                params: {
                    user: this.user.email
                }
            })
            .then((response) => {
                this.tasks = response.data;
                this.initializing.tasks = false;
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                // always executed
            });  
        },
        retrieveLinks: function(){
            axios({
                method: 'get',
                url: process.env.API_BASEURL + 'links',
                params: {
                    user: this.user.email
                }
            })
            .then((response) => {
                this.links = response.data;
                this.initializing.links = false;
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                // always executed
            });  
        },
        linkAdded: function(link){
            this.links.push(link);
        },
        linkRemoved: function(link){
            this.links = this.links.filter(item => item._id !== link._id);
        },
        taskAdded: function(task){
            this.tasks.push(task);
        },
        taskRemoved: function(task){
            this.tasks = this.tasks.filter(item => item._id !== task._id);
        },
        updateWeather: function(){
            try{
                fetch(
                    process.env.WEATHERSTACK_BASEURL 
                    + 'current?access_key=' 
                    + process.env.WEATHERSTACK_KEY
                    + '&query=' + this.user.country)
                    .then(response => response.json())
                    .then(data => {
                        this.location.location = data.location.country
                        this.location.temp = data.current.temperature
                        this.location.description = data.current.weather_descriptions[0]
                    });
            }catch(error){
                this.location.location = "???"
                this.location.temp = "0"
                this.location.description = "Failed to pull data"
            }
        },
        userLogin: function(user){
            this.isLogin = true
            this.user = user
            localStorage.setItem("userData", JSON.stringify(user));
            this.retrieveTasks();
            this.retrieveLinks();
            this.updateWeather();
            setInterval(this.updateWeather, 1000 * 3600);
        },
        userLogout: function(){
            this.isLogin = false
            localStorage.removeItem("userData");
            this.activeTab = 0
            this.initializing = {
                tasks: true,
                links: true
            }
        }
    },
    data(){
        return{
            initializing: {
                tasks: true,
                links: true
            },
            activeTab: 0,
            isLogin: false,
            user: {
                name:'',
                email: '',
                country: ''
            },
            navigation:[
                {name: "Home", action: this.changeTab},
                {name: "Tasks", action: this.changeTab},
                {name: "Links", action: this.changeTab},
                {name: "Settings", action: this.changeTab},
                {name: "Exit", action: this.quit},
            ],
            location: {
                location: '',
                temp: '',
                description: '',
            },
            tasks:[],
            links:[]
        }
    },
    created(){
        if(localStorage.getItem('userData')){ 
            this.user = JSON.parse(localStorage.getItem('userData'))
            this.isLogin = true
        }
        if (this.isLogin){
            this.retrieveTasks();
            this.retrieveLinks();
            this.updateWeather();
            setInterval(this.updateWeather, 1000 * 3600);
        }
    },
    computed: {
        isInitializing(){
            return this.initializing.links || this.initializing.tasks
        } ,
        loggedIn(){
            return isLogin;
        }
    },
}
</script>
<style scoped>
header {
    display:flex;
    height: 35px;
}
main {
    height: 100vh;
}
section{
    height: 100vh;
    display: flex;
}
.section-display{
    position: relative;
    width: calc(100vw - 150px);
    height: 100vh;
}
.section-display > * {
    position: absolute;
    width: 100%;
    height: 100vh;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>