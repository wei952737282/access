
import request from '@/utils/request'

export function createMj(data) {
    return request({
        url: '/admin-api/system/gates/create',
        method: 'post',
        data
    })
}
export function updateMj(data) {
    return request({
        url: '/admin-api/system/gates/update',
        method: 'PUT',
        data
    })
}
export function deleteMj(data) {
    return request({
        url: '/admin-api/system/gates/delete?id='+data.id,
        method: 'DELETE'
    })
}
export function getMjList(data) {
    return request({
        url: '/admin-api/system/gates/page',
        method: 'get',
        params:{
            ...data
        }
    })
}
export function createEdtion(data) {
    return request({
        url: '/admin-api/system/gates-edition/create',
        method: 'post',
        data
    })
}
export function updateEdtion(data) {
    return request({
        url: '/admin-api/system/gates-edition/update',
        method: 'PUT',
        data
    })
}
export function delEdtion(data) {
    return request({
        url: '/admin-api/system/gates-edition/delete?id='+data.id,
        method: 'DELETE'
    })
}
export function getEdtionList(data) {
    return request({
        url: '/admin-api/system/gates-edition/page',
        method: 'get',
        params:{
            ...data
        }
    })
}

export function getEdtionDetail(data) {
    return request({
        url: '/admin-api/system/gates-edition/get',
        method: 'get',
        params:{
            ...data
        }
    })
}
export function createIp(data) {
    return request({
        url: '/admin-api/system/zones-network-configs/create',
        method: 'post',
        data
    })
}
export function delIp(data) {
    return request({
        url: '/admin-api/system/zones-network-configs/delete?id='+data.id,
        method: 'DELETE'
    })
}
export function updateIp(data) {
    return request({
        url: '/admin-api/system/zones-network-configs/update',
        method: 'PUT',
        data
    })
}
export function getIpList(data) {
    return request({
        url: '/admin-api/system/zones-network-configs/page',
        method: 'get',
        params:{
            ...data
        }
    })
}