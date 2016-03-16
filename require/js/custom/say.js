(function(){

    var Say = function(){
        console.log(123);
    }

    define(function(){
        return Say;
    });

})();