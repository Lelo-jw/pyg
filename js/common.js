$(()=>{

    // ajax拦截器
    $.ajaxSettings.beforeSend = (xhr,ajaxObj) =>{
        // xhr原生ajax
        // jq中的ajax
        console.log(ajaxObj.url);
        ajaxObj.url = "http://api.pyg.ak48.xyz/api/public/v1/" + ajaxObj.url;
        console.log(ajaxObj.url);
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
})