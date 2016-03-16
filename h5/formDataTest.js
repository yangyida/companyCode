window.onload = function(){

    var fForm = document.forms.namedItem("f");

    var oBtn = document.getElementById("btn");

    oBtn.onclick = function(){

        formData = new FormData(fForm);

    };
};