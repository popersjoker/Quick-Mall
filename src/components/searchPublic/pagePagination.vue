<template>
    <div class="padd">
    <div class="example-pagination-block">
    <el-pagination layout="prev, pager, next" :total="total"  background :hide-on-single-page="value" :page-size="10" v-model:current-page="currentPage"   @current-change="handleCurrentChange"/>
  </div>
  </div>
  </template>
  <script>
  import { inject, ref } from 'vue';
  export default {
    props:{
        total:{
          type:Number,
          required:true
        }
    },
    setup()
    {
        const currentPage=ref(1);
        const value=ref(false);
        const $bus= inject('$bus');
        const handleCurrentChange=(value)=>{
            currentPage.value=value;
            $bus.$emit('pageChange',value-1);
            // console.log("设计"+$bus.get('pageChange'));
  
        }
        return {
            value,handleCurrentChange,currentPage
        }
    }
  }
  </script>
  <style>
  .padd{
    position: absolute;
    padding-left: 40%;
    margin-top: 100px;
  }
  .example-pagination-block + .example-pagination-block {
  margin-top: 10px;
  }
  .example-pagination-block .example-demonstration {
  margin-bottom: 16px;
  }
  </style>