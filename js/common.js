$(()=>{

    // 公共的URL
    baseURL = "http://api.pyg.ak48.xyz/";
    // 添加入模板引擎中
    if(template){
        template.defaults.imports.baseURL = baseURL;
    }
    

    // ajax拦截器
    // 发送之前
    $.ajaxSettings.beforeSend = (xhr,ajaxObj) =>{
        // xhr原生ajax
        // jq中的ajax
        // console.log(ajaxObj.url);
        ajaxObj.url = "http://api.pyg.ak48.xyz/api/public/v1/" + ajaxObj.url;
        // console.log(ajaxObj.url);
        // 正在等待....
        $("body").addClass("loadding");
    }
    // 发送之后
    $.ajaxSettings.complete = function(){
        $("body").removeClass("loadding");
    }

    setFont();

    function setFont() {
        // 要计算的fontsize的大小=  基础值 *  要适配的屏幕的宽度/   设计稿的宽度 （640）

        // 基础值 100px
        var baseVal = 100;
        // 设计稿的宽度 320
        var pageWidth = 375;
        // 要适配的屏幕的宽度= 当前的屏幕的宽度
        var screenWidth = document.querySelector("html").offsetWidth;
        // 要设置的字体的大小
        var fz = baseVal * screenWidth / pageWidth;
        // 把字体的大小设置到 htm标签中
        document.querySelector("html").style.fontSize = fz + "px";
    }

    // 拓展zepto
    $.extend($,{
        // 验证手机号码
        checkPhone: (phone) => {
            if (!(/^1[34578]\d{9}$/.test(phone))) {
                return false;
            } else {
                return true;
            }
        },
        // 邮箱验证
        checkEmail: (myemail) => {
            var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
            if (myReg.test(myemail)) {　　　　
                return true;　　
            } else {　　　　
                return false;
            }
        },
        /**
         * 获取url上参数的值
         * @param {String} name 要求查询的参数名
         */
        getUrl: (name) => {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        }
    })


})