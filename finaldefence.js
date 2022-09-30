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
skip waves option.
new tower ideas: area slow(big range vs small), cannon, some really strong but expensive tower, buffing tower.
max towers more expensive. round 6 easier
set round
higher level higher start round

minigun cheaper, mega damage sniper $800
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
//@ts-ignore
gameOverMenu.style.display = "none";
//enemy class
var Enemy = /** @class */ (function () {
    function Enemy(x, y, health, speed, direction, radius, color, enemymoney, armor) {
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
    }
    //draws the Enemy
    Enemy.prototype.draw = function () {
        var enemySrc = "./img/GreenRight.png";
        switch (this.color) {
            case "green":
                enemySrc = "./img/Green";
                break;
            case "yellow":
                enemySrc = "./img/Yellow";
                break;
            case "pink":
                enemySrc = "./img/Swamp";
                break;
            case "red":
                enemySrc = "./img/Red";
                break;
            case "black":
                enemySrc = "./img/Black";
                break;
            case "boss":
                if (this.armor > 0) {
                    enemySrc = "./img/ABoss";
                }
                else {
                    enemySrc = "./img/Boss";
                }
                break;
            default:
                console.log("invalid enemy color!");
                break;
        }
        switch (this.direction) {
            case "N":
                enemySrc += "Up.png";
                break;
            case "E":
                enemySrc += "Right.png";
                break;
            case "S":
                enemySrc += "Down.png";
                break;
            case "W":
                enemySrc += "Left.png";
                break;
        }
        var enemyImg = new Sprite({
            position: {
                x: this.x,
                y: this.y
            },
            imageSrc: enemySrc,
            scale: this.radius / 40
        });
        enemyImg.update();
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
        for (var i = 0; i < towers.length; i++) {
            if (towers[i].type == "ice" && towers[i].slow > slows) {
                if (targetinellipse(towers[i].x, towers[i].y, towers[i].range, this.x, this.y, this) == 1) {
                    slows = towers[i].slow;
                }
            }
        }
        console.log(slows);
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
        if (this.type == "sniper") {
            this.reload = 750;
            this.damage = 5;
            this.range = 250;
            this.target = "first";
        }
        else if (this.type == "machinegun") {
            this.reload = 120;
            this.damage = 1;
            this.range = 130;
            this.target = "first";
        }
        else if (this.type == "tesla") {
            this.maxcharge = 180;
            this.damage = 2;
            this.range = 170;
            this.ischarging = 1;
            this.target = "first";
            this.reload = 7;
            this.charge = 0;
            this.attackspd = 10;
            this.chargespd = 1;
            this.teslatargets = [];
        }
        else if (this.type == "laser") {
            this.reload = 10;
            this.range = 170;
            this.lasermin = 1;
            this.lasermax = 10;
            this.lasertime = 7;
            this.heatup = 0.5;
            this.target = "strong";
        }
        else if (this.type == "farm") {
            this.generated = 0;
            this.income = 50;
            this.range = 10000;
        }
        else if (this.type == "ice") {
            this.range = 120;
            this.slow = 20;
        }
        this.draw();
    }
    // draws the tower
    Tower.prototype.draw = function () {
        //base
        if (this.level > 5) {
            //@ts-ignore
            c.fillStyle = "#CCBA1F";
        }
        else {
            //@ts-ignore
            c.fillStyle = "black";
        }
        //@ts-ignore
        c.fillRect(this.x - scaleW * 50, this.y - scaleH * 50, scaleW * 100, scaleH * 100);
        //@ts-ignore
        c.fillStyle = "black";
        //@ts-ignore
        c.fillRect(this.x - scaleW * 45, this.y - scaleH * 45, scaleW * 90, scaleH * 90);
        //head
        if (this.type == "sniper") {
            //@ts-ignore
            c.fillStyle = "gray";
        }
        else if (this.type == "machinegun") {
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
        //@ts-ignore
        c.beginPath();
        if (this.type == "machinegun" && this.level == 6) {
            //@ts-ignore
            c.arc(this.x + 15 * Math.cos(this.direction - Math.PI / 2), this.y + 15 * Math.sin(this.direction - Math.PI / 2), scaleH * 15, 0, Math.PI * 2);
            //@ts-ignore
            c.arc(this.x - 15 * Math.cos(this.direction - Math.PI / 2), this.y - 15 * Math.sin(this.direction - Math.PI / 2), scaleH * 15, 0, Math.PI * 2);
        }
        else {
            //@ts-ignore
            c.arc(this.x, this.y, scaleH * 25, 0, Math.PI * 2);
        }
        //attempt at sniper turret
        // if(this.type == "sniper"){
        // drawLine(c, [this.x,this.y], [Math.cos(this.direction)*scaleW*20,Math.sin(this.direction)*scaleH*20], "", 20)
        // }
        //@ts-ignore
        c.fill();
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
            //@ts-ignore
            c.fillRect(this.x + scaleW * 25, this.y - scaleH * 45, scaleW * 20, scaleH * 10);
        }
        if (this.level >= 2) {
            //@ts-ignore
            c.fillRect(this.x + scaleW * 25, this.y - scaleH * 30, scaleW * 20, scaleH * 10);
        }
        if (this.level >= 3) {
            //@ts-ignore
            c.fillRect(this.x + scaleW * 25, this.y - scaleH * 15, scaleW * 20, scaleH * 10);
        }
        if (this.level >= 4) {
            //@ts-ignore
            c.fillRect(this.x + scaleW * 25, this.y, scaleW * 20, scaleH * 10);
        }
        if (this.level >= 5) {
            //@ts-ignore
            c.fillRect(this.x + scaleW * 25, this.y + scaleH * 15, scaleW * 20, scaleH * 10);
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
            c.fillRect(this.x - scaleW * 45, this.y + scaleH * 45, scaleW * 10, -scaleH * 90);
            //@ts-ignore
            c.fillStyle = "yellow";
            //@ts-ignore
            c.fillRect(this.x - scaleW * 45, this.y + scaleH * 45, scaleW * 10, -(this.charge / this.maxcharge) * scaleH * 90);
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
        if (this.type == "sniper") {
            if (this.level == 1) {
                this.reload = 750;
                this.damage = 5;
                this.range = 250;
            }
            else if (this.level == 2) {
                this.reload = 750;
                this.damage = 10;
                this.range = 300;
            }
            else if (this.level == 3) {
                this.reload = 750;
                this.damage = 20;
                this.range = 350;
            }
            else if (this.level == 4) {
                this.reload = 750;
                this.damage = 30;
                this.range = 400;
            }
            else if (this.level == 5) {
                this.reload = 750;
                this.damage = 40;
                this.range = 450;
            }
            else if (this.level == 6) {
                this.reload = 750;
                this.damage = 50;
                this.range = 500;
            }
            else if (this.level == 7) {
                this.reload = 1000;
                this.damage = 200;
                this.range = 500;
            }
        }
        else if (this.type == "machinegun") {
            if (this.level == 1) {
                this.reload = 120;
                this.damage = 1;
                this.range = 130;
            }
            else if (this.level == 2) {
                this.reload = 110;
                this.damage = 1.5;
                this.range = 140;
            }
            else if (this.level == 3) {
                this.reload = 100;
                this.damage = 2;
                this.range = 150;
            }
            else if (this.level == 4) {
                this.reload = 90;
                this.damage = 3;
                this.range = 160;
            }
            else if (this.level == 5) {
                this.reload = 80;
                this.damage = 4;
                this.range = 170;
            }
            else if (this.level == 6) {
                this.reload = 60;
                this.damage = 4;
                this.range = 180;
            }
            else if (this.level == 7) {
                this.reload = 60;
                this.damage = 10;
                this.range = 180;
            }
        }
        else if (this.type == "laser") {
            if (this.level == 1) {
                this.reload = 10;
                this.range = 170;
                this.lasermax = 10;
                this.lasermin = 1;
                this.lasertime = 7;
                this.heatup = 0.6;
            }
            else if (this.level == 2) {
                this.reload = 10;
                this.range = 180;
                this.lasermax = 15;
                this.lasermin = 1;
                this.lasertime = 7;
                this.heatup = 0.8;
            }
            else if (this.level == 3) {
                this.reload = 10;
                this.range = 190;
                this.lasermax = 20;
                this.lasermin = 1;
                this.lasertime = 7;
                this.heatup = 1;
            }
            else if (this.level == 4) {
                this.reload = 10;
                this.range = 200;
                this.lasermax = 30;
                this.lasermin = 1;
                this.lasertime = 7;
                this.heatup = 1.2;
            }
            else if (this.level == 5) {
                this.reload = 10;
                this.range = 210;
                this.lasermax = 40;
                this.lasermin = 1;
                this.lasertime = 7;
                this.heatup = 1.4;
            }
            else if (this.level == 6) {
                this.reload = 10;
                this.range = 220;
                this.lasermax = 10;
                this.lasermin = 10;
                this.lasertime = 7;
                this.heatup = 0;
            }
            else if (this.level == 7) {
                this.reload = 10;
                this.range = 210;
                this.lasermax = 50;
                this.lasermin = 5;
                this.lasertime = 5;
                this.heatup = 2;
            }
        }
        else if (this.type == "tesla") {
            if (this.level == 1) {
                this.maxcharge = 180;
                this.damage = 2;
                this.range = 170;
                this.ischarging = 1;
                this.reload = 7;
                this.charge = 0;
                this.attackspd = 10;
                this.chargespd = 1;
                this.teslatargets = [];
            }
            else if (this.level == 2) {
                this.maxcharge = 240;
                this.damage = 4;
                this.range = 180;
                this.ischarging = 1;
                this.reload = 7;
                this.charge = 0;
                this.attackspd = 9;
                this.chargespd = 24 / 18;
                this.teslatargets = [];
            }
            else if (this.level == 3) {
                this.maxcharge = 300;
                this.damage = 6;
                this.range = 190;
                this.ischarging = 1;
                this.reload = 7;
                this.charge = 0;
                this.attackspd = 8;
                this.chargespd = 30 / 18;
                this.teslatargets = [];
            }
            else if (this.level == 4) {
                this.maxcharge = 360;
                this.damage = 8;
                this.range = 200;
                this.ischarging = 1;
                this.reload = 7;
                this.charge = 0;
                this.attackspd = 7;
                this.chargespd = 36 / 18;
                this.teslatargets = [];
            }
            else if (this.level == 5) {
                this.maxcharge = 420;
                this.damage = 10;
                this.range = 210;
                this.ischarging = 1;
                this.reload = 7;
                this.charge = 0;
                this.attackspd = 6;
                this.chargespd = 42 / 18;
                this.teslatargets = [];
            }
            else if (this.level == 6) { //multi target
                this.maxcharge = 1500;
                this.damage = 5;
                this.range = 210;
                this.ischarging = 1;
                this.reload = 7;
                this.charge = 0;
                this.attackspd = 6;
                this.chargespd = 40 / 18;
                this.teslatargets = [];
            }
            else if (this.level == 7) { //no charge / ultimate tesla
                this.maxcharge = 420;
                this.damage = 10;
                this.range = 210;
                this.ischarging = 1;
                this.reload = 7;
                this.charge = this.maxcharge;
                this.attackspd = 5;
                this.chargespd = 42 / 18;
                this.teslatargets = [];
            }
        }
        else if (this.type == "farm") {
            if (this.level == 1) {
                this.income = 50;
            }
            else if (this.level == 2) {
                this.income = 120;
            }
            else if (this.level == 3) {
                this.income = 210;
            }
            else if (this.level == 4) {
                this.income = 320;
            }
            else if (this.level == 5) {
                this.income = 450;
            }
            else if (this.level == 6) {
                this.income = 600;
            }
            else if (this.level == 7) {
                this.income = 770;
            }
        }
        else if (this.type == "ice") {
            if (this.level == 1) {
                this.slow = 20;
            }
            else if (this.level == 2) {
                this.slow = 30;
            }
            else if (this.level == 3) {
                this.slow = 40;
            }
            else if (this.level == 4) {
                this.slow = 50;
            }
            else if (this.level == 5) {
                this.slow = 60;
            }
            else if (this.level == 6) {
                this.slow = 60;
                this.range = 200;
            }
            else if (this.level == 7) {
                this.slow = 80;
            }
        }
    };
    return Tower;
}());
//projectiles class 
var Projectile = /** @class */ (function () {
    function Projectile(x, y, damage, speed, size, color, target, maxlifespan, ap) {
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
    }
    Projectile.prototype.draw = function () {
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
var enemies = [];
var towers = [];
var shots = [];
var lasers = [];
var state = new GameState(9, 9, 9, []);
//creates the wave
function spawnWave(numenemies, density, health, speed, size, color, Emoney, armor, boss) {
    if (boss === void 0) { boss = new Enemy(0, 0, 0, 0, "E", 0, "black", 0, 0); }
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
            enemies.push(new Enemy(spawnPoint()[0], spawnPoint()[1], health, speedModifier * speed, spawnDirection(), size, color, Emoney, armor));
        }
        else { //spawn inside boss
            enemies.push(new Enemy(boss.x, boss.y, health, speedModifier * speed, boss.direction, size, color, Emoney, armor));
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
    // var fun = (((targetX-towerX)*(targetX-towerX))/((towerRange*scaleW)*(towerRange*scaleW)))+(((targetY-towerY)*(targetY-towerY))/((towerRange*scaleH)*(towerRange*scaleH)));
    var fun = Math.sqrt((targetX - towerX) * (targetX - towerX) + (targetY - towerY) * (targetY - towerY));
    if (fun <= target.radius + towerRange - 15) { //fun <= 1 for top function, fun <= target.radius+towerRange
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
    var laserdamage = tower.damage;
    var lastenemy;
    var firstenemy;
    var strongenemy;
    var weakenemy;
    var target;
    var newtarget;
    var lifespan;
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
                    break;
                case "last":
                    tower.direction = Math.atan((lastenemy.y - tower.y) / (lastenemy.x - tower.x));
                    break;
                case "strong":
                    tower.direction = Math.atan((strongenemy.y - tower.y) / (strongenemy.x - tower.x));
                    break;
                case "weak":
                    tower.direction = Math.atan((weakenemy.y - tower.y) / (weakenemy.x - tower.x));
                    break;
            }
        }
        if (tower.type == "sniper" && tower.level == 7) {
            size = 8;
        }
        else if (tower.type == "machinegun" && tower.level == 6) {
            size = 4;
        }
        else if (tower.type == "machinegun" && tower.level == 7) {
            size = 6;
        }
        else {
            size = 5;
        }
        if (tower.type == "sniper" || tower.type == "machinegun") { //shoot projectile
            if (inrange == 1) {
                //inputs
                var speed = 10;
                if (tower.type == "sniper") {
                    speed = 15;
                }
                var damage = tower.damage;
                if (tower.type == "machinegun" && tower.level == 2) {
                    //half of the time damage is 1 other half damage is 2
                    damage = Math.floor(Math.random() * 2) + 1;
                }
                if (tower.type == "sniper") {
                    lifespan = 35;
                }
                else {
                    lifespan = 18;
                }
                if (tower.type == "machinegun" && tower.level == 6) { // double shot
                    switch (tower.target) {
                        case "first": {
                            shots.push(new Projectile(tower.x + scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y + scaleH * 15 * Math.sin(tower.direction - Math.PI / 2), damage, speed, size, "red", firstenemy, lifespan, 0));
                            shots.push(new Projectile(tower.x - scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y - scaleH * 15 * Math.sin(tower.direction - Math.PI / 2), damage, speed, size, "red", firstenemy, lifespan, 0));
                            break;
                        }
                        case "last": {
                            shots.push(new Projectile(tower.x + scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y + scaleH * 15 * Math.sin(tower.direction - Math.PI / 2), damage, speed, size, "red", lastenemy, lifespan, 0));
                            shots.push(new Projectile(tower.x - scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y - scaleH * 15 * Math.sin(tower.direction - Math.PI / 2), damage, speed, size, "red", lastenemy, lifespan, 0));
                            break;
                        }
                        case "strong": {
                            shots.push(new Projectile(tower.x + scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y + scaleH * 15 * Math.sin(tower.direction - Math.PI / 2), damage, speed, size, "red", strongenemy, lifespan, 0));
                            shots.push(new Projectile(tower.x - scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y - scaleH * 15 * Math.sin(tower.direction - Math.PI / 2), damage, speed, size, "red", strongenemy, lifespan, 0));
                            break;
                        }
                        case "weak": {
                            shots.push(new Projectile(tower.x + scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y + scaleH * 15 * Math.sin(tower.direction - Math.PI / 2), damage, speed, size, "red", weakenemy, lifespan, 0));
                            shots.push(new Projectile(tower.x - scaleW * 15 * Math.cos(tower.direction - Math.PI / 2), tower.y - scaleH * 15 * Math.sin(tower.direction - Math.PI / 2), damage, speed, size, "red", weakenemy, lifespan, 0));
                            break;
                        }
                    }
                }
                else if (tower.type == "sniper" && tower.level == 6) { // armor piercing projectiles
                    switch (tower.target) {
                        case "first": {
                            //@ts-ignore
                            shots.push(new Projectile(tower.x, tower.y, damage, speed, size, "red", firstenemy, lifespan, 1));
                            break;
                        }
                        case "last": {
                            //@ts-ignore
                            shots.push(new Projectile(tower.x, tower.y, damage, speed, size, "red", lastenemy, lifespan, 1));
                            break;
                        }
                        case "strong": {
                            //@ts-ignore
                            shots.push(new Projectile(tower.x, tower.y, damage, speed, size, "red", strongenemy, lifespan, 1));
                            break;
                        }
                        case "weak": {
                            //@ts-ignore
                            shots.push(new Projectile(tower.x, tower.y, damage, speed, size, "red", weakenemy, lifespan, 1));
                            break;
                        }
                    }
                }
                else {
                    switch (tower.target) {
                        case "first": {
                            //@ts-ignore
                            shots.push(new Projectile(tower.x, tower.y, damage, speed, size, "red", firstenemy, lifespan, 0));
                            break;
                        }
                        case "last": {
                            //@ts-ignore
                            shots.push(new Projectile(tower.x, tower.y, damage, speed, size, "red", lastenemy, lifespan, 0));
                            break;
                        }
                        case "strong": {
                            //@ts-ignore
                            shots.push(new Projectile(tower.x, tower.y, damage, speed, size, "red", strongenemy, lifespan, 0));
                            break;
                        }
                        case "weak": {
                            //@ts-ignore
                            shots.push(new Projectile(tower.x, tower.y, damage, speed, size, "red", weakenemy, lifespan, 0));
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
                        laserdamage = tower.lasermin;
                        var size = tower.level;
                        if (tower.level == 7) {
                            size = 10;
                        }
                        lasers.push(new Laser(size, "red", target, tower));
                    }
                }
                //do damage here instead
                if (inrange == 1) {
                    if (lasercounter > tower.lasertime * 2) {
                        if (found == 1) { //heat up
                            if (laserdamage >= tower.lasermax) {
                                laserdamage = tower.lasermax;
                            }
                            else {
                                laserdamage = laserdamage + tower.heatup;
                            }
                        }
                        //ignores armor
                        if (target.health <= Math.floor(laserdamage)) {
                            target.health = 0;
                        }
                        else {
                            target.health -= Math.floor(laserdamage);
                        }
                        lasercounter = 0;
                    }
                    else {
                        lasercounter += speedModifier * 1;
                    }
                }
            }
            else {
                laserdamage = tower.lasermin;
                newtarget = 1;
            }
            if (tower.sold == 1 || gameIsOver == 1) {
                clearInterval(firefunction);
            }
        }
        else if (tower.type == "tesla") {
            //charging 
            if (tower.ischarging == 1 && tower.charge < tower.maxcharge) {
                tower.charge += speedModifier * tower.chargespd;
                //reset targets
                for (var i = tower.teslatargets.length - 1; i >= 0; i--) {
                    tower.teslatargets.splice(i, 1);
                }
            }
            else {
                tower.ischarging = 0;
                if (inrange == 1) {
                    var found = 0;
                    for (var i = 0; i < enemies.length; i++) {
                        if (targetinellipse(tower.x, tower.y, tower.range, enemies[i].x, enemies[i].y, enemies[i]) == 1 && enemies[i] == target) {
                            found = 1;
                            if (tower.level == 6) {
                                tower.teslatargets.push(target);
                            }
                        }
                    }
                    if (found == 0) {
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
                    }
                    if (inrange == 1) {
                        if (tower.level == 6) {
                            tower.teslatargets.push(target);
                        }
                        if (lasercounter < tower.attackspd) { //attack spd
                            lasercounter++;
                        }
                        else {
                            if (tower.level != 7) { //reduces charge
                                tower.charge -= 10;
                            }
                            if (tower.damage <= target.armor) { //low damage against armored
                                target.health -= 1;
                            }
                            else if (target.health + target.armor <= tower.damage) { //enough damage to kill
                                target.health = 0;
                            }
                            else { //deals damage
                                target.health -= tower.damage - target.armor;
                            }
                            lasers.push(new Laser(tower.level + 4, "yellow", target, tower));
                            lasercounter = 0;
                        }
                    }
                }
                else {
                    tower.ischarging = 1;
                }
            }
            if (tower.charge <= 0) {
                tower.ischarging = 1;
            }
            if (tower.sold == 1 || gameIsOver == 1) {
                clearInterval(firefunction);
            }
        }
    }, tower.reload / speedModifier);
}
function alreadyTargeted(tower, target) {
    if (tower.type == "sniper" || tower.type == "machinegun") {
        return 0;
    }
    for (var i = 0; i < lasers.length; i++) {
        if (lasers[i].tower == tower && lasers[i].target == target) {
            return 1;
        }
    }
    if (tower.type == "tesla" && tower.level == 6) { //multi target tesla
        for (var i = 0; i < tower.teslatargets.length; i++) {
            if (tower.teslatargets[i] == target) {
                return 1;
            }
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
            if (mouseover == "sniper" && selectedTower == "none" && totalmoney >= 100) {
                selectedTower = "sniper";
                draggingTower = 1;
            }
            else if (mouseover == "machinegun" && selectedTower == "none" && totalmoney >= 120) {
                selectedTower = "machinegun";
                draggingTower = 1;
            }
            else if (mouseover == "laser" && selectedTower == "none" && totalmoney >= 150) {
                selectedTower = "laser";
                draggingTower = 1;
            }
            else if (mouseover == "tesla" && selectedTower == "none" && totalmoney >= 150) {
                selectedTower = "tesla";
                draggingTower = 1;
            }
            else if (mouseover == "farm" && selectedTower == "none" && totalmoney >= 300) {
                selectedTower = "farm";
                draggingTower = 1;
            }
            else if (mouseover == "ice" && selectedTower == "none" && totalmoney >= 200) {
                selectedTower = "ice";
                draggingTower = 1;
            }
        }
        if (!mouseDown && draggingTower) {
            if (selectedTower == "sniper" && freespace() == 1) {
                selectedTower = "none";
                totalmoney -= 100;
                towers.push(new Tower(mouseX, mouseY, "sniper", 1, 0));
                towershoot(towers[towers.length - 1]);
            }
            else if (selectedTower == "machinegun" && freespace() == 1) {
                selectedTower = "none";
                totalmoney -= 120;
                towers.push(new Tower(mouseX, mouseY, "machinegun", 1, 0));
                towershoot(towers[towers.length - 1]);
            }
            else if (selectedTower == "laser" && freespace() == 1) {
                selectedTower = "none";
                totalmoney -= 150;
                towers.push(new Tower(mouseX, mouseY, "laser", 1, 0));
                towershoot(towers[towers.length - 1]);
            }
            else if (selectedTower == "tesla" && freespace() == 1) {
                selectedTower = "none";
                totalmoney -= 150;
                towers.push(new Tower(mouseX, mouseY, "tesla", 1, 0));
                towershoot(towers[towers.length - 1]);
            }
            else if (selectedTower == "farm" && freespace() == 1) {
                selectedTower = "none";
                totalmoney -= 300;
                towers.push(new Tower(mouseX, mouseY, "farm", 1, 0));
                towershoot(towers[towers.length - 1]);
            }
            else if (selectedTower == "ice" && freespace() == 1) {
                selectedTower = "none";
                totalmoney -= 200;
                towers.push(new Tower(mouseX, mouseY, "ice", 1, 0));
                towershoot(towers[towers.length - 1]);
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
            for (var i = 0; i < towers.length; i++) {
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
        //check for collisions
        shots.forEach(function (shot, index) {
            if (shot.x > enemy.x - enemy.radius - shot.size && shot.x < enemy.x + enemy.radius + shot.size && shot.y > enemy.y - enemy.radius - shot.size && shot.y < enemy.y + enemy.radius + shot.size) {
                if (shot.ap == 0) {
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
                else { //armor piercing
                    if (enemy.armor > 0) {
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
                shots.splice(index, 1);
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
                    var tempEnemy = new Enemy(0, 0, 1000, 0, "N", 0, "red", 0, 0);
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
                totalmoney += enemies[i].enemymoney;
                enemies.splice(index, 1);
                lives -= 1;
            }
        }
        else if (paths[paths.length - 1][1] == 0) { // top exit
            if (enemy.y <= -10) {
                totalmoney += enemies[i].enemymoney;
                enemies.splice(index, 1);
                lives -= 1;
            }
        }
        else if (paths[paths.length - 1][1] == 100) { // bottom exit
            //@ts-ignore
            if (enemy.y >= canvas.height + 10) {
                totalmoney += enemies[i].enemymoney;
                enemies.splice(index, 1);
                lives -= 1;
            }
        }
        else { //right exit 
            //@ts-ignore
            if (enemy.x >= canvas.width + 10) {
                totalmoney += enemies[i].enemymoney;
                enemies.splice(index, 1);
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
            lasers[i].update();
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
        mouseover = "sniper";
        //@ts-ignore
    }
    else if (mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * ((3 - 1) / 2) && mouseY < canvas.height / (numboxes / 2) * ((3 - 1) / 2) + canvas.height / (numboxes / 2)) {
        if (menutype == 0) {
            mouseover = "machinegun";
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
    else if (menutype == 0 && mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * ((5 - 1) / 2) && mouseY < canvas.height / (numboxes / 2) * ((5 - 1) / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "laser";
        //@ts-ignore
    }
    else if (menutype == 0 && mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * ((7 - 1) / 2) && mouseY < canvas.height / (numboxes / 2) * ((7 - 1) / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "tesla";
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
    if (mouseover == "sniper" && selectedTower == "none" && totalmoney >= 100) {
        selectedTower = "sniper";
    }
    else if (mouseover == "machinegun" && selectedTower == "none" && totalmoney >= 120) {
        selectedTower = "machinegun";
    }
    else if (mouseover == "laser" && selectedTower == "none" && totalmoney >= 150) {
        selectedTower = "laser";
    }
    else if (mouseover == "tesla" && selectedTower == "none" && totalmoney >= 150) {
        selectedTower = "tesla";
    }
    else if (mouseover == "farm" && selectedTower == "none" && totalmoney >= 300) {
        selectedTower = "farm";
    }
    else if (mouseover == "ice" && selectedTower == "none" && totalmoney >= 200) {
        selectedTower = "ice";
    }
    else if (selectedTower == "sniper" && freespace() == 1) {
        selectedTower = "none";
        totalmoney -= 100;
        towers.push(new Tower(mouseX, mouseY, "sniper", 1, 0));
        towershoot(towers[towers.length - 1]);
    }
    else if (selectedTower == "machinegun" && freespace() == 1) {
        selectedTower = "none";
        totalmoney -= 120;
        towers.push(new Tower(mouseX, mouseY, "machinegun", 1, 0));
        towershoot(towers[towers.length - 1]);
    }
    else if (selectedTower == "laser" && freespace() == 1) {
        selectedTower = "none";
        totalmoney -= 150;
        towers.push(new Tower(mouseX, mouseY, "laser", 1, 0));
        towershoot(towers[towers.length - 1]);
    }
    else if (selectedTower == "tesla" && freespace() == 1) {
        selectedTower = "none";
        totalmoney -= 150;
        towers.push(new Tower(mouseX, mouseY, "tesla", 1, 0));
        towershoot(towers[towers.length - 1]);
    }
    else if (selectedTower == "farm" && freespace() == 1) {
        selectedTower = "none";
        totalmoney -= 300;
        towers.push(new Tower(mouseX, mouseY, "farm", 1, 0));
        towershoot(towers[towers.length - 1]);
    }
    else if (selectedTower == "ice" && freespace() == 1) {
        selectedTower = "none";
        totalmoney -= 200;
        towers.push(new Tower(mouseX, mouseY, "ice", 1, 0));
        towershoot(towers[towers.length - 1]);
    }
    else if (mouseover == "upgrade" || mouseover == "level6" || mouseover == "level7") {
        for (var i = 0; i < towers.length; i++) {
            if (towers[i].selected == 1) {
                if (towers[i].type == "sniper" && totalmoney >= 110 && towers[i].level == 1) {
                    //upgrades tower
                    towers[i].level = 2;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 110;
                }
                else if (towers[i].type == "sniper" && totalmoney >= 150 && towers[i].level == 2) {
                    //upgrades tower
                    towers[i].level = 3;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 150;
                }
                else if (towers[i].type == "sniper" && totalmoney >= 200 && towers[i].level == 3) {
                    //upgrades tower
                    towers[i].level = 4;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 200;
                }
                else if (towers[i].type == "sniper" && totalmoney >= 250 && towers[i].level == 4) {
                    //upgrades tower
                    towers[i].level = 5;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 250;
                }
                else if (towers[i].type == "sniper" && totalmoney >= 400 && towers[i].level == 5 && mouseover == "level6") {
                    //upgrades tower
                    towers[i].level = 6;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 400;
                }
                else if (towers[i].type == "sniper" && totalmoney >= 600 && towers[i].level == 5 && mouseover == "level7") {
                    //upgrades tower
                    towers[i].level = 7;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 600;
                }
                else if (towers[i].type == "machinegun" && totalmoney >= 150 && towers[i].level == 1) {
                    //upgrades tower
                    towers[i].level = 2;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 150;
                }
                else if (towers[i].type == "machinegun" && totalmoney >= 200 && towers[i].level == 2) {
                    //upgrades tower
                    towers[i].level = 3;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 200;
                }
                else if (towers[i].type == "machinegun" && totalmoney >= 250 && towers[i].level == 3) {
                    //upgrades tower
                    towers[i].level = 4;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 250;
                }
                else if (towers[i].type == "machinegun" && totalmoney >= 300 && towers[i].level == 4) {
                    //upgrades tower
                    towers[i].level = 5;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 300;
                }
                else if (towers[i].type == "machinegun" && totalmoney >= 600 && towers[i].level == 5 && mouseover == "level6") {
                    //upgrades tower
                    towers[i].level = 6;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 600;
                }
                else if (towers[i].type == "machinegun" && totalmoney >= 600 && towers[i].level == 5 && mouseover == "level7") {
                    //upgrades tower
                    towers[i].level = 7;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 600;
                }
                else if (towers[i].type == "laser" && totalmoney >= 200 && towers[i].level == 1) {
                    //upgrades tower
                    towers[i].level = 2;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 200;
                }
                else if (towers[i].type == "laser" && totalmoney >= 250 && towers[i].level == 2) {
                    //upgrades tower
                    towers[i].level = 3;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 250;
                }
                else if (towers[i].type == "laser" && totalmoney >= 300 && towers[i].level == 3) {
                    //upgrades tower
                    towers[i].level = 4;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 300;
                }
                else if (towers[i].type == "laser" && totalmoney >= 350 && towers[i].level == 4) {
                    //upgrades tower
                    towers[i].level = 5;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 350;
                }
                else if (towers[i].type == "laser" && totalmoney >= 850 && towers[i].level == 5 && mouseover == "level6") {
                    //upgrades tower
                    towers.push(new Tower(towers[i].x, towers[i].y, towers[i].type, 6, 1));
                    towers[towers.length - 1].target = towers[i].target;
                    towers[towers.length - 1].update();
                    towers[i].sold = 1;
                    towers[i].selected = 0;
                    towers[i].draw();
                    towers.splice(i, 1);
                    totalmoney -= 850;
                    towershoot(towers[towers.length - 1]);
                    towershoot(towers[towers.length - 1]);
                    towershoot(towers[towers.length - 1]);
                    towershoot(towers[towers.length - 1]);
                    towershoot(towers[towers.length - 1]);
                }
                else if (towers[i].type == "laser" && totalmoney >= 900 && towers[i].level == 5 && mouseover == "level7") {
                    //upgrades tower
                    towers[i].level = 7;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 900;
                }
                else if (towers[i].type == "tesla" && totalmoney >= 200 && towers[i].level == 1) {
                    //upgrades tower
                    towers[i].level = 2;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 200;
                }
                else if (towers[i].type == "tesla" && totalmoney >= 250 && towers[i].level == 2) {
                    //upgrades tower
                    towers[i].level = 3;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 250;
                }
                else if (towers[i].type == "tesla" && totalmoney >= 300 && towers[i].level == 3) {
                    //upgrades tower
                    towers[i].level = 4;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 300;
                }
                else if (towers[i].type == "tesla" && totalmoney >= 350 && towers[i].level == 4) {
                    //upgrades tower
                    towers[i].level = 5;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 350;
                }
                else if (towers[i].type == "tesla" && totalmoney >= 800 && towers[i].level == 5 && mouseover == "level6") {
                    //upgrades tower
                    towers.push(new Tower(towers[i].x, towers[i].y, towers[i].type, 6, 1));
                    towers[towers.length - 1].target = towers[i].target;
                    towers[towers.length - 1].teslatargets = [];
                    towers[towers.length - 1].update();
                    towers[i].sold = 1;
                    towers[i].selected = 0;
                    towers[i].draw();
                    towers.splice(i, 1);
                    totalmoney -= 800;
                    towershoot(towers[towers.length - 1]);
                    towershoot(towers[towers.length - 1]);
                    towershoot(towers[towers.length - 1]);
                    towershoot(towers[towers.length - 1]);
                    towershoot(towers[towers.length - 1]);
                }
                else if (towers[i].type == "tesla" && totalmoney >= 900 && towers[i].level == 5 && mouseover == "level7") {
                    //upgrades tower
                    towers[i].level = 7;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 900;
                }
                else if (towers[i].type == "farm" && totalmoney >= 400 && towers[i].level == 1) {
                    //upgrades tower
                    towers[i].level = 2;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 400;
                }
                else if (towers[i].type == "farm" && totalmoney >= 500 && towers[i].level == 2) {
                    //upgrades tower
                    towers[i].level = 3;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 500;
                }
                else if (towers[i].type == "farm" && totalmoney >= 600 && towers[i].level == 3) {
                    //upgrades tower
                    towers[i].level = 4;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 600;
                }
                else if (towers[i].type == "farm" && totalmoney >= 700 && towers[i].level == 4) {
                    //upgrades tower
                    towers[i].level = 5;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 700;
                }
                else if (towers[i].type == "farm" && totalmoney >= 800 && towers[i].level == 5) {
                    //upgrades tower
                    towers[i].level = 6;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 800;
                }
                else if (towers[i].type == "farm" && totalmoney >= 900 && towers[i].level == 6) {
                    //upgrades tower
                    towers[i].level = 7;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 900;
                }
                else if (towers[i].type == "ice" && totalmoney >= 120 && towers[i].level == 1) {
                    //upgrades tower
                    towers[i].level = 2;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 120;
                }
                else if (towers[i].type == "ice" && totalmoney >= 150 && towers[i].level == 2) {
                    //upgrades tower
                    towers[i].level = 3;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 150;
                }
                else if (towers[i].type == "ice" && totalmoney >= 180 && towers[i].level == 3) {
                    //upgrades tower
                    towers[i].level = 4;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 180;
                }
                else if (towers[i].type == "ice" && totalmoney >= 220 && towers[i].level == 4) {
                    //upgrades tower
                    towers[i].level = 5;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 220;
                }
                else if (towers[i].type == "ice" && totalmoney >= 500 && towers[i].level == 5 && mouseover == "level6") {
                    //upgrades tower
                    towers[i].level = 6;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 500;
                }
                else if (towers[i].type == "ice" && totalmoney >= 600 && towers[i].level == 5 && mouseover == "level7") {
                    //upgrades tower
                    towers[i].level = 7;
                    towers[i].selected = 1;
                    towers[i].update();
                    totalmoney -= 600;
                }
            }
        }
    }
    else if (mouseover == "sell") { //sell button
        for (var i = towers.length - 1; i >= 0; i--) {
            if (towers[i].selected == 1) {
                if (towers[i].type == "sniper") {
                    switch (towers[i].level) {
                        case 1:
                            totalmoney += 70;
                            break;
                        case 2:
                            totalmoney += 140;
                            break;
                        case 3:
                            totalmoney += 240;
                            break;
                        case 4:
                            totalmoney += 380;
                            break;
                        case 5:
                            totalmoney += 540;
                            break;
                        case 6:
                            totalmoney += 810;
                            break;
                        case 7:
                            totalmoney += 940;
                            break;
                    }
                }
                else if (towers[i].type == "machinegun") {
                    switch (towers[i].level) {
                        case 1:
                            totalmoney += 80;
                            break;
                        case 2:
                            totalmoney += 180;
                            break;
                        case 3:
                            totalmoney += 320;
                            break;
                        case 4:
                            totalmoney += 480;
                            break;
                        case 5:
                            totalmoney += 680;
                            break;
                        case 6:
                            totalmoney += 1080;
                            break;
                        case 7:
                            totalmoney += 1080;
                            break;
                    }
                }
                else if (towers[i].type == "laser") {
                    switch (towers[i].level) {
                        case 1:
                            totalmoney += 100;
                            break;
                        case 2:
                            totalmoney += 240;
                            break;
                        case 3:
                            totalmoney += 400;
                            break;
                        case 4:
                            totalmoney += 600;
                            break;
                        case 5:
                            totalmoney += 840;
                            break;
                        case 6:
                            totalmoney += 1400;
                            break;
                        case 7:
                            totalmoney += 1440;
                            break;
                    }
                }
                else if (towers[i].type == "tesla") {
                    switch (towers[i].level) {
                        case 1:
                            totalmoney += 100;
                            break;
                        case 2:
                            totalmoney += 240;
                            break;
                        case 3:
                            totalmoney += 400;
                            break;
                        case 4:
                            totalmoney += 600;
                            break;
                        case 5:
                            totalmoney += 840;
                            break;
                        case 6:
                            totalmoney += 1370;
                            break;
                        case 7:
                            totalmoney += 1440;
                            break;
                    }
                }
                else if (towers[i].type == "farm") {
                    switch (towers[i].level) {
                        case 1:
                            totalmoney += 200;
                            break;
                        case 2:
                            totalmoney += 470;
                            break;
                        case 3:
                            totalmoney += 800;
                            break;
                        case 4:
                            totalmoney += 1200;
                            break;
                        case 5:
                            totalmoney += 1670;
                            break;
                        case 6:
                            totalmoney += 2200;
                            break;
                        case 7:
                            totalmoney += 2800;
                            break;
                    }
                }
                else if (towers[i].type == "ice") {
                    switch (towers[i].level) {
                        case 1:
                            totalmoney += 140;
                            break;
                        case 2:
                            totalmoney += 220;
                            break;
                        case 3:
                            totalmoney += 320;
                            break;
                        case 4:
                            totalmoney += 440;
                            break;
                        case 5:
                            totalmoney += 580;
                            break;
                        case 6:
                            totalmoney += 920;
                            break;
                        case 7:
                            totalmoney += 980;
                            break;
                    }
                }
                //remove tower and projectiles 
                towers[i].sold = 1;
                //remove range
                towers[i].selected = 0;
                towers[i].draw();
                towers.splice(i, 1);
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
            if (mouseX > towers[i].x - 50 && mouseX < towers[i].x + 50 && mouseY > towers[i].y - 50 && mouseY < towers[i].y + 50) {
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
            enemies.push(new Enemy(enemies[i].x, enemies[i].y, enemies[i].health, newspd, enemies[i].direction, enemies[i].radius, enemies[i].color, enemies[i].enemymoney, enemies[i].armor));
            enemies.splice(i, 1);
        }
        for (var i = lasers.length - 1; i >= 0; i--) { //remove lasers
            lasers.splice(i, 1);
        }
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
        if (mouseX > towers[i].x - scaleW * 100 && mouseX < towers[i].x + scaleW * 100 && mouseY > towers[i].y - scaleH * 100 && mouseY < towers[i].y + scaleH * 100) {
            return 0;
        }
    }
    //check paths
    for (var i = 0; i < paths.length - 1; i++) {
        if (paths[i][0] == paths[i + 1][0] && paths[i][1] > paths[i + 1][1]) { // up 
            //@ts-ignore
            if (mouseX > (canvas.width / 100) * paths[i][0] - scaleW * 50 && mouseX < (canvas.width / 100) * paths[i][0] + scaleW * 125 && mouseY > (canvas.height / 100) * paths[i + 1][1] - scaleH * 50 && mouseY < (canvas.height / 100) * paths[i + 1][1] + (canvas.height / 100) * (paths[i][1] - paths[i + 1][1]) + scaleH * 125) {
                return 0;
            }
        }
        else if (paths[i][0] == paths[i + 1][0] && paths[i][1] < paths[i + 1][1]) { // down
            //@ts-ignore
            if (mouseX > (canvas.width / 100) * paths[i][0] - scaleW * 50 && mouseX < (canvas.width / 100) * paths[i][0] + scaleW * 125 && mouseY > (canvas.height / 100) * paths[i][1] - scaleH * 50 && mouseY < (canvas.height / 100) * paths[i][1] + (canvas.height / 100) * (paths[i + 1][1] - paths[i][1]) + scaleH * 125) {
                return 0;
            }
        }
        else if (paths[i][1] == paths[i + 1][1] && paths[i][0] > paths[i + 1][0]) { // left
            //@ts-ignore
            if (mouseX > (canvas.width / 100) * paths[i + 1][0] - scaleW * 50 && mouseX < (canvas.width / 100) * paths[i + 1][0] + (canvas.width / 100) * (paths[i][0] - paths[i + 1][0]) + scaleW * 75 && mouseY > (canvas.height / 100) * paths[i][1] - scaleH * 50 && mouseY < (canvas.height / 100) * paths[i][1] + scaleH * 125) {
                return 0;
            }
        }
        else if (paths[i][1] == paths[i + 1][1] && paths[i][0] < paths[i + 1][0]) { // right
            //@ts-ignore
            if (mouseX > (canvas.width / 100) * paths[i][0] - scaleW * 50 && mouseX < (canvas.width / 100) * paths[i][0] + (canvas.width / 100) * (paths[i + 1][0] - paths[i][0]) + scaleW * 75 && mouseY > (canvas.height / 100) * paths[i][1] - scaleH * 50 && mouseY < (canvas.height / 100) * paths[i][1] + scaleH * 125) {
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
            den = 1.5;
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
            hp = 1.3;
            den = 0.7;
            spd = 1.3;
            break;
    }
    //rounds    
    switch (round) {
        case 1: //money 100
            spawnWave(10, 1700 * den, Math.floor(15 * hp), 3 * spd, 35, "green", 10, 0); //basic 
            break;
        case 2: //money 110
            spawnWave(11, 1500 * den, Math.floor(25 * hp), 3 * spd, 35, "green", 10, 0); //basic
            break;
        case 3: //money 120
            spawnWave(12, 1300 * den, Math.floor(40 * hp), 3 * spd, 35, "green", 10, 0); //basic
            break;
        case 4: //money 130
            spawnWave(13, 1500 * den, Math.floor(25 * hp), 6 * spd, 30, "yellow", 10, 0); //fast
            break;
        case 5: //money 140
            spawnWave(40, 75, 2, 3 * spd, 30, "pink", 3.5, 0); //grouped
            break;
        case 6: //money 150
            spawnWave(20, 1100 * den, Math.floor(65 * hp), 3 * spd, 35, "green", 7.5, 0); //basic
            break;
        case 7: //money 300
            spawnWave(2, 6000 * den, Math.floor(200 * hp), 3, 50, "red", 150, 3); //boss / armored
            break;
        case 8: //money 170
            spawnWave(15, 1500 * den, Math.floor(20 * hp), 6 * spd, 30, "yellow", 6, 0); //fast + 
            spawnWave(50, 100, 4, 3 * spd, 30, "pink", 1.6, 0); //grouped
            break;
        case 9: //money 180
            spawnWave(10, 1700 * den, Math.floor(60 * hp), 3 * spd, 40, "red", 18, 6); //armored 
            break;
        case 10: //money 190
            spawnWave(190, 100, Math.floor(5 * hp), 3 * spd, 30, "pink", 1, 0); //mega grouped
            break;
        case 11: //money 200
            spawnWave(10, 2000 * den, Math.floor(15 * hp), 2.5 * spd, 40, "red", 5, 5); //armored + 
            spawnWave(20, 1000 * den, Math.floor(20 * hp), 6 * spd, 30, "yellow", 2.5, 0); //fast +
            spawnWave(20, 1000 * den, Math.floor(20 * hp), 3 * spd, 35, "green", 2.5, 0); //basic + 
            spawnWave(100, 300, Math.floor(5 * hp), 2 * spd, 30, "pink", 0.5, 0); //grouped
            break;
        case 12: //money 220
            spawnWave(20, 1000 * den, Math.floor(50 * hp), 6 * spd, 40, "red", 11, 10); //fast / armored
            break;
        case 13: //money 240
            spawnWave(160, 0, 1, 3 * spd, 30, "pink", 1.5, 0); //clump
            break;
        case 14: // money 260
            spawnWave(25, 800 * den, Math.floor(50 * hp), 2 * spd, 40, "red", 10.4, 5); //armored / multiple
            break;
        case 15: // money 280 + 1200
            var boss = new Enemy(spawnPoint()[0], spawnPoint()[1], Math.floor(10000 * hp), 0.4 * spd, spawnDirection(), 30, "boss", 1200, 0);
            enemies.push(boss);
            spawnWave(10, 500 * den, Math.floor(5 * hp), 3 * spd, 25, "pink", 2, 0, boss); //minions
            break;
        case 16: //fast 300
            spawnWave(50, 400 * den, Math.floor(100 * hp), 8 * spd, 30, "yellow", 8, 0);
            break;
        case 17: //grouped 320
            spawnWave(160, 100 * den, Math.floor(30 * hp), 3 * spd, 30, "pink", 2, 0);
            break;
        case 18: //tanks 340
            spawnWave(8, 8000 * den, Math.floor(5000 * hp), 1 * spd, 60, "green", 42.5, 0);
            break;
        case 19: // armored 360
            spawnWave(20, 1500 * den, Math.floor(250 * hp), 1.5 * spd, 40, "red", 18, 20);
            break;
        case 20: // fast, grouped, armored, tanks 380
            spawnWave(10, 250 * den, Math.floor(100 * hp), 4 * spd, 40, "red", 38, 10);
            break;
        case 21: // fast armored on grouped 400
            spawnWave(50, 300 * den, Math.floor(150 * hp), 2 * spd, 30, "pink", 4, 0);
            spawnWave(25, 600 * den, Math.floor(50 * hp), 4 * spd, 40, "red", 8, 10);
            break;
        case 22: // stacks 450
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(20, 1400 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            spawnWave(10, 2800 * den, Math.floor(25 * hp), 3 * spd, 30, "pink", 1, 0);
            break;
        case 23: // super armored 500
            spawnWave(10, 7000 * den, Math.floor(2000 * hp), 1 * spd, 40, "red", 50, 30);
            break;
        case 24: // everything again 450
            spawnWave(25, 1900 * den, Math.floor(40 * hp), 2.5 * spd, 40, "red", 2, 5); //armored + 
            spawnWave(30, 1500 * den, Math.floor(100 * hp), 6 * spd, 30, "yellow", 2, 0); //fast + 
            spawnWave(15, 1500 * den, Math.floor(400 * hp), 2.8 * spd, 35, "green", 6, 0); //basic +
            spawnWave(250, 170 * den, Math.floor(30 * hp), 2 * spd, 30, "pink", 1, 0); //grouped
            break;
        case 25: // armored boss 500+2000
            var fboss = new Enemy(spawnPoint()[0], spawnPoint()[1], Math.floor(20000 * hp), 0.3 * spd, spawnDirection(), 33, "boss", 2000, 50);
            enemies.push(fboss);
            spawnWave(10, 5000 * den, Math.floor(500 * hp), 1.5 * spd, 40, "red", 10, 10, fboss); //minions
            break;
        case 26: // 550 grouping light armored
            spawnWave(100, 100 * den, Math.floor(25 * hp), 3 * spd, 40, "red", 5.5, 1);
            break;
        case 27: // 600 super speed
            spawnWave(30, 1000 * den, Math.floor(150 * hp), 12 * spd, 35, "yellow", 20, 0);
            break;
        case 28: // 650 max armored
            spawnWave(10, 10000 * den, Math.floor(5000 * hp), 0.5 * spd, 55, "red", 65, 75);
            break;
        case 29: // 700 mega grouped 2
            spawnWave(350, 100 * den, Math.floor(70 * hp), 4 * spd, 30, "pink", 2, 0);
            break;
        case 30: // 750 matryoshka
            spawnWave(10, 5000 * den, Math.floor(1500 * hp), 2.5 * spd, 50, "green", 40, 0);
            spawnWave(10, 5000 * den, Math.floor(1000 * hp), 2.5 * spd, 40, "green", 40, 0);
            spawnWave(10, 5000 * den, Math.floor(900 * hp), 2.5 * spd, 30, "green", 40, 0);
            spawnWave(10, 5000 * den, Math.floor(700 * hp), 2.5 * spd, 20, "green", 40, 0);
            spawnWave(10, 5000 * den, Math.floor(500 * hp), 2.5 * spd, 10, "green", 40, 0);
            break;
        case 31: // 800+3000 doomboss
            var doomBoss = new Enemy(spawnPoint()[0], spawnPoint()[1], Math.floor(5000 * hp), 2 * spd, spawnDirection(), 25, "boss", 3000, 0);
            enemies.push(doomBoss);
            spawnWave(300, 500, 500, 3, 25, "green", 20, 0, doomBoss);
            break;
        // case 32: // 850
        //     spawnWave(10, 7000, 1500, 0.5, 25, "green", 40, 30);
        //     break;
        // case 33: // 900
        //     spawnWave(10, 7000, 1500, 0.5, 25, "green", 40, 30);
        //     break;
        // case 33: // 950
        //     spawnWave(10, 7000, 1500, 0.5, 25, "green", 40, 30);
        //     break;
        // case 33: // 1000
        //     spawnWave(10, 7000, 1500, 0.5, 25, "green", 40, 30);
        //     break;
        default:
            spawnWave(25, (750 - round * 10) * den, Math.floor((round * 20 - 150) * hp), (3.5 + round / 20) * spd, 35, "black", 10, 0); //endless
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
            paths = [[50, 0], [50, 80], [10, 80], [10, 50], [70, 50], [70, 20], [30, 20], [30, 100]];
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
