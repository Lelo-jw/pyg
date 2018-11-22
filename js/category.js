$(()=>{

    // 获取分类列表数据
    const getCategories = () =>{
        $.ajax({
            type: "get",
            url: "http://api.pyg.ak48.xyz/api/public/v1/categories",
            dataType: "json",
            success: function (res) {
                console.log(res); 
                // 左侧导航
                let html = template('leftTemp',{data:res.data});
                $('.left-nav').html(html);
                console.log(res.data[0].children);
                // getRightList();
                // 右侧导航
                
                // console.log(Rhtml);
                
                let lis = $('.left-nav').children().children();
                // console.log(aaa);   
                for(let i=0;i<lis.length;i++){
                    if(lis.eq(i).hasClass('active')){
                        let Rhtml = template('rightTemp',{data:res.data[i].children});
                        // // console.log(Rhtml);
                        // lis.eq(i).html(Rhtml);
                        $('.right-list').html(Rhtml);
                        // console.log(lis.eq(i).parent().parent().parent());
                    }
                }
            }
        });
    }

    // const getRightList = () => {
    //     // 右侧导航
    //     let aaa = $('.left-nav').children().children();
    //     console.log(aaa);
    // }

    // 初始化
    const init = () => {
        getCategories();
    }
    init();
})