// import LoginVue from '@/view/Login.vue';
// import { log } from 'console';
// import { log } from 'console';
import axios from '../utils/request'
import base from './base'

const api = {
  register(params) {
    // console.log(base.baseUrl+base.register+params);
    return axios.post(base.baseUrl + base.register, params)
  },
  login(params) {
    return axios.post(base.baseUrl + base.login, params)
  },
  sPByPage(page) {
    return axios.get(base.baseUrl + base.sProPage, {
      params: {
        page: page
      }
    })
  },
  getPage() {
    return axios.get(base.baseUrl + base.getPage, null)
  },
  search(params) {
    return axios.post(base.baseUrl + base.search, params)
  },
  getCateItem(query) {
    return axios.get(base.baseUrl + base.getCateItem, {
      params: {
        query
      }
    })
  },
  insertToP: (params) => axios.post(base.baseUrl + base.insertTP, params),
  delProById: (params) =>
    axios.get(base.baseUrl + base.delProById, {
      params: {
        id: params
      }
    }),
  revisePre: (params) =>
    axios.get(base.baseUrl + base.revisePre, {
      params: {
        id: params
      }
    })
    ,updatePro:params=>axios.post(base.baseUrl + base.updatePro, params),
    paramslike:params=>axios.post(base.baseUrl + base.paramslike, params),
    selectParamsByPage:(params) =>
    axios.get(base.baseUrl + base.selectParamsByPage, {
      params: {
        page: params
      }
    }),
    getParamsPage:() =>{console.log(base.baseUrl + base.getParamsPage)    
    return axios.get(base.baseUrl + base.getParamsPage, null)
// 
}
}
export default api
