var log = {};
log.logEl = null;

log.append = function(o){

    var logEl = log.logEl;

    if(!logEl){
        log.logEl = document.createElement("div");
        logEl = log.logEl;
        logEl.style.position = "fixed";
        logEl.style.bottom = "0";
        logEl.style.left = "0";
        logEl.style.width = "100%";
        logEl.style.height = "40px";
        logEl.style.backgroundColor = "rgba(255,255,255,0)";
        document.body.appendChild(logEl);
    }

    var oEl = document.create("div");
    oEl.innerHTML = o;
    logEl.appendChild(oEl);
}

log.set = function(o){

    var logEl = log.logEl;

    if(!logEl){
        log.logEl = document.createElement("div");
        logEl = log.logEl;
        logEl.style.position = "fixed";
        logEl.style.bottom = "0";
        logEl.style.left = "0";
        logEl.style.width = "100%";
        logEl.style.height = "40px";
        logEl.style.backgroundColor = "rgba(255,255,255,0)";
        logEl.style.fontSize = "18px";
        document.body.appendChild(logEl);
    }

    logEl.innerHTML = o;

}