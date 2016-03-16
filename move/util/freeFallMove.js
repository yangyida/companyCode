/**
 * 自由落体运动
 * @param element 元素
 * @param confine 边界限制 {
 *                        bottom,
   *                      right,
   *                      left,
   *                      top
 *                       }
 * @param xSpeed x轴初始速度
 * @param ySpeed y轴初始速度
 *
 */
var freeFallMove = function(element, confine, xSpeed, ySpeed){

    var elementHeight = element.offsetHeight;
    var elementWidth = element.offsetWidth;

    var g = 10; //y轴加速度
    xSpeed = parseInt(xSpeed) || 0;
    ySpeed = parseInt(ySpeed) || 0;

    var bottomConfine = parseInt(confine.bottom);
    var rightConfine = parseInt(confine.right);
    var leftConfine = parseInt(confine.left);
    var topConfine = parseInt(confine.top);

    var timer = setInterval(function(){

        if(xSpeed == 0 && ySpeed == 0){
            clearInterval(timer);
            return;
        }

        var originalTop = parseInt(getComputedStyle(element).top);
        ySpeed = ySpeed + g;
        var toTop = originalTop + ySpeed;

        var originalLeft = parseInt(getComputedStyle(element).left);
        var toLeft = originalLeft + xSpeed;

        if(ySpeed != 0){
            if(toTop + elementHeight > bottomConfine){
                toTop = bottomConfine - elementHeight;
                ySpeed *= -1;
                ySpeed *= 0.85;
                xSpeed *= 0.85;

                if(Math.abs(ySpeed) <= g){
                    ySpeed = 0;
                    toTop = bottomConfine - elementHeight;
                }
            }
            else if(toTop < topConfine){
                toTop = 0;
                ySpeed *= -1;
                ySpeed *= 0.85;
                xSpeed *= 0.85;
            }


        }

        if(xSpeed != 0){
            if(toLeft + elementWidth > rightConfine){
                toLeft = rightConfine - elementWidth;
                xSpeed *= -1;
                xSpeed * 0.85;
                ySpeed *= 0.85;
            }
            else if(toLeft < leftConfine){
                toLeft = 0;
                xSpeed *= -1;
                xSpeed * 0.85;
                ySpeed *= 0.85;
            }

            if(Math.abs(xSpeed) <= 1){
                xSpeed = 0;
            }
        }

        element.style.top = toTop + "px";
        element.style.left = toLeft + "px";

    }, 40);
};