<template>
    <el-tree-v2 :data="data" :props="props" :height="208" @node-click="test"/>
  </template>
  <script lang="ts" setup>
import { inject } from 'vue';

// import api from '@/api';
// import type { TreeNode, TreeNodeData } from 'element-plus/lib/components/tree-v2/src/types.js';
// import { reactive } from 'vue';
const $bus:any=inject('$bus');
//   interface Tree {
//     id: string
//     label: string
//     children?: Tree[]
//   }
  
//   const getKey = (prefix: string, id: number) => {
//     return `${prefix}-${id}`
//   }
// function getAllData(data:Array)
// {
//     return data.map((item)=>{
//         if(item.id===1){
//         api.getCateItem(item.cid).then(res=>{
//         if(res.status===200){
//         item.children= res.data.result;
//         }}
//         )
//     }
//     return item;
//     })
// }
// const data=reactive({})
const test=(data,treenode)=>{
   // console.log(JSON.stringify(data.value));
// data={}    
if(treenode.level!=1){
$bus.$emit('choiceTree',data);
}
}
// api.getCateItem().then(res=>{
//     if(res.status===200){
//         console.log(res.data.result);
        
//         data.value=getAllData(res.data.result);
//     }
// })
  
  
// //   const createData = (
// //     maxDeep: number,
// //     maxChildren: number,
// //     minNodesNumber: number,
// //     deep = 1,
// //     key = 'node'
// //   ): Tree[] => {
// //     let id = 0
// //     return Array.from({ length: minNodesNumber })
// //       .fill(deep)
// //       .map(() => {
// //         const childrenNumber =
// //           deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren)
// //         const nodeKey = getKey(key, ++id)
// //         return {
// //           id: nodeKey,
// //           label: nodeKey,
// //           children: childrenNumber
// //             ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
// //             : undefined,
// //         }
// //       })
// //   }
  
  const props = {
    value: 'cid',
    label: 'title',
    children: 'children',
  }
//   const data = createData(4, 30, 40)
  let data=[{"id":1,"title":"家电","cid":1001,"children":[{"id":1001,"title":"电吹风","cid":1001},{"id":1001,"title":"冰箱","cid":1002},{"id":1001,"title":"洗衣机","cid":1003}]},{"id":1,"title":"手机/数码","cid":1002,"children":[{"id":1002,"title":"电视","cid":1001},{"id":1002,"title":"摄像机","cid":1002}]},{"id":1,"title":"家具","cid":1003,"children":[{"id":1003,"title":"柜子","cid":1001},{"id":1003,"title":"沙发","cid":1002}]}];
  </script>
  