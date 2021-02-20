import { get, post,deleteFn } from './axios.config.js'
const api = '/li-api'
// 列表查询
export const getTargetList = params => post(api + '/knowledge/set/list', params);
// 新增
export const addTarget = params => post(api + '/knowledge/set/add', params);
// 修改

// 删除
export const deleteTarget = params => deleteFn(api + '/knowledge/set', params);
// 获取目标类型
export const getTargetTypes = params => get(api + 'target/type/tree', params);
// 获取所属组织数据
export const getOrganTypes = params => get(api + 'organ/tree', params);
