<template>
    <nav>
        <div class="logo">
            <div class="icon">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="text-wrapper">
                <span>Uxecute</span>
            </div>
        </div>
        <ul>
            <li 
                v-for="(link, index) in links" 
                :key="index" 
                :tabindex="index"
                :class="{ active : active===index }"
                v-on:click="link.action">
                {{link.name}}
            </li>
        </ul>       
    </nav>
</template>
<script>
module.exports = {
    props: ["active", "links"],
    methods:{
        keypress: function(e){
            if(e.keyCode == 13){
                if(e.target.tabIndex === this.links.length - 1){
                    //this.$emit('quit')
                }else{
                    this.$emit('change', e)
                }
            }
        }
    },
    mounted() {
        document.querySelector('ul').addEventListener("keypress", this.keypress);
    },
}
</script>
<style scoped>
nav{
    height: 100%;
    width: 150px;
    background-color: var(--nav-bar-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0px 10px 10px;
}
.logo{
    margin-bottom: 10px;
    width: 100%;
    display: flex;
    cursor: grab;
    -webkit-app-region: drag;
}
.logo > .text-wrapper{
    display: flex;
    align-items: center;
}
.logo > div > span{
    color: var(--white);
    font-weight: 600;
    font-size: 1.3rem;
    margin-left: 10px
}
.icon{
    position: relative;
}
.icon > div:nth-child(1){
    height:32px;
    width: 32px;
    background: var(--orange);
}
.icon > div:nth-child(2){
    position: absolute;
    top: 0;
    border-top: 16px solid transparent;
    border-left: 16px solid transparent;
    border-right: 16px solid var(--yellow);
    border-bottom: 16px solid var(--yellow);
    z-index: 1;
}
.icon > div:nth-child(3){
    position: absolute;
    top: 0;
    border-top: 16px solid transparent;
    border-right: 16px solid transparent;
    border-left: 16px solid var(--red);
    border-bottom: 16px solid var(--red);
    z-index: 2;
}
.icon > div:nth-child(4){
    position: absolute;
    top: 0;
    right: 0;
    border-top: 8px solid transparent;
    border-right: 8px solid transparent;
    border-left: 8px solid var(--blue);
    border-bottom: 8px solid var(--blue);
    z-index: 2;
}
ul{
    list-style-type: none;
    width: 100%;
    color: var(--light-grey);
}
li{
    padding: 5px 0px;
    text-align: center;
    font-size: 1.2rem;
    border-radius: 100vh 0 0 100vh;
    margin: 5px 0px;
    transition: 0.25s ease-out all;
    cursor: pointer;
}
li.active{
    color: var(--dark-grey);
    background-color: var(--white);
    
}
li:focus, li:hover{
    outline: none;
    color: var(--dark-grey);
    background-color: var(--white);
}

</style>