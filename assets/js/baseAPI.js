// 每次调用请求的时候，都会调用 ajaxPrefilter 这个函数
// 在这个函数中，可以获取 ajax 请求的配置对象
$.ajaxPrefilter(function(options) {
    // 在真正调用接口的时候，会统一拼接请求的根路径
    options.url = 'http://big-event-api-t.itheima.net' + options.url
    console.log(options.url)
}) 
    

    
    
