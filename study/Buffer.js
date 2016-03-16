function log(a){
    console.log(a);
};

/*
var str = "你";
log(Buffer.byteLength(str)); //字节长度
log(str.length); //字符长度


var buf1 = new Buffer(10);
var buf2 = new Buffer(14);
var buf3 = new Buffer(18);

buf1.fill(0);
buf2.fill(0);
buf3.fill(0);

var bufs = [buf1, buf2, buf3];

var cBuf = Buffer.concat(bufs);

log(cBuf.length);

log(Buffer.isEncoding("utf-8"));*/

/*
var buf1 = new Buffer("这这这这这这这这这这这这这这这这这这这这这这这这这这这这这这");

var buf2 = new Buffer(buf1.length);

buf1.copy(buf2);

log(buf2.toString());*/

/*
var buf = new Buffer("123");
log(buf);
log(buf.indexOf("3"));*/


/*
var buf = new Buffer("这个是");
log(buf.toJSON());

var buf = new Buffer("适度分红is的第of");
for(var b of buf){
    console.log(b);
}*/