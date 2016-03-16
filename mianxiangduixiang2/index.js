window.onload = function(){

    /*Number.prototype.say = function(){
        console.log("Hello");
    };

    var b = 1;

    b.say();*/

    //var str = "12345";

    //console.log(str.lastValue());

    /*String.prototype.lastValue = function(){

        var str = this.toString();

        return str.charAt(str.length - 1);

    };*/


    var r = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$");
    console.log(r.test("123_q@123.com"));
};