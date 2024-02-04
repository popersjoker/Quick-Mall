<template>
    <div class="mid">
    <el-radio-group v-model="radio1" size="small">
      <el-radio-button v-for="item in times" :key="item.id" :label="item.time" />
    </el-radio-group>
  </div>
</template>
<script>
import {ref} from 'vue'
export default {
    props:{
        times:{
            type:Array,
            default:()=>[
                {
                    time:'一个月',
                    id:0
                }
            ]
        }

    },
    setup(){
        return {
            radio1:ref('一个月')
        }
    }
}
</script>
<style>
.mid{
    margin: auto auto;
}
</style>