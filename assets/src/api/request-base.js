import axios from 'axios'
import lodash from 'lodash';

function getRequestUrl(config) {

  if(lodash.startsWith(config.url, 'http://') || lodash.startsWith(config.url, 'https://') || lodash.startsWith(config.url, '//')) {
        return config.url;
    }
    
    if(process.env.NODE_ENV == 'development') {
      return `//127.0.0.1:8888${config.url}`;
    }

    return config.url

}
//过滤请求
axios.interceptors.request.use(config => {

  config.timeout = 120 * 1000;
  config.url = getRequestUrl(config); 

  return config;

}, error => {
  return Promise.reject(error)
})


// 添加响应拦截器
axios.interceptors.response.use(response => {

    if(response.data.errcode == -100) {
      window.location.href = response.data.login_url;
      return;
    }

    if(response.data.errcode == -99) { //禁用
      window.location.href = response.data.jump_url;
      return;
    }

    if(response.data.errcode == -98) { //强制更新静态页面
      window.location.reload();
      return;
    }

    return Promise.resolve(response.data) //使用Promise.resolve 正常响应
},  error => {
    return Promise.reject(error)
})

export default function request(method, url, data, header, host) {  //暴露 request 给我们好API 管理
    axios.defaults.host = host;
    if(process.env.NODE_ENV != 'development') {
      axios.defaults.withCredentials = true;
    }
    method = method.toLocaleLowerCase()   //封装RESTful API的各种请求方式 以 post get delete为例
    if (method === 'post') {
      return axios.post(url, data)    //axios的post 默认转化为json格式
    } else if (method === 'get') {     
        return axios.get(url, {
          params: data,
          host : host,
        })
    } else if (method === 'delete') {
        return axios.delete(url, {
          params: data
        })
    }
}