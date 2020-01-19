
import request from './main' //引入axios的封装方法
import moment from 'moment';

export default {
	getConfig : () => {
		return request('get', '/go/stat_d/config')
	},
	getYesterdayStatByGo : (layerId, psid) => {
		return request('get', '/go/stat_d/yesterday_stat', {
			exp_layer_id : layerId,
			psid : psid,
			cdate : moment().format('YYYY-MM-DD')
		})
	},
	getOfflineStatCheck : (date) => {
		return request('get', '/stat_d/check_offline_data', {
			date: date,
			cdate : moment().format('YYYY-MM-DD')
		})
	},
	getOfflineStatCheckByGo : (date) => {
		return request('get', '/go/stat_d/check_offline_data', {
			date: date,
			cdate : moment().format('YYYY-MM-DD')
		})
	},
	saveCustomization : (config) => {
		return request('post', '/go/stat_d/save_effect_customization', config)
	},
	getQuotaChartData : (config) => {
		return request('get', '/go/stat_d/target_chart', config)
	},
	getDebugParam : (config) => {
		return request('get', '/stat_d/search_engine_param', config)
	},
	getDebugParamByGo : (config) => {
		return request('get', '/go/stat_d/call_params', config)
	},
	getCustomerStat : (config) => {
		return request('get', '/go/stat_d/customer_detail', config)
	},
	getStat : (config) => {
		return request('get', '/go/stat_d/rate', config)
	},
}  
