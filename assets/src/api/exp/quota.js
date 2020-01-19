
import request from './main' //引入axios的封装方法

export default {
	getHubbleList : () => {
		return request('get', '/go/quota/hubble_list')
	},
    getListByGo : (type) => {
        return request('get', '/go/quota/list',{
			type:type
	    })
    },
	updateByGo : (quota) => {
		return request('post', '/go/quota/update', quota)
	},
	createByGo : (quota) => {
		return request('post', '/go/quota/add', quota)
	},
	deleteByGo : (id) => {
		return request('post', '/go/quota/del', {
			quota_id: parseInt(id)
		})
	},
	getBook : () => {
		return request('get', '/go/quota/book')
	},
	getTrafficQuotas : (expZone) => {
		return request('get', '/quota/traffic_quota_list', {
			exp_zone_code : expZone
		})
	},
	getCustomerQuotas : (expZone) => {
		return request('get', '/quota/customer_quota_list', {
			exp_zone_code : expZone
		})
	}
}
