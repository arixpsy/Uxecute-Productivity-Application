<template>
    <div class="card-animation" :style="'animation-delay:'+ (index*200)+'ms'">
        <div class="card" draggable="true" @contextmenu="toggleMenu"
            :class="{
                blue: color === 1,
                red : color === 2, 
                yellow: color === 3,
                orange: color === 4,
                active: index === focus
            }">
            <div v-if="!showMenu" class="content" v-on:click="openLink">
                <span>{{link.icon}}</span>
                <span>{{link.name}}</span>
            </div>
            <div v-else class="menu">
                <div class="content" v-on:click="triggerEdit">
                    <span >✏</span>
                    <span>Edit</span>
                </div>
                <div class="content" v-on:click="triggerDelete">
                    <span >🗑</span>
                    <span>Delete</span>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
module.exports = {
    props: ['index', 'link', 'focus'],
    data(){
        return{
            color: -1,
            showMenu: false
        }
    },
    methods:{
        openLink: function(event){
            const {shell} = electron;
            shell.openExternal(this.link.url);
        },
        toggleMenu: function(){
            this.showMenu = !this.showMenu
        },
        triggerEdit: function(){
            this.toggleMenu();
            this.$emit('edit', this.link);
        },
        triggerDelete: function(){
            this.toggleMenu();
            this.$emit('delete', this.link);
        }
    },
    created() {
        this.color = Math.floor(Math.random() * (4 - 1 + 1) ) + 1;
        
    }
}
</script>
<style scoped>
.card{
    --color: var(--dark-grey);
    background-color: var(--white);
    border: 10px solid var(--color);
    border-radius: 15px;
    padding: 5px;
    cursor: pointer;
    transition: all ease-out 0.25s;
    color: var(--dark-grey);
    font-weight: 600;
    display:flex;
    justify-content: center;
    user-select: none;
    height: 100%;
}
.card-animation{
    animation: appear 0.5s ease-out forwards;
    opacity: 0;
    transform: translateY(50px);
}
@keyframes appear {
    from{
        opacity: 0;
        transform: translateY(50px);
    }
    to{
        opacity: 1;
        transform: translateY(0px);
    }
}
.content{
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.menu{
    display: flex;
    justify-content: space-around;
    width: 100%;
}
.content span:first-child{
    font-size: 2rem;
    padding-bottom: 5px;
}
@keyframes active {
    from{transform: scale(1);}
    to{transform: scale(1.075);}
}
.active, .card:hover{
    animation: 0.5s ease-out alternate infinite active;
    background-color: var(--color);
}
.blue{
    --color: var(--blue);
}
.red{
    --color: var(--red);
}
.yellow{
    --color: var(--yellow);
}
.orange{
    --color: var(--orange);
}
</style>