(function(){
    // 获取用户基本信息
    getUserInfo()

    let layer = layui.layer

  // 点击按钮，实现退出功能
  $('#btnLogout').on('click', function() {
    // 提示用户是否确认退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
      //do something
      // 1. 清空本地存储中的 token
      localStorage.removeItem('token')
      // 2. 重新跳转到登录页面
      location.href = './login.html'

      // 关闭 confirm 询问框
      layer.close(index)
    })
  })

})();


function getUserInfo() {
    // 调用 ajax 请求
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // 请求头配置对象
        // headers:{
        //     // Authorization:localStorage.getItem('token') || ''
        //     Authorization: localStorage.getItem('token') || '',
        // },
        success:function(res) {
            if(res.status !== 0) {
                return console.log(res)
            }
            // 调用渲染用户头像的函数
            renderAvatar(res.data)

        },
        // 无论成功与否，最终都会调用 complete 函数
        // complete:function(res) {
        //     console.log('ok')
        //     // res.responseJSON 可以拿到响应的数据
        //     if (res.responseJSON.status === 1 && 
        //         res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空 token
        //         localStorage.removeItem('token')
        //         // 强制跳转到登录页面
        //         location.href = './login.html'
        //     }
           

        // }


    })
}

function renderAvatar(user){
    // 获取用户的名字
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 渲染用户的头像
    // 判断用户是否有头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 没有头像，取用户名的第一个字符，并且转换成大写
        let first = name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-avatar').html(first).show()
    }



}
