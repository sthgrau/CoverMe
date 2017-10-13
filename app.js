var myJSON = "";
var mykeys = {};
var profileName = "profile";

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

function getProfileKeys() {
    myJSON = JSON.parse(document.getElementById("rawProfile").value).sort(function(a,b) { return parseInt(b.level) - parseInt(a.level); } );
    mykeys = {};
    for ( var i = 0; i < myJSON.length; i++ ) {
        myJSON[i].found=0;
        mykeys[myJSON[i].id] = myJSON[i];
    }
}

function saveLocalProfile(loc) {
    localStorage[profileName] = document.getElementById('rawProfile').value;
}

function loadProfile(loc) {
    var myStuff = "";
    if ( loc == "local" ) {
        if ( typeof(localStorage[profileName] ) != 'undefined' ) {
            myStuff = localStorage[profileName];
        }
    }
    else if ( loc == "remote" ) {
        myStuff = readTextFile("stuff.json");
    }
    if ( myStuff !== "" ) {
        document.getElementById('rawProfile').value = myStuff;
        var listele = document.getElementById('lineItems');
        listele.innerHTML="";
        myJSON = JSON.parse(myStuff).sort(function(a,b) { return parseInt(b.level) - parseInt(a.level); } );
        var tit = document.createElement('span');
        var tbr = document.createElement('br');
        var idt = document.createElement('input');
        idt.className = "eid";
        idt.value = "Match string";
        idt.readOnly = true;
        idt.style = "background-color: #CCCCCC;";
        tit.appendChild(idt);
        var levelt = document.createElement('input');
        levelt.className = "elevel";
        levelt.value = "Lvl";
        levelt.readOnly = true;
        levelt.style = "background-color: #CCCCCC;";
        tit.appendChild(levelt);
        var linet = document.createElement('input');
        linet.className = "eline";
        linet.value = "Sentence to use in letter";
        linet.readOnly = true;
        linet.style = "background-color: #CCCCCC;";
        tit.appendChild(linet);
        var typet = document.createElement('input');
        typet.className = "etype";
        typet.value = "Type";
        typet.readOnly = true;
        typet.style = "background-color: #CCCCCC;";
        tit.appendChild(typet);
        tit.appendChild(tbr);
        listele.appendChild(tit);
        for ( var i = 0; i < myJSON.length; i++ ) {
            myJSON[i].found=0;
            var br = document.createElement('br');
            var ele = document.createElement('span');
            ele.className = 'listItem';
            var idf = document.createElement('input');
            idf.value = myJSON[i].id;
            idf.className = 'eid';
            ele.appendChild(idf);
            var levelf = document.createElement('input');
            levelf.value = myJSON[i].level;
            levelf.className = 'elevel';
            ele.appendChild(levelf);
            var linef = document.createElement('input');
            linef.value = myJSON[i].line.replace(/\n/g,"\\n");
            linef.className = 'eline';
            ele.appendChild(linef);
            var typef = document.createElement('input');
            typef.value = ( myJSON[i].type ) ? myJSON[i].type : "skill";
            typef.className = 'etype';
            ele.appendChild(typef);
            var but = document.createElement('button');
            but.innerText = "-";
            but.id = "delButton";
            ele.appendChild(but);
            but.onclick = (function(e) { 
                e.target.parentNode.remove();
            });
            ele.appendChild(br);
            listele.appendChild(ele);
        }
        getProfileKeys();

        var but = document.createElement('button');
        but.innerText = "+";
        but.id = "addButton";
        but.onclick = (function(e) { 
            var br = document.createElement('br');
            var ele = document.createElement('span');
            var idf = document.createElement('input');
            idf.className = 'eid';
            ele.appendChild(idf);
            var levelf = document.createElement('input');
            levelf.className = 'elevel';
            ele.appendChild(levelf);
            var linef = document.createElement('input');
            linef.className = 'eline';
            ele.appendChild(linef);
            var typef = document.createElement('input');
            typef.className = 'etype';
            ele.appendChild(typef);
            var but = document.createElement('button');
            but.innerText = "-";
            but.id = "delButton";
            ele.appendChild(but);
            but.onclick = (function(e) { 
                e.target.parentNode.remove();
            });
            ele.appendChild(br);
            e.target.parentNode.insertBefore(ele,e.target);
        });
        listele.appendChild(but);

        var sav = document.createElement('button');
        sav.innerText = "Save Local";
        sav.id = "saveButton";
        sav.onclick = (function(e) { 
            var newJson = [];
            e.target.parentNode.childNodes.forEach( function(f) { 
                if ( f.tagName.toLowerCase() == "span" && f.className == 'listItem' ) { 
                    var id = f.getElementsByClassName('eid')[0].value;
                    var level = parseInt(f.getElementsByClassName('elevel')[0].value);
                    var line = f.getElementsByClassName('eline')[0].value.replace(/\\n/g,"\n");
                    var type = f.getElementsByClassName('etype')[0].value;
                    newJson.push({id, level, line, type});
                }
            });
            document.getElementById('rawProfile').value = JSON.stringify(newJson, null, '\t');
            localStorage[profileName] = JSON.stringify(newJson, null, '\t');
            getProfileKeys();
        });
        listele.appendChild(sav);
    }
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
}
