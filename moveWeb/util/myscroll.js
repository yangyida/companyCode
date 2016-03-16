/**
 * example : <div id="wrapper">
 *              <ul>
 *                  <li></li>
 *                  <li></li>
 *                  <li></li>
 *              </ul>
 *           </div>
 *
 *           new MyScroll("#wrapper") / new MyScroll(element);
 *
 *
 * (垂直滚动插件)
 * @param el string/element id或element
 * @options startY 开始高度（px） 默认0
 *          preventDefault 阻止触摸的默认事件 boolean 默认true
 *          stopPropagation 阻止冒泡 boolean 默认true
 * @constructor
 */
var MyScroll = function(el, options){

    //触摸的Y坐标
    this.touchClientY = 0;

    //拖动方向
    this.dragDirection = 0; //0：无拖动， 1：向下拖， 2：向上拖

    //滚动元素的父元素
    this.scrollElementParent = (typeof el == "string" ? document.querySelector(el) : el);

    //滚动元素
    this.scrollElement = this.scrollElementParent.children[0];

    //默认配置
    this.options = {
        startY : 0,
        preventDefault : true,
        stopPropagation : true
    };

    //自定义配置
    if(options){
        for(var key in options){
            this.options[key] = options[key];
        }
    }

    //初始化组件
    this._init();
};

MyScroll.prototype._init = function(){

    var scrollElementParent = this.scrollElementParent;
    var scrollElement = this.scrollElement;
    var options = this.options;

    //滚动元素的父元素绑定触摸事件
    var isPreventDefault = this.options.preventDefault;
    var isStopPropagation = this.options.stopPropagation;

    scrollElementParent.addEventListener("touchstart", this._touchstartEvent(this, isPreventDefault, isStopPropagation),false);
    scrollElementParent.addEventListener("touchmove", this._touchmoveEvent(this, isPreventDefault, isStopPropagation), false);
    scrollElementParent.addEventListener("touchend", this._touchendEvent(this, isPreventDefault, isStopPropagation), false);

    //设置滚动元素的默认滚动高度
    this._setY(options.startY);
};

MyScroll.prototype._setY = function(targetY){
    var scrollElement = this.scrollElement;
    scrollElement.style.webkitTransform = "translate3d(0," + targetY + "px,0)";
    scrollElement.style.transform = "translate3d(0," + targetY + "px,0)";
    this.y = targetY; //当前y轴位移
};

MyScroll.prototype._touchstartEvent = function(This, isPreventDefault, isStopPropagation){

    return function(e){
        isPreventDefault && e.preventDefault();
        isStopPropagation && e.stopPropagation();

        This.touchClientY = e.changedTouches[0].clientY;
        This.dragDirection = 0;
    }
};

MyScroll.prototype._touchmoveEvent = function(This, isPreventDefault, isStopPropagation){

    var scrollElParentHeight = This.scrollElementParent.offsetHeight;
    var scrollElHeight = This.scrollElement.offsetHeight;

    return function(e){
        isPreventDefault && e.preventDefault();
        isStopPropagation && e.stopPropagation();

        //当前Y坐标
        var clientY = e.changedTouches[0].clientY;

        //判断拖动方向
        if(clientY > This.touchClientY){
            This.dragDirection = 1;
        }else{
            This.dragDirection = 2;
        }

        if(This.y > 0){
            //console.log("超出顶部啦!!!");
            var changeClientY = This.y + (clientY - This.touchClientY) * 0.6;
            This._setY(changeClientY);

        }else if(scrollElParentHeight > scrollElHeight + This.y){
            //console.log("超出底部啦!!!");
            var changeClientY = This.y + (clientY - This.touchClientY) * 0.6;
            This._setY(changeClientY);

        }else{
            var changeClientY = This.y + clientY - This.touchClientY;
            This._setY(changeClientY);
        }

        //将当前Y坐标赋值给触摸的Y坐标
        This.touchClientY = clientY;

    }
};

MyScroll.prototype._touchendEvent = function(This, isPreventDefault, isStopPropagation){

    var options = This.options;
    var scrollElParentHeight = This.scrollElementParent.offsetHeight;
    var scrollElHeight = This.scrollElement.offsetHeight;

    return function(e){
        isPreventDefault && e.preventDefault();
        isStopPropagation && e.stopPropagation();

        //当前Y坐标
        var clientY = e.changedTouches[0].clientY;

        //无拖动方向
        This.dragDirection = 0;

        if(This.y > 0){
            //console.log("超出顶部啦!!!");

            var startTime = new Date().valueOf();
            var b = This.y;
            var d = 200;
            var c = 0 - b;

            var timer = setInterval(function(){

                var currentTime = new Date().valueOf();

                var targetY = 0;

                if(currentTime - startTime < d){
                    targetY = This.Tween.bounceOut(currentTime - startTime, b, c, d);
                }else{
                    targetY = options.startY;
                    clearInterval(timer);
                }

                This._setY(targetY);

            }, 20);

        }else if(scrollElParentHeight > scrollElHeight + This.y){
            //console.log("超出底部啦!!!");

            var startTime = new Date().valueOf();
            var b = This.y;
            var d = 200;
            var c = This.scrollElementParent.offsetHeight - This.scrollElement.offsetHeight - b;

            var timer = setInterval(function(){

                var currentTime = new Date().valueOf();

                var targetY = 0;

                if(currentTime - startTime < d){
                    targetY = This.Tween.bounceOut(currentTime - startTime, b, c, d);
                }else{
                    targetY = This.scrollElementParent.offsetHeight - This.scrollElement.offsetHeight;
                    clearInterval(timer);
                }

                This._setY(targetY);

            }, 20);

        }else{
            var changeClientY = This.y + clientY - This.touchClientY;
            This._setY(changeClientY);
        }

    }
};

/**
 * 运动公式
 * @param t 当前时间
 * @param b 当前值
 * @param c 目标增量值
 * @param d 总时间
 */
 MyScroll.prototype.Tween = {

    linear: function (t, b, c, d){  //匀速
        return c*t/d + b;
    },
    easeIn: function(t, b, c, d){  //加速曲线
        return c*(t/=d)*t + b;
    },
    easeOut: function(t, b, c, d){  //减速曲线
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){  //加速减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){  //加加速曲线
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){  //减减速曲线
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c;
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) *
            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 3.70158;  //回缩的距离
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d){
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
};