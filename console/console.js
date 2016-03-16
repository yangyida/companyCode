/**
 * log
 * @type {}
 */
var EmmConsole = {};

/**
 * 创建一条消息Element
 * @param opt{level, createTime, text};
 * return element
 */
EmmConsole.createMessage = function(opt){

    var oLevel = EmmConsole.createElement(
        {
            name: "span",
            text: opt.level,
            style: {
                    display: "inline-block",
                    lineHeight: "22px",
                    padding: "0px 6px"
                   }
        }
    );

    var oTime = EmmConsole.createElement(
        {
            name: "span",
            text: opt.createTime,
            style: {
                    display: "inline-block",
                    lineHeight: "22px",
                    padding: "0px 6px"
                   }
        }
    );

    var oMessage = EmmConsole.createElement(
        {
            name: "span",
            text: opt.text,
            style: {
                    display: "inline-block",
                    lineHeight: "22px",
                    padding: "0px 6px"
                   }
        }
    );

    var o = EmmConsole.createElement({name: "div", style: {whiteSpace: "nowrap"}});
    o.appendChild(oLevel);
    o.appendChild(oTime);
    o.appendChild(oMessage);

    return o;
};

/**
 * 创建Element
 * @param opt {name, text, style(object)}
 * return element
 */
EmmConsole.createElement = function(opt){

    var dom = document.createElement(opt.name);
    var $dom = $(dom);

    if(opt.style){
        $dom.css(opt.style);
    };

    if(opt.name){
        $dom.text(opt.text);
    }

    return dom;
};

/**
 * 设置元素样式
 * @param element
 * @param style object
 */
EmmConsole.setStyle = function(element, style){

    $(element).css(style);
};

EmmConsole.EmmConsole = function(opt){

    var This = this;

    This.opt = {
        isShow : opt.isShow, //是否展示 boolean
        src : opt.src //请求地址
    };

    This._timestamp = 0; //时间戳
    This._isLoaded = false; //是否加载完成

    This.$content = null; //主体界面
    This.$main = null; //消息页面
    This.$show = null; //展示页面
    This.$hide = null; //隐藏页面
    This.$head = null; //head
    This.$rightLine = null;//右边框
    This.$bottomLine = null;//下边框
    This.$clearMain = null;//清楚消息
    This.$logFilter = null;//选择信息类型
};

EmmConsole.EmmConsole.prototype = {
    constructor : EmmConsole.EmmConsole,

    /**
     * 启动轮询(该方法在实例化对象时调用且只能调用一次)
     * @private
     */
    _startRequest : function(){

        var This = this;

        setInterval(function(){

            This._request();

        }, 10000);

    },

    _request : function(){

        var This = this;

        extendX.emmAjax(
            {
                url : This.opt.src,
                data : {
                    timestamp : This.timestamp
                },
                async : true,
                contentType : "utf-8",
                dataType : "json",
                timeout : 10000,
                error : function(){

                },
                success : function(data){

                }
            }
        );
    },

    /**
     * 展示关闭页面
     * @param isShow boolean
     * @private
     */
    showPage : function(isShow){

        var This = this;

        if(!This._isLoaded)
            return;

        if(isShow){
            This.$content.show(0);
            This.$show.hide(0);
        }
        else{
            This.$content.hide(0);
            This.$show.show(0);
        }
    },

    /**
     * 初始化页面
     */
    init : function(){

        var This = this;

        $.get("../console/view/page.html", function(page){

            //加载完成
            This._isLoaded = true;

            //将页面添加到主页面
            var $page = $(page);
            $(document.body).append($page);

            var $document = $(document);
            This.$content = $document.find(".console-containt");
            This.$head = $document.find(".console-head");
            This.$main = $document.find(".console-main");
            This.$show = $document.find(".console-minimize");
            This.$hide = $document.find(".console-hide");
            This.$rightLine = $document.find(".console-right-line");
            This.$bottomLine = $document.find(".console-bottom-line");
            This.$clearMain = $document.find(".console-clear-main");
            This.$logFilter = $document.find(".console-log-filter");

            //展示页面
            This.showPage(This.opt.isShow);

            //展示隐藏事件
            This.$show.click(This._showEvent());
            This.$hide.click(This._hideEvent());
            //窗口拖动事件
            This.$head[0].addEventListener("mousedown", This._headMousedownEvent(),false);
            //窗口拉伸事件
            This.$rightLine[0].addEventListener("mousedown", This._linearDownEvent("right"), false);
            This.$bottomLine[0].addEventListener("mousedown", This._linearDownEvent("bottom"), false);
            //清空消息事件
            This.$clearMain.click(function(){
                This.clearMessage();
            });

            //启动轮询
            This._startRequest();
        });

    },

    /**
     * 边框按下事件
     * @param type  right/bottom
     * @returns {Function}
     * @private
     */
    _linearDownEvent : function(type){

        var This = this;

        return function(e){

            var moveEvent = This._linearMoveEvent(type);

            document.addEventListener("mousemove", moveEvent, false);
            document.addEventListener("mouseup", This._linearUpEvent(moveEvent), false);
        };
    },

    /**
     * 边框拖动事件
     * @param type
     * @returns {Function}
     * @private
     */
    _linearMoveEvent : function(type){

        var This = this;
        var $main = This.$main;
        var oMain = $main[0];

        return function(e){

            e.preventDefault();

            switch(type){
                case "right" :
                    EmmConsole.setStyle(oMain, {width: parseInt($main.css("width")) + e.movementX + "px"});
                    break;
                case "bottom" :
                    EmmConsole.setStyle(oMain, {height: parseInt($main.css("height")) + e.movementY + "px"});
                    break;
            };

        };
    },

    /**
     * 边框释放事件
     * @param moveFunc
     * @returns {Function}
     * @private
     */
    _linearUpEvent : function(moveFunc){

        return function(e){
            document.removeEventListener("mousemove", moveFunc, false);
            document.removeEventListener("mouseup", arguments.callee, false);
        };
    },

    /**
     * 展示事件
     * @returns {Function}
     * @private
     */
    _showEvent : function(){

        var This = this;

        return function(e){
            This.showPage(true);
        };
    },

    /**
     * 隐藏事件
     * @returns {Function}
     * @private
     */
    _hideEvent : function(){

        var This = this;

        return function(e){
            This.showPage(false);
        };
    },

    /**
     * 添加信息
     * @param opt{level, createTime, text};
     */
    addMessage : function(opt){

        var This = this;

        if(!This._isLoaded)
            return;

        var This = this;

        var m = EmmConsole.createMessage(
            {
                level: opt.level,
                createTime: opt.createTime,
                text: opt.text
            }
        );

        This.$main.append(m);

    },

    /**
     * 清空消息
     */
    clearMessage : function(){

        var This = this;

        This.$main.html("");

    },

    /**
     * 鼠标按下head事件
     * @private
     */
    _headMousedownEvent : function(){

        var This = this;

        return function(e){

            if(e.target == This.$logFilter[0] || e.target == This.$clearMain[0] || e.target == This.$hide[0]){
                return;
            }

            var fx = e.offsetX;
            var fy = e.offsetY;

            var moveEvent = This._headMousemoveEvent(fx, fy);
            var upEvent = This._headMouseupEvent(moveEvent);

            document.addEventListener("mousemove", moveEvent, false);
            document.addEventListener("mouseup", upEvent, false);
        }
    },

    /**
     * 拖动事件
     * @private
     */
    _headMousemoveEvent : function(fx, fy){

        var This = this;

        return function(e){

            EmmConsole.setStyle(
                This.$content[0],
                {
                    left: e.clientX - fx,
                    top: e.clientY - fy
                }
            );

        }
    },

    /**
     * 鼠标弹起事件
     * @private
     */
    _headMouseupEvent : function(moveEvent){

        var This = this;

        return function(){
            document.removeEventListener("mousemove", moveEvent, false);
            document.removeEventListener("mouseup", arguments.callee, false);
        };
    }
};


