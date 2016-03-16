var Yd = {};

/**
 * 加载图片
 * @param src 图片路径
 * @param calFunc(Image) 回调函数
 */
Yd.loadImg = function(dom, src, calFunc){

    dom.onload = function(){
        calFunc();
        dom.onload = null;
    };

    dom.src = src;
};

/**
 * 获得元素距离页面的顶部的距离
 * @param dom
 * @returns {number}
 */
Yd.toTop = function(dom){

    var sum = 0;

    while(dom){
        sum += dom.offsetTop;
        dom = dom.offsetParent;
    };

    return sum;

};

/**
 * 获得元素距离页面的左边的距离
 * @param dom
 * @returns {number}
 */
Yd.toLeft = function(dom){

    var sum = 0;

    while(dom){
        sum += dom.offsetLeft;
        dom = dom.offsetParent;
    };

    return sum;
};

Yd.Maginfier = function(opt){

    var This = this;

    this.opt = {
        imgId : opt.imgId,
        selectAreaWidth : opt.selectAreaWidth || 200,
        selectAreaHeight : opt.selectAreaHeight || 200,
        src : opt.src,
        bigSrc : opt.bigSrc
    };

    this.oImg = document.getElementById(this.opt.imgId); //img dom
    this.oParent = this.oImg.parentElement; //img parent dom
    this.oSelectArea = this._createSelectArea(); //选择区域

    this.bigBox = null; //大图box
    this.bigImg = null; //大图

    Yd.loadImg(this.oImg, this.opt.src, function(){
        This._init();
    });

};

Yd.Maginfier.prototype = {
    constructor : Yd.maginfier,

    _init : function(){

        //如果父元素没有定位则加上相对定位
        if(getComputedStyle(this.oParent).position == "static" || getComputedStyle(this.oParent).position == ""){
            this._setStyle(this.oParent, {position : "relative"});
        };

        //将选择区域添加到父元素
        this.oParent.appendChild(this.oSelectArea);

        //初始化大图
        this._initBigImg();

        //父类绑定事件
        this.oParent.addEventListener("mouseenter", this._mouseEnterEvent(), false);
        this.oParent.addEventListener("mousemove", this._mouseMoveEvent(), false);
        this.oParent.addEventListener("mouseleave", this._mouseLeaveEvent(), false);

    },

    _mouseEnterEvent : function(){

        var that = this;

        return function(e){
            that._setStyle(that.oSelectArea, {display : ""});
            that._moveSelectArea(e.offsetX, e.offsetY);
            that._setStyle(that.bigBox, {display : ""});
        };
    },

    _mouseMoveEvent : function(){

        var that = this;

        return function(e){
            if(e.target == that.oSelectArea){
                that._moveSelectArea(e.offsetX + that.oSelectArea.offsetLeft, e.offsetY + that.oSelectArea.offsetTop);
            }
            else{
                that._moveSelectArea(e.offsetX, e.offsetY);
            }
        };
    },

    _mouseLeaveEvent : function(){

        var that = this;

        return function(e){
            if(e.toElement != that.oSelectArea){
                that._setStyle(that.oSelectArea, {display : "none"});
                that._setStyle(that.bigBox, {display : "none"});
            };
        };
    },

    /**
     * 选择区域移动
     * @param x offsetX
     * @param y offsetY
     * @private
     */
    _moveSelectArea : function(x, y){

        var oSelectArea = this.oSelectArea;
        var width_harf = this.opt.selectAreaWidth / 2;
        var height_harf = this.opt.selectAreaHeight / 2;

        var bigImg = this.bigImg;
        var scale = parseInt(getComputedStyle(this.bigImg).width) / this.opt.selectAreaWidth;

        if((x - width_harf) < 0 ){
            this._setStyle(oSelectArea, {left : "0px"});
            this._setStyle(bigImg, {left : "0px"});
        }
        else if(x + width_harf > parseInt(getComputedStyle(this.oImg).width)){
            var n = parseInt(getComputedStyle(this.oImg).width) - this.opt.selectAreaWidth;
            this._setStyle(oSelectArea, {left : n + "px"});
            this._setStyle(bigImg, {left : -1 * n * scale + "px"});
        }
        else{
            var n = x - width_harf;
            this._setStyle(oSelectArea, {left : n + "px"});
            this._setStyle(bigImg, {left : -1 * n * scale + "px"});
        }

        if((y - height_harf) < 0 ){
            this._setStyle(oSelectArea, {top : "0px"});
            this._setStyle(bigImg, {top : "0px"});
        }
        else if(y + height_harf > parseInt(getComputedStyle(this.oImg).height)){
            var n = parseInt(getComputedStyle(this.oImg).height) - this.opt.selectAreaHeight;
            this._setStyle(oSelectArea, {top : n + "px"});
            this._setStyle(bigImg, {top : -1 * n * scale + "px"});
        }
        else{
            var n = y - height_harf;
            this._setStyle(oSelectArea, {top : n + "px"});
            this._setStyle(bigImg, {top : -1 * n * scale + "px"});
        }


    },

    /**
     * 创建选择区域
     * @returns {Element}
     * @private
     */
    _createSelectArea : function(){

        var oArea = document.createElement("span");
        this._setStyle(
            oArea,
            {
                width : this.opt.selectAreaWidth + "px",
                height : this.opt.selectAreaHeight + "px",
                background : "url(//gtms01.alicdn.com/tps/i4/T12pdtXaldXXXXXXXX-2-2.png) repeat scroll 0 0 transparent",
                position : "absolute",
                cursor : "move",
                display : "none"
            }
        );

        return oArea;

    },

    /**
     * 添加样式
     * @param dom
     * @param styles
     * @private
     */
    _setStyle : function(dom, styles){

        for(var p in styles){
            dom.style[p] = styles[p];
        }

    },

    /**
     * 初始化放大图
     * @private
     */
    _initBigImg : function(){

        this.bigBox = document.createElement("div");

        this._setStyle(this.bigBox, {
            position : "absolute",
            width : getComputedStyle(this.oImg).width,
            height : getComputedStyle(this.oImg).height,
            display : "none",
            left : Yd.toLeft(this.oParent) + parseInt(getComputedStyle(this.oParent).width) + 20 + "px",
            top : Yd.toTop(this.oParent) + "px",
            overflow : "hidden"
        });

        this.bigImg = document.createElement("img");
        this.bigBox.appendChild(this.bigImg);
        this.bigImg.src = this.opt.bigSrc;
        this._setStyle(this.bigImg, {
            position : "absolute"
        });

        document.body.appendChild(this.bigBox);
    }
};