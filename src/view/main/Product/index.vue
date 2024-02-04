<template>
  <!-- <div>pro</div> -->
  <productAdd/>
  <productHeader/>
<pList/>

<pagePagination></pagePagination>
<ProductRevise/>

</template>

<script>
import productAdd from './productAdd.vue';
import pList from './productList.vue'
import pagePagination from './pagePagination.vue';
import productHeader from './productHeader.vue';

import { inject ,ref} from 'vue';
import ProductRevise from './productRevise.vue';
// const pList=$('@/api/index.vue')
export default {
  components:{
    pList,pagePagination,productHeader,productAdd,ProductRevise
}
,setup(){
  const reload=()=>{
    window.location.reload();
    console.log("刷新成功");
  }

  const $bus=inject('$bus');
  $bus.$on('reload',reload);

  
  
  
}
}
</script>

<style>

</style>