import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin-api/system/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin-api/system/auth/get-permission-info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin-api/system/auth/logout',
    method: 'post'
  })
}
export function getYzm(data) {
  return request({
    url: '/admin-api/system/auth/send-sms-code',
    method: 'post',
    data
  })
}
export function resetPwd(data) {
  return request({
    url: '/admin-api/system/auth/reset-password',
    method: 'post',
    data
  })
}

export function createDept(data) {
  return request({
    url: '/admin-api/system/dept-info/create',
    method: 'post',
    data
  })
}
export function updateDept(data) {
  return request({
    url: '/admin-api/system/dept-info/update',
    method: 'put',
    data
  })
}

export function deleteDept(data) {
  return request({
      url: '/admin-api/system/dept-info/delete?id=' + data.id,
      method: 'delete'
  })
}
export function getDept(data) {
  return request({
    url: '/admin-api/system/dept-info/listSimple',
    method: 'get',
    params: { ...data }
  })
}
export function getDeptByPage(data) {
  return request({
    url: '/admin-api/system/dept-info/page',
    method: 'get',
    params: { ...data }
  })
}
export function getMenu(data) {
  return request({
    url: '/admin-api/system/auth/list-menus',
    method: 'get',
    params: { ...data }
  })
}


