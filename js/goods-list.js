$(function(){
    // 商品列表页内容动态刷新
    /**
     * 参数： query  查询关键词 可选（用于左拉后的关键词搜索）
     *        cid  分类id
     *        pagenum  页数索引  默认为第一页
     *        pagesize  每页长度  默认为20行
     * 
     */

    // 获取cid
    let cid = +window.location.search.split('=')[1];
    // console.log(cid);
     $.get("goods/search", {
        query:'',
        cid:cid,
        pagenum:1,
        pagesize:10
     },
         function (res) {
             // 渲染页面
            //  console.log(res.data.goods);
             let html = template('goodsListTemp',{data:res.data.goods});
            //  console.log(html);
             $('.goods_list').html(html);
         }
     );
})