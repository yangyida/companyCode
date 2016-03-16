$(document).ready(function(){

    $.get("template.html", function(data){

        var itemArray = [];

        for(var i = 0; i < $(data).length; i++){
            if($(data)[i].nodeType == 1){
                itemArray.push($(data)[i]);
            }
        }


        var sc = new ScrollChange({
            oBoxElement : document.getElementById("box"),
            itemArray : itemArray
        });

        sc.init();

    });
});
