import request from '../utils/request.js' 
export function onestudent(data){ // 
    return request({
        url: '/student/get'+data,
        method: 'GET',
        contentType:'application/json'     
     })
}