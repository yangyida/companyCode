require.config({
    paths : {
        jquery : "../lib/jquery-1.8.0.min",
        math : "../custom/math",
        say : "../custom/say",
        html : "../lib/module/html",
        domReady : "../lib/module/domReady",
        image : "../lib/module/image"
    }
});

require(["domReady!", "html!../../index2","jquery", "math", "say", "image!img/1.jpg"], function(domReady, htmlFile,jquery, math, say, pic){

    var page = document.getElementById("page");

    page.innerHTML = htmlFile;

    console.log(pic);
});