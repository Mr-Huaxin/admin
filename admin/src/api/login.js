import { get, post } from './axios.config.js'
const api = '/li-api'

export const loginIn = params => post(api + '/system/login', params);
