window.onload = function(){

    var oF = getId("f");

    var oC = getId("c");

    oF.onchange = function(e){

        var fileList = e.target.files;

        if(fileList.length > 0){

            var file  = fileList[0];
            if(file.type.indexOf("image") == 0){

                var fileReader = new FileReader();

                fileReader.onload = function(e){

                    getSizeByUrl(e.target.result, function(image, imageWidth, imageHeight){
                        var gct = oC.getContext("2d");
                        oC.width = imageWidth;
                        oC.height = imageHeight;
                        gct.drawImage(image, 0,0,imageWidth, imageHeight);

                    });

                };

                fileReader.readAsDataURL(file);

            }
            else{
                console.log("不是图片文件不做处理!!!");
            }
        }

    };
};

function getSizeByUrl(url, calFunc){

    var image = new Image();

    image.onload = function(){
        calFunc(image, this.naturalWidth, this.naturalHeight);
    };

    image.src = url;
};

function getId(id){
    return document.getElementById(id);
};