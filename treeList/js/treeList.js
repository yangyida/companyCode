/**
 * 树形菜单
 * @param object {
 *                  element,
 *                  linkHref string 导入css的路径
 *               }
 * @constructor
 */
var TreeList = function(opt){

    this.opt = {
        element : opt.element,
        linkHref : opt.linkHref,
        hasCheckBox : opt.hasCheckBox,
        calFunc : opt.calFunc
    };
};

TreeList.getParent = function(element, nodeName){

    var parentElement = element.parentElement;

    while(parentElement){

        if(parentElement.nodeName.toLocaleLowerCase() == nodeName.toLocaleString()){
            return parentElement;
        }

        parentElement = parentElement.parentElement;
    };

    return parentElement;

};

TreeList.prototype = {

    constructor : TreeList,

    /**
     * 初始化树形菜单
     */
    init : function(data){

        //导入样式
        this._importCss();
        this.opt.element.classList.add("treeListMain");
        this.refleashData(data);
    },

    refleashData : function(data, parentElement){

        var This = this;

        if(data instanceof Array && data.length > 0){

            parentElement || (parentElement = this.opt.element);
            var oUl = document.createElement("ul");
            parentElement.appendChild(oUl);

            for(var i = 0; i < data.length; i++){

                var oLi = document.createElement("li");

                var oP = document.createElement("p");
                var oSpan = document.createElement("span");
                if(this.opt.hasCheckBox){
                    var oInput = document.createElement("input");
                    oInput.type = "checkbox";

                    oInput.onchange = function(){

                        var parentLi = this.parentElement.parentElement;
                        var checkList = parentLi.querySelectorAll("input");
                        var flag = false;

                        if(this.checked){
                            flag = true;
                            for(var i = 0; i < checkList.length; i++){
                                checkList[i].checked = flag;
                            };

                            var pLi = TreeList.getParent(parentLi, "li");

                            while(pLi){
                                var allInput = pLi.querySelectorAll("input");

                                var t = pLi.querySelector("p>input");

                                for(var i = 0 ; i < allInput.length; i++){
                                    if(allInput[i] != t && allInput[i].checked == false){
                                        return;
                                    }
                                };

                                t.checked = true;

                                pLi = TreeList.getParent(pLi, "li");
                            }
                        }
                        else{
                            flag = false;
                            for(var i = 0; i < checkList.length; i++){
                                checkList[i].checked = flag;
                            };

                            var pLi = TreeList.getParent(parentLi, "li");

                            while(pLi){

                                var t = pLi.querySelector("p>input");

                                t.checked = false;

                                pLi = TreeList.getParent(pLi, "li");
                            }
                        }
                    };

                    oP.appendChild(oInput);
                };
                oP.appendChild(oSpan);

                oLi.appendChild(oP);

                oSpan.innerHTML = data[i].name;

                oUl.appendChild(oLi);

                //若canList为true 则存在子目录
                if(data[i].canList){
                    //目录logo
                    oSpan.classList.add("bg-folder");

                    //目录开关按钮
                    var oA = document.createElement("a");
                    oA.classList.add("showList");
                    oLi.appendChild(oA);

                    (function(oLi, name, canList, msg){

                        oA.onclick = oSpan.onclick = function(e){

                            if(e.type == "click"){

                                This.opt.calFunc && This.opt.calFunc(name, canList, msg);

                            };

                            if(oLi.classList.contains("li-bg-top-open")){
                                oLi.classList.remove("li-bg-top-open");
                                oLi.classList.add("li-bg-top-close");

                                oSpan.classList.remove("bg-folder");
                                oSpan.classList.add("bg-folder-closed");

                                oLi.children[2].style.display = "none";
                            }
                            else if(oLi.classList.contains("li-bg-top-close")){
                                oLi.classList.remove("li-bg-top-close");
                                oLi.classList.add("li-bg-top-open");

                                oSpan.classList.remove("bg-folder-closed");
                                oSpan.classList.add("bg-folder");

                                oLi.children[2].style.display = "";
                            }
                            else if(oLi.classList.contains("li-bg-bottom-open")){
                                oLi.classList.remove("li-bg-bottom-open");
                                oLi.classList.add("li-bg-bottom-close");

                                oSpan.classList.remove("bg-folder");
                                oSpan.classList.add("bg-folder-closed");

                                oLi.children[2].style.display = "none";
                            }
                            else if(oLi.classList.contains("li-bg-bottom-close")){
                                oLi.classList.remove("li-bg-bottom-close");
                                oLi.classList.add("li-bg-bottom-open");

                                oSpan.classList.remove("bg-folder-closed");
                                oSpan.classList.add("bg-folder");

                                oLi.children[2].style.display = "";
                            };

                        };

                    })(oLi, data[i].name, data[i].canList, data[i].msg);

                    if(i < data.length - 1){
                        oLi.classList.add("li-bg-top-open");
                    }
                    else{
                        oLi.classList.add("li-bg-bottom-open");
                    }

                    this.refleashData(data[i].list, oLi);
                }
                else{
                    //文件logo
                    oSpan.classList.add("bg-file");

                    if(i < data.length - 1){
                        oLi.classList.add("li-bg-top-general");
                    }
                    else{
                        oLi.classList.add("li-bg-bottom-general");
                    }

                }
            }

        }
    },

    /**
     * 导入样式，init时候用到
     * @private
     */
    _importCss : function(){

        //判断样式是否已存在页面,若存在则跳过以后操作
        var headChildrenList = document.head.children;

        for(var i = 0; i < headChildrenList.length; i++){
            if(headChildrenList[i].dataset["YDTreelistStyle"]){
                return;
            }
        };

        var linkElement = document.createElement("link");
        linkElement.href = "style/main.css";
        linkElement.rel = "stylesheet";
        linkElement.type = "text/css";
        linkElement.dataset["YdTreelistStyle"] = "YDtreeListStyle";
        document.head.appendChild(linkElement);
    }
};