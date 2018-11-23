$(()=>{

    // ajax拦截器
    $.ajaxSettings.beforeSend = (xhr,ajaxObj) =>{
        // xhr原生ajax
        // jq中的ajax
        // 修改路径
        ajaxObj.url = "http://api.pyg.ak48.xyz/api/public/v1/" + ajaxObj.url;
    }
})