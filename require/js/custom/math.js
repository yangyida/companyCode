define(function(){

    var add = function(){
        var length = arguments.length;
        var sum = 0;

        for(var i = length - 1; i > -1; i--){
            sum += arguments[i];
        }

        return sum;
    }

    var sub = function(a, b){
        return a - b;
    }

    return {
        add : add,
        sub : sub
    }

});

