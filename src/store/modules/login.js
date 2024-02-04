export default {
    namespaced:true,
    state:{
        user:{
            username:' ',
            token:null
        }
    },
    mutations:{//?
        setUser(state,user){
        state.user=user
        }
    }
}