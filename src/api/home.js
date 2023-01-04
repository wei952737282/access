import request from '@/utils/request';

export function getMj(data) {
    return request({
      url: '/admin-api/system/gates/homeStatistics',
      method: 'get',
      data
    })
  }
  