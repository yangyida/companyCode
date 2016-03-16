/**
 * 弹性运动(只支持px)
 *
 * @param      element object(运动元素),
 * @param      type string(运动属性)
 * @param      to string,number(目标位置)
 * @param      calFunc 运动执行完毕回调函数 非必须
 */
var elasticMove = function(element, type, to, calFunc){

    var stop = false;

    var element = element; //obj
    to = parseInt(to); //number

    var speed = 6; //初始速度

    var timer = setInterval(function(){

        if(stop){
            clearInterval(timer);
            return;
        }

        var originalLocation = parseInt(getComputedStyle(element)[type]);//原位置坐标

        var a = (to - originalLocation) / 6; //加速度

        speed += a;

        speed *= 0.85;//速度损耗

        var t = originalLocation + speed;

        element["style"][type] = t + "px";

        //当加速度和速度同时小于1时停止运动
        if(Math.abs(speed) <= 1 && Math.abs(a) <= 1){
            clearInterval(timer);
            element["style"][type] = to + "px";
            calFunc && calFunc();
        }

    }, 20);

    return function(){
        stop = true;
    };
};