const log = function(o){
    console.log(o);
};

const err = function(o){
    console.error(o);
};

var http = require("http");
var net = require('net');
var url = require('url');

/*http.get(
        {
            hostname : "localhost",
            port : 8888,
            path : "/",
            agent : false
        },
        function(request){
            log("---come---");
        }
        );*/


/*
http.createServer(function(response, response){

    log("--- connection ---");

    var data = {
        name : "yang",
        age : 24
    };

    response.statusCode = 200;
    response.write(JSON.stringify(data));
    response.end();

}).listen(8888, function(){

    log("--- create listen ---");


});

setTimeout(function(){

    log("--- request ---");

    http.get(
        {
            hostname : "localhost",
            port : 8888,
            path : "/"
        },
        function(response){

            log(response.read());
        }
    );

}, 2000);*/

var proxy = http.createServer(
        function(req, res){

        res.writeHead(
            200,
            {
                "Content-Type" : "text/plain"
            }
        );

        res.end("okay");
    }
);

proxy.on(
    "connect",
    function(req, cltSocket, head){
        log(req.url);
        var srvUrl = url.parse("http://" + req.url);

        var srvSocket = net.connect(
            srvUrl.port,
            srvUrl.hostname,
            function(){
                cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node.js-Proxy\r\n' +
                    '\r\n');
                srvSocket.write(head);
                srvSocket.pipe(cltSocket);
                cltSocket.pipe(srvSocket);
            }
        );
    }
);

proxy.listen(
    8888,
    "127.0.0.1",
    function(){
        var options = {
            port: 8888,
            hostname: '127.0.0.1',
            method: 'CONNECT',
            path: 'www.google.com:80'
        };

        var req = http.request(options);
        req.end();

        req.on('connect', function(res, socket, head) {
            console.log('got connected!');

            // make a request over an HTTP tunnel
            socket.write('GET / HTTP/1.1\r\n' +
                'Host: www.google.com:80\r\n' +
                'Connection: close\r\n' +
                '\r\n');
            socket.on('data', function(chunk) {
                console.log(chunk.toString());
            });
            socket.on('end', function() {
                proxy.close();
            });
        })
    }
);

