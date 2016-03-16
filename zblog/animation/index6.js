window.onload = function(){

    /*var oF = getId("f");

    oF.onchange = function(e){

        var fileList = e.target.files;

        if(fileList && fileList[0]){

            var file = fileList[0];
            var type = file.type;

            if(type.indexOf("image") != 0){
                return;
            }

            var reader = new FileReader();

            reader.onload = function(e){

                var buff = new Uint8Array(e.target.result);

                var str = "";

                for(var i = 0; i < buff.length; i++){
                    str += String.fromCharCode(buff[i]) + "";
                };

                str = "data:" + type + ";base64," + btoa(str);

                var g = $("<img/>")[0];
                g.src = str;
                document.body.appendChild(g);

            };

            reader.readAsArrayBuffer(file);
        }

    };*/

    var oF = getId("f");

    oF.onchange = function(e){
        var fileList = e.target.files;

        if(fileList && fileList[0]){

            var file = fileList[0];

            var reader = new FileReader();
            reader.onload = function(e){
                console.log(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };



    var oC = getId("c");
    var ctx = oC.getContext("2d");
    var point = {x:-1, y: -1};
    point.toString = function(){
        return "x: " + this.x + "," + "y: " + this.y;
    };

    var isPress = false;

    oC.addEventListener("mousedown", function(e){

        if(!isPress){
            isPress = true;

            point.x = e.offsetX;
            point.y = e.offsetY;
        };

    }, false);

    document.addEventListener("mousemove", function(e){

        if(isPress && e.target === oC){

            var currentX = e.offsetX;
            var currentY = e.offsetY;

            ctx.moveTo(point.x, point.y);
            ctx.lineTo(currentX, currentY);

            ctx.stroke();

            point.x = currentX;
            point.y = currentY;
        }

    }, false);

    document.addEventListener("mouseup", function(){

        isPress = false;

    }, false);

    var oSave = getId("save");

    var url = "";

    oSave.onclick = function(){

        url && URL.revokeObjectURL(url);

        var type = "image/png";
        var database = atob(oC.toDataURL(type).split(",")[1]);
        var buffer = new Uint8Array(database.length);

        if(buffer.length == database.length){

            for(var i = 0; i < database.length; i++){
                buffer[i] = database.charCodeAt(i);
            };

            var blob = new Blob([buffer], {type : type});

            url = URL.createObjectURL(blob);

            var oDown = getId("down");

            oDown.href = url;

        }
        else{
            alert("内存不足!!!");
        }

    };

    var b = btoa(123);
    console.log(b);
};

function getId(id){
    return document.getElementById(id);
};

//Image 继承 HTMLImageElement
//File 继承 Blob
//FileReader URL.createObjectURL
//Image HTMLImageElement Canvas ImageData

//File Blob Image HTMLImageElement Canvas
//ArrayBuffer

