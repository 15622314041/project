/* 
* @Author: Marte
* @Date:   2019-08-07 20:08:51
* @Last Modified by:   Marte
* @Last Modified time: 2019-08-09 17:31:19
*/

$(document).ready(function(){
    var itemData;
    class TitleManager{
        constructor(data){
            this.data = data;
            this.oh3 = data.oh3;
            this.oul = data.oul;
        }
        init(){
            this.render();
        }
        render(){
            $(".goods-title h2").text("中西药品")
            let html = this.oh3.map((ele,i)=>{
                return `<h3><i></i>${ele}</h3><ul class = "title-ul"></ul>`
            }).join("");
            $(".goods-title").append(html);
            $(".title-ul").each((idx,item)=>{
                item.innerHTML = this.oul[idx].map((ele,i)=>{
                    return `<li><a href= "#">${ele}</a></li>`
                }).join("");
            });
            $('.goods-title h3').on("click",function(){
                $(this).next("ul").toggle("normal").siblings("ul").hide("normal");
            })
            var imgArr=["https://p3.maiyaole.com/img/item/1562815745422203.jpg","https://p1.maiyaole.com/img/item/1534905602163929.jpg","https://p1.maiyaole.com/img/item/1562815405956199.jpg"];
            let imghtml = imgArr.map((ele,i)=>{
                return`<img src=${ele}>`
            }).join("");
            $(".goods-title").append(imghtml);

        }
    }

    $.ajax({
        url: '../server/getGoodsTitle.php',
        type: 'post',
        dataType: 'json',
        success(res){
            let tm = new TitleManager(res);
            tm.init();
        }
    })
    
    

    class GoodsManager{
        constructor(data){
            
            data.forEach((ele,i)=>{
                if(ele.name ==null){
                    ele.name =="同仁堂 参苓白术散 12g*10袋"
                }
                this.src = ele.src;
                ele.price = (Number(ele.price)).toFixed(1);
                this.price = ele.price;
                this.name = ele.name;
                this.isSelf= ele.isSelf;
                this.gif = ele.gif;
                this.comment = ele.comment;
                this.origin = ele.origin;
            })
            this.data = data;

        }
        init(){
            this.renderTop();
            this.renderGroup();
            this.renderSelect();
            this.renderUl();
            this.setCSS();
        }
        renderUl(){
            let html = this.data.map((ele,i)=>{
                if(ele.name == null){
                    ele.name = "同仁堂 参苓白术散 12g*10袋";
                }
                return `<li>
                            <div class="li-content">
                                <img src=${ele.src}>
                                <p class="price clearfix"><span>${ele.price}</span></p>
                                <a href="#" class="productsName Pheight"><span>${ele.isSelf}</span>${ele.name}</a>
                                <a href="#" class="gif">${ele.gif}</a>
                                <div class="origin"><i class="origin-logo"></i>${ele.origin}</div>
                                <div class= "btn clearfix"><a href="../html/detail.html" class="btn-l">查询详情</a><a href="###" class="btn-r">加入购物车</a></div>
                                </div>
                        </li>`
            }).join('');
            
            $(".goods-ul").html(html);
        }
        renderSelect(){
            var sArr=['综合','销量','人气','评论','最新','价格']
            let selectHtml = sArr.map((ele,i)=>{
                return`<li><span>${ele}</span></li>`
            }).join('');
            $(".selectList").html(selectHtml);
        }    
        renderTop(){
            $(".goods-top").html('<a href="javascript:;"></a>');
            $(".goods-top a").text('中西药品');
        }
        renderGroup(){
            var gArr=['同仁堂','白云山','立效','同和','其他'];
            let ghtml = gArr.map((ele,i)=>{
                return`<a href="javascript:;">${ele}</a>`
            }).join('');
            $(".goods-group dd").html(ghtml)
        }
        setCSS(){
            $(".gif").each((idx,item)=>{
                if($(".gif").eq(idx).text()==""){
                    $(".gif").eq(idx).css("height",0);
                    $(".productsName").eq(idx).css("height","40px")
                }
            })
            $(".li-content").on("mouseenter",function(){
                $(this).children(".productsName").removeClass("Pheight")
                     
            })
            $(".li-content").on("mouseleave",function(){
                $(this).children(".productsName").addClass("Pheight")
                     
            })
        }
    }

    let getList = (page,orderType)=>{
        $.ajax({
                url: '../server/getDataList.php',
                type: 'post',
                dataType: 'json',
                data:`page=${page}&orderType=${orderType}`,
                success(res){
                    itemData=res.data
                    var res = res.data
                    // console.log(res);
                    var gm = new GoodsManager(res);
                    gm.init();
                }
            })    
    }
        
   

    getList(0);
    
    $.ajax({
        type: "post",
        url: "../server/getPage.php",
        dataType: "json",
        success(res) {
            console.log(res)
            let pageSize = res.data.count;
            var res = '';
            for (let i = 0; i < pageSize; i++) {
                $(".page").append(`<a href="javascript:;" class="num">${i + 1}</a>`)
            }
            $(".page").children("a").eq(0).addClass("active");
        }
    });

    var index=0;
    $(".page").on("click", ".num", function() {
        index = $(this).index();
        /* (1) 设置当前标签的选中状态 */
        $(this).addClass("active").siblings().removeClass("active");
        /* (2) 发送网络更新页面 */
        getList(index);
    })
    
    // console.log($(".selectList"))
         

    $(".selectList").on("click","li",function() {
       /* Act on the event */
        orderType = $(this).index();
        getList(0,orderType);
        // $(this).css("color","red")
        
             
    })  
    
    $.ajax({
        url: '../server/getDataList.php',
        type: 'post',
        dataType: 'json',
        success(res){
            console.log(res)
        }
    })
    
    

    $(".goods-ul").on("click",".btn-r",function(){
        var idx = $(this).parents("li").index();
        var goodid = itemData[idx].goodid;
        var price = itemData[idx].price;
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

            }
        });
    })





});