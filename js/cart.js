$(() => {

    // 获取订单列表数据
    const getCartList = () => {
        // 获取token
        let token = JSON.parse(sessionStorage.getItem('userInfo')).token;

        $.ajax({
            type: "get",
            url: "my/cart/all",
            dataType: "json",
            headers: {
                Authorization: token
            },
            success: function (res) {
                console.log(res);
                // console.log(JSON.parse(res.data.cart_info));
                // 订单商品列表
                
                if(res.meta.status === 200){
                    // 成功
                    // 或许渲染的数据
                    let cart_info = JSON.parse(res.data.cart_info);
                    
                    let html = template('mainTpl',{obj: cart_info});
                    $('.order_warp').html(html);

                    getAllPrice();
                }else{
                    // 失败
                }        
            }
        });
    }

    // 生成商品总价
    const getAllPrice = () => {
        // 获取所有的商品对应的li
        let lis = $('.order_warp li');
        // console.log(lis);
        // 总价格
        let allPrice = 0;
        for(let i=0;i<lis.length;i++){
            let lisObj = JSON.parse(lis[i].dataset.obj);
            console.log(lisObj);
            
            lisPrice = lisObj.goods_price * lisObj.amount;
            allPrice += lisPrice;
        }
        // console.log(allPrice);
        $('.total_price').text(allPrice);
        
        
    }


    // 初始化
    const init = () => {
        getCartList();
    }
    init();
})