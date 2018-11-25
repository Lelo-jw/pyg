$(function () {
    // 商品列表页内容动态刷新
    /**
     * 参数： query  查询关键词 可选（用于左拉后的关键词搜索）
     *        cid  分类id
     *        pagenum  页数索引  默认为第一页
     *        pagesize  每页长度  默认为20行
     * 
     */

    /**
     * 获取url上参数的值
     * @param {String} name 要求查询的参数名
     */
    function getUrl(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }


    // 将发送请求所需要的参数存入对象中，方便修改
    const GoodsAjaxData = {
        query: '',
        cid: getUrl('cid'),
        pagenum: 1,
        pagesize: 10
    }
    // 总页数
    let totalPage = 1;

    // 获取列表数据
    const getGoodsList = (callback) => {
        $.get("goods/search", GoodsAjaxData,
            function (res) {
                if (res.meta.status === 200) {
                    // 渲染页面
                    // let html = template('goodsListTemp',{data:res.data.goods})
                    // $('.goods_list').html(html);
                    total = res.data.total;

                    totalPage = Math.ceil(total / GoodsAjaxData.pagesize);
                    // // 结束下拉刷新
                    // mui('.goods-container').pullRefresh().endPulldownToRefresh();
                    callback(res.data.goods)
                }

            }
        );
    }

    // 初始化
    const init = () => {
        // 上拉加载和下拉刷新
        mui.init({
            pullRefresh: {
                container: ".goods-container",
                down: {
                    auto: true,
                    //  触发下拉刷新时自动触发
                    // 重置页数

                    callback: function () {
                        GoodsAjaxData.pagenum = 1;
                        // console.log('下拉');
                        getGoodsList(function (goods) {
                            let html = template('goodsListTemp', {
                                data: goods
                            });
                            $('.goods_list').html(html);

                            // 结束下拉刷新组件
                            mui('.goods-container').pullRefresh().endPulldownToRefresh();

                            // 重置上拉组件
                            mui('.goods-container').pullRefresh().refresh(true);

                        });
                    }
                },
                up: {
                    //  触发上拉刷新时自动触发
                    callback: function () {
                        // 判断是否还有数据
                        if (GoodsAjaxData.pagenum >= totalPage) {
                            mui('.goods-container').pullRefresh().endPullupToRefresh(true);
                        } else {
                            // console.log('上拉');
                            GoodsAjaxData.pagenum++;
                            //         $.get("goods/search", GoodsAjaxData ,
                            //         function (res) {
                            //         if(res.meta.status === 200){
                            //             // 渲染页面
                            //             let html = template('goodsListTemp',{data:res.data.goods})
                            //             $('.goods_list').append(html);
                            //             // 结束上拉刷新
                            //             mui('.goods-container').pullRefresh().endPullupToRefresh(false);
                            //      }
                            getGoodsList(function (goods) {
                                let html = template('goodsListTemp', {
                                    data: goods
                                });
                                $('.goods_list').append(html);
                                // 结束上拉刷新
                                mui('.goods-container').pullRefresh().endPullupToRefresh(false)
                            })


                            //  );
                        }
                    }
                }
            }
        });
    }

    init();
})