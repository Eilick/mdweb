import axios from 'axios'
import lodash from 'lodash';
import Vue from 'vue'
function getRequestUrl(config) {

    if (lodash.startsWith(config.url, 'http://') || lodash.startsWith(config.url, 'https://') || lodash.startsWith(config.url, '//')) {
        return config.url;
    }
    if (process.env.NODE_ENV == 'development') {
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
    console.log(response)
    if (response.data.code == -100) {
        window.location.href = "/login"
        return
    }


    return Promise.resolve(response.data) //使用Promise.resolve 正常响应
}, error => {
    return Promise.reject(error)
})

export default function request(method, url, data) {  //暴露 request 给我们好API 管理

    if (process.env.NODE_ENV != 'development') {
        axios.defaults.withCredentials = true;
    }
    axios.defaults.headers.common["token"] = localStorage.getItem("token")
    method = method.toLocaleLowerCase()   //封装RESTful API的各种请求方式 以 post get delete为例
    if (method === 'post') {
        return axios.post(url, data)
    } else if (method === 'get') {
        return axios.get(url, {
            params: data,
        })
    } else if (method === 'delete') {
        return axios.delete(url, {
            params: data
        })
    }
}
