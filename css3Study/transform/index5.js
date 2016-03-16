window.onload = function(){

    var oPic = getId("original-pic");

    var oCanvas = document.createElement("canvas");

    var picWidth = oCanvas.width = oPic.width;
    var picHeight = oCanvas.height = oPic.height;

    var ctx = oCanvas.getContext("2d");

    //ctx.translate(picWidth / 2,picHeight / 2);
    //ctx.rotate(180*Math.PI/180);
    //
    //ctx.translate(-picWidth / 2,-picHeight / 2);
    ctx.drawImage(oPic, 0, 0, picWidth, picHeight);

    var imageData = ctx.getImageData(0,0,picWidth, picHeight);

    for(var i = 0; i < imageData.height; i++){

        for(var j = 0; j <= imageData.width * 2; j += 4){

            var a = imageData.data[i*imageData.width*4 + j];
            var b = imageData.data[i*imageData.width*4 + j + 1];
            var c = imageData.data[i*imageData.width*4 + j + 2];
            var d = imageData.data[i*imageData.width*4 + j + 3];

            imageData.data[i*imageData.width*4 + j] = imageData.data[(i+1)*imageData.width*4 - j + 3];
            imageData.data[i*imageData.width*4 + j + 1] = imageData.data[(i+1)*imageData.width*4 - j + 2];
            imageData.data[i*imageData.width*4 + j + 2] = imageData.data[(i+1)*imageData.width*4 - j + 1];
            imageData.data[i*imageData.width*4 + j + 3] = imageData.data[(i+1)*imageData.width*4 - j];

            imageData.data[(i+1)*imageData.width*4 - j + 3] = a;
            imageData.data[(i+1)*imageData.width*4 - j + 2] = b;
            imageData.data[(i+1)*imageData.width*4 - j + 1] = c;
            imageData.data[(i+1)*imageData.width*4 - j] = d;
        }
    };

    ctx.putImageData(imageData,0,0);

    //var imageData = ctx.getImageData(0, 0, picWidth, picHeight);
    //var dw = imageData.width;
    //var dh = imageData.height;

//    for(var i = 0; i < dh; i++){
//
//        getSection(imageData.data, i, dw);
///*
//
//
//        0        ~ 1*dw*4;
//        1*dw*4+1 ~ 2*dw*4;
//        2*dw*4+1 ~ 3*dw*4;*/
//    }



    document.body.appendChild(oCanvas);
};

function getSection(array, start, dw){

    var arr = [];

    if(start == 0){

        for(var i = 0; i <= dw*4; i++){
            arr.push(array[i]);
        }

    }
    else{

        for(var i = start*dw*4+1; i <= (start+1)*dw*4; i++){
            arr.push(array[i]);
        }
    }

    console.log(arr.length);
    return arr;
}

function getId(id){
    return document.getElementById(id);
};