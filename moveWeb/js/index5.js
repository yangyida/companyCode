window.onload = function(){

    o = create3DImg("img/1.jpg", 30, 30);

    document.body.appendChild(o);
}

/**
 * 创建一个3D图片
 * @param imgSrc
 */
function create3DImg(imgSrc, stageWidth, stageHeight){

    var itemArr = [];

    //舞台元素
    var stageElement = createElement("div", {
        position: "absolute",
        left : "400px",
        top : "200px",
        width : stageWidth + "rem",
        height : stageHeight + "rem",
        transform : "translateX(-" + stageWidth / 10 + "rem)"
    });

    var parent = stageElement;

    for(var i = 0; i < 10; i++){
        var son = createElement("div", {
            position : "absolute",
            left : stageWidth / 10 + "rem",
            top : 0,
            backgroundImage : "url('" + imgSrc + "')",
            backgroundRepeat : "no-repeat",
            backgroundSize : "cover",
            backgroundPosition : stageWidth / 10 * i * -1  + "rem 0",
            width : stageWidth / 10 + "rem",
            height : stageHeight + "rem",
            transformStyle: "preserve-3d",
            transformOrigin: "50% 80%",
            transform : "rotateY(0deg) rotateX(0deg)",
            transition: "transform 400ms ease-out, left 200ms ease-out"
        });

        itemArr.push(son);

        parent.appendChild(son);

        parent = son;
    }

    var isShow = true;

    function toggle(){
        if(isShow){
            isShow = false;
            for(var i = 0; i < itemArr.length; i++){

                if(i == 0){
                    setStyle(itemArr[0], {
                        left : "50%"
                    })
                }

                setStyle(itemArr[i], {
                    transform : "rotateY(-36deg) rotateX(5deg)",
                    webkitTransform : "rotateY(-36deg) rotateX(5deg)"
                });
            }
        }else{
            isShow = true;
            for(var i = 0; i < itemArr.length; i++){

                if(i == 0){
                    setStyle(itemArr[0], {
                        left : "0"
                    })
                }

                setStyle(itemArr[i], {
                    transform : "rotateY(0deg) rotateX(0deg)",
                    webkitTransform : "rotateY(0deg) rotateX(0deg)"
                });
            }
        }
    }

    stageElement.toggle = toggle;

    return stageElement;
}

/**
 * 创建元素
 * @param tagName
 * @param styleObject
 */
function createElement(tagName, styleObject){

    var o = document.createElement(tagName);

    if(styleObject){
        for(var key in styleObject){
            o["style"][key] = styleObject[key];
        }
    }

    return o;
}

function setStyle(element, styleObject){
    for(var key in styleObject){
        element["style"][key] = styleObject[key];
    }
}