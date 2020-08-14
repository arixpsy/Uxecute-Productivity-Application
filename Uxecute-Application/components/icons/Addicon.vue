<template>
    <div v-on:click="click">
        <span></span>
        <span></span>
    </div>
</template>
<script>
module.exports = {
    methods:{
        click: function(){
            this.$emit('clicked');
        }
    }
}
</script>
<style scoped>
div{
    height: 24px;
    width: 24px;
    position: relative;
    transition: 0.25s ease-out transform;
    cursor: pointer;
}
span{
    background-color: var(--dark-grey);
    position: absolute;
}
span:first-child{
    height: 24px;
    width: 2px;
    left: calc(50% - 1px)
}
span:last-child{
    height: 2px;
    width: 24px;
    top: calc(50% - 1px)
}
div:hover{
    transform: scale(1.2);
}
</style>