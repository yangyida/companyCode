/**
 * 碰撞运动
 * @param element object 元素节点
 * @param speed object {
 *                         x, x轴速度
 *                         y, y轴速度
 *                      }
 * @param confine object {
 *                          left, 坐边界
 *                          top,  上边界
 *                          right, 右边界
 *                          bottom, 下边界
 *                        }
 */
var impactMove = function(element, speed, confine){

    var xSpeed = speed.x;
    var ySpeed = speed.y;

    var leftConfine = confine.left;
    var topConfine = confine.top;
    var rightConfine = confine.right;
    var bottomConfie = confine.bottom;

    var elementWidth =  element.offsetWidth;
    var elementHeight = element.offsetHeight;

    var els = element.style;

    var timer = setInterval(function(){

        var currentLeft = parseInt(getComputedStyle(element).left);
        var currentTop = parseInt(getComputedStyle(element).top);
        var toLeft = currentLeft + xSpeed;
        var toTop = currentTop + ySpeed;

        if(toTop + elementHeight >= bottomConfie){
            toTop = bottomConfie - elementHeight;
            ySpeed *= -1;
            ySpeed *= 0.85;

            if(Math.abs(ySpeed) <= 1){
                clearInterval(timer);
            }
        }
        else if(toTop <= topConfine){
            toTop = topConfine;
            ySpeed = Math.abs(ySpeed);
            ySpeed *= 0.85;

            if(Math.abs(ySpeed) <= 1){
                clearInterval(timer);
            }
        }

        if(toLeft + elementWidth >= rightConfine){
            toLeft = rightConfine - elementWidth;
            xSpeed *= -1;
            xSpeed *= 0.85;

            if(Math.abs(xSpeed) <= 1){
                clearInterval(timer);
            }
        }
        else if(toLeft <= leftConfine){
            toLeft = leftConfine;
            xSpeed = Math.abs(xSpeed);
            xSpeed *= 0.85;

            if(Math.abs(xSpeed) <= 1){
                clearInterval(timer);
            }
        }

        els.left = toLeft + "px";
        els.top = toTop + "px";

    }, 20);
};