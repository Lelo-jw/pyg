$(() => {

    // 商品详情信息
    let goodsObj;
    const getDetail = () => {
        // 获取商品详情信息
        $.get("goods/detail", {
                goods_id: $.getUrl('goods_id')
            },
            function (res) {
                // console.log(res);
                if (res.meta.status === 200) {
                    // console.log(res.data); 
                    goodsObj = res.data;
                    let html = template('detailTemp', goodsObj);
                    $('.goods-container').html(html);

                    // 初始化轮播图
                    var gallery = mui('.mui-slider');
                    gallery.slider({
                        interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
                    });
                }
            }
        );
    }

    // 事件
    const eventlist = () => {
        // 点击加入购物车
        $('#btn-buycar').on('tap', function () {
            // 判断是否有登录（token）
            let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            // console.log(userInfo);
            if (!userInfo) {
                // 没有登录
                mui.toast('请先登录后再进行操作');
                // 存储当前路径,方便登录成功后跳回来
                // console.log(location.href);
                sessionStorage.setItem('prevPage', location.href);
                let time = 2;
                setInterval(() => {
                    time--;
                    if (time == 0) {
                        location.href = '../pages/login.html';
                    }
                }, 1000)
            } else {
                // 已登录
                // 发送加入购物车请求
                // 需要发送的参数（JSON格式字符串）
                let goods_info = {
                    cat_id: goodsObj.cat_id,
                    goods_id: goodsObj.goods_id,
                    goods_name: goodsObj.goods_name,
                    goods_number: goodsObj.goods_number,
                    goods_price: goodsObj.goods_price,
                    goods_small_logo: goodsObj.goods_small_logo,
                    goods_weight: goodsObj.goods_weight
                }
                // 获取token
                let token = userInfo.token;
                console.log(token);
                console.log(goods_info);
                $.ajax({
                    type: "post",
                    url: "my/cart/add",
                    data: {
                        info: JSON.stringify(goods_info)
                    },
                    headers: {
                        Authorization: token
                    },
                    success: function (res) {
                        console.log(res);
                        if (res.meta.status == 200) {
                            // 成功
                            // mui.toast("成功");
                            mui.toast(res.meta.msg);
                            mui.confirm("是否要跳转到购物车","提示",["是","否"],() => {
                                location.href = "/pages/cart.html";
                            })
                        } else {
                            // 失败
                            mui.toast(res.meta.msg);
                        }
                    },

                });
            }
        })
    }


    // 初始化
    const init = () => {
        eventlist();
        getDetail();
    }
    init();
})