import request from '@/api/request';
let api = '/li-api';
// 删除
export function deleteTarget(roleId) {
  return request({
    url: api + '/knowledge/set/' + roleId,
    method: 'delete'
  })
}

// 修改前，获取当前行数据
export function getSingleData(query) {
  return request({
    url: api + '/knowledge/set/' + query,
    method: 'get'
  });
}

// 修改后，保存
export function updateData(data) {
  return request({
    url: api + '/knowledge/set/' + query,
    method: 'put',
    data: data
  });
}
