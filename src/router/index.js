import params from "../view/main/Param/index.vue"
import {createRouter,createWebHistory} from 'vue-router'
import Home from '../view/main/HomePage/Home.vue'
import Lay from '../view/Layout.vue'
import Login from '../view/Login.vue'
import ADC from '../view/main/ADCategory/index.vue'
import Product from '../view/main/Product/index.vue'
const routes=[{
    path:'/',
    name:'Layout',
    component:Lay,
    children:[{
        path:'',
        name:'Home',
        component:Home,
        meta:{
            isLogin:true
        }
    },{
        path:'params',
        name:'Params',
        component:params,
        meta:{
            isLogin:true
        }
    },{
        path:'ad',
        name:'ADCategory',
        component:ADC,
        meta:{
            isLogin:true
        }
    },
    {
        path:'pr',
        name:'Product',
        component:Product,
        meta:{
            isLogin:true
        }

    },{
        path:'details',
        name:'Details',
        component:()=>import('@/view/main/HomePage/sub/Details.vue'),
        meta:{
            isLogin:true
        },
        children:[{
            path:'golife',
            name:'Golife',
            component:()=>import("@/view/main/HomePage/sub/golife.vue")
        },{
            path:'logo',
            name:'Logo',
            component:()=>import("@/view/main/HomePage/sub/logo.vue")
        },
        {
            path:'heigh',
            name:'Heigh',
            component:()=>import("@/view/main/HomePage/sub/heigh.vue")
        }, {
            path:'openproduct',
            name:'Openproduct',
            component:()=>import("@/view/main/HomePage/sub/openProduct.vue")
        }

        ]
    }
]}
    ,{
    path:'/login',
    name:'Login',
    component:Login
    }
]
const router=createRouter({
    history: createWebHistory(),
    // base:process.env.BASE_URL,//??
    routes:routes,
})
export default  router;