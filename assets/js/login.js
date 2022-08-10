(function(){
    // 点击去注册，隐藏登录区域盒子，显示注册区域
    $('#logo').on('click',function(){
        $('.logo-box').hide()
        $('.reg-box').show()

    })

    // 点击去登录，隐藏登录区域，显示注册区域
    $('#reg').on('click',function(){
        $('.logo-box').show()
        $('.reg-box').hide()

    })

    // 点击登录按钮，判断用户名和密码是否为空
    $('#logoin').on('click',function(){
        if ($('#logoin-user').val() === '' || $('#logoin-pswd').val() === '') {
            alert('必填项不能为空!')
            // localStorage 
            
          }
     
    })

    // 创建 layer 对象
    let layer = layui.layer
    // 定义提交的数据
    let data = {
        username:$('#reg-user').val(),
        password:$('#reg-pswd').val()
    }
    // 监听注册表单的提交事件
    $('#form-reg').on('submit',function(e) {
        // 阻止默认行为
        e.preventDefault()
        // 发起 post 请求
        $.post(
            '/api/reguser',
            {username:$('#reg-user').val(),password:$('#reg-pswd').val()},
            function(res) {
                if (res.status !== 0) {
                    // return console.log(res.message)
                    return layer.msg(res.message)
                }
                // console.log('注册成功!')
                layer.msg('注册成功,请登录!')
                // 模拟鼠标点击
                $('#reg').click()

            }
        )
    })

      // 监听登录表单的提交事件
      $('#form-logoin').on('submit',function(e) {
            e.preventDefault()
            $.post(
                '/api/login',
                {username:$('#logoin-user').val(),password:$('#logoin-pswd').val()},
                function(res){
                    if (res.status !== 0) {
                        // return console.log(res.message)
                        return layer.msg(res.message)
                    }
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                    localStorage.setItem('token', res.token)
                    layer.msg('登录成功!')
                    // 模拟鼠标点击
                    location.href = './index.html'
    
                }
            )
      })
    
})();