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
    updateMd: (id, title, content) => {
        return request('post', '/markdown/update', {
            id, title, content
        })
    },
    deleteMd: (id) => {
        return request('post', '/markdown/delete', {
            id
        })
    },
    getMdList: () => {
        return request('get', '/markdown/list')
    },
    getMdDetail: (id) => {
        return request('get', '/markdown/detail', {
            id
        })
    },
}