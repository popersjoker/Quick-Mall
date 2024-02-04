<template>
    
    <el-table :data="tableData" stripe border size="small" class="tb" :tableHead="tableHead"> 
       
        <!-- <template name="img">
            ggggggggggg
            </template> -->
        <!-- //tableHead[{
            prop:,
            label:,
            slot:boolean 
            id:
        }]  tableData-->
        <el-table-column :prop="item.prop" :label="item.label" width="100" v-for=" (item,index) in tableHead" :key="item.id">
            <template #default="scope">
                <slot :name="item.prop" v-if="item.slot" :scope="scope.row" :key="index" :index="scope.$index">
                </slot>
            </template>
           
        </el-table-column>
        <el-table-column label="操作">
            <!-- {edit:fn,delete:fn} -->
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
        <!-- 注意 table宽度要等于item之和否则出bug -->
    </el-table>
</template>
<script>
import { inject, onMounted, defineProps} from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
// const api=$();
export default {
    props:{
        tableHead:{
            required:true,
            type:Array

        },
        operate:{
            required:true,
            type:Object
        },
        tableData:{
            required:true,
            type:Array
        }

    },
    setup(props,{slots}) {
        console.log(slots);
        // defineProps(['operate','tableData']);
        let operate=props.operate;
        let tableData=props.tableData;
        const $bus = inject('$bus');
        $bus.$on('search', () => {
            tableData.value = $bus.get('search');
        })
        $bus.$on('pageChange', () => {
            const page = $bus.get('pageChange');
            console.log("触发" + page);
            operate.onMounted($bus.get('pageChange')).then(

                res => {
                    tableData.value = res.data.result;
                    // console.log(ta);
                }
            );

        })
      
        const handleEdit = (index, row) => {//index 第几行 从0开始 row行数据
            $bus.$emit('editorRevise',{id:row.aid,visble:true,content:row});

        }
        const handleDelete = (index, row) => {
            ElMessageBox.confirm(
                '确定删除该项吗?',
                'Warning',
                {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(() => {
                    operate.delete(index,row)
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '删除取消',
                    })
                })
        }
      //const 第一层地址不会变也就是Array的地址
        onMounted(() => {
            operate.onMounted().then(res=>{
                if(res.status===200){
                    tableData.value=res.data.result;
                }
            });
        })
        return {
             handleDelete, handleEdit
        }
    }

}
</script>
<style scoped>
.tb {
    width: 70% !important;
    margin: auto auto;
    border-radius: 20px;
background: #e0e0e0;
box-shadow:  3px 3px 5px #bebebe,
             -3px -3px 5px #ffffff;
/* 
    -webkit-animation: slide-in-blurred-tr 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
	        animation: slide-in-blurred-tr 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both; */

}
</style>