var http = require("http");
var fs = require("fs");
var url = require("url");

http.createServer(function(request, response){

    var pathname = url.parse(request.url).pathname;

    log("Request for " + pathname);

    log(pathname.substr(1));

    fs.readFile(pathname.substr(1), function(err, data){
        if(err){
            console.error(err);
            response.writeHead(404, {"Content-Type" : "text/html"});
        }else{
            response.writeHead(200, {"Content-Type" : "text/html"});
            response.write(data.toString());
        }
        response.end();
    });

}).listen(8888, function(){
    log("Server running !!!");
});

function log(a){
    console.log(a);
};
