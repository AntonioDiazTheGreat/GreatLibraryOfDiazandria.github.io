document.querySelectorAll(".deleteBtn").forEach(btn => {
    btn.addEventListener("click", deleteBoardElement);
});

function deleteBoardElement(e){

    const elementId = e.target.closest(".boardElement").id;

    const index = parseInt(elementId.split("_")[1]);

    boardArray.splice(index, 1);
    localStorage.setItem('boardArray', JSON.stringify(boardArray));

    updateLeaderboard();
    setupEventListeners();
}

function sortName() {
    boardArray.sort(((a, b) => a[0].localeCompare(b[0])));
    updateLeaderboard();
    setupEventListeners();
}

function sortDate() {
    boardArray.sort((a, b) => new Date(a[2]) - new Date(b[2]));
    updateLeaderboard();
    setupEventListeners();
}

function sortTime() {
    boardArray.sort((a, b) => a[1] - b[1]);
    updateLeaderboard();
    setupEventListeners();
}

function updateLeaderboard() {
    const leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = `<div id="crownCont" class="binger">
        <div id="crownBase">
            <div class="crownArch"></div>
            <div class="crownArch"></div>
        </div>
        <div id="crownRedPart"></div>
        <div id="goldDot" class="binger">
            <div class="cross">
                <div class="crossVert"></div>
            </div>
        </div>
    </div><div class='boardElement'><div id="filler"></div><div class='playerName' id="playerSorter">Player</div><div class='playerTime' id="timeSorter">Time</div><div class='playerDate' id="dateSorter">Date</div></div>`;

    boardArray.forEach((dataSet, index) => {
        const boardElement = document.createElement("div");
        const countId = `boardElement_${index}`;
        boardElement.id = countId;
        boardElement.className = "boardElement";
        boardElement.innerHTML = `<div class="deleteBtn binger"></div><div class='playerName'>${dataSet[0]}</div><div class='playerTime'>${dataSet[1]}</div><div class='playerDate'>${dataSet[2]}</div>`;
        leaderboard.appendChild(boardElement);
    });
}

function setupEventListeners() {
    setTimeout(() => {
        document.getElementById("playerSorter").addEventListener("click", sortName);
        document.getElementById("timeSorter").addEventListener("click", sortTime);
        document.getElementById("dateSorter").addEventListener("click", sortDate);
        document.querySelectorAll(".deleteBtn").forEach(btn => {
            btn.addEventListener("click", deleteBoardElement);
        });
    }, 1000);
}

setupEventListeners();
