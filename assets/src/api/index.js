import request from './request-base' //引入axios的封装方法

export default {
    createMd: (title, content, classify, content_type) => {
        return request('post', '/markdown/create', {
            title, content, classify, content_type
        })
    },
    updateMd: (id, title, content) => {
        return request('post', '/markdown/update', {
            id, title, content
        })
    },
    moveMd: (id, classify) => {
        return request('post', '/markdown/move', {
            id, classify
        })
    },
    deleteMd: (id) => {
        return request('post', '/markdown/delete', {
            id
        })
    },
    recoverMd: (id) => {
        return request('post', '/markdown/recover', {
            id
        })
    },
    getMdList: (listType, classify) => {
        return request('get', '/markdown/list', {
            list_type : listType,
            classify : classify,
        })
    },
    searchMdList: (keyword) => {
        return request('get', '/markdown/search', {
            keyword
        })
    },
    getUrlList: (listType) => {
        return request('get', '/markdown/urllist', {
            list_type : listType,
        })
    },
    getClassify: () => {
        return request('get', '/markdown/classify')
    },
    getImageList: () => {
        return request('get', '/markdown/images')
    },
    getMdDetail: (id) => {
        return request('get', '/markdown/detail', {
            id
        })
    },
    uploadImage : (file) => {
	var formdata = new FormData();
        formdata.append('file', file);
		return request('post', '/markdown/upload_image', formdata)
    },
    delImg : (name) => {
        return request('post', '/markdown/del_image', {
            name
        })
    },
    genToken : (name) => {
        return request('post', '/gen_token', {
            user : name
        })
    },
    getShareUrl : (id) => {
        return request('get', '/markdown/share', {
            id
        })
    },
    getShareMd : (code) => {
        return request('get', '/share/page', {
            code
        })
    },
}
