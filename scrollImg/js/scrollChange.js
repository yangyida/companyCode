/**
 * @description 横屏轮播图
 * @param opt(object)
 * @constructor
 */
var ScrollChange = function(opt){

    this.opt = {
        oBoxElement : opt.oBoxElement, //容器元素
        oBoxHeight : opt.oBoxHeight || "300px", //容器高度
        timeInterval : opt.timeInterval || 3000, //时间间隔（毫秒）
        itemArray : opt.itemArray //展示项(Array[element])
    };

    this.oContaintElement = null; //舞台元素
}

ScrollChange.prototype = {

    constructor : ScrollChange,

    /**
     * 初始化函数
     */
    init : function(){
        var This = this;

        //向页面添加样式
        ScrollChange.tool.addStyleLink("css/scrollChange.css");

        //将容器元素宽度设置100%
        This.opt.oBoxElement.classList.add("scrollChange-box");

        //初始化舞台元素
        This.oContaintElement = document.createElement("div");
        ScrollChange.tool.setStyle(This.oContaintElement,
                                   {
                                       width: parseInt(getComputedStyle(This.opt.oBoxElement).width) * (This.opt.itemArray.length + 2) + "px",
                                       height : This.opt.oBoxHeight
                                   }
                                  );
        This.oContaintElement.classList.add("scrollChange-clear");
        This.opt.oBoxElement.appendChild(This.oContaintElement);

        //向容器添加显示项,浮动，调整为最大宽度
        This.opt.itemArray.push(This.opt.itemArray[0].cloneNode(true));
        This.opt.itemArray.splice(0,0,This.opt.itemArray[This.opt.itemArray.length - 2].cloneNode(true));
        for(var i = 0; i < This.opt.itemArray.length; i++){
            var o = This.opt.itemArray[i];
            ScrollChange.tool.setStyle(o, {
                float: "left",
                width: getComputedStyle(This.opt.oBoxElement).width,
                height: "100%"
            });
            This.oContaintElement.appendChild(o);
        }

        This.contentDistance = parseInt(getComputedStyle(This.oContaintElement).width); //舞台元素总宽
        This.eachDistance = parseInt(getComputedStyle(This.opt.oBoxElement).width);//每一项宽度
        This.currentShowItem = 1; //当前显示项
        This.itemCount = This.opt.itemArray.length; //总项数
        This.currentOffset = -1 * parseInt(getComputedStyle(This.opt.oBoxElement).width); //当前舞台元素偏移

        //初始化显示第1项
        ScrollChange.tool.setStyle(This.oContaintElement,{
            transform : "translateX(" + This.currentOffset + "px)"
        });

        //为舞台元素绑定鼠标事件
        var e = This.event();
        This.oContaintElement.onmousedown = e.mousedown;
        document.addEventListener("mousemove", e.mousemove, false);
        document.addEventListener("mouseup", e.mouseup, false)
    },

    event : function(){

        var This = this;
        var isPress = false;

        function mousedown(){
            if(!isPress){
                isPress = true;
                This.oContaintElement.classList.remove("scrollChange-animation-on");
            }
        }

        function mousemove(e){
            if(isPress){

                This.currentOffset += e.movementX;

                if(This.currentOffset >= 0 || This.currentOffset < (This.contentDistance - This.eachDistance) * -1){

                    if(This.currentOffset >= 0){
                        This.currentShowItem = 0;
                        This.currentOffset = 0;
                    }else{
                        This.currentShowItem = This.opt.itemArray.length;
                        This.currentOffset = (This.contentDistance - This.eachDistance) * -1;
                    }

                }else{
                    This.currentShowItem = Math.abs(Math.round(This.currentOffset / This.eachDistance));
                }

                ScrollChange.tool.setStyle(This.oContaintElement,{
                    transform : "translateX(" + This.currentOffset + "px)"
                });

            }
        }

        function mouseup(){
            if(isPress){
                isPress = false;
                This.oContaintElement.classList.add("scrollChange-animation-on");
                This.currentOffset = -1 * This.currentShowItem * This.eachDistance;

                ScrollChange.tool.setStyle(This.oContaintElement,{
                    transform : "translateX(" + This.currentOffset + "px)"
                });

                if(This.currentShowItem == 0 || This.currentShowItem == This.itemCount - 1){
                    setTimeout(function(){

                        if(This.currentShowItem == 0 || This.currentShowItem == This.itemCount - 1) {

                            This.oContaintElement.classList.remove("scrollChange-animation-on");

                            if (This.currentShowItem == 0) {
                                This.currentShowItem = This.itemCount - 2;
                            } else {
                                This.currentShowItem = 1;
                            }
                            This.currentOffset = -1 * This.currentShowItem * This.eachDistance;

                            ScrollChange.tool.setStyle(This.oContaintElement, {
                                transform: "translateX(" + This.currentOffset + "px)"
                            });
                        }
                    }, 200);
                }

            }
        }

        return {
            mousedown : mousedown,
            mousemove : mousemove,
            mouseup : mouseup
        }
    }
};






/**
 *  @description 工具类
 */
ScrollChange.tool = {};

/**
 * @description 元素样式修改
 * @param element 元素对象
 * @param styles 样式对象
 * @param calFunc 回调函数（非必要）
 */
ScrollChange.tool.setStyle = function(element, styles, calFunc){

    for(var key in styles){
        element["style"][key] = styles[key];
    }

    calFunc && calFunc();
}

/**
 * @description 添加样式
 * @param url 路径 string
 */
ScrollChange.tool.addStyleLink = function(url){

    var oLink = document.createElement("link");
    oLink.type = "text/css";
    oLink.rel = "stylesheet";
    oLink.href = url;

    document.head.appendChild(oLink);
}