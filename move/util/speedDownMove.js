/**
 * 减速运动
 * @param element 元素节点 object
 * @param type    运动属性 string
 * @param to      目标位置 number, string
 * @param calFunc 回调函数 Function
 */
var speedDownMove = function(element, type ,to ,calFunc){

    to = parseInt(to);

    var speed = -1;

    var timer = setInterval(function(){

        var originalLocation = parseInt(getComputedStyle(element)[type]);

        if(originalLocation >= to){
            clearInterval(timer);
            element["style"][type] = to + "px";
            calFunc && calFunc();
            return;
        };

        speed = Math.ceil((to - originalLocation) / 6);

        element["style"][type] = originalLocation + speed + "px";


    }, 20);
};