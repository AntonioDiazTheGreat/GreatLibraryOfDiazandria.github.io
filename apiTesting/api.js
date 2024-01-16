let api_key = "1514b471-471e-4094-bd16-80ffef5da9ef";

let uuidInput = document.getElementById("uuidInput");

document.getElementById("uuidSubmit").addEventListener("click", ()=>{
    if(uuidInput){
        fetch(`https://api.hypixel.net/v2/skyblock/profiles?key=${api_key}&uuid=${uuidInput.value}`)
            .then(res => res.json())
            .then(data => {
                if(data){
                    console.log(data)
                    processData(data)
                }
                else{
                    console.log("no data found")
                }
                })
    }
    else{
        return
    }
})

let cont = document.getElementById("statCont");


let currentIndex = 0;

function processData(data) {
    cont.innerHTML="<select name='profileSelect' id='profileSelect'></select>";
    data.profiles.forEach((profile, index) => {
        let option = document.createElement("option");
        option.innerHTML = profile.cute_name;
        option.value = profile.cute_name;
        document.getElementById("profileSelect").appendChild(option);
    });

    document.getElementById("profileSelect").addEventListener("change", (event) => {
        const selectedIndex = event.target.selectedIndex;

        currentIndex = selectedIndex;
        updateStats(data);
    });
    updateStats(data);
}

function updateStats(data){
    console.log(data.profiles[currentIndex])
}


