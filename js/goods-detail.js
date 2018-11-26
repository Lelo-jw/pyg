$(() => {


    // 获取商品详情信息
    $.get("goods/detail", {goods_id:$.getUrl('goods_id')},
        function (res) {
            console.log(res);
            if(res.meta.status === 200){
                console.log(res.data); 
                let html = template('detailTemp',res.data);
                $('.goods-container').html(html); 

                // 初始化轮播图
                var gallery = mui('.mui-slider');
                gallery.slider({
                interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
                });
            }
        }
    );

    // 绑定a标签的点击跳转事件
    // MUI中a标签默认不能跳转
    const eventlist = () => {
        $('.detail-tab').on('tap','a',function(){
            let href = this.href;
            // console.log(href);
            location.href = href;
        })
    }

    // 初始化
    const init = () => {
        eventlist();
    }
    init();
})