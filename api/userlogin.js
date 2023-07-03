// 引入工具类usrlogin.js
import request from '../utils/request.js' 
 
export function login(data){ // 
    return request({
        url: '/userinfo/login',
        method: 'POST',
        contentType:'application/json',
        data: data
     })
}