<template>
  <el-row class="tac">
   
    <el-col :span="dWit" style="z-index: 1000;">
      <h5 class="mb-2">{{link.title}}<el-icon @click="coped" class="icon"><Operation class="op"/></el-icon></h5>
      <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
        text-color="#fff"  >
        <div  v-for ="(item) in link.list" :key="item.id">
        <el-menu-item :index="''+item.id">
          <!-- <el-icon><icon-menu /></el-icon> -->
          <a :href="item.url"><span style="text-align: center;width: 100%;">{{item.title}}</span></a>
        </el-menu-item>
      </div>
      </el-menu>
    </el-col>

    <el-col :span="3" class="counterpart"></el-col>
  <!-- 轮播图 -->
  <el-col :span="16" class="mr counterpart">
    <el-carousel :interval="4000" type="card" height="300px">
    <el-carousel-item v-for="item in pic" :key="item">
      <h3 text="2xl" justify="center"><img :src="item" ></h3>
    </el-carousel-item>
  </el-carousel>
  <HomeProduct class="counterpart"/>
</el-col>
<el-col :span="3" class="counterpart"></el-col>
</el-row>
</template>

<script>
// import { title } from 'process';
// import type HomeProductVue from './HomeProduct.vue'
// import { get } from 'http'
import HomeProduct from './HomeProduct.vue'
import { reactive, watch ,computed,ref} from 'vue'

// import { title } from 'process';
export default {
  components: {
            HomeProduct
        },
    setup() {
  const font=reactive({color: 'rgba(0, 0, 0, 1)'})
  const isCollapse=ref(false);
  const coped=()=>{
    // let cvar=dWit.value==2?-0.05:0.05;
    dWit.value=1+isCollapse.value
    isCollapse.value=!isCollapse.value;
  }
  const dWit=ref(2);
        const link = {
            title: '应用列表',
            list: [{
                    id: 1,
                    title: '苹果',
                    url: ''
                }, {
                    id: 2,
                    title: '三星',
                    url: ''
                },
                {
                    id: 3,
                    title: '华为',
                    url: ''
                }
            ]
        };
        const combine = (str) => {
            return new URL('../../../img/' + str + '.jpg', import.meta.url).href;
        };
        return { link, pic: [
                combine(1), combine(2), combine(3), combine(4)
            ],font ,dWit,coped};
    }
    // return{ link}
    
    // components: { HomeProductVue }
}

</script>

<style scoped>
html{
  color: wheat;

}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
img{
  margin-top: 20px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/* .tac{width: 30%;} */
.el-col {
  text-align: center;
  background-color: #545c64;
  color: #fff !important;
}
a { color: inherit; text-decoration: none; }
.counterpart{
  background-color: ghostwhite;
}
</style>
<style scoped>
.icon{
  float: right;
  width:25px;
  height: 25px;
  .op{
    padding-bottom: 20px;
  }
}

</style>