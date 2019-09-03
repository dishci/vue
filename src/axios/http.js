import axios from 'axios'
import qs from 'qs'
import  store from '../store'

const https = axios.create({
    
    withCredentials: true,  //是否跨站点访问控制请求
    
    // https://www.ltcweb.top
    // /apis
    baseURL: '/apis', // 默认url
    // 超时时间
    timeout:5000
})
https.interceptors.request.use(config => {
    //  console.log(config)
    //  formdata使用 node后台也得改接收格式
  
    // 序列化参数与json.stringify()相同
    config.method === 'post'
        ?config.data = qs.stringify({...config.data})
        : config.params = {...config.params};
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  
    return config;
  }, error => {  //请求错误处理
  
    Promise.reject(error)
  });
  
  /****** respone拦截器==>对响应做处理 ******/
  https.interceptors.response.use(
    response => {  //成功请求到数据     
    
        return Promise.resolve(response.data)            
    
         
  
         
    },
    error => {  //响应错误处理
        console.log('error');
        return Promise.reject(error)
    }
  );
export default https;
