<template>
    <!-- <el-button text @click="dialogVisible = true">
        click to open the Dialog
      </el-button> -->

    <el-dialog v-model="dialogVisible" title="添加商品" width="60%">
        <el-form :model="form" label-width="120px">
            <el-form-item label="商品类目">
                <div>{{ choiceCate }}</div>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input v-model="form.title" :rules="[
                    { required: true, message: '不能为空' },
                ]" />
            </el-form-item>
            <el-form-item label="商品价格">
                <el-input v-model="form.price" :rules="[
                    { required: true, message: '不能为空' },
                ]" />
            </el-form-item>
            <el-form-item label="数量">
                <el-input v-model="form.num" :rules="[
                    { required: true, message: '不能为空' },
                ]" />
            </el-form-item>
            <el-form-item label="商品卖点">
                <el-input v-model="form.sellPoint" :rules="[
                    { required: true, message: '不能为空' },
                ]" />
            </el-form-item>
            <el-form-item label="图片地址">
                <el-input v-model="form.image" :rules="[
                    { required: true, message: '不能为空' },
                ]" />
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
    <el-dialog v-model.sync="dialogVisibletwo" title="商品类目" width="60%">
        <Tree />
    </el-dialog>
</template>
<script>
import { ElMessage } from 'element-plus'
import { inject, onMounted, reactive, ref } from 'vue';
import Tree from './Tree.vue';
import quillEditer from './quillEditer.vue';
import api from '@/api';

export default {
    components: {
        Tree, quillEditer
    },
    setup() {

        console.log("setUp");
        const choiceCate = ref('');
        const $bus = inject("$bus");
        $bus.$on('choiceTree', () => {
            const params = $bus.get('choiceTree');
            dialogVisibletwo.value = false;
            form.category = params.cid;
            choiceCate.value = params.title;
        })


        onMounted(() => {
            // console.log('mounted');
            $bus.$on('editorRevise', (e) => {
                let id = e.details.id;
                dialogVisible.value = true;
                dialogVisibletwo.value = dialogVisible.value;

                api.revisePre(id).then(res => {
                    if (res.status === 200) {
                        console.log(form);
                      
                        let formref = res.data.result[0];
                        form.id = formref.id;
                        form.title = formref.title;
                        form.price=formref.price;
                        form.num=formref.num;
                        form.category = formref.category;
                        form.descs = formref.descs;
                        form.sellPoint = formref.sellPoint;
                        form.image = formref.image;
                        $bus.$emit('faToQEditor',form.descs);
                        dialogVisible.value = true;
                        dialogVisibletwo.value = dialogVisible.value;
                        console.log("装载成功");

                    }
                    else {

                        ElMessage({
                            type: 'error',
                            message: '查找失败' + `status:${res.status}`,
                        })
                    }
                })
            })



            // console.log("mounted finsihed");
        })
        $bus.$on('editorChange', () => {
            form.descs = $bus.get('editorChange');
        })
        const productSub = () => {
            console.log(form);
            api.updatePro(form).then(res => {
                if (res.status === 200) {
                    dialogVisible.value = false;
                    $bus.$emit('reload', true);
                }
            }).catch(err => {
                console.log(err);
            })

        }
        const dialogVisible = ref(false);
        const dialogVisibletwo = ref(false);

        let form = reactive({
            image: '',
            price: 0,
            title: '',
            num: 0,
            sellPoint: '',
            descs: '',
            category: ''
        })
        // console.log(form);
        return {
            dialogVisible, form, dialogVisibletwo, productSub, choiceCate
        }
    }
}
</script>
<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>