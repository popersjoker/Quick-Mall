<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>方捷商城</span>
      </div>
    </template>
    <el-tabs class="demo-tabs" v-model="activeTab" stretch>
      <el-tab-pane label="Login" name="login">
        <el-form :model="form" label-width="120px" ref="ruleFormRef" :rules="rules" :size="formSize" class="demo-ruleForm"
          status-icon>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input v-model="form.pass" type="password" show-password />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(ruleFormRef)">登录</el-button>
            <el-button @click="resetForm(ruleFormRef)">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Register" name="register">
        <!-- 注册 -->
        <el-form :model="formG" label-width="120px" ref="ruleFormRefG" :rules="rulesG" :size="formSize"
          class="demo-ruleForm" status-icon>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formG.name" />
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input v-model="formG.pass" type="password" show-password />
          </el-form-item>
          <el-form-item label="验证" prop="val">
            <el-input v-model="formG.val" type="password" show-password />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(ruleFormRefG)">登录</el-button>
            <el-button @click="resetForm(ruleFormRefG)">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>


<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from "element-plus"
import { reactive, ref} from 'vue'
import api from '../api/index'
import store from "../store/index"
// import { mapMutations } from 'vuex'

const activeTab = ref("login");
interface RuleFormG {
  name: string
  pass: string
  val: string
}
interface RuleForm {
  name: string
  pass: string

}
const setUser=store._mutations['login/setUser'][0];

const ruleFormRefG = ref<FormInstance>()
const formG = reactive<RuleFormG>({
  name: 'realwzc',
  pass: '123456',
  val: '123456'

})
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const form = reactive<RuleForm>({
  name: 'realwzc',
  pass: '123456'

})
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value !== formG.pass) {
    callback(new Error("两次输入的密码并不相同"))
  } else {
    callback()
  }
}
const rulesG = reactive<FormRules<RuleFormG>>({
  name: [{
    required: true,
    message: '请输入用户名', trigger: 'blur'
  }
    , {
    max: 7, min: 5, message: '输入长度在5-7之间', trigger: 'blur'
  }
  ], pass: [{
    required: true,
    message: '请输入用户名', trigger: 'blur'
  }, {
    max: 7, min: 5, message: '输入长度在5-7之间', trigger: 'blur'
  },
    // {
    //   type:'number',message:'密码应该位数字',trigger:'blur'
    // }
  ], val: [{
    validator: validatePass, trigger: 'blur'
  }]
});
const rules = reactive<FormRules<RuleForm>>({
  name: [{
    required: true,
    message: '请输入用户名', trigger: 'blur'
  }, {
    max: 7, min: 5, message: '输入长度在5-7之间', trigger: 'blur'
  }
  ], pass: [{
    required: true,
    message: '请输入用户名', trigger: 'blur'
  }, {
    max: 7, min: 5, message: '输入长度在5-7之间', trigger: 'blur'
  }
    // {
    //   type:'number',message:'密码应该位数字',trigger:'blur'
    // }
  ]

});

// const activeName = ref('first')


const onSubmit = async (formEl: FormInstance | undefined) => {
  console.log(ruleFormRef);

  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (activeTab.value === 'login') {
        api.login(form).then(
          res => {
            if (res.data.status === 200) {
              localStorage.setItem("ego", JSON.stringify(res.data))
              // store._state.data=res;  直接的方式
              console.log( store._state.data);
              
              setUser(res.data);
              window.location.href="/";
              
              //
            }
            else {
              ElNotification({
                title: '登录失败',
                message: "用户名或密码错误",
                duration: 0,
              })
            }
          }
        )
      }
      else if (activeTab.value === "register") {
        console.log("注册");
        api.register(formG).then(res=>{
          if(res.data.status===200){
            ElNotification({
                title: '注册成功',
                message: "请登录",
              })
          }
          else{
            ElNotification({
                title: '注册失败',
                message: "请仔细检查",
              })
          }
        })
      }
      else console.log("错误接口")

      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 5000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))



</script>
<style scoped>
.el-card{
  margin-top: 10% !important;;
}
.card-header {

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  text-align: center;
  margin: auto auto;
  width: 480px;
}

.box-card span {
  margin: auto auto;
}
.el-button{
  color: black;
  border-radius: 58px;
background: #f6f5ef;
box-shadow:  5px 5px 10px #a2a29e,
             -5px -5px 10px #ffffff;
}

/* .demo-ruleForm{
  margin-top: 5%;
} */</style>
