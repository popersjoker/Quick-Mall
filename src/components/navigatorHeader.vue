<template>
    <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router 
    >
    <!-- router 以index作为参数跳转 -->
  <el-menu-item index="/">首页</el-menu-item>
  <el-menu-item index="/pr">商品管理</el-menu-item>
  <el-menu-item index="/params">参数规格</el-menu-item>
  <el-menu-item index="/ad">广告管理</el-menu-item>
  <el-menu-item index="" class="user"><span class="user-name">{{ name }}</span>
    <el-button @click="loginOut">退出</el-button></el-menu-item>
</el-menu>
  </template>
  
  <script>
  import {ref} from"vue"
  import store from '@/store/index'
  import { computed } from "vue";
  import { mapState,useStore} from "vuex"
  import router from '@/router/index'


  export default {
    setup(){
        console.log(useStore()===store);
        console.log(store.state.login);
    const getName=mapState('login',['user'])['user'].bind({$store:store});
    // console.log(getName());
    const name=computed(()=>getName().name)
    const activeIndex=ref("/")
    const loginOut=()=>{
        getName().token=null;
        localStorage.removeItem('ego');
        router.push('/login');

    }   
    return {activeIndex,name,loginOut}
    }

  }
  </script>
  
  <style scoped>
  /* 只应用于该组件 */
  .user{
    float: right !important;;
    margin-left: 65% !important;
    line-height: 60px !important;
    .user-name{
        color :#fff;
        margin-right: 10px;
        font-size:15px;
        border: 1px solid #fff;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: inline-block;
        line-height: 40px;
        overflow: hidden;
    }

  }
  </style>



