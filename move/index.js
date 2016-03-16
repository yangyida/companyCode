window.onload = function () {

    var oContaint = getId("containt");

    var oShow = getId("show");

    //阻止图片的默认事件
    var imgList = document.getElementsByTagName("img");
    for (var i = 0; i < imgList.length; i++) {

        imgList[i].onmousemove = function (e) {
            e.preventDefault();
        };
    }
    ;

    var isDown = false;

    var curLi = null;

    var originalDownX = -1;

    var timer = null;

    oContaint.onmousedown = function (e) {

        if (!isDown) {
            isDown = true;
            originalDownX = e.clientX;
            curLi = msg(e.target.parentElement);
        }
    };

    document.onmousemove = function (e) {

        if (isDown) {
            var moveX = e.movementX;

            if((moveX > 0 && curLi.hasPrevious) || (moveX < 0 && curLi.hasNext)){
                oShow.style.left = parseInt(getComputedStyle(oShow).left) + moveX + "px";
            }
        }
    };

    document.onmouseup = function (e) {

        timer && timer();

        if (isDown) {
            isDown = false;
            var moveX = originalDownX - e.clientX;

            if (Math.abs(moveX) > 90) {

                if(moveX < 0 && curLi.hasPrevious){

                    timer = elasticMove(
                        oShow,
                        "left",
                        -1 * (curLi.index - 1) * 240
                    );
                }
                else if(moveX > 0 && curLi.hasNext){

                    timer = elasticMove(
                        oShow,
                        "left",
                        -1 * (curLi.index + 1) * 240
                    );
                }

            }
            else {
                timer = elasticMove(
                    oShow,
                    "left",
                    -1 * curLi.index * 240
                );

            }
        }
    };
};

function msg(element) {

    var previousElement = element.previousElementSibling;
    var index = 0;

    while (previousElement) {
        index++;
        previousElement = previousElement.previousElementSibling
    }
    ;

    return {
        index: index,
        hasPrevious: element.previousElementSibling || false,
        hasNext: element.nextElementSibling || false
    };
};

function getId(id) {
    return document.getElementById(id);
};