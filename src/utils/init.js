import store from '../store/index'
console.log("调用");
if(localStorage.getItem('ego')){
    store.commit('login/setUser',JSON.parse (localStorage.getItem("ego")))
}