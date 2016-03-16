var log = function(a){
    console.log(a);
};

var error = function(e){
    console.error(e);
};

var control = function(err, func){
    if(err){
        error(err);
    }else{
        func();
    }
};

var fs = require("fs");

/*fs.unlink("../mytable/index.js", function(err){
    if(err){
        error(err);
    }
});

fs.unlinkSync("../mytable/index.js");*/

/*fs.rename("../test/index.html", "../test/index2.html", function(err){

    if(err){
        error(err);
    }
});*/

/*fs.stat("../study", function(err, stats){

    log(stats);
});*/

/*var watcher = fs.watch("../test/index3.html");

watcher.rename("../test/index3.html", "../test/index4.html", function(err){
    if(err){
        error(err);
    };
});

fs.stat("../test/index4.html", function(err, stat){

    if(err){
        error(err);
    }else{
        log(stat);
    }
});*/

/*
fs.access("../test/index4.html", fs.R_OK | fs.W_OK,function(err){

    if(err){
        error(err);
    }else{
        log("OK");
    }
});*/

/*
fs.readlink("../test/index4.html", function(err, linkString){
    if(err){
        error(err);
    }else{
        log(linkString);
    }
});*/


/*
//删除目录
fs.rmdir(
    "../canDelete",
    function(err, data){
        if(err){
            error(err);
        }else{
            log(data);
        }
    }
);*/

/*
fs.stat(
    "../test/index4.html",
    function(err, stats){
        if(err){
            error(err);
        }else{
            log(stats);
        }
    }
);*/

/*
fs.truncate(
    "../test/index4.html",
    5,
    function(err, d){
        if(err){
            error(err);
        }else{
            log(d);
        }
    }
);*/

var watcher = fs.watch(
    "../test",
    {
        recursive : true
    },
    function(event, filename){
        switch(event){
            case "rename" :
                filename == null ? "" : log(filename + " " + "rename");
                break;
        };
    }
);

/*fs.rename(
    "../test/test1/index1_3.txt",
    "../test/test1/index1_4.txt",
    function(err){
        if(err){
            error(err);
        }
    }
);*/

/*
var i = 1;

setInterval(function(){

    fs.rename(
        "../test/index" + i + ".html",
        "../test/index" + (i + 1)+ ".html",
        function(err){
            if(err){
                error(err);
            }else{
                i++;
            }
        }
    );

}, 2000);

var buf = new Buffer("--这是一段新加的文字--");

fs.open(
    "../test/test1/index1_4.txt",
    "r+",
    function(err, fd){
        control(
            err,
            function(){
                fs.stat(
                    "../test/test1/index1_4.txt",
                    function(err, stats){
                        control(
                            err,
                            function(){
                                fs.write(fd, buf, 0, buf.length, stats.size, function(err, len, buffer){
                                    control(
                                        err,
                                        function(){
                                            console.log("插入成功!");
                                        }
                                    );
                                });
                            }
                        );
                    }
                );
            }
        );
    }
);

return;
fs.open(
    "../test/test1/index1_4.txt",
    "r+",
    function(err, fd){
        if(err){
            error(err);
        }else{

            fs.stat(
                "../test/test1/index1_4.txt",
                function(err, stats){
                    cont
                }
            );

            return;
            var buf = new Buffer("--这是一段新加的文字--");
            fs.write(
                fd,
                buf,
                0,
                buf.length,

                function(err, written, buffer){
                    if(err){
                        error(err);
                    }else{
                        console.log(written);
                    }
                }
            );

        }
    }
);
*/

/*
fs.readlink(
    "C:/Users/Public/Desktop/Mozilla Firefox.lnk",
    function(err, d){
        control(
            err,
            function(){
                log(d);
            }
        );
    }
);*/

/*fs.open(
    "../test/index6.html",
    "r+",
    function(err, fd){
        control(
            err,
            function(){
                fs.writeFile(
                    fd,
                    "最新的内容",
                    function(err){
                        control(
                            err,
                            function(){
                                log("插入成功!!!");
                            }
                        );
                    }
                );
            }
        );
    }
);*/


var async = require("async");

async.series(
    [
        function(cal){
            cal(null, 1);
            log(1);
        },
        function(cal){
            cal(null, 2);
            log(2);
        },
        function(cal){
            cal(null, 3);
            log(3);
        }
    ],
    function(err, results){
        if(err){
            error(err);
        }else{
            log(results);
        }
    }
);
