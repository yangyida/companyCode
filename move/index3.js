window.onload = function(){

    var oBox = getId("box");

    oBox.onclick = function(){
        timeMove(
            this,
            {
                left: "250px",
                top : "250px",
                width: "200px",
                height: "200px"
            },
            2000,
            "bounceOut"
        )
    };
};

function getId(id){
    return document.getElementById(id);
};