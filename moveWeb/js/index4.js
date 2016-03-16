//将html的fontSize设置为屏幕宽度的一半
document.documentElement.style.fontSize = document.documentElement.clientWidth / 3 + "px";

window.onload = function(){

   var picBoxElement =  document.getElementById("picBox");

   function initPicBox(){
       for(var i = 0; i < 16; i++){
           var oLi = createImg("img/" + ( i + 1 ) + ".jpg");
           oLi.style.left = (i + 3) % 3 + "rem";
           oLi.style.top = parseInt(i / 3) + "rem";
           picBoxElement.appendChild(oLi);
       }
   }

   //初始化页面
   initPicBox();

   var deleteBtn = getId("delete");
   var choseBtn = getId("chose");

   var chosedItemArr = [];
   var chosed3DItemArr = [];

   choseBtn.addEventListener("touchend", function(){

        if(!choseBtn.isChosing){
            choseBtn.isChosing = true;
            choseBtn.innerHTML = "取消";
        }else{
            choseBtn.isChosing = false;
            choseBtn.innerHTML = "选择";
            deleteBtn.style.display = "none";

            while(chosedItemArr.length){
                (function(){

                    var targetItem = chosedItemArr.pop();
                    var target3DItem = chosed3DItemArr.pop();
                    target3DItem.toggle();
                    setTimeout(function(){
                        targetItem.style.visibility = "";
                        picBoxElement.removeChild(target3DItem);
                    }, 400);

                })();
            }
        }

   }, false);

   picBoxElement.addEventListener("mouseup", function(e){

       if(!choseBtn.isChosing || e.target == this)
            return;

       var targetItem = e.target;

       chosedItemArr.push(targetItem);
       targetItem.style.visibility = "hidden";
       deleteBtn.style.display = "";

       var d3Pic = pic3D.create3DImg(getUrl(targetItem), 1, 1);
       chosed3DItemArr.push(d3Pic);
       d3Pic.style.left = getComputedStyle(targetItem).left;
       d3Pic.style.top = getComputedStyle(targetItem).top;
       picBoxElement.appendChild(d3Pic);

       setTimeout(function(){
           d3Pic.toggle();
       }, 100);

   }, false);

   deleteBtn.addEventListener("touchend", function(){

       while(chosed3DItemArr.length){
           var deleteItem = chosedItemArr.pop();
           picBoxElement.removeChild(deleteItem);
           choseBtn.isChosing = false;
           choseBtn.innerHTML = "选择";
           this.style.display = "none";

           var chosed3DItem = chosed3DItemArr.pop();
           chosed3DItem.an = 0;
           pic3D.setStyle(chosed3DItem,{
                transition: "left 200ms ease-in, top 200ms ease-in 220ms",
                webkitTransition: "left 200ms ease-in, top 200ms ease-in 220ms",
                left : "1.2rem",
                top : "calc(200%)"
           });

           chosed3DItem.addEventListener("webkitTransitionEnd", function(e){
                this.an++;
                if(this.an == 2){
                    picBoxElement.removeChild(this);
                }
           }, false);

           chosed3DItem.addEventListener("transitionEnd", function(e){
               this.an++;
               if(this.an == 2){
                   picBoxElement.removeChild(this);
               }
           }, false);
       }

       setTimeout(function(){

           //重新定位布局
           var cl = picBoxElement.children;
           for(var i = 0; i < picBoxElement.children.length; i++){
               var ol = cl[i];
               ol.style.left = (i + 3) % 3 + "rem";
               ol.style.top = parseInt(i / 3) + "rem";
           }

       }, 500);

   }, false);
}

function getId(id){
    return document.getElementById(id);
}

function createImg(imgSrc){
    var oLi = document.createElement("li");
    var oDiv = document.createElement("div");

    oLi.style.backgroundImage = "url(" + imgSrc + ")";
    oLi.appendChild(oDiv);

    return oLi;
}

/**
 * 获得元素在父元素中的位置
 * @param element
 */
function getIndexOfParent(element){

    var parent = element.parentElement;

    if(!parent){
        return 0;
    }else{
        var childrenList = parent.children;
        for(var i = 0; i < childrenList.length; i++){
            if(childrenList[i] == element){
                return i;
            }
        }
    }
}

function getUrl(targetItem){

    var url = "";

    getComputedStyle(targetItem).backgroundImage.replace(/url\((.+)\)/ig, function(a,b){
        url = b;
    });

    return url;
}