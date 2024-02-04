//路由控制
import router from './index'
import store from '../store/index'
router.beforeEach((to,from,next)=>{
// alert("路由")
    console.log("去往"+JSON.stringify(to));
    if(to.meta.isLogin){
        let token=store.state.login.user.token;
        if(token){
            console.log("跳转");
            console.log(token);
            // console.log("SS");
            next()
        }
        else {
            // console.log("Go?")
            next({name:'Login'});//去往登陆页面
        }
        
    }
    else next();
})