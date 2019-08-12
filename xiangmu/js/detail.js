/* 
* @Author: Marte
* @Date:   2019-08-10 17:07:29
* @Last Modified by:   Marte
* @Last Modified time: 2019-08-12 03:53:51
*/

$(document).ready(function(){

    var targetData;
    var goodid;
    var index=0;
    var magnifierConfig = {
        magnifier: "#magnifier1", //最外层的大容器
        width: 300, //承载容器宽
        height: 300, //承载容器高
        moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
        zoom: 3 //缩放比例
    };
    var _magnifier = magnifier(magnifierConfig);

    console.log($('.small-img'))
    $(".small-img").on("mouseenter",function(){
        $(".images-cover").html($(this).html())

    })

    $.ajax({
            type: "get",
            url: "../server/getDetailData.php",
            dataType: "json",
            success: function(data) {
                console.log(data)
                targetData = data[data.length-1];
                goodid=targetData.goodid
                console.log(targetData.goodid);
                $(".dt-data").text(targetData.name)
                let html = `<h1 class= "item-title"><span>${targetData.isSelf}</span>${targetData.name}</h1>
                <div class="item-price"><span>药房价:</span><i>￥</i>${(Number(targetData.price)).toFixed(2)}</div>
                <div class="item-count clearfix">
                    <span class="fl">数量:</span>
                    <div class="count-box fl">
                        <input type= "text" value=1 id="count"> 
                        <div class="btn-box"><button class="inc-btn">^</button><button class="dec-btn">^</button></div>
                    </div>
                </div>
                <div class="submit-btn clearfix"><button class="addCart"><a href="###">提供需求</a></button><button class="toCart"><i class="circle"></i><a href="../html/cart.html">需求清单</a></button></div>
                <p class="bbt">本药品为中西药品,需要线下凭处方购买,由民益大药房旗舰店提供销售和发货</p>`

                $(".dc").html(html);
                var targetImg=`<img src=${targetData.src}>`
                $(".images-cover").html(targetImg)
                $(".first-img").html(targetImg)
            }
    })
    
    $(".dc").on("click",".addCart",function(){
        // var idx = $(this).parents("li").index();
        goodid = targetData.goodid;
        var price = targetData.price;
        console.log(goodid);

        $.ajax({
            type: "get",
            url: "../server/addCart.php",
            data: `goodid=${goodid}&price=${price}`,
            dataType: "json",
            success(res) {
                // console.log(response);
                var text = res["totalRow"];
                console.log(text) 
                // $("#catShow").html(text)
                console.log($(".circle"))
                $(".circle").text(text)
            }
        });
    })

    
        
    
    





});