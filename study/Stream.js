var log = function(o){
    console.log(o);
};

var err = function(e){
    console.log(e);
};

var stream = require("stream");
var http = require("http");
var fs = require("fs");


/*var server = http.createServer(function(request, response){

    var body = "";

    response.on("data", function(chunk){

        body += chunk;
    });

    response.on("end", function(){

        log(body);

        response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});
        response.write("OK");
        response.end();
    });
}).listen(8888);

log("---------- server start -------------");

var rr = fs.createReadStream("../test/index6.html");

rr.on("readable", function(){
    log("readable : " + rr.read());
});

rr.on("end", function(){
    log(rr.isPaused());
    log("end");
});
 */

var read = fs.createReadStream("../test/index6.html");


read.on("readable", function(){

    read.setEncoding("utf8");
    var body = "";
    var chunk = "";
    while(null !== (chunk = read.read(2))){
        body += chunk;
    };
    log(body);
});

writable.cork()