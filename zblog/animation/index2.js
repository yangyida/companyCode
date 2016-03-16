window.onload = function(){

    oImg = getId("img");
    var oBtn = getId("btn");

    var ig = new MyImage(oImg);

    var isStop = false;

    oBtn.onclick = function(){

        if(isStop){
            ig.play();
            isStop = false;
            this.innerHTML = "暂停";
        }
        else{
            ig.stop();
            isStop = true;
            this.innerHTML = "播放";
        }

    };
};

function getId(id){
    return document.getElementById(id);
};

var MyImage = function(element){

    if(element.constructor != HTMLImageElement){
        throw new Error(element + " 不是 HTMLImageElement 对象!!!");
    }

    this.isPlay = true;
    this.oImg = element;
    this.originalLocation = element.src;
    this.canvas = null;
};

MyImage.prototype = {

    constructor : MyImage,

    play : function(){

        if(this.isPlay){
            return
        };

        this.isPlay = true;

        if(this.oImg.previousElementSibling == this.canvas){
            this.oImg.parentElement.removeChild(this.canvas);
        }

        this.oImg.style.display = "";
        this.oImg.src = this.originalLocation;

    },

    stop : function(){

        if(!this.isPlay){
            return;
        }

        this.isPlay = false;

        if(!this.canvas){

            this.canvas = document.createElement("canvas");

            this.canvas.height = this.oImg.height;
            this.canvas.width = this.oImg.width;

            this.canvas.getContext("2d").drawImage(this.oImg, 0, 0, this.canvas.width, this.canvas.height);

        }

        try{
            this.oImg.src = this.canvas.toDataURL("image/gif");
        }catch(e){
            //跨域
            this.oImg.src = "";
            this.oImg.parentElement.insertBefore(this.canvas, this.oImg);
            this.oImg.style.display = "none";
        }
    }
};

// HTMLImageElement Image Canvas ImageData
