// main.ts
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
//import type { App } from 'vue'; // 引入 App 类型

import App from './App.vue';
import 'normalize.css';
import './utils/init'
import EventBus from './utils/EventBus';
import './router/permission'
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from './router/index.js';
import store from '@/store/index'
// import VueQuillEditor from 'vue-quill-editor'
const app = createApp(App);
//宏定义


function $(modules){
 const mod=import (modules);
return mod;
}
window.$=$;



// 先注册 Element Plus 的图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// app.component('quill-editor',VueQuillEditor)

// 再注册 Element Plus 的其他组件
app.use(ElementPlus);
app.use(router);
app.use(store)
// app.config.globalProperties.$bus=EventBus;//全局定义属性
// //使用 instance.$bus
app.provide('$bus',EventBus);
//使用 inject('$bus)
app.mount('#app');
