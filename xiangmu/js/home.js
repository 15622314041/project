/* 
* @Author: Marte
* @Date:   2019-08-03 18:02:42
* @Last Modified by:   Marte
* @Last Modified time: 2019-08-12 17:18:07
*/

$(document).ready(function(){
    var headerCArr=['首页','家庭常备药','乙肝','传统滋补','男性早泄','控制三高','中药抓药','投资者关系']
    var arr = [
        "https://p1.maiyaole.com/img/item/1564624716714145.jpg",
        "https://p2.maiyaole.com/img/item/1564709154638475.jpg",
        "https://p2.maiyaole.com/img/item/1564622720965137.jpg",
        "https://p2.maiyaole.com/img/item/1564709283034479.jpg",
        "https://p1.maiyaole.com/img/item/1564709610633483.jpg",
        "https://p2.maiyaole.com/img/item/1564709662491487.jpg"
    ]
    var AdsArr = [
        "https://p1.maiyaole.com/img/item/1564709881554491.jpg",
        "https://p3.maiyaole.com/img/item/1564709992595495.jpg",
        "https://p1.maiyaole.com/img/item/1564723373298499.jpg",
        "https://p1.maiyaole.com/img/item/1564723386944503.jpg"
    ]
    var adsBanner="https://p1.maiyaole.com/img/item/1564969875056511.jpg"
    var searchArr= ["阿胶","感冒","逍遥丸","妇炎洁","血压计","护理液"]
    //添加导航栏
    let headNavList=headerCArr.map((ele,i)=>{
        return `<li class="fl"><a href="#">${ele}</a></li>`
    }).join('');
    $(".header-nav-c").html(headNavList);

    class AdsManger{
        constructor(data){
            this.data=data;
        }
        render(){
            let adsFirst = $("<div class='ads-first'></div>")
            $(".specialAds").html(adsFirst);
            let AdsHtml = AdsArr.map((ele,i)=>{
                return `<img src=${ele}>`
            }).join('');
            $(".specialAds").append(AdsHtml)
        }
    }
    var AdsM =new AdsManger(AdsArr);
    AdsM.render();

    //Adsbanner管理
    let Adsbanner = `<img src=${adsBanner}>`;
    $(".adsBanner").html(Adsbanner)
    //添加导航栏tab选项卡
    class TabNav{
        constructor(data){
            this.data=data;
            this.title = [];
            this.drugimg = [];
            this.drugList = [];
            data.forEach((ele,i)=>{
                this.title.push(ele.title);
                this.drugimg.push(ele.drugimg);
                this.drugList.push(ele.drugList);
            })
            this.drugList.forEach((ele,i)=>{
                // console.log(ele)
            })
            
        }
        init(){
            this.renderUI();
            this.addMouseEvent(); 
        }
        renderUI(){
            let tabList = $(".tab-list");
            let oLiHtml = this.data.map((ele,i)=>{
                return `<li class="drug_li">
                            <a href="#">
                                <i></i>
                                <h4>${ele.title}</h4>
                            </a>
                            <div class="tab-box"></div>
                        </li>`
            }).join('');

            tabList.html(oLiHtml);
            this.tabList = tabList;

            let tabBox = $(".tab-box")
            // var h4Arr=[]
            $(".tab-box").each((index, item)=>{
                item.innerHTML = this.drugList[index].map((ele,i)=>{
                    return`
                        <div class="tab-content"></div>`
                }).join('');

            });
            
            var listArr=[]
            for(let i =0;i<this.drugList.length;i++){
             // console.log(this.drugList[i])
                this.drugList[i].forEach((ele,i)=>{
                    listArr.push(ele);
                    
                })    
            }
            // console.log(listArr)
            $(".tab-content").each((index, item)=>{
                item.innerHTML = listArr[index].map((ele,i)=>{
                    return `<dl class="list-dl"><dt><a href="#">${ele.odt}</a></dt><dd class="list-dd"></dd></dl>`
                }).join('');
            })

            var ddA=[];
            listArr.forEach((ele,i)=>{
                ele.forEach((ele2,i2)=>{
                    ddA.push(ele2.odd)
                    // console.log(ele2.odd)
                })
            })
            $(".list-dd").each((index, item)=>{
                item.innerHTML = ddA[index].map((ele,i)=>{
                  return `<a href="./html/goods.html">${ele}</a>`  
                }).join('')
            })
            let searchResHtml=searchArr.map((ele,i)=>{
                return`<a href= "../html/goods.html">${ele}</a>`
            }).join('');
            $(".searchKey").html(searchResHtml);
                  
        }
        addMouseEvent(){
            var self = this;
            //添加鼠标移入事件
            $(".drug_li").on("mouseenter",function(e){
                var idx = $(this).index();
                $(this).children(".tab-box").addClass('cur').parent().siblings().children(".tab-box").removeClass('cur');
            })
            // 添加鼠标移出事件
            $(".drug_li").on("mouseleave",function(e){
                var idx = $(this).index();
                $(this).children(".tab-box").removeClass('cur')
            })
        }
    }

    $.ajax({
        url:'./server/getTabData.php',
        type: 'POST',
        dataType: 'json',
        success(res){
            var dataTab = res;
            let b = new TabNav(dataTab);
            b.init();
        }
    })
    

    //mrt选显卡
    $.ajax({
        url: './server/mrtTab.php',
        type: 'post',
        dataType: 'json',
        success(res){
            var data = res;
            let mrtHtml = res.title.map((ele,i)=>{
                return `<div class = "mrt-h">${ele}</div>`
            }).join('');
            let mrtcon = res.title.map((ele,i)=>{
                return `<div class = "mrt-content"></div>`
            }).join('');
            $(".mrt-t").append(mrtHtml);
            $(".mrt-con").append(mrtcon);

            let acHtml = data.list.map((ele,i)=>{
                return`<a href="#">${ele}></a>`
            }).join('');

            $(".mrt-content").eq(0).append(acHtml);
            let abHtml = `<a href="#"><span></span><p>综合门诊</p></a>
            <a href="#"><span></span><p>儿科</p></a>`
            $(".mrt-content").eq(1).append(abHtml);
            $(".mrt-content").eq(0).css("display","block")
            $(".mrt-h").on("click",function(){
                var idx = $(this).index();
                $(".mrt-content").eq(idx).css("display","block").siblings().css("display","none");
            })
        }
    })
    



    //轮播图
    class BannerManager {
        constructor(data, root = document.body) {
            this.data = data;
            this.slider = $(".slider");
            this.sliderBox = null;
            this.sliderControl = null;
            this.sliderNav = null;
            this.root = root;

            this.sliderItemWidth = 750;
            this.index = 0;
            this.sliderItemCount = this.data.length;
            this.timer = null;
        }
        init() {
            this.createHTML();
            // this.root.appendChild(this.slider);
            this.autoPlay();
            this.addMouseHandle();
            this.switchSlideNavItem();
            this.addClickNacItemHandle();
        }
        createHTML() {
            let sliderBox = document.createElement("ul");
            sliderBox.className = "slider-box";
            sliderBox.innerHTML = this.data.map((item) => {
                return `<span class="slider-box-item"><img src=${item}></span>`
            }).join("");

            
            let sliderNav = document.createElement("ol");
            sliderNav.className = "slider-nav";
            sliderNav.innerHTML = this.data.map((item, i) => {
                return `<span class="slider-nav-item"></span>`
            }).join("");

            let slider = $(".slider");
            $(".slider").append(sliderBox);
            $(".slider").append(sliderNav);
            this.slider = slider;
            this.sliderBox = sliderBox;
            this.sliderNav = sliderNav;

        }
        autoPlay() {
            this.timer = setInterval(() => {
                this.next();
            }, 2000);
        }
        
        next() {
            this.index++;
            /* 临界值检查 */
            if (this.index > (this.sliderItemCount - 1)) {
                this.index = 0;
            }
            this.sliderBox.style.left = -this.index * this.sliderItemWidth + "px";
            this.switchSlideNavItem();
        }
        prev() {
            this.index--;
            /* 临界值检查 */
            if (this.index < 0) {
                this.index = this.sliderItemCount - 1;
            }
            this.sliderBox.style.left = -this.index * this.sliderItemWidth + "px";
            this.switchSlideNavItem();
        }
        addMouseHandle() {
            this.slider.onmouseenter = () => {
                clearInterval(this.timer);
            }

            this.slider.onmouseleave = () => {
                this.autoPlay();
            }
        }
        switchSlideNavItem() {
            Array.from(this.sliderNav.children).forEach((ele) => {
                ele.className = "slider-nav-item"
            })
            this.sliderNav.children[this.index].className = "slider-nav-item active";
        }
        addClickNacItemHandle() {
            Array.from(this.sliderNav.children).forEach((ele, i) => {
                ele.onmouseenter = () => {
                    this.index = i;
                    this.switchSlideNavItem();
                    this.sliderBox.style.left = -this.index * this.sliderItemWidth + "px";
                }
            })
        }
    }
    var b1 = new BannerManager(arr);
    b1.init();

    //楼层效果
    class FloorManager{
        constructor(data){
            this.data = data;
            this.title = [];
            this.bgcolor = [];
            this.banner=[];
            this.img=[];
            this.list=[];
            this.oLi =[];
            this.data.forEach((ele,i)=>{
                this.title.push(ele.title);
                this.bgcolor.push(ele.bgcolor);
                this.banner.push(ele.banner);
                this.img.push(ele.img);
                this.list.push(ele.list);
                this.oLi.push(ele.oLi);
            })
        }
        init(){
            this.renderUI();
            this.changeCSS();
        }
        renderUI(){
            var self=this;
            let floorBox = $('.floor-box');
            floorBox.addClass('con');

            let floorHtml=this.data.map((ele,i)=>{
                return `<div class="floor con"></div>`
            }).join('');
            floorBox.append(floorHtml);

            let floorLeft=$('<div class="floor-l fl"></div>');
            let floorRight=$('<div class="floor-r fr"></div>');
            $(".floor").append(floorLeft);
            $(".floor").append(floorRight);
            let floorTitle= $('<div class="floor-title"></div>');
            $(".floor-l").append(floorTitle);
            $(".floor-title").each(function(i,ele){
                ele.innerHTML=self.title[i];
            })
            let floorUl = $('<div class="floor-ul fl"></div>');
            $(".floor-l").append(floorUl);
            $(".floor-ul").each((idx,item)=>{
                item.innerHTML= this.list[idx].map((ele,idx)=>{
                    return`<li><a href="./html/goods.html">${ele}</a></li>`
                }).join('');
            })

            let floorRt=$('<div class="floor-r-t"></div>');
            let floorRb=$('<ul class="floor-r-b"></ul>');
            $(".floor-r").append(floorRt);
            $(".floor-r").append(floorRb);
            

            $(".floor-r-t").each((idx,item)=>{
                item.innerHTML=`<div class="f-t-l">
                                    <a href="#"><img src=${this.banner[idx]}></a>
                                </div>
                                <div class="f-t-r">
                                    <a href="#"><img src=${this.img[idx][0]}></a>
                                    <a href="#"><img src=${this.img[idx][1]}></a>
                                </div>`  
            })

            $(".floor-r-b").each((idx,item)=>{
                item.innerHTML = this.oLi[idx].liImg.map((ele,i)=>{
                    return `<li>
                                <img src=${ele}>
                                <a href="#">${this.oLi[idx].liA[i]}</a>
                                <p><span>￥</span>${this.oLi[idx].liP[i]}</p>
                            </li>`
                }).join('');
              
            })

        }
        changeCSS(){
            //给每个floor改变border-top颜色
            var self=this;
            $(".floor").each(function(i,ele){
                $(".floor").eq(i).css("border-top-color",`${self.bgcolor[i]}`);
                $(".floor-title").eq(i).css("background",`${self.bgcolor[i]}`)
            })
        }
    }
    $.ajax({
        url: './server/getFloorData.php',
        type: 'post',
        dataType:'json',
        success(res){
            var fm = new FloorManager(res);
            fm.init(); 
        }
    });

    class YfloorManager{
        constructor(data){
            this.data = data;
            this.title = data.title;
            this.url = data.url;
            this.list = data.list;
            console.log(this.url)
        }
        init(){
            this.render();
            this.changeCSS();
            this.addMouseEvent();
        }
        render(){
            var self = this;
            let ytHtml = this.title.map((ele,i)=>{
                return `<li>${ele}</li>`
            }).join('');
            $(".y-title").append(ytHtml);
            let ycHtml = this.title.map((ele,i)=>{
                return `<ul class="y-ul"></ul>`
            }).join('');
            $(".y-content").append(ycHtml);

            $(".y-ul").each(function(index,item) {
                item.innerHTML = self.list[index].map((ele,i)=>{
                    return `<li><a href="#" >${ele}</a></li>`
                }).join('');
                $(".y-ul").eq(index).addClass(`ul-list${index+1}`)
            });
        }
        changeCSS(){
            console.log('url('+this.url+')')
            $(".ul-list1").css('background','url('+this.url+')'+' no-repeat')
        }
        addMouseEvent(){
            $(".y-title li").eq(0).addClass("y-active");
             $(".ul-list1").addClass("cur");
            $(".y-title li").on("mouseenter",function(){
                // console.log($(this).index())
                var idx=$(this).index()
                $(this).addClass("y-active").siblings().removeClass('y-active');
                console.log( $(this).parent().siblings().children().eq(idx))
                $(this).parent().siblings().children().eq(idx).addClass("cur").siblings().removeClass('cur');
            })
        }
    }
    $.ajax({
        url: './server/y_floor.php',
        type: 'post',
        dataType: 'json',
        success(res){
            let yf = new YfloorManager(res);
            yf.init();
        }
    })
    
    class AsideManager{
        constructor(data){
            this.data=data;
            console.log(this.data);
        }
        init(){
            this.render();
        }
        render(){
            let html = this.data.map((ele,i)=>{
                return `<li><img src=${ele.oimg}><h2>${ele.oh2}</h2><p>${ele.op}</p></li>`
            }).join('');
            $(".aside-l").append(html);
        }
    }
    $.ajax({
        url: './server/aside.php',
        type: 'post',
        dataType: 'json',
        success(res){
            let as = new AsideManager(res);
            as.init();
        }
    })

    //footer部分
    class footerTop{
        constructor(data){
            this.data = data;
            this.list = data.list;
            this.logo = data.logo;
            this.dd = [];
            this.list.forEach((ele,i)=>{
                this.dd.push(ele.dd)
            })
            console.log(this.dd);

        }
        init(){
            this.render()
        }
        render(){
            let imgHtml = `<img src=${this.logo}>`
            $(".footer-t").append(imgHtml);
            let dlBox= $('<div class="dl-box"></div>');
            $(".footer-t").append(dlBox);

            let dlBoxHtml= this.list.map((ele,i)=>{
                return `<dl><dt>${ele.odt}</dt></dl>`
            }).join('');

            $(".dl-box").append(dlBoxHtml);

            $(".dl-box dl").each((idx,item)=>{
                item.innerHTML+=this.dd[idx].map((ele,i)=>{
                    return `<dd><a href ="#">${ele}</a></dd>`
                }).join('');
            })
        }
    }
    $.ajax({
        url: './server/footerTop.php',
        type: 'post',
        dataType: 'json',
        success(res){
            let ft = new footerTop(res);
            ft.init();
        }
    })
    
    $(".tofloor").css("left",`${($(window).width()-1190)/2-50}px`)
    window.onscroll = function(){
        if(window.scrollY >= 550){
            $(".tofloor").css("display","block")
        }else if(window.scrollY < 550){
            $(".tofloor").css("display","none")
        }
    }

    console.log()
    $(".tofloor li").on("click",function(){
        var left_position = ($(window).width()-1190)/2
        console.log(left_position)
        var idx = $(this).index();
        window.scrollTo(left_position,550*(idx+1));
        // console.log()
        
    })
    var bigname = window.localStorage.getItem("name");
    console.log(bigname);
    if(window.localStorage.getItem("name")){
        $(".header-t .active-red").text(bigname)
    }else{
        $(".header-t .active-red").text('请登录')
    }
    
    $(".floor-ul a").on("click",function(){
        window.location.href="../html/goods.html";
    })
    
    
    




});