<template>
    <CategoryRevise/>
  <publicListHeader :selectLike="selectLike"> </publicListHeader>
    
  <publicList :tableHead="th" :tableData="td" :operate="operate">
    <template v-slot:img="{ scope, index }">
      <!-- {{ scope['img'] }} -->
      <img :src="imgList[0]" class="imgBox" />
    </template>
  </publicList>
  <pagePagination :total="1"> </pagePagination>
</template>
<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive, inject } from 'vue'
import CategoryRevise from './CategoryRevise.vue'
import publicList from '@/components/searchPublic/publicList.vue'
import pagePagination from '@/components/searchPublic/pagePagination.vue'
import publicListHeader from '@/components/searchPublic/publicListHeader.vue'
import { get, post } from '@/utils/ImitateResponse'
const reload = () => {
  window.location.reload()
  console.log('刷新成功')
}

const $bus: any = inject('$bus')
$bus.$on('reload', reload)

interface ADCategory {
  aid: number
  ana: string
  img: string
  corper: string
  manager: string
  price: number
  begin: Date
  end: Date
}

interface ADCHead {
  prop: string
  label: string
  slot: boolean
}
// $bus.$on('editorRevise', (e) => {
//   const { id, visible } = e.details
//   get('', tableData.splice(id, 1)).then((res) => {
//     if (res.status === 200) {
//       td.value = res.data.result
//     }
//   })
// })
let imgList = [new URL('../../../img/' + 'imgUrl1' + '.png', import.meta.url).href]
let tableData: ADCategory[] = [
  {
    aid: 0,
    ana: '谷歌夏日促销',
    img: imgList[0],
    corper: '谷歌',
    manager: '比尔盖茨',
    price: 100,
    begin: new Date(),
    end: new Date()
  }
]
let td = ref(tableData)

let tableHead: ADCHead[] = [
  { prop: 'aid', label: '编号', slot: false },
  { prop: 'ana', label: '名称', slot: false },
  { prop: 'img', label: '图像', slot: true },
  { prop: 'corper', label: '公司', slot: false },
  { prop: 'price', label: '价格', slot: false },
  { prop: 'begin', label: '起始日期', slot: false },
  { prop: 'end', label: '终止日期', slot: false }
]

let th = ref(tableHead)
let selectLike = get.bind(this, '', {}) //模糊查找

let operate = {
  onMounted: function () {
    return get('', tableData)
  },
  delete: function (index, row) {
    console.log(`remove${index}`)

    post('', tableData.splice(index,1)).then((res) => {
      if (res.status === 200) {
        td.value = res.data.result
        ElMessage({
          type: 'success',
          message: '成功删除'
        })
        setTimeout(() => {
          $bus.$emit('reload', true)
        }, 2000)
      } else {
        ElMessage({
          type: 'error',
          message: '删除失败'
        })
      }
    })
  }
}
</script>
<style scoped>
.imgBox {
  width: 100px;
  height: 100px;
}
</style>
