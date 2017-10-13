function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    var myreturn="";
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                myreturn=allText;
            }
        }
    }
   rawFile.send(null);
   return myreturn;
}
var fonts = [ 'Georgia, serif' , '"Palatino Linotype", "Book Antiqua", Palatino, serif' , '"Times New Roman", Times, serif',
             'Arial, Helvetica, sans-serif' , '"Arial Black", Gadget, sans-serif' , '"Comic Sans MS", cursive, sans-serif' ,
             'Impact, Charcoal, sans-serif' , '"Lucida Sans Unicode", "Lucida Grande", sans-serif' , 'Tahoma, Geneva, sans-serif' ,
             '"Trebuchet MS", Helvetica, sans-serif' , 'Verdana, Geneva, sans-serif' , '"Courier New", Courier, monospace' ,
             '"Lucida Console", Monaco, monospace' ,
'Abel', 
'Aclonica', 
'Actor', 
'Advent Pro', 
'Alegreya', 
'Alegreya Sans SC', 
'Allan', 
'Allerta Stencil', 
'Dekko', 
'Didact Gothic', 
'Gruppo', 
'Kalam', 
'Merienda', 
'Nova Flat', 
'Century Gothic, sans-serif', 
'"Arial Narrow", sans-serif', 
'Verdana, Geneva, sans-serif', 
'Gill Sans / Gill Sans MT, sans-serif', 
'"Copperplate Gothic Bold", sans-serif', 
'"Copperplate Gothic Light", sans-serif', 
'"URW Gothic L", "Century Gothic", sans-serif'
            ];

function fillFonts() {
    var fs = document.getElementById("printFont");
    fs.innerHTML=""
    for ( var i = 0; i < fonts.length; i++ ) {
        var myop = document.createElement('option');
        var display = fonts[i].split(',')[0].replace(/"/g,'');
        var myf = fonts[i];
        myop.value=myf;
        myop.text=display;
        fs.appendChild(myop);
    }
    document.getElementById('output').style.fontFamily = fs.value;
}

var myStuff = readTextFile("stuff.json");
var myJSON = JSON.parse(myStuff).sort(function(a,b) { return parseInt(b.level) - parseInt(a.level); } );
var mykeys = {};
for ( var i = 0; i < myJSON.length; i++ ) {
    myJSON[i].found=0;
    mykeys[myJSON[i].id] = myJSON[i];
}


function doit() {
    var desc = " " + document.getElementById('desc').value.replace(/[.,;:,.'"\/\]\[\-=_+!@#$%^&*()`~]+/g, " ") + " ";
    for ( var tkey in mykeys ) {
        mykeys[tkey].found=0;
        var teststring = new RegExp("\\s" + tkey + "\\s","i");
        if ( desc.search(teststring) > -1 ) {
            mykeys[tkey].found=1;
        }
    }
    myspan = document.getElementById('output');
    myspan.innerHTML = "";
    var bp=0;
    for ( var i = 0; i < myJSON.length; i++ ) {
        if ( mykeys[myJSON[i].id].found === 1 || myJSON[i].level === 99 || myJSON[i].level === -99 ) {
            var mys = document.createElement('span');
            mys.innerHTML = myJSON[i].line.replace(/\n/g, "<BR>");
            myspan.appendChild(mys);
            myspan.innerHTML += "<br>\n";
            bp=1;
        }
    }
    document.getElementById('noprint').classList.toggle('noprint');
    console.log( mykeys);
}
