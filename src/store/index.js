// import {createApp} from 'vue'
import Vuex from 'vuex'

import login from './modules/login'
const store =new Vuex.Store({
    modules:{
        login
    }
})
export default store