$(() => {

    // 获取分类列表数据
    // 存储数据
    let cateData;
    // 左侧导航滚动条
    let leftScroll;
    // const getCategories = () =>{
    //     $.ajax({
    //         type: "get",
    //         url: "http://api.pyg.ak48.xyz/api/public/v1/categories",
    //         dataType: "json",
    //         success: function (res) {
    //             console.log(res); 
    //             cateData = res;
    //             // 左侧导航
    //             let html = template('leftTemp',{data:res.data});
    //             $('.left-nav').html(html);
    //             console.log(res.data[0].children);

    //             // 初始化iscroll插件（左侧导航条）
    //             var leftScroll = new IScroll('.left-nav'); 



    //             // 右侧导航
    //             getRightList();
    //             let lis2 = $('.left-nav').children().children();
    //             // console.log(lis2)
    //             for(let i = 0;i<lis2.length;i++){
    //                 lis2.eq(i).on('touchstart',function(){
    //                     for(var j=0;j<lis2.length;j++){
    //                         lis2.eq(j).removeClass('active');
    //                     }
    //                     lis2.eq(i).addClass('active');
    //                     // 左侧导航点击置顶
    //                     leftScroll.scrollToElement(lis2[i])
    //                     getRightList();
    //                 })
    //             }




    //             // console.log(Rhtml);


    //         }
    //     });
    // }

    // const getRightList = () => {
    //     let lis = $('.left-nav').children().children();
    //             // console.log(aaa);   
    //             for(let i=0;i<lis.length;i++){
    //                 if(lis.eq(i).hasClass('active')){
    //                     let Rhtml = template('rightTemp',{data:cateData.data[i].children});
    //                     // // console.log(Rhtml);
    //                     // lis.eq(i).html(Rhtml);
    //                     $('.right-list').html(Rhtml);
    //                     // console.log(lis.eq(i).parent().parent().parent());

    //                     // 获取右侧加载图片的长度
    //                     let imgLength = $('.right-list img').length;
    //                     $('.right-list img').on('load',function(){
    //                         imgLength--;
    //                         // 当最后一张图片加载完毕后，初始化iscroll插件（右侧商品列表）
    //                         if(imgLength === 0){
    //                             // console.log(imgLength);
    //                             var rightScroll = new IScroll('.right-list'); 
    //                         }

    //                     })

    //                 }
    //             }
    // }
    // 绑定事件
    const eventList = () => {
        // 使用委托给li绑定点击事件（无法使用箭头函数）
        $('.left-nav').on('tap', 'li', function () {
            // 给当前点击的li添加active，其他li移除active
            $(this).addClass('active').siblings().removeClass('active');
            // 获取所点击的li对应的index
            let index = $(this).index();
            // 点击使滚动置顶
            leftScroll.scrollToElement(this);
            // 渲染右侧内容块
            renderRight(index);
        })
    }

    // 判断数据来源
    const renderCategories = () => {
        // 如果本地存储中有数据，渲染本地存储中的数据
        if(localStorage.getItem('cates')){
            // 取出数据
            let localdata = localStorage.getItem('cates');
            // 转换数据
            let localCates = JSON.parse(localdata);
            // 判断是否过期
            if(Date.now()-localCates.time > 36000){
                // 过期了
                getCategories();
            }else{
                // 没过期
                cateData = localCates.data;
                // 渲染页面
                renderLeft();
                getCategories(0);
            }
        }else{
            // 本地存储中没有数据
            getCategories();
        }
    }

    // 渲染左侧导航条
    const renderLeft = () => {
        let html = template('leftTemp', {
            data: cateData
        });
        $('.left-nav').html(html);
        // 初始化滚动条
        leftScroll = new IScroll('.left-nav');
    }

    // 渲染右侧内容块
    const renderRight = (index) => {
        let data = cateData[index].children;
        let Rhtml = template('rightTemp', {
            data: data
        });
        $('.right-list').html(Rhtml);

        // 初始化右侧滚动条
        // 当最后一张图片加载完毕后再初始化
        let imgLength = $('.right-list img').length;
        $('.right-list img').on('load', function () {
            imgLength--;
            if (imgLength === 0) {
                var rightScroll = new IScroll('.right-list');
            }

        })

    }

    const getCategories = () => {
        $.get("categories", function (res) {
            if (res.meta.status === 200) {
                // 将数据存储在全局变量中
                cateData = res.data;
                // 加入时间戳
                let catesObj = {
                    data: cateData,
                    time: Date.now()
                }
                // 转换为json格式的字符串
                let jsonCateData = JSON.stringify(catesObj);
                // console.log(jsonCateData)
                // 将数据存储在本地存储中
                localStorage.setItem('cates', jsonCateData);

                // 渲染页面
                renderLeft();
                renderRight(0);
            }
        })
    }

    // 初始化
    const init = () => {
        renderCategories()
        eventList();
    }
    init();
})