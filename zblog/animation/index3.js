
window.onload = function(){

    getId("f").onchange = function(e){
        f = e.target.files[0];
        var reader = new FileReader();

        reader.onload = function(e){
            //getId("pp").src = console.log(e.target.resulte);
            var op = e.target.result;
            console.log(op.length);
            getId("pp").src = "data:image/gif;base64,R0lGODlhEAAQAPeCAMm/oPn38ZJ4MP/mpP/hlfb18NrPpse2ePnerf/tv//lof/suf/imP/88+3q4P/gj//rtv/99v/jm//fjP/eif/y0v/knv/12KWTYOq2efnhuMC0kP/67P/gkv/gjv/+/P/losioUZJ5Mezbqv/twODXtdnAb//uwuPZvf/01vXPleq4f/Lu4P/22+ffxLaZSf/fi/Pv4q2XVv/wy//9+sK2kbqfQebNgvjdr/LZk/jkrO+2Zr+sdv/++uSnZv/np9nCdvXmvK2UT8ipVf/23sGoU8evXv/01bepgMe1dP/02ObOhdPGlcepR9THl//orOzjxf/imf/dhvnhucipU8GlSfn16f/99+zSi62ca/LEgse2d7WVL8ezbP/ruf/cgv/78M20YPLRd/C8cf/23//567+hTv3w0v/tvP/oquGfW62caf/9+f/12/TKjqSRWf/z1fjjqaiOLc6/h/LWif/svMe3eP/hkv/34cGtZc26ePrmxezm0ODWtPDIlf/77+zXneDHff///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAIIALAAAAAAQABAAQAjNAAUJHBjDgJ0tNQYqDGDkRII6CyAAsbEkjZACAg1AKeNmjIozLS6k4OFA4cA5dBgQ6PBgAoUhIgAIlNOHxQcaERqA4YBig0lBSZTAqaBhhZoMCEjIwKiwRKAnJnIMUGBBQhQCL0oq1CPmSwgBMn+6cHLgABM+Pa5kYTrwAJucf/Zo2YGDzBuTAbrgIdLmwpEKU/wEwWDSwIgZPpAmQLNAByAkJvN4gRAnTJUbPwaAwLLGZJGpVVXeaWmG8MAATTzAoCCFCtifAq1wef0zIAA7";
        };

        reader.readAsDataURL(f);
    };

    getImgBySrc("images/web_heart_animation.png", function(image){

        i = image;

    });

};

function getId(id){
    return document.getElementById(id);
};

function getImageBySrc(src, calBack){
    var image = new Image();
    image.onload = function(){
        calBack(this);
    };
    image.src = src;
};

function getImgBySrc(src, calBack){
    var img = document.createElement("img");
    img.onload = function(){
        calBack(this);
    };
    img.src = src;
};

//HTMLImageElement Image Canvas ImageData