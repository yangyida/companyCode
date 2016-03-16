/**
 * 加速运动(只支持px)
 * @param element 元素节点 object
 * @param type    运动属性 string
 * @param to      目标位置 number, string
 * @param calFunc 回调函数 Function
 */
var speedUpMove = function(element, type, to, calFunc){

    var speed = 8; //初始速度

    to = parseInt(to);

    var timer = setInterval(function(){

        var originalLocation = parseInt(getComputedStyle(element)[type]);

        if(originalLocation >= to){
            clearInterval(timer);
            element["style"][type] = to + "px";
            calFunc && calFunc();
            return;
        }

        speed += 8;

        element["style"][type] = originalLocation + speed + "px";

    }, 20);

};