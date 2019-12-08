
import request from './request-base' //引入axios的封装方法

export default {
    getSqlData: (sqlStr) => {
        return request('post', '/tool/mysql', {
            sql: sqlStr
        })
    },
}
