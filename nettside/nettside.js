var menus = [
    [document.getElementById("dropdown"), document.getElementById("menu")],
    [document.getElementById("settings"), document.getElementById("setmenu")],
    [document.getElementById("edit"), document.getElementById("editmenu")],
    [document.getElementById("templates"), document.getElementById("templatesmenu")]
]
var clonebtns = document.querySelectorAll(".clonebtn")
var templates = [
    [document.getElementById("temp1"), document.getElementById("wrapper1")],
    [document.getElementById("temp2"), document.getElementById("wrapper2")],
    [document.getElementById("temp3"), document.getElementById("wrapper3")]
]
var gridpatterns = [
    document.getElementById("wrapper1"),
    document.getElementById("wrapper2"),
    document.getElementById("wrapper3")
]
var imglist = [];
var templatebtns = document.querySelectorAll(".template")
var toolx = document.getElementById("x");
var tooly = document.getElementById("y");
var toolmenu = document.getElementById("toolwrap");
var gridarea = document.querySelectorAll(".griditem");
var editwrap = document.getElementById("editwrap");
var clonecolor = document.getElementById("clonecolor");
var textbox = document.getElementById("clonetext");
var dodo = 0;
var selectel = document.querySelector("#elspecify");
var options = document.querySelectorAll(".specifyopt");
selectel.addEventListener("change", specificate)

var sliders = [
    document.querySelector("#gridslide"),
    document.querySelector("#gapslide")
]

var settingsarray = [
    [document.getElementById("backok"), document.getElementById("backcolor")],
    [document.getElementById("textok"), document.getElementById("textcolor")]
];

for(var i = 0; i < sliders.length; i++){
    sliders[i].addEventListener("click", check)
}

function check(event) {
    if(event.target===sliders[0]){
        gridarea.forEach(griditem => {
            var isChecked = sliders[0].checked;
            griditem.style.border = isChecked ? "none" : "solid 1px black";
        });
    }
    if(event.target===sliders[1]){
        var isChecked = sliders[1].checked;
        for(i = 0; i < gridpatterns.length; i++){
            gridpatterns[i].style.gap = isChecked ? "" : "5px";
        }
    }
}

var select = [
    [document.getElementById("headbtn"), document.getElementById("header")],
    [document.getElementById("footbtn"), document.getElementById("footer")],
    [document.getElementById("mainbtn"), document.getElementById("main")],
    [document.getElementById("navbtn"), document.getElementById("nav")],
    [document.getElementById("parabtn"), document.getElementById("clonep")],
    [document.getElementById("imgbtn"), document.getElementById("imgcont")],
    [document.getElementById("clearbtn"), document.getElementById("clear")]
];
var cloneables = [
    document.getElementById("h1"),
    document.getElementById("paragraf")
]
var type = [0, 0, 0, 0, 0, 0, 0];
var edittype = [1, 0, 0, 0, 0, 0];
var clonebox = [];


toolx.addEventListener("click", toolclose)
tooly.addEventListener("click", toolclose)

for(var i = 0; i < menus.length; i++){
    menus[i][0].addEventListener("click", menu)
}

for(var i = 0; i < settingsarray.length; i++){
    settingsarray[i][0].addEventListener("click", settingchange)
}

gridarea.forEach(griditem => {
    griditem.addEventListener("click", clone)
});

for(var i = 0; i < select.length; i++){
    select[i][0].addEventListener("click", press);
}

clonebtns.forEach(cloner =>{
    cloner.addEventListener("click", editclone)
})
templatebtns.forEach(temp =>{
    temp.addEventListener("click", switchtemp)
})

function specificate(){
    var i = 0;
    edittype = [0, 0, 0, 0, 0, 0];
    for(i = 0; i < options.length; i++){
        if(options[i].selected===true){
            edittype[i]=1;
        }
    }
}
var idnumber = editwrap.childElementCount;

function editclone(event){
    if(event.target===clonebtns[2]){
        save()
        return
    }
    if(event.target===clonebtns[3]){
        clearclonecontent()
        return
    }
    idnumber = editwrap.childElementCount;
    var clone = textbox.cloneNode(true);
    editwrap.appendChild(clone);
    clone.id =idnumber;

    if(event.target === clonebtns[0]){
        clonebox.push([0, "value placeholder", document.getElementById(idnumber.toString())]);
    }
    else if(event.target === clonebtns[1]){
        clonebox.push([1, "value placeholder", document.getElementById(idnumber.toString())]);
    }
}

function switchtemp(event){
    for(var i = 0; i < templates.length; i++){
        gridpatterns[i].style.display="none";
        templatebtns[i].style.color="rgb(10, 100, 100)";
    }
    for(var i = 0; i < templates.length; i++){
        if(event.target===templates[i][0]){
            gridpatterns[i].style.display="grid";
            templatebtns[i].style.color="turquoise";
            return
        }
    }
}

function settingchange(event){
    if(event.target===settingsarray[0][0]){
        for(i = 0; i < gridpatterns.length; i++){
            gridpatterns[i].style.backgroundColor=settingsarray[0][1].value;
        }
    }
    if(event.target===settingsarray[1][0]){
        for(i = 0; i < gridpatterns.length; i++){
            gridpatterns[i].style.color=settingsarray[1][1].value;
        }
    }
}

var cloned = 0;

function handleimage(event) {
    var fileinput = event.target;
    var file = fileinput.files[0];
    for(var i = 0; i < imglist.length; i++){
        if(imglist[i][0]===event.target){
            x=i
        }
    }

    if(file){
        var reader = new FileReader();
        reader.onload = function(event){
            var imagedata = event.target.result;
            imglist[x][1].style.backgroundImage = `url(${imagedata})`;
        };
        reader.readAsDataURL(file);
        imglist[x][0].style.display="none"
    }
}
function save(){
    var i = 0;
    var x = 0;
    for(var i = 0; i < edittype.length; i++){
        if(edittype[i]>0){
            x = i;
        }
    }
    while(select[x][1].firstChild){
        select[x][1].removeChild(select[x][1].firstChild);
    }
    select[x][1].style.backgroundColor = (select[x][1] === select[6][1]) ? "none": clonecolor.value;
    for(i = 0; i < clonebox.length; i++){
        clonebox[i][1]=document.getElementById(clonebox[i][2].id).value;
    }
    for(i = 0; i < edittype.length; i++){
        if(edittype[i]>0){
            x = i
        }
    }
    for(i = 1; i < clonebox.length+1; i++){
        cloned = cloneables[clonebox[i-1][0]].cloneNode(true);
        cloned.innerHTML=clonebox[i-1][1];
        select[x][1].appendChild(cloned);
    }  
    console.log(clonebox)
}
function clearclonecontent(){
    for(var i = 0; i < clonebox.length; i++){
        clonebox[i][2].remove();
    }
    clonebox = [];
}

function menu(event){
    var target = event.target;
    var i = 0;
    if(target===menus[2][0]){
        menus[2][1].style.display = (menus[2][1].style.display == "flex") ? "none" : "flex";
        menus[0][1].style.display = "flex";
        return
    }
    for (i = 0; i < menus.length; i++) {
        menus[i][1].style.display = (menus[i][0] === target && menus[i][1].style.display === "none") ? "flex" : "none";
    }
}

function toolclose(){
    if(toolmenu.style.display=="none"){
        toolmenu.style.display="flex";
        tooly.style.display="none";
        for(var i = 0; i < gridpatterns.length; i++){
            gridpatterns[i].style.scale="70%";
            gridpatterns[i].style.transform="translate(20%, 20%)";
        }
    }
    else{
        toolmenu.style.display="none";
        tooly.style.display="block";
        for(var i = 0; i < gridpatterns.length; i++){
            gridpatterns[i].style.scale="100%";
            gridpatterns[i].style.transform="translate(0%, 0%)";
        }
    } 
}

function press(event) {
    dodo = 1;
    type = [0, 0, 0, 0, 0, 0]
    select[6][0].style.color = "maroon";
    if (event.target.style.color === "turquoise") {
        for (var i = 0; i < select.length - 1; i++) {
            select[i][0].style.color = "rgb(10, 100, 100)";
        }
        for (var i = 0; i < imglist.length; i++) {
            imglist[i][0].style.pointerEvents="all"
            imglist[i][1].style.pointerEvents="all"
        }
        return;
    }
    for (var i = 0; i < select.length - 1; i++) {
        select[i][0].style.color = "rgb(10, 100, 100)";
    }

    for (var i = 0; i < select.length; i++) {
        if (select[i][0] === event.target) {
            select[i][0].style.color = "turquoise";
            if (select[6][0] === event.target) {
                select[6][0].style.color = "red";
            }
        }
        if (select[i][0] === event.target) {
            type[i] = 1;
        }
    }

    for (var i = 0; i < select.length; i++) {
        if (select[i][0] === event.target) {
            type[i] = 1;
        }
    }
    for (var i = 0; i < imglist.length; i++) {
        imglist[i][0].style.pointerEvents="none"
        imglist[i][1].style.pointerEvents="none"
    }
}


var clonefilenumb = 0;
var cloneimgnumb = 0;

function clone(event){
    if(dodo !== 0){
        var x = -1;
        var target = event.target;
        for(var i = 0; i<type.length; i++){
            if(type[i]>0){
                x = i;
                console.log(type)
            }
        }
        if(x !== -1){
            var clone = select[x][1].cloneNode(true);
        }
        else{
            ryeturn
        }
        clone.style.display="flex";

        if(type[5]===1){
            while(target.hasChildNodes()==true){
                target.removeChild(target.firstChild);
            }
            clone.addEventListener("change", handleimage)
            
            clonefilenumb--;
            cloneimgnumb--;

            var clonefile = document.getElementById("imageinput").cloneNode(true);
            var cloneimg = document.getElementById("imagediv").cloneNode(true);

            var id1 = "file"+clonefilenumb;
            var id2 = "img"+cloneimgnumb;
            clonefile.id = id1;
            cloneimg.id = id2;

            clone.appendChild(clonefile);
            clone.appendChild(cloneimg);
            target.appendChild(clone);

            imglist.push([document.getElementById(id1),document.getElementById(id2)])
            console.log(imglist);

        }
        else if(target.hasChildNodes()==false){
            target.appendChild(clone);
        }
        else{
            while(target.hasChildNodes()==true){
                target.removeChild(target.firstChild);
            }
            target.appendChild(clone);
        }
    }
    console.log(event.target)
}
