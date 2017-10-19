var myJSON = "";
var mykeys = {};
var profileName = "profile";
var userName = "";

function readTextFile(file, method="GET", postType="", postData="") {
    var rawFile = new XMLHttpRequest();
    var myreturn="";
    async = false;
    if ( method == "POST" ) {
        async = true;
    }
    rawFile.open(method, file, async);
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
    if ( method == "POST" ) {
        rawFile.setRequestHeader("Content-length", postData.length);
        rawFile.setRequestHeader("Content-type", postType);
    }
    rawFile.send(postData);
    return myreturn;
}

function fillFonts() {
    var myFonts = readTextFile("google_fonts.txt").split("\n");
    var fs = document.getElementById("printFont");
    fs.innerHTML=""
    for ( var i = 0; i < myFonts.length; i++ ) {
        var myop = document.createElement('option');
        //var display = fonts[i].split(',')[0].replace(/"/g,'');
        var myf = myFonts[i];
        myop.value=myf;
        myop.text=myf;
        fs.appendChild(myop);
    }
    setFont(fs.value);
}

function setFont(myFont) {
    styleid = 'font-' + myFont;
    if ( ! document.getElementById(styleid) ) {
        var inp=document.createElement('link');
        inp.rel='stylesheet';
        inp.id=styleid;
        inp.href='https://fonts.googleapis.com/css?family=' + myFont;
        document.head.appendChild(inp);
    }
    document.getElementById('output').style.fontFamily = myFont;
}

function getProfileKeys() {
    myJSON = JSON.parse(document.getElementById("rawProfile").value).lines.sort(function(a,b) { return parseInt(b.level) - parseInt(a.level); } );
    mykeys = {};
    for ( var i = 0; i < myJSON.length; i++ ) {
        myJSON[i].found=0;
        mykeys[myJSON[i].id] = myJSON[i];
    }
}

function saveProfile(loc) {
    if ( loc == "local" ) {
        localStorage[profileName] = document.getElementById('rawProfile').value;
    }
    else if ( loc == "remote" ) {
        var user = document.getElementById('username').value;
        var font = document.getElementById('printFont').value;
        if ( user ) {
            var out = readTextFile("/db", "POST", "application/json", JSON.stringify({"user": user, "font": font, "lines": myJSON}));
        }
        console.log(out);
    }
}

function loadProfile(loc) {
    var myStuff = "";
    if ( loc == "local" ) {
        if ( typeof(localStorage[profileName] ) != 'undefined' ) {
            myStuff = localStorage[profileName];
        }
    }
    else if ( loc == "remote" ) {
      //  myStuff = readTextFile("stuff.json");
        var user = document.getElementById('username').value;
        console.log(user);
        if ( user ) {
            myStuff = readTextFile("/db?user=" + user);
            console.log("you got ",myStuff);
        }
    }
        var listele = document.getElementById('lineItems');
        listele.innerHTML="";
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
    if ( myStuff !== "" ) {
        document.getElementById('rawProfile').value = JSON.stringify(JSON.parse(myStuff), null, '\t');
        myJSON = JSON.parse(myStuff).lines.sort(function(a,b) { return parseInt(b.level) - parseInt(a.level); } );
        var myFont = JSON.parse(myStuff).font;
        if ( myFont ) {
            document.getElementById('printFont').value = myFont;
            setFont(myFont);
        }
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
    }

        var but = document.createElement('button');
        but.innerText = "+";
        but.id = "addButton";
        but.onclick = (function(e) { 
            var sel=document.getSelection().toString();
            var br = document.createElement('br');
            var ele = document.createElement('span');
            ele.className = 'listItem';
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
            if ( sel ) {
                idf.value=sel;
                levelf.focus();
                levelf.select();
            }
        });
        listele.appendChild(but);

        var sav = document.createElement('button');
        sav.innerText = "Save to session";
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
            var newNewJson = {"font": document.getElementById("printFont").value, "lines": newJson};
            document.getElementById('rawProfile').value = JSON.stringify(newNewJson, null, '\t');
            localStorage[profileName] = JSON.stringify(newNewJson, null, '\t');
            getProfileKeys();
            document.getElementById('lineItems').classList.toggle('noprint');
            var edBut = document.getElementById('showHideEditor');
            edBut.innerText = ( edBut.innerText == 'Show editor' ) ? 'Hide editor' : 'Show editor';
        });
        listele.appendChild(sav);
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
    for ( var i = 0; i < myJSON.length; i++ ) {
        if ( mykeys[myJSON[i].id].found === 1 || myJSON[i].level === 99 || myJSON[i].level === -99 ) {
            var mys = document.createElement('span');
            mys.innerHTML = myJSON[i].line.replace(/\n/g, "<BR>") + "<BR>";
            mys.onclick = (function(e) { 
                if ( e.shiftKey) {
                    e.target.remove();
                }
                if ( document.selection ) {
                    document.selection.empty();
                } else if ( window.getSelection ) {
                    window.getSelection().removeAllRanges();
                }
                return false;
            });
            myspan.appendChild(mys);
        }
    }
    document.getElementById('noprint').classList.toggle('noprint');
}
