"use strict";
// exports.__esModule = true;
var canvas = document.querySelector("canvas");
//@ts-ignore
var c = canvas.getContext("2d");
//images
var bossEnemy = new Image();
bossEnemy.src = "./img/basic.png";
var backgroundImage = new Image();
backgroundImage.src = "./img/stillbackground.png";
//html buttons
var startGameButton = document.querySelector('#startGameBtn');
var mainMenu = document.querySelector('#mainMen');
var basicMap = document.querySelector('#mapBasic');
var castleMap = document.querySelector('#mapCastle');
var diamondMap = document.querySelector('#mapDiamond');
var circleMap = document.querySelector('#mapCircle');
var cornerMap = document.querySelector('#mapCorner');
var easyDifficulty = document.querySelector('#difficultyEasy');
var mediumDifficulty = document.querySelector('#difficultyMedium');
var hardDifficulty = document.querySelector('#difficultyHard');
var impossibleDifficulty = document.querySelector('#difficultyImpossible');
var gameOverMenu = document.querySelector('#gameOver');
var menuButton = document.querySelector('#menu');
var restartButton = document.querySelector('#startOver');
var retryButton = document.querySelector('#retry');
// const background = document.querySelector('#myVideo');
// to do 
/*
add tower paths. sniper: armor piercing, high damage but slow. minigun: double shot, more damage. laser: multi target, super beem. tesla: multitarget, always charging.
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
var paths = choosepath(0); // 0=basic 1=castle 2=corner 3=diamond 4=circle
var money = 500;
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
//@ts-ignore
gameOverMenu.style.display = "none";
//enemy class
var Enemy = /** @class */ (function () {
    function Enemy(x, y, health, speed, direction, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.health = health;
        this.speed = speed;
        this.direction = direction;
        this.distance = 0;
    }
    //draws the Enemy
    Enemy.prototype.draw = function () {
        if (this.color == "boss") {
            //@ts-ignore
            c.drawImage(bossEnemy, 222, 111, 1117, 525, this.x - scaleW * (this.radius / 2), this.y - scaleH * (this.radius / 2), scaleW * this.radius, scaleH * this.radius); //entire enemy
            // c.drawImage(bossEnemy,527,194,418,392,this.x-this.radius, this.y-this.radius, this.radius*2, this.radius*2);//face 
        }
        else {
            //@ts-ignore
            c.lineWidth = 1;
            //@ts-ignore
            c.beginPath();
            //@ts-ignore
            c.arc(this.x, this.y, scaleH * this.radius, 0, Math.PI * 2);
            //@ts-ignore
            c.fillStyle = this.color;
            //@ts-ignore
            c.fill();
        }
        //health bar
        //@ts-ignore
        c.fillStyle = "white";
        //@ts-ignore
        c.textAlign = "center";
        //@ts-ignore
        c.font = "30px serif";
        var healthbar = this.health + "";
        //@ts-ignore
        c.fillText(healthbar, this.x, this.y - this.radius - 10);
        //@ts-ignore
        c.stroke();
    };
    //moves the Enemy with speed
    Enemy.prototype.update = function () {
        if (this.direction == "N") {
            this.y -= scaleH * this.speed;
            this.distance += scaleH * this.speed;
        }
        else if (this.direction == "E") {
            this.x += scaleW * this.speed;
            this.distance += scaleW * this.speed;
        }
        else if (this.direction == "S") {
            this.y += scaleH * this.speed;
            this.distance += scaleH * this.speed;
        }
        else if (this.direction == "W") {
            this.x -= scaleW * this.speed;
            this.distance += scaleW * this.speed;
        }
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
        if (this.type == "sniper") {
            this.reload = 700;
            this.damage = 5;
            this.range = 250;
            this.target = "first";
        }
        else if (this.type == "machinegun") {
            this.reload = 100;
            this.damage = 1;
            this.range = 110;
            this.target = "first";
        }
        else if (this.type == "tesla") {
            this.maxcharge = 180;
            this.damage = 2;
            this.range = 170;
            this.ischarging = 1;
            this.target = "first";
            this.reload = 10;
            this.charge = 0;
            this.attackspd = 10;
            this.chargespd = 1;
        }
        else if (this.type == "laser") {
            this.reload = 10;
            this.range = 150;
            this.lasermin = 0.5;
            this.lasermax = 10;
            this.lasertime = 8;
            this.target = "strong";
        }
        else {
            console.log("invalid tower type");
            console.log(this.type);
        }
        this.draw();
    }
    // draws the tower
    Tower.prototype.draw = function () {
        //base
        //@ts-ignore
        c.fillStyle = "black";
        //@ts-ignore
        c.fillRect(this.x - scaleW * 50, this.y - scaleH * 50, scaleW * 100, scaleH * 100);
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
            c.fillStyle = "green";
        }
        //@ts-ignore
        c.beginPath();
        //@ts-ignore
        c.arc(this.x, this.y, scaleH * 20, 0, Math.PI * 2);
        //@ts-ignore
        c.fill();
        //level
        if (this.level >= 1) {
            //@ts-ignore
            c.fillStyle = "yellow";
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
    };
    //updates level
    Tower.prototype.update = function () {
        if (this.type == "sniper") {
            if (this.level == 1) {
                this.reload = 700;
                this.damage = 5;
                this.range = 250;
            }
            else if (this.level == 2) {
                this.reload = 750;
                this.damage = 10;
                this.range = 300;
            }
            else if (this.level == 3) {
                this.reload = 800;
                this.damage = 20;
                this.range = 350;
            }
            else if (this.level == 4) {
                this.reload = 850;
                this.damage = 35;
                this.range = 400;
            }
            else if (this.level == 5) {
                this.reload = 900;
                this.damage = 50;
                this.range = 450;
            }
        }
        else if (this.type == "machinegun") {
            if (this.level == 1) {
                this.reload = 100;
                this.damage = 1;
                this.range = 110;
            }
            else if (this.level == 2) {
                this.reload = 75;
                this.damage = 1.5;
                this.range = 120;
            }
            else if (this.level == 3) {
                this.reload = 50;
                this.damage = 2;
                this.range = 130;
            }
            else if (this.level == 4) {
                this.reload = 40;
                this.damage = 3;
                this.range = 140;
            }
            else if (this.level == 5) {
                this.reload = 30;
                this.damage = 4;
                this.range = 150;
            }
        }
        else if (this.type == "laser") {
            if (this.level == 1) {
                this.reload = 10;
                this.range = 150;
                this.lasermax = 10;
                this.lasermin = 1;
                this.lasertime = 8;
            }
            else if (this.level == 2) {
                this.reload = 10;
                this.range = 160;
                this.lasermax = 15;
                this.lasermin = 1;
                this.lasertime = 7;
            }
            else if (this.level == 3) {
                this.reload = 10;
                this.range = 170;
                this.lasermax = 20;
                this.lasermin = 2;
                this.lasertime = 6;
            }
            else if (this.level == 4) {
                this.reload = 10;
                this.range = 180;
                this.lasermax = 30;
                this.lasermin = 2;
                this.lasertime = 5;
            }
            else if (this.level == 5) {
                this.reload = 10;
                this.range = 190;
                this.lasermax = 40;
                this.lasermin = 3;
                this.lasertime = 4;
            }
        }
        else if (this.type == "tesla") {
            if (this.level == 1) {
                this.maxcharge = 180;
                this.damage = 2;
                this.range = 170;
                this.ischarging = 1;
                this.reload = 10;
                this.charge = 0;
                this.attackspd = 10;
                this.chargespd = 1;
            }
            else if (this.level == 2) {
                this.maxcharge = 240;
                this.damage = 4;
                this.range = 180;
                this.ischarging = 1;
                this.reload = 10;
                this.charge = 0;
                this.attackspd = 9;
                this.chargespd = 24 / 18;
            }
            else if (this.level == 3) {
                this.maxcharge = 300;
                this.damage = 6;
                this.range = 190;
                this.ischarging = 1;
                this.reload = 10;
                this.charge = 0;
                this.attackspd = 8;
                this.chargespd = 30 / 18;
            }
            else if (this.level == 4) {
                this.maxcharge = 360;
                this.damage = 8;
                this.range = 200;
                this.ischarging = 1;
                this.reload = 10;
                this.charge = 0;
                this.attackspd = 7;
                this.chargespd = 36 / 18;
            }
            else if (this.level == 5) {
                this.maxcharge = 420;
                this.damage = 10;
                this.range = 210;
                this.ischarging = 1;
                this.reload = 10;
                this.charge = 0;
                this.attackspd = 6;
                this.chargespd = 42 / 18;
            }
        }
    };
    return Tower;
}());
//projectiles class 
var Projectile = /** @class */ (function () {
    function Projectile(x, y, damage, speed, size, color, target) {
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.speed = speed;
        this.size = size;
        this.color = color;
        this.target = target;
        this.lifespan = 0;
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
            this.x = this.x - scaleW * (this.speed * Math.cos(angle));
        }
        else {
            this.x = this.x + scaleW * (this.speed * Math.cos(angle));
        }
        if (this.y > this.target.y) {
            this.y = this.y - scaleH * (this.speed * Math.sin(angle));
        }
        else {
            this.y = this.y + scaleH * (this.speed * Math.sin(angle));
        }
        this.lifespan++;
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
    function GameState(lives, money, round, towers) {
        this.lives = lives;
        this.money = money;
        this.round = round;
        this.towers = towers.map(function (x) { return x; });
    }
    GameState.prototype.update = function (lives, money, round, towers) {
        this.lives = lives;
        this.money = money;
        this.round = round;
        this.towers = towers.map(function (x) { return x; });
    };
    return GameState;
}());
//creates the array of enemies
var enemies = [];
var towers = [];
var shots = [];
var lasers = [];
var state = new GameState(9, 9, 9, []);
//creates a new enemy every 2 seconds
function spawnWave(numenemies, density, health, speed, size, color, boss) {
    if (boss === void 0) { boss = new Enemy(0, 0, 0, 0, "E", 0, "black"); }
    var current = 0;
    var bossRound = 0;
    if (boss.x != 0 || boss.y != 0) { //boss round
        bossRound = 1;
    }
    var enemiesfunction = setInterval(function () {
        if (gameIsOver == 1) {
            clearInterval(enemiesfunction);
        }
        //spawn at enterance 
        if (bossRound == 0) { //default
            enemies.push(new Enemy(spawnPoint()[0], spawnPoint()[1], health, speed, spawnDirection(), size, color));
        }
        else { //spawn inside boss
            enemies.push(new Enemy(boss.x, boss.y, health, speed, boss.direction, size, color));
            enemies[enemies.length - 1].distance = boss.distance;
        }
        current++;
        if (current >= numenemies && bossRound == 0) {
            waveStart = 0;
            clearInterval(enemiesfunction);
        }
        //check when to stop spawning
        if (bossRound == 1) {
            for (var i = 0; i < enemies.length; i++) {
                if (enemies[i] != boss) {
                    bossRound = 0; //boss not found yet
                }
                else {
                    bossRound = 1; //still a boss
                    break;
                }
            }
            if (bossRound == 0) { //boss is dead
                waveStart = 0;
                clearInterval(enemiesfunction);
            }
        }
    }, density);
}
function targetinellipse(towerX, towerY, towerRange, targetX, targetY) {
    var fun = (((targetX - towerX) * (targetX - towerX)) / ((towerRange * scaleW) * (towerRange * scaleW))) + (((targetY - towerY) * (targetY - towerY)) / ((towerRange * scaleH) * (towerRange * scaleH)));
    if (fun <= 1) {
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
    var firefunction = setInterval(function () {
        var inrange = 0;
        for (var i = 0; i < enemies.length; i++) { //find fist and last enemies in range
            var Xdist = Math.abs(enemies[i].x - tower.x);
            var Ydist = Math.abs(enemies[i].y - tower.y);
            var distance = Math.sqrt((Xdist * Xdist) + (Ydist * Ydist));
            if (targetinellipse(tower.x, tower.y, tower.range, enemies[i].x, enemies[i].y) == 1 && inrange == 0) {
                lastenemy = enemies[i];
                firstenemy = enemies[i];
                strongenemy = enemies[i];
                weakenemy = enemies[i];
                inrange = 1;
            }
            else if (targetinellipse(tower.x, tower.y, tower.range, enemies[i].x, enemies[i].y) == 1) {
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
                switch (tower.target) {
                    case "first": {
                        shots.push(new Projectile(tower.x, tower.y, damage, speed, 5, "red", firstenemy));
                        break;
                    }
                    case "last": {
                        shots.push(new Projectile(tower.x, tower.y, damage, speed, 5, "red", lastenemy));
                        break;
                    }
                    case "strong": {
                        shots.push(new Projectile(tower.x, tower.y, damage, speed, 5, "red", strongenemy));
                        break;
                    }
                    case "weak": {
                        shots.push(new Projectile(tower.x, tower.y, damage, speed, 5, "red", weakenemy));
                        break;
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
                    var Xdist = Math.abs(enemies[i].x - tower.x);
                    var Ydist = Math.abs(enemies[i].y - tower.y);
                    var distance = Math.sqrt((Xdist * Xdist) + (Ydist * Ydist));
                    if (targetinellipse(tower.x, tower.y, tower.range, enemies[i].x, enemies[i].y) == 1 && enemies[i] == target) {
                        found = 1;
                    }
                }
                if (found == 0 || newtarget == 1) {
                    newtarget = 0;
                    switch (tower.target) {
                        case "first": {
                            target = firstenemy;
                            break;
                        }
                        case "last": {
                            target = lastenemy;
                            break;
                        }
                        case "strong": {
                            target = strongenemy;
                            break;
                        }
                        case "weak": {
                            target = weakenemy;
                            break;
                        }
                    }
                    laserdamage = tower.lasermin;
                    lasers.push(new Laser(tower.level, "red", target, tower));
                }
                //do damage here instead
                if (lasercounter > tower.lasertime * 2) {
                    if (found == 1) { //heat up
                        if (laserdamage >= tower.lasermax) {
                            laserdamage = tower.lasermax;
                        }
                        else {
                            laserdamage = laserdamage + 0.5;
                        }
                    }
                    if (target.color == "red") {
                        if (laserdamage <= 6) {
                            target.health -= 1; //mid damage deals 1
                        }
                        else {
                            target.health -= Math.floor(laserdamage / 2); //high damage deals half
                        }
                    }
                    else {
                        target.health -= Math.floor(laserdamage);
                    }
                    if (target.health <= 0) {
                        //remove laser
                        for (var i = lasers.length - 1; i >= 0; i--) {
                            if (lasers[i].target == target) {
                                lasers.splice(i, 1);
                            }
                        }
                        money += round;
                        //calculate money
                        if (target.color == "pink" && difficulty >= 3) {
                            money += 5;
                        }
                        else {
                            money += 10;
                        }
                        //remove enemy
                        enemies.forEach(function (enemy, index) {
                            if (enemy == target) {
                                enemies.splice(index, 1);
                            }
                        });
                    }
                    lasercounter = 0;
                }
                else {
                    lasercounter++;
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
                tower.charge += tower.chargespd;
            }
            else {
                tower.ischarging = 0;
                if (inrange == 1) {
                    var found = 0;
                    for (var i = 0; i < enemies.length; i++) {
                        var Xdist = Math.abs(enemies[i].x - tower.x);
                        var Ydist = Math.abs(enemies[i].y - tower.y);
                        var distance = Math.sqrt((Xdist * Xdist) + (Ydist * Ydist));
                        if (targetinellipse(tower.x, tower.y, tower.range, enemies[i].x, enemies[i].y) == 1 && enemies[i] == target) {
                            found = 1;
                        }
                    }
                    if (found == 0) {
                        switch (tower.target) {
                            case "first": {
                                target = firstenemy;
                                break;
                            }
                            case "last": {
                                target = lastenemy;
                                break;
                            }
                            case "strong": {
                                target = strongenemy;
                                break;
                            }
                            case "weak": {
                                target = weakenemy;
                                break;
                            }
                        }
                    }
                    if (lasercounter < tower.attackspd) { //attack spd
                        lasercounter++;
                    }
                    else {
                        tower.charge -= 10;
                        if (target.color == "red") {
                            if (tower.damage <= 6) {
                                target.health -= 1; //mid damage deals 1
                            }
                            else {
                                target.health -= tower.damage / 2; //high damage deals half
                            }
                        }
                        else {
                            target.health -= tower.damage;
                        }
                        lasers.push(new Laser(tower.level + 4, "blue", target, tower));
                        lasercounter = 0;
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
    }, tower.reload);
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
            if (mouseover == "sniper" && selectedTower == "none" && money >= 100) {
                selectedTower = "sniper";
                draggingTower = 1;
            }
            else if (mouseover == "machinegun" && selectedTower == "none" && money >= 120) {
                selectedTower = "machinegun";
                draggingTower = 1;
            }
            else if (mouseover == "laser" && selectedTower == "none" && money >= 300) {
                selectedTower = "laser";
                draggingTower = 1;
            }
            else if (mouseover == "tesla" && selectedTower == "none" && money >= 250) {
                selectedTower = "tesla";
                draggingTower = 1;
            }
        }
        if (!mouseDown && draggingTower) {
            if (selectedTower == "sniper" && freespace() == 1) {
                selectedTower = "none";
                money -= 100;
                towers.push(new Tower(mouseX, mouseY, "sniper", 1, 0));
                towershoot(towers[towers.length - 1]);
            }
            else if (selectedTower == "machinegun" && freespace() == 1) {
                selectedTower = "none";
                money -= 120;
                towers.push(new Tower(mouseX, mouseY, "machinegun", 1, 0));
                towershoot(towers[towers.length - 1]);
            }
            else if (selectedTower == "laser" && freespace() == 1) {
                selectedTower = "none";
                money -= 300;
                towers.push(new Tower(mouseX, mouseY, "laser", 1, 0));
                towershoot(towers[towers.length - 1]);
            }
            else if (selectedTower == "tesla" && freespace() == 1) {
                selectedTower = "none";
                money -= 250;
                towers.push(new Tower(mouseX, mouseY, "tesla", 1, 0));
                towershoot(towers[towers.length - 1]);
            }
            else {
                selectedTower = "none";
            }
            draggingTower = 0;
        }
    }
    //handles wave interactions with autostart
    if (activeWave() == 0 && autostart == "AutoStart: On") {
        //@ts-ignore
        state.update(lives, money, round, towers);
        round++;
        nextWave();
        waveStart = 1;
    }
    else if (activeWave() == 0 && autostart == "AutoStart: Off") {
        autostart = "StartWave";
    }
    //checks if you lost
    if (lives <= 0) {
        gameOver();
    }
    //handles all enemy interactions 
    enemies.forEach(function (enemy, index) {
        enemy.update();
        //check for changing direction
        for (var i = 1; i < paths.length - 1; i++) {
            //chenge the enemies direction
            if (paths[i][0] == paths[i + 1][0] && paths[i][1] > paths[i + 1][1]) { // up path
                if (paths[i][0] > paths[i - 1][0]) { //coming from left side
                    //@ts-ignore
                    if (enemy.x > (canvas.width / 100) * paths[i][0] + scaleW * 25 && enemy.x < (canvas.width / 100) * paths[i][0] + scaleW * 50 && enemy.y > (canvas.height / 100) * paths[i][1] && enemy.y < (canvas.height / 100) * paths[i][1] + scaleH * 50) {
                        enemy.direction = "N";
                        // console.log("right up");
                    }
                }
                else { //coming from right side
                    //@ts-ignore
                    if (enemy.x > (canvas.width / 100) * paths[i][0] && enemy.x < (canvas.width / 100) * paths[i][0] + scaleW * 25 && enemy.y > (canvas.height / 100) * paths[i][1] && enemy.y < (canvas.height / 100) * paths[i][1] + scaleH * 50) {
                        enemy.direction = "N";
                        // console.log("left up");
                    }
                }
            }
            else if (paths[i][0] == paths[i + 1][0] && paths[i][1] < paths[i + 1][1]) { // down path
                if (paths[i][0] > paths[i - 1][0]) { //coming from left side
                    //@ts-ignore
                    if (enemy.x > (canvas.width / 100) * paths[i][0] + scaleW * 25 && enemy.x < (canvas.width / 100) * paths[i][0] + scaleW * 50 && enemy.y > (canvas.height / 100) * paths[i][1] && enemy.y < (canvas.height / 100) * paths[i][1] + scaleH * 50) {
                        enemy.direction = "S";
                        // console.log("right down");
                    }
                }
                else { //coming from right side
                    //@ts-ignore
                    if (enemy.x > (canvas.width / 100) * paths[i][0] && enemy.x < (canvas.width / 100) * paths[i][0] + scaleW * 25 && enemy.y > (canvas.height / 100) * paths[i][1] && enemy.y < (canvas.height / 100) * paths[i][1] + scaleH * 50) {
                        enemy.direction = "S";
                        // console.log("left down");
                    }
                }
            }
            else if (paths[i][1] == paths[i + 1][1] && paths[i][0] > paths[i + 1][0]) { // left path
                if (paths[i][1] > paths[i - 1][1]) { //coming from top
                    //@ts-ignore
                    if (enemy.x > (canvas.width / 100) * paths[i][0] && enemy.x < (canvas.width / 100) * paths[i][0] + scaleW * 50 && enemy.y > (canvas.height / 100) * paths[i][1] + scaleH * 25 && enemy.y < (canvas.height / 100) * paths[i][1] + scaleH * 50) {
                        enemy.direction = "W";
                        // console.log("down left");
                    }
                }
                else { //coming from bottom
                    //@ts-ignore
                    if (enemy.x > (canvas.width / 100) * paths[i][0] && enemy.x < (canvas.width / 100) * paths[i][0] + scaleW * 50 && enemy.y > (canvas.height / 100) * paths[i][1] && enemy.y < (canvas.height / 100) * paths[i][1] + scaleH * 25) {
                        enemy.direction = "W";
                        // console.log("up left");
                    }
                }
            }
            else if (paths[i][1] == paths[i + 1][1] && paths[i][0] < paths[i + 1][0]) { // right path
                if (paths[i][1] > paths[i - 1][1]) { //coming from top
                    //@ts-ignore
                    if (enemy.x > (canvas.width / 100) * paths[i][0] && enemy.x < (canvas.width / 100) * paths[i][0] + scaleW * 50 && enemy.y > (canvas.height / 100) * paths[i][1] + scaleH * 25 && enemy.y < (canvas.height / 100) * paths[i][1] + scaleH * 50) {
                        enemy.direction = "E";
                        // console.log("down right");
                    }
                }
                else { //coming from bottom
                    //@ts-ignore
                    if (enemy.x > (canvas.width / 100) * paths[i][0] && enemy.x < (canvas.width / 100) * paths[i][0] + scaleW * 50 && enemy.y > (canvas.height / 100) * paths[i][1] && enemy.y < (canvas.height / 100) * paths[i][1] + scaleH * 25) {
                        enemy.direction = "E";
                        // console.log("up right");
                    }
                }
            }
        }
        //check for collisions
        shots.forEach(function (shot, index) {
            if (shot.x > enemy.x - enemy.radius - shot.size && shot.x < enemy.x + enemy.radius + shot.size && shot.y > enemy.y - enemy.radius - shot.size && shot.y < enemy.y + enemy.radius + shot.size) {
                if (enemy.color == "red") {
                    if (shot.damage <= 6) {
                        enemy.health -= 1; //mid damage deals 1
                    }
                    else {
                        enemy.health -= shot.damage / 2; //high damage deals half
                    }
                }
                else {
                    enemy.health -= shot.damage;
                }
                shots.splice(index, 1);
            }
        });
        //remove enemy if it's killed
        if (enemy.health <= 0) {
            //check for seeking projectiles to remove
            for (var i = shots.length - 1; i >= 0; i--) {
                if (shots[i].target == enemy) {
                    shots.splice(i, 1);
                }
            }
            //check for laser projectiles to remove
            for (var i = lasers.length - 1; i >= 0; i--) {
                if (lasers[i].target == enemy) {
                    lasers.splice(i, 1);
                }
            }
            //remove enemy
            money += round;
            if (enemy.color == "pink" && difficulty >= 3) {
                money += 5;
            }
            else {
                money += 10;
            }
            enemies.splice(index, 1);
        }
        //remove enemy and lower lives if enemy makes it to the end
        if (paths[paths.length - 1][0] == 0) { // left exit
            if (enemy.x <= -10) {
                setTimeout(function () {
                    enemies.splice(index, 1);
                }, 0);
                lives -= 1;
            }
        }
        else if (paths[paths.length - 1][1] == 0) { // top exit
            if (enemy.y <= -10) {
                setTimeout(function () {
                    enemies.splice(index, 1);
                }, 0);
                lives -= 1;
            }
        }
        else if (paths[paths.length - 1][1] == 100) { // bottom exit
            //@ts-ignore
            if (enemy.y >= canvas.height + 10) {
                setTimeout(function () {
                    enemies.splice(index, 1);
                }, 0);
                lives -= 1;
            }
        }
        else { //right exit 
            //@ts-ignore
            if (enemy.x >= canvas.width + 10) {
                setTimeout(function () {
                    enemies.splice(index, 1);
                }, 0);
                lives -= 1;
            }
        }
    });
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
        if (shots[i].lifespan > 50) {
            setTimeout(function () {
                shots.splice(i, 1);
            }, 0);
        }
        shots[i].update();
    }
    //handles the laser projectiles
    for (var i = lasers.length - 1; i >= 0; i--) {
        //check if still in range
        // var dist = Math.sqrt((lasers[i].target.x - lasers[i].tower.x)*(lasers[i].target.x - lasers[i].tower.x)+(lasers[i].target.y - lasers[i].tower.y)*(lasers[i].target.y - lasers[i].tower.y));
        if (targetinellipse(lasers[i].tower.x, lasers[i].tower.y, lasers[i].tower.range, lasers[i].target.x, lasers[i].target.y) == 0) {
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
    //@ts-ignore
    if (mouseX > canvas.width - canvas.width / 7.5 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (2 / 2) && mouseY < canvas.height / (numboxes / 2) * (2 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "sniper";
        //@ts-ignore
    }
    else if (mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * ((3 - 1) / 2) && mouseY < canvas.height / (numboxes / 2) * ((3 - 1) / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "machinegun";
        //@ts-ignore
    }
    else if (mouseX > canvas.width - canvas.width / 7.5 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (4 / 2) && mouseY < canvas.height / (numboxes / 2) * (4 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "cannon";
        //@ts-ignore
    }
    else if (mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * ((5 - 1) / 2) && mouseY < canvas.height / (numboxes / 2) * ((5 - 1) / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "laser";
        //@ts-ignore
    }
    else if (mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * ((7 - 1) / 2) && mouseY < canvas.height / (numboxes / 2) * ((7 - 1) / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "tesla";
        //@ts-ignore
    }
    else if (mouseX > canvas.width - canvas.width / 7.5 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (8 / 2) && mouseY < canvas.height / (numboxes / 2) * (8 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "target";
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
    else if (mouseX > canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 && mouseX < canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2 + (canvas.width / 7.5) / 2 && mouseY > canvas.height / (numboxes / 2) * (14 / 2) && mouseY < canvas.height / (numboxes / 2) * (14 / 2) + canvas.height / (numboxes / 2)) {
        mouseover = "towerPlacement";
    }
    else {
        mouseover = "none";
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
    if (mouseover == "sniper" && selectedTower == "none" && money >= 100) {
        selectedTower = "sniper";
    }
    else if (mouseover == "machinegun" && selectedTower == "none" && money >= 120) {
        selectedTower = "machinegun";
    }
    else if (mouseover == "laser" && selectedTower == "none" && money >= 300) {
        selectedTower = "laser";
    }
    else if (mouseover == "tesla" && selectedTower == "none" && money >= 250) {
        selectedTower = "tesla";
    }
    else if (selectedTower == "sniper" && freespace() == 1) {
        selectedTower = "none";
        money -= 100;
        towers.push(new Tower(mouseX, mouseY, "sniper", 1, 0));
        towershoot(towers[towers.length - 1]);
    }
    else if (selectedTower == "machinegun" && freespace() == 1) {
        selectedTower = "none";
        money -= 120;
        towers.push(new Tower(mouseX, mouseY, "machinegun", 1, 0));
        towershoot(towers[towers.length - 1]);
    }
    else if (selectedTower == "laser" && freespace() == 1) {
        selectedTower = "none";
        money -= 300;
        towers.push(new Tower(mouseX, mouseY, "laser", 1, 0));
        towershoot(towers[towers.length - 1]);
    }
    else if (selectedTower == "tesla" && freespace() == 1) {
        selectedTower = "none";
        money -= 250;
        towers.push(new Tower(mouseX, mouseY, "tesla", 1, 0));
        towershoot(towers[towers.length - 1]);
    }
    else if (mouseover == "upgrade") {
        for (var i = 0; i < towers.length; i++) {
            console.log(towers[i].selected);
            // console.log(towers[i]);
            if (towers[i].selected == 1) {
                if (towers[i].type == "sniper" && money >= 90 && towers[i].level == 1) {
                    //upgrades tower
                    towers[i].level = 2;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 90;
                }
                else if (towers[i].type == "sniper" && money >= 150 && towers[i].level == 2) {
                    //upgrades tower
                    towers[i].level = 3;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 150;
                }
                else if (towers[i].type == "sniper" && money >= 400 && towers[i].level == 3) {
                    //upgrades tower
                    towers[i].level = 4;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 400;
                }
                else if (towers[i].type == "sniper" && money >= 350 && towers[i].level == 4) {
                    //upgrades tower
                    towers[i].level = 5;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 350;
                }
                else if (towers[i].type == "machinegun" && money >= 100 && towers[i].level == 1) {
                    //upgrades tower
                    towers[i].level = 2;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 100;
                }
                else if (towers[i].type == "machinegun" && money >= 200 && towers[i].level == 2) {
                    //upgrades tower
                    towers[i].level = 3;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 200;
                }
                else if (towers[i].type == "machinegun" && money >= 350 && towers[i].level == 3) {
                    //upgrades tower
                    towers[i].level = 4;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 350;
                }
                else if (towers[i].type == "machinegun" && money >= 400 && towers[i].level == 4) {
                    //upgrades tower
                    towers[i].level = 5;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 400;
                }
                else if (towers[i].type == "laser" && money >= 400 && towers[i].level == 1) {
                    //upgrades tower
                    towers[i].level = 2;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 400;
                }
                else if (towers[i].type == "laser" && money >= 500 && towers[i].level == 2) {
                    //upgrades tower
                    towers[i].level = 3;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 500;
                }
                else if (towers[i].type == "laser" && money >= 600 && towers[i].level == 3) {
                    //upgrades tower
                    towers[i].level = 4;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 600;
                }
                else if (towers[i].type == "laser" && money >= 700 && towers[i].level == 4) {
                    //upgrades tower
                    towers[i].level = 5;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 700;
                }
                else if (towers[i].type == "tesla" && money >= 400 && towers[i].level == 1) {
                    //upgrades tower
                    towers[i].level = 2;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 400;
                }
                else if (towers[i].type == "tesla" && money >= 500 && towers[i].level == 2) {
                    //upgrades tower
                    towers[i].level = 3;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 500;
                }
                else if (towers[i].type == "tesla" && money >= 600 && towers[i].level == 3) {
                    //upgrades tower
                    towers[i].level = 4;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 600;
                }
                else if (towers[i].type == "tesla" && money >= 700 && towers[i].level == 4) {
                    //upgrades tower
                    towers[i].level = 5;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 700;
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
                            money += 70;
                            break;
                        case 2:
                            money += 130;
                            break;
                        case 3:
                            money += 230;
                            break;
                        case 4:
                            money += 600;
                            break;
                        case 5:
                            money += 800;
                            break;
                    }
                }
                else if (towers[i].type == "machinegun") {
                    switch (towers[i].level) {
                        case 1:
                            money += 80;
                            break;
                        case 2:
                            money += 150;
                            break;
                        case 3:
                            money += 310;
                            break;
                        case 4:
                            money += 630;
                            break;
                        case 5:
                            money += 850;
                            break;
                    }
                }
                else if (towers[i].type == "laser") {
                    switch (towers[i].level) {
                        case 1:
                            money += 250;
                            break;
                        case 2:
                            money += 550;
                            break;
                        case 3:
                            money += 1000;
                            break;
                        case 4:
                            money += 1500;
                            break;
                        case 5:
                            money += 2000;
                            break;
                    }
                }
                else if (towers[i].type == "tesla") {
                    switch (towers[i].level) {
                        case 1:
                            money += 190;
                            break;
                        case 2:
                            money += 550;
                            break;
                        case 3:
                            money += 900;
                            break;
                        case 4:
                            money += 1400;
                            break;
                        case 5:
                            money += 1800;
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
            if (retried == 0) {
                state.update(lives, money, round, towers);
            }
            else {
                retried = 0;
            }
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
            if (mouseX > (canvas.width / 100) * paths[i][0] - scaleW * 50 && mouseX < (canvas.width / 100) * paths[i][0] + scaleW * 100 && mouseY > (canvas.height / 100) * paths[i + 1][1] - scaleH * 50 && mouseY < (canvas.height / 100) * paths[i + 1][1] + (canvas.height / 100) * (paths[i][1] - paths[i + 1][1]) + scaleH * 100) {
                return 0;
            }
        }
        else if (paths[i][0] == paths[i + 1][0] && paths[i][1] < paths[i + 1][1]) { // down
            //@ts-ignore
            if (mouseX > (canvas.width / 100) * paths[i][0] - scaleW * 50 && mouseX < (canvas.width / 100) * paths[i][0] + scaleW * 100 && mouseY > (canvas.height / 100) * paths[i][1] - scaleH * 50 && mouseY < (canvas.height / 100) * paths[i][1] + (canvas.height / 100) * (paths[i + 1][1] - paths[i][1]) + scaleH * 100) {
                return 0;
            }
        }
        else if (paths[i][1] == paths[i + 1][1] && paths[i][0] > paths[i + 1][0]) { // left
            //@ts-ignore
            if (mouseX > (canvas.width / 100) * paths[i + 1][0] - scaleW * 50 && mouseX < (canvas.width / 100) * paths[i + 1][0] + (canvas.width / 100) * (paths[i][0] - paths[i + 1][0]) + scaleW * 50 && mouseY > (canvas.height / 100) * paths[i][1] - scaleH * 50 && mouseY < (canvas.height / 100) * paths[i][1] + scaleH * 100) {
                return 0;
            }
        }
        else if (paths[i][1] == paths[i + 1][1] && paths[i][0] < paths[i + 1][0]) { // right
            //@ts-ignore
            if (mouseX > (canvas.width / 100) * paths[i][0] - scaleW * 50 && mouseX < (canvas.width / 100) * paths[i][0] + (canvas.width / 100) * (paths[i + 1][0] - paths[i][0]) + scaleW * 50 && mouseY > (canvas.height / 100) * paths[i][1] - scaleH * 50 && mouseY < (canvas.height / 100) * paths[i][1] + scaleH * 100) {
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
            hp = 0.5;
            den = 1.5;
            spd = 0.8;
            break;
        case 2:
            hp = 0.75;
            den = 1.2;
            spd = 0.9;
            break;
        case 3:
            hp = 1;
            den = 1;
            spd = 1;
            break;
        case 4:
            hp = 1.5;
            den = 0.8;
            spd = 1.2;
            break;
    }
    //rounds    
    switch (round) {
        case 1:
            spawnWave(10, 1700 * den, Math.floor(10 * hp), 3 * spd, 10, "green"); //basic
            break;
        case 2:
            spawnWave(15, 1500 * den, Math.floor(20 * hp), 3 * spd, 10, "green"); //basic
            break;
        case 3:
            spawnWave(20, 1300 * den, Math.floor(30 * hp), 3 * spd, 10, "green"); //basic
            break;
        case 4:
            spawnWave(10, 1500 * den, Math.floor(20 * hp), 6 * spd, 8, "yellow"); //fast
            break;
        case 5:
            spawnWave(40, 75, 2, 3 * spd, 12, "pink"); //grouped
            break;
        case 6:
            spawnWave(20, 1300 * den, Math.floor(40 * hp), 3 * spd, 10, "green"); //basic
            break;
        case 7:
            spawnWave(2, 4000 * den, Math.floor(200 * hp), 1 * spd, 25, "red"); //boss / armored
            break;
        case 8:
            spawnWave(15, 1500 * den, Math.floor(20 * hp), 6 * spd, 10, "yellow"); //fast + 
            spawnWave(50, 100, 3, 3 * spd, 10, "pink"); //grouped
            break;
        case 9:
            spawnWave(10, 1300 * den, Math.floor(30 * hp), 3 * spd, 15, "red"); //armored 
            break;
        case 10:
            spawnWave(200, 75, Math.floor(5 * hp), 3 * spd, 10, "pink"); //mega grouped
            break;
        case 11:
            spawnWave(15, 1500 * den, Math.floor(20 * hp), 6 * spd, 10, "yellow"); //fast + 
            spawnWave(100, 100, Math.floor(5 * hp), 3 * spd, 10, "pink"); //grouped + 
            spawnWave(12, 1800 * den, Math.floor(25 * hp), 3 * spd, 10, "red"); //armored + 
            spawnWave(20, 1000 * den, Math.floor(40 * hp), 3 * spd, 10, "green"); //basic
            break;
        case 12:
            spawnWave(10, 2000 * den, Math.floor(50 * hp), 6 * spd, 10, "red"); //fast / armored
            break;
        case 13:
            spawnWave(120 * hp, 0, 1, 3 * spd, 10, "pink"); //clump
            break;
        case 14:
            spawnWave(25, 800 * den, Math.floor(50 * hp), 2 * spd, 15, "red"); //armored / multiple
            break;
        case 15:
            var boss = new Enemy(spawnPoint()[0], spawnPoint()[1], Math.floor(10000 * hp), 0.4 * spd, spawnDirection(), 50, "boss");
            enemies.push(boss);
            if (difficulty != 1) { //no minions for easy
                spawnWave(10, 1000 * den, Math.floor(10 * hp), 3 * spd, 7.5 * spd, "red", boss); //minions
            }
            break;
        case 16: //fast
            spawnWave(50, 350, 50, 6.5, 10, "yellow");
            break;
        case 17: //grouped
            spawnWave(150, 80, 30, 3, 10, "pink");
            break;
        case 18: //tanks
            spawnWave(5, 6000, 2500, 2, 20, "green");
            break;
        case 19: // armored 
            spawnWave(20, 1200, 200, 1.5, 20, "red");
            break;
        case 20: // fast, grouped, armored, tanks
            spawnWave(10, 250, 150, 4, 25, "red");
            break;
        case 21: // fast armored on grouped
            spawnWave(60, 300, 250, 1.5, 20, "pink");
            spawnWave(30, 600, 100, 5, 10, "red");
            break;
        case 22: // stacks 
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            spawnWave(10, 1500, 50, 3, 10, "pink");
            break;
        case 23: // tanks 2
            spawnWave(5, 5000, 15000, 0.6, 25, "green");
            break;
        case 24: // everything again
            spawnWave(30, 1500, 200, 6, 10, "yellow"); //fast + 
            spawnWave(250, 100, 50, 3, 10, "pink"); //grouped + 
            spawnWave(25, 1900, 50, 2.8, 10, "red"); //armored + 
            spawnWave(15, 1500, 700, 3.2, 10, "green"); //basic
            break;
        case 25: // fboss
            var fboss = new Enemy(spawnPoint()[0], spawnPoint()[1], 50000, 0.3, spawnDirection(), 50, "boss");
            enemies.push(fboss);
            if (difficulty != 1) { //no minions for easy
                spawnWave(10, 10000, 2000, 2, 20, "black", fboss); //minions
                spawnWave(10, 3000, 200, 6, 15, "yellow", fboss); //minions
            }
            break;
        default:
            spawnWave(25, (750 - round * 10) * den, Math.floor((round * 20 - 150) * hp), (3.5 + round / 20) * spd, 10, "black"); //endless
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
        y = (canvas.height / 100) * paths[0][1] + scaleH * 25;
    }
    else if (paths[0][1] == 0) { // top enterance
        //@ts-ignore
        x = (canvas.width / 100) * paths[0][0] + scaleW * 25;
        y = -scaleH * 10;
    }
    else if (paths[0][1] == 100) { // bottom enterance
        //@ts-ignore
        x = (canvas.width / 100) * paths[0][0] + scaleW * 25;
        //@ts-ignore
        y = canvas.height + scaleH * 10;
    }
    else { //right enterance 
        //@ts-ignore
        x = canvas.width + scaleW * 100;
        //@ts-ignore
        y = (canvas.height / 100) * paths[0][1] + scaleH * 25;
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
function choosepath(i) {
    var paths = [[]];
    switch (i) {
        case 0:
            // basic path
            //@ts-ignore
            paths = [[0, 40], [20, 40], [20, 80], [40, 80], [40, 60], [70, 60], [70, 20], [50, 20], [50, 0]];
            break;
        case 1:
            // castle path
            //@ts-ignore
            paths = [[50, 100], [50, 80], [60, 80], [60, 90], [80, 90], [80, 30], [70, 30], [70, 10], [20, 10], [20, 30], [10, 30], [10, 90], [30, 90], [30, 80], [40, 80], [40, 100]];
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
                    paths.push([60, 40]);
                    ypath = 40;
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
            paths.push([0, 40]);
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
    }
    return paths;
}
//game over implementation
function gameOver() {
    gameIsOver = 1;
    //@ts-ignore
    gameOverMenu.style.display = "flex";
}
