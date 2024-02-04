
<template>
<div class="el-statistic__head">类型</div>
<el-select
   v-model="value"
   class="m-2"
   placeholder="Select"
   size="small"
   style="width: 100px"
 >
   <el-option
     v-for="item in types"
     :key="item.id"
     :label="item.type"
     :value="item.id"
   />
 </el-select>
</template>
<script>
 import {ref} from 'vue'
export default {
    props:{
        types:{
            type:Array,
            default:()=>[
                {
                    type:'赛博型',
                    id:1
                }
            ]
        }

    },
   setup(){  const value=ref(1);
       return {
      value
       }
   }
}
</script>
<style>
.el-statistic__head{
    text-align:center;
}
.el-select{
    display:block;
    margin:auto auto;
}
</style>