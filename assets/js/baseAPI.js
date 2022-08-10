// 每次调用请求的时候，都会调用 ajaxPrefilter 这个函数
// 在这个函数中，可以获取 ajax 请求的配置对象
$.ajaxPrefilter(function(options) {
    // 在真正调用接口的时候，会统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // console.log(options.url)
    // 统一为有权限的接口设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 统一为有权限的接口定义 complete 回调函数
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && 
            res.responseJSON.message === '身份认证失败！') {
            // 强制清空 token
            localStorage.removeItem('token')
            // 强制跳转到登录页面
            location.href = './login.html'
        }
    }
}) 
    

    
