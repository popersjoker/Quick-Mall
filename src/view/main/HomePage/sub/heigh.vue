<template>
    high
</template>
<script lang='ts' setup>
import {ref,reactive,getCurrentInstance} from 'vue'
import logo from './logo.vue';
console.log(logo);

let tt=getCurrentInstance();
console.log(tt);
// console.log(logo.setup!.__vccOpts);

// console.log(logo.setup({na:'c'},Object.assign(tt.ctx,{expose:()=>{return "fuck"}}))());


</script>
<style scoped>
</style>