(function(){
    var layer = layui.layer

  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

    // 给上传按钮添加点击事件
    $('#btnChooseImage').on('click',function(){
        
        $('#file').click()
    })


    // 为文件选择框绑定 change 事件
    $('#file').on('change',function(e) {
      // 通过 e.target.files 获取文件的列表
      let filesList = e.target.files

      // console.log(filesList)
      if (filesList.length === 0) {
        return layer.msg('请选择照片')
      }

      // 获取用户选择的照片
      let file = e.target.files[0]

      // 创建图片地址
      let imgURL = URL.createObjectURL(file)

      // 重新初始化裁剪区域
      $('#image')
      .cropper('destroy') // 销毁旧的裁剪区域 
      .attr('src', imgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
    })

    // 给确定按钮绑定点击事件
    $('#btnUpload').on('click',function(){
      // 获取用户裁剪区域的照片
      var dataURL = 
        $image.cropper(
        'getCroppedCanvas', {
        width: 100, 
        height: 100,
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符 串
    
      // 调用接口，更新用户的头像
      $.ajax({
        type:'post',
        url:'/my/update/avatar',
        data:{
          avatar: dataURL
        },
        success:function(res) {
          if (res.status !== 0) {
            return layer.msg('更新头像失败！')
          }

          layer.msg('更新头像成功！')
          // 调用父级页面中的函数
          window.parent.getUserInfo()

        }

      })


    })
})();


