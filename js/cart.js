$(() => {

    // 生成商品总价
    const getAllPrice = () => {
        // 获取所有的商品对应的li
        let lis = $('.order_wrap li');
        // console.log(lis);
        // 总价格
        let allPrice = 0;
        for(let i=0;i<lis.length;i++){
            let lisObj = JSON.parse(lis[i].dataset.obj);
            // console.log(lisObj);
            // 单个商品的个数
            let lisAmount = lis.eq(i).find('.amount_new').val();
            lisPrice = lisObj.goods_price * lisAmount;
            allPrice += lisPrice;
        }
        // console.log(allPrice);
        $('.total_price').text(allPrice);
        
        
    }


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
                // console.log(res);
                // console.log(JSON.parse(res.data.cart_info));
                // 订单商品列表
                
                if(res.meta.status === 200){
                    // 成功
                    // 或许渲染的数据
                    let cart_info = JSON.parse(res.data.cart_info);
                    
                    let html = template('mainTpl',{obj: cart_info});
                    $('.order_wrap').html(html);

                    // 初始化数字输入框
                    mui(".mui-numbox").numbox();

                    getAllPrice();

                    
                }else{
                    // 失败
                }        
            }
        });
    }

    // 同步购物车
    const resetCart = (lis) => {
        // 获取商品数据集合
        let infos = {};
        // 获取需要同步的li标签
        for(let i = 0;i<lis.length;i++){
            let lisObj = lis.eq(i).data("obj");
            // 修改数量
            lisObj.amount = lis.eq(i).find('.amount_new').val();
            infos[lisObj.goods_id] = lisObj; 
        }
        // 发送同步请求
        let token = JSON.parse(sessionStorage.getItem('userInfo')).token;
        $.ajax({
            type: "post",
            url: "my/cart/sync",
            data: {
                infos: JSON.stringify(infos)
            },
            dataType: "json",
            headers: {
                Authorization: token
            },
            success: function (res) {
                if(res.meta.status === 200){
                    // 成功
                    mui.toast(res.meta.msg);
                    // 刷新数据
                    getCartList();
                }else{
                    // 失败
                    mui.toast(res.meta.msg);
                }
            }
        });
    }

    // 事件
    const eventList = () => {
        //  点击加减号事件
        $(".order_wrap").on("tap", ".mui-numbox button", function () {
        // 重新计算总价格
        // console.log(11); 
        getAllPrice();

        })

        // 点击编辑按钮
        $('.edit_btn').on('tap',()=>{
            // 检测是否有订单内容
            let lisL = $('.order_wrap li').length;
            if(lisL > 0){
                // 有内容
                // console.log("you");
            }else{
                // 空
                mui.toast('您的购物车还是空的哦，快去填满吧');
                return;
            }
            // 切换
            $('body').toggleClass('edit_status');
            // 判断是否有class = edit_status 如果有 完成 没有 编辑
            if($('body').hasClass('edit_status')){
                $('.edit_btn').text('完成'); 
                
            }else{
                $('.edit_btn').text('编辑'); 
                let lis = $('.order_wrap li');
                // 同步购物车  
                resetCart(lis); 
            }
        })

        // 点击删除按钮
        $('.delete_btn').on('tap',() => {
            // 获取勾选中的li
            let ckl = $('.inp_chk:checked').parents('li');
            // console.log(ckl);
            // 判断是否有勾选
            if(ckl.length == 0){
                // 未勾选
                mui.toast('请勾选需要删除的商品');
            }else if(ckl.length > 0){
                // 弹出警告框，提示用户是否要删除
                mui.confirm("是否要删除商品","警告",["删除","取消"],(e)=>{
                    // console.log(e);
                    if(e.index == 0){
                        // 删除
                        // 获取未被选中的li
                        let unlis = $('.inp_chk').not(":checked").parents('li');
                        // console.log(unlis);
                        // 同步购物车
                        resetCart(unlis);
                    }else if(e.index == 1){
                        // 取消
                        mui.toast('嘻嘻，逃过一命');
                    }
                })

            }
        })
    }


    // 初始化
    const init = () => {
        $.isLogin();
        getCartList();
        eventList();
    }
    init();
})