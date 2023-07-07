//html stuff 
var slider = document.getElementById("setRound");
var output = document.getElementById("waveValue");
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
}
startGameButton.addEventListener('click', function () {
    //starts the program by calling the animate function
    switch (pathNum){
        case 0:
            bonusHint = "Welcome to Final Defence! Good Luck!";
            hint = "Watch out for enemies with shields and armor";
            availableTowers = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
            totalmoney = 250;
            break;
        case 1:
            bonusHint = "You now have access to the Bomb and Slow towers";
            hint = "Here you will encounter grouped, speedy, and health regen enemies";
            availableTowers = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0];
            totalmoney = 300;
            break;
        case 2:
            bonusHint = "You can now use the Railgun to help against 2 different paths!";
            hint = "Enemies here have a lot of health and come in groups";
            availableTowers = [1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0];
            totalmoney = 350;
            break;
        case 3:
            hint = "Luckily someone left a free farm for you to use against the tanks!"
            bonusHint = "For this map you can upgrade all of your towers 1 more time";
            towers.push(new Tower(200, 200,"farm", 1, 0));
            availableTowers = [1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1];
            totalmoney = 400;
            break;
        case 4:
            hint = "You have access to everything now, pick the best max upgrades to win"
            bonusHint = "Only 33 waves, return of the Armored Behemoth";
            availableTowers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            totalmoney = 450;
            break;
        case 5:
            bonusHint = "Final Challenge! Battle through 50 waves to win!";
            availableTowers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            totalmoney = 500;
            break;
    }
    switch (difficulty) {
        case 1:
            totalmoney += 200;
            lives = 20;
            towerSpots = [];
            towerSpots = towerSpots1;
            round = 0;
            break;
        case 2:
            totalmoney += 100;
            lives = 15;
            towerSpots = [];
            towerSpots = towerSpots2;
            round = 0;
            break;
        case 3:
            totalmoney += 0;
            lives = 10;
            towerSpots = [];
            towerSpots = towerSpots3;
            round = 0;
            break;
        case 4:
            totalmoney += -50;
            lives = 1;
            towerSpots = [];
            towerSpots = towerSpots4;
            round = 0;
            break;
        case 5:
            totalmoney = 1000000;
            lives = 10000;
            towerSpots = [];
            for(var x=0; x<canvas.width; x += 10){
                for(var y=0; y<canvas.height; y += 10){
                    towerSpots.push([x,y]);
                }
            }
            availableTowers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            bonusHint = "Sandbox, feel free to test out different tower combinations";
            hint = "Custom Sandbox rounds";
            round = output.innerHTML-1;
            break;
    }
    // for testing
    // round = output.innerHTML-1; 
    // totalmoney+=100000;
    //calculate round money
    // if(round != 0){
    //     for(var i=0; i<round; i++){
    //         // if(i < 30){
    //             totalmoney += 100+i*10;
    //         // }else if(i < 20){
    //         //     totalmoney += 200+(i-10)*20;
    //         // }else{
    //         //     totalmoney += 400+(i-20)*50;
    //         // }
    //     }
    // }
    // if(round > 15){//extra boss money
    //     totalmoney += 1000;
    // }
    // if(round > 25){
    //     totalmoney += 2000;
    // }
    // totalmoney += round*100;
    state.update(lives, totalmoney, round, towers);
    animate();
    mainMenu.style.display = "none";
});
basicMap.addEventListener('click', function () {
    paths = choosepath(0);
    resetButtons(1);
    basicMap.style.backgroundColor = "red";
});
crossMap.addEventListener('click', function () {
    paths = choosepath(1);
    resetButtons(1);
    crossMap.style.backgroundColor = "red";
});
doubleMap.addEventListener('click', function () {
    paths = choosepath(2);
    resetButtons(1);
    doubleMap.style.backgroundColor = "red";
});
symmetryMap.addEventListener('click', function () {
    paths = choosepath(3);
    resetButtons(1);
    symmetryMap.style.backgroundColor = "red";
});
castleMap.addEventListener('click', function () {
    paths = choosepath(4);
    resetButtons(1);
    castleMap.style.backgroundColor = "red";
});
stoneMap.addEventListener('click', function () {
    paths = choosepath(5);
    resetButtons(1);
    stoneMap.style.backgroundColor = "red";
});
easyDifficulty.addEventListener('click', function () {
    difficulty = 1;
    resetButtons(0);
    easyDifficulty.style.backgroundColor = "red";
});
mediumDifficulty.addEventListener('click', function () {
    difficulty = 2;
    resetButtons(0);
    mediumDifficulty.style.backgroundColor = "red";
});
hardDifficulty.addEventListener('click', function () {
    difficulty = 3;
    resetButtons(0);
    hardDifficulty.style.backgroundColor = "red";
});
impossibleDifficulty.addEventListener('click', function () {
    difficulty = 4;
    resetButtons(0);
    impossibleDifficulty.style.backgroundColor = "red";
});
sandboxDifficulty.addEventListener('click', function () {
    difficulty = 5;
    resetButtons(0);
    sandboxDifficulty.style.backgroundColor = "red";
});
//reset color function
function resetButtons(path) {
    if (path == 1) {
        basicMap.style.backgroundColor = "blue";
        crossMap.style.backgroundColor = "blue";
        doubleMap.style.backgroundColor = "blue";
        symmetryMap.style.backgroundColor = "blue";
        castleMap.style.backgroundColor = "blue";
        stoneMap.style.backgroundColor = "blue";
    }
    else if (path == 0) {
        easyDifficulty.style.backgroundColor = "blue";
        mediumDifficulty.style.backgroundColor = "blue";
        hardDifficulty.style.backgroundColor = "blue";
        impossibleDifficulty.style.backgroundColor = "blue";
        sandboxDifficulty.style.backgroundColor = "blue";
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

//you win UI
menuButton2.addEventListener('click', function () {
    cancelAnimationFrame(animationId);
    youWinMenu.style.display = "none";
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
    switch (pathNum){
        case 0:
            bonusHint = "Welcome to Final Defence! Good Luck!";
            hint = "Watch out for enemies with shields and armor";
            availableTowers = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
            totalmoney = 250;
            break;
        case 1:
            bonusHint = "You now have access to the Bomb and Slow towers";
            hint = "Here you will encounter grouped, speedy, and health regen enemies";
            availableTowers = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0];
            totalmoney = 300;
            break;
        case 2:
            bonusHint = "You can now use the Railgun to help against 2 different paths!";
            hint = "Enemies here have a lot of health and come in groups";
            availableTowers = [1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0];
            totalmoney = 350;
            break;
        case 3:
            hint = "Luckily someone left a free farm for you to use against the tanks!"
            bonusHint = "For this map you can upgrade all of your towers 1 more time";
            towers.push(new Tower(200, 200,"farm", 1, 0));
            availableTowers = [1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1];
            totalmoney = 400;
            break;
        case 4:
            hint = "You have access to everything now, pick the best max upgrades to win"
            bonusHint = "Only 35 waves, return of the Armored Behemoth";
            availableTowers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            totalmoney = 450;
            break;
        case 5:
            bonusHint = "Final Challenge! Battle through 50 waves to win!";
            availableTowers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            totalmoney = 500;
            break;
    }
    switch (difficulty) {
        case 1:
            totalmoney += 200;
            lives = 20;
            towerSpots = [];
            towerSpots = towerSpots1;
            round = 0;
            break;
        case 2:
            totalmoney += 100;
            lives = 15;
            towerSpots = [];
            towerSpots = towerSpots2;
            round = 0;
            break;
        case 3:
            totalmoney += 0;
            lives = 10;
            towerSpots = [];
            towerSpots = towerSpots3;
            round = 0;
            break;
        case 4:
            totalmoney += -50;
            lives = 1;
            towerSpots = [];
            towerSpots = towerSpots4;
            round = 0;
            break;
        case 5:
            totalmoney = 1000000;
            lives = 10000;
            towerSpots = [];
            for(var x=0; x<canvas.width; x += 10){
                for(var y=0; y<canvas.height; y += 10){
                    towerSpots.push([x,y]);
                }
            }
            availableTowers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            bonusHint = "Sandbox, feel free to test out different tower combinations";
            hint = "Custom Sandbox rounds";
            round = output.innerHTML-1;
            break;
    }
    state.update(lives, totalmoney, round, towers);
    animate();
});

restartButton2.addEventListener('click', function () {
    youWinMenu.style.display = "none";
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
    switch (pathNum){
        case 0:
            bonusHint = "Welcome to Final Defence! Good Luck!";
            hint = "Watch out for enemies with shields and armor";
            availableTowers = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
            totalmoney = 250;
            break;
        case 1:
            bonusHint = "You now have access to the Bomb and Slow towers";
            hint = "Here you will encounter grouped, speedy, and health regen enemies";
            availableTowers = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0];
            totalmoney = 300;
            break;
        case 2:
            bonusHint = "You can now use the Railgun to help against 2 different paths!";
            hint = "Enemies here have a lot of health and come in groups";
            availableTowers = [1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0];
            totalmoney = 350;
            break;
        case 3:
            hint = "Luckily someone left a free farm for you to use against the tanks!"
            bonusHint = "For this map you can upgrade all of your towers 1 more time";
            towers.push(new Tower(200, 200,"farm", 1, 0));
            availableTowers = [1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1];
            totalmoney = 400;
            break;
        case 4:
            hint = "You have access to everything now, pick the best max upgrades to win"
            bonusHint = "Only 35 waves, return of the Armored Behemoth";
            availableTowers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            totalmoney = 450;
            break;
        case 5:
            bonusHint = "Final Challenge! Battle through 50 waves to win!";
            availableTowers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            totalmoney = 500;
            break;
    }
    switch (difficulty) {
        case 1:
            totalmoney += 200;
            lives = 20;
            towerSpots = [];
            towerSpots = towerSpots1;
            round = 0;
            break;
        case 2:
            totalmoney += 100;
            lives = 15;
            towerSpots = [];
            towerSpots = towerSpots2;
            round = 0;
            break;
        case 3:
            totalmoney += 0;
            lives = 10;
            towerSpots = [];
            towerSpots = towerSpots3;
            round = 0;
            break;
        case 4:
            totalmoney += -50;
            lives = 1;
            towerSpots = [];
            towerSpots = towerSpots4;
            round = 0;
            break;
        case 5:
            totalmoney = 1000000;
            lives = 10000;
            towerSpots = [];
            for(var x=0; x<canvas.width; x += 10){
                for(var y=0; y<canvas.height; y += 10){
                    towerSpots.push([x,y]);
                }
            }
            availableTowers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            bonusHint = "Sandbox, feel free to test out different tower combinations";
            hint = "Custom Sandbox rounds";
            round = output.innerHTML-1;
            break;
    }
    state.update(lives, totalmoney, round, towers);
    animate();
});

retryButton.addEventListener('click', function () {
    gameOverMenu.style.display = "none";
    cancelAnimationFrame(animationId);
    //remove all towers and enemies
    for(var i = towers.length-1; i > -1; i--){
        towers[i].sold = 1;
        //remove range
        towers[i].selected = 0;
        towers[i].draw();
        towers.splice(i, 1);
    }
    for(var i = enemies.length-1; i > -1; i--){
        enemies.splice(i, 1);
    }
    for(var i= lasers.length-1; i>-1; i--){
        lasers.splice(i, 1);
    }
    //reset variables to previous rounds
    gameIsOver = 0;
    autostart = "StartWave";
    round = state.round;
    waveEnded = 1;

    //deep copy state.towers so it doesn't get updated
    var tempTowers = state.towers.map((x) => x);

    for(var i=0; i<tempTowers.length; i++){//replace towers
        towers.push(new Tower(tempTowers[i].x, tempTowers[i].y, tempTowers[i].type, state.levels[i], 0));
        towers[towers.length-1].update();
        towers[towers.length-1].target = tempTowers[i].target;
        if(towers[i].type == "tesla"){//reset tesla charge
            towers[towers.length-1].charge = tempTowers[i].charge;
        }
        if(towers[i].type == "farm"){//remember farm generated
            towers[towers.length-1].generated = tempTowers[i].generated;
        }
        towershoot(towers[towers.length-1]);
        if(tempTowers[i].level =="6" && tempTowers[i].type == "laser"){
            towershoot(towers[towers.length-1]);
            towershoot(towers[towers.length-1]);
            towershoot(towers[towers.length-1]);
            towershoot(towers[towers.length-1]);
        }
    }
    TowerPlaced();
    lives = state.lives;
    totalmoney = state.totalmoney;
    retried = 1;
    animate();
});


nextLevelButton.addEventListener('click', function () {
    youWinMenu.style.display = "none";
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
    
    //go to next level if not final level
    if(pathNum != 5){
        pathNum += 1;
    }else if(difficulty < 4){
        pathNum = 0;
        difficulty += 1;
    }else if(difficulty >= 4){
        pathNum = 5; 
        difficulty = 5;
    }

    //restart at new level
    paths = choosepath(pathNum);
    switch (pathNum){
        case 0:
            bonusHint = "Welcome to Final Defence! Good Luck!";
            hint = "Watch out for enemies with shields and armor";
            availableTowers = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
            totalmoney = 250;
            break;
        case 1:
            bonusHint = "You now have access to the Bomb and Slow towers";
            hint = "Here you will encounter grouped, speedy, and health regen enemies";
            availableTowers = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0];
            totalmoney = 300;
            break;
        case 2:
            bonusHint = "You can now use the Railgun to help against 2 different paths!";
            hint = "Enemies here have a lot of health and come in groups";
            availableTowers = [1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0];
            totalmoney = 350;
            break;
        case 3:
            hint = "Luckily someone left a free farm for you to use against the tanks!"
            bonusHint = "For this map you can upgrade all of your towers 1 more time";
            towers.push(new Tower(200, 200,"farm", 1, 0));
            availableTowers = [1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1];
            totalmoney = 400;
            break;
        case 4:
            hint = "You have access to everything now, pick the best max upgrades to win"
            bonusHint = "Only 35 waves, return of the Armored Behemoth";
            availableTowers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            totalmoney = 450;
            break;
        case 5:
            bonusHint = "Final Challenge! Battle through 50 waves to win!";
            availableTowers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            totalmoney = 500;
            break;
    }
    switch (difficulty) {
        case 1:
            totalmoney += 200;
            lives = 20;
            towerSpots = [];
            towerSpots = towerSpots1;
            round = 0;
            break;
        case 2:
            totalmoney += 100;
            lives = 15;
            towerSpots = [];
            towerSpots = towerSpots2;
            round = 0;
            break;
        case 3:
            totalmoney += 0;
            lives = 10;
            towerSpots = [];
            towerSpots = towerSpots3;
            round = 0;
            break;
        case 4:
            totalmoney += -50;
            lives = 1;
            towerSpots = [];
            towerSpots = towerSpots4;
            round = 0;
            break;
        case 5:
            totalmoney = 1000000;
            lives = 10000;
            towerSpots = [];
            for(var x=0; x<canvas.width; x += 10){
                for(var y=0; y<canvas.height; y += 10){
                    towerSpots.push([x,y]);
                }
            }
            availableTowers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            bonusHint = "Sandbox, feel free to test out different tower combinations";
            hint = "Custom Sandbox rounds";
            round = output.innerHTML-1;
            break;
    }
    state.update(lives, totalmoney, round, towers);
    animate();
});

//pause menu 
retryButton2.addEventListener('click', function () {
    pauseMenu.style.display = "none";
    cancelAnimationFrame(animationId);
    //remove all towers and enemies
    for(var i = towers.length-1; i > -1; i--){
        towers[i].sold = 1;
        //remove range
        towers[i].selected = 0;
        towers[i].draw();
        towers.splice(i, 1);
    }
    for(var i = enemies.length-1; i > -1; i--){
        enemies.splice(i, 1);
    }
    for(var i= lasers.length-1; i>-1; i--){
        lasers.splice(i, 1);
    }
    //reset variables to previous rounds
    gameIsOver = 0;
    autostart = "StartWave";
    round = state.round;
    waveEnded = 1;

    //deep copy state.towers so it doesn't get updated
    var tempTowers = state.towers.map((x) => x);

    for(var i=0; i<tempTowers.length; i++){//replace towers
        towers.push(new Tower(tempTowers[i].x, tempTowers[i].y, tempTowers[i].type, state.levels[i], 0));
        towers[towers.length-1].update();
        towers[towers.length-1].target = tempTowers[i].target;
        if(towers[i].type == "tesla"){//reset tesla charge
            towers[towers.length-1].charge = tempTowers[i].charge;
        }
        if(towers[i].type == "farm"){//remember farm generated
            towers[towers.length-1].generated = tempTowers[i].generated;
        }
        towershoot(towers[towers.length-1]);
        if(tempTowers[i].level =="6" && tempTowers[i].type == "laser"){
            towershoot(towers[towers.length-1]);
            towershoot(towers[towers.length-1]);
            towershoot(towers[towers.length-1]);
            towershoot(towers[towers.length-1]);
        }
    }
    TowerPlaced();
    lives = state.lives;
    totalmoney = state.totalmoney;
    retried = 1;
    pauseButton();
});

menuButton3.addEventListener('click', function () {
    cancelAnimationFrame(animationId);
    pauseMenu.style.display = "none";
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

resumeButton.addEventListener('click', function () {
    pauseMenu.style.display = "none";
    paused = 0;
    animate();
});