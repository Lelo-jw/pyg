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
                
                if(res.meta.status === 200){
                    // 成功
                    // 或许渲染的数据
                    let cart_info = JSON.parse(res.data.cart_info);
                    
                    let html = template('mainTpl',{obj: cart_info});
                    $('.order_warp').html(html);
                }else{
                    // 失败
                }        
            }
        });
    }


    // 初始化
    const init = () => {
        getCartList();
    }
    init();
})