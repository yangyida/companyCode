window.onload = function(){

    var oSendText = document.getElementById("send-text");
    var oSendBtn = document.getElementById("send-btn");
    var oShow = document.getElementById("show");

    var ws = new WebSocket("ws://localhost:8001");

    ws.onopen = function(e){
        console.log(e);
        console.log("连接成功");
    };

    ws.onmessage = function(e){
        console.log(e.data);
    };

    ws.onclose = function(e){
        console.log("服务器关闭");
    };

    ws.onerror = function(){
        console.log("连接出错");
    };

    oSendBtn.onclick = function(){
        var text = oSendText.value.trim();
        text && ws.send(text);
    };
};