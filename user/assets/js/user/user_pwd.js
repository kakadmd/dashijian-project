const form = layui.form;

form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    samePwd: (val) => {
        if (val === $("[name=oldPwd]").val()) return "你俩不管一样";
    },
    rePwd: (val) => {
        if (val !== $("[name=newPwd]").val()) return "你俩不一样";
    },
});
//
$('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: "/my/updatepwd",
        data: form.val("formPassword"),
        success: (res) => {
            if (res.status !== 0) return layer.msg("更新密码失败！");
            layer.msg("更新密码成功！");
            // 重置表单
            // 给按钮绑定模拟点击也可以
            $(".layui-form")[0].reset();
        },
    })
})