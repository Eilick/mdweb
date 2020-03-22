import request from './request-base' //引入axios的封装方法

export default {
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
}