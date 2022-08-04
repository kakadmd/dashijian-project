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
$('#uploadBtn').on('click', function () {
    console.log(2);
    $('#file').click()
})

const layer = layui.layer;
$('#file').change(function (e) {
    let files = e.target.files
    if (files.length === 0) return layer.msg('未检测到图片')
    // 1. 拿到用户选择的文件
    let file = files[0];
    // 2. 将文件，转化为路径
    var imgURL = URL.createObjectURL(file);
    // 3. 重新初始化裁剪区域
    $image
        .cropper("destroy") // 销毁旧的裁剪区域
        .attr("src", imgURL) // 重新设置图片路径
        .cropper(options); // 重新初始化裁剪区域
})
//
$('#sendBtn').on('click', function (e) {
    // 1、拿到用户裁切之后的头像
    // 直接复制代码即可
    const dataURL = $image.cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
    })
        .toDataURL("image/png");
    // 2、发送 ajax 请求，发送到服务器
    $.ajax({

        type: 'POST',
        url: "/my/update/avatar",
        data: {
            avatar: dataURL,
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg("更换头像失败！");
            }
            layer.msg("更换头像成功！");
            window.parent.getUserInfo();
        },
    })
})