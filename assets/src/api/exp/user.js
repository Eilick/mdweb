
import request from './main' //引入axios的封装方法

export default {
	getUserInfo : () => {
		return request('get', '/user/user_info') //登陆管理员获取自身信息
	},
	getUserInfoByGo : () => {
		return request('get', '/go/user/info') //登陆管理员获取自身信息
	},
    getAllRecordByGo : (time) => {
      return request('get', '/go/tool/record', {
        time
      })
	},
	getUserExpZoneList : (userType) => {
		return request('get', '/go/user/exp_zone_list', {
			user_type : userType
		})
	},
	getAllExpZones : () => {
		return request('get', '/go/tool/all_exp_zone_list')
	},
	queryUserByGo : (name, userType, expZoneCodes) => {
		return request('get', '/go/user/access_query', {
			user_name : name,
			user_type : userType,
			exp_zone_codes : expZoneCodes
		})
	},
	addUserAccess : (name, userType, expZoneCodes) => {
		return request('post', '/go/user/add_access', {
			username : name,
			usertype : userType,
			exp_zone_codes : expZoneCodes
		})
	},
	applyUserAccessByGo : (name, userType, expZone,cc) => {
		return request('post', '/go/user/apply_access', {
			user_type : userType,
			exp_zone : expZone,
			cc : cc
		})
	},
	deleteUser : (name) => {
		return request('post', '/go/user/del', {
			user_name : name,
		})
	},
	getSysBanTime : () => {
		return request('get', '/go/user/ban_time')
	},
	setSysBanTime : (from, to) => {
		return request('post', '/go/user/ban_operate', {
			start : from,
            end : to
		})
	},
	saveBanWhiteUser : (userStr) => {
		return request('post', '/go/user/save_ban_white_user', {
			user : userStr
		})
	},
	cancelSysBan : () => {
		return request('post', '/go/user/open_operate')
	},
	deleteLastSnapshot : (type) => {
		return request('post', '/user/del_snapshot', {
			type : type
		})
	},
	deleteLastSnapshotByGo : (type) => {
		return request('post', '/go/tool/del_snapshot', {
			type : type
		})
	},
	genSnapshot : (type) => {
		return request('post', '/user/gen_snapshot', {
			type : type
		})
	},
	genSnapshotByGo : (type) => {
		return request('post', '/go/tool/gen_snapshot', {
			type : type
		})
	},
	switchUser : (user) => {
		return request('post', '/go/user/switch_id', {
			user : user
		})
	},
	getPageViewList : (query) => {
		return request('get', '/user/pv_track_record', query)
	},
	getPageViewListByGo : (query) => {
		return request('get', '/go/user/pv_track_record', query)
	},
	getPageViewStat : () => {
		return request('get', '/user/pv_track_stat')
	},
    getPageViewStatByGo : () => {
      	return request('get', '/go/user/pv_uv_stat')
    },
	getSnapshot : (skip) => {
		return request('get', '/tool/snapshot', {
			skip : skip
		})
	},
	getSnapshotByGo : (skip) => {
		return request('get', '/go/tool/snapshot', {
			skip : skip
		})
	},
	locateSnapshotByGo : (date, shotType) => {
		return request('get', '/go/tool/locate_snapshot_offset', {
			date : date,
			snapshot_type : shotType
		})
	},
	sendPvStat : (url) => {
		return request('post', '/go/user/pv_track', {
			url
		})
	},
	getUserAccess : (user) => {
		return request('get', '/go/user/someone_exp_zone_list', {
			user_name : user
		})
	},
	saveJsErrorTrack : (track) => {
		return request('post', '/user/js_error_track', track)
	},
	uploadImage : (file) => {
		var formdata = new FormData();
        formdata.append('file', file);
		return request('post', '/file/upload_img', formdata)
	},
	sendMail : (users, subject, mailContent, isMarkdown) => {
		return request('post', '/user/send_mail', {
			mail_content : mailContent,
			subject : subject,
			mailers : users,
			markdown : isMarkdown
		})
	}
}
