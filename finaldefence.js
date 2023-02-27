"use strict";
// exports.__esModule = true;
var canvas = document.querySelector("canvas");
//@ts-ignore
var c = canvas.getContext("2d");
//html buttons
var startGameButton = document.querySelector('#startGameBtn');
var mainMenu = document.querySelector('#mainMen');
var basicMap = document.querySelector('#mapBasic');
var castleMap = document.querySelector('#mapCastle');
var diamondMap = document.querySelector('#mapDiamond');
var circleMap = document.querySelector('#mapCircle');
var cornerMap = document.querySelector('#mapCorner');
var crossMap = document.querySelector('#mapCross');
var easyDifficulty = document.querySelector('#difficultyEasy');
var mediumDifficulty = document.querySelector('#difficultyMedium');
var hardDifficulty = document.querySelector('#difficultyHard');
var impossibleDifficulty = document.querySelector('#difficultyImpossible');
var sandboxDifficulty = document.querySelector('#difficultySandbox');
var gameOverMenu = document.querySelector('#gameOver');
var menuButton = document.querySelector('#menu');
var restartButton = document.querySelector('#startOver');
var retryButton = document.querySelector('#retry');
var startingRound = document.querySelector('#startRound');
// const background = document.querySelector('#myVideo');
// to do 
/*
subclasses for towers and like everything else
map with dual lanes
balance strong towers
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
var paths = choosepath(0); // 0=basic 1=castle 2=corner 3=diamond 4=circle 5=cross
var totalmoney = 500;
var lives = 10;
var numboxes = 18;
var mouseover = "none";
var selectedTower = "none";
var mouseX = 0;
var mouseY = 0;
var round = 0;
var autostart = "StartWave";
var waveStart = 0;
var retried = 0;
var gameIsOver = 0;
var mouseDown = 0;
var draggingTower = 0;
var placingTowers = "Click to Place";
var speedModifier = 1;
var menutype = 0; //0 = main menu 1 = tower menu
// var snipercosts = [200,300,400,500,600,800,1500];
// var miniguncosts = [150,250,350,450,600,900,900];
// var teslacosts = [250,350,450,550,650,1800,2000];
// var lasercosts = [250,350,450,550,650,1500,2000];
// var farmcosts = [300,400,500,600,700,800,1000];
// var icecosts = [200,250,300,350,400,800,1200];
// var bombcosts = [100,200,300,400,500,1000,1300];
// var supercosts = [2000,3000,4000,5000,6000,8000,10000];
// var buffercosts = [500,600,700,1200,1400];
// var railguncosts = [700,500,700,900,1100,3000,3000];
//old version prices 
var snipercosts = [150, 200, 250, 300, 350, 1000, 1400];
var miniguncosts = [100, 150, 200, 250, 300, 1000, 1000];
var teslacosts = [150, 200, 250, 300, 350, 1500, 1500];
var lasercosts = [150, 200, 250, 300, 350, 1000, 2000];
var farmcosts = [300, 400, 500, 600, 700, 1000, 1500];
var icecosts = [200, 250, 300, 350, 400, 1000, 1200];
var bombcosts = [100, 150, 200, 250, 300, 1000, 1000];
var supercosts = [3000, 4000, 5000, 6000, 7000, 10000, 15000];
var buffercosts = [800, 1200, 1600, 2500, 4000];
var railguncosts = [600, 400, 550, 700, 850, 1500, 1500];
var towerFootPrint = 95;
//@ts-ignore
gameOverMenu.style.display = "none";
//enemy class
var Enemy = /** @class */ (function () {
    function Enemy(x, y, health, speed, direction, radius, color, enemymoney, armor, shield) {
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
    }
    //draws the Enemy
    Enemy.prototype.draw = function () {
        var centerX = this.x;
        var centerY = this.y;
        var size = 1;
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
            default:
                console.log("invalid enemy color!");
                break;
        }
        var enemyImg = new Sprite({
            position: {
                x: centerX,
                y: centerY
            },
            imageSrc: enemySrc,
            scale: size * (scaleH / scaleW)
        });
        enemyImg.update();
        //test draw hitbox
        // //@ts-ignore
        // c.fillStyle = "black";
        // //@ts-ignore
        // c.beginPath();
        // //@ts-ignore
        // c.arc(this.x, this.y, scaleH * this.radius, 0, Math.PI * 2);
        // //@ts-ignore
        // c.stroke();
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
        this.draw();
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
            this.damage = 5;
            this.range = 350;
            this.target = "first";
            this.pierce = 1;
            this.value = 120;
            this.cost = snipercosts;
        }
        else if (this.type == "Minigun") {
            this.reload = 120;
            this.damage = 1;
            this.range = 150;
            this.target = "first";
            this.pierce = 1;
            this.value = 80;
            this.cost = miniguncosts;
        }
        else if (this.type == "tesla") {
            this.maxcharge = 400;
            this.damage = 2;
            this.range = 190;
            this.ischarging = 1;
            this.target = "first";
            this.reload = 200;
            this.charge = 200;
            this.numTargets = 1;
            this.chargespd = 2.2;
            this.teslatargets = [];
            this.value = 150;
            this.cost = teslacosts;
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
        }
        else if (this.type == "farm") {
            this.generated = 0;
            this.income = 50;
            this.range = 10000;
            this.value = 300;
            this.cost = farmcosts;
        }
        else if (this.type == "ice") {
            this.range = 120;
            this.slow = 20;
            this.value = 200;
            this.cost = icecosts;
        }
        else if (this.type == "bomb") {
            this.damage = 1;
            this.reload = 750;
            this.splash = 25;
            this.range = 150;
            this.pierce = 10;
            this.target = "first";
            this.pierce = 1;
            this.value = 100;
            this.cost = bombcosts;
        }
        else if (this.type == "super") {
            this.reload = 50;
            this.damage = 10;
            this.range = 350;
            this.target = "first";
            this.pierce = 1;
            this.value = 2000;
            this.cost = supercosts;
        }
        else if (this.type == "buffer") { //1=range, 2=atk spd, 3=damage, 4=peirce, 5=damage2
            this.range = 145;
            this.buff = 1;
            this.value = 400;
            this.cost = buffercosts;
        }
        else if (this.type == "railgun") { //piercing shot straight down the line. 
            this.reload = 2000;
            this.damage = 50;
            this.range = 350;
            this.pierce = 10;
            this.target = "first";
            this.value = 600;
            this.cost = railguncosts;
        }
        this.draw();
    }
    // draws the tower
    Tower.prototype.draw = function () {
        //base
        if (this.level == -1) { //temp tower
            //@ts-ignore
            c.fillStyle = "red";
        }
        else if (this.level > 5) {
            //@ts-ignore
            c.fillStyle = "#CCBA1F";
        }
        else {
            //@ts-ignore
            c.fillStyle = "black";
        }
        //@ts-ignore
        c.fillRect(this.x - scaleW * towerFootPrint / 2, this.y - scaleH * towerFootPrint / 2, scaleW * towerFootPrint, scaleH * towerFootPrint);
        //@ts-ignore
        c.fillStyle = "black";
        //@ts-ignore
        c.fillRect(this.x - scaleW * (towerFootPrint / 2 - 5), this.y - scaleH * (towerFootPrint / 2 - 5), scaleW * (towerFootPrint - 10), scaleH * (towerFootPrint - 10));
        //head
        if (this.type == "Sniper") {
            //@ts-ignore
            c.fillStyle = "gray";
        }
        else if (this.type == "Minigun") {
            //@ts-ignore
            c.fillStyle = "#800000";
        }
        else if (this.type == "laser") {
            //@ts-ignore
            c.fillStyle = "#8F2E86";
        }
        else if (this.type == "tesla") {
            //@ts-ignore
            c.fillStyle = "#784315";
        }
        else if (this.type == "farm") {
            //@ts-ignore
            c.fillStyle = "yellow";
        }
        else if (this.type == "ice") {
            //@ts-ignore
            c.fillStyle = "white";
        }
        else if (this.type == "bomb") {
            //@ts-ignore
            c.fillStyle = "blue";
        }
        else if (this.type == "super") {
            //@ts-ignore
            c.fillStyle = "#FFCD0A";
        }
        else if (this.type == "buffer") {
            //@ts-ignore
            c.fillStyle = "#FF7173";
        }
        else if (this.type == "railgun") {
            //@ts-ignore
            c.fillStyle = "#018F00";
        }
        //@ts-ignore
        c.beginPath();
        if (this.type == "Minigun" && this.level == 6) {
            //@ts-ignore
            c.arc(this.x + 15 * Math.cos(this.direction - Math.PI / 2), this.y + 15 * Math.sin(this.direction - Math.PI / 2), scaleH * 15, 0, Math.PI * 2);
            //@ts-ignore
            c.arc(this.x - 15 * Math.cos(this.direction - Math.PI / 2), this.y - 15 * Math.sin(this.direction - Math.PI / 2), scaleH * 15, 0, Math.PI * 2);
        }
        else {
            //@ts-ignore
            c.arc(this.x, this.y, scaleH * 25, 0, Math.PI * 2);
        }
        //@ts-ignore
        c.fill();
        // if(this.type == "Sniper"){ attempt at barrel of tower
        //     var xdiff = Math.abs(this.x - this.directionX);
        //     var ydiff = Math.abs(this.y - this.directionY);
        //     var angle = (Math.atan(ydiff / xdiff));
        //     var endTurretX=0;
        //     var endTurretY=0;
        //     if (this.x > this.directionX) {
        //         endTurretX = this.directionX - -120 * Math.cos(angle);
        //     }else {
        //         endTurretX = this.directionX + -120 * Math.cos(angle);
        //     }if (this.y > this.directionY) {
        //         endTurretY = this.directionY - -120 * Math.sin(angle);
        //     }else {
        //         endTurretY = this.directionY + -120 * Math.sin(angle);
        //     }
        //     drawLine(c, [this.x,this.y], [endTurretX,endTurretY], "#C3C3C3", 10);
        //     //@ts-ignore
        //     c.strokeStyle = "black";
        // }
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
        //buffs 
        if (this.buffs >= 1) {
            //@ts-ignore
            c.fillStyle = "#FF7173";
            //@ts-ignore
            c.fillRect(this.x + scaleW * -25, this.y - scaleH * (towerFootPrint / 2 - 5), scaleW * 20, scaleH * 10);
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
                this.damage = 100;
                this.range = 350;
                this.pierce = 1;
            }
            else if (this.level == 7) {
                this.reload = 750;
                this.damage = 200;
                this.range = 350;
                this.pierce = 1;
            }
        }
        else if (this.type == "Minigun") {
            if (this.level == 1) {
                this.reload = 120;
                this.damage = 1;
                this.range = 150;
                this.pierce = 1;
            }
            else if (this.level == 2) {
                this.reload = 120;
                this.damage = 2;
                this.range = 150;
                this.pierce = 1;
            }
            else if (this.level == 3) {
                this.reload = 120;
                this.damage = 3;
                this.range = 150;
                this.pierce = 1;
            }
            else if (this.level == 4) {
                this.reload = 120;
                this.damage = 4;
                this.range = 150;
                this.pierce = 1;
            }
            else if (this.level == 5) {
                this.reload = 120;
                this.damage = 5;
                this.range = 150;
                this.pierce = 1;
            }
            else if (this.level == 6) {
                this.reload = 60;
                this.damage = 5;
                this.range = 150;
                this.pierce = 1;
            }
            else if (this.level == 7) {
                this.reload = 60;
                this.damage = 15;
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
                this.heatup = 20;
            }
        }
        else if (this.type == "tesla") {
            if (this.level == 1) {
                this.maxcharge = 400;
                this.damage = 2;
                this.range = 190;
                this.ischarging = 1;
                this.reload = 200;
                this.charge = 200;
                this.numTargets = 1;
                this.chargespd = 2.2;
                this.teslatargets = [];
            }
            else if (this.level == 2) {
                this.maxcharge = 400;
                this.damage = 4;
                this.range = 190;
                this.ischarging = 1;
                this.reload = 200;
                this.charge = 200;
                this.numTargets = 1;
                this.chargespd = 2.2;
                this.teslatargets = [];
            }
            else if (this.level == 3) {
                this.maxcharge = 400;
                this.damage = 8;
                this.range = 190;
                this.ischarging = 1;
                this.reload = 200;
                this.charge = 200;
                this.numTargets = 1;
                this.chargespd = 2.2;
                this.teslatargets = [];
            }
            else if (this.level == 4) {
                this.maxcharge = 400;
                this.damage = 16;
                this.range = 190;
                this.ischarging = 1;
                this.reload = 200;
                this.charge = 200;
                this.numTargets = 1;
                this.chargespd = 2.2;
                this.teslatargets = [];
            }
            else if (this.level == 5) {
                this.maxcharge = 400;
                this.damage = 32;
                this.range = 190;
                this.ischarging = 1;
                this.reload = 200;
                this.charge = 200;
                this.numTargets = 1;
                this.chargespd = 2.2;
                this.teslatargets = [];
            }
            else if (this.level == 6) { //multi target
                this.maxcharge = 400;
                this.damage = 32;
                this.range = 190;
                this.ischarging = 1;
                this.reload = 200;
                this.charge = 200;
                this.numTargets = 2;
                this.chargespd = 2.2;
                this.teslatargets = [];
            }
            else if (this.level == 7) { //no charge / ultimate tesla
                this.maxcharge = 400;
                this.damage = 32;
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
                this.income = 50;
            }
            else if (this.level == 2) {
                this.income = 110;
            }
            else if (this.level == 3) {
                this.income = 180;
            }
            else if (this.level == 4) {
                this.income = 260;
            }
            else if (this.level == 5) {
                this.income = 350;
            }
            else if (this.level == 6) {
                this.income = 450;
            }
            else if (this.level == 7) {
                this.income = 600;
            }
        }
        else if (this.type == "ice") {
            if (this.level == 1) {
                this.range = 120;
                this.slow = 20;
            }
            else if (this.level == 2) {
                this.range = 120;
                this.slow = 30;
            }
            else if (this.level == 3) {
                this.range = 120;
                this.slow = 40;
            }
            else if (this.level == 4) {
                this.range = 120;
                this.slow = 50;
            }
            else if (this.level == 5) {
                this.range = 120;
                this.slow = 60;
            }
            else if (this.level == 6) {
                this.slow = 60;
                this.range = 200;
            }
            else if (this.level == 7) {
                this.range = 120;
                this.slow = 80;
            }
        }
        else if (this.type == "bomb") {
            if (this.level == 1) {
                this.damage = 1;
                this.reload = 750;
                this.splash = 50;
                this.range = 150;
                this.pierce = 10;
            }
            else if (this.level == 2) {
                this.damage = 2;
                this.reload = 750;
                this.splash = 50;
                this.range = 150;
                this.pierce = 15;
            }
            else if (this.level == 3) {
                this.damage = 4;
                this.reload = 750;
                this.splash = 50;
                this.range = 150;
                this.pierce = 20;
            }
            else if (this.level == 4) {
                this.damage = 8;
                this.reload = 750;
                this.splash = 50;
                this.range = 150;
                this.pierce = 25;
            }
            else if (this.level == 5) {
                this.damage = 16;
                this.reload = 750;
                this.splash = 50;
                this.range = 150;
                this.pierce = 30;
            }
            else if (this.level == 6) {
                this.damage = 20;
                this.reload = 750;
                this.splash = 100;
                this.range = 150;
                this.pierce = 40;
            }
            else if (this.level == 7) {
                this.damage = 50;
                this.reload = 750;
                this.splash = 50;
                this.range = 150;
                this.pierce = 40;
            }
        }
        else if (this.type == "super") { //super strong but expensive 
            if (this.level == 1) {
                this.reload = 80;
                this.damage = 10;
                this.range = 350;
                this.pierce = 1;
            }
            else if (this.level == 2) {
                this.reload = 80;
                this.damage = 50;
                this.range = 350;
                this.pierce = 1;
            }
            else if (this.level == 3) {
                this.reload = 80;
                this.damage = 100;
                this.range = 350;
                this.pierce = 1;
            }
            else if (this.level == 4) {
                this.reload = 40;
                this.damage = 100;
                this.range = 350;
                this.pierce = 1;
            }
            else if (this.level == 5) {
                this.reload = 40;
                this.damage = 200;
                this.range = 350;
                this.pierce = 1;
            }
            else if (this.level == 6) { //seeking bullets 
                this.reload = 20;
                this.damage = 400;
                this.range = 350;
                this.pierce = 1;
            }
            else if (this.level == 7) { //1000 damage
                this.reload = 20;
                this.damage = 1000;
                this.range = 350;
                this.pierce = 1;
            }
        }
        else if (this.type == "buffer") { //0=range, 1=atk spd, 2=damage, 3=peirce, 4=damage2
            if (this.level == 1) {
                this.range = 145;
                this.buff = 1;
            }
            else if (this.level == 2) {
                this.range = 145;
                this.buff = 2;
            }
            else if (this.level == 3) {
                this.range = 145;
                this.buff = 3;
            }
            else if (this.level == 4) {
                this.range = 145;
                this.buff = 4;
            }
            else if (this.level == 5) {
                this.range = 145;
                this.buff = 5;
            }
        }
        else if (this.type == "railgun") { //peircing shot straight down the line. 
            if (this.level == 1) {
                this.reload = 2000;
                this.damage = 50;
                this.pierce = 10;
                this.range = 350;
            }
            else if (this.level == 2) {
                this.reload = 2000;
                this.damage = 100;
                this.pierce = 15;
                this.range = 350;
            }
            else if (this.level == 3) {
                this.reload = 2000;
                this.damage = 200;
                this.pierce = 20;
                this.range = 350;
            }
            else if (this.level == 4) {
                this.reload = 2000;
                this.damage = 400;
                this.pierce = 25;
                this.range = 350;
            }
            else if (this.level == 5) {
                this.reload = 2000;
                this.damage = 800;
                this.pierce = 30;
                this.range = 350;
            }
            else if (this.level == 6) { //fast shot
                this.reload = 1000;
                this.damage = 1000;
                this.pierce = 40;
                this.range = 350;
            }
            else if (this.level == 7) { //ultimate shot
                this.reload = 2000;
                this.damage = 2000;
                this.pierce = 40;
                this.range = 350;
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
        this.value = Math.floor(tempValue * (sellpercent / 10)); //80%
        //tower buffs
        if (this.buffs > 0) { //1=range, 2=atk spd, 3=damage, 4=peirce, 5=damage2
            this.range = this.range * 1.2;
        }
        if (this.buffs > 1) {
            this.reload *= 0.8;
        }
        if (this.buffs > 2) {
            this.damage += 5;
            if (this.type == "laser" && this.level == 6) {
                this.lasermin += 5;
                this.lasermax += 5;
            }
            else {
                this.lasermin += 1;
                this.lasermax += 5;
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
        if (this.tower.type == "tesla") {
            var dist = Math.abs(Math.sqrt((this.target.x - this.tower.x) * (this.target.x - this.tower.x) + (this.target.y - this.tower.y) * (this.target.y - this.tower.y)));
            //first coil
            var angle = Math.atan((this.target.y - this.tower.y) / (this.tower.x - this.target.x));
            var chain = Math.floor(Math.random() * 50) / 100 - 0.25;
            if (this.target.x > this.tower.x) { //right
                drawLine(c, [this.tower.x, this.tower.y], [(dist / 3) * Math.cos(angle + chain) + this.tower.x, this.tower.y - (dist / 3) * Math.sin(angle + chain)], this.color, this.size);
            }
            else {
                drawLine(c, [this.tower.x, this.tower.y], [this.tower.x - (dist / 3) * Math.cos(angle + chain), this.tower.y + (dist / 3) * Math.sin(angle + chain)], this.color, this.size);
            }
            //second coil 
            if (this.target.x > this.tower.x) { //right
                drawLine(c, [(dist / 3) * Math.cos(angle + chain) + this.tower.x, this.tower.y - (dist / 3) * Math.sin(angle + chain)], [(dist - dist / 3) * Math.cos(angle - chain) + this.tower.x, this.tower.y - (dist - dist / 3) * Math.sin(angle - chain)], this.color, this.size);
            }
            else {
                drawLine(c, [this.tower.x - (dist / 3) * Math.cos(angle + chain), this.tower.y + (dist / 3) * Math.sin(angle + chain)], [this.tower.x - (dist - dist / 3) * Math.cos(angle - chain), this.tower.y + (dist - dist / 3) * Math.sin(angle - chain)], this.color, this.size);
            }
            //third coil 
            if (this.target.x > this.tower.x) { //right
                drawLine(c, [(dist - dist / 3) * Math.cos(angle - chain) + this.tower.x, this.tower.y - (dist - dist / 3) * Math.sin(angle - chain)], [this.target.x, this.target.y], this.color, this.size);
            }
            else {
                drawLine(c, [this.tower.x - (dist - dist / 3) * Math.cos(angle - chain), this.tower.y + (dist - dist / 3) * Math.sin(angle - chain)], [this.target.x, this.target.y], this.color, this.size);
            }
        }
        else { //laser
            drawLine(c, [this.target.x, this.target.y], [this.tower.x, this.tower.y], this.color, this.size);
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
//creates the wave
function spawnWave(numenemies, density, health, speed, size, color, Emoney, armor, shield, boss) {
    if (boss === void 0) { boss = new Enemy(0, 0, 0, 0, "E", 0, "black", 0, 0, 0); }
    var current = 0;
    var bossRound = 0;
    if (boss.x != 0 || boss.y != 0) { //boss round
        bossRound = 1;
    }
    var enemiesfunction = setInterval(function () {
        if (gameIsOver == 1) {
            clearInterval(enemiesfunction);
        }
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
            enemies.push(new Enemy(spawnPoint()[0], spawnPoint()[1], health, speedModifier * speed, spawnDirection(), size, color, Emoney, armor, shield));
        }
        else { //spawn inside boss
            enemies.push(new Enemy(boss.x, boss.y, health, speedModifier * speed, boss.direction, size, color, Emoney, armor, shield));
            enemies[enemies.length - 1].distance = boss.distance;
        }
        current++;
        if (current >= numenemies && bossRound == 0) {
            waveStart = 0;
            clearInterval(enemiesfunction);
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
    var lastenemy;
    var firstenemy;
    var strongenemy;
    var weakenemy;
    var target;
    var newtarget;
    var lifespan;
    var size;
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
        if (tower.type == "Sniper" && tower.level == 7) {
            size = 8;
        }
        else if (tower.type == "Minigun" && tower.level == 6) {
            size = 4;
        }
        else if (tower.type == "Minigun" && tower.level == 7) {
            size = 6;
        }
        else if (tower.type == "bomb") {
            size = 10;
        }
        else {
            size = 5;
        }
        if (tower.type == "Sniper" || tower.type == "Minigun" || tower.type == "bomb" || tower.type == "super" || tower.type == "railgun") { //shoot projectile
            if (inrange == 1) {
                //inputs
                var speed = 10;
                if (tower.type == "Sniper") {
                    speed = 15;
                }
                if (tower.type == "bomb") {
                    speed = 10;
                }
                if (tower.type == "super") {
                    speed = 15;
                }
                var damage = tower.damage;
                if (tower.type == "Sniper") {
                    lifespan = 35;
                }
                else if (tower.type == "bomb") {
                    lifespan = 35;
                }
                else if (tower.type == "super") {
                    lifespan = 40;
                }
                else {
                    lifespan = 21;
                }
                if (tower.type == "Minigun" && tower.level == 6) { // double shot
                    switch (tower.target) {
                        case "first": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 10) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x + scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y + scaleH * 15 * Math.sin(tower.direction - Math.PI / 2), damage, speed, size, "red", firstenemy, lifespan, 0, tower.pierce));
                                shots.push(new Projectile(tower.x - scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y - scaleH * 15 * Math.sin(tower.direction - Math.PI / 2), damage, speed, size, "red", firstenemy, lifespan, 0, tower.pierce));
                            }
                            else {
                                tower.shootNow++;
                            }
                            break;
                        }
                        case "last": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 10) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x + scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y + scaleH * 15 * Math.sin(tower.direction - Math.PI / 2), damage, speed, size, "red", lastenemy, lifespan, 0, tower.pierce));
                                shots.push(new Projectile(tower.x - scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y - scaleH * 15 * Math.sin(tower.direction - Math.PI / 2), damage, speed, size, "red", lastenemy, lifespan, 0, tower.pierce));
                            }
                            else {
                                tower.shootNow++;
                            }
                            break;
                        }
                        case "strong": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 10) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x + scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y + scaleH * 15 * Math.sin(tower.direction - Math.PI / 2), damage, speed, size, "red", strongenemy, lifespan, 0, tower.pierce));
                                shots.push(new Projectile(tower.x - scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y - scaleH * 15 * Math.sin(tower.direction - Math.PI / 2), damage, speed, size, "red", strongenemy, lifespan, 0, tower.pierce));
                            }
                            else {
                                tower.shootNow++;
                            }
                            break;
                        }
                        case "weak": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 10) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x + scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y + scaleH * 15 * Math.sin(tower.direction - Math.PI / 2), damage, speed, size, "red", weakenemy, lifespan, 0, tower.pierce));
                                shots.push(new Projectile(tower.x - scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y - scaleH * 15 * Math.sin(tower.direction - Math.PI / 2), damage, speed, size, "red", weakenemy, lifespan, 0, tower.pierce));
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
                                shots.push(new Projectile(tower.x, tower.y, damage, speed, size, "red", firstenemy, lifespan, 1, tower.pierce));
                            }
                            else {
                                tower.shootNow++;
                            }
                            break;
                        }
                        case "last": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 10) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x, tower.y, damage, speed, 10, "red", lastenemy, lifespan, 1, tower.pierce));
                            }
                            else {
                                tower.shootNow++;
                            }
                            break;
                        }
                        case "strong": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 10) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x, tower.y, damage, speed, size, "red", strongenemy, lifespan, 1, tower.pierce));
                            }
                            else {
                                tower.shootNow++;
                            }
                            break;
                        }
                        case "weak": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 10) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x, tower.y, damage, speed, size, "red", weakenemy, lifespan, 1, tower.pierce));
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
                            var tempEnemy = new Enemy(0, 0, 100, 0, "N", 0, "red", 0, 0, 0);
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
                            var tempEnemy = new Enemy(0, 0, 100, 0, "N", 0, "red", 0, 0, 0);
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
                            var tempEnemy = new Enemy(0, 0, 100, 0, "N", 0, "red", 0, 0, 0);
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
                            var tempEnemy = new Enemy(0, 0, 100, 0, "N", 0, "red", 0, 0, 0);
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
                        lasers.push(new Laser((tower.shootNow - (tower.reload / speedModifier) / 15 + 100) / 10, "blue", tempEnemy, tower));
                    }
                    if (tower.shootNow >= (tower.reload / speedModifier) / 15) {
                        tower.shootNow = 0;
                        if (tower.type == "super") {
                            //@ts-ignore
                            shots.push(new Projectile(tower.x, tower.y, damage, speed, size, "red", tempEnemy, lifespan, 0, tower.pierce));
                        }
                        else if (tower.type == "bomb") {
                            //@ts-ignore
                            shots.push(new Projectile(tower.x, tower.y, damage, speed, size, "red", tempEnemy, lifespan, tower.splash, tower.pierce));
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
                                if (lineCrossesCircle(slope, intercept, enemies[i].x, (-enemies[i].y + canvas.height), enemies[i].radius)) {
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
                                shots.push(new Projectile(tower.x, tower.y, damage, speed, size, "red", firstenemy, lifespan, 0, tower.pierce));
                            }
                            else {
                                tower.shootNow++;
                            }
                            break;
                        }
                        case "last": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 15) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x, tower.y, damage, speed, size, "red", lastenemy, lifespan, 0, tower.pierce));
                            }
                            else {
                                tower.shootNow++;
                            }
                            break;
                        }
                        case "strong": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 15) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x, tower.y, damage, speed, size, "red", strongenemy, lifespan, 0, tower.pierce));
                            }
                            else {
                                tower.shootNow++;
                            }
                            break;
                        }
                        case "weak": {
                            if (tower.shootNow >= (tower.reload / speedModifier) / 15) {
                                tower.shootNow = 0;
                                shots.push(new Projectile(tower.x, tower.y, damage, speed, size, "red", weakenemy, lifespan, 0, tower.pierce));
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
                            lasers.push(new Laser(thickness, "red", target, tower));
                        }
                    }
                }
                //do damage here instead
                if (inrange == 1) {
                    if (lasercounter > tower.reload) { //shoots every tower.reload 
                        if (tower.level != 6) {
                            var thickness = Math.floor(tower.damage / 10) + 1;
                            lasers.push(new Laser(thickness, "red", target, tower));
                        }
                        if (found == 1) { //heat up
                            if (laserheatcounter > tower.lasertime) { //heat up every lasertime shots
                                laserheatcounter = 0;
                                tower.damage = tower.damage + tower.heatup; //heat up by tower heatup 
                                if (tower.damage >= tower.lasermax) {
                                    tower.damage = tower.lasermax;
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
                            lasercounter = 0;
                        }
                        else { //shield
                            if (shieldcounter >= 50) { //breaks the shield every 50 hits
                                target.shield--;
                                shieldcounter = 0;
                            }
                            else {
                                shieldcounter++;
                            }
                            tower.damage = tower.lasermin;
                        }
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
                        lasers.push(new Laser(tower.level + 4, "yellow", target, tower));
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
                            target.shield--;
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
            totalmoney += 100;
            console.log(100);
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
        var tempTower = new Tower(mouseX, mouseY, selectedTower, 1, 1);
        if (freespace() == 0) {
            tempTower = new Tower(mouseX, mouseY, selectedTower, -1, 1);
        }
        tempTower.draw();
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
        //check for changing direction
        for (var i = 1; i < paths.length - 1; i++) {
            //chenge the enemies direction
            if (paths[i][0] == paths[i + 1][0] && paths[i][1] > paths[i + 1][1]) { // up path
                if (paths[i][0] > paths[i - 1][0]) { //coming from left side
                    //@ts-ignore
                    if (enemy.x > (canvas.width / 100) * paths[i][0] + scaleW * (75 / 2) && enemy.x < (canvas.width / 100) * paths[i][0] + scaleW * 75 && enemy.y > (canvas.height / 100) * paths[i][1] && enemy.y < (canvas.height / 100) * paths[i][1] + scaleH * 75) {
                        enemy.direction = "N";
                    }
                }
                else { //coming from right side
                    //@ts-ignore
                    if (enemy.x > (canvas.width / 100) * paths[i][0] && enemy.x < (canvas.width / 100) * paths[i][0] + scaleW * (75 / 2) && enemy.y > (canvas.height / 100) * paths[i][1] && enemy.y < (canvas.height / 100) * paths[i][1] + scaleH * 75) {
                        enemy.direction = "N";
                    }
                }
            }
            else if (paths[i][0] == paths[i + 1][0] && paths[i][1] < paths[i + 1][1]) { // down path
                if (paths[i][0] > paths[i - 1][0]) { //coming from left side
                    //@ts-ignore
                    if (enemy.x > (canvas.width / 100) * paths[i][0] + scaleW * (75 / 2) && enemy.x < (canvas.width / 100) * paths[i][0] + scaleW * 75 && enemy.y > (canvas.height / 100) * paths[i][1] && enemy.y < (canvas.height / 100) * paths[i][1] + scaleH * 75) {
                        enemy.direction = "S";
                    }
                }
                else { //coming from right side
                    //@ts-ignore
                    if (enemy.x > (canvas.width / 100) * paths[i][0] && enemy.x < (canvas.width / 100) * paths[i][0] + scaleW * (75 / 2) && enemy.y > (canvas.height / 100) * paths[i][1] && enemy.y < (canvas.height / 100) * paths[i][1] + scaleH * 75) {
                        enemy.direction = "S";
                    }
                }
            }
            else if (paths[i][1] == paths[i + 1][1] && paths[i][0] > paths[i + 1][0]) { // left path
                if (paths[i][1] > paths[i - 1][1]) { //coming from top
                    //@ts-ignore
                    if (enemy.x > (canvas.width / 100) * paths[i][0] && enemy.x < (canvas.width / 100) * paths[i][0] + scaleW * 75 && enemy.y > (canvas.height / 100) * paths[i][1] + scaleH * (75 / 2) && enemy.y < (canvas.height / 100) * paths[i][1] + scaleH * 75) {
                        enemy.direction = "W";
                    }
                }
                else { //coming from bottom
                    //@ts-ignore
                    if (enemy.x > (canvas.width / 100) * paths[i][0] && enemy.x < (canvas.width / 100) * paths[i][0] + scaleW * 75 && enemy.y > (canvas.height / 100) * paths[i][1] && enemy.y < (canvas.height / 100) * paths[i][1] + scaleH * (75 / 2)) {
                        enemy.direction = "W";
                    }
                }
            }
            else if (paths[i][1] == paths[i + 1][1] && paths[i][0] < paths[i + 1][0]) { // right path
                if (paths[i][1] > paths[i - 1][1]) { //coming from top
                    //@ts-ignore
                    if (enemy.x > (canvas.width / 100) * paths[i][0] && enemy.x < (canvas.width / 100) * paths[i][0] + scaleW * 75 && enemy.y > (canvas.height / 100) * paths[i][1] + scaleH * (75 / 2) && enemy.y < (canvas.height / 100) * paths[i][1] + scaleH * 75) {
                        enemy.direction = "E";
                    }
                }
                else { //coming from bottom
                    //@ts-ignore
                    if (enemy.x > (canvas.width / 100) * paths[i][0] && enemy.x < (canvas.width / 100) * paths[i][0] + scaleW * 75 && enemy.y > (canvas.height / 100) * paths[i][1] && enemy.y < (canvas.height / 100) * paths[i][1] + scaleH * (75 / 2)) {
                        enemy.direction = "E";
                    }
                }
            }
        }
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
                            enemy.shield--;
                        }
                    }
                    else if (shot.ap > 1) { //splash
                        var pierce = 0;
                        enemies.forEach(function (nearenemy, index) {
                            if (nearenemy.distance > enemy.distance - shot.ap && nearenemy.distance < enemy.distance + shot.ap && pierce < shot.pierce) {
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
                    if (shot.pierce <= 1 || shot.ap > 1) { //if sp>1 then its splash so no pierce
                        shots.splice(index, 1);
                    }
                    else {
                        var xdiff = Math.abs(shot.x - shot.target.x);
                        var ydiff = Math.abs(shot.y - shot.target.y);
                        var angle = (Math.atan(ydiff / xdiff));
                        var tempEnemy = new Enemy(0, 0, 1000, 0, "N", 0, "red", 0, 0, 0);
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
                    var tempEnemy = new Enemy(0, 0, 1000, 0, "N", 0, "red", 0, 0, 0);
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
        if (paths[paths.length - 1][0] == 0) { // left exit
            if (enemy.x <= -10) {
                totalmoney += enemy.enemymoney;
                enemies.splice(index, 1);
                if (enemy.color == "boss") {
                    lives -= 99;
                }
                lives -= 1;
            }
        }
        else if (paths[paths.length - 1][1] == 0) { // top exit
            if (enemy.y <= -10) {
                totalmoney += enemy.enemymoney;
                enemies.splice(index, 1);
                if (enemy.color == "boss") {
                    lives -= 99;
                }
                lives -= 1;
            }
        }
        else if (paths[paths.length - 1][1] == 100) { // bottom exit
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
            if (enemy.x >= canvas.width + 10) {
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
    if (menutype == 0 && mouseX > canvas.width - canvas.width / 7.5 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (2 / 2) && mouseY < canvas.height / (numboxes / 2) * (2 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "Sniper";
        //@ts-ignore
    }
    else if (mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * ((3 - 1) / 2) && mouseY < canvas.height / (numboxes / 2) * ((3 - 1) / 2) + canvas.height / (numboxes / 2)) {
        if (menutype == 0) {
            mouseover = "Minigun";
        }
        else if (menutype == 1 && selectedTower == "none") {
            mouseover = "target";
        }
        //@ts-ignore
    }
    else if (menutype == 0 && mouseX > canvas.width - canvas.width / 7.5 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (4 / 2) && mouseY < canvas.height / (numboxes / 2) * (4 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "farm";
        //@ts-ignore
    }
    else if (menutype == 0 && mouseX > canvas.width - canvas.width / 7.5 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (6 / 2) && mouseY < canvas.height / (numboxes / 2) * (6 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "ice";
        //@ts-ignore
    }
    else if (menutype == 0 && mouseX > canvas.width - canvas.width / 7.5 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (8 / 2) && mouseY < canvas.height / (numboxes / 2) * (8 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "bomb";
        //@ts-ignore
    }
    else if (menutype == 0 && mouseX > canvas.width - canvas.width / 7.5 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (10 / 2) && mouseY < canvas.height / (numboxes / 2) * (10 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "buffer";
        //@ts-ignore
    }
    else if (menutype == 0 && mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * ((5 - 1) / 2) && mouseY < canvas.height / (numboxes / 2) * ((5 - 1) / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "laser";
        //@ts-ignore
    }
    else if (menutype == 0 && mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * ((7 - 1) / 2) && mouseY < canvas.height / (numboxes / 2) * ((7 - 1) / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "tesla";
        //@ts-ignore
    }
    else if (menutype == 0 && mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * ((9 - 1) / 2) && mouseY < canvas.height / (numboxes / 2) * ((9 - 1) / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "super";
        //@ts-ignore
    }
    else if (menutype == 0 && mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * ((11 - 1) / 2) && mouseY < canvas.height / (numboxes / 2) * ((11 - 1) / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "railgun";
        //@ts-ignore
    }
    else if (menutype == 1 && selectedlevel == "5" && mouseX > canvas.width - canvas.width / 7.5 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (10 / 2) && mouseY < canvas.height / (numboxes / 2) * (10 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "level6";
        //@ts-ignore
    }
    else if (menutype == 1 && selectedlevel == "5" && mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * ((11 - 1) / 2) && mouseY < canvas.height / (numboxes / 2) * ((11 - 1) / 2) + canvas.height / (numboxes / 2)) {
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
    else if (mouseX > canvas.width - canvas.width / 7.5 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (14 / 2) && mouseY < canvas.height / (numboxes / 2) * (14 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "speed";
        //@ts-ignore
    }
    else if (mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (14 / 2) && mouseY < canvas.height / (numboxes / 2) * (14 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "towerPlacement";
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
    else if (enemies.length == 0) {
        return 0;
    }
    else {
        return 1;
    }
}
//function for when you click
addEventListener("click", function () {
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
        towers.push(new Tower(mouseX, mouseY, selectedTower, 1, 0));
        totalmoney -= towers[towers.length - 1].cost[0];
        towershoot(towers[towers.length - 1]);
        TowerPlaced();
        selectedTower = "none";
    }
    else if (mouseover == "upgrade" || mouseover == "level6" || mouseover == "level7") {
        for (var i = 0; i < towers.length; i++) {
            if (towers[i].selected == 1) {
                console.log(towers[i].cost[towers[i].level]);
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
});
//drag functionality
document.body.onmousedown = function () {
    ++mouseDown;
};
document.body.onmouseup = function () {
    --mouseDown;
};
function changeTarget(tower) {
    if (tower.type != "laser") {
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
    else { // targetting for laser
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
            if ((towers[i].type == "laser" || towers[i].type == "tesla") && towers[i].level == 6) {
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
        for (var i = enemies.length - 1; i >= 0; i--) { //replace enemies for correct speed
            var newspd = enemies[i].speed;
            if (speedModifier == 1) {
                newspd = newspd * 2 / 3;
            }
            else if (speedModifier == 1.25) {
                newspd = newspd * 1.25;
            }
            else {
                newspd = (newspd / 1.25) * 1.5;
            }
            enemies.push(new Enemy(enemies[i].x, enemies[i].y, enemies[i].health, newspd, enemies[i].direction, enemies[i].radius, enemies[i].color, enemies[i].enemymoney, enemies[i].armor, enemies[i].shield));
            enemies.splice(i, 1);
        }
        for (var i = lasers.length - 1; i >= 0; i--) { //remove lasers
            lasers.splice(i, 1);
        }
        TowerPlaced(); // handles buffer
    }
}
//checks if current mouse location is open to place a tower in
function freespace() {
    //check against menu
    //@ts-ignore
    if (mouseX > canvas.width - canvas.width / 7.5 - scaleW * 50) {
        return 0;
    }
    //check against other towers
    for (var i = 0; i < towers.length; i++) {
        if (mouseX > towers[i].x - scaleW * towerFootPrint && mouseX < towers[i].x + scaleW * towerFootPrint && mouseY > towers[i].y - scaleH * towerFootPrint && mouseY < towers[i].y + scaleH * towerFootPrint) {
            return 0;
        }
    }
    //check paths
    for (var i = 0; i < paths.length - 1; i++) {
        if (paths[i][0] == paths[i + 1][0] && paths[i][1] > paths[i + 1][1]) { // up 
            //@ts-ignore
            if (mouseX > (canvas.width / 100) * paths[i][0] - scaleW * towerFootPrint / 2 && mouseX < (canvas.width / 100) * paths[i][0] + scaleW * (towerFootPrint / 2 + 75) && mouseY > (canvas.height / 100) * paths[i + 1][1] - scaleH * towerFootPrint / 2 && mouseY < (canvas.height / 100) * paths[i + 1][1] + (canvas.height / 100) * (paths[i][1] - paths[i + 1][1]) + scaleH * (towerFootPrint / 2 + 75)) {
                return 0;
            }
        }
        else if (paths[i][0] == paths[i + 1][0] && paths[i][1] < paths[i + 1][1]) { // down
            //@ts-ignore
            if (mouseX > (canvas.width / 100) * paths[i][0] - scaleW * towerFootPrint / 2 && mouseX < (canvas.width / 100) * paths[i][0] + scaleW * (towerFootPrint / 2 + 75) && mouseY > (canvas.height / 100) * paths[i][1] - scaleH * towerFootPrint / 2 && mouseY < (canvas.height / 100) * paths[i][1] + (canvas.height / 100) * (paths[i + 1][1] - paths[i][1]) + scaleH * (towerFootPrint / 2 + 75)) {
                return 0;
            }
        }
        else if (paths[i][1] == paths[i + 1][1] && paths[i][0] > paths[i + 1][0]) { // left
            //@ts-ignore
            if (mouseX > (canvas.width / 100) * paths[i + 1][0] - scaleW * towerFootPrint / 2 && mouseX < (canvas.width / 100) * paths[i + 1][0] + (canvas.width / 100) * (paths[i][0] - paths[i + 1][0]) + scaleW * (towerFootPrint - 25) && mouseY > (canvas.height / 100) * paths[i][1] - scaleH * towerFootPrint / 2 && mouseY < (canvas.height / 100) * paths[i][1] + scaleH * (towerFootPrint / 2 + 75)) {
                return 0;
            }
        }
        else if (paths[i][1] == paths[i + 1][1] && paths[i][0] < paths[i + 1][0]) { // right
            //@ts-ignore
            if (mouseX > (canvas.width / 100) * paths[i][0] - scaleW * towerFootPrint / 2 && mouseX < (canvas.width / 100) * paths[i][0] + (canvas.width / 100) * (paths[i + 1][0] - paths[i][0]) + scaleW * (towerFootPrint - 25) && mouseY > (canvas.height / 100) * paths[i][1] - scaleH * towerFootPrint / 2 && mouseY < (canvas.height / 100) * paths[i][1] + scaleH * (towerFootPrint / 2 + 75)) {
                return 0;
            }
        }
    }
    //free space
    return 1;
}
//updates mouse position when moved
onmousemove = function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
};
//sending waves function
function nextWave() {
    //multipliers
    var hp = 1; //health
    var den = 1; //density
    var spd = 1; //speed
    switch (difficulty) {
        case 1:
            hp = 0.7;
            den = 1.4;
            spd = 0.7;
            break;
        case 2:
            hp = 0.8;
            den = 1.2;
            spd = 0.9;
            break;
        case 3:
            hp = 1;
            den = 1;
            spd = 1;
            break;
        case 4:
            hp = 1.2;
            den = 0.9;
            spd = 1.2;
            break;
    }
    //rounds    
    switch (round) {
        case 1: //money 100
            spawnWave(10, 1700 * den, Math.floor(15 * hp), 3 * spd, 20, "green", 10, 0, 0); //basic 
            break;
        case 2: //money 110
            spawnWave(11, 1500 * den, Math.floor(25 * hp), 3 * spd, 20, "green", 10, 0, 0); //basic
            break;
        case 3: //money 120
            spawnWave(12, 1300 * den, Math.floor(40 * hp), 3 * spd, 20, "green", 10, 0, 0); //basic
            break;
        case 4: //money 130
            spawnWave(13, 1500 * den, Math.floor(25 * hp), 6 * spd, 20, "yellow", 10, 0, 0); //fast
            break;
        case 5: //money 140
            spawnWave(40, 75, 2, 3 * spd, 15, "pink", 3.5, 0, 0); //grouped
            break;
        case 6: //money 150
            spawnWave(20, 1100 * den, Math.floor(50 * hp), 3 * spd, 20, "green", 7.5, 0, 1); //shielded
            break;
        case 7: //money 300
            spawnWave(10, 1700 * den, Math.floor(50 * hp), 3 * spd, 35, "red", 18, 2, 0); //armored
            break;
        case 8: //money 170
            spawnWave(15, 1500 * den, Math.floor(20 * hp), 6 * spd, 20, "yellow", 6, 0, 1); //fast + 
            spawnWave(50, 100, 4, 3 * spd, 15, "pink", 1.6, 0, 0); //grouped
            break;
        case 9: //money 180 
            spawnWave(2, 5000 * den, Math.floor(250 * hp), 2.5, 40, "red", 200, 6, 0); //armored
            break;
        case 10: //money 190
            spawnWave(190, 100, Math.floor(5 * hp), 3 * spd, 15, "pink", 1, 0, 0); //mega grouped
            break;
        case 11: //money 200
            spawnWave(10, 2000 * den, Math.floor(15 * hp), 2.5 * spd, 35, "red", 2, 5, 0); //armored + 
            spawnWave(20, 1000 * den, Math.floor(20 * hp), 6 * spd, 20, "yellow", 2, 0, 0); //fast +
            spawnWave(20, 1000 * den, Math.floor(20 * hp), 3 * spd, 20, "green", 2, 0, 0); //basic + 
            spawnWave(100, 300, Math.floor(5 * hp), 2 * spd, 15, "pink", 1, 0, 0); //grouped
            break;
        case 12: //money 220
            spawnWave(20, 1000 * den, Math.floor(40 * hp), 6 * spd, 35, "red", 11, 6, 0); //fast / armored
            break;
        case 13: //money 240
            spawnWave(160, 0, 1, 3 * spd, 15, "pink", 1.5, 0, 0); //clump
            break;
        case 14: // money 260
            spawnWave(25, 800 * den, Math.floor(50 * hp), 2 * spd, 35, "red", 10.4, 5, 1); //armored / multiple
            break;
        case 15: // money 280 + 1200
            var boss = new Enemy(spawnPoint()[0], spawnPoint()[1], Math.floor(10000 * hp), 0.4 * spd, spawnDirection(), 60, "boss", 1200, 0, 0);
            enemies.push(boss);
            spawnWave(10, 500 * den, Math.floor(10 * hp), 3 * spd, 15, "pink", 2, 0, 0, boss); //minions
            break;
        case 16: //fast 300
            spawnWave(50, 400 * den, Math.floor(50 * hp), 8 * spd, 20, "yellow", 8, 0, 0);
            break;
        case 17: //grouped 320
            spawnWave(160, 100 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 2, 0, 0);
            break;
        case 18: //tanks 340
            spawnWave(8, 8000 * den, Math.floor(5000 * hp), 1 * spd, 20, "green", 42.5, 0, 10);
            break;
        case 19: // armored 360
            spawnWave(20, 1500 * den, Math.floor(750 * hp), 1.5 * spd, 35, "red", 18, 20, 1);
            break;
        case 20: // fast, grouped, armored, tanks 380
            spawnWave(10, 250 * den, Math.floor(100 * hp), 4 * spd, 35, "red", 38, 10, 0);
            break;
        case 21: // fast armored on grouped 400
            spawnWave(50, 300 * den, Math.floor(150 * hp), 2 * spd, 15, "pink", 4, 0, 0);
            spawnWave(25, 600 * den, Math.floor(50 * hp), 4 * spd, 35, "red", 8, 10, 1);
            break;
        case 22: // stacks 450
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(20, 1400 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            spawnWave(10, 2800 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 1, 0, 0);
            break;
        case 23: // super shielded 500
            spawnWave(10, 4000 * den, Math.floor(1 * hp), 1.5 * spd, 30, "green", 50, 0, 100);
            break;
        case 24: // everything again 550
            spawnWave(30, 1900 * den, Math.floor(40 * hp), 2.5 * spd, 35, "red", 3, 5, 1); //armored + 
            spawnWave(25, 2500 * den, Math.floor(150 * hp), 6 * spd, 20, "yellow", 6, 0, 1); //fast + 
            spawnWave(20, 1500 * den, Math.floor(400 * hp), 2.8 * spd, 20, "green", 3, 0, 1); //basic +
            spawnWave(250, 170 * den, Math.floor(30 * hp), 2 * spd, 15, "pink", 1, 0, 1); //grouped
            break;
        case 25: // armored boss 600+2000
            var fboss = new Enemy(spawnPoint()[0], spawnPoint()[1], Math.floor(22000 * hp), 0.3 * spd, spawnDirection(), 60, "boss", 2000, 50, 50 * hp);
            enemies.push(fboss);
            spawnWave(10, 15000 * den, Math.floor(3000 * hp), 2 * spd, 35, "red", 20, 25, 0, fboss); //minions
            break;
        case 26: // 650 grouping light armored
            spawnWave(100, 100 * den, Math.floor(250 * hp), 3 * spd, 35, "red", 6.5, 1, 0);
            break;
        case 27: // 700 super speed
            spawnWave(35, 1000 * den, Math.floor(550 * hp), 12 * spd, 20, "yellow", 20, 0, 0);
            break;
        case 28: // 750 max armored
            spawnWave(10, 6000 * den, Math.floor(1500 * hp), 0.5 * spd, 40, "red", 75, 70, 1);
            break;
        case 29: // 800 grouped shields
            spawnWave(400, 100 * den, Math.floor(1 * hp), 4 * spd, 15, "pink", 2, 0, 5);
            break;
        case 30: // 850 matryoshka
            spawnWave(10, 5000 * den, Math.floor(3000 * hp), 2.5 * spd, 50, "green", 17, 0, 1);
            spawnWave(10, 5000 * den, Math.floor(3000 * hp), 2.5 * spd, 40, "green", 17, 0, 1);
            spawnWave(10, 5000 * den, Math.floor(3000 * hp), 2.5 * spd, 30, "green", 17, 0, 1);
            spawnWave(10, 5000 * den, Math.floor(3000 * hp), 2.5 * spd, 20, "green", 17, 0, 1);
            spawnWave(10, 5000 * den, Math.floor(3000 * hp), 2.5 * spd, 10, "green", 17, 0, 1);
            break;
        case 31: // 900+3000 doomboss
            var doomBoss = new Enemy(spawnPoint()[0], spawnPoint()[1], Math.floor(5000 * hp), 2.5 * spd, spawnDirection(), 45, "boss", 3000, 0, 150);
            enemies.push(doomBoss);
            spawnWave(300, 500, 500, 3, 20, "green", 20, 0, 0, doomBoss);
            break;
        case 32: // 1000 fast, armored, shielded
            spawnWave(5, 3000 * den, 5000 * hp, 3 * spd, 25, "red", 200, 50, 1);
            break;
        case 33: // 1100 shielded then that 1 fast one
            spawnWave(10, 1000 * den, 5000 * hp, 2 * spd, 35, "green", 100, 0, 50);
            spawnWave(1, 15000 * den, 5000 * hp, 12 * spd, 20, "yellow", 100, 0, 50);
            break;
        case 34: // 5000 cash in preparation
            spawnWave(10, 1000 * den, 100 * hp, 5 * spd, 25, "yellow", 500, 0, 0);
            break;
        case 35: // all bosses
            var doomBoss = new Enemy(spawnPoint()[0], spawnPoint()[1], Math.floor(10000 * hp), 3 * spd, spawnDirection(), 45, "boss", 5000, 50, 200);
            enemies.push(doomBoss);
            var fboss = new Enemy(spawnPoint()[0], spawnPoint()[1], Math.floor(5000 * hp), 0.5 * spd, spawnDirection(), 60, "boss", 5000, 3000, 0);
            enemies.push(fboss);
            spawnWave(10, 1500 * den, Math.floor(1000 * hp), 2 * spd, 35, "red", 10, 50, 10, fboss); //minions
            var boss = new Enemy(spawnPoint()[0], spawnPoint()[1], Math.floor(50000 * hp), 1 * spd, spawnDirection(), 60, "boss", 5000, 0, 0);
            enemies.push(boss);
            spawnWave(10, 150 * den, Math.floor(100 * hp), 3 * spd, 15, "pink", 2, 0, 1, boss); //minions
            break;
        default: // 0 money
            spawnWave(50, (200) * den, Math.floor((round * 100) * hp), (3.5 + round / 10) * spd, 35, "black", 0, 0, 1); //endless
            break;
    }
}
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
    if (event.key === "Escape") {
        towers.forEach(function (tower, index) {
            tower.selected = 0;
        });
        selectedTower = "none";
    }
});
//finds where to spawn the enemies
function spawnPoint() {
    var point = [];
    var x = 0;
    var y = 0;
    if (paths[0][0] == 0) { // left enterance
        x = -scaleW * 10;
        //@ts-ignore
        y = (canvas.height / 100) * paths[0][1] + scaleH * (75 / 2);
    }
    else if (paths[0][1] == 0) { // top enterance
        //@ts-ignore
        x = (canvas.width / 100) * paths[0][0] + scaleW * (75 / 2);
        y = -scaleH * 10;
    }
    else if (paths[0][1] == 100) { // bottom enterance
        //@ts-ignore
        x = (canvas.width / 100) * paths[0][0] + scaleW * (75 / 2);
        //@ts-ignore
        y = canvas.height + scaleH * 10;
    }
    else { //right enterance 
        //@ts-ignore
        x = canvas.width + scaleW * 100;
        //@ts-ignore
        y = (canvas.height / 100) * paths[0][1] + scaleH * (75 / 2);
    }
    point[0] = x;
    point[1] = y;
    return point;
}
//finds what direction enemies start with
function spawnDirection() {
    var direction = "E";
    if (paths[0][0] == 0) { // left enterance
        direction = "E";
    }
    else if (paths[0][1] == 0) { // top enterance
        direction = "S";
    }
    else if (paths[0][1] == 100) { // bottom enterance
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
    //@ts-ignore
    gameOverMenu.style.display = "flex";
}
function choosepath(i) {
    var paths = [[]];
    switch (i) {
        case 0:
            // basic path
            //@ts-ignore
            paths = [[0, 40], [20, 40], [20, 80], [40, 80], [40, 60], [55, 60], [55, 80], [70, 80], [70, 30], [30, 30], [30, 0]];
            break;
        case 1:
            // castle path
            //@ts-ignore
            paths = [[50, 100], [50, 75], [65, 75], [65, 90], [80, 90], [80, 30], [70, 30], [70, 10], [15, 10], [15, 30], [5, 30], [5, 90], [20, 90], [20, 75], [35, 75], [35, 100]];
            break;
        case 2:
            // corner path
            //@ts-ignore
            paths = [[0, 40], [20, 40], [20, 0]];
            break;
        case 3:
            // diamond path
            //@ts-ignore
            paths = [[0, 60], [20, 60]];
            var ypath = 60;
            var xpath = 20;
            for (var i = 0; i < 162; i++) {
                console.log(i + " " + xpath + " " + ypath);
                if (i < 40) { //fist quarter
                    if (i % 2 == 0) {
                        ypath++;
                        //@ts-ignore
                        paths.push([xpath, ypath]);
                    }
                    else {
                        xpath++;
                        //@ts-ignore
                        paths.push([xpath, ypath]);
                    }
                }
                else if (i < 80) {
                    if (i % 2 == 0) {
                        ypath--;
                        //@ts-ignore
                        paths.push([xpath, ypath]);
                    }
                    else {
                        xpath++;
                        //@ts-ignore
                        paths.push([xpath, ypath]);
                    }
                }
                else if (i == 80) { //middle section
                    //@ts-ignore
                    paths.push([60, 35]);
                    ypath = 35;
                }
                else if (i < 122) {
                    if (i % 2 == 0) {
                        ypath--;
                        //@ts-ignore
                        paths.push([xpath, ypath]);
                    }
                    else {
                        xpath--;
                        //@ts-ignore
                        paths.push([xpath, ypath]);
                    }
                }
                else {
                    if (i % 2 == 0) {
                        ypath++;
                        //@ts-ignore
                        paths.push([xpath, ypath]);
                    }
                    else {
                        xpath--;
                        //@ts-ignore
                        paths.push([xpath, ypath]);
                    }
                }
            }
            //@ts-ignore
            paths.push([0, 35]);
            break;
        case 4:
            //circle path
            //@ts-ignore
            paths = [[Math.cos((80 * Math.PI / 180)) * 40 + 40, 100], [Math.cos((80 * Math.PI / 180)) * 40 + 40, Math.sin(((80 - 1) * Math.PI / 180)) * 40 + 40]];
            for (var i = 80; i > -260; i--) {
                if (i % 2 == 0) {
                    //@ts-ignore
                    paths.push([Math.cos((i * Math.PI / 180)) * 40 + 40, Math.sin(((i - 1) * Math.PI / 180)) * 40 + 40]);
                    console.log(i + " " + Math.cos((i * Math.PI / 180)) * 40 + 40 + " " + Math.sin(((i - 1) * Math.PI / 180)) * 40 + 40);
                }
                else {
                    //@ts-ignore
                    paths.push([Math.cos(((i - 1) * Math.PI / 180)) * 40 + 40, Math.sin((i * Math.PI / 180)) * 40 + 40]);
                    console.log(i + " " + Math.cos(((i - 1) * Math.PI / 180)) * 40 + 40 + " " + Math.sin((i * Math.PI / 180)) * 40 + 40);
                }
            }
            //@ts-ignore
            paths.push([Math.cos(((-260) * Math.PI / 180)) * 40 + 40, 100]);
            break;
        case 5:
            //cross path
            //@ts-ignore
            paths = [[50, 0], [50, 81], [10, 81], [10, 50], [70, 50], [70, 19], [30, 19], [30, 100]];
    }
    return paths;
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
    //handles buffer tower when tower is placed
    for (var i = 0; i < towers.length; i++) { //non buffer
        var isbuffer = 0;
        for (var j = 0; j < towers.length; j++) { //buffer
            if (towers[i].type != "buffer" && towers[j].type == "buffer") {
                if (targetinellipse(towers[j].x, towers[j].y, towers[j].range, towers[i].x, towers[i].y, new Enemy(0, 0, 0, 0, "N", 0, "clear", 0, 0, 0)) == 1) {
                    isbuffer = 1;
                    if (towers[i].buffs < towers[j].buff) {
                        towers[i].buffs = towers[j].buff;
                        towers[i].update();
                    }
                }
            }
        }
        if (isbuffer == 0) {
            towers[i].buffs = 0;
            towers[i].update();
        }
    }
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
