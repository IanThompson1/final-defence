//html stuff 
startGameButton.addEventListener('click', function () {
    //starts the program by calling the animate function
    switch (difficulty) {
        case 1:
            money = 1000;
            lives = 100;
            round = 0;
            break;
        case 2:
            money = 750;
            lives = 50;
            round = 0;
            break;
        case 3:
            money = 500;
            lives = 10;
            round = 0;
            break;
        case 4:
            money = 400;
            lives = 1;
            round = 0;
            break;
    }
    animate();
    //@ts-ignore
    mainMenu.style.display = "none";
});
basicMap.addEventListener('click', function () {
    paths = choosepath(0);
    resetButtons(1);
    //@ts-ignore
    basicMap.style.backgroundColor = "red";
});
castleMap.addEventListener('click', function () {
    paths = choosepath(1);
    resetButtons(1);
    //@ts-ignore
    castleMap.style.backgroundColor = "red";
});
diamondMap.addEventListener('click', function () {
    paths = choosepath(3);
    resetButtons(1);
    //@ts-ignore
    diamondMap.style.backgroundColor = "red";
});
circleMap.addEventListener('click', function () {
    paths = choosepath(4);
    resetButtons(1);
    //@ts-ignore
    circleMap.style.backgroundColor = "red";
});
cornerMap.addEventListener('click', function () {
    paths = choosepath(2);
    resetButtons(1);
    //@ts-ignore
    cornerMap.style.backgroundColor = "red";
});
easyDifficulty.addEventListener('click', function () {
    difficulty = 1;
    resetButtons(0);
    //@ts-ignore
    easyDifficulty.style.backgroundColor = "red";
});
mediumDifficulty.addEventListener('click', function () {
    difficulty = 2;
    resetButtons(0);
    //@ts-ignore
    mediumDifficulty.style.backgroundColor = "red";
});
hardDifficulty.addEventListener('click', function () {
    difficulty = 3;
    resetButtons(0);
    //@ts-ignore
    hardDifficulty.style.backgroundColor = "red";
});
impossibleDifficulty.addEventListener('click', function () {
    difficulty = 4;
    resetButtons(0);
    //@ts-ignore
    impossibleDifficulty.style.backgroundColor = "red";
});
//reset color function
function resetButtons(path) {
    if (path == 1) {
        //@ts-ignore
        basicMap.style.backgroundColor = "blue";
        //@ts-ignore
        castleMap.style.backgroundColor = "blue";
        //@ts-ignore
        diamondMap.style.backgroundColor = "blue";
        //@ts-ignore
        circleMap.style.backgroundColor = "blue";
        //@ts-ignore
        cornerMap.style.backgroundColor = "blue";
    }
    else if (path == 0) {
        //@ts-ignore
        easyDifficulty.style.backgroundColor = "blue";
        //@ts-ignore
        mediumDifficulty.style.backgroundColor = "blue";
        //@ts-ignore
        hardDifficulty.style.backgroundColor = "blue";
        //@ts-ignore
        impossibleDifficulty.style.backgroundColor = "blue";
    }
}
