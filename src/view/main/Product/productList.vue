<template>
  <el-table :data="tableData" stripe border size="small" class="tb">
    <!-- //tableHead{
            prop:,
            label:,
            slot:boolean 

        }  tableData-->
    <el-table-column prop="id" label="编号" width="100" />
    <el-table-column prop="image" label="图像" width="180" />
    <el-table-column prop="price" label="价格" width="100" />
    <el-table-column prop="title" label="名称" width="100" />
    <el-table-column prop="num" label="数量" width="100" />
    <el-table-column prop="sellPoint" label="卖点" width="100" />
    <el-table-column prop="descs" label="介绍" width="180">
      <template v-slot="scopee">
        <!-- <el-button @click="console.log(scopee)" type="primary">测试</el-button> -->
        <div v-html="scopee.row.descs"></div>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <!-- {edit:fn,delete:fn} -->
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
    <!-- 注意 table宽度要等于item之和否则出bug -->
  </el-table>
</template>
<script>
import { inject, onMounted, ref ,getCurrentInstance} from 'vue'
import api from '@/api/index'
import { ElMessage, ElMessageBox } from 'element-plus'
// const api=$();
export default {
  setup() {
    const $bus = inject('$bus')
    $bus.$on('search', () => {
      media.value = $bus.get('search')
    })
    console.log(getCurrentInstance(),"instance");
    $bus.$on('pageChange', () => {
      const page = $bus.get('pageChange')
      console.log('触发' + page)
      api.sPByPage($bus.get('pageChange')).then((res) => {
        media.value = res.data.result
        // console.log(ta);
      })
    })
    const handleEdit = (index, row) => {
      //index 第几行 从0开始 row行数据
      $bus.$emit('editorRevise', { id: row.id, visble: true })
    }
    const handleDelete = (index, row) => {
      ElMessageBox.confirm('确定删除该项吗?', 'Warning', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api.delProById(row.id).then((res) => {
            if (res.status === 200) {
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
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '删除取消'
          })
        })
    }
    const media = ref([
      {
        id: 0,
        image: '',
        price: 0,
        title: '',
        num: 0,
        sellPoint: '',
        descs: ''
      }
    ]) //const 第一层地址不会变也就是Array的地址
    onMounted(() => {
      console.log('装载List')
      api.sPByPage(0).then((res) => {
        media.value = res.data.result
        console.log('装载中')
        // console.log(ta);
      })
      console.log('装载完成')
    })
    return {
      tableData: media,
      handleDelete,
      handleEdit
    }
  }
}
</script>
<style >
.tb {
  width: 70% !important;
    /* padding: 5px; */
  margin: auto auto;
  border-radius: 15px;
  background: #e0e0e0;
  box-shadow:
    5px 5px 10px #d0d0d0,
    -5px -5px 10px #f0f0f0;

  /* 
    -webkit-animation: slide-in-blurred-tr 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
	        animation: slide-in-blurred-tr 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both; */
}
</style>
