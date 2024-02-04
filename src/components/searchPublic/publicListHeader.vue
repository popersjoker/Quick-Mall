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
         class="headInput"
   
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
let numberValidateForm=reactive({
    search:''
})
const {selectLike}=defineProps(["selectLike"]);
const $bus:any=inject('$bus');
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      console.log(formEl);
      
      selectLike(numberValidateForm).then(
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

  display: flex;
  padding-top: 20px;
  margin: 20px auto 20px auto;
  width: 70%;
  border-radius: 20px;
background: rgb(222, 222, 219);
box-shadow:  3px 3px 5px #bebebe,
             -3px -3px 5px #ffffff;
}
.headInput{
  width: 60%;
}
</style>