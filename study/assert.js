var assert = require("assert");

/*
assert("../web/client.js");
assert.ok("123", "321");
assert(false, "错误");

var o1 = {"a" : 1};
var o2 = {"a" : 2};

try{
    assert.deepEqual(o1, o2);
}catch(e){
    console.error(e);
}

assert.deepStrictEqual();

assert.doesNotThrow(
    function(){

        throw new TypeError("Wrong value");
    },
    TypeError
);


assert.equal("a", "b", "123");

assert.fail("a", "a", "123", function(a, b){
    console.log(a);
    console.log(b);
});

var num = assert.ifError(123);

assert.notDeepEqual("a", "a");*/

assert.doesNotThrow(

    function(){
        throw new TypeError("Wrong value");
    },

    SyntaxError
);

console.log(123);
