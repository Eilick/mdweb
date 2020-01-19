
import request from './main' //引入axios的封装方法

export default {
	getExpsOperateList : (layerId) => {
		return request('get', '/tool/exp_operate_record', {
			exp_layer_id : layerId
		})
	},
	getExpsOperateListByGo : (layerId) => {
		return request('get', '/go/exp/operate_record', {
			exp_layer_id : layerId
		})
	},
	getRecentExpsByGo : () => {
		return request('get', '/go/exp/recent_online_exp_layer');
	},
	getVersionList : (layerId) => {
		return request('get', '/go/exp/version_list', {
			exp_layer_id : layerId
		});
	},
	getCrossVersion : (config) =>  {
		return request('get', '/stat_d/cross_version', config);
	},
	getLinkTask : (layerId) =>  {
		return request('get', '/go/exp/task_id', {
			exp_layer_id: layerId,
		});
	},
	getExpsByStrategySetId : (strgySetId) => {
		return request('get', '/lab/selectorsOrdered', {
			strategy_set_id: strgySetId,
		});
	},
	getDomainList : (strgySetId, page) => {
		let p = page || 'detail';
		return request('get', '/lab/domains', {
			strategy_set_id: strgySetId,
			page : p
		});
	},
	checkHasOnlineExp : (strgySetId) => {
		return request('get', '/lab/has_online_exp', {
			strategy_set_id: strgySetId,
		});
	},
	hasDoingFullApply : (strgySetId) => {
		return request('get', '/lab/has_volume_full_apply', {
			strategy_set_id: strgySetId,
		});
	},
	getExpEditInfo : (layerId) => {
		return request('get', '/lab/edit_info', {
			exp_layer_id: layerId,
		});
	},
	create : (exp) => {
		return request('post', '/go/exp/create', exp);
	},
	update : (exp) => {
		return request('post', '/lab/update_v1', exp);
	},
	updateByGo : (exp) => {
		return request('post', '/go/exp/update', exp);
	},
	createCustomerExp : (exp) => {
		return request('post', '/go/exp/create', exp);
	},
	updateCustomerExp : (exp) => {
		return request('post', '/lab/update_user_exp', exp);
	},
	getMyList : () => {
		return request('get', '/lab/my_exp_list');
	},
	getVolumeList : () => {
		return request('get', '/lab/editlab_list');
	},
	getAuditList : () => {
		return request('get', '/lab/audit_lab_list');
	},
	getGlobalList : (layerStatus) => {
		return request('get', '/lab/lab_list', {
			layer_status : layerStatus
		});
	},
	getLayerListByGo : (listType) => {
		return request('get', '/go/exp/list', {
			list_type : listType
		});
	},
	getLayerListOfStrategy: (strategySetId, page) => {
		return request('get', '/go/exp/list_of_strategy', {
			strategy_set_id : strategySetId + "",
			page : page + ""
		});
	},
	getAllLayerList : (page, listType) => {
		return request('get', '/go/exp/all_list', {
			page : page,
			list_type : listType,
		});
	},
	searchLayerListByGo : (keyword) => {
		return request('get', '/go/exp/search', {
			keyword
		});
	},
	getSonExpList : (layerId) => {
		return request('get', '/lab/exp_list', {
			exp_layer_id : layerId
		});
	},
	getAllocConf : (layerId) => {
		return request('get', '/lab/alloc_condition_info', {
			exp_layer_id : layerId
		});
	},
	getIpList : () => {
		return request('get', '/go/exp/load_all_ips');
	},
	auditRefuse : (layerId) => {
		return request('post', '/lab/audit_refuse', {
			exp_layer_id : layerId
		});
	},
	auditRefuseByGo : (layerId) => {
		return request('post', '/go/exp/audit', {
			exp_layer_id : layerId + '',
			action : "refuse",
		});
	},
	auditOffline :  (layerId) => {
		return request('post', '/lab/audit_offline', {
			exp_layer_id : layerId
		});
	},
	auditOfflineByGo :  (layerId) => {
		return request('post', '/go/exp/offline', {
			exp_layer_id : layerId + ''
		});
	},
	auditOnline :  (layerId) => {
		return request('post', '/lab/audit_online', {
			exp_layer_id : layerId
		});
	},
	auditOnlineByGo :  (layerId) => {
		return request('post', '/go/exp/audit', {
			exp_layer_id : layerId + '',
			action : "pass",
		});
	},
	updateExpQuota :  (layerId, quota) => {
		return request('post', '/lab/edit_quota', {
			exp_layer_id : layerId,
			quota : quota
		});
	},
	getGlobalStat : () => {
		return request('get', '/lab/stat');
	},
  	getGlobalStatByGo : () => {
      	return request('get', '/go/exp/stat');
	},
	getMyStat : () => {
		return request('get', '/lab/my_stat');
	},
	getExpBtn : (layerId) => {
		return request('get', '/lab/btns', {
			exp_layer_id : layerId,
		});
	},
	getExpBtnByGo : (layerId) => {
		return request('get', '/go/exp/btns', {
			exp_layer_id : layerId,
		});
	},
	getDetail : (layerId) => {
		return request('get', '/lab/detail', {
			exp_layer_id : layerId,
		});
	},
	getExpDetailByGo : (layerId) => {
		return request('get', '/go/exp/detail', {
			exp_layer_id : layerId,
		});
	},
	getGrayIp : (layerId) => {
		return request('get', '/lab/last_gray_ip', {
			exp_layer_id : layerId,
		});
	},
	getExpCount : () => {
		return request('get', '/go/user/audit_count');
	},
	applyPushAll : (expId, extra) => {
		return request('post', '/lab/apply_push_all', {
			exp_id :expId + '', 
			mail_info : extra
		});
	},
	applyPushAllByGo : (expId, extra) => {
		return request('post', '/go/exp/apply_push_all', {
			exp_id :expId + '', 
			mail_info : extra
		});
	},
	getVolumeConfimeList : (layerId) => {
		return request('get', '/lab/volume_confirm_list', {
			exp_layer_id : layerId
		});
	},
	confirmMsg : (confirmId, yesNo, msg) => {
		return request('post', '/lab/confirm_msg', {
			confirm_id : confirmId,
			yes_no : yesNo,
			msg : msg
		});
	},
	confirmMsgByGo : (confirmId, yesNo, msg) => {
		return request('post', '/go/exp/confirm_volume_msg', {
			confirm_id : confirmId,
			yes_no : yesNo,
			msg : msg
		});
	},
	doPushAll : (layerId) => {
		return request('post', '/lab/do_push_all', {
			exp_layer_id : layerId
		});
	},
	doPushAllByGo : (layerId) => {
		return request('post', '/go/exp/volume_full', {
			exp_layer_id : layerId + '',
			action : "confirm"
		});
	},
	cancelPushAll : (layerId) => {
		return request('post', '/lab/cancel_push_all', {
			exp_layer_id : layerId
		});
	},
	cancelPushAllByGo : (layerId) => {
		return request('post', '/go/exp/volume_full', {
			exp_layer_id : layerId + '',
			action : "cancel"
		});
	},
	checkAdUsed : (adId) => {
		return request('get', '/lab/check_ad_in_exp',  {
			ad_id : adId,
		});
	},
	getAdConsumeInfo : (adId) => {
		return request('get', '/lab/ad_consume',  {
			ad_id : adId,
		});
	},
	getVolumeFullApplyList : (strategySetId) => {
		return request('get', '/lab/full_volume_apply', {
			strategy_set_id : strategySetId
		});
	},
	getVolume20ApplyList : (layerId) => {
		return request('get', '/lab/volume_20_applys', {
			exp_layer_id : layerId
		});
	},
	getVolume20ApplyListByLayer : (layerId) => {
		return request('get', '/lab/volume_full_applys', {
			exp_layer_id : layerId
		});
	},
	getConfirmListByApplyId : (applyId) => {
		return request('get', '/lab/confirm_list_byapplyid', {
			volume_apply_id : applyId
		});
	},
	addUser : (layerId, user) => {
		return request('post', '/go/exp/add_user', {
			exp_layer_id :layerId + '', 
			user : user
		});
	},
	getBudgetExpLayer : (layerId) => {
		return request('get', '/lab/budget_exp_layer', {
			exp_layer_id : layerId
		});
	},
	getExpObjectConsume : (expId, expObject) => {
		return request('get', '/lab/exp_object_consume', {
			exp_id : expId,
			exp_object : expObject
		});
	},
	getExpLayer : (layerId) => {
		return request('get', '/go/exp/detail', {
			exp_layer_id : layerId
		});
	}
}
