import request from '../utils/request.js' 
export function Tem_hum(){ // 
    return request({
        url: '/getresult/total',
        method: 'GET',
        contentType:'application/json'     
     })
}