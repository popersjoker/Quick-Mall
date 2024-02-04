<template>
    <el-form
    ref="formRef"
    :model="numberValidateForm"
    label-width="100px"
    class="demo-ruleForm"   @submit.prevent
  >
    <el-form-item
      label="search"
      prop="search"
      :rules="[
        { required: true, message: 'search is required' },
      ]"
   
    >
      <el-input
        v-model="numberValidateForm.search"
        type="text"
        autocomplete="off"
        @keyup.enter="submitForm(formRef)"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="submitForm(formRef)">Submit</el-button>
      <el-button @click="resetForm()">添加商品</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { reactive, ref,inject } from 'vue'
import type { FormInstance } from 'element-plus'
import api from '@/api/index'
const formRef = ref<FormInstance>()


const numberValidateForm = reactive({
  search: '',
})
const $bus:any=inject('$bus');
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      console.log(formEl);
      
      api.search(numberValidateForm).then(
        res=>{
          if(res.status===200){
            $bus.$emit('search',res.data.result);
          }
         
        }
      );

    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = () => {
  $bus.$emit('visible',true);
}
</script>
<style scoped>
.demo-ruleForm
{
  margin: 20px auto 40px auto;
  width: 75%;
  
}
</style>