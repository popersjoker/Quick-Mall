<template>
    <el-row>
    <el-col
      :span="4"
>
      <el-card :body-style="{ padding: '0px' }">
        <img
          :src="combine(1)"
          class="image"
        />
        <div style="padding: 14px" v-for="item in productHome" :key="item.desc">
          <router-link :to="'/details/'+item.url" active-class="active">
            {{ item.title }}
          </router-link>
        </div>
      </el-card>
    </el-col>
    <el-col :span="16">
        <router-view></router-view>
    </el-col>
  </el-row>
</template>
<script>
export default {
    setup()
    { const combine = (str) => {
            return new URL('../../../../img/' + str + '.jpg', import.meta.url).href;
        };
        return {combine,
            productHome:[
            {
                title:"开发产品",
                desc:"开发产品介绍",
                url:'openproduct'
            },
            {
                title:"品牌营销",
                desc:'品牌营销帮助你的产品更好找到定位',
                url:'logo'
            },
            {
                title:'使命必达',
                desc:'使命必达快速迭代永远保持前端速度',
                url:'heigh'

            },
            {
                title:'勇攀高峰',
                desc:'帮你勇攀高峰，达到事业的顶峰',
                url:"golife"

            }
        ]
        }
    }
}
</script>
<style scoped>


.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}
.active{
    background-color:yellow;
}
.image {
  width: 100%;
  display: block;
  object-fit: cover;
}
</style>