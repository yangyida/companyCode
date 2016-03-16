window.onload = function(){

    var oF = getId("f");

    oF.onchange = function(e){
        var fileList = e.target.files;

        if(fileList.length > 0){

            var file = fileList[0];

            saveInfo1(file);
        };
    };
};

/**
 * 在浏览器窗口显示图片
 * @param base64
 */
function saveInfo1(file){

    getImageFileMessage(file, function(isImage, msg){

        if(isImage){

            controlImageByBase64(msg.data, function(dataURL){
                var w = window.open("about:blank");
                var image = new Image();
                image.src = dataURL;
                w.document.body.appendChild(image);
            });

        }
        else{
            console.log("不是图片文件不做处理~~~");
        }
    });
};

/**
 * 下载图片
 */
function saveInfo2(file){

    getImageFileMessage(file, function(isImage, msg){

        if(isImage){

            controlImageByBase64(msg.data, function(dataURL){
                dataURL = dataURL.replace(file.type, "image/octet-stream");
                window.location.href = dataURL;
            });

        }
        else{
            console.log("不是图片文件不做处理~~~");
        }
    });
}

/**
 * 对base64进行处理
 * @param base64
 */
function controlImageByBase64(base64, calFunc){

    var type = base64.split(";")[0].split(":")[1];

    var image = new Image();

    image.onload = function(){

        var canvas = document.createElement("canvas");

        var width = canvas.width = this.naturalWidth;
        var height = canvas.height = this.naturalHeight;

        canvas.getContext("2d").drawImage(this, 0, 0, width, height);

        var imageData = canvas.getContext("2d").getImageData(0,0,width, height);

        console.log(imageData);
        console.log(imageData.data.length);

        for(var i = 0; i < imageData.data.length; i+=4){
            imageData.data[i] = 255 - imageData.data[i];
            imageData.data[i + 1] = 255 - imageData.data[i + 1];
            imageData.data[i + 2] = 255 - imageData.data[i + 2];
        };

        canvas.getContext("2d").putImageData(imageData,0,0);

        var dataURL = canvas.toDataURL(type);

        calFunc(dataURL);

        image.onload = null;
        image = null;
    };

    image.src = base64;
};

/**
 * @param file
 * @param calFunc
 */
function getImageFileMessage(file, calFunc){

    var data = {};

    var type = file.type;
    data.fileType = type;

    if(type.indexOf("image") == 0){

        var name = file.name;
        data.fileName = name;

        var fileReader = new FileReader();

        fileReader.onload = function(e){
            data.data = e.target.result;
            calFunc(true, data);
            fileReader.onload = null;
            fileReader = null;
        };

        fileReader.readAsDataURL(file);
    }
    else{
        calFunc(false);
    }

};

function log(o){
    console.log(o);
};

function getId(id){
    return document.getElementById(id);
};

//1 图片下载 get
//2 ImageData 处理图片 get
//3 File Blob  File继承Blob
//4 ajax接收二进制数据