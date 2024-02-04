<template>
<el-space wrap :size="size" class="fk">
    <el-card v-for="(item,index) in productHome" :key="index" class="box-card" style="width: 250px">
      <template #header>
        <div class="card-header">
          <span>{{ item.title }}</span>
          <img :src="item.url" alt="" class="ct">
          <!-- <el-button class="button" text>Operation button</el-button> -->
        </div>
      </template>
      <div  class="text item">
        {{ item.desc }}
      </div>
      <el-button  type="success"  round><router-link :to="'details/'+item.to">点击购买</router-link></el-button>
    </el-card>
  </el-space>
</template>
<script>
import {ref} from 'vue'
export default {

setup()
{ const combine = (str) => {
            return new URL('../../../img/' + str + '.png', import.meta.url).href;
        };
    return {
        size:ref(100),
           productHome:[
            {
                title:"开发产品",
                desc:"开发产品介绍",
                url:combine(11),
                to:'openproduct'
            },
            {
                title:"品牌营销",
                desc:'品牌营销帮助你的产品更好找到定位',
                url:combine(12),
                to:'logo'
            },
            {
                title:'使命必达',
                desc:'使命必达快速迭代永远保持前端速度',
                url:combine(13),
                to:'heigh'

            },
            {
                title:'勇攀高峰',
                desc:'帮你勇攀高峰，达到事业的顶峰',
                url:combine(14),
                to:'golife'

            }
        ]
    }
}

}
</script>
<style scoped>
.ct{
  margin-top: 20px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.fk{
    margin-top: 2%;
    margin-left: 10%;
}
.box-card{
    width: 300px !important;
}
a{
    text-decoration: none;
}
.el-button{
margin-top: 10px;
  border-radius: 50px;
background: #ebe6e6;
box-shadow:  5px 5px 10px #a9a6a6,
             -5px -5px 10px #ffffff;
}

</style>
