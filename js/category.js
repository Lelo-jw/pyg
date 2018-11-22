$(()=>{

    // 获取分类列表数据
    const getCategories = () =>{
        $.ajax({
            type: "get",
            url: "http://api.pyg.ak48.xyz/api/public/v1/categories",
            dataType: "json",
            success: function (res) {
                console.log(res); 
                let html = template('categoryTemp',{data:res.data});
                $('.left-nav').html(html);
            }
        });
    }

    // 初始化
    const init = () => {
        getCategories();
    }
    init();
})