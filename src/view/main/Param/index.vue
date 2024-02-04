<template>
    <el-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-ruleForm" @submit.prevent>
        <el-form-item label="search" prop="search" :rules="[
            { required: true, message: 'search is required' },
        ]">
            <el-input v-model="numberValidateForm.search" type="text" autocomplete="off"
                @keyup.enter="submitForm(formRef)" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click.prevent="submitForm(formRef)">Submit</el-button>

        </el-form-item>
    </el-form>

    <!-- 表头 -->
    <el-table :data="tableData" stripe border size="small" class="tb">
        <el-table-column prop="paramsId" label="参数编号" width="100" />
        <el-table-column prop="pid" label="商品编号" width="180" />
        <el-table-column prop="content" label="介绍"  />
    </el-table>
    <pagePagination :total="total" />
    <!-- 列表 -->
</template>
<script>
import pagePagination from "@/components/searchPublic/pagePagination.vue"
import { inject, onMounted, reactive, ref} from 'vue'
// import  { FormInstance } from 'element-plus'
// import type { FormInstance } from 'element-plus'
import api from "@/api/index.js"
export default {
    components:{
        pagePagination
    },
    setup() {
        const total=ref(0);
        onMounted(()=>{
            
            api.getParamsPage().then(
                res=>{
                    console.log(res);
                    if(res.status===200){
                        total.value=res.data.page;
                    }
                }
            )
            api.selectParamsByPage(0).then(
                res=>{
                    console.log(res);
                    if(res.status===200){
                        tableData.value=res.data.result;
                    }
                }
            )
        })
        
        
        
        
        
        const formRef = ref ()

        const numberValidateForm = reactive({
            search: '',
        })
        const tableData= ref([]);
        const $bus=inject("$bus");
        $bus.$on('pageChange',(e)=>{
            api.selectParamsByPage(e.details-1).then(
                res=>{
                  
                    if(res.status===200){
                        tableData.value=res.data.result;
                    }
                }
            )
        })
        const submitForm = (formEl) => {
            if (!formEl) return
            formEl.validate((valid) => {
                if (valid) {
                    console.log('submit!')
                    console.log(formEl);

                    api.paramslike(numberValidateForm).then(
                        res => {
                            if (res.status === 200) {
                                tableData.value=res.data.result;
                                
                            }

                        }
                    );

                } else {
                    console.log('error submit!')
                    return false
                }
            })
        }
        return {
            submitForm,formRef,total,numberValidateForm,tableData
        }
    }
}
</script>
<style scoped>
.demo-ruleForm {
    margin: 20px auto 40px auto;
    width: 75%;

}

.tb {
    width: 70% !important;
    margin: auto auto;
}
</style>