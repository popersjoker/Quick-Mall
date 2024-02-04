<template>
<table>
    <tr >
        <th v-for=" (item,index) in tableHead">{{ item.label }}</th>
    </tr>
    <tr v-for="(item,index) in tableData">
        <td>
            
        </td>
    </tr>
</table>
</template>
<script lang='ts' setup>
import {ref,reactive} from 'vue'
import type{ADCategory,ADCHead} from "@/type/tableList"
defineProps({
    tableData:{
        type:Array<ADCategory>,
        required:true
    },
    tableHead:{
        type:Array<ADCHead>,
        required:true
    }
})

</script>
<style scoped>
</style>

