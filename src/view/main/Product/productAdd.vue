<template>
<!-- <el-button text @click="dialogVisible = true">
    click to open the Dialog
  </el-button> -->
  
  <el-dialog
    v-model="dialogVisible"
    title="修改商品"
    width="60%"
  >
  <el-form :model="form" label-width="120px">
    <el-form-item label="商品类目">
      <div>{{ choiceCate }}</div>
      </el-form-item>
    <el-form-item label="商品名称">
      <el-input v-model="form.title"  :rules="[
        { required: true, message: '不能为空' },
      ]" />
    </el-form-item>
    <el-form-item label="商品价格">
      <el-input v-model="form.price" :rules="[
        { required: true, message: '不能为空' },
      ]"/>
    </el-form-item>
    <el-form-item label="数量">
      <el-input v-model="form.num" :rules="[
        { required: true, message: '不能为空' },
      ]"/>
    </el-form-item>
    <el-form-item label="商品卖点">
      <el-input v-model="form.sellPoint" :rules="[
        { required: true, message: '不能为空' },
      ]"/>
    </el-form-item>
    <el-form-item label="图片地址">
      <el-input v-model="form.image" :rules="[
        { required: true, message: '不能为空' },
      ]"/>
    </el-form-item>
    <el-form-item label="商品介绍">
      <!-- <el-input v-model="form.descs" :rules="[
        { required: true, message: '不能为空' },
      ]"/> -->
      <quillEditer />
    </el-form-item>
    
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="productSub">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model.sync="dialogVisibletwo"
    title="商品类目"
    width="60%"
  >
  <Tree/>
</el-dialog>
</template>
<script>
import { inject, reactive, ref,readonly } from 'vue';
import Tree from './Tree.vue';
import quillEditer from './quillEditer.vue';
import api from '@/api';

export default {
  components:{
    Tree,quillEditer
  }  ,
  setup(){
    readonly
    const choiceCate=ref('');
    const $bus=inject("$bus");
    $bus.$on('choiceTree',()=>{
      const params=$bus.get('choiceTree');
      dialogVisibletwo.value=false;
      form.category=params.cid;
      choiceCate.value=params.title;
    })
    $bus.$on('visible',()=>{
      dialogVisible.value=$bus.get('visible');
      dialogVisibletwo.value=dialogVisible.value;
    })
    $bus.$on('editorChange',()=>{
      form.descs= $bus.get('editorChange');
    })
      const productSub=()=>{
          
        api.insertToP(form).then(res=>{
          if(res.status===200){
            dialogVisible.value=false;
            $bus.$emit('reload',true);
          }
        }).catch(err=>{
          console.log(err);
        })

        }
        const dialogVisible=ref(false);
        const dialogVisibletwo=ref(false);
        const form=reactive({
            image: '',
            price:0,
            title:'',
            num: 0,
            sellPoint:'',
            descs:'',
            category:''
        })
    return {
        dialogVisible,form,dialogVisibletwo,productSub,choiceCate
    }
    }
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>