window.onload = function(){

    var oBtn = getId("btn");
    var oBox = getId("box");

    var isPlay = true;

    oBtn.onclick = function(){

        if(isPlay){
            isPlay = false;
            oBtn.innerHTML = "暂停";
            oBox.classList.add("stop");
        }
        else{
            isPlay = true;
            oBtn.innerHTML = "播放";
            oBox.classList.remove("stop");
        }
    };

    img = document.createElement("img");
};

function getId(id){
    return document.getElementById(id);
};