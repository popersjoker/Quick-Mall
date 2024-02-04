import axios from 'axios'
import store from '../store/index.js'
import qs from 'qs'
// import { log } from 'console'
// import { resolveSoa } from 'dns'
// import { log } from 'console'
// import { log } from 'console'
// import { error } from 'console'

const errorHandle = (status, info) => {
  switch (status) {
    case 400:
      console.log('语义有错，当前请求无法被服务器理解。除非进行修改，否则客户端不被响应')
      break
    case 401:
      // token 令牌
      console.log('服务器认证失败')
      break
    case 403:
      console.log('服务器已经理解请求，但是仍热拒绝')
      break
    case 404:
      console.log('请检查网络请求地址')
      break
    case 500:
      console.log('服务器遇到了一个未曾预料的结果，导致了他无法完成对请求的处理')
      break
    case 502:
      console.log('作为网关或者代理工作的服务器尝试执行请求，从上游服务器收到')
      break
    default:
      console.log(info)
      break
  }
}
//axios instance
const instance = axios.create({
  timeout: 5000
})
instance.interceptors.request.use(
  (config) => {
    console.log("请求配置"+JSON.stringify(config));
    if (config.method === 'post') {
      console.log("变化之前");
      console.log(config.data);
      config.data = qs.stringify(config.data)
      console.log(config.data);
    }
    if (store.state.login.user.token) {
      config.headers.authorization = store.state.login.user.token
    }
    return config
  },
  (error) => Promise.reject(error) //拒绝不合理的请求
)
instance.interceptors.response.use(
    
  response=>{console.log("response "+response);console.log(response);response.status==200?Promise.resolve(response):Promise.reject(response);return response;
    },
    error=>{
      // console.log(error+" error");
        const {response}=error;
        if(!response){
          console.log("请求失败");
        return
        }
        errorHandle(response.status,response.info);
    }

    )
export default instance;