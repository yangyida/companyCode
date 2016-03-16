var ready = function(calBack){

    document.onreadystatechange = function(){

        console.log(document.readyState);

        if(document.readyState == "complete"){
            calBack();
        }
    };
};

