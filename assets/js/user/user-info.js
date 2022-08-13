(function(){
    var form = layui.form
    var layer = layui.layer
  
    form.verify({
      nickname: function(value) {
        if (value.length > 6) {
          return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
      }
    })

    initUserInfo()

    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method:'get',
            url:'/my/userinfo',
            success:function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
            // console.log(res)
            // 快速获取表单内容
            form.val('formUserInfo',res.data)
            }
        })
    }

    // 实现表单的重置效果
    $('#btnReset').on('click',function(e) {
        // 阻止重置按钮的默认行为
        e.preventDefault()
        initUserInfo()

    })

    // 实现更新表单的数据
    $('.layui-form').on('submit',function(e) {
        // 阻止默认行为
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res) {
                if (res.status !== 0) {
                    return layer.meg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 调用父级页面中，渲染用户名和头像的方法
                window.parent.getUserInfo()
            }
        })

    })
})();
