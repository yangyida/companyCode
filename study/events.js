const log = function(o){
    console.log(o);
};

const err = function(o){
    console.error(o);
};

const EventEmitter = require("events");

var emitter = new EventEmitter();
