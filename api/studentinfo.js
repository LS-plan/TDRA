// 引入工具类
import request from '../utils/request.js' 
 
export function getstudent(data){ // 
    return request({
        url: '/student/total',
        method: 'GET',
        contentType:'application/json',
        data: data
     })
}

