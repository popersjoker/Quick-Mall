<template>
  <el-dialog v-model="dialogVisible" title="修改广告" width="60%">
    <el-form :model="form" label-width="120px">
      <el-form-item label="广告名称">
        <el-input v-model="form.ana" :rules="[{ required: true, message: '不能为空' }]" />
      </el-form-item>
      <el-form-item label="广告图像">
        <el-upload
          ref="upload"
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :limit="1"
          :on-exceed="handleExceed"
          :auto-upload="false"
          :on-change="changed"
        >
          <img v-if="form.img" :src="form.img" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="广告公司">
        <el-input v-model="form.corper" :rules="[{ required: true, message: '不能为空' }]" />
      </el-form-item>
      <el-form-item label="负责人">
        <el-input v-model="form.manager" :rules="[{ required: true, message: '不能为空' }]" />
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="form.price" :rules="[{ required: true, message: '不能为空' }]" />
      </el-form-item>
      <el-form-item label="起始时间">
        <el-date-picker
        v-model="form.begin"
        type="datetime"
        placeholder="Select date and time"

      />

      </el-form-item>
      <el-form-item label="终止时间">
        <el-date-picker
        v-model="form.end"
        type="datetime"
        placeholder="Select date and time"
 
      />

      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="productSub"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model.sync="dialogVisibletwo" title="商品类目" width="60%"> </el-dialog>
</template>
<script>
import { ElMessage } from 'element-plus'
import { inject, onMounted, reactive, ref } from 'vue'
import { get, post } from '@/utils/ImitateResponse'
import api from '@/api'
import { genFileId } from 'element-plus'
// import { url } from 'inspector'
// import { log } from 'console'

export default {
  setup() {
    console.log('setUp')

    const choiceCate = ref('')
    const $bus = inject('$bus')

    const changed = (file, files) => {
      form.img = URL.createObjectURL(file.raw)
      console.log(form.img)
      console.log(file, files)
    }
    onMounted(() => {
      $bus.$on('editorRevise', (e) => {
        let id = e.details.id
        dialogVisible.value = true
        console.log(e.details.content)
        get(id, e.details.content).then((res) => {
          if (res.status === 200) {
            console.log(form)

            let formref = res.data.result
            form.id = formref.aid
            form.ana = formref.ana
            form.corper = formref.corper
            form.manager = formref.manager
            form.price = formref.price
            form.begin = formref.begin
            form.end = formref.end
            form.img = formref.img
            dialogVisible.value = true

            console.log('装载成功')
          } else {
            ElMessage({
              type: 'error',
              message: '查找失败' + `status:${res.status}`
            })
          }
        })
      })

      // console.log("mounted finsihed");
    })
    $bus.$on('editorChange', () => {
      form.descs = $bus.get('editorChange')
    })
    const upload = ref()
    console.log(upload, '??')
    const handleExceed = (files) => {
      console.log(upload)
      upload.value.clearFiles()
      const file = files[0]
      file.uid = genFileId()
      upload.value.handleStart(file)
    }
    const productSub = () => {
        dialogVisible.value = false
        return 
      console.log(form)
      api
        .updatePro(form)
        .then((res) => {
          if (res.status === 200) {
            dialogVisible.value = false
            $bus.$emit('reload', true)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    const dialogVisible = ref(false)
    const dialogVisibletwo = ref(false)

    let form = reactive({})
    // console.log(form);
    return {
      dialogVisible,
      form,
      dialogVisibletwo,
      productSub,
      choiceCate,
      changed,
      handleExceed,
      upload
    }
  }
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
