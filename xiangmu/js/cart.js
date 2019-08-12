/* 
* @Author: Marte
* @Date:   2019-08-09 13:58:53
* @Last Modified by:   Marte
* @Last Modified time: 2019-08-10 15:02:36
*/

$(document).ready(function(){

    var count = 0
    var targetData;
    getCartInfo();
    var num2=0
    function getCartInfo() {
        $.ajax({
            type: "get",
            url: "../server/getCartData.php",
            dataType: "json",
            success: function(data) {
                targetData = data;
                console.log(targetData);
 
                /* 根据数据来渲染页面 */
                var reshtml = data.map((ele,i)=>{
                    return`<ul class="content-list clearfix" data-idx=${ele.goodid}>
                                <li class="td-check"><input type="checkbox" class="check-btn" ${ele.isActive==1 ? "checked" : ""}></li>
                                <li class="td-item">
                                    <div class="item-img"><img src=${ele.src}></div>
                                    <div class="item-name">${ele.name}</div>
                                </li> 
                               <li class="td-price">￥${(ele.price*1).toFixed(1)}</li>
                               <li class="td-count"><button class="dec-btn">-</button><input type="text" value=${ele.num} class="item-count"><button class="inc-btn">+</button></li>
                               <li class="td-weight"></li>
                               <li class="td-has">有货</li>
                               <li class="td-total">${(ele.price*ele.num).toFixed(2)}</li>
                               <li class="td-holder"><a href="###" class="del">删除</a></li>
                           </ul>`
                }).join('');
                $(".content").html(reshtml);

                computedTotalPrice();
            }
        });
    }

    function computedTotalPrice() {
            var res = 0;
            targetData.forEach(element => {
                if (element.isActive == 1) {
                    res += element.total * 1;
                }
            });
            console.log(res);
            $(".total-price").html(`￥${res}`);

    }

    $("#selectAll").click(function() {
        
        $(".check-btn").prop("checked", $(this).is(":checked"))
        
    })

    /* 给删除添加点击事件 */
    $(".content").on("click", ".del", function() {
        var goodid = $(this).parents('.content-list').data("idx")
        $.ajax({
            type: "get",
            url: "../server/removeCart.php",
            data: `goodid=${goodid}`,
            success: function(response) {}
        });

        getCartInfo()
        $(this).parents(".content-list").remove();
        
    })

    
    $(".content").on("click", ".dec-btn", function() {
        count = ($(this).siblings("input")[0].value)*1
        $(this).siblings("input")[0].value = count-1;

        if($(this).siblings("input")[0].value<=0){
            $(this).siblings("input")[0].value=0;
        }
        var num = $(this).siblings("input")[0].value;
        var goodid = $(this).parents('.content-list').data("idx")

        var total =Number( $(this).parent().siblings(".td-total").html());
        
            $.ajax({
                type: "get",
                url: "../server/update-dec.php",
                data: `goodid=${goodid}&num=${num}&total=${total}`,
                success: function(response) {}
            });
        getCartInfo()
        
    })



    $(".content").on("click", ".inc-btn", function() {
        count = ($(this).siblings("input")[0].value)*1
        $(this).siblings("input")[0].value = count+1;
        
        var num = $(this).siblings("input")[0].value;
        var goodid = $(this).parents('.content-list').data("idx")
        var total =Number( $(this).parent().siblings(".td-total").html());
        console.log($(this).parent().siblings(".td-total").html())
        console.log(total)
            $.ajax({
                type: "get",
                url: "../server/update-dec.php",
                data: `goodid=${goodid}&num=${num}&total=${total}`,
                success: function(response) {
                }
            });  
        
        getCartInfo()
    })

});