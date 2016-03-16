window.onload = function(){

    var list2 = [
        {
            name : "Folder 1",
            canList : true,
            msg : {
                0 : 0,
                1 : 1,
                2 : 2
            },
            list : [
                {
                    name : "File 1.1",
                    canList : false
                }
            ]
        },

        {
            name : "Folder 2",
            canList : true,
            list : [
                {
                    name : "Subfolder 2.1",
                    canList : true,
                    list : [
                        {
                            name : "File 2.1.1",
                            canList : false
                        },
                        {
                            name : "File 2.1.2",
                            canList : false
                        }
                    ]
                },
                {
                    name : "File 2.2",
                    canList : false
                }
            ]
        },

        {
            name : "File 4",
            canList : false
        }
    ];

    var tree = new TreeList(
        {
            element : document.getElementById("containt"),
            linkHref : "node",
            hasCheckBox : true,
            calFunc : function(name, canList, msg){
                console.log(name);
                console.log(canList);
                console.log(msg);
            }
        }
    );

    tree.init(list2);

};