
import request from './main' //引入axios的封装方法

export default {
  	getAllListByGo : (data) => {
        return request('get', '/go/strategy/all',data)
    },
  	getProductList : () => {
		return request('get', '/go/user/exp_zone_list')
	},
  	getStatByGo : () => {
      	return request('get', '/go/strategy/stat')
	},
  	getMyListByGo : () => {
      return request('get', '/go/strategy/mine')
    },
  	getAuditListByGo : () => {
      	return request('get', '/go/strategy/audit')
    },
  	dataFilter : (keyword) => {
      return request('get', '/go/strategy/search',{
      	keyword
	  })
    },
	getStrategyByGo : (id) => {
		return request('get', '/go/strategy/detail', {
			strategy_set_id : id
		})
	},
	applyOffline : (id, auditor) => {
		return request('post', '/go/strategy/apply_offline', {
			strategy_set_id : id + '',
			assign_auditor : auditor
		})
	},
	auditPass : (id) => {
		return request('post', '/go/strategy/audit_pass', {
			strategy_set_id : id + ''
		})
	},
	auditReject : (id) => {
		return request('post', '/go/strategy/audit_refuse', {
			strategy_set_id : id + ''
		})
	},
	updateByGo : (strategy) => {
		return request('post', '/go/strategy/update', strategy)
	},
	create : (strategy) => {
		return request('post', '/go/strategy/create', strategy)
	},
	getOperateListByGo : (id) => {
		return request('get', '/go/strategy/operate_record', {
			strategy_set_id : id
		})
	},
	addUser : (strategySetId, user) => {
		return request('post', '/go/strategy/add_user', {
			strategy_set_id :strategySetId + '', 
			user : user
		});
	},
	getCreateExpStrategyList : (expZoneCode, expLayerType) => {
		return request('get', '/go/strategy/create_exp_list', {
			exp_zone_code :expZoneCode + '', 
			exp_layer_type : expLayerType + ''
		});
	},
	getStrategyExpStat : (strategySetId) => {
		return request('get', '/go/strategy/exp_stat', {
			strategy_set_id :strategySetId
		});
	},
	getVolumeApplys : (strategySetId) => {
		return request('get', '/go/exp/volume_applys', {
			strategy_set_id :strategySetId
		});
	},
	getFullVolumeConfirms : (strategySetId) => {
		return request('get', '/go/exp/volume_confirm_list', {
			strategy_set_id :strategySetId
		});
	},
	getStrategyDomainList : (strgySetId) => {
		return request('get', '/go/strategy/domains', {
			strategy_set_id: strgySetId,
		});
	},
}  
