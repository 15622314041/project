/* 
* @Author: Marte
* @Date:   2019-08-07 20:08:51
* @Last Modified by:   Marte
* @Last Modified time: 2019-08-08 18:06:07
*/

$(document).ready(function(){

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

            console.log(this.data)
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
                                <div class= "btn clearfix"><a href="#" class="btn-l">查询详情</a><a href="#" class="btn-r">咨询药师</a></div>
                                </div>

                        </li>`
            }).join('');
            
            $(".goods-ul").html(html);
        }
        renderSelect(){
            var sArr=['综合','销量','人气','评论','最新','价格']
            $(".goods-select").append('<ul class="selectList"></ul>');
            let selectHtml = sArr.map((ele,i)=>{
                return`<li><span>${ele}</span></li>`
            }).join('');
            $(".selectList").append(selectHtml);
            $(".selectList li:eq(0) span").css({
                'color':"red",
                'background-image':"none"
            });
        }
        renderTop(){
            $(".goods-top").append('<a href="javascript:;"></a>');
            $(".goods-top a").text('中西药品');
        }
        renderGroup(){
            var gArr=['同仁堂','白云山','立效','同和','其他'];
            let ghtml = gArr.map((ele,i)=>{
                return`<a href="javascript:;">${ele}</a>`
            }).join('');
            $(".goods-group dd").append(ghtml)
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

    let getList = (page)=>{
        $.ajax({
                url: '../server/getDataList.php',
                type: 'post',
                dataType: 'json',
                data:`page=${page}`,
                success(res){
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
            $(".page").append(`<a href="javascript:;" class="nextPage">下一页</a>`)
            $(".page").prepend(`<a href="javascript:;" class="prePage">上一页</a>`)
        }
    });

    $(".page").on("click", ".num", function() {
        var index = $(this).index();
        /* (1) 设置当前标签的选中状态 */
        $(this).addClass("active").siblings().removeClass("active");
        /* (2) 发送网络更新页面 */
        getList(index-1);

    })
    
    

    // $("#nav li").click(function() {
    //     orderType = $(this).index();
    //     getList(0);
    // })  
        






});