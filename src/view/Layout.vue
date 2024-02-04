<template>
  <NavHead/>
    <!-- <h1>layout</h1> -->
  <router-view></router-view>
</template>

<script>
import NavHead from '@/components/navigatorHeader.vue'
export default {

  components:{
    NavHead
  }
}
</script>

<style>

</style>