/**
 * 滑屏滚动插件（用于移动端）
 *
 */

var SlicePlate = {};

/**
 * 实例化组件
 * @param elementId 元素ID string
 * @param itemArr 展示项数组 array[string]
 */
SlicePlate.init = function(elementId, itemArr){

    //目标元素
    this.boxElement = document.getElementById(elementId);
    //展示项数组内容
    this.itemArr = itemArr;
    //当前显示项
    this.currentItem = 0;

    //容器元素
    this.ulElement = null;
    //展示项
    this.liArr = [];

    this._init();
}

SlicePlate.init.prototype = {
    constructor : SlicePlate.init,

    /**
     * 初始化组件
     * @private
     */
    _init : function(){

        var This = this;

        SlicePlate.setStyle(This.boxElement, {
           width: "100%",
           overflow: "hidden"
        });

        //初始化容器元素ul
        This.ulElement = SlicePlate.createElement("ul", {
            position: "relative",
            left : "0%",
            width: "100%"
        });

        //初始化展示项
        for(var i = 0; i < This.itemArr.length; i++){
            var o = SlicePlate.createElement("li", {
                listStyle : "none",
                width: "100%",
                position : "absolute",
                top : "0",
                left : i * 100 + "%"
            });
            o.innerHTML = This.itemArr[i];
            This.liArr.push(o);
        }

        var firstE = This.liArr[0].cloneNode(true);
        SlicePlate.setStyle(firstE, {
            left : This.liArr.length * 100 + "%"
        });

        var lastE = This.liArr[This.liArr.length - 1].cloneNode(true);
        SlicePlate.setStyle(lastE, {
            left : "-100%"
        });

        This.liArr.push(firstE);
        This.liArr.unshift(lastE);

        //将li塞进ul
        for(var i = 0; i < This.liArr.length; i++){
            This.ulElement.appendChild(This.liArr[i]);
        }

        //将ul塞进boxElement
        This.boxElement.appendChild(This.ulElement);

        //用于确定targetElement的高度
        setTimeout(function(){

            This.boxElement.style.height = getComputedStyle(firstE).height;

        }, 200);

        //以下给ul绑定触摸事件
        var touchEvt = This._touchEvt();
        This.ulElement.addEventListener("touchstart", touchEvt.startEvt , false);
        This.ulElement.addEventListener("touchmove", touchEvt.moveEvt, false);
        This.ulElement.addEventListener("touchend", touchEvt.endEvt, false);

        This.ulElement.addEventListener("mousedown", function(e){
            e.preventDefault();
            return false;
        }, false);

        This.ulElement.addEventListener("mouseup", function(e){
            e.preventDefault();
            return false;
        }, false);
    },

    /**
     * 触摸开始事件
     * @returns {Function}
     * @private
     */
    _touchEvt : function(){

        var This = this;
        var ulElement = This.ulElement;

        var half = document.documentElement.clientWidth / 2;//屏幕宽度的一半
        var initLeft = 0;
        var startClientX = 0;
        var endClientX = 0;

        var isAction = false;
        var flag = true;


        var startEvt = function(e){

            if(!flag){
                return;
            }

            startClientX = e.changedTouches[0].pageX;
            initLeft = parseInt(getComputedStyle(ulElement).left);

            if(initLeft % 100 == 0){
                initLeft = initLeft / 100 * half * 2 ;
            }

            log.innerHTML = initLeft;
        }
        var log = document.getElementById("log");////////////////////
        var moveEvt = function(e){

            if(!flag){
                return;
            }

            e.preventDefault();
            endClientX = e.changedTouches[0].pageX;
            var partDistance = endClientX - startClientX;
            var number = initLeft + partDistance;

            if(This.currentItem == -1 && partDistance > 0){
                isAction = false;
                return;
            }else if(This.currentItem == This.liArr.length - 2 && partDistance < 0){
                isAction = false;
                return;
            }

            isAction = true;
            //log.innerHTML = number;
            ulElement.style.left = number + "px";
        }

        var endEvt = function(e){

            if(!isAction || !flag){
                return;
            }

            flag = false;

            //滚动的距离
            var scollPart = endClientX - startClientX;

            //当拉动过半展示新图
            if(Math.abs(scollPart) > half){
                //向左拉
                if(scollPart < 0)
                    This.currentItem++;
                else
                    This.currentItem--;
            }

            //触发滚动
            SlicePlate.setStyle(ulElement, {
                left : This.currentItem * -100 + "%",
                transition: "left 180ms ease-out",
                webkitTransition: "left 180ms ease-out"
            });

            setTimeout(function(){

                SlicePlate.setStyle(ulElement, {
                    transition: "",
                    webkitTransition: ""
                });

                setTimeout(function(){

                    if(This.currentItem == -1){
                        SlicePlate.setStyle(ulElement, {
                            left : (This.liArr.length - 3) * -100 + "%"
                        });
                        This.currentItem = This.liArr.length - 3;
                    }else if(This.currentItem == This.liArr.length - 2){

                        SlicePlate.setStyle(ulElement, {
                            left : "0%"
                        });
                        This.currentItem = 0;
                    }

                    flag = true;

                }, 30);

            }, 200);

            startClientX = 0;
            endClientX = 0;
            initLeft = 0;
        }

        return {
            startEvt : startEvt,
            moveEvt : moveEvt,
            endEvt : endEvt
        };
    }
}

/**
 * 创建元素
 * @param elementName 元素名 string
 * @param styles 样式 object
 */
SlicePlate.createElement = function(elementName, styles){

    var o = document.createElement(elementName);

    styles && (SlicePlate.setStyle(o, styles));

    return o;
}

/**
 * 修改元素样式
 * @param element 元素 object
 * @param styles  样式 object
 */
SlicePlate.setStyle = function(element, styles){

    for(var key in styles){
        element["style"][key] = styles[key];
    }
}