/* 
* @Author: Marte
* @Date:   2019-08-09 13:58:53
* @Last Modified by:   Marte
* @Last Modified time: 2019-08-09 21:13:40
*/

$(document).ready(function(){
    
    var targetData;
    getCartInfo();

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
                    return`<ul class="content-list clearfix">
                                <li class="td-check"><input type="checkbox" class="check-btn" ${ele.isActive==1 ? "checked" : ""}></li>
                                <li class="td-item">
                                    <div class="item-img"><img src=${ele.src}></div>
                                    <div class="item-name">${ele.name}</div>
                                </li> 
                               <li class="td-price">￥${(ele.price*1).toFixed(1)}</li>
                               <li class="td-count"><button>-</button><input type="text" value=${ele.num}><button>+</button></li>
                               <li class="td-weight">${(Math.random()*2).toFixed(2)}kg</li>
                               <li class="td-has">有货</li>
                               <li class="td-total">￥${(ele.price*ele.num).toFixed(2)}</li>
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
            // if($(this).prop("checked")==true){
            //     $(".check-btn").each((i,ele)=>{
                    
            //     })
            // }else if($(this).prop("checked")==false){
            //     $(".check-btn").each((i,ele)=>{
                    
            //     })
            //}
            $(".check-btn").prop("checked", $(this).is(":checked"))
            
            // console.log(this);
        })

        /* 给删除添加点击事件 */
        $(".content").on("click", ".del", function() {
            $.ajax({
                type: "get",
                url: "../server/removeCart.php",
                data: "goodid=" + 7,
                success: function(response) {}
            });
            console.log($(this))
            $(this).parents(".content-list").remove();
        })

    

});