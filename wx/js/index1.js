var o = new Object({
    a : 1,
    b : 2
});

var o1 = new Object(12);

var o2 = new Object("12");

var o3 = new Object(true);

var o4 = {};

var o5 = new Object(o4);

console.log(o4 === o5);