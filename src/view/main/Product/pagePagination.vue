<template>
    <div class="padd">
    <div class="example-pagination-block">
    <!-- <div class="example-demonstration">When you have few pages</div> -->
    <el-pagination layout="prev, pager, next" :total="total"  background :hide-on-single-page="value" :page-size="10" v-model:current-page="currentPage"   @current-change="handleCurrentChange"/>
  </div>
</div>
</template>
<script>
import { inject, onMounted, ref } from 'vue';
import api from "@/api/index"
export default {
    setup()
    {
        const currentPage=ref(1);
        const total=ref(20);
        onMounted(()=>{
            api.getPage().then(
                res=>{
                    total.value=res.data.page;
                    value.value=total.value<=10;
                }
            )

        })
        const value=ref(false);
        const $bus= inject('$bus');
        const handleCurrentChange=(value)=>{
            currentPage.value=value;
            $bus.$emit('pageChange',value-1);
            // console.log("设计"+$bus.get('pageChange'));

        }
        return {
            value,handleCurrentChange,currentPage,total
        }
    }
}
</script>
<style>
.padd{
    position: absolute;
    padding-left: 40%;
    margin-top: 50px;
}
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>