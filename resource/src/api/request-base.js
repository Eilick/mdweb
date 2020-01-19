import axios from 'axios'


//过滤请求
axios.interceptors.request.use(config => {

    config.timeout = 120 * 1000;

    config.url = "http://127.0.0.1:8808" + config.url

    return config;

}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {

    return Promise.resolve(response.data) //使用Promise.resolve 正常响应
}, error => {
    return Promise.reject(error)
})


export default function request(method, url, data) {  //暴露 request 给我们好API 管理
    method = method.toLocaleLowerCase()   //封装RESTful API的各种请求方式 以 post get delete为例
    if (method === 'post') {
        return axios.post(url, data)    //axios的post 默认转化为json格式
    } else if (method === 'get') {
        return axios.get(url, {
            params: data
        })
    } else if (method === 'delete') {
        return axios.delete(url, {
            params: data
        })
    }
}