$(()=>{

    // 事件
    const eventList = () => {
        // 点击登录发送请求
        $('.btn-login').on('tap',function(){
            // console.log(1);
            // 验证密码格式是否正确
            // 获取密码
            let password = $("[name='pwd']").val().trim();
            if(password.length != 6){
                mui.toast('密码格式不正确，请重试');
                return;
            }
            // 获取输入的手机号
            let username = $("[name='mobile']").val().trim();
            if(!$.checkPhone(username)){
                // 非法
                mui.toast('手机号不合法');
                return;
            }
            // 发送登录请求
            $.post("login", {
                username: username,
                password: password
            },function (res) {
                console.log(res);
                if(res.meta.status == 200){
                    mui.toast(res.meta.msg);
                    // 默认先跳回首页
                    location.href = '../index.html';
                }else{
                    mui.toast(res.meta.msg);
                }
            }
            );
        })
    }
    // 初始化
    const init = () => {
        eventList();
    }
    init();
})