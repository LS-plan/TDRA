import { getToken } from '../utils/auth.js'//获取token
function request(obj) {
    return new Promise((resolve, reject) => {
        const baseUrl = "http://121.5.75.127:2530"
        var method = obj.method || "POST";
        var url = baseUrl + obj.url || "";
        var data = obj.data || {};
        let token = getToken();
        var header = obj.header || {
            'Content-Type': obj.contentType || 'application/json',
            'token': token
        }
        uni.request({
            url: url,
            data: data,
            method: method,
            header: header,
            success: ((res) => {
                if (res.statusCode === 403 || res.statusCode === 401) {
                    uni.reLaunch({// 错误处理，返回登录页
                        url: '/pages/Login/Login'
                    })
                } else if (res.statusCode === 200) {
                    // console.log('request', res)
                    resolve(res)
                }
            }),
            fail: ((err) => {
                uni.showToast({
                    title: '请求接口失败',
                    duration: 2000
                })
                reject(err)
            })
        })
    })
}
export default request