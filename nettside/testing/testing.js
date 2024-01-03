var image = "";
var imginput = document.getElementById("imginput");

imginput.addEventListener("change", function(){
    var reader = new FileReader();
    console.log("Event triggered");
    reader.addEventListener("load", () => {
        image = reader.result;
        document.getElementById("img").src = image;
    })
    reader.readAsDataURL(this.files[0]);
})
