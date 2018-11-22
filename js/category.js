$(()=>{

    // 获取分类列表数据
    // 存储数据
    let cateData;
    const getCategories = () =>{
        $.ajax({
            type: "get",
            url: "http://api.pyg.ak48.xyz/api/public/v1/categories",
            dataType: "json",
            success: function (res) {
                console.log(res); 
                cateData = res;
                // 左侧导航
                let html = template('leftTemp',{data:res.data});
                $('.left-nav').html(html);
                console.log(res.data[0].children);
                
                // 右侧导航
                getRightList();
                let lis2 = $('.left-nav').children().children();
                // console.log(lis2)
                for(let i = 0;i<lis2.length;i++){
                    lis2.eq(i).on('touchstart',function(){
                        for(var j=0;j<lis2.length;j++){
                            lis2.eq(j).removeClass('active');
                        }
                        lis2.eq(i).addClass('active');
                        getRightList();
                    })
                }
                
                
                // console.log(Rhtml);
                
                
            }
        });
    }

    const getRightList = () => {
        let lis = $('.left-nav').children().children();
                // console.log(aaa);   
                for(let i=0;i<lis.length;i++){
                    if(lis.eq(i).hasClass('active')){
                        let Rhtml = template('rightTemp',{data:cateData.data[i].children});
                        // // console.log(Rhtml);
                        // lis.eq(i).html(Rhtml);
                        $('.right-list').html(Rhtml);
                        // console.log(lis.eq(i).parent().parent().parent());
                    }
                }
    }

    // 初始化
    const init = () => {
        getCategories();
    }
    init();
})