"use strict";
// exports.__esModule = true;
var canvas = document.querySelector("canvas");
//@ts-ignore
var c = canvas.getContext("2d");
//html buttons
var startGameButton = document.querySelector('#startGameBtn');
var mainMenu = document.querySelector('#mainMen');
var basicMap = document.querySelector('#mapBasic');
var crossMap = document.querySelector('#mapCross');
var doubleMap = document.querySelector('#mapDouble');
var symmetryMap = document.querySelector('#mapSymmetry');
var castleMap = document.querySelector('#mapBrokenCastle');
var stoneMap = document.querySelector('#mapStoneCliffs');
var easyDifficulty = document.querySelector('#difficultyEasy');
var mediumDifficulty = document.querySelector('#difficultyMedium');
var hardDifficulty = document.querySelector('#difficultyHard');
var impossibleDifficulty = document.querySelector('#difficultyImpossible');
var sandboxDifficulty = document.querySelector('#difficultySandbox');
var gameOverMenu = document.querySelector('#gameOver');
var youWinMenu = document.querySelector('#youWin');
var pauseMenu = document.querySelector('#pauseButton');
var menuButton = document.querySelector('#menu');
var menuButton2 = document.querySelector('#menu2');
var restartButton = document.querySelector('#startOver');
var restartButton2 = document.querySelector('#startOver2');
var retryButton = document.querySelector('#retry');
var nextLevelButton = document.querySelector('#nextLevel');
var startingRound = document.querySelector('#startRound');
var menuButton3 = document.querySelector('#menu3');
var retryButton2 = document.querySelector('#retry2');
var resumeButton = document.querySelector('#resume');
// const background = document.querySelector('#myVideo');
// to do 
// tomorrow: html waves consistent for restarts. stone cliffs only easy/medium. 
// cont: remember updates. huge slow buff, reworked buffer, tower placement toggle / more spots 
/*
subclasses for towers and like everything else
pause button
visuals especially maps and tower turning?
flamethrower effects / names
abilities tower? mines, smite, burn/weaken/buff, group teleport, freeze/stun, money,
storyline
tailored waves to levels + storyline for castle, and tripple
win screen better?
map unlockables (easy)
getting user data
*/
//global variables and inital state
//@ts-ignore
canvas.width = innerWidth;
//@ts-ignore
canvas.height = innerHeight;
//@ts-ignore
var scaleH = canvas.height / 890;
//@ts-ignore
var scaleW = canvas.width / 1920;
var difficulty = 3; // 1-4 1=easy, 2=medium, 3=hard(default), 4=insane
var walls = [];
var towerSpots = [];
var towerSpots1 = [];
var towerSpots2 = [];
var towerSpots3 = [];
var towerSpots4 = [];
var paths2 = [[-1]];
var paths3 = [[-1]];
var pathNum = 0;
//@ts-ignore
var paths = choosepath(0); // 0=basic 1=cross 2=double 3=symmetry 4=castle 5=tripple
var availableTowers = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5]; //mostly boolean values for which towers you can use. snip, flame, tesla, laser, slow, bomb, farm, rail, buff, super, level6, level7, selling, upgrade level.
var totalmoney = 500;
var lives = 10;
var numboxes = 20;
var mouseover = "none";
var selectedTower = "none";
var mouseX = 0;
var mouseY = 0;
var round = 0;
var autostart = "StartWave";
var waveStart = 0;
var retried = 0;
var gameIsOver = 0;
var paused = 0;
var mouseDown = 0;
var draggingTower = 0;
var placingTowers = "Click to Place";
var speedModifier = 1;
var showTowerSpots = 1;
var waveEnded = 1;
var hint = "";
var bonusHint = "Welcome to Final Defence! Good Luck!";
var menutype = 0; //0 = main menu 1 = tower menu
//tower prices 
var snipercosts = [150, 200, 250, 300, 350, 1000, 1400];
var miniguncosts = [100, 150, 200, 250, 300, 600, 700];
var teslacosts = [200, 220, 240, 300, 350, 1100, 1200];
var lasercosts = [150, 200, 250, 300, 350, 900, 1400];
var farmcosts = [800, 1000, 1200, 1400, 1600, 1800, 2000];
var icecosts = [100, 120, 150, 200, 200, 500, 500];
var bombcosts = [100, 150, 200, 250, 300, 800, 800];
var supercosts = [3000, 4000, 5000, 6000, 7000, 10000, 15000];
var buffercosts = [100, 200, 400, 500, 700];
var railguncosts = [400, 500, 600, 700, 800, 1200, 1200];
var towerFootPrint = 95;
//@ts-ignore
gameOverMenu.style.display = "none";
//@ts-ignore
youWinMenu.style.display = "none";
//@ts-ignore
pauseMenu.style.display = "none";
//enemy class
var Enemy = /** @class */ (function () {
    function Enemy(x, y, health, speed, direction, radius, color, enemymoney, armor, shield, regen, path) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.health = health;
        this.speed = speed;
        this.direction = direction;
        this.distance = 0;
        this.enemymoney = enemymoney;
        this.armor = armor;
        this.shield = shield;
        this.regen = regen;
        this.path = path;
        this.maxHealth = health;
        this.regenTime = regen;
    }
    //draws the Enemy
    Enemy.prototype.draw = function () {
        var centerX = this.x;
        var centerY = this.y;
        var size = 1;
        var clear = 0;
        var enemySrc = "./img/GreenRight.png";
        switch (this.color) {
            case "green":
                enemySrc = "./img/Green";
                switch (this.direction) {
                    case "N":
                        enemySrc += "Up.png";
                        centerX += scaleW * 7;
                        centerY += scaleH * 0;
                        break;
                    case "E":
                        enemySrc += "Right.png";
                        centerX += scaleW * 23;
                        centerY += scaleH * 6.5;
                        break;
                    case "S":
                        enemySrc += "Down.png";
                        centerX += scaleW * 8;
                        centerY += scaleH * 20;
                        break;
                    case "W":
                        enemySrc += "Left.png";
                        centerX += scaleW * 0;
                        centerY += scaleH * 5;
                        break;
                }
                break;
            case "yellow":
                enemySrc = "./img/Yellow";
                switch (this.direction) {
                    case "N":
                        enemySrc += "Up.png";
                        centerX += scaleW * 7;
                        centerY += scaleH * 0;
                        break;
                    case "E":
                        enemySrc += "Right.png";
                        centerX += scaleW * 23;
                        centerY += scaleH * 6.5;
                        break;
                    case "S":
                        enemySrc += "Down.png";
                        centerX += scaleW * 8;
                        centerY += scaleH * 20;
                        break;
                    case "W":
                        enemySrc += "Left.png";
                        centerX += scaleW * 0;
                        centerY += scaleH * 5;
                        break;
                }
                break;
            case "pink":
                enemySrc = "./img/Swamp";
                size = 0.8;
                switch (this.direction) {
                    case "N":
                        enemySrc += "Up.png";
                        centerX += scaleW * 7;
                        centerY += scaleH * 0;
                        break;
                    case "E":
                        enemySrc += "Right.png";
                        centerX += scaleW * 23;
                        centerY += scaleH * 6.5;
                        break;
                    case "S":
                        enemySrc += "Down.png";
                        centerX += scaleW * 8;
                        centerY += scaleH * 20;
                        break;
                    case "W":
                        enemySrc += "Left.png";
                        centerX += scaleW * 0;
                        centerY += scaleH * 5;
                        break;
                }
                break;
            case "red":
                enemySrc = "./img/Red";
                size = 1.2;
                switch (this.direction) {
                    case "N":
                        enemySrc += "Up.png";
                        centerX += scaleW * 7;
                        centerY += scaleH * 0;
                        break;
                    case "E":
                        enemySrc += "Right.png";
                        centerX += scaleW * 23;
                        centerY += scaleH * 6.5;
                        break;
                    case "S":
                        enemySrc += "Down.png";
                        centerX += scaleW * 8;
                        centerY += scaleH * 20;
                        break;
                    case "W":
                        enemySrc += "Left.png";
                        centerX += scaleW * 0;
                        centerY += scaleH * 5;
                        break;
                }
                break;
            case "black":
                enemySrc = "./img/Black";
                switch (this.direction) {
                    case "N":
                        enemySrc += "Up.png";
                        centerX += scaleW * 7;
                        centerY += scaleH * 0;
                        break;
                    case "E":
                        enemySrc += "Right.png";
                        centerX += scaleW * 23;
                        centerY += scaleH * 6.5;
                        break;
                    case "S":
                        enemySrc += "Down.png";
                        centerX += scaleW * 8;
                        centerY += scaleH * 20;
                        break;
                    case "W":
                        enemySrc += "Left.png";
                        centerX += scaleW * 0;
                        centerY += scaleH * 5;
                        break;
                }
                break;
            case "boss":
                if (this.armor > 0) {
                    enemySrc = "./img/ABoss";
                    switch (this.direction) {
                        case "N":
                            enemySrc += "Up.png";
                            centerX += scaleW * 11;
                            centerY += scaleH * 4;
                            break;
                        case "E":
                            enemySrc += "Right.png";
                            centerX += scaleW * 33;
                            centerY += scaleH * 11.5;
                            break;
                        case "S":
                            enemySrc += "Down.png";
                            centerX += scaleW * 12;
                            centerY += scaleH * 29;
                            break;
                        case "W":
                            enemySrc += "Left.png";
                            centerX += scaleW * 5;
                            centerY += scaleH * 11;
                            break;
                    }
                }
                else {
                    enemySrc = "./img/Boss";
                    switch (this.direction) {
                        case "N":
                            enemySrc += "Up.png";
                            centerX += scaleW * 11;
                            centerY += scaleH * 4;
                            break;
                        case "E":
                            enemySrc += "Right.png";
                            centerX += scaleW * 33;
                            centerY += scaleH * 11.5;
                            break;
                        case "S":
                            enemySrc += "Down.png";
                            centerX += scaleW * 12;
                            centerY += scaleH * 29;
                            break;
                        case "W":
                            enemySrc += "Left.png";
                            centerX += scaleW * 5;
                            centerY += scaleH * 11;
                            break;
                    }
                }
                break;
            case "clear":
                clear = 1;
                break;
            default:
                console.log("invalid enemy color!");
                break;
        }
        if (clear == 0) {
            var enemyImg = new Sprite({
                position: {
                    x: centerX,
                    y: centerY
                },
                imageSrc: enemySrc,
                scale: size * (scaleH / scaleW)
            });
            enemyImg.update();
        }
        //test draw hitbox
        // //@ts-ignore
        // c.fillStyle = "black";
        // //@ts-ignore
        // c.beginPath();
        // //@ts-ignore
        // c.arc(this.x, this.y, scaleH * this.radius, 0, Math.PI * 2);
        // //@ts-ignore
        // c.stroke();
        if (clear == 0) {
            //shield 
            if (this.shield > 0) {
                //@ts-ignore
                c.strokeStyle = "blue";
                if (this.shield > 20) {
                    //@ts-ignore
                    c.lineWidth = 40;
                }
                else {
                    //@ts-ignore
                    c.lineWidth = this.shield * 2;
                }
                //@ts-ignore
                c.beginPath();
                //@ts-ignore
                c.arc(this.x, this.y, scaleH * this.radius * 2, 0, Math.PI * 2); //double radius of hitbox
                //@ts-ignore
                c.stroke();
                //@ts-ignore
                c.lineWidth = 1;
                //@ts-ignore
                c.strokeStyle = "black";
            }
            //health bar
            //@ts-ignore
            c.fillStyle = "white";
            //@ts-ignore
            c.textAlign = "center";
            //@ts-ignore
            c.font = "30px serif";
            var temparmor = "";
            if (this.armor > 0) {
                temparmor = "\uD83D\uDEE1\uFE0F" + this.armor;
            }
            var healthbar = this.health + temparmor;
            //@ts-ignore
            c.fillText(healthbar, this.x, this.y - this.radius - 10);
            //@ts-ignore
            c.stroke();
            if (this.shield > 0) {
                //@ts-ignore
                c.fillStyle = "blue";
                //@ts-ignore
                c.fillText(this.shield, this.x, this.y - this.radius + 20);
                //@ts-ignore
                c.stroke();
            }
        }
    };
    //moves the Enemy with speed
    Enemy.prototype.update = function () {
        //calculate slow
        var slows = 1;
        if (this.color != "boss") {
            for (var i = 0; i < towers.length; i++) {
                if (towers[i].type == "ice" && towers[i].slow > slows) {
                    if (targetinellipse(towers[i].x, towers[i].y, towers[i].range, this.x, this.y, this) == 1) {
                        slows = towers[i].slow;
                    }
                }
            }
        }
        slows = slows / 100;
        if (this.direction == "N") {
            this.y -= (speedModifier * scaleH * this.speed) - (speedModifier * scaleH * this.speed) * slows;
        }
        else if (this.direction == "E") {
            this.x += (speedModifier * scaleH * this.speed) - (speedModifier * scaleH * this.speed) * slows;
        }
        else if (this.direction == "S") {
            this.y += (speedModifier * scaleH * this.speed) - (speedModifier * scaleH * this.speed) * slows;
        }
        else if (this.direction == "W") {
            this.x -= (speedModifier * scaleH * this.speed) - (speedModifier * scaleH * this.speed) * slows;
        }
        this.distance += (speedModifier * scaleH * this.speed) - (speedModifier * scaleH * this.speed) * slows;
        //calculate regen
        if (this.regen > 0) {
            if (this.regenTime <= 0) {
                if (this.health <= this.maxHealth - 10) {
                    this.health += 10;
                }
                else if (this.health != this.maxHealth) {
                    this.health = this.maxHealth;
                }
                this.regenTime = this.regen;
            }
            else {
                this.regenTime--;
            }
        }
        this.draw();
    };
    //checks direciton change
    Enemy.prototype.changeDirection = function () {
        var tempMap = [[]];
        if (this.path == 1) {
            tempMap = paths;
        }
        else if (this.path == 2) {
            //@ts-ignore
            tempMap = paths2;
        }
        else if (this.path == 3) {
            //@ts-ignore
            tempMap = paths3;
        }
        else {
            console.log("badpath");
        }
        for (var i = 1; i < tempMap.length - 1; i++) {
            //chenge the enemies direction
            if (tempMap[i][0] == tempMap[i + 1][0] && tempMap[i][1] > tempMap[i + 1][1]) { // up path
                if (tempMap[i][0] > tempMap[i - 1][0]) { //coming from left side
                    //@ts-ignore
                    if (this.x > (canvas.width / 100) * tempMap[i][0] + scaleW * (75 / 2) && this.x < (canvas.width / 100) * tempMap[i][0] + scaleW * 75 && this.y > (canvas.height / 100) * tempMap[i][1] && this.y < (canvas.height / 100) * tempMap[i][1] + scaleH * 75) {
                        this.direction = "N";
                    }
                }
                else { //coming from right side
                    //@ts-ignore
                    if (this.x > (canvas.width / 100) * tempMap[i][0] && this.x < (canvas.width / 100) * tempMap[i][0] + scaleW * (75 / 2) && this.y > (canvas.height / 100) * tempMap[i][1] && this.y < (canvas.height / 100) * tempMap[i][1] + scaleH * 75) {
                        this.direction = "N";
                    }
                }
            }
            else if (tempMap[i][0] == tempMap[i + 1][0] && tempMap[i][1] < tempMap[i + 1][1]) { // down path
                if (tempMap[i][0] > tempMap[i - 1][0]) { //coming from left side
                    //@ts-ignore
                    if (this.x > (canvas.width / 100) * tempMap[i][0] + scaleW * (75 / 2) && this.x < (canvas.width / 100) * tempMap[i][0] + scaleW * 75 && this.y > (canvas.height / 100) * tempMap[i][1] && this.y < (canvas.height / 100) * tempMap[i][1] + scaleH * 75) {
                        this.direction = "S";
                    }
                }
                else { //coming from right side
                    //@ts-ignore
                    if (this.x > (canvas.width / 100) * tempMap[i][0] && this.x < (canvas.width / 100) * tempMap[i][0] + scaleW * (75 / 2) && this.y > (canvas.height / 100) * tempMap[i][1] && this.y < (canvas.height / 100) * tempMap[i][1] + scaleH * 75) {
                        this.direction = "S";
                    }
                }
            }
            else if (tempMap[i][1] == tempMap[i + 1][1] && tempMap[i][0] > tempMap[i + 1][0]) { // left path
                if (tempMap[i][1] > tempMap[i - 1][1]) { //coming from top
                    //@ts-ignore
                    if (this.x > (canvas.width / 100) * tempMap[i][0] && this.x < (canvas.width / 100) * tempMap[i][0] + scaleW * 75 && this.y > (canvas.height / 100) * tempMap[i][1] + scaleH * (75 / 2) && this.y < (canvas.height / 100) * tempMap[i][1] + scaleH * 75) {
                        this.direction = "W";
                    }
                }
                else { //coming from bottom
                    //@ts-ignore
                    if (this.x > (canvas.width / 100) * tempMap[i][0] && this.x < (canvas.width / 100) * tempMap[i][0] + scaleW * 75 && this.y > (canvas.height / 100) * tempMap[i][1] && this.y < (canvas.height / 100) * tempMap[i][1] + scaleH * (75 / 2)) {
                        this.direction = "W";
                    }
                }
            }
            else if (tempMap[i][1] == tempMap[i + 1][1] && tempMap[i][0] < tempMap[i + 1][0]) { // right path
                if (tempMap[i][1] > tempMap[i - 1][1]) { //coming from top
                    //@ts-ignore
                    if (this.x > (canvas.width / 100) * tempMap[i][0] && this.x < (canvas.width / 100) * tempMap[i][0] + scaleW * 75 && this.y > (canvas.height / 100) * tempMap[i][1] + scaleH * (75 / 2) && this.y < (canvas.height / 100) * tempMap[i][1] + scaleH * 75) {
                        this.direction = "E";
                    }
                }
                else { //coming from bottom
                    //@ts-ignore
                    if (this.x > (canvas.width / 100) * tempMap[i][0] && this.x < (canvas.width / 100) * tempMap[i][0] + scaleW * 75 && this.y > (canvas.height / 100) * tempMap[i][1] && this.y < (canvas.height / 100) * tempMap[i][1] + scaleH * (75 / 2)) {
                        this.direction = "E";
                    }
                }
            }
        }
    };
    return Enemy;
}());
// Tower class
var Tower = /** @class */ (function () {
    function Tower(x, y, type, level, selected) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.level = level;
        this.selected = selected;
        this.sold = 0;
        this.direction = Math.PI / 2;
        this.directionX = this.x;
        this.directionY = this.y - 50;
        this.shootNow = 10;
        this.buffs = 0;
        if (this.type == "Sniper") {
            this.reload = 750;
            this.damage = 10;
            this.range = 350;
            this.target = "first";
            this.pierce = 1;
            this.value = 150;
            this.cost = snipercosts;
            this.tallness = -29;
        }
        else if (this.type == "Minigun") {
            this.reload = 120;
            this.damage = 2;
            this.range = 150;
            this.target = "first";
            this.pierce = 1;
            this.value = 100;
            this.cost = miniguncosts;
            this.tallness = -18;
        }
        else if (this.type == "tesla") {
            this.maxcharge = 400;
            this.damage = 5;
            this.range = 190;
            this.ischarging = 1;
            this.target = "first";
            this.reload = 200;
            this.charge = 200;
            this.numTargets = 1;
            this.chargespd = 2.2;
            this.teslatargets = [];
            this.value = 200;
            this.cost = teslacosts;
            this.tallness = 31;
        }
        else if (this.type == "laser") {
            this.reload = 10;
            this.range = 190;
            this.lasermax = 10;
            this.lasermin = 1;
            this.lasertime = 5;
            this.heatup = 4;
            this.target = "strong";
            this.value = 150;
            this.cost = lasercosts;
            this.tallness = 36;
        }
        else if (this.type == "farm") {
            this.generated = 0;
            this.income = 50;
            this.range = 10000;
            this.value = 800;
            this.cost = farmcosts;
            this.tallness = 0;
        }
        else if (this.type == "ice") {
            this.range = 200;
            this.slow = 10;
            this.value = 100;
            this.cost = icecosts;
            this.tallness = 0;
            this.target = "first";
        }
        else if (this.type == "bomb") {
            this.damage = 2;
            this.reload = 750;
            this.splash = 80;
            this.range = 150;
            this.pierce = 25;
            this.target = "first";
            this.value = 100;
            this.cost = bombcosts;
            this.tallness = -10;
        }
        else if (this.type == "super") {
            this.reload = 120;
            this.damage = 50;
            this.range = 350;
            this.target = "first";
            this.pierce = 1;
            this.value = 3000;
            this.cost = supercosts;
            this.tallness = -4;
        }
        else if (this.type == "buffer") { //1=range, 2=atk spd, 3=damage, 4=peirce, 5=damage2
            this.range = 10000;
            this.buff = 1;
            this.value = 100;
            this.cost = buffercosts;
            this.tallness = 0;
        }
        else if (this.type == "railgun") { //piercing shot straight down the line. 
            this.reload = 2000;
            this.damage = 20;
            this.range = 350;
            this.pierce = 35;
            this.target = "first";
            this.value = 400;
            this.cost = railguncosts;
            this.tallness = 0;
            this.railwidth = 11;
        }
        this.draw();
    }
    // draws the tower
    Tower.prototype.draw = function () {
        //shows if placeable 
        if (this.level == -1) {
            //@ts-ignore
            c.fillStyle = "red";
            //@ts-ignore
            c.fillRect(this.x - scaleW * towerFootPrint / 2, this.y - scaleH * towerFootPrint / 2, scaleW * towerFootPrint, scaleH * towerFootPrint);
        }
        if (this.type == "Sniper") {
            //sniper sprite
            var source = "./img/towers/sniper/sniper1.png"; // "./img/sniper.png",
            var pos = [6, 10];
            // if(this.level > 3){
            //     source = "./img/towers/sniper/tower_pistol_lv2_down.png";
            //     pos = [9, -34];
            // }if(this.level > 5){
            //     source = "./img/towers/sniper/tower_pistol_lv3down.png";
            //     pos = [9, -36];
            // }
            var towerImg = new Sprite({
                position: {
                    x: this.x + pos[0],
                    y: this.y + pos[1]
                },
                imageSrc: source,
                scale: 3.3
            });
            towerImg.update();
        }
        if (this.type == "Minigun") {
            //minigun sprite
            var source = "./img/towers/minigun/1_down.png";
            var pos = [6, 10];
            // if(this.level > 3){
            //     source = "./img/towers/minigun/2_down.png";
            //     pos = [10, -34];
            // }if(this.level > 5){
            //     source = "./img/towers/minigun/3_down.png";
            //     pos = [10, -35];
            // }
            var towerImg = new Sprite({
                position: {
                    x: this.x + pos[0],
                    y: this.y + pos[1]
                },
                imageSrc: source,
                scale: 2.7
            });
            towerImg.update();
        }
        if (this.type == "laser") {
            //laser sprite
            var source = "./img/towers/laser/1_up.png";
            var pos = [10, 10];
            // if(this.level > 3){
            //     source = "./img/towers/laser/2_up.png";
            //     pos = [17, -33];
            // }if(this.level > 5){
            //     source = "./img/towers/laser/3_up.png";
            //     pos = [17, -36];
            // }
            var towerImg = new Sprite({
                position: {
                    x: this.x + pos[0],
                    y: this.y + pos[1]
                },
                imageSrc: source,
                scale: 2.9
            });
            towerImg.update();
        }
        if (this.type == "tesla") {
            //tesla sprite
            var source = "./img/towers/tesla/tower_mg_1_up.png";
            var pos = [10, 10];
            // if(this.level > 3){
            //     source = "./img/towers/tesla/tower_mg_2_up.png";
            //     pos = [17, -33];
            // }if(this.level > 5){
            //     source = "./img/towers/tesla/3_up.png";
            //     pos = [17, -33];
            // }
            var towerImg = new Sprite({
                position: {
                    x: this.x + pos[0],
                    y: this.y + pos[1]
                },
                imageSrc: source,
                scale: 2.5
            });
            towerImg.update();
        }
        if (this.type == "ice") {
            //ice sprite
            var source = "./img/towers/ice/1_down_copy.png";
            var pos = [15, 3];
            // if(this.level > 3){
            //     source = "./img/towers/ice/2_down.png";
            //     pos = [17, -28];
            // }if(this.level > 5){
            //     source = "./img/towers/ice/3_down.png";
            //     pos = [17, -29];
            // }
            var towerImg = new Sprite({
                position: {
                    x: this.x + pos[0],
                    y: this.y + pos[1]
                },
                imageSrc: source,
                scale: 5.0
            });
            towerImg.update();
        }
        if (this.type == "farm") {
            //farm sprite
            var source = "./img/towers/farm/farm.png";
            var pos = [10, 10];
            var towerImg = new Sprite({
                position: {
                    x: this.x + pos[0],
                    y: this.y + pos[1]
                },
                imageSrc: source,
                scale: 2.0
            });
            towerImg.update();
        }
        if (this.type == "bomb") {
            //bomb sprite
            var source = "./img/towers/bomb/1_down.png";
            var pos = [7, 4];
            // if(this.level > 3){
            //     source = "./img/towers/bomb/2_down.png";
            //     pos = [10, -34];
            // }if(this.level > 5){
            //     source = "./img/towers/bomb/3_down.png";
            //     pos = [10, -34];
            var towerImg = new Sprite({
                position: {
                    x: this.x + pos[0],
                    y: this.y + pos[1]
                },
                imageSrc: source,
                scale: 3.5
            });
            towerImg.update();
        }
        if (this.type == "super") {
            //super sprite
            var source = "./img/towers/super/1_down.png";
            var pos = [11, 4];
            // if(this.level > 3){
            //     source = "./img/towers/super/2_down.png";
            //     pos = [15, -36];
            // }if(this.level > 5){
            //     source = "./img/towers/super/3_down.png";
            //     pos = [15, -36];
            // }
            var towerImg = new Sprite({
                position: {
                    x: this.x + pos[0],
                    y: this.y + pos[1]
                },
                imageSrc: source,
                scale: 3.2
            });
            towerImg.update();
        }
        if (this.type == "buffer") {
            //buffer sprite
            var source = "./img/towers/buffer/buff.png";
            var pos = [8, 9];
            // if(this.level > 2){
            //     source = "./img/towers/buffer/buff.png";
            //     pos = [12, -28];
            // }if(this.level > 4){
            //     source = "./img/towers/buffer/buff.png";
            //     pos = [12, -32];
            // }
            var towerImg = new Sprite({
                position: {
                    x: this.x + pos[0],
                    y: this.y + pos[1]
                },
                imageSrc: source,
                scale: 4.0
            });
            towerImg.update();
        }
        if (this.type == "railgun") {
            //railgun sprite
            var source = "./img/towers/rail/1_down.png";
            var pos = [9, 2];
            // if(this.level > 3){
            //     source = "./img/towers/rail/2_down.png";
            //     pos = [14, -33];
            // }if(this.level > 5){
            //     source = "./img/towers/rail/3_down.png";
            //     pos = [14, -34];
            // }
            var towerImg = new Sprite({
                position: {
                    x: this.x + pos[0],
                    y: this.y + pos[1]
                },
                imageSrc: source,
                scale: 3.4
            });
            towerImg.update();
        }
        // //base
        // if(this.level == -1){
        //     //@ts-ignore
        //     c.fillStyle = "red";
        // }else if(this.level > 5){
        //     //@ts-ignore
        //     c.fillStyle = "#CCBA1F";
        // }else{
        //     //@ts-ignore
        //     c.fillStyle = "black";
        // }
        // //@ts-ignore
        // c.fillRect(this.x - scaleW * towerFootPrint/2, this.y - scaleH * towerFootPrint/2, scaleW * towerFootPrint, scaleH * towerFootPrint);
        // //@ts-ignore
        // c.fillStyle = "black";
        // //@ts-ignore
        // c.fillRect(this.x - scaleW * (towerFootPrint/2 - 5), this.y - scaleH * (towerFootPrint/2 -5), scaleW * (towerFootPrint - 10), scaleH * (towerFootPrint -10));
        // //head
        // if (this.type == "Sniper") {
        //     //@ts-ignore
        //     c.fillStyle = "gray";
        // }
        // else if (this.type == "Minigun") {
        //     //@ts-ignore
        //     c.fillStyle = "#800000";
        // }
        // else if (this.type == "laser") {
        //     //@ts-ignore
        //     c.fillStyle = "#8F2E86";
        // }
        // else if (this.type == "tesla") {
        //     //@ts-ignore
        //     c.fillStyle = "#784315";
        // }else if(this.type == "farm"){
        //     //@ts-ignore
        //     c.fillStyle = "yellow";
        // }else if(this.type == "ice"){
        //     //@ts-ignore
        //     c.fillStyle = "white";
        // }else if(this.type == "bomb"){
        //     //@ts-ignore
        //     c.fillStyle = "blue";
        // }else if(this.type == "super"){
        //     //@ts-ignore
        //     c.fillStyle = "#FFCD0A";
        // }else if(this.type == "buffer"){
        //     //@ts-ignore
        //     c.fillStyle = "#FF7173";
        // }else if(this.type == "railgun"){
        //     //@ts-ignore
        //     c.fillStyle = "#018F00";
        // }
        // //@ts-ignore
        // c.beginPath();
        // if (this.type == "Minigun" && this.level == 6) {
        //     //@ts-ignore
        //     c.arc(this.x + 15*Math.cos(this.direction-Math.PI/2), this.y + 15*Math.sin(this.direction-Math.PI/2), scaleH * 15, 0, Math.PI * 2);
        //     //@ts-ignore
        //     c.arc(this.x - 15*Math.cos(this.direction-Math.PI/2), this.y - 15*Math.sin(this.direction-Math.PI/2), scaleH * 15, 0, Math.PI * 2);
        // }
        // else {
        //     //@ts-ignore
        //     c.arc(this.x, this.y, scaleH * 25, 0, Math.PI * 2);
        // }
        // //@ts-ignore
        // c.fill();
        //buffs 
        if (this.buffs >= 1) {
            //@ts-ignore
            c.fillStyle = "#FF7173";
            //@ts-ignore
            c.fillRect(this.x - scaleW * (towerFootPrint / 2 - 5) + scaleW * (towerFootPrint - 10) - scaleW * 22.5, this.y - scaleH * (towerFootPrint / 2 - 2.5), scaleW * 25, scaleH * 15);
        }
        if (this.buffs >= 2) {
            //@ts-ignore
            c.fillRect(this.x - scaleW * (towerFootPrint / 2 - 5) + scaleW * (towerFootPrint - 10) - scaleW * 22.5, this.y - scaleH * (towerFootPrint / 2 - 17.5), scaleW * 25, scaleH * 15);
        }
        if (this.buffs >= 3) {
            //@ts-ignore
            c.fillRect(this.x - scaleW * (towerFootPrint / 2 - 5) + scaleW * (towerFootPrint - 10) - scaleW * 22.5, this.y - scaleH * (towerFootPrint / 2 - 32.5), scaleW * 25, scaleH * 15);
        }
        if (this.buffs >= 4) {
            //@ts-ignore
            c.fillRect(this.x - scaleW * (towerFootPrint / 2 - 5) + scaleW * (towerFootPrint - 10) - scaleW * 22.5, this.y - scaleH * (towerFootPrint / 2 - 47.5), scaleW * 25, scaleH * 15);
        }
        if (this.buffs >= 5) {
            //@ts-ignore
            c.fillRect(this.x - scaleW * (towerFootPrint / 2 - 5) + scaleW * (towerFootPrint - 10) - scaleW * 22.5, this.y - scaleH * (towerFootPrint / 2 - 62.5), scaleW * 25, scaleH * 15);
        }
        //level
        if (this.level >= 1) {
            //@ts-ignore
            c.fillStyle = "yellow";
            if (this.level >= 6) {
                //@ts-ignore
                c.fillStyle = "blue";
            }
            if (this.level >= 7) {
                //@ts-ignore
                c.fillStyle = "red";
            }
            if (this.type == "buffer") {
                //@ts-ignore
                c.fillStyle = "#FF7173";
            }
            //@ts-ignore
            c.fillRect(this.x - scaleW * (towerFootPrint / 2 - 5) + scaleW * (towerFootPrint - 10) - scaleW * 20, this.y - scaleH * (towerFootPrint / 2 - 5), scaleW * 20, scaleH * 10);
        }
        if (this.level >= 2) {
            //@ts-ignore
            c.fillRect(this.x - scaleW * (towerFootPrint / 2 - 5) + scaleW * (towerFootPrint - 10) - scaleW * 20, this.y - scaleH * (towerFootPrint / 2 - 20), scaleW * 20, scaleH * 10);
        }
        if (this.level >= 3) {
            //@ts-ignore
            c.fillRect(this.x - scaleW * (towerFootPrint / 2 - 5) + scaleW * (towerFootPrint - 10) - scaleW * 20, this.y - scaleH * (towerFootPrint / 2 - 35), scaleW * 20, scaleH * 10);
        }
        if (this.level >= 4) {
            //@ts-ignore
            c.fillRect(this.x - scaleW * (towerFootPrint / 2 - 5) + scaleW * (towerFootPrint - 10) - scaleW * 20, this.y - scaleH * (towerFootPrint / 2 - 50), scaleW * 20, scaleH * 10);
        }
        if (this.level >= 5) {
            //@ts-ignore
            c.fillRect(this.x - scaleW * (towerFootPrint / 2 - 5) + scaleW * (towerFootPrint - 10) - scaleW * 20, this.y - scaleH * (towerFootPrint / 2 - 65), scaleW * 20, scaleH * 10);
        }
        //range
        if (this.selected == 1) {
            //@ts-ignore
            c.beginPath();
            //@ts-ignore
            c.ellipse(this.x, this.y, scaleW * this.range, scaleH * this.range, 0, 0, Math.PI * 2);
            //@ts-ignore
            c.lineWidth = 1;
            //@ts-ignore
            c.stroke();
        }
        //tesla charge amount
        if (this.type == "tesla") {
            //@ts-ignore
            c.fillStyle = "blue";
            //@ts-ignore
            c.fillRect(this.x - scaleW * (towerFootPrint / 2 - 5), this.y - scaleH * (towerFootPrint / 2 - 5) + scaleH * (towerFootPrint - 10), scaleW * 10, -scaleH * (towerFootPrint - 10));
            //@ts-ignore
            c.fillStyle = "yellow";
            //@ts-ignore
            c.fillRect(this.x - scaleW * (towerFootPrint / 2 - 5), this.y - scaleH * (towerFootPrint / 2 - 5) + scaleH * (towerFootPrint - 10), scaleW * 10, -(this.charge / this.maxcharge) * scaleH * (towerFootPrint - 10));
        }
        //farm money symbol
        if (this.type == "farm") {
            //@ts-ignore
            c.font = "50px serif";
            //@ts-ignore
            c.fillStyle = "green";
            //@ts-ignore
            c.textAlign = "center";
            //@ts-ignore
            c.fillText("$", this.x, this.y + 15 * scaleH);
            //@ts-ignore
            c.stroke();
        }
    };
    //updates level
    Tower.prototype.update = function () {
        if (this.type == "Sniper") {
            if (this.level == 1) {
                this.reload = 750;
                this.damage = 10;
                this.range = 350;
                this.pierce = 1;
            }
            else if (this.level == 2) {
                this.reload = 750;
                this.damage = 20;
                this.range = 350;
                this.pierce = 1;
            }
            else if (this.level == 3) {
                this.reload = 750;
                this.damage = 30;
                this.range = 350;
                this.pierce = 1;
            }
            else if (this.level == 4) {
                this.reload = 750;
                this.damage = 40;
                this.range = 350;
                this.pierce = 1;
            }
            else if (this.level == 5) {
                this.reload = 750;
                this.damage = 50;
                this.range = 350;
                this.pierce = 1;
            }
            else if (this.level == 6) {
                this.reload = 750;
                this.damage = 80;
                this.range = 350;
                this.pierce = 1;
            }
            else if (this.level == 7) {
                this.reload = 750;
                this.damage = 110;
                this.range = 350;
                this.pierce = 1;
            }
        }
        else if (this.type == "Minigun") {
            if (this.level == 1) {
                this.reload = 120;
                this.damage = 2;
                this.range = 150;
                this.pierce = 1;
            }
            else if (this.level == 2) {
                this.reload = 120;
                this.damage = 4;
                this.range = 150;
                this.pierce = 1;
            }
            else if (this.level == 3) {
                this.reload = 120;
                this.damage = 6;
                this.range = 150;
                this.pierce = 1;
            }
            else if (this.level == 4) {
                this.reload = 120;
                this.damage = 8;
                this.range = 150;
                this.pierce = 1;
            }
            else if (this.level == 5) {
                this.reload = 120;
                this.damage = 10;
                this.range = 150;
                this.pierce = 1;
            }
            else if (this.level == 6) {
                this.reload = 120;
                this.damage = 12;
                this.range = 150;
                this.pierce = 1;
            }
            else if (this.level == 7) {
                this.reload = 120;
                this.damage = 25;
                this.range = 150;
                this.pierce = 1;
            }
        }
        else if (this.type == "laser") {
            if (this.level == 1) {
                this.reload = 10;
                this.range = 190;
                this.lasermax = 10;
                this.lasermin = 1;
                this.lasertime = 5;
                this.heatup = 4;
            }
            else if (this.level == 2) {
                this.reload = 10;
                this.range = 190;
                this.lasermax = 20;
                this.lasermin = 1;
                this.lasertime = 5;
                this.heatup = 8;
            }
            else if (this.level == 3) {
                this.reload = 10;
                this.range = 190;
                this.lasermax = 30;
                this.lasermin = 1;
                this.lasertime = 5;
                this.heatup = 12;
            }
            else if (this.level == 4) {
                this.reload = 10;
                this.range = 190;
                this.lasermax = 40;
                this.lasermin = 1;
                this.lasertime = 5;
                this.heatup = 16;
            }
            else if (this.level == 5) {
                this.reload = 10;
                this.range = 190;
                this.lasermax = 50;
                this.lasermin = 1;
                this.lasertime = 5;
                this.heatup = 20;
            }
            else if (this.level == 6) {
                this.reload = 10;
                this.range = 190;
                this.lasermax = 10;
                this.lasermin = 10;
                this.lasertime = 10;
                this.heatup = 0;
            }
            else if (this.level == 7) {
                this.reload = 10;
                this.range = 190;
                this.lasermax = 100;
                this.lasermin = 5;
                this.lasertime = 5;
                this.heatup = 25;
            }
        }
        else if (this.type == "tesla") {
            if (this.level == 1) {
                this.maxcharge = 600;
                this.damage = 5;
                this.range = 190;
                this.ischarging = 1;
                this.reload = 200;
                this.charge = 350;
                this.numTargets = 1;
                this.chargespd = 2.2;
                this.teslatargets = [];
            }
            else if (this.level == 2) {
                this.maxcharge = 600;
                this.damage = 10;
                this.range = 190;
                this.ischarging = 1;
                this.reload = 200;
                this.charge = 350;
                this.numTargets = 1;
                this.chargespd = 2.2;
                this.teslatargets = [];
            }
            else if (this.level == 3) {
                this.maxcharge = 600;
                this.damage = 15;
                this.range = 190;
                this.ischarging = 1;
                this.reload = 200;
                this.charge = 300;
                this.numTargets = 1;
                this.chargespd = 2.2;
                this.teslatargets = [];
            }
            else if (this.level == 4) {
                this.maxcharge = 600;
                this.damage = 20;
                this.range = 190;
                this.ischarging = 1;
                this.reload = 200;
                this.charge = 300;
                this.numTargets = 1;
                this.chargespd = 2.2;
                this.teslatargets = [];
            }
            else if (this.level == 5) {
                this.maxcharge = 600;
                this.damage = 25;
                this.range = 190;
                this.ischarging = 1;
                this.reload = 200;
                this.charge = 300;
                this.numTargets = 1;
                this.chargespd = 2.2;
                this.teslatargets = [];
            }
            else if (this.level == 6) { //multi target
                this.maxcharge = 600;
                this.damage = 30;
                this.range = 190;
                this.ischarging = 1;
                this.reload = 200;
                this.charge = 300;
                this.numTargets = 2;
                this.chargespd = 2.2;
                this.teslatargets = [];
            }
            else if (this.level == 7) { //no charge / ultimate tesla
                this.maxcharge = 600;
                this.damage = 50;
                this.range = 190;
                this.ischarging = 1;
                this.reload = 200;
                this.charge = this.maxcharge;
                this.numTargets = 1;
                this.chargespd = 2;
                this.teslatargets = [];
            }
        }
        else if (this.type == "farm") {
            if (this.level == 1) {
                this.income = 100;
            }
            else if (this.level == 2) {
                this.income = 230;
            }
            else if (this.level == 3) {
                this.income = 390;
            }
            else if (this.level == 4) {
                this.income = 580;
            }
            else if (this.level == 5) {
                this.income = 700;
            }
            else if (this.level == 6) {
                this.income = 950;
            }
            else if (this.level == 7) {
                this.income = 1300;
            }
        }
        else if (this.type == "ice") {
            if (this.level == 1) {
                this.range = 200;
                this.slow = 20;
            }
            else if (this.level == 2) {
                this.range = 200;
                this.slow = 30;
            }
            else if (this.level == 3) {
                this.range = 200;
                this.slow = 40;
            }
            else if (this.level == 4) {
                this.range = 200;
                this.slow = 50;
            }
            else if (this.level == 5) {
                this.range = 200;
                this.slow = 60;
            }
            else if (this.level == 6) {
                this.slow = 70;
                this.range = 300;
            }
            else if (this.level == 7) {
                this.range = 200;
                this.slow = 80;
            }
        }
        else if (this.type == "bomb") {
            if (this.level == 1) {
                this.damage = 2;
                this.reload = 750;
                this.splash = 80;
                this.range = 150;
                this.pierce = 25;
            }
            else if (this.level == 2) {
                this.damage = 4;
                this.reload = 750;
                this.splash = 80;
                this.range = 150;
                this.pierce = 25;
            }
            else if (this.level == 3) {
                this.damage = 6;
                this.reload = 750;
                this.splash = 80;
                this.range = 150;
                this.pierce = 25;
            }
            else if (this.level == 4) {
                this.damage = 8;
                this.reload = 750;
                this.splash = 80;
                this.range = 150;
                this.pierce = 25;
            }
            else if (this.level == 5) {
                this.damage = 10;
                this.reload = 750;
                this.splash = 80;
                this.range = 150;
                this.pierce = 25;
            }
            else if (this.level == 6) {
                this.damage = 20;
                this.reload = 750;
                this.splash = 150;
                this.range = 150;
                this.pierce = 25;
            }
            else if (this.level == 7) {
                this.damage = 30;
                this.reload = 750;
                this.splash = 80;
                this.range = 150;
                this.pierce = 25;
            }
        }
        else if (this.type == "super") { //super strong but expensive 
            if (this.level == 1) {
                this.reload = 120;
                this.damage = 50;
                this.range = 350;
                this.pierce = 1;
            }
            else if (this.level == 2) {
                this.reload = 120;
                this.damage = 100;
                this.range = 350;
                this.pierce = 1;
            }
            else if (this.level == 3) {
                this.reload = 120;
                this.damage = 150;
                this.range = 350;
                this.pierce = 1;
            }
            else if (this.level == 4) {
                this.reload = 120;
                this.damage = 200;
                this.range = 350;
                this.pierce = 1;
            }
            else if (this.level == 5) {
                this.reload = 120;
                this.damage = 250;
                this.range = 350;
                this.pierce = 1;
            }
            else if (this.level == 6) { //seeking bullets 
                this.reload = 100;
                this.damage = 300;
                this.range = 350;
                this.pierce = 1;
            }
            else if (this.level == 7) { //500 damage
                this.reload = 100;
                this.damage = 500;
                this.range = 350;
                this.pierce = 1;
            }
        }
        else if (this.type == "buffer") { //0=range, 1=atk spd, 2=damage, 3=peirce, 4=damage2
            if (this.level == 1) {
                this.buff = 1;
            }
            else if (this.level == 2) {
                this.buff = 2;
            }
            else if (this.level == 3) {
                this.buff = 3;
            }
            else if (this.level == 4) {
                this.buff = 4;
            }
            else if (this.level == 5) {
                this.buff = 5;
            }
        }
        else if (this.type == "railgun") { //peircing shot straight down the line. 
            if (this.level == 1) {
                this.reload = 1800;
                this.damage = 20;
                this.pierce = 30;
                this.range = 350;
                this.railwidth = 11;
            }
            else if (this.level == 2) {
                this.reload = 1800;
                this.damage = 40;
                this.pierce = 30;
                this.range = 350;
                this.railwidth = 11;
            }
            else if (this.level == 3) {
                this.reload = 1800;
                this.damage = 60;
                this.pierce = 30;
                this.range = 350;
                this.railwidth = 11;
            }
            else if (this.level == 4) {
                this.reload = 1800;
                this.damage = 80;
                this.pierce = 30;
                this.range = 350;
                this.railwidth = 11;
            }
            else if (this.level == 5) {
                this.reload = 1800;
                this.damage = 100;
                this.pierce = 30;
                this.range = 350;
                this.railwidth = 11;
            }
            else if (this.level == 6) { //fast shot
                this.reload = 900;
                this.damage = 120;
                this.pierce = 30;
                this.range = 350;
                this.railwidth = 11;
            }
            else if (this.level == 7) { //ultimate shot
                this.reload = 1800;
                this.damage = 250;
                this.pierce = 30;
                this.range = 350;
                this.railwidth = 26;
            }
        }
        //tower value
        var tempValue = 0;
        for (var i = 0; i < this.level; i++) {
            tempValue += this.cost[i];
        }
        if (this.level == 7) {
            tempValue -= this.cost[5];
        }
        var sellpercent = 8;
        switch (difficulty) {
            case 1:
                sellpercent = 10;
                break;
            case 2:
                sellpercent = 9;
                break;
            case 3:
                sellpercent = 8;
                break;
            case 4:
                sellpercent = 7;
                break;
            case 5:
                sellpercent = 10;
                break;
        }
        // console.log(tempValue);
        this.value = Math.floor(tempValue * (sellpercent / 10));
        // console.log(this.value);
        //0 sell value
        if (availableTowers[12] == 0) {
            this.value = 0;
        }
        //tower buffs
        if (this.buffs > 0) { //1=range, 2=atk spd, 3=damage, 4=peirce, 5=damage2
            this.range = this.range * 1.2;
        }
        if (this.buffs > 1) {
            this.reload *= 0.8;
        }
        if (this.buffs > 2) {
            this.damage += 10;
            if (this.type == "laser" && this.level == 6) {
                this.lasermin += 10;
                this.lasermax += 10;
            }
            else {
                this.lasermin += 1;
                this.lasermax += 10;
            }
        }
        if (this.buffs > 3) {
            if (this.pierce == 1) {
                this.pierce = 2;
            }
            else {
                this.pierce = Math.floor(this.pierce * 1.2);
            }
            if (this.type == "tesla") {
                if (this.level == 6) {
                    this.numTargets = 10;
                }
                else {
                    this.numTargets = 2;
                }
            }
        }
        if (this.buffs > 4) {
            this.damage = Math.floor(this.damage * 1.2);
            if (this.type == "laser" && this.level == 6) {
                this.lasermin = Math.floor(this.lasermin * 1.2);
                this.lasermax = Math.floor(this.lasermax * 1.2);
            }
            else {
                this.lasermin = Math.floor(this.lasermin * 1.2);
                this.lasermax = Math.floor(this.lasermax * 1.2);
            }
        }
    };
    return Tower;
}());
//projectiles class 
var Projectile = /** @class */ (function () {
    function Projectile(x, y, damage, speed, size, color, target, maxlifespan, ap, pierce) {
        this.ap = ap;
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.speed = speed;
        this.size = size;
        this.color = color;
        this.target = target;
        this.lifespan = 0;
        this.maxlifespan = maxlifespan;
        this.pierce = pierce;
        this.enemiesHit = [];
    }
    Projectile.prototype.draw = function () {
        if (this.color != "clear") {
            //@ts-ignore
            c.lineWidth = 1;
            //@ts-ignore
            c.fillStyle = this.color;
            //@ts-ignore
            c.beginPath();
            //@ts-ignore
            c.arc(this.x, this.y, scaleH * this.size, 0, Math.PI * 2);
            //@ts-ignore
            c.fill();
        }
    };
    Projectile.prototype.update = function () {
        var xdiff = Math.abs(this.x - this.target.x);
        var ydiff = Math.abs(this.y - this.target.y);
        var angle = (Math.atan(ydiff / xdiff));
        if (this.x > this.target.x) {
            this.x = this.x - speedModifier * scaleW * (this.speed * Math.cos(angle));
        }
        else {
            this.x = this.x + speedModifier * scaleW * (this.speed * Math.cos(angle));
        }
        if (this.y > this.target.y) {
            this.y = this.y - speedModifier * scaleH * (this.speed * Math.sin(angle));
        }
        else {
            this.y = this.y + speedModifier * scaleH * (this.speed * Math.sin(angle));
        }
        this.lifespan += 1 * speedModifier;
        this.draw();
    };
    return Projectile;
}());
//laser projectile class
var Laser = /** @class */ (function () {
    function Laser(size, color, target, tower) {
        this.size = size;
        this.color = color;
        this.target = target;
        this.tower = tower;
    }
    Laser.prototype.draw = function () {
        //adjust for new sprite
        var spritey = this.tower.y - this.tower.tallness * scaleH;
        if (this.tower.type == "tesla") {
            spritey += 10;
            var dist = Math.abs(Math.sqrt((this.target.x - this.tower.x) * (this.target.x - this.tower.x) + (this.target.y - spritey) * (this.target.y - spritey)));
            //first coil
            var angle = Math.atan((this.target.y - spritey) / (this.tower.x - this.target.x));
            var chain = Math.floor(Math.random() * 50) / 100 - 0.25;
            if (this.target.x > this.tower.x) { //right
                drawLine(c, [this.tower.x, spritey], [(dist / 3) * Math.cos(angle + chain) + this.tower.x, spritey - (dist / 3) * Math.sin(angle + chain)], this.color, this.size);
            }
            else {
                drawLine(c, [this.tower.x, spritey], [this.tower.x - (dist / 3) * Math.cos(angle + chain), spritey + (dist / 3) * Math.sin(angle + chain)], this.color, this.size);
            }
            //second coil 
            if (this.target.x > this.tower.x) { //right
                drawLine(c, [(dist / 3) * Math.cos(angle + chain) + this.tower.x, spritey - (dist / 3) * Math.sin(angle + chain)], [(dist - dist / 3) * Math.cos(angle - chain) + this.tower.x, spritey - (dist - dist / 3) * Math.sin(angle - chain)], this.color, this.size);
            }
            else {
                drawLine(c, [this.tower.x - (dist / 3) * Math.cos(angle + chain), spritey + (dist / 3) * Math.sin(angle + chain)], [this.tower.x - (dist - dist / 3) * Math.cos(angle - chain), spritey + (dist - dist / 3) * Math.sin(angle - chain)], this.color, this.size);
            }
            //third coil 
            if (this.target.x > this.tower.x) { //right
                drawLine(c, [(dist - dist / 3) * Math.cos(angle - chain) + this.tower.x, spritey - (dist - dist / 3) * Math.sin(angle - chain)], [this.target.x, this.target.y], this.color, this.size);
            }
            else {
                drawLine(c, [this.tower.x - (dist - dist / 3) * Math.cos(angle - chain), spritey + (dist - dist / 3) * Math.sin(angle - chain)], [this.target.x, this.target.y], this.color, this.size);
            }
        }
        else if (this.tower.type == "laser") { //laser
            drawLine(c, [this.target.x, this.target.y], [this.tower.x, spritey], this.color, this.size);
        }
        else if (this.tower.type == "railgun") { //railgun
            drawLine(c, [this.target.x, this.target.y], [this.tower.x, spritey], this.color, this.size);
        }
        //@ts-ignore
        c.strokeStyle = "black";
    };
    Laser.prototype.update = function () {
        this.draw();
    };
    return Laser;
}());
//game state class
var GameState = /** @class */ (function () {
    function GameState(lives, totalmoney, round, towers) {
        this.lives = lives;
        this.totalmoney = totalmoney;
        this.round = round;
        this.towers = towers.map(function (x) { return x; });
        this.levels = [];
        for (var i = 0; i < towers.length; i++) {
            this.levels[i] = towers[i].level;
        }
    }
    GameState.prototype.update = function (lives, totalmoney, round, towers) {
        this.lives = lives;
        this.totalmoney = totalmoney;
        this.round = round;
        this.towers = towers.map(function (x) { return x; });
        this.levels = [];
        for (var i = 0; i < towers.length; i++) {
            this.levels[i] = towers[i].level;
        }
    };
    return GameState;
}());
//creates the array of enemies
var pathColors = [];
setPathRubble();
var enemies = [];
var towers = [];
var shots = [];
var lasers = [];
var state = new GameState(9, 9, 9, []);
//calls the waves in succession
function spawnMultiWaves(waveArr) {
    waveEnded = 0;
    waveTimeout(waveArr[0], 0);
    for (var i = 1; i < waveArr.length; i++) {
        //finds time for sending waves
        var time = 0;
        for (var j = i - 1; j >= 0; j--) {
            time += waveArr[j][0] * waveArr[j][1];
        }
        waveTimeout(waveArr[i], time / speedModifier);
    }
    var time = 0;
    for (var j = waveArr.length - 1; j >= 0; j--) {
        time += waveArr[j][0] * waveArr[j][1];
    }
    //wave ended after last wave comes out. 
    waveEndTimeout(time / speedModifier);
}
//sets waveEnd after timeout
function waveEndTimeout(time) {
    var timefunction = setInterval(function () {
        if (paused == 1) {
        }
        else {
            if (retried == 0) {
                waveEnded = 1;
            }
            clearInterval(timefunction);
        }
    }, time);
}
//sends Boss after timeout
function bossTimeout(boss, time) {
    var timefunction = setInterval(function () {
        if (paused == 1) {
        }
        else {
            if (retried == 0) {
                enemies.push(boss);
            }
            clearInterval(timefunction);
        }
    }, time);
}
//calls function after timeout
function waveTimeout(arr, time) {
    var timefunction = setInterval(function () {
        if (paused == 1) {
        }
        else {
            if (retried == 0) {
                if (arr.length > 11) { //for spawning in boss
                    spawnWave(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8], arr[9], arr[10], arr[11]);
                }
                else if (arr.length > 10) { //for just picking paths
                    spawnWave(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8], arr[9], arr[10]);
                }
                else { //regular
                    spawnWave(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8], arr[9]);
                }
            }
            clearInterval(timefunction);
        }
    }, time);
}
//creates the wave
function spawnWave(numenemies, density, health, speed, size, color, Emoney, armor, shield, regen, ePath, boss) {
    if (ePath === void 0) { ePath = 0; }
    if (boss === void 0) { boss = new Enemy(0, 0, 0, 0, "E", 0, "black", 0, 0, 0, 0, 1); }
    var current = 0;
    var bossRound = 0;
    var flipflop = 1;
    if (boss.x != 0 || boss.y != 0) { //boss round
        bossRound = 1;
    }
    var enemiesfunction = setInterval(function () {
        if (paused == 1) {
        }
        else {
            if (gameIsOver == 1 || retried == 1) {
                clearInterval(enemiesfunction);
            }
            else {
                //check when to stop spawning
                if (bossRound == 1) {
                    bossRound = 0;
                    for (var i = 0; i < enemies.length; i++) {
                        if (enemies[i] == boss) {
                            bossRound = 1;
                            break;
                        }
                    }
                    if (bossRound == 0) { //boss is dead
                        waveStart = 0;
                        clearInterval(enemiesfunction);
                    }
                }
                //spawn at enterance 
                if (bossRound == 0) { //default
                    if (paths3[0][0] != -1 && ePath == 0) { //3 lanes
                        switch (flipflop) {
                            case 1:
                                enemies.push(new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], health, speedModifier * speed, spawnDirection(paths), size, color, Emoney, armor, shield, regen, 1));
                                flipflop = 2;
                                break;
                            case 2:
                                enemies.push(new Enemy(spawnPoint(paths2)[0], spawnPoint(paths2)[1], health, speedModifier * speed, spawnDirection(paths2), size, color, Emoney, armor, shield, regen, 2));
                                flipflop = 3;
                                break;
                            case 3:
                                enemies.push(new Enemy(spawnPoint(paths3)[0], spawnPoint(paths3)[1], health, speedModifier * speed, spawnDirection(paths3), size, color, Emoney, armor, shield, regen, 3));
                                flipflop = 1;
                                break;
                        }
                    }
                    else if (paths2[0][0] != -1 && ePath == 0) { //2 lanes
                        if (flipflop == 1) {
                            enemies.push(new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], health, speedModifier * speed, spawnDirection(paths), size, color, Emoney, armor, shield, regen, 1));
                        }
                        else {
                            enemies.push(new Enemy(spawnPoint(paths2)[0], spawnPoint(paths2)[1], health, speedModifier * speed, spawnDirection(paths2), size, color, Emoney, armor, shield, regen, 2));
                        }
                        flipflop = -flipflop;
                    }
                    else if (ePath != 0) { //pick lane with ePath
                        switch (ePath) {
                            case 1:
                                enemies.push(new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], health, speedModifier * speed, spawnDirection(paths), size, color, Emoney, armor, shield, regen, 1));
                                break;
                            case 2:
                                enemies.push(new Enemy(spawnPoint(paths2)[0], spawnPoint(paths2)[1], health, speedModifier * speed, spawnDirection(paths2), size, color, Emoney, armor, shield, regen, 2));
                                break;
                            case 3:
                                enemies.push(new Enemy(spawnPoint(paths3)[0], spawnPoint(paths3)[1], health, speedModifier * speed, spawnDirection(paths3), size, color, Emoney, armor, shield, regen, 3));
                                break;
                        }
                    }
                    else { //1 lane
                        enemies.push(new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], health, speedModifier * speed, spawnDirection(paths), size, color, Emoney, armor, shield, regen, 1));
                    }
                }
                else { //spawn inside boss
                    enemies.push(new Enemy(boss.x, boss.y, health, speedModifier * speed, boss.direction, size, color, Emoney, armor, shield, regen, 1));
                    enemies[enemies.length - 1].distance = boss.distance;
                }
                current++;
                if (current >= numenemies && bossRound == 0) {
                    waveStart = 0;
                    clearInterval(enemiesfunction);
                }
            }
        }
    }, density / speedModifier);
}
function targetinellipse(towerX, towerY, towerRange, targetX, targetY, target) {
    towerRange += target.radius; //gives towers extra range
    var fun = (((targetX - towerX) * (targetX - towerX)) / ((towerRange * scaleW) * (towerRange * scaleW))) + (((targetY - towerY) * (targetY - towerY)) / ((towerRange * scaleH) * (towerRange * scaleH)));
    // var fun = Math.sqrt((targetX-towerX)*(targetX-towerX)+(targetY-towerY)*(targetY-towerY));
    if (fun <= 1) { //fun <= 1 for top function, fun <= target.radius+towerRange
        return 1;
    }
    else {
        return 0;
    }
}
//handles shooting
function towershoot(tower) {
    //global variables
    var lasercounter = 0;
    var laserheatcounter = 0;
    var shieldcounter = 0;
    var damage = tower.damage;
    var speed;
    var lastenemy;
    var firstenemy;
    var strongenemy;
    var weakenemy;
    var target;
    var newtarget;
    var lifespan;
    var size;
    var color;
    var firefunction = setInterval(function () {
        var inrange = 0;
        for (var i = 0; i < enemies.length; i++) { //find fist and last enemies in range
            if (targetinellipse(tower.x, tower.y, tower.range, enemies[i].x, enemies[i].y, enemies[i]) == 1 && inrange == 0) {
                lastenemy = enemies[i];
                firstenemy = enemies[i];
                strongenemy = enemies[i];
                weakenemy = enemies[i];
                inrange = 1;
            }
            else if (targetinellipse(tower.x, tower.y, tower.range, enemies[i].x, enemies[i].y, enemies[i]) == 1) {
                if (lastenemy.distance > enemies[i].distance) {
                    lastenemy = enemies[i];
                }
                if (firstenemy.distance < enemies[i].distance) {
                    firstenemy = enemies[i];
                }
                if (strongenemy.health < enemies[i].health) {
                    strongenemy = enemies[i];
                }
                if (weakenemy.health > enemies[i].health) {
                    weakenemy = enemies[i];
                }
            }
        }
        if (inrange == 1) { //direction
            switch (tower.target) {
                case "first":
                    tower.direction = Math.atan((firstenemy.y - tower.y) / (firstenemy.x - tower.x));
                    tower.directionX = firstenemy.x;
                    tower.directionY = firstenemy.y;
                    break;
                case "last":
                    tower.direction = Math.atan((lastenemy.y - tower.y) / (lastenemy.x - tower.x));
                    tower.directionX = firstenemy.x;
                    tower.directionY = firstenemy.y;
                    break;
                case "strong":
                    tower.direction = Math.atan((strongenemy.y - tower.y) / (strongenemy.x - tower.x));
                    tower.directionX = firstenemy.x;
                    tower.directionY = firstenemy.y;
                    break;
                case "weak":
                    tower.direction = Math.atan((weakenemy.y - tower.y) / (weakenemy.x - tower.x));
                    tower.directionX = firstenemy.x;
                    tower.directionY = firstenemy.y;
                    break;
            }
        }
        else {
            tower.shootNow = 10;
        }
        //inputs
        switch (tower.type) {
            case "Sniper":
                speed = 15;
                lifespan = 35;
                size = 6;
                color = "black";
                break;
            case "Minigun":
                speed = 6;
                lifespan = 30;
                size = 8;
                color = "#E62916";
                break;
            case "bomb":
                speed = 12;
                lifespan = 15;
                size = 14;
                if (tower.level == 6) {
                    size = 20;
                }
                color = "black";
                break;
            case "super":
                speed = 15;
                lifespan = 35;
                if (tower.level >= 6) {
                    speed = 20;
                    lifespan = 30;
                }
                size = 7;
                color = "#EF0021";
                break;
            case "railgun":
                color = "#68C824";
                break;
            case "laser":
                color = "#048DF9";
                break;
            case "tesla":
                color = "#EFAE3A";
                break;
        }
        //handles range buff
        if (tower.buffs >= 1) {
            speed = speed * 1.2;
            lifespan = lifespan * 1.2;
        }
        if (tower.type == "Sniper" || tower.type == "Minigun" || tower.type == "bomb" || tower.type == "super" || tower.type == "railgun") { //shoot projectile
            if (inrange == 1) {
                if (tower.type == "Minigun" && tower.level == 6) { // double shot
                    switch (tower.target) {
                        case "first": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 10) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x + scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y + scaleH * 15 * Math.sin(tower.direction - Math.PI / 2) + tower.tallness, damage, speed, size, color, firstenemy, lifespan, 0, tower.pierce));
                                shots.push(new Projectile(tower.x - scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y - scaleH * 15 * Math.sin(tower.direction - Math.PI / 2) + tower.tallness, damage, speed, size, color, firstenemy, lifespan, 0, tower.pierce));
                            }
                            else {
                                tower.shootNow++;
                            }
                            break;
                        }
                        case "last": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 10) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x + scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y + scaleH * 15 * Math.sin(tower.direction - Math.PI / 2) + tower.tallness, damage, speed, size, color, lastenemy, lifespan, 0, tower.pierce));
                                shots.push(new Projectile(tower.x - scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y - scaleH * 15 * Math.sin(tower.direction - Math.PI / 2) + tower.tallness, damage, speed, size, color, lastenemy, lifespan, 0, tower.pierce));
                            }
                            else {
                                tower.shootNow++;
                            }
                            break;
                        }
                        case "strong": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 10) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x + scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y + scaleH * 15 * Math.sin(tower.direction - Math.PI / 2) + tower.tallness, damage, speed, size, color, strongenemy, lifespan, 0, tower.pierce));
                                shots.push(new Projectile(tower.x - scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y - scaleH * 15 * Math.sin(tower.direction - Math.PI / 2) + tower.tallness, damage, speed, size, color, strongenemy, lifespan, 0, tower.pierce));
                            }
                            else {
                                tower.shootNow++;
                            }
                            break;
                        }
                        case "weak": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 10) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x + scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y + scaleH * 15 * Math.sin(tower.direction - Math.PI / 2) + tower.tallness, damage, speed, size, color, weakenemy, lifespan, 0, tower.pierce));
                                shots.push(new Projectile(tower.x - scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y - scaleH * 15 * Math.sin(tower.direction - Math.PI / 2) + tower.tallness, damage, speed, size, color, weakenemy, lifespan, 0, tower.pierce));
                            }
                            else {
                                tower.shootNow++;
                            }
                            break;
                        }
                    }
                }
                else if (tower.type == "Sniper" && tower.level == 6) { // armor piercing projectiles
                    switch (tower.target) {
                        case "first": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 10) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x, tower.y + tower.tallness, damage, speed, size, color, firstenemy, lifespan, 1, tower.pierce));
                            }
                            else {
                                tower.shootNow++;
                            }
                            break;
                        }
                        case "last": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 10) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x, tower.y + tower.tallness, damage, speed, 10, color, lastenemy, lifespan, 1, tower.pierce));
                            }
                            else {
                                tower.shootNow++;
                            }
                            break;
                        }
                        case "strong": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 10) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x, tower.y + tower.tallness, damage, speed, size, color, strongenemy, lifespan, 1, tower.pierce));
                            }
                            else {
                                tower.shootNow++;
                            }
                            break;
                        }
                        case "weak": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 10) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x, tower.y + tower.tallness, damage, speed, size, color, weakenemy, lifespan, 1, tower.pierce));
                            }
                            else {
                                tower.shootNow++;
                            }
                            break;
                        }
                    }
                }
                else if (tower.type == "bomb" || tower.type == "railgun" || (tower.type == "super" && tower.level != 6)) {
                    switch (tower.target) {
                        case "first": {
                            var xdiff = Math.abs(tower.x - firstenemy.x);
                            var ydiff = Math.abs(tower.y - firstenemy.y);
                            var angle = (Math.atan(ydiff / xdiff));
                            var tempEnemy = new Enemy(0, 0, 100, 0, "N", 0, color, 0, 0, 0, 0, 1);
                            if (tower.x > firstenemy.x) {
                                tempEnemy.x = firstenemy.x - 2000 * Math.cos(angle);
                            }
                            else {
                                tempEnemy.x = firstenemy.x + 2000 * Math.cos(angle);
                            }
                            if (tower.y > firstenemy.y) {
                                tempEnemy.y = firstenemy.y - 2000 * Math.sin(angle);
                            }
                            else {
                                tempEnemy.y = firstenemy.y + 2000 * Math.sin(angle);
                            }
                            firstenemy = tempEnemy;
                            break;
                        }
                        case "last": {
                            var xdiff = Math.abs(tower.x - lastenemy.x);
                            var ydiff = Math.abs(tower.y - lastenemy.y);
                            var angle = (Math.atan(ydiff / xdiff));
                            var tempEnemy = new Enemy(0, 0, 100, 0, "N", 0, color, 0, 0, 0, 0, 1);
                            if (tower.x > lastenemy.x) {
                                tempEnemy.x = lastenemy.x - 2000 * Math.cos(angle);
                            }
                            else {
                                tempEnemy.x = lastenemy.x + 2000 * Math.cos(angle);
                            }
                            if (tower.y > lastenemy.y) {
                                tempEnemy.y = lastenemy.y - 2000 * Math.sin(angle);
                            }
                            else {
                                tempEnemy.y = lastenemy.y + 2000 * Math.sin(angle);
                            }
                            lastenemy = tempEnemy;
                            break;
                        }
                        case "strong": {
                            var xdiff = Math.abs(tower.x - strongenemy.x);
                            var ydiff = Math.abs(tower.y - strongenemy.y);
                            var angle = (Math.atan(ydiff / xdiff));
                            var tempEnemy = new Enemy(0, 0, 100, 0, "N", 0, color, 0, 0, 0, 0, 1);
                            if (tower.x > strongenemy.x) {
                                tempEnemy.x = strongenemy.x - 2000 * Math.cos(angle);
                            }
                            else {
                                tempEnemy.x = strongenemy.x + 2000 * Math.cos(angle);
                            }
                            if (tower.y > strongenemy.y) {
                                tempEnemy.y = strongenemy.y - 2000 * Math.sin(angle);
                            }
                            else {
                                tempEnemy.y = strongenemy.y + 2000 * Math.sin(angle);
                            }
                            strongenemy = tempEnemy;
                            break;
                        }
                        case "weak": {
                            var xdiff = Math.abs(tower.x - weakenemy.x);
                            var ydiff = Math.abs(tower.y - weakenemy.y);
                            var angle = (Math.atan(ydiff / xdiff));
                            var tempEnemy = new Enemy(0, 0, 100, 0, "N", 0, color, 0, 0, 0, 0, 1);
                            if (tower.x > weakenemy.x) {
                                tempEnemy.x = weakenemy.x - 2000 * Math.cos(angle);
                            }
                            else {
                                tempEnemy.x = weakenemy.x + 2000 * Math.cos(angle);
                            }
                            if (tower.y > weakenemy.y) {
                                tempEnemy.y = weakenemy.y - 2000 * Math.sin(angle);
                            }
                            else {
                                tempEnemy.y = weakenemy.y + 2000 * Math.sin(angle);
                            }
                            weakenemy = tempEnemy;
                            break;
                        }
                    }
                    if (tower.type == "railgun" && tower.shootNow > (tower.reload / speedModifier) / 15 - 100) {
                        //@ts-ignore
                        lasers.push(new Laser((tower.shootNow - (tower.reload / speedModifier) / 15 + 100) / 10 + (tower.railwidth - 10), color, tempEnemy, tower));
                    }
                    if (tower.shootNow >= (tower.reload / speedModifier) / 15) {
                        tower.shootNow = 0;
                        if (tower.type == "super") {
                            //@ts-ignore
                            shots.push(new Projectile(tower.x, tower.y + tower.tallness, damage, speed, size, color, tempEnemy, lifespan, 0, tower.pierce));
                        }
                        else if (tower.type == "bomb") {
                            //@ts-ignore
                            shots.push(new Projectile(tower.x, tower.y + tower.tallness, damage, speed, size, color, tempEnemy, lifespan, tower.splash, tower.pierce));
                        }
                        else if (tower.type == "railgun") {
                            //@ts-ignore
                            //do damage here
                            var slope = ((-tempEnemy.y + canvas.height) - (-tower.y + canvas.height)) / (tempEnemy.x - tower.x);
                            //@ts-ignore
                            var intercept = (-tower.y + canvas.height) - slope * tower.x;
                            var pierce = 0;
                            for (var i = 0; i < enemies.length; i++) {
                                //@ts-ignore
                                if (lineCrossesCircle(slope, intercept, enemies[i].x, (-enemies[i].y + canvas.height), enemies[i].radius + tower.railwidth)) { //railwidth
                                    //second check for correct side, since slope doesn't give direction
                                    //@ts-ignore
                                    if ((tempEnemy.x < tower.x && enemies[i].x < tower.x && tempEnemy.y < tower.y && enemies[i].y < tower.y) || (tempEnemy.x > tower.x && enemies[i].x > tower.x && tempEnemy.y > tower.y && enemies[i].y > tower.y) || (tempEnemy.x < tower.x && enemies[i].x < tower.x && tempEnemy.y > tower.y && enemies[i].y > tower.y) || (tempEnemy.x > tower.x && enemies[i].x > tower.x && tempEnemy.y < tower.y && enemies[i].y < tower.y)) {
                                        if (enemies[i].shield <= 0) {
                                            if (tower.damage <= enemies[i].armor) { //low damage against armored
                                                enemies[i].health -= 1;
                                            }
                                            else if (enemies[i].health + enemies[i].armor <= tower.damage) { //enough damage to kill
                                                enemies[i].health = 0;
                                            }
                                            else { //deals damage
                                                enemies[i].health -= tower.damage - enemies[i].armor;
                                            }
                                            pierce++;
                                            if (pierce >= tower.pierce) {
                                                break;
                                            }
                                        }
                                        else {
                                            enemies[i].shield--;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else {
                        tower.shootNow++;
                    }
                }
                else {
                    switch (tower.target) {
                        case "first": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 15) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x, tower.y + tower.tallness, damage, speed, size, color, firstenemy, lifespan, 0, tower.pierce));
                            }
                            else {
                                tower.shootNow++;
                            }
                            break;
                        }
                        case "last": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 15) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x, tower.y + tower.tallness, damage, speed, size, color, lastenemy, lifespan, 0, tower.pierce));
                            }
                            else {
                                tower.shootNow++;
                            }
                            break;
                        }
                        case "strong": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 15) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x, tower.y + tower.tallness, damage, speed, size, color, strongenemy, lifespan, 0, tower.pierce));
                            }
                            else {
                                tower.shootNow++;
                            }
                            break;
                        }
                        case "weak": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 15) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x, tower.y + tower.tallness, damage, speed, size, color, weakenemy, lifespan, 0, tower.pierce));
                            }
                            else {
                                tower.shootNow++;
                            }
                            break;
                        }
                    }
                }
            }
            if (tower.sold == 0 && gameIsOver == 0) {
                towershoot(tower);
                clearInterval(firefunction);
            }
            clearInterval(firefunction);
        }
        else if (tower.type == "laser") { //laser attack
            //check for current target in range
            if (inrange == 1) {
                var found = 0;
                for (var i = 0; i < enemies.length; i++) {
                    if (targetinellipse(tower.x, tower.y, tower.range, enemies[i].x, enemies[i].y, enemies[i]) == 1 && enemies[i] == target) {
                        found = 1;
                    }
                }
                if (found == 0 || newtarget == 1) {
                    //reset variables
                    lasercounter = 0;
                    laserheatcounter = 0;
                    inrange = 0;
                    for (var i = 0; i < enemies.length; i++) { //find enemies in range
                        if (targetinellipse(tower.x, tower.y, tower.range, enemies[i].x, enemies[i].y, enemies[i]) == 1 && inrange == 0 && alreadyTargeted(tower, enemies[i]) == 0) {
                            target = enemies[i];
                            inrange = 1;
                        }
                        else if (targetinellipse(tower.x, tower.y, tower.range, enemies[i].x, enemies[i].y, enemies[i]) == 1 && alreadyTargeted(tower, enemies[i]) == 0) {
                            switch (tower.target) {
                                case "last": {
                                    if (target.distance > enemies[i].distance) {
                                        target = enemies[i];
                                    }
                                    break;
                                }
                                case "first": {
                                    if (target.distance < enemies[i].distance) {
                                        target = enemies[i];
                                    }
                                    break;
                                }
                                case "strong": {
                                    if (target.health < enemies[i].health) {
                                        target = enemies[i];
                                    }
                                    break;
                                }
                                case "weak": {
                                    if (target.health > enemies[i].health) {
                                        target = enemies[i];
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    if (inrange == 1) {
                        newtarget = 0;
                        tower.damage = tower.lasermin;
                        if (tower.level == 6) {
                            var thickness = 5;
                            lasers.push(new Laser(thickness, color, target, tower));
                        }
                    }
                }
                //do damage here instead
                if (inrange == 1) {
                    if (lasercounter > tower.reload) { //shoots every tower.reload 
                        if (tower.level != 6) {
                            var thickness = Math.floor(tower.damage / 10) + 1;
                            lasers.push(new Laser(thickness, color, target, tower));
                        }
                        if (found == 1) { //heat up
                            if (laserheatcounter > tower.lasertime) { //heat up every lasertime shots
                                laserheatcounter = 0;
                                tower.damage = tower.damage + tower.heatup; //heat up by tower heatup 
                                //removes a little armor from target
                                if (target.shield == 0) {
                                    if (target.armor > 1) {
                                        target.armor -= 2;
                                    }
                                    else if (target.armor == 1) {
                                        target.armor--;
                                    }
                                    if (tower.damage >= tower.lasermax) {
                                        tower.damage = tower.lasermax;
                                    }
                                }
                            }
                            else {
                                laserheatcounter++;
                            }
                        }
                        if (target.shield <= 0) {
                            //ignores armor
                            // if(target.health <= Math.floor(tower.damage)){
                            //     target.health = 0;
                            // }else{
                            //     target.health -= Math.floor(tower.damage);
                            // }
                            //hits armor
                            if (Math.floor(tower.damage) <= target.armor) { //low damage against armored
                                target.health -= 1;
                            }
                            else if (target.health + target.armor <= Math.floor(tower.damage)) { //enough damage to kill
                                target.health = 0;
                            }
                            else { //deals damage
                                target.health -= Math.floor(tower.damage) - target.armor;
                            }
                        }
                        else { //shield
                            if (shieldcounter >= 4) { //breaks the shield every 50 hits
                                target.shield--;
                                shieldcounter = 0;
                            }
                            else {
                                shieldcounter++;
                            }
                            tower.damage = tower.lasermin;
                        }
                        lasercounter = 0;
                    }
                    else {
                        lasercounter += speedModifier * 1;
                    }
                }
            }
            else {
                tower.damage = tower.lasermin;
                newtarget = 1;
            }
            if (tower.sold == 1 || gameIsOver == 1) {
                clearInterval(firefunction);
            }
        }
        else if (tower.type == "tesla") {
            var timeToCharge = 1;
            //charging 
            if (tower.charge < tower.maxcharge) {
                tower.charge += speedModifier * tower.chargespd;
            }
            if (tower.charge >= 50) {
                tower.ischarging = 0;
                for (var nextTarget = 0; nextTarget < tower.numTargets; nextTarget++) { //loops for multi target
                    inrange = 0;
                    for (var i = 0; i < enemies.length; i++) { //find if there is a new enemy in range
                        if (targetinellipse(tower.x, tower.y, tower.range, enemies[i].x, enemies[i].y, enemies[i]) == 1) {
                            timeToCharge = 0;
                        }
                        if (targetinellipse(tower.x, tower.y, tower.range, enemies[i].x, enemies[i].y, enemies[i]) == 1 && alreadyTargeted(tower, enemies[i]) == 0) {
                            inrange = 1;
                            break;
                        }
                    }
                    if (inrange == 1) {
                        inrange = 0;
                        for (var i = 0; i < enemies.length; i++) { //finds an enemy in range
                            if (targetinellipse(tower.x, tower.y, tower.range, enemies[i].x, enemies[i].y, enemies[i]) == 1 && inrange == 0 && alreadyTargeted(tower, enemies[i]) == 0) {
                                lastenemy = enemies[i];
                                firstenemy = enemies[i];
                                strongenemy = enemies[i];
                                weakenemy = enemies[i];
                                inrange = 1;
                            }
                            else {
                                if (targetinellipse(tower.x, tower.y, tower.range, enemies[i].x, enemies[i].y, enemies[i]) == 1 && alreadyTargeted(tower, enemies[i]) == 0) {
                                    if (lastenemy.distance > enemies[i].distance) {
                                        lastenemy = enemies[i];
                                    }
                                    if (firstenemy.distance < enemies[i].distance) {
                                        firstenemy = enemies[i];
                                    }
                                    if (strongenemy.health < enemies[i].health) {
                                        strongenemy = enemies[i];
                                    }
                                    if (weakenemy.health > enemies[i].health) {
                                        weakenemy = enemies[i];
                                    }
                                }
                            }
                        }
                        switch (tower.target) {
                            case "last": {
                                tower.teslatargets.push(lastenemy);
                                break;
                            }
                            case "first": {
                                tower.teslatargets.push(firstenemy);
                                break;
                            }
                            case "strong": {
                                tower.teslatargets.push(strongenemy);
                                break;
                            }
                            case "weak": {
                                tower.teslatargets.push(weakenemy);
                                break;
                            }
                        }
                    }
                }
                if (tower.shootNow >= (tower.reload / speedModifier) / 15) {
                    tower.shootNow = 0;
                    if (tower.level != 7 && tower.teslatargets.length > 0) { //reduces charge
                        tower.charge -= 50;
                    }
                    //attack with all of tesla targets[]
                    tower.teslatargets.forEach(function (target) {
                        lasers.push(new Laser(tower.level + 4, color, target, tower));
                        if (target.shield <= 0) {
                            if (tower.damage <= target.armor) { //low damage against armored
                                target.health -= 1;
                            }
                            else if (target.health + target.armor <= tower.damage) { //enough damage to kill
                                target.health = 0;
                            }
                            else { //deals damage
                                target.health -= tower.damage - target.armor;
                            }
                            lasercounter = 0;
                        }
                        else { //shield damage
                            if (target.shield - 1 == 0) {
                                target.shield = 0;
                            }
                            else {
                                target.shield = target.shield - 2; //2 damage to shields
                            }
                            if (tower.level != 7 && tower.level != 6) {
                                tower.charge += 50;
                            }
                            else if (tower.level != 7 && tower.maxcharge > tower.charge) {
                                tower.charge += 25;
                            }
                        }
                    });
                }
                else {
                    tower.shootNow++;
                }
                //reset targets
                for (var i = tower.teslatargets.length - 1; i >= 0; i--) {
                    tower.teslatargets.splice(i, 1);
                }
            }
            if (tower.charge <= 0 || timeToCharge == 1) {
                tower.ischarging = 1;
            }
            if (tower.sold == 1 || gameIsOver == 1) {
                clearInterval(firefunction);
            }
        }
    }, 10 / speedModifier);
}
function alreadyTargeted(tower, target) {
    if (tower.type == "tesla") { //multi target tesla
        for (var i = 0; i < tower.teslatargets.length; i++) {
            if (tower.teslatargets[i] == target) {
                return 1;
            }
        }
    }
    for (var i = 0; i < lasers.length; i++) {
        if (lasers[i].tower == tower && lasers[i].target == target) {
            return 1;
        }
    }
    return 0;
}
// animate function that is run continuously 
var animationId;
function animate() {
    animationId = requestAnimationFrame(animate);
    //entire gui 
    // @ts-ignore
    drawLayout();
    //handles dragging
    if (placingTowers == "Drag and Drop") {
        if (mouseDown) {
            if (mouseover == "Sniper" && selectedTower == "none" && totalmoney >= snipercosts[0]) {
                selectedTower = "Sniper";
                draggingTower = 1;
            }
            else if (mouseover == "Minigun" && selectedTower == "none" && totalmoney >= miniguncosts[0]) {
                selectedTower = "Minigun";
                draggingTower = 1;
            }
            else if (mouseover == "laser" && selectedTower == "none" && totalmoney >= lasercosts[0]) {
                selectedTower = "laser";
                draggingTower = 1;
            }
            else if (mouseover == "tesla" && selectedTower == "none" && totalmoney >= teslacosts[0]) {
                selectedTower = "tesla";
                draggingTower = 1;
            }
            else if (mouseover == "farm" && selectedTower == "none" && totalmoney >= farmcosts[0]) {
                selectedTower = "farm";
                draggingTower = 1;
            }
            else if (mouseover == "ice" && selectedTower == "none" && totalmoney >= icecosts[0]) {
                selectedTower = "ice";
                draggingTower = 1;
            }
            else if (mouseover == "bomb" && selectedTower == "none" && totalmoney >= bombcosts[0]) {
                selectedTower = "bomb";
                draggingTower = 1;
            }
            else if (mouseover == "super" && selectedTower == "none" && totalmoney >= supercosts[0]) {
                selectedTower = "super";
                draggingTower = 1;
            }
            else if (mouseover == "buffer" && selectedTower == "none" && totalmoney >= buffercosts[0]) {
                selectedTower = "buffer";
                draggingTower = 1;
            }
            else if (mouseover == "railgun" && selectedTower == "none" && totalmoney >= railguncosts[0]) {
                selectedTower = "railgun";
                draggingTower = 1;
            }
        }
        if (!mouseDown && draggingTower) {
            if (selectedTower != "none" && freespace() == 1) {
                towers.push(new Tower(mouseX, mouseY, "Sniper", 1, 0));
                totalmoney -= towers[towers.length - 1].cost[0];
                towershoot(towers[towers.length - 1]);
                towers[towers.length - 1].update();
                TowerPlaced();
                selectedTower = "none";
            }
            else {
                selectedTower = "none";
            }
            draggingTower = 0;
        }
    }
    //handles wave interactions with autostart
    if (activeWave() == 0 && autostart != "StartWave") {
        if (lives <= 0 || gameIsOver == 1) { //check if game over before ending the round
            gameOver();
        }
        else {
            //calculate end of round cash
            // totalmoney += 10+((round-1)*5);
            for (var i = 0; i < towers.length; i++) { //farm income
                if (towers[i].type == "farm") {
                    totalmoney += towers[i].income;
                    towers[i].generated += towers[i].income;
                }
            }
            console.log("updating state");
            state.update(lives, totalmoney, round, towers);
            //resets stuff
            changeGameSpeed();
            changeGameSpeed();
            changeGameSpeed();
            if (autostart == "AutoStart: On") {
                //starts wave
                round++;
                waveStart = 1;
                //@ts-ignore
                nextWave();
            }
            else {
                autostart = "StartWave";
            }
        }
    }
    //draws the towers
    towers.forEach(function (tower, index) {
        tower.draw();
    });
    //drawing selected tower
    if (selectedTower != "none") {
        //find nearest open spot
        var spot = nearestSpot();
        if (spot != -1) {
            var tempTower = new Tower(towerSpots[spot][0], towerSpots[spot][1], selectedTower, 1, 1);
            if (freespace() == 0) {
                tempTower = new Tower(towerSpots[spot][0], towerSpots[spot][1], selectedTower, -1, 1);
            }
            tempTower.draw();
        }
        else {
            tempTower = new Tower(mouseX, mouseY, selectedTower, -1, 1);
            tempTower.draw();
        }
    }
    //handles projectiles
    for (var i = shots.length - 1; i >= 0; i--) {
        if (shots[i].lifespan > shots[i].maxlifespan) {
            shots.splice(i, 1);
        }
        else {
            shots[i].update();
        }
    }
    //draws lasers 
    for (var i = lasers.length - 1; i >= 0; i--) {
        lasers[i].update();
        if (lasers[i].tower.type == "tesla") {
            lasers.splice(i, 1);
        }
    }
    //handles enemy interactions 
    enemies.forEach(function (enemy, index) {
        enemy.update();
        enemy.changeDirection();
        //handles collisions
        shots.forEach(function (shot, index) {
            if (shot.x > enemy.x - enemy.radius - shot.size && shot.x < enemy.x + enemy.radius + shot.size && shot.y > enemy.y - enemy.radius - shot.size && shot.y < enemy.y + enemy.radius + shot.size) {
                //check for already hit
                var alreadyhit = 0;
                shot.enemiesHit.forEach(function (enemyhit) {
                    if (enemyhit == enemy) {
                        alreadyhit = 1;
                    }
                });
                if (alreadyhit == 0) {
                    if (shot.ap == 0) {
                        //explosion
                        if (shot.damage != 0) {
                            if (enemy.shield <= 0) {
                                if (shot.damage >= enemy.health + enemy.armor) { //kills enemy
                                    enemy.health = 0;
                                }
                                else if (shot.damage <= enemy.armor) { //less than armor
                                    enemy.health -= 1;
                                }
                                else { //lower health
                                    enemy.health -= (shot.damage - enemy.armor);
                                }
                            }
                            else {
                                if (shot.damage != 0) {
                                    enemy.shield--;
                                }
                            }
                        }
                    }
                    else if (shot.ap > 1) { //splash
                        var pierce = 0;
                        enemies.forEach(function (nearenemy, index) {
                            var dist = Math.sqrt((nearenemy.x - enemy.x) * (nearenemy.x - enemy.x) + (nearenemy.y - enemy.y) * (nearenemy.y - enemy.y));
                            if (dist < shot.ap && pierce < shot.pierce) {
                                pierce++;
                                if (nearenemy.shield <= 0) {
                                    if (shot.damage >= nearenemy.health + nearenemy.armor) { //kills nearenemy
                                        nearenemy.health = 0;
                                    }
                                    else if (shot.damage <= nearenemy.armor) { //less than armor
                                        nearenemy.health -= 1;
                                    }
                                    else { //lower health
                                        nearenemy.health -= (shot.damage - nearenemy.armor);
                                    }
                                }
                                else {
                                    nearenemy.shield--;
                                }
                            }
                        });
                    }
                    else { //armor piercing
                        if (enemy.shield <= 0) {
                            if (enemy.armor >= 1) {
                                if (enemy.health <= shot.damage * 2) {
                                    enemy.health = 0;
                                }
                                else {
                                    enemy.health -= shot.damage * 2;
                                }
                            }
                            else {
                                if (enemy.health <= shot.damage) {
                                    enemy.health = 0;
                                }
                                else {
                                    enemy.health -= shot.damage;
                                }
                            }
                        }
                        else {
                            enemy.shield--;
                        }
                    }
                    if (shot.pierce <= 1 || shot.ap > 1) { //if ap>1 then its splash so no pierce
                        if (shot.ap > 1) {
                            shots.push(new Projectile(shots[index].x, shots[index].y, 0, 0, 25, "red", new Enemy(0, 0, 0, 0, "N", 0, "green", 0, 0, 0, 0, 0), 10, 0, 999)); //explosion
                        }
                        shots.splice(index, 1);
                    }
                    else {
                        var xdiff = Math.abs(shot.x - shot.target.x);
                        var ydiff = Math.abs(shot.y - shot.target.y);
                        var angle = (Math.atan(ydiff / xdiff));
                        var tempEnemy = new Enemy(0, 0, 1000, 0, "N", 0, "red", 0, 0, 0, 0, 1);
                        if (shot.x > shot.target.x) {
                            tempEnemy.x = shot.target.x - 1000 * Math.cos(angle);
                        }
                        else {
                            tempEnemy.x = shot.target.x + 1000 * Math.cos(angle);
                        }
                        if (shot.y > shot.target.y) {
                            tempEnemy.y = shot.target.y - 1000 * Math.sin(angle);
                        }
                        else {
                            tempEnemy.y = shot.target.y + 1000 * Math.sin(angle);
                        }
                        shot.target = tempEnemy;
                        shot.pierce = shot.pierce - 1;
                        shot.enemiesHit.push(enemy);
                    }
                }
            }
        });
        //remove enemy if it's killed
        if (enemy.health <= 0) {
            //check for seeking projectiles to retarget
            for (var i = shots.length - 1; i >= 0; i--) {
                if (shots[i].target == enemy) {
                    var xdiff = Math.abs(shots[i].x - shots[i].target.x);
                    var ydiff = Math.abs(shots[i].y - shots[i].target.y);
                    var angle = (Math.atan(ydiff / xdiff));
                    var tempEnemy = new Enemy(0, 0, 1000, 0, "N", 0, "red", 0, 0, 0, 0, 1);
                    if (shots[i].x > shots[i].target.x) {
                        tempEnemy.x = shots[i].target.x - 1000 * Math.cos(angle);
                    }
                    else {
                        tempEnemy.x = shots[i].target.x + 1000 * Math.cos(angle);
                    }
                    if (shots[i].y > shots[i].target.y) {
                        tempEnemy.y = shots[i].target.y - 1000 * Math.sin(angle);
                    }
                    else {
                        tempEnemy.y = shots[i].target.y + 1000 * Math.sin(angle);
                    }
                    shots[i].target = tempEnemy;
                }
            }
            //check for laser projectiles to remove
            for (var i = lasers.length - 1; i >= 0; i--) {
                if (lasers[i].target == enemy) {
                    lasers.splice(i, 1);
                }
            }
            //add money
            totalmoney += enemy.enemymoney;
            //remove enemy
            enemies.splice(index, 1);
        }
        //remove enemy and lower lives if enemy makes it to the end
        var tempMap = paths;
        if (enemy.path == 2) {
            //@ts-ignore
            tempMap = paths2;
        }
        else if (enemy.path == 3) {
            //@ts-ignore
            tempMap = paths3;
        }
        if (tempMap[tempMap.length - 1][0] == 0) { // left exit
            if (enemy.x <= -10) {
                totalmoney += enemy.enemymoney;
                enemies.splice(index, 1);
                if (enemy.color == "boss") {
                    lives -= 99;
                }
                lives -= 1;
            }
        }
        else if (tempMap[tempMap.length - 1][1] == 0) { // top exit
            if (enemy.y <= -10) {
                totalmoney += enemy.enemymoney;
                enemies.splice(index, 1);
                if (enemy.color == "boss") {
                    lives -= 99;
                }
                lives -= 1;
            }
        }
        else if (tempMap[tempMap.length - 1][1] == 100) { // bottom exit
            //@ts-ignore
            if (enemy.y >= canvas.height + 10) {
                totalmoney += enemy.enemymoney;
                enemies.splice(index, 1);
                if (enemy.color == "boss") {
                    lives -= 99;
                }
                lives -= 1;
            }
        }
        else { //right exit 
            //@ts-ignore
            if (enemy.x >= canvas.width - canvas.width / 7.5 - 10) {
                totalmoney += enemy.enemymoney;
                enemies.splice(index, 1);
                if (enemy.color == "boss") {
                    lives -= 99;
                }
                lives -= 1;
            }
        }
        //checks if you lost
        if (lives <= 0) {
            gameOver();
        }
    });
    //handles the laser projectiles
    for (var i = lasers.length - 1; i >= 0; i--) {
        //check if still in range
        // var dist = Math.sqrt((lasers[i].target.x - lasers[i].tower.x)*(lasers[i].target.x - lasers[i].tower.x)+(lasers[i].target.y - lasers[i].tower.y)*(lasers[i].target.y - lasers[i].tower.y));
        if (targetinellipse(lasers[i].tower.x, lasers[i].tower.y, lasers[i].tower.range, lasers[i].target.x, lasers[i].target.y, lasers[i].target) == 0) {
            lasers[i].update();
            lasers.splice(i, 1);
        }
        else if (lasers[i].tower.type == "tesla") {
            lasers.splice(i, 1);
        }
        else {
            lasers[i].update();
        }
    }
    //handles mouse movement 
    var selectedlevel;
    for (var i = 0; i < towers.length; i++) {
        if (towers[i].selected == 1) {
            selectedlevel = towers[i].level;
        }
    }
    //@ts-ignore
    if (availableTowers[0] == 1 && menutype == 0 && mouseX > canvas.width - canvas.width / 7.5 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (2 / 2) && mouseY < canvas.height / (numboxes / 2) * (2 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "Sniper";
        //@ts-ignore
    }
    else if (mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * ((3 - 1) / 2) && mouseY < canvas.height / (numboxes / 2) * ((3 - 1) / 2) + canvas.height / (numboxes / 2)) {
        if (availableTowers[1] == 1 && menutype == 0) {
            mouseover = "Minigun";
        }
        else if (menutype == 1 && selectedTower == "none") {
            mouseover = "target";
        }
        //@ts-ignore
    }
    else if (availableTowers[2] == 1 && menutype == 0 && mouseX > canvas.width - canvas.width / 7.5 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (4 / 2) && mouseY < canvas.height / (numboxes / 2) * (4 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "tesla";
        //@ts-ignore
    }
    else if (availableTowers[4] == 1 && menutype == 0 && mouseX > canvas.width - canvas.width / 7.5 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (6 / 2) && mouseY < canvas.height / (numboxes / 2) * (6 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "ice";
        //@ts-ignore
    }
    else if (availableTowers[6] == 1 && menutype == 0 && mouseX > canvas.width - canvas.width / 7.5 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (8 / 2) && mouseY < canvas.height / (numboxes / 2) * (8 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "farm";
        //@ts-ignore
    }
    else if (availableTowers[8] == 1 && menutype == 0 && mouseX > canvas.width - canvas.width / 7.5 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (10 / 2) && mouseY < canvas.height / (numboxes / 2) * (10 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "buffer";
        //@ts-ignore
    }
    else if (availableTowers[3] == 1 && menutype == 0 && mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * ((5 - 1) / 2) && mouseY < canvas.height / (numboxes / 2) * ((5 - 1) / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "laser";
        //@ts-ignore
    }
    else if (availableTowers[5] == 1 && menutype == 0 && mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * ((7 - 1) / 2) && mouseY < canvas.height / (numboxes / 2) * ((7 - 1) / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "bomb";
        //@ts-ignore
    }
    else if (availableTowers[7] == 1 && menutype == 0 && mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * ((9 - 1) / 2) && mouseY < canvas.height / (numboxes / 2) * ((9 - 1) / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "railgun";
        //@ts-ignore
    }
    else if (availableTowers[9] == 1 && menutype == 0 && mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * ((11 - 1) / 2) && mouseY < canvas.height / (numboxes / 2) * ((11 - 1) / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "super";
        //@ts-ignore
    }
    else if (availableTowers[10] == 1 && menutype == 1 && selectedlevel == "5" && mouseX > canvas.width - canvas.width / 7.5 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (10 / 2) && mouseY < canvas.height / (numboxes / 2) * (10 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "level6";
        //@ts-ignore
    }
    else if (availableTowers[11] == 1 && menutype == 1 && selectedlevel == "5" && mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * ((11 - 1) / 2) && mouseY < canvas.height / (numboxes / 2) * ((11 - 1) / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "level7";
        //@ts-ignore
    }
    else if (mouseX > canvas.width - canvas.width / 7.5 + 2.5 && mouseX < canvas.width - canvas.width / 7.5 + 2.5 + (canvas.width / 7.5) - 5 && mouseY > canvas.height - canvas.height / (numboxes / 2) + 2.5 && mouseY < canvas.height - canvas.height / (numboxes / 2) + 2.5 + canvas.height / (numboxes / 2) - 5) {
        mouseover = "startWave";
        //@ts-ignore
    }
    else if (mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (12 / 2) && mouseY < canvas.height / (numboxes / 2) * (12 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "upgrade";
        //@ts-ignore
    }
    else if (mouseX > canvas.width - canvas.width / 7.5 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (12 / 2) && mouseY < canvas.height / (numboxes / 2) * (12 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "sell";
        //@ts-ignore
    }
    else if (mouseX > canvas.width - canvas.width / 7.5 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (16 / 2) && mouseY < canvas.height / (numboxes / 2) * (16 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "speed";
        //@ts-ignore
    }
    else if (mouseX > canvas.width - canvas.width / 7.5 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (14 / 2) && mouseY < canvas.height / (numboxes / 2) * (14 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "towerSpots";
        //@ts-ignore
    }
    else if (mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (16 / 2) && mouseY < canvas.height / (numboxes / 2) * (16 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "towerPlacement";
        //@ts-ignore
    }
    else if (mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (14 / 2) && mouseY < canvas.height / (numboxes / 2) * (14 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "pause";
    }
    else {
        mouseover = "none";
    }
    //handles menuoptions
    var isselectedtower = 0;
    for (var i = 0; i < towers.length; i++) {
        if (towers[i].selected == 1) {
            isselectedtower = 1;
        }
    }
    if (isselectedtower == 1 || selectedTower != "none") {
        menutype = 1;
    }
    else {
        menutype = 0;
    }
}
function activeWave() {
    if (waveStart == 1) {
        return 1;
    }
    else if (enemies.length == 0 && waveEnded == 1) {
        return 0;
    }
    else {
        return 1;
    }
}
//returns the index of the closest spot you can place a tower. -1 if none in range
function nearestSpot() {
    //find nearest open spot
    var closest = 999;
    var spot = -1;
    for (var i = 0; i < towerSpots.length; i++) {
        var tempDistance = Math.sqrt(Math.pow(mouseX - towerSpots[i][0], 2) + Math.pow(mouseY - towerSpots[i][1], 2));
        if (tempDistance < closest) {
            closest = tempDistance;
            spot = i;
        }
    }
    return spot;
}
//function for when you click
addEventListener("click", function () {
    // console.log(mouseX/scaleW, mouseY/scaleH);
    //selects the tower
    if (mouseover == "Sniper" && selectedTower == "none" && totalmoney >= snipercosts[0]) {
        selectedTower = "Sniper";
    }
    else if (mouseover == "Minigun" && selectedTower == "none" && totalmoney >= miniguncosts[0]) {
        selectedTower = "Minigun";
    }
    else if (mouseover == "laser" && selectedTower == "none" && totalmoney >= lasercosts[0]) {
        selectedTower = "laser";
    }
    else if (mouseover == "tesla" && selectedTower == "none" && totalmoney >= teslacosts[0]) {
        selectedTower = "tesla";
    }
    else if (mouseover == "farm" && selectedTower == "none" && totalmoney >= farmcosts[0]) {
        selectedTower = "farm";
    }
    else if (mouseover == "ice" && selectedTower == "none" && totalmoney >= icecosts[0]) {
        selectedTower = "ice";
    }
    else if (mouseover == "bomb" && selectedTower == "none" && totalmoney >= bombcosts[0]) {
        selectedTower = "bomb";
    }
    else if (mouseover == "super" && selectedTower == "none" && totalmoney >= supercosts[0]) {
        selectedTower = "super";
    }
    else if (mouseover == "buffer" && selectedTower == "none" && totalmoney >= buffercosts[0]) {
        selectedTower = "buffer";
    }
    else if (mouseover == "railgun" && selectedTower == "none" && totalmoney >= railguncosts[0]) {
        selectedTower = "railgun";
    }
    else if (selectedTower != "none" && freespace() == 1) {
        towers.push(new Tower(towerSpots[nearestSpot()][0], towerSpots[nearestSpot()][1], selectedTower, 1, 0));
        totalmoney -= towers[towers.length - 1].cost[0];
        towershoot(towers[towers.length - 1]);
        towers[towers.length - 1].update();
        TowerPlaced();
        selectedTower = "none";
    }
    else if (mouseover == "upgrade" || mouseover == "level6" || mouseover == "level7") {
        for (var i = 0; i < towers.length; i++) {
            if (towers[i].selected == 1) {
                if (towers[i].type == "laser" && totalmoney >= towers[i].cost[towers[i].level] && towers[i].level == 5 && mouseover == "level6") {
                    //upgrades tower
                    totalmoney -= towers[i].cost[towers[i].level];
                    towers.push(new Tower(towers[i].x, towers[i].y, towers[i].type, 6, 1));
                    towers[towers.length - 1].target = towers[i].target;
                    towers[towers.length - 1].update();
                    towers[i].sold = 1;
                    towers[i].selected = 0;
                    towers[i].draw();
                    towers.splice(i, 1);
                    towershoot(towers[towers.length - 1]);
                    towershoot(towers[towers.length - 1]);
                    towershoot(towers[towers.length - 1]);
                    towershoot(towers[towers.length - 1]);
                    towershoot(towers[towers.length - 1]);
                }
                else if (totalmoney >= towers[i].cost[towers[i].level] && (towers[i].level < 5 || towers[i].type == "farm") && mouseover == "upgrade") {
                    //upgrades tower
                    totalmoney -= towers[i].cost[towers[i].level];
                    towers[i].level = towers[i].level + 1;
                    towers[i].selected = 1;
                    towers[i].update();
                    if (towers[i].type == "buffer") { //if buffer is upgraded
                        TowerPlaced();
                    }
                }
                else if (((totalmoney >= towers[i].cost[towers[i].level] && mouseover == "level6") || (totalmoney >= towers[i].cost[6] && mouseover == "level7")) && towers[i].level == 5 && towers[i].type != "farm") {
                    //upgrades tower to max
                    if (mouseover == "level6") {
                        totalmoney -= towers[i].cost[5];
                        towers[i].level = 6;
                        towers[i].selected = 1;
                        towers[i].update();
                    }
                    else if (mouseover == "level7") {
                        totalmoney -= towers[i].cost[6];
                        towers[i].level = 7;
                        towers[i].selected = 1;
                        towers[i].update();
                    }
                }
            }
        }
    }
    else if (mouseover == "sell") { //sell button
        for (var i = towers.length - 1; i >= 0; i--) {
            if (towers[i].selected == 1) {
                totalmoney += towers[i].value; //sellback
                //remove tower and projectiles 
                towers[i].sold = 1;
                //remove range
                towers[i].selected = 0;
                towers[i].draw();
                towers.splice(i, 1);
                TowerPlaced(); // if buffer is sold
            }
        }
    }
    else if (mouseover == "target") { //change targeting
        for (var i = 0; i < towers.length; i++) {
            if (towers[i].selected == 1) { //find selected tower
                changeTarget(towers[i]);
            }
        }
    }
    else if (mouseover == "speed") { //speed modifier 
        changeGameSpeed();
    }
    else { //deselects all towers
        for (var i = 0; i < towers.length; i++) {
            towers[i].selected = 0;
        }
    }
    //checks if mouse is over a tower to select
    if (selectedTower == "none") {
        for (var i = 0; i < towers.length; i++) {
            if (mouseX > towers[i].x - 50 * scaleW && mouseX < towers[i].x + 50 * scaleW && mouseY > towers[i].y - 50 * scaleH && mouseY < towers[i].y + 50 * scaleH) {
                towers[i].selected = 1;
            }
        }
    }
    //start wave button
    if (mouseover == "startWave") {
        if (autostart == "StartWave") {
            //starts next wave
            round++;
            retried = 0;
            //@ts-ignore
            nextWave();
            waveStart = 1;
            autostart = "AutoStart: Off";
        }
        else if (autostart == "AutoStart: Off") {
            autostart = "AutoStart: On";
        }
        else if (autostart == "AutoStart: On") {
            autostart = "AutoStart: Off";
        }
    }
    //tower placement button
    if (mouseover == "towerPlacement") {
        if (placingTowers == "Click to Place") {
            placingTowers = "Drag and Drop";
        }
        else {
            placingTowers = "Click to Place";
        }
    }
    //pause button
    if (mouseover == "pause") {
        pauseButton();
    }
    //tower spots button
    if (mouseover == "towerSpots") {
        if (showTowerSpots == 0) {
            showTowerSpots = 1;
            towerSpots = [];
            towerSpots = towerSpots1;
        }
        else {
            showTowerSpots = 0;
            towerSpots = [];
            //@ts-ignore
            for (var x = 0; x < canvas.width; x += 10) {
                //@ts-ignore
                for (var y = 0; y < canvas.height; y += 10) {
                    //@ts-ignore
                    towerSpots.push([x, y]);
                }
            }
        }
    }
});
function pauseButton() {
    if (paused == 0) {
        paused = 1;
        mouseover = "none";
        cancelAnimationFrame(animationId);
        //@ts-ignore
        pauseMenu.style.display = "flex";
    }
    else if (paused == 1) {
        //@ts-ignore
        pauseMenu.style.display = "none";
        paused = 0;
        animate();
    }
}
//drag functionality
document.body.onmousedown = function () {
    ++mouseDown;
};
document.body.onmouseup = function () {
    --mouseDown;
};
function changeTarget(tower) {
    switch (tower.target) {
        case "first": {
            tower.target = "last";
            break;
        }
        case "last": {
            tower.target = "strong";
            break;
        }
        case "strong": {
            tower.target = "weak";
            break;
        }
        case "weak": {
            tower.target = "first";
        }
    }
}
function changeGameSpeed() {
    console.log(towers, enemies, shots, lasers, state);
    if (autostart == "StartWave") {
        if (speedModifier == 1) {
            speedModifier = 1.25;
        }
        else if (speedModifier == 1.25) {
            speedModifier = 1.5;
        }
        else if (speedModifier == 1.5) {
            speedModifier = 1;
        }
        for (var i = towers.length - 1; i >= 0; i--) { //reset towers attack for new speed
            towers.push(new Tower(towers[i].x, towers[i].y, towers[i].type, towers[i].level, 0));
            towers[towers.length - 1].update();
            if (towers[i].type == "tesla") { //reset tesla charge
                towers[towers.length - 1].charge = towers[i].charge;
            }
            if (towers[i].type == "farm") { //remember farm generated
                towers[towers.length - 1].generated = towers[i].generated;
            }
            towershoot(towers[towers.length - 1]);
            if (towers[i].type == "laser" && towers[i].level == 6) {
                towershoot(towers[towers.length - 1]);
                towershoot(towers[towers.length - 1]);
                towershoot(towers[towers.length - 1]);
                towershoot(towers[towers.length - 1]);
            }
            towers[i].sold = 1;
            //remove range
            towers[i].selected = 0;
            towers[i].draw();
            towers.splice(i, 1);
        }
        // for (var i = enemies.length - 1; i >= 0; i--) {//replace enemies for correct speed
        //     var newspd = enemies[i].speed;
        //     if(speedModifier == 1){
        //         newspd = newspd*2/3;
        //     }else if(speedModifier == 1.25){
        //         newspd = newspd*1.25;
        //     }else{
        //         newspd = (newspd/1.25)*1.5;
        //     }
        //     enemies.push(new Enemy(enemies[i].x, enemies[i].y, enemies[i].health, newspd, enemies[i].direction, enemies[i].radius, enemies[i].color, enemies[i].enemymoney, enemies[i].armor, enemies[i].shield, enemies[i].regen, enemies[i].path));
        //     enemies.splice(i, 1);
        // }
        for (var i = lasers.length - 1; i >= 0; i--) { //remove lasers
            lasers.splice(i, 1);
        }
        TowerPlaced(); // handles buffer
    }
}
//checks if current mouse location to nearest spot is open to place a tower in
function freespace() {
    //check against menu
    if (nearestSpot() == -1) {
        return 0;
    }
    //@ts-ignore
    if (towerSpots[nearestSpot()][0] > canvas.width - canvas.width / 7.5 - scaleW * 50) {
        return 0;
    }
    //check against other towers 
    for (var i = 0; i < towers.length; i++) {
        if (towerSpots[nearestSpot()][0] > towers[i].x - scaleW * towerFootPrint && towerSpots[nearestSpot()][0] < towers[i].x + scaleW * towerFootPrint && towerSpots[nearestSpot()][1] > towers[i].y - scaleH * towerFootPrint && towerSpots[nearestSpot()][1] < towers[i].y + scaleH * towerFootPrint) {
            return 0;
        }
    }
    //check paths
    for (var i = 0; i < paths.length - 1; i++) {
        if (paths[i][0] == paths[i + 1][0] && paths[i][1] > paths[i + 1][1]) { // up 
            //@ts-ignore
            if (towerSpots[nearestSpot()][0] > (canvas.width / 100) * paths[i][0] - scaleW * towerFootPrint / 2 && towerSpots[nearestSpot()][0] < (canvas.width / 100) * paths[i][0] + scaleW * (towerFootPrint / 2 + 75) && towerSpots[nearestSpot()][1] > (canvas.height / 100) * paths[i + 1][1] - scaleH * towerFootPrint / 2 && towerSpots[nearestSpot()][1] < (canvas.height / 100) * paths[i + 1][1] + (canvas.height / 100) * (paths[i][1] - paths[i + 1][1]) + scaleH * (towerFootPrint / 2 + 75)) {
                return 0;
            }
        }
        else if (paths[i][0] == paths[i + 1][0] && paths[i][1] < paths[i + 1][1]) { // down
            //@ts-ignore
            if (towerSpots[nearestSpot()][0] > (canvas.width / 100) * paths[i][0] - scaleW * towerFootPrint / 2 && towerSpots[nearestSpot()][0] < (canvas.width / 100) * paths[i][0] + scaleW * (towerFootPrint / 2 + 75) && towerSpots[nearestSpot()][1] > (canvas.height / 100) * paths[i][1] - scaleH * towerFootPrint / 2 && towerSpots[nearestSpot()][1] < (canvas.height / 100) * paths[i][1] + (canvas.height / 100) * (paths[i + 1][1] - paths[i][1]) + scaleH * (towerFootPrint / 2 + 75)) {
                return 0;
            }
        }
        else if (paths[i][1] == paths[i + 1][1] && paths[i][0] > paths[i + 1][0]) { // left
            //@ts-ignore
            if (towerSpots[nearestSpot()][0] > (canvas.width / 100) * paths[i + 1][0] - scaleW * towerFootPrint / 2 && towerSpots[nearestSpot()][0] < (canvas.width / 100) * paths[i + 1][0] + (canvas.width / 100) * (paths[i][0] - paths[i + 1][0]) + scaleW * (towerFootPrint - 25) && towerSpots[nearestSpot()][1] > (canvas.height / 100) * paths[i][1] - scaleH * towerFootPrint / 2 && towerSpots[nearestSpot()][1] < (canvas.height / 100) * paths[i][1] + scaleH * (towerFootPrint / 2 + 75)) {
                return 0;
            }
        }
        else if (paths[i][1] == paths[i + 1][1] && paths[i][0] < paths[i + 1][0]) { // right
            //@ts-ignore
            if (towerSpots[nearestSpot()][0] > (canvas.width / 100) * paths[i][0] - scaleW * towerFootPrint / 2 && towerSpots[nearestSpot()][0] < (canvas.width / 100) * paths[i][0] + (canvas.width / 100) * (paths[i + 1][0] - paths[i][0]) + scaleW * (towerFootPrint - 25) && towerSpots[nearestSpot()][1] > (canvas.height / 100) * paths[i][1] - scaleH * towerFootPrint / 2 && towerSpots[nearestSpot()][1] < (canvas.height / 100) * paths[i][1] + scaleH * (towerFootPrint / 2 + 75)) {
                return 0;
            }
        }
    }
    for (var i = 0; i < paths2.length - 1; i++) {
        if (paths2[i][0] == paths2[i + 1][0] && paths2[i][1] > paths2[i + 1][1]) { // up 
            //@ts-ignore
            if (towerSpots[nearestSpot()][0] > (canvas.width / 100) * paths2[i][0] - scaleW * towerFootPrint / 2 && towerSpots[nearestSpot()][0] < (canvas.width / 100) * paths2[i][0] + scaleW * (towerFootPrint / 2 + 75) && towerSpots[nearestSpot()][1] > (canvas.height / 100) * paths2[i + 1][1] - scaleH * towerFootPrint / 2 && towerSpots[nearestSpot()][1] < (canvas.height / 100) * paths2[i + 1][1] + (canvas.height / 100) * (paths2[i][1] - paths2[i + 1][1]) + scaleH * (towerFootPrint / 2 + 75)) {
                return 0;
            }
        }
        else if (paths2[i][0] == paths2[i + 1][0] && paths2[i][1] < paths2[i + 1][1]) { // down
            //@ts-ignore
            if (towerSpots[nearestSpot()][0] > (canvas.width / 100) * paths2[i][0] - scaleW * towerFootPrint / 2 && towerSpots[nearestSpot()][0] < (canvas.width / 100) * paths2[i][0] + scaleW * (towerFootPrint / 2 + 75) && towerSpots[nearestSpot()][1] > (canvas.height / 100) * paths2[i][1] - scaleH * towerFootPrint / 2 && towerSpots[nearestSpot()][1] < (canvas.height / 100) * paths2[i][1] + (canvas.height / 100) * (paths2[i + 1][1] - paths2[i][1]) + scaleH * (towerFootPrint / 2 + 75)) {
                return 0;
            }
        }
        else if (paths2[i][1] == paths2[i + 1][1] && paths2[i][0] > paths2[i + 1][0]) { // left
            //@ts-ignore
            if (towerSpots[nearestSpot()][0] > (canvas.width / 100) * paths2[i + 1][0] - scaleW * towerFootPrint / 2 && towerSpots[nearestSpot()][0] < (canvas.width / 100) * paths2[i + 1][0] + (canvas.width / 100) * (paths2[i][0] - paths2[i + 1][0]) + scaleW * (towerFootPrint - 25) && towerSpots[nearestSpot()][1] > (canvas.height / 100) * paths2[i][1] - scaleH * towerFootPrint / 2 && towerSpots[nearestSpot()][1] < (canvas.height / 100) * paths2[i][1] + scaleH * (towerFootPrint / 2 + 75)) {
                return 0;
            }
        }
        else if (paths2[i][1] == paths2[i + 1][1] && paths2[i][0] < paths2[i + 1][0]) { // right
            //@ts-ignore
            if (towerSpots[nearestSpot()][0] > (canvas.width / 100) * paths2[i][0] - scaleW * towerFootPrint / 2 && towerSpots[nearestSpot()][0] < (canvas.width / 100) * paths2[i][0] + (canvas.width / 100) * (paths2[i + 1][0] - paths2[i][0]) + scaleW * (towerFootPrint - 25) && towerSpots[nearestSpot()][1] > (canvas.height / 100) * paths2[i][1] - scaleH * towerFootPrint / 2 && towerSpots[nearestSpot()][1] < (canvas.height / 100) * paths2[i][1] + scaleH * (towerFootPrint / 2 + 75)) {
                return 0;
            }
        }
    }
    for (var i = 0; i < paths3.length - 1; i++) {
        if (paths3[i][0] == paths3[i + 1][0] && paths3[i][1] > paths3[i + 1][1]) { // up 
            //@ts-ignore
            if (towerSpots[nearestSpot()][0] > (canvas.width / 100) * paths3[i][0] - scaleW * towerFootPrint / 2 && towerSpots[nearestSpot()][0] < (canvas.width / 100) * paths3[i][0] + scaleW * (towerFootPrint / 2 + 75) && towerSpots[nearestSpot()][1] > (canvas.height / 100) * paths3[i + 1][1] - scaleH * towerFootPrint / 2 && towerSpots[nearestSpot()][1] < (canvas.height / 100) * paths3[i + 1][1] + (canvas.height / 100) * (paths3[i][1] - paths3[i + 1][1]) + scaleH * (towerFootPrint / 2 + 75)) {
                return 0;
            }
        }
        else if (paths3[i][0] == paths3[i + 1][0] && paths3[i][1] < paths3[i + 1][1]) { // down
            //@ts-ignore
            if (towerSpots[nearestSpot()][0] > (canvas.width / 100) * paths3[i][0] - scaleW * towerFootPrint / 2 && towerSpots[nearestSpot()][0] < (canvas.width / 100) * paths3[i][0] + scaleW * (towerFootPrint / 2 + 75) && towerSpots[nearestSpot()][1] > (canvas.height / 100) * paths3[i][1] - scaleH * towerFootPrint / 2 && towerSpots[nearestSpot()][1] < (canvas.height / 100) * paths3[i][1] + (canvas.height / 100) * (paths3[i + 1][1] - paths3[i][1]) + scaleH * (towerFootPrint / 2 + 75)) {
                return 0;
            }
        }
        else if (paths3[i][1] == paths3[i + 1][1] && paths3[i][0] > paths3[i + 1][0]) { // left
            //@ts-ignore
            if (towerSpots[nearestSpot()][0] > (canvas.width / 100) * paths3[i + 1][0] - scaleW * towerFootPrint / 2 && towerSpots[nearestSpot()][0] < (canvas.width / 100) * paths3[i + 1][0] + (canvas.width / 100) * (paths3[i][0] - paths3[i + 1][0]) + scaleW * (towerFootPrint - 25) && towerSpots[nearestSpot()][1] > (canvas.height / 100) * paths3[i][1] - scaleH * towerFootPrint / 2 && towerSpots[nearestSpot()][1] < (canvas.height / 100) * paths3[i][1] + scaleH * (towerFootPrint / 2 + 75)) {
                return 0;
            }
        }
        else if (paths3[i][1] == paths3[i + 1][1] && paths3[i][0] < paths3[i + 1][0]) { // right
            //@ts-ignore
            if (towerSpots[nearestSpot()][0] > (canvas.width / 100) * paths3[i][0] - scaleW * towerFootPrint / 2 && towerSpots[nearestSpot()][0] < (canvas.width / 100) * paths3[i][0] + (canvas.width / 100) * (paths3[i + 1][0] - paths3[i][0]) + scaleW * (towerFootPrint - 25) && towerSpots[nearestSpot()][1] > (canvas.height / 100) * paths3[i][1] - scaleH * towerFootPrint / 2 && towerSpots[nearestSpot()][1] < (canvas.height / 100) * paths3[i][1] + scaleH * (towerFootPrint / 2 + 75)) {
                return 0;
            }
        }
    }
    //check walls
    for (var i = 0; i < walls.length; i++) {
        if (towerSpots[nearestSpot()][0] > walls[i][0] * scaleW - scaleW * towerFootPrint / 2 && towerSpots[nearestSpot()][0] < (walls[i][0] + walls[i][2]) * scaleW + scaleW * towerFootPrint / 2 && towerSpots[nearestSpot()][1] > walls[i][1] * scaleH - scaleH * towerFootPrint / 2 && towerSpots[nearestSpot()][1] < (walls[i][1] + walls[i][3]) * scaleH + scaleH * towerFootPrint / 2) {
            return 0;
        }
    }
    //check in a spot
    if (nearestSpot() == -1) {
        return 0;
    }
    //free space
    return 1;
}
//updates mouse position when moved
onmousemove = function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
};
//helper function for drawing lines found on https://www.javascripttutorial.net/web-apis/javascript-draw-line/
function drawLine(ctx, begin, end, stroke, width) {
    if (stroke === void 0) { stroke = 'black'; }
    if (width === void 0) { width = 1; }
    if (stroke) {
        ctx.strokeStyle = stroke;
    }
    if (width) {
        ctx.lineWidth = width;
    }
    ctx.beginPath();
    ctx.moveTo.apply(ctx, begin);
    ctx.lineTo.apply(ctx, end);
    ctx.stroke();
    ctx.fillStyle = "black";
}
//deselects towers on escape press
document.addEventListener('keydown', function (event) {
    // @ts-ignore
    var mainstyle = window.getComputedStyle(mainMenu);
    // @ts-ignore
    var winstyle = window.getComputedStyle(gameOverMenu);
    // @ts-ignore
    var losestyle = window.getComputedStyle(youWinMenu);
    // checks if other menus are up to stop pausing inbetween
    if (selectedTower == "none" && mainstyle.getPropertyValue('display') == 'none' && winstyle.getPropertyValue('display') == 'none' && losestyle.getPropertyValue('display') == 'none') {
        pauseButton();
    }
    if (event.key === "Escape") {
        towers.forEach(function (tower, index) {
            tower.selected = 0;
        });
        selectedTower = "none";
    }
});
//finds where to spawn the enemies
function spawnPoint(path) {
    var point = [];
    var x = 0;
    var y = 0;
    if (path[0][0] == 0) { // left enterance
        x = -scaleW * 10;
        //@ts-ignore
        y = (canvas.height / 100) * path[0][1] + scaleH * (75 / 2);
    }
    else if (path[0][1] == 0) { // top enterance
        //@ts-ignore
        x = (canvas.width / 100) * path[0][0] + scaleW * (75 / 2);
        y = -scaleH * 10;
    }
    else if (path[0][1] == 100) { // bottom enterance
        //@ts-ignore
        x = (canvas.width / 100) * path[0][0] + scaleW * (75 / 2);
        //@ts-ignore
        y = canvas.height + scaleH * 10;
    }
    else { //right enterance 
        //@ts-ignore
        x = canvas.width + scaleW * 100;
        //@ts-ignore
        y = (canvas.height / 100) * path[0][1] + scaleH * (75 / 2);
    }
    point[0] = x;
    point[1] = y;
    return point;
}
//finds what direction enemies start with
function spawnDirection(path) {
    var direction = "E";
    if (path[0][0] == 0) { // left enterance
        direction = "E";
    }
    else if (path[0][1] == 0) { // top enterance
        direction = "S";
    }
    else if (path[0][1] == 100) { // bottom enterance
        direction = "N";
    }
    else { //right enterance 
        direction = "W";
    }
    return direction;
}
//game over implementation
function gameOver() {
    gameIsOver = 1;
    if (lives >= 1) {
        //@ts-ignore
        youWinMenu.style.display = "flex";
    }
    else {
        //@ts-ignore
        gameOverMenu.style.display = "flex";
    }
}
var Sprite = /** @class */ (function () {
    function Sprite(_a) {
        var position = _a.position, imageSrc = _a.imageSrc, _b = _a.scale, scale = _b === void 0 ? 1 : _b;
        //@ts-ignore
        this.position = position;
        //@ts-ignore
        this.width = 50;
        //@ts-ignore
        this.height = 150;
        //@ts-ignore
        this.image = new Image();
        //@ts-ignore
        this.image.src = imageSrc;
        //@ts-ignore
        this.scale = scale;
    }
    Sprite.prototype.draw = function () {
        //@ts-ignore
        c.drawImage(this.image, this.position.x - this.image.width * this.scale / 2, this.position.y - this.image.height * this.scale / 2, this.image.width * scaleW * this.scale, this.image.height * scaleH * this.scale);
    };
    Sprite.prototype.update = function () {
        this.draw();
    };
    return Sprite;
}());
function setPathRubble() {
    for (var i = 0; i < 1000; i += 10) {
        //@ts-ignore
        pathColors[i] = [];
        for (var j = 0; j < 1000; j += 10) {
            pathColors[i][j] = Math.floor(Math.random() * 5);
        }
    }
}
function TowerPlaced() {
    //handles buffer towers when tower is placed or sold
    for (var i = 0; i < towers.length; i++) { //remove all buffs
        if (towers[i].type != "buffer") {
            towers[i].buffs = 0;
            towers[i].update();
        }
    }
    for (var c = 5; c > 0; c--) { //c is the level count variable
        for (var i = 0; i < towers.length; i++) { //add buffs
            if (towers[i].type == "buffer" && towers[i].level == c) {
                //buff closest 5 towers
                var buffarr = findClosestTowers(towers[i], 2);
                for (var j = 0; j < buffarr.length; j++) {
                    buffarr[j].buffs = c;
                    buffarr[j].update();
                }
            }
        }
    }
    // buffer info for all towers in range*
    // for(var i=0; i<towers.length; i++){//non buffer
    //     var isbuffer = 0;
    //     for(var j=0; j<towers.length; j++){//buffer
    //         if(towers[i].type != "buffer" && towers[j].type == "buffer"){
    //             if (targetinellipse(towers[j].x,towers[j].y, towers[j].range, towers[i].x, towers[i].y, new Enemy(0,0,0,0,"N",0,"clear",0,0,0,0,1)) == 1) {
    //                 isbuffer = 1;
    //                 if(towers[i].buffs < towers[j].buff){
    //                     towers[i].buffs = towers[j].buff;
    //                     towers[i].update();
    //                 }
    //             }
    //         }
    //     }
    //     if(isbuffer == 0){
    //         towers[i].buffs = 0;
    //         towers[i].update();
    //     }
    // }
}
function findClosestTowers(Tower, num) {
    var distances = [];
    for (var i = 0; i < towers.length; i++) {
        if (towers[i].type != "buffer" && towers[i].buffs == 0) {
            var newdistance = Math.sqrt(Math.pow(towers[i].x - Tower.x, 2) + Math.pow(towers[i].y - Tower.y, 2));
            //@ts-ignore
            distances.push({ tower: towers[i], distance: newdistance });
        }
    }
    //@ts-ignore
    distances.sort(function (a, b) { return a.distance - b.distance; });
    //@ts-ignore
    return distances.slice(0, num).map(function (obj) { return obj.tower; });
}
function lineCrossesCircle(m, slope, h, k, r) {
    // Calculate the coefficients of the quadratic equation
    var a = 1 + m * m;
    var b = 2 * (m * slope - m * k - h);
    var c = h * h + slope * slope - 2 * slope * k + k * k - r * r;
    // Use the quadratic formula to find the values of x
    var discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
        // No solutions, the line does not intersect the circle
        return false;
    }
    else {
        return true;
    }
}
// function playmusic(){
//     var audio = new Audio('disco-groove.mp3');
//     audio.play();
// }
