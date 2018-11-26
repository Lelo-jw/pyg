$(()=>{
    
    // 用户注册
    const eventList = () => {
        // 点击获取验证码
        $('.btn-code').on('tap',function(){
            // 验证手机号输入
            // 获取输入的手机号
            let phoneNum = $("[name='mobile']").val().trim();
            // console.log(phoneNum);
            if(!$.checkPhone(phoneNum)){
                // 非法
                mui.toast('手机号不合法');
            }else{
                // 合法
                // 发送验证码
                $.post("users/get_reg_code", {mobile:phoneNum},function (res) {
                        console.log(res);
                        if(res.meta.status === 200){
                            // 请求成功
                            // 禁用按钮
                            $('.btn-code').attr('disabled','disabled');
                            // 设置定时器,先设置5s用于调试
                            let time = 5;
                            let timeId = setInterval(()=>{
                                time--;
                                // 修改按钮内的显示文字
                                $('.btn-code').text(time+'秒后重新获取');
                                if(time == 0){
                                    clearInterval(timeId);
                                    $('.btn-code').text('获取验证码');
                                    $('.btn-code').removeAttr('disabled');
                                }
                            },1000)
                        }else{
                            // 失败
                        }
                    }
                );
            }
        })
        // 点击注册按钮验证用户输入
        $('.btn-register').on('tap',function(){
            // 获取用户输入的值
            let mobile_txt = $("[name='mobile']").val().trim();
            let code_txt = $("[name='code']").val().trim();
            let email_txt = $("[name='email']").val().trim();
            let pwd_txt = $("[name='pwd']").val().trim();
            let pwd2_txt = $("[name='pwd2']").val().trim();
            let gender_txt = $("[name='gender']").val().trim();

            // debugger;
            // 验证手机号
            if(!$.checkPhone(mobile_txt)){
                mui.toast('手机号不合法');
                return;
            }
            // 验证验证码(具体数值是否正确由后台验证)
            if(code_txt.length != 4){
                mui.toast('验证码错误');
                return;
            }
            // 验证邮箱
            if(!$.checkEmail(email_txt)){
                mui.toast('请输入正确的邮箱');
                return;
            }
            // 验证密码（自定义）是否为6位数
            if(pwd_txt.length != 6){
                mui.toast('请输入正确格式的密码');
                return;
            }
            // 验证第二次的密码是否一致
            if(pwd2_txt !== pwd_txt){
                mui.toast('两次密码不一致，请重新输入');
                return;
            }
            // 性别不需要验证
            
            // 将所有信息存入对象中
            let regObj = {
                mobile: mobile_txt,
                code: code_txt,
                email: email_txt,
                pwd: pwd_txt,
                gender: gender_txt
            }
            console.log(regObj);
            // 全部正确，发送请求
            $.post("users/reg",regObj,function (res) {
                    console.log(res);
                    if(res.meta.status == 200){
                        // 成功注册
                        mui.toast('注册成功');
                    }else{
                        // 失败
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