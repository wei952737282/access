
import request from '@/utils/request'

export function createLd(data) {
    return request({
        url: '/admin-api/system/buildings/create',
        method: 'post',
        data
    })
}
export function updateLd(data) {
    return request({
        url: '/admin-api/system/buildings/update',
        method: 'put',
        data
    })
}

export function deleteLd(data) {
    return request({
        url: '/admin-api/system/buildings/delete?id=' + data.id,
        method: 'delete'
    })
}

export function createLc(data) {
    return request({
        url: '/admin-api/system/buildings-storey/create',
        method: 'post',
        data
    })
}
export function updateLc(data) {
    return request({
        url: '/admin-api/system/buildings-storey/update',
        method: 'put',
        data
    })
}

export function deleteLc(data) {
    return request({
        url: '/admin-api/system/buildings-storey/delete?id=' + data.id,
        method: 'delete'
    })
}

export function getLdList(data) {
  return request({
    url: '/admin-api/system/buildings/getListBuildings',
    method: 'post',
    data
  })
}
export function getLdInfo(data) {
  return request({
    url: '/admin-api/system/buildings/get',
    method: 'get',
    params:{
        ...data
    }
  })
}
export function getLcList(data) {
  return request({
    url: '/admin-api/system/buildings-storey/page',
    method: 'get',
    params:{
        ...data
    }
  })
}
export function getLcInfo(data) {
  return request({
    url: '/admin-api/system/buildings/get',
    method: 'get',
    params:{
        ...data
    }
  })
}