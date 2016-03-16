/**
 * 时间运动
 * @param element 元素节点 object
 * @param attr    运动属性 object
 * @param time    运动完成时间 number 毫秒 不填传null，默认为200
 * @param moveType 运动类型 不填传null，默认为线性运动
 * @param callFunc 回调函数
 */
function timeMove(element, attr, time, moveType, callFunc){

    time = time || 200;
    moveType = moveType || "linear";
    var moveFunc = timeMove.Tween[moveType];

    var curAttr = {}; //初始样式
    var tarAttr = {}; //目标样式

    for(var style in attr){

        if(style != "opacity"){
            curAttr[style] = parseInt(getComputedStyle(element)[style]);
            tarAttr[style] = parseInt(attr[style]);
        }else{
            curAttr["opacity"] = Math.round(parseFloat(getComputedStyle(element)[style]) * 100);
            tarAttr["opacity"] = Math.round(attr["opacity"] * 100);
        }

    };

    var startTime = timeMove.now();

    var timer = setInterval(function(){

        var t = timeMove.now() - startTime;

        if(t < time){
            for(var key in curAttr){
                if(key != "opacity"){
                    var targetMove = moveFunc(t, curAttr[key], tarAttr[key] - curAttr[key], time);
                    element.style[key] = targetMove + "px";
                }
                else{
                    var targetMove = moveFunc(t, curAttr[key], tarAttr[key] - curAttr[key], time);
                    element.style["opacity"] = targetMove / 100;
                }
            }
        }
        else{
            clearInterval(timer);
            for(var key in tarAttr){
                if(key != "opacity"){
                    element.style[key] = attr[key];
                }
                else{
                    element.style["opacity"] = attr["opacity"];
                }
            };

            callFunc && callFunc();
        }

    }, 20);
};

timeMove.now = function(){
    return new Date().getTime();
};

/**
 *
 * @type {{linear: Function, easeIn: Function, easeOut: Function, easeBoth: Function, easeInStrong: Function, easeOutStrong: Function, easeBothStrong: Function, elasticIn: Function, elasticOut: Function, elasticBoth: Function, backIn: Function, backOut: Function, backBoth: Function, bounceIn: Function, bounceOut: Function, bounceBoth: Function}}
 *
 * @param t 当前时间
 * @param b 当前值
 * @param c 目标增量值
 * @param d 总时间
 *
 */
timeMove.Tween = {
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
}