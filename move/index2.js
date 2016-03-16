window.onload = function(){

    setInterval(function(){

        d();

    }, 200);

    function d(){

        var ySpeed = -2 * getRandom(20,40);
        var xSpeed = (Math.random() < 0.5 ? -1 : 1) * getRandom(20,40);

        var element = getBox();
        document.body.appendChild(element);
        freeFallMove(
            element,
            {
                bottom: document.documentElement.clientHeight,
                top: 0,
                left: 0,
                right: document.documentElement.clientWidth
            },
            xSpeed,
            ySpeed
        );

        setTimeout(function(){

            document.body.removeChild(element);

        }, 5000);

    };

    /*var oBox = getId("box");

    var isDown = false;

    var preX = -1;
    var preY = -1;
    var curX = -1;
    var curY = -1;

    oBox.onmousedown = function(e){

        if(!isDown){
            isDown = true;
            curX = e.pageX;
            curY = e.pageY;
        }
    };

    document.onmousemove = function(e){

        if(isDown){
            setStyle(
                oBox,
                {
                    left : e.pageX + "px",
                    top : e.pageY + "px"
                }
            );
            preX = curX;
            preY = curY;
            curX = e.pageX;
            curY = e.pageY;
        }
    };

    document.onmouseup = function(){
        if(isDown){

           isDown = false;
           freeFallMove(
               oBox,
               {
                   bottom: document.documentElement.clientHeight,
                   top: 0,
                   left: 0,
                   right: document.documentElement.clientWidth
               },
               curX - preX,
               curY - preY
           );
        }
    };*/
};

function getId(id){
    return document.getElementById(id);
};

function setStyle(element, styles){

    for(var key in styles){
        element["style"][key] = styles[key];
    }
};

function createElement(str, styles){
    var element = document.createElement(str);
    styles && setStyle(element, styles);
    return element;

};

function getBox(){
    var element = createElement(
        "div",
        {
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "16px",
            height: "16px",
            borderRadius: "8px",
            backgroundColor : "rgb("+getRandom(0, 255)+", "+getRandom(0, 255)+", "+getRandom(0, 255)+")"
        }
    );

    return element;
};

function getRandom(min, max){
    return parseInt(Math.random()*(max-min+1)+min);
};