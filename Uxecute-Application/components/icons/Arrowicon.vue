<template>
    <div>
        <span :direction="direction" v-on:click="clicked">

        </span>
    <div>
</template>
<script>
module.exports = {
    props: ['direction'],
    methods: {
        clicked: function() {
            this.$emit('clicked');
        }
    },
}
</script>
<style scoped>
span{
    position: relative;
    width: 20px;
    height: 20px;
    display: block;
    cursor: pointer;
    transition: 0.25s ease-out transform;
}
span:hover{
    transform: scale(1.2);
}
span::before, span::after{
    position: absolute;
    content: '';
    height: 1px;
    width: 60%;
    background-color: var(--dark-grey);
    transform-origin: right;
    top:10px;
    right: 5px;
}
span[direction='left']::before, span[direction='left']::after{
    transform-origin: left;
    left: 5px;
}
span::before{
    transform: rotate(45deg);
}
span::after{
    transform: rotate(-45deg);
}

</style>