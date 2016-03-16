window.onload = function(){

    var oF = getId("f");
    var oBox = getId("box");

    function appendImage(isImage, base64){
        if(isImage){
            var oImg = getImg(base64);
            oBox.appendChild(oImg);
        }
    };

    oF.onchange = function(){
        var fileList = this.files;

        oBox.innerHTML = "";

        if(fileList.length){

            for(var i = 0; i < fileList.length; i++){
                getBase64fromImageFile(fileList[i], appendImage);
            }

        };
    };
};

function getBase64fromImageFile(file, calFunc){

    var type = file.type;

    if(type.indexOf("image") == 0){

        var reader = new FileReader();

        reader.onload = function(e){
            calFunc(true, e.target.result);
            reader.onload = null;
            reader = null;
        };

        reader.readAsDataURL(file);

    }
    else{
        calFunc(false);
    }

};

function getId(id){
    return document.getElementById(id);
};

function getImg(src){
    var oImg = document.createElement("img");
    oImg.src = src;
    return oImg;
};