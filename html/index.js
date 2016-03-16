ready(
    function(){
        var oBox = document.getElementById("box");
        //o = oBox.getBoundingClientRect();

        mi = new MyInterval();

        var jishi = function(){
            if(!arguments.callee.num){
                arguments.callee.num = 0;
            }

            if(document.hasFocus()){
                oBox.innerHTML = arguments.callee.num++;
                console.log("---window获得焦点---");
            }
            else{
                console.log("---window没有获得焦点---");
            }

        };

        mi.start(jishi);
    }
);

var MyInterval = function(){

    this.t = null; // 计时器id
    this.state = 0; //计时器状态 0:未启动 1:正在运行 2:暂停
};

MyInterval.prototype = {

    constructor : MyInterval,

    start : function(calBack){

        if(this.state == 0){

            this.state = 1;

            this.t = setInterval(function(){
                if(calBack){
                    calBack();
                }
            }, 1000);

        }
        else{
            console.log("计时器已启动");
        }


    },

    reset : function(calBack){

        if(this.state != 0){
            clearInterval(this.t);
            this.t = null;
            this.state = 0;
            if(calBack){
                calBack();
            }
        }
        else{
            console.log("计时器没有启动");
        }
    },

    pause : function(calBack){

        if(this.state == 1){
            this.state = 2;
            clearInterval(this.t);
            if(calBack){
                calBack();
            }
        }
        else{
            console.log("计时器没有运行");
        }
    },

    restart : function(calBack){

        if(this.state == 2){

            this.t = setInterval(function(){

                if(calBack){
                    calBack();
                }

            }, 1000);

        }
        else{
            console.log("计时器没有暂停");
        }
    }
};