import request from './main'

export default {
  createSection: (service, section, strategys) => {
    return request('post', '/go/qingl/create_section', {
      service, section, strategys
    })
  },
  updateSection: (service, section, strategys, del_strategys) => {
    return request('post', '/go/qingl/update_section', {
      service, section, strategys, del_strategys
    })
  },
  getServiceConfig: (service, section) => {
    return request('get', '/go/qingl/service_section', {
      service, section
    })
  },
  getServiceSectionLog: (service, section, from, to) => {
    return request('get', '/go/qingl/service_section_log', {
      service, section, from, to
    })
  },
  getServiceSnapshotList: (service, page) => {
    return request('get', '/go/qingl/service_snapshot_list', {
      service, page
    })
  },

  getServiceList: (service_type) => {
    return request('get', '/go/qingl/service_list', {
      service_type
    })
  },
  getSingleService: (service) => {
    return request('get', '/go/qingl/single_service', {
      service
    })
  },
  createService: (obj) => {
    return request('post', '/go/qingl/create_service', obj)
  },
}