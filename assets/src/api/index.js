import request from './request-base' //引入axios的封装方法

export default {
    getSqlData: (dbName, sqlStr) => {
        return request('post', '/sql', {
            sql: sqlStr,
            db_name: dbName,
        })
    },
    getDBList: () => {
        return request('get', '/db_list')
    },
    createMd: (title, content) => {
        return request('post', '/markdown/create', {
            title, content
        })
    },
}