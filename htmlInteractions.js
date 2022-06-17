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
    state.update(lives, money, round, towers);
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

//game over UI
menuButton.addEventListener('click', function () {
    cancelAnimationFrame(animationId);
    gameOverMenu.style.display = "none";
    //remove all towers and enemies
    for(var i = towers.length; i > -1; i--){
        towers.splice(i, 1);
    }
    for(var i = enemies.length; i > -1; i--){
        enemies.splice(i, 1);
    }
    //reset variables (might make a function for this)
    autostart = "StartWave";
    round = 0;
    gameIsOver = 0;
    mainMenu.style.display = "flex";
});

restartButton.addEventListener('click', function () {
    gameOverMenu.style.display = "none";
    cancelAnimationFrame(animationId);
    //remove all towers and enemies
    for(var i = towers.length; i > -1; i--){
        towers.splice(i, 1);
    }
    for(var i = enemies.length; i > -1; i--){
        enemies.splice(i, 1);
    }
    //reset variables (might make a function for this)
    gameIsOver = 0;
    autostart = "StartWave";
    round = 0;
    
    //restart level
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
    state.update(lives, money, round, towers);
    animate();
});

retryButton.addEventListener('click', function () {
    gameOverMenu.style.display = "none";
    cancelAnimationFrame(animationId);
    //remove all towers and enemies
    for(var i = towers.length; i > -1; i--){
        towers.splice(i, 1);
    }
    for(var i = enemies.length; i > -1; i--){
        enemies.splice(i, 1);
    }
    //reset variables to previous rounds
    gameIsOver = 0;
    autostart = "StartWave";
    round = state.round;
    console.log(state.towers.length);
    for(var i=0; i<state.towers.length; i++){//replace towers
        towers.push(state.towers[i]);
        towers[i].update();
        towershoot(towers[towers.length-1]);
    }
    lives = state.lives;
    money = state.money;
    retried = 1;
    animate();
});

