$(() => {
    // 获取轮播图数据
    const getSwiperdata = () => {
        // $.ajax({
        //     type: "get",
        //     url: "swiperdata",
        //     dataType: "json",
        //     success: function (res) {
        //         // console.log(res);
        //         if(res.meta.status === 200){
        //             // 成功
        //             let html = template('loopTemp',{data:res.data});
        //             $('.img-loop').html(html);

        //             //获得slider插件对象
        //             var gallery = mui('.mui-slider');
        //             gallery.slider({
        //             interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
        //             });
        //         }else{
        //             // 失败
        //         }
        //     }
        // });
        $.get("home/swiperdata", function (res) {
            if (res.meta.status === 200) {
                // 成功
                let html = template('loopTemp', {
                    data: res.data
                });
                $('.img-loop').html(html);

                //获得slider插件对象
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
                });
            } else {
                // 失败
            }
        });
    }
    // 获取分类菜单数据
    const getCatitems = () => {
        // $.ajax({
        //     type: "get",
        //     url: "catitems",
        //     dataType: "json",
        //     success: function (res) {
        //         // console.log(res);
        //         let html = '';
        //         for(let i=0;i<res.data.length;i++){
        //             html += '<a href="javascript:;"><img src="'+res.data[i].image_src+'" alt=""></a>'
        //         }
        //         $('.pyg-cates').html(html);
        //     }
        // });
        $.get("home/catitems", function (res) {
            let html = '';
            for (let i = 0; i < res.data.length; i++) {
                html += '<a href="javascript:;"><img src="' + res.data[i].image_src + '" alt=""></a>'
            }
            $('.pyg-cates').html(html);
        });
    }
    // 获取商品列表数据
    const getGoodslist = () => {
        // $.ajax({
        //     type: "get",
        //     url: "goodslist",
        //     dataType: "json",
        //     success: function (res) {
        //         console.log(res.data);
        //         let html = template('proTemp',{data:res.data});
        //         $('.pro-list').html(html);
        //     }
        // });
        $.get("home/goodslist", function (res) {
            console.log(res.data);
            let html = template('proTemp', {
                data: res.data
            });
            $('.pro-list').html(html);
        });
    }

    // 初始化
    const init = () => {
        getSwiperdata();

        getCatitems();

        getGoodslist();
    }
    init();
})