
import request from './main' //引入axios的封装方法

export default {
	getUserInfo : () => {
		return request('get', '/user/info')
	},
	getProjectList : () => {
		return request('get', '/time/ocean/lake/items')
	},
	getSourceList : (project) => {
		return request('get', '/time/ocean/lake/source', {
			name : project
		})
	},
	getVersionList : (project, source) => {
		return request('get', '/time/ocean/lake/version', {
			name : project,
			source,
		})
	},
	getFeatureList : (project, source, version) => {
		return request('get', '/time/ocean/lake/search', {
			name : project,
			source,
			version
		})
	},
	verifyStoragePrefix : (prefix) => {
		return request('get', '/time/ocean/lake/check_prefix', {
			prefix
		})
	},
	create : (p) => {
		return request('post', '/time/ocean/lake/add_item', p)
	},
	getSubmitHistory : () => {
		return request('get', '/time/ocean/lake/history')
	}
}
