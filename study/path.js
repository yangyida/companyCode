const log = function(o){
    console.log(o);
};

var path = require("path");

var url = path.format(
                      {
                          root : "/",
                          dir : "/home/user/dir",
                          base : "file.txt",
                          ext : ".txt",
                          name : "file"
                      }
                     );

//log(url);


var o = path.parse("/home/user/dir/file.txt");
//log(o);
log(path.posix);