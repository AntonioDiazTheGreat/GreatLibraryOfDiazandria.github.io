var money = 40;
var research = 0;
var mines = 0;
var routes = 0;
var scientists = 0;
var labs = 0;
var time = 1934;
var moves = 2;
var sciencetime = 0;
var upgrade = 0;
var nukelvl = 0;

var xyear = document.getElementById("year");
var xmoney = document.getElementById("money");
var xresearch = document.getElementById("research");
var xmoves = document.getElementById("moves");
var xmines = document.getElementById("mines");
var xhealth = document.getElementById("health");
var xroutes = document.getElementById("routes");
var xscientists = document.getElementById("scientists");
var xlabs = document.getElementById("labs");
var turn = document.getElementById("turnbtn");

turn.addEventListener("click", passturn);
function passturn(){
    moves = 2;
    time = time + 0.5;
    xyear.innerHTML=time;
    xmoves.innerHTML=moves;
    updatemoney();
    updateresearch();
    defence = 0;
    atkger = 0;
    atkrus = 0;
    atkjpn = 0;
    atk = 0;
    xdefence.innerHTML="Defend";
    if(sciencetime>0){
        sciencetime = sciencetime - 1;
    }
    enemyattack()
    enemydefend()
    if(upgrade==1 && sciencetime==0){
        nukelvl = nukelvl + 1
        document.getElementById("nukelvl").innerHTML=nukelvl
        upgrade = 0
        if(nukelvl==1){
            document.getElementById("nuke1").style.backgroundColor="green";
            document.getElementById("nuke2").style.backgroundColor="rgb(114, 93, 93)";
        }
        else if(nukelvl==2){
            document.getElementById("nuke2").style.backgroundColor="green";
            document.getElementById("nuke3").style.backgroundColor="rgb(114, 93, 93)";
        }
        else if(nukelvl==3){
            document.getElementById("nuke3").style.backgroundColor="green";
            document.getElementById("nuke4").style.backgroundColor="rgb(114, 93, 93)";
        }
        else if(nukelvl==4){
            document.getElementById("nuke4").style.backgroundColor="green";
            document.getElementById("nuke5").style.backgroundColor="rgb(114, 93, 93)";
        }
        else if(nukelvl==5){
            document.getElementById("nuke5").style.backgroundColor="green";
            
        }
    }
    if(time<=1940){
        gerrng = Math.floor(Math.random()*100)+1;
        rusrng = Math.floor(Math.random()*100)+1;
        jpnrng = Math.floor(Math.random()*100)+1;
        if(gerrng >= 96){
            gernukelvl = gernukelvl + 1;
            xgernukelvl.innerHTML=gernukelvl 
        }
        if(rusrng >= 98){
            rusnukelvl = rusnukelvl + 1;
            xrusnukelvl.innerHTML=rusnukelvl  
        }
        if(jpnrng >= 100){
            jpnnukelvl = jpnnukelvl + 1; 
            xjpnnukelvl.innerHTML=jpnnukelvl 
        }
    }
    else if(time<=1945){
        gerrng = Math.floor(Math.random()*100)+1;
        rusrng = Math.floor(Math.random()*100)+1;
        jpnrng = Math.floor(Math.random()*100)+1;
        if(gerrng >= 93){
            gernukelvl = gernukelvl + 1; 
            xgernukelvl.innerHTML=gernukelvl 
        }
        if(rusrng >= 95){
            rusnukelvl = rusnukelvl + 1; 
            xrusnukelvl.innerHTML=rusnukelvl  
        }
        if(jpnrng >= 97){
            jpnnukelvl = jpnnukelvl + 1; 
            xjpnnukelvl.innerHTML=jpnnukelvl 
        }        
    }
    else if(time<=1950){
        gerrng = Math.floor(Math.random()*100)+1;
        rusrng = Math.floor(Math.random()*100)+1;
        jpnrng = Math.floor(Math.random()*100)+1;
        if(gerrng >= 90){
            gernukelvl = gernukelvl + 1; 
            xgernukelvl.innerHTML=gernukelvl 
        }
        if(rusrng >= 92){
            rusnukelvl = rusnukelvl + 1; 
            xrusnukelvl.innerHTML=rusnukelvl  
        }
        if(jpnrng >= 94){
            jpnnukelvl = jpnnukelvl + 1; 
            xjpnnukelvl.innerHTML=jpnnukelvl 
        }        
    }
    if(time == 1939 && gernukelvl == 0){
        gernukelvl = 1;
        xgernukelvl.innerHTML=gernukelvl;
    }
    else if(time == 1942 && gernukelvl == 1){
        gernukelvl = 2;
        xgernukelvl.innerHTML=gernukelvl;
    }
    else if(time == 1944.5 && gernukelvl == 2){
        gernukelvl = 3;
        xgernukelvl.innerHTML=gernukelvl;
    }
    else if(time == 1947.5 && gernukelvl == 3){
        gernukelvl = 4;
        xgernukelvl.innerHTML=gernukelvl;
    }
    else if(time == 1955 && gernukelvl == 4){
        gernukelvl = 5;
        xgernukelvl.innerHTML=gernukelvl;
    }

    if(time == 1940.5 && rusnukelvl == 0){
        rusnukelvl = 1;
        xrusnukelvl.innerHTML=rusnukelvl;
    }
    else if(time == 1943.5 && rusnukelvl == 1){
        rusnukelvl = 2;
        xrusnukelvl.innerHTML=rusnukelvl;
    }
    else if(time == 1946 && rusnukelvl == 2){
        rusnukelvl = 3;
        xrusnukelvl.innerHTML=rusnukelvl;
    }
    else if(time == 1949 && rusnukelvl == 3){
        rusnukelvl = 4;
        xrusnukelvl.innerHTML=rusnukelvl;
    }
    else if(time == 1959 && rusnukelvl == 4){
        rusnukelvl = 5;
        xrusnukelvl.innerHTML=rusnukelvl;
    }

    if(time == 1940 && jpnnukelvl == 0){
        jpnnukelvl = 1;
        xjpnnukelvl.innerHTML=jpnnukelvl;
    }
    else if(time == 1943 && jpnnukelvl == 1){
        jpnnukelvl = 2;
        xjpnnukelvl.innerHTML=jpnnukelvl;
    }
    else if(time == 1945.5 && jpnnukelvl == 2){
        jpnnukelvl = 3;
        xjpnnukelvl.innerHTML=jpnnukelvl;
    }
    else if(time == 1948.5 && jpnnukelvl == 3){
        jpnnukelvl = 4;
        xjpnnukelvl.innerHTML=jpnnukelvl;
    }
    else if(time == 1957 && jpnnukelvl == 4){
        jpnnukelvl = 5;
        xjpnnukelvl.innerHTML=jpnnukelvl;
    }

    if(time==1948){
        document.getElementById("ghandieventbox").style.display="grid";
        ghandibuff = 1.2;
    }
    if(time==1944){
        document.getElementById("annechoicebox").style.display="grid";
    }
    if(time==1941){
        document.getElementById("pearleventbox").style.display="grid";
        hp=hp-20;
        xhealth.innerHTML=hp;
    }
}
function eventclose(){
    document.getElementById("ghandieventbox").style.display="none"
    document.getElementById("pearleventbox").style.display="none"
    document.getElementById("annechoicebox").style.display="none"
}
function annedebuff(){
    document.getElementById("eventhead2").innerHTML="You Monster";
    document.getElementById("eventparagraf2").innerHTML="You ratted out Anne Frank and handed her over to the germans. <br><br> Fuck you.<br><br> you lose half HP";
    document.getElementById("annebtns").style.display="none";
    document.getElementById("anneclose").style.display="block";
    document.getElementById("eventpic2").src="/Source/Map/packwatch.jpg"
    hp = hp/2;
    xhealth.innerHTML=hp;
}
function annebuff(){
    document.getElementById("eventhead2").innerHTML="Nothing Happened";
    document.getElementById("eventparagraf2").innerHTML="You heard some strange noises but the gang comes first.<br><br> She can now write her diary in peace.<br><br>You gain 25% of your health back!";
    document.getElementById("annebtns").style.display="none";
    document.getElementById("anneclose").style.display="block";
    document.getElementById("eventpic2").src="/Source/Map/thumbup.jpg";
    document.getElementById("eventpic2").style.width="100%";
    document.getElementById("eventpic2").style.height="80%";
    hp=hp*1.25;
    xhealth.innerHTML=hp;
}
function updatemoney(){
    money = money + 10*mines + 35*routes
    xmoney.innerHTML = money;
}
function updateresearch(){
    research = research + scientists + 3*labs
    xresearch.innerHTML = research;
}
function buymenu(){
    var x = document.getElementById("buymenu");
    if(x.style.display!=="none"){
        x.style.display="none";
    }
    else{
        x.style.display="block";
    }
}
function researchmenu(){
    var x = document.getElementById("researchmenu");
    if(x.style.display!=="none"){
        x.style.display="none";
    }
    else{
        x.style.display="block";
    }
}
function nukemenu(){
    var x = document.getElementById("nukemenu");
    if(x.style.display!=="none"){
        x.style.display="none";
    }
    else{
        x.style.display="block";
    }
}
function germenu(){
    var x = document.getElementById("germanyinfo");
    var y = document.getElementById("germany");
    if(gerdead!=1){
        if(x.style.display!="none"){
            x.style.display="none";
            y.style.filter="none"
        }
        else{
            x.style.display="block";
            y.style.filter="drop-shadow(2px 2px black)drop-shadow(-2px -2px black)"
        }
    }
}
function rusmenu(){
    var x = document.getElementById("russiainfo");
    var y = document.getElementById("russia");
    if(rusdead!=1){
        if(x.style.display!="none"){
            x.style.display="none";
            y.style.filter="none"
        }
        else{
            x.style.display="block";
            y.style.filter="drop-shadow(2px 2px black)drop-shadow(-2px -2px black)"
        }
    }
}
function jpnmenu(){
    var x = document.getElementById("japaninfo");
    var y = document.getElementById("japan");
    if(jpndead!=1){
        if(x.style.display!="none"){
            x.style.display="none";
            y.style.filter="none"
        }
        else{
            x.style.display="block";
            y.style.filter="drop-shadow(2px 2px white)drop-shadow(-2px -2px white)"
        }
    }
}
function showeurope(){
    var x = document.getElementById("pg1");
    var y = document.getElementById("pg2");
    var z = document.getElementById("map");
    x.style.display="block";
    y.style.display="none";
    z.style.backgroundImage="url('/Source/Map/Europe.png')";
    z.style.backgroundPosition="0 0";
    z.style.backgroundSize="cover";
    
}
function showjapan(){
    var x = document.getElementById("pg1");
    var y = document.getElementById("pg2");
    var z = document.getElementById("map");
    x.style.display="none"
    y.style.display="block"
    z.style.backgroundImage="url('/Source/Map/Asia.png')";
    z.style.backgroundPosition="40% 10%";
    z.style.backgroundSize="50%";   
}
function buymine(){
    if(money>=20 && moves != 0){
        money = money - 20;
        moves = moves - 1;
        mines = mines + 1
        xmoves.innerHTML=moves;
        xmoney.innerHTML=money;
        xmines.innerHTML=mines;
     }
}
function buyroute(){
    if(money>=50 && moves != 0){
        money = money - 50;
        moves = moves - 1;
        routes = routes + 1;
        xmoves.innerHTML=moves;
        xmoney.innerHTML =money;
        xroutes.innerHTML=routes;
     }    
}
function buyscientist(){
    if(money>=100 && moves != 0){
        money = money - 100;
        moves = moves - 1;
        scientists = scientists + 1
        xmoves.innerHTML=moves;
        xmoney.innerHTML = money;
        xscientists.innerHTML=scientists;
     }
}
function buylab(){
    if(money>=500 && moves != 0){
        money = money - 500;
        moves = moves - 1;
        labs = labs + 1
        xmoves.innerHTML=moves;
        xmoney.innerHTML = money;
        xlabs.innerHTML=labs;
     }
}
function nuke1(){
    if(research>=5 && moves!=0 && upgrade!=1 && nukelvl==0){
        research = research - 5
        sciencetime=2
        upgrade = 1
        moves = moves - 1
        xmoves.innerHTML=moves;
        xresearch.innerHTML=research
    }
}
function nuke2(){
    if(research>=20 && moves!=0 && upgrade!=1 && nukelvl==1){
        research = research - 20
        sciencetime=3
        upgrade = 1
        moves = moves - 1
        xmoves.innerHTML=moves;
        xresearch.innerHTML=research
    }
}
function nuke3(){
    if(research>=50 && moves!=0 && upgrade!=1 && nukelvl==2){
        research = research - 50
        sciencetime=4
        upgrade = 1
        moves = moves - 1
        xmoves.innerHTML=moves;
        xresearch.innerHTML=research
    }
}
function nuke4(){
    if(research>=100 && moves!=0 && upgrade!=1 && nukelvl==3){
        research = research - 100
        sciencetime=5
        upgrade = 1
        moves = moves - 1
        xmoves.innerHTML=moves;
        xresearch.innerHTML=research
    }
}
function nuke5(){
    if(research>=1000 && moves!=0 && upgrade!=1 && nukelvl==4){
        research = research - 1000
        sciencetime=6
        upgrade = 1
        moves = moves - 1
        xmoves.innerHTML=moves;
        xresearch.innerHTML=research
    }
}



var win = 0;
var lose = 0;
var defence = 0;
var hp = 120;
var precision = 0;
var atkger = 0;
var atkrus = 0;
var atkjpn = 0;
var gerdead = 0;
var rusdead = 0;
var jpndead = 0;

var ghandibuff = 1;

var xdefence = document.getElementById("defencebtn");
var xgerhp = document.getElementById("gerhealth");
var xrushp = document.getElementById("rushealth");
var xjpnhp = document.getElementById("jpnhealth");
var xgernukelvl = document.getElementById("gernuke");
var xrusnukelvl = document.getElementById("rusnuke");
var xjpnnukelvl = document.getElementById("jpnnuke");

function defend(){
    if(defence==0){
       defence = 1;
       moves = moves - 1;
       xdefence.innerHTML="Defended";
       xmoves.innerHTML=moves;
    }
}
function enemydefend(){
    var x = Math.floor(Math.random()*10)+1;
    var y = Math.floor(Math.random()*10)+1;
    var z = Math.floor(Math.random()*10)+1;
    if (x == 1){
        gerdef = 1;
    }
    if (y == 1){
        rusdef = 1;
    }
    if (z == 1){
        jpndef = 1;
    }
    else{
        gerdef = 0;
        rusdef = 0;
        jpndef = 0;
    }
}
function atkgermany(){
    if(moves != 0){
        atkger = 1;
        moves = moves - 1;
        xmoves.innerHTML=moves;
        attack()
    }
}
function atkrussia(){
    if(moves != 0){
        atkrus = 1;
        moves = moves - 1;
        xmoves.innerHTML=moves;
        attack()
    }
}
function atkjapan(){
    if(moves != 0){
        atkjpn = 1;
        moves = moves - 1;
        xmoves.innerHTML=moves;
        attack()
    }
}
function attack(){
    precision = Math.floor(Math.random()*10)+1;
    console.log(precision);
    if(atkger == 1){
        if(precision>5){
            if(gerdef==0){
                gerhp = gerhp - ghandibuff*(15*nukelvl - 5*gernukelvl);
                xgerhp.innerHTML=gerhp;
            }
            else{
                gerhp = gerhp - ghandibuff*(0.5*(15*nukelvl-5*gernukelvl));
                xgerhp.innerHTML=gerhp;
                console.log("Germany defended");
            }
        }
        else{
            if(gerdef==0){
                gerhp = gerhp - ghandibuff*(0.8*(15*nukelvl - 5*gernukelvl));
                xgerhp.innerHTML=gerhp;
            }
            else{
                gerhp = gerhp - ghandibuff*(0.3*(15*nukelvl - 5*gernukelvl));
                xgerhp.innerHTML=gerhp;
                console.log("Germany defended");
            }
        }
    }
    else if(atkrus == 1){
        if(precision>5){
            if(rusdef==0){
                rushp = rushp - ghandibuff*(15*nukelvl - 5*rusnukelvl);
                xrushp.innerHTML=rushp;
            }
            else{
                rushp = rushp - ghandibuff*(0.5*(15*nukelvl - 5*rusnukelvl));
                xrushp.innerHTML=rushp;
                console.log("Russia defended");
            }
        }
        else{
            if(rusdef==0){
                rushp = rushp - ghandibuff*(0.8*(15*nukelvl - 5*rusnukelvl));
                xrushp.innerHTML=rushp;
            }
            else{
                rushp = rushp - ghandibuff*(0.3*(15*nukelvl - 5*rusnukelvl));
                xrushp.innerHTML=rushp;
                console.log("Russia defended");
            }
        }
    }
    else if(atkjpn == 1){
        if(precision>5){
            if(jpndef==0){
                jpnhp = jpnhp - ghandibuff*(15*nukelvl - 4*jpnnukelvl);
                xjpnhp.innerHTML=jpnhp;
            }
            else{
                jpnhp = jpnhp - ghandibuff*(0.5*(15*nukelvl - 4*jpnnukelvl));
                xjpnhp.innerHTML=jpnhp;
                console.log("Japan defended");
            }
        }
        else{
            if(jpndef==0){
                jpnhp = jpnhp - ghandibuff*(0.8*(15*nukelvl - 4*jpnnukelvl));
                xjpnhp.innerHTML=jpnhp;
            }
            else{
                jpnhp = jpnhp - ghandibuff*(0.3*(15*nukelvl - 4*jpnnukelvl));
                xjpnhp.innerHTML=jpnhp;
                console.log("Japan defended");
            }
        }
    }
    if(gerhp<=0){
        document.getElementById("germany").hidden=true;
        germenu()
        gerdead = 1;
    }
    if(rushp<=0){
        document.getElementById("russia").hidden=true;
        rusmenu()
        rusdead = 1;
    }
    if(jpnhp<=0){
        document.getElementById("japan").hidden=true;
        jpnmenu()
        jpndead = 1;
    }
}
function enemyattack(){
    var x = Math.floor(Math.random()*100)+1;
    if (x >= 70){
        if(gernukelvl >= 1 || rusnukelvl >= 1 || jpnnukelvl >= 1){
            if (gernukelvl > rusnukelvl && gernukelvl > jpnnukelvl){
                if(defence==0){
                    hp = hp - ghandibuff*(12*gernukelvl - 7*nukelvl);
                    xhealth.innerHTML=hp;
                }
                else{
                    hp = hp - ghandibuff*(0.5*(12*gernukelvl - 7*nukelvl));
                    xhealth.innerHTML=hp;
                }
            }
            else if(rusnukelvl > gernukelvl && rusnukelvl > jpnnukelvl){
                if(defence==0){
                    hp = hp - ghandibuff*(10*rusnukelvl - 7*nukelvl);
                    xhealth.innerHTML=hp;
                }
                else{
                    hp = hp - ghandibuff*(0.5*(12*rusnukelvl - 7*nukelvl));
                    xhealth.innerHTML=hp;
                }
            }
            else if(jpnnukelvl > gernukelvl && jpnnukelvl > rusnukelvl){
                if(defence==0){
                    hp = hp - ghandibuff*(10*jpnnukelvl - 7*nukelvl);
                    xhealth.innerHTML=hp;
                }
                else{
                    hp = hp - ghandibuff*(0.5*(12*jpnnukelvl - 7*nukelvl));
                    xhealth.innerHTML=hp;
                }
            }
        }
    }
    if(hp<=0){
        console.log("L nerd");
    }
}

var gerhp = 100;
var gernukelvl = 0;
var gerdef = 0;
var gerrng = 0;

var rushp = 120;
var rusnukelvl = 0;
var rusdef = 0;
var rusrng = 0;

var jpnhp = 80;
var jpnnukelvl = 0;
var jpndef = 0;
var jpnrng = 0;
