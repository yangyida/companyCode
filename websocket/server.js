var sys = require("sys"),
    ws = require("nodejs-websocket");

var server = ws.createServer(
    function(conn){
        conn.on(
            "text",
            function(str){
                conn.sendText("receive : " + str);
                switch(str){
                    case "start" :
                        getInterval.id = setInterval(getInterval(conn), 1000);
                        break;
                    case "stop" :
                        getInterval.id && clearInterval(getInterval.id);
                        break;
                }

            }
        ),
        conn.on(
            "close",
            function(code, reason){
                console.log("[close] code : " + code);
                console.log("[close] reason : " + reason);
            }
        ),
        conn.on(
            "error",
            function(code, reason){
                console.log("[error] code : " + code);
                console.log("[error] reason : " + reason);
            }
        )
    }
).listen(8001);

console.log("WebSocket Created !!!");

function getInterval(conn){

    return function(){
        console.log(conn);
        conn.sendText(new Date().toString());
    };
};


