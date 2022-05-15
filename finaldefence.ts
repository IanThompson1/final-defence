export {};
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
// to do 
/*
gui: double text boxes
startscreen / loss screen (video)
gui: import images for background/enemies etc (video)
heroku: make game playable on other devices (or google javascript)
*/
//global variables (no counter for points)
canvas.width = innerWidth;
canvas.height = innerHeight;
var difficulty :number = 2; // 1-4 1=easy, 2=medium, 3=hard(default), 4=insane
var paths = choosepath(0); // 0=basic 1=castle 2=corner 3=diamond 4=circle
var money :number = 500;
var lives :number = 10;
var numboxes : number = 16;
var mouseover :string = "none";
var selectedTower :string = "none";
var mouseX :number = 0;
var mouseY :number = 0;
var round :number = 0;

switch(difficulty){
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
    




//enemy class
class Enemy {
    x: number;
    y: number;
    radius: number;
    color: string;
    health: number;
    speed: number;
    direction: string;
    distance: number;

    constructor(x :number, y :number, health :number, speed :number, direction :string, radius :number, color :string){
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
    draw(){
        c.lineWidth = 1;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        //health bar
        c.fillStyle = "white";
        c.textAlign = "center";
        c.font = "30px serif";
        var healthbar = this.health+"";
        c.fillText(healthbar ,this.x, this.y - this.radius - 10);
        c.stroke()
    }

    //moves the Enemy with speed
    update(){
        if(this.direction == "N"){
            this.y -= this.speed;
        }else if(this.direction == "E"){
            this.x += this.speed;
        }else if(this.direction == "S"){
            this.y += this.speed;
        }else if(this.direction == "W"){
            this.x -= this.speed;
        }
        this.distance += this.speed;
        this.draw();
    }
}

// Tower class
class Tower {
    x: number;
    y: number;
    reload: number;
    damage: number;
    range: number;
    type: string;
    level: number;
    selected: number;
    sold: number;
    lasermax :number;
    lasermin :number;
    lasertime :number;

    constructor(x :number, y :number, type :string, level :number, selected :number){
        this.x = x;
        this.y = y;
        this.type = type;
        this.level = level;
        this.selected = selected;
        this.sold = 0;
        if(this.type == "sniper"){
            this.reload = 700;
            this.damage = 5;
            this.range = 250;
        }else if(this.type == "machinegun"){
            this.reload = 100;
            this.damage = 1;
            this.range = 110;
        }else if (this.type == "laser") {
            this.reload = 10;
            this.range = 150;
            this.lasermin = 0.5;
            this.lasermax = 10;
            this.lasertime = 10;
        }else{
            console.log("invalid tower type");
            console.log(this.type);
        }
        this.draw();
    }

    // draws the tower
    draw(){
        //base
        c.fillStyle = "black";
        c.fillRect(this.x - 50, this.y - 50, 100, 100);
        //head
        if(this.type == "sniper"){
            c.fillStyle = "gray";
        }else if(this.type == "machinegun"){
            c.fillStyle = "#800000";
        }else if(this.type = "laser"){
            c.fillStyle = "#8F2E86";
        }
        c.beginPath();
        c.arc(this.x, this.y, 20, 0, Math.PI * 2);
        c.fill();
        //level
        if (this.level >= 1) {
            c.fillStyle = "yellow";
            c.fillRect(this.x + 25, this.y - 45, 20, 10);
        }
        if (this.level >= 2) {
            c.fillRect(this.x + 25, this.y - 30, 20, 10);
        }
        if (this.level >= 3) {
            c.fillRect(this.x + 25, this.y - 15, 20, 10);
        }
        if (this.level >= 4) {
            c.fillRect(this.x + 25, this.y, 20, 10);
        }
        if (this.level >= 5) {
            c.fillRect(this.x + 25, this.y + 15, 20, 10);
        }
        //range
        if(this.selected == 1){
            c.beginPath();
            c.ellipse(this.x, this.y, this.range, this.range, 0, 0, Math.PI*2);
            c.lineWidth = 1;
            c.stroke();
        }
    }

    //updates level
    update(){
        if(this.type == "sniper"){
            if(this.level == 1){
                this.reload = 700;
                this.damage = 5;
                this.range = 250;
            }else if(this.level == 2){
                this.reload = 750;
                this.damage = 10;
                this.range = 300;
            }else if(this.level == 3){
                this.reload = 800;
                this.damage = 20;
                this.range = 350;
            }else if(this.level == 4){
                this.reload = 850;
                this.damage = 35;
                this.range = 400;
            }else if(this.level == 5){
                this.reload = 900;
                this.damage = 50;
                this.range = 450;
            }
        }else if(this.type == "machinegun"){
            if(this.level == 1){
                this.reload = 100;
                this.damage = 1;
                this.range = 110;
            }else if(this.level == 2){
                this.reload = 75;
                this.damage = 1.5;
                this.range = 120;
            }else if(this.level == 3){
                this.reload = 50;
                this.damage = 2;
                this.range = 130;
            }else if(this.level == 4){
                this.reload = 40;
                this.damage = 3;
                this.range = 140;
            }else if(this.level == 5){
                this.reload = 30;
                this.damage = 4;
                this.range = 150;
            }
        }else if(this.type == "laser"){
            if(this.level == 1){
                this.reload = 10;
                this.range = 150;
                this.lasermax = 10;
                this.lasermin = 0.5;
                this.lasertime = 10;
            }else if(this.level == 2){
                this.reload = 10;
                this.range = 160;
                this.lasermax = 15;
                this.lasermin = 1;
                this.lasertime = 9;
            }else if(this.level == 3){
                this.reload = 10;
                this.range = 170;
                this.lasermax = 20;
                this.lasermin = 2;
                this.lasertime = 8;
            }else if(this.level == 4){
                this.reload = 10;
                this.range = 180;
                this.lasermax = 30;
                this.lasermin = 2;
                this.lasertime = 7;
            }else if(this.level == 5){
                this.reload = 10;
                this.range = 190;
                this.lasermax = 40;
                this.lasermin = 2;
                this.lasertime = 6;
            }
        }
    }
}

//projectiles class 
class Projectile {
    x: number;
    y: number;
    damage: number;
    speed: number;
    size: number;
    color: string;
    target: Enemy;
    lifespan: number;

    constructor(x :number, y :number, damage :number, speed :number, size :number, color :string, target :Enemy){
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.speed = speed;
        this.size = size;
        this.color = color;
        this.target = target;
        this.lifespan = 0;
    }

    draw(){
        c.lineWidth = 1;
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI*2);
        c.fill();
    }

    update() {
        var xdiff = Math.abs(this.x - this.target.x);
        var ydiff = Math.abs(this.y - this.target.y);
        var angle = (Math.atan(ydiff / xdiff));
        if(this.x > this.target.x){
            this.x = this.x - (this.speed * Math.cos(angle));
        }else{
            this.x = this.x + (this.speed * Math.cos(angle));
        }
        if(this.y > this.target.y){
            this.y = this.y - (this.speed * Math.sin(angle));
        }else{
            this.y = this.y + (this.speed * Math.sin(angle));
        }
        this.lifespan++;
        this.draw();
    }
}


//creates the array of enemies
var enemies :Enemy[] = [];
var towers :Tower[] = [];
var shots :Projectile[] = [];

//creates a new enemy every 2 seconds
function spawnWave(numenemies :number, density :number, health :number, speed :number, size :number, color :string, boss = new Enemy(0, 0, 0, 0, "E", 0, "black")) :void {
    var current :number = 0;
    var bossRound :number = 0;
    if(boss.x != 0 || boss.y != 0){//boss round
        bossRound = 1;
    }
    var enemiesfunction = setInterval(() => {
        //spawn at enterance 
        if(bossRound == 0){//default
            enemies.push(new Enemy(spawnPoint()[0], spawnPoint()[1], health, speed, spawnDirection(), size, color));
        }else{//spawn inside boss
            enemies.push(new Enemy(boss.x, boss.y, health, speed, boss.direction, size, color));
            enemies[enemies.length-1].distance = boss.distance;
        }
        current++;
        if(current >= numenemies && bossRound == 0){
            clearInterval(enemiesfunction);
        }
        //check when to stop spawning
        if(bossRound == 1){ 
            for(var i=0; i<enemies.length; i++){
                if(enemies[i] != boss){
                    bossRound = 0;//boss not found yet
                }else{
                    bossRound = 1;//still a boss
                    break;
                }
            }
            if(bossRound == 0){//boss is dead
                clearInterval(enemiesfunction);
            }
        }
    }, density);
}

//handles shooting
function towershoot(tower :Tower) :void {
    //global variables
    var lasercounter = 0;
    var laserdamage = tower.damage;
    var lastenemy;
    var firstenemy;
    var target;

    var firefunction = setInterval(function () {
        var inrange = 0;
        for (var i = 0; i < enemies.length; i++) { //find fist and last enemies in range
            var Xdist = Math.abs(enemies[i].x - tower.x);
            var Ydist = Math.abs(enemies[i].y - tower.y);
            var distance = Math.sqrt((Xdist * Xdist) + (Ydist * Ydist));
            if (distance <= tower.range && inrange == 0) {
                lastenemy = enemies[i];
                firstenemy = enemies[i];
                inrange = 1;
            }
            else if (distance <= tower.range) {
                if (lastenemy.distance > enemies[i].distance) {
                    lastenemy = enemies[i];
                }
                else if (firstenemy.distance < enemies[i].distance) {
                    firstenemy = enemies[i];
                }
            }
        }
        if (tower.type == "sniper" || tower.type == "machinegun") { //shoot projectile
            if (inrange == 1) {
                //inputs
                var speed = 10;
                var damage = tower.damage;
                if (tower.type == "machinegun" && tower.level == 2) {
                    //half of the time damage is 1 other half damage is 2
                    damage = Math.floor(Math.random() * 2) + 1;
                }
                shots.push(new Projectile(tower.x, tower.y, damage, speed, 5, "red", firstenemy));
            }
            if (tower.sold == 0) {
                towershoot(tower);
                clearInterval(firefunction);
            }
            clearInterval(firefunction);
        }
        else if (tower.type == "laser") {//laser attack
            //check for current target in range
            if (inrange == 1) {
                var found = 0;
                for (var i = 0; i < enemies.length; i++) {
                    var Xdist = Math.abs(enemies[i].x - tower.x);
                    var Ydist = Math.abs(enemies[i].y - tower.y);
                    var distance = Math.sqrt((Xdist * Xdist) + (Ydist * Ydist));
                    if (distance <= tower.range && enemies[i] == target) {
                        found = 1;
                    }
                }
                if (found == 0) {
                    target = lastenemy;
                    laserdamage = tower.lasermin;
                }
                drawLine(c, [tower.x, tower.y], [target.x, target.y], "red");
                //do damage here instead
                if (lasercounter > tower.lasertime*2) {
                    if (found == 1) { //heat up
                        if (laserdamage >= tower.lasermax) {
                            laserdamage = tower.lasermax;
                        }else {
                            laserdamage = laserdamage + 0.5;
                        }
                    }
                    if(target.color == "red"){
                        if(laserdamage > 2){ //low damage deals 0
                            if(laserdamage <= 5){
                                target.health -= 1; //mid damage deals 1
                            }else{
                                target.health -= laserdamage/2; //high damage deals half
                            }
                        }
                    }else{
                        target.health -= laserdamage;
                    }
                    if(target.health <=0){//remove enemy
                        if(target.color == "pink" && difficulty >= 3){
                            money += 5;
                        }else{
                            money += 10;
                        }
                        enemies.forEach(function(enemy, index){
                            if(enemy == target){
                                enemies.splice(index, 1);
                            }
                        })
                    }
                    lasercounter = 0;
                }
                else {
                    lasercounter++;
                }
            }
            if (tower.sold == 1) {
                clearInterval(firefunction);
            }
        }
    }, tower.reload);
}

// animate function that is run continuously 
let animationId;
function animate(){
    animationId = requestAnimationFrame(animate);
    
    //entire gui
    drawLayout();

    //handles all enemy interactions 
    enemies.forEach(function (enemy, index) {
        enemy.update();
        //check for changing direction
        for(var i=1; i<paths.length-1; i++){
            //chenge the enemies direction
            if (paths[i][0] == paths[i + 1][0] && paths[i][1] > paths[i + 1][1]) { // up path
                if(paths[i][0] > paths[i-1][0]){ //coming from left side
                    if(enemy.x > (canvas.width / 100) * paths[i][0]+25 && enemy.x < (canvas.width / 100) * paths[i][0]+50 && enemy.y > (canvas.height / 100) * paths[i][1] && enemy.y < (canvas.height / 100) * paths[i][1]+50){
                        enemy.direction = "N";
                        // console.log("right up");
                    }
                }else{ //coming from right side
                    if(enemy.x > (canvas.width / 100) * paths[i][0] && enemy.x < (canvas.width / 100) * paths[i][0]+25 && enemy.y > (canvas.height / 100) * paths[i][1] && enemy.y < (canvas.height / 100) * paths[i][1]+50){
                        enemy.direction = "N";
                        // console.log("left up");
                    }
                }
            }
            else if (paths[i][0] == paths[i + 1][0] && paths[i][1] < paths[i + 1][1]) { // down path
                if(paths[i][0] > paths[i-1][0]){ //coming from left side
                    if(enemy.x > (canvas.width / 100) * paths[i][0]+25 && enemy.x < (canvas.width / 100) * paths[i][0]+50 && enemy.y > (canvas.height / 100) * paths[i][1] && enemy.y < (canvas.height / 100) * paths[i][1]+50){
                        enemy.direction = "S";
                        // console.log("right down");
                    }
                }else{ //coming from right side
                    if(enemy.x > (canvas.width / 100) * paths[i][0] && enemy.x < (canvas.width / 100) * paths[i][0]+25 && enemy.y > (canvas.height / 100) * paths[i][1] && enemy.y < (canvas.height / 100) * paths[i][1]+50){
                        enemy.direction = "S";
                        // console.log("left down");
                    }
                }
            }
            else if (paths[i][1] == paths[i + 1][1] && paths[i][0] > paths[i + 1][0]) { // left path
                if(paths[i][1] > paths[i-1][1]){ //coming from top
                    if(enemy.x > (canvas.width / 100) * paths[i][0] && enemy.x < (canvas.width / 100) * paths[i][0]+50 && enemy.y > (canvas.height / 100) * paths[i][1]+25 && enemy.y < (canvas.height / 100) * paths[i][1]+50){
                        enemy.direction = "W";
                        // console.log("down left");
                    }
                }else{ //coming from bottom
                    if(enemy.x > (canvas.width / 100) * paths[i][0] && enemy.x < (canvas.width / 100) * paths[i][0]+50 && enemy.y > (canvas.height / 100) * paths[i][1] && enemy.y < (canvas.height / 100) * paths[i][1]+25){
                        enemy.direction = "W";
                        // console.log("up left");
                    }
                }
            }
            else if (paths[i][1] == paths[i + 1][1] && paths[i][0] < paths[i + 1][0]) { // right path
                if(paths[i][1] > paths[i-1][1]){ //coming from top
                    if(enemy.x > (canvas.width / 100) * paths[i][0] && enemy.x < (canvas.width / 100) * paths[i][0]+50 && enemy.y > (canvas.height / 100) * paths[i][1]+25 && enemy.y < (canvas.height / 100) * paths[i][1]+50){
                        enemy.direction = "E";
                        // console.log("down right");
                    }
                }else{ //coming from bottom
                    if(enemy.x > (canvas.width / 100) * paths[i][0] && enemy.x < (canvas.width / 100) * paths[i][0]+50 && enemy.y > (canvas.height / 100) * paths[i][1] && enemy.y < (canvas.height / 100) * paths[i][1]+25){
                        enemy.direction = "E";
                        // console.log("up right");
                    }
                }
            }
        }

        //check for collisions
        shots.forEach(function(shot, index){
            if(shot.x > enemy.x-enemy.radius-shot.size && shot.x < enemy.x+enemy.radius+shot.size && shot.y > enemy.y-enemy.radius-shot.size && shot.y < enemy.y+enemy.radius+shot.size){
                if(enemy.color == "red"){
                    if(shot.damage > 2){ //low damage deals 0
                        if(shot.damage <= 5){
                            enemy.health -= 1; //mid damage deals 1
                        }else{
                            enemy.health -= shot.damage/2; //high damage deals half
                        }
                    }
                }else{
                    enemy.health -= shot.damage;
                }
                shots.splice(index, 1);
            }
        });

        //remove enemy if it's killed
        if (enemy.health <= 0) {
            //check for seeking projectiles to remove
            for(var i = shots.length-1; i >= 0; i--){
                if (shots[i].target == enemy) {
                    shots.splice(i, 1);
                }
            }
            //remove enemy
            if(enemy.color == "pink" && difficulty >= 3){
                money += 5;
            }else{
                money += 10;
            }
            enemies.splice(index, 1);
        }
        //remove enemy and lower lives if enemy makes it to the end
        if(paths[paths.length-1][0] == 0){// left exit
            if (enemy.x <= -10) {
                setTimeout(function () {
                    enemies.splice(index, 1);
                }, 0);
                lives -= 1;
            }
        }else if(paths[paths.length-1][1] == 0){// top exit
            if (enemy.y <= -10) {
                setTimeout(function () {
                    enemies.splice(index, 1);
                }, 0);
                lives -= 1;
            }
        }else if(paths[paths.length-1][1] == 100){// bottom exit
            if (enemy.y >= canvas.height + 10) {
                setTimeout(function () {
                    enemies.splice(index, 1);
                }, 0);
                lives -= 1;
            }
        }else{ //right exit 
            if (enemy.x >= canvas.width + 10) {
                setTimeout(function () {
                    enemies.splice(index, 1);
                }, 0);
                lives -= 1;
            }
        }
    })

    //draws the towers
    towers.forEach(function (tower, index) {
        tower.draw();
    });

    //drawing selected tower
    if(selectedTower != "none"){
        var tempTower = new Tower(mouseX, mouseY, selectedTower, 1, 1);
        tempTower.draw();
    }

    //handles projectiles
    for(var i = shots.length-1; i >= 0; i--){
        if (shots[i].lifespan > 50) {
            setTimeout(function () {
                shots.splice(i, 1);
            }, 0);
        }
        shots[i].update();
    }

    //handles mouse movement 
    if(mouseX > canvas.width-canvas.width/7.5 && mouseX < canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2 && mouseY > canvas.height/(numboxes/2)*(2/2) && mouseY < canvas.height/(numboxes/2)*(2/2) + canvas.height/(numboxes/2)){
        mouseover = "sniper";
    }else if(mouseX > canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2 && mouseX < canvas.width - canvas.width/7.5 + (canvas.width/7.5)/2 + (canvas.width/7.5)/2 && mouseY > canvas.height/(numboxes/2)*((3-1)/2) && mouseY < canvas.height/(numboxes/2)*((3-1)/2)+canvas.height/(numboxes/2)){
        mouseover = "machinegun";
    }else if(mouseX > canvas.width-canvas.width/7.5 && mouseX < canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2 && mouseY > canvas.height/(numboxes/2)*(4/2) && mouseY < canvas.height/(numboxes/2)*(4/2) + canvas.height/(numboxes/2)){
        mouseover = "cannon";
    }else if(mouseX > canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2 && mouseX < canvas.width - canvas.width/7.5 + (canvas.width/7.5)/2 + (canvas.width/7.5)/2 && mouseY > canvas.height/(numboxes/2)*((5-1)/2) && mouseY < canvas.height/(numboxes/2)*((5-1)/2)+canvas.height/(numboxes/2)){
        mouseover = "laser";
    }else if(mouseX > canvas.width-canvas.width/7.5+2.5 && mouseX < canvas.width-canvas.width/7.5+2.5 + (canvas.width/7.5)-5 && mouseY > canvas.height-canvas.height/(numboxes/2)+2.5 && mouseY < canvas.height-canvas.height/(numboxes/2)+2.5 + canvas.height/(numboxes/2)-5){
        mouseover = "startWave";
    }else if(mouseX > canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2 && mouseX < canvas.width - canvas.width/7.5 + (canvas.width/7.5)/2 + (canvas.width/7.5)/2 && mouseY > canvas.height/(numboxes/2)*(12/2) && mouseY < canvas.height/(numboxes/2)*(12/2)+canvas.height/(numboxes/2)){
        mouseover = "upgrade";
    }else if(mouseX > canvas.width-canvas.width/7.5 && mouseX < canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2 && mouseY > canvas.height/(numboxes/2)*(12/2) && mouseY < canvas.height/(numboxes/2)*(12/2) + canvas.height/(numboxes/2)){
        mouseover = "sell";
    }else{
        mouseover = "none";
    }
}

//function for when you click
addEventListener("click", () => {
    //selects the tower
    if(mouseover == "sniper" && selectedTower == "none" && money >= 100){ 
        selectedTower = "sniper";
    }else if(mouseover == "machinegun" && selectedTower == "none" && money >= 120){
        selectedTower = "machinegun";
    }else if(mouseover == "laser" && selectedTower == "none" && money >= 300){
        selectedTower = "laser";
    }else if(selectedTower == "sniper" && freespace() == 1){
        selectedTower = "none";
        money -= 100;
        towers.push(new Tower(mouseX, mouseY, "sniper", 1, 0));
        towershoot(towers[towers.length-1]);
    }else if(selectedTower == "machinegun" && freespace() == 1){
        selectedTower = "none";
        money -= 120;
        towers.push(new Tower(mouseX, mouseY, "machinegun", 1, 0));
        towershoot(towers[towers.length-1]);
    }else if(selectedTower == "laser" && freespace() == 1){
        selectedTower = "none";
        money -= 300;
        towers.push(new Tower(mouseX, mouseY, "laser", 1, 0));
        towershoot(towers[towers.length-1]);
    }else if(mouseover == "upgrade"){
        for(var i=0; i<towers.length; i++){
            console.log(towers[i].selected);
            // console.log(towers[i]);
            if(towers[i].selected == 1){
                if(towers[i].type == "sniper" && money >= 90 && towers[i].level == 1){
                    //upgrades tower
                    towers[i].level = 2;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 90;
                }else if(towers[i].type == "sniper" && money >= 150 && towers[i].level == 2){
                    //upgrades tower
                    towers[i].level = 3;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 150;
                }else if(towers[i].type == "sniper" && money >= 400 && towers[i].level == 3){
                    //upgrades tower
                    towers[i].level = 4;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 400;
                }else if(towers[i].type == "sniper" && money >= 350 && towers[i].level == 4){
                    //upgrades tower
                    towers[i].level = 5;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 350;
                }else if(towers[i].type == "machinegun" && money >= 100 && towers[i].level == 1){
                    //upgrades tower
                    towers[i].level = 2;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 100;
                }else if(towers[i].type == "machinegun" && money >= 200 && towers[i].level == 2){
                    //upgrades tower
                    towers[i].level = 3;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 200;
                }else if(towers[i].type == "machinegun" && money >= 350 && towers[i].level == 3){
                    //upgrades tower
                    towers[i].level = 4;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 350;
                }else if(towers[i].type == "machinegun" && money >= 400 && towers[i].level == 4){
                    //upgrades tower
                    towers[i].level = 5;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 400;
                }else if(towers[i].type == "laser" && money >= 400 && towers[i].level == 1){
                    //upgrades tower
                    towers[i].level = 2;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 400;
                }else if(towers[i].type == "laser" && money >= 500 && towers[i].level == 2){
                    //upgrades tower
                    towers[i].level = 3;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 500;
                }else if(towers[i].type == "laser" && money >= 600 && towers[i].level == 3){
                    //upgrades tower
                    towers[i].level = 4;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 600;
                }else if(towers[i].type == "laser" && money >= 700 && towers[i].level == 4){
                    //upgrades tower
                    towers[i].level = 5;
                    towers[i].selected = 1;
                    towers[i].update();
                    money -= 700;
                }
            }
        }
    }else if(mouseover == "sell"){//sell button
        for(var i=towers.length-1; i>=0; i--){
            if(towers[i].selected == 1){
                if(towers[i].type == "sniper"){
                    switch(towers[i].level){
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
                }else if(towers[i].type == "machinegun"){
                    switch(towers[i].level){
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
                }else if(towers[i].type == "laser"){
                    switch(towers[i].level){
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
                //remove tower and projectiles 
                towers[i].sold = 1;
                //remove range
                towers[i].selected = 0;
                towers[i].draw();
                towers.splice(i, 1);
            }
        }
    }else{//deselects all towers
        for(var i=0; i<towers.length; i++){
            towers[i].selected = 0;
        }
    }
    //checks if mouse is over a tower to select
    if(selectedTower == "none"){
        for(var i=0; i<towers.length; i++){
            if(mouseX > towers[i].x - 50 && mouseX < towers[i].x + 50 && mouseY > towers[i].y - 50 && mouseY < towers[i].y + 50){
                towers[i].selected = 1;
            }
        }
    }
    //start wave button
    if(mouseover == "startWave"){
        round++;
        nextWave();
    }
})

//checks if current mouse location is open to place a tower in
function freespace(){
    //check against menu
    if(mouseX > canvas.width-canvas.width/7.5 - 50){
        return 0;
    }
    //check against other towers
    for(var i=0; i<towers.length; i++){
        if (mouseX > towers[i].x - 100 && mouseX < towers[i].x + 100 && mouseY > towers[i].y - 100 && mouseY < towers[i].y + 100) {
            return 0;
        }
    }
    //check paths
    for(var i=0; i<paths.length-1; i++){
        if (paths[i][0] == paths[i + 1][0] && paths[i][1] > paths[i + 1][1]) { // up 
            if(mouseX > (canvas.width / 100) * paths[i][0]-50 && mouseX < (canvas.width / 100) * paths[i][0] + 100 && mouseY > (canvas.height / 100) * paths[i+1][1] -50 && mouseY < (canvas.height / 100) * paths[i+1][1] + (canvas.height / 100) * (paths[i][1] - paths[i + 1][1]) +100){
                return 0;
            }
        }
        else if (paths[i][0] == paths[i + 1][0] && paths[i][1] < paths[i + 1][1]) { // down
            if(mouseX > (canvas.width / 100) * paths[i][0]-50 && mouseX < (canvas.width / 100) * paths[i][0] + 100 && mouseY > (canvas.height / 100) * paths[i][1] -50 && mouseY < (canvas.height / 100) * paths[i][1] + (canvas.height / 100) * (paths[i + 1][1] - paths[i][1]) +100){
                return 0;
            }
        }
        else if (paths[i][1] == paths[i + 1][1] && paths[i][0] > paths[i + 1][0]) { // left
            if(mouseX > (canvas.width / 100) * paths[i+1][0]-50 && mouseX < (canvas.width / 100) * paths[i+1][0] + (canvas.width / 100) * (paths[i][0] - paths[i + 1][0]) +50 && mouseY > (canvas.height / 100) * paths[i][1] -50 && mouseY < (canvas.height / 100) * paths[i][1] +100){
                return 0;
            }
        }
        else if (paths[i][1] == paths[i + 1][1] && paths[i][0] < paths[i + 1][0]) { // right
            if(mouseX > (canvas.width / 100) * paths[i][0]-50 && mouseX < (canvas.width / 100) * paths[i][0] + (canvas.width / 100) * (paths[i + 1][0] - paths[i][0]) +50 && mouseY > (canvas.height / 100) * paths[i][1] -50 && mouseY < (canvas.height / 100) * paths[i][1] +100){
                return 0;
            }
        }
    }
    //free space
    return 1;
}

//updates mouse position when moved
onmousemove = function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
}

//starts the program by calling the animate function
animate();





//entire gui
function drawLayout(){
    //redraws the background
    c.fillStyle = "#289E6A";
    c.fillRect(0, 0, canvas.width, canvas.height);
    //path
    c.fillStyle = "#FF6A6A";
    for (var i = 0; i < paths.length - 1; i++) {
        if (paths[i][0] == paths[i + 1][0] && paths[i][1] > paths[i + 1][1]) { // up 
            c.fillRect((canvas.width / 100) * paths[i][0], (canvas.height / 100) * paths[i+1][1], 50, (canvas.height / 100) * (paths[i][1] - paths[i + 1][1]) +50);
        }
        else if (paths[i][0] == paths[i + 1][0] && paths[i][1] < paths[i + 1][1]) { // down
            c.fillRect((canvas.width / 100) * paths[i][0], (canvas.height / 100) * paths[i][1], 50, (canvas.height / 100) * (paths[i + 1][1] - paths[i][1]) +50);
        }
        else if (paths[i][1] == paths[i + 1][1] && paths[i][0] > paths[i + 1][0]) { // left
            c.fillRect((canvas.width / 100) * paths[i+1][0], (canvas.height / 100) * paths[i][1], (canvas.width / 100) * (paths[i][0] - paths[i + 1][0]), 50);
        }
        else if (paths[i][1] == paths[i + 1][1] && paths[i][0] < paths[i + 1][0]) { // right
            c.fillRect((canvas.width / 100) * paths[i][0], (canvas.height / 100) * paths[i][1], (canvas.width / 100) * (paths[i + 1][0] - paths[i][0]), 50);
        }
    }
    
    //menu background
    c.fillStyle = "#A6A6A6";
    c.lineWidth = 1;
    c.fillRect(canvas.width-canvas.width/7.5, 0, canvas.width/7.5, canvas.height);
    c.strokeRect(canvas.width-canvas.width/7.5, 0, canvas.width/7.5, canvas.height);
    //boxes
    for(var i=0; i<numboxes; i++){
        if(i % 2 == 0 && i < numboxes-2){
            c.strokeRect(canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(i/2), (canvas.width/7.5)/2, canvas.height/(numboxes/2));
        }else if(i<numboxes-2){
            c.strokeRect(canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*((i-1)/2), (canvas.width/7.5)/2, canvas.height/(numboxes/2));
        }else{
            //startwave button
            c.fillStyle = "#2CF721"
            c.fillRect(canvas.width-canvas.width/7.5+2.5, canvas.height-canvas.height/(numboxes/2)+2.5, (canvas.width/7.5)-5, canvas.height/(numboxes/2)-5)
            c.fillStyle = "black";
            c.font = "40px serif";
            c.textAlign = "center";
            c.fillText("Start Wave", canvas.width-canvas.width/7.5+(canvas.width/7.5)/2, canvas.height-canvas.height/(numboxes/2)+canvas.height/(numboxes));
            //reset color
            c.fillStyle = "#A6A6A6";
        }
    }
    //lives / money
    c.fillStyle = "yellow";
    c.font = "40px serif";
    c.textAlign = "center";
    c.fillText(money.toString(), canvas.width-canvas.width/7.5 + (canvas.width/7.5)/4, canvas.height/(numboxes/2)-canvas.height/(numboxes*5));
    c.fillText("Money", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/4, canvas.height/(numboxes/2)-canvas.height/(numboxes));
    c.stroke();
    c.fillStyle = "red";
    c.fillText(lives.toString(), canvas.width-canvas.width/7.5 + (canvas.width/7.5)/4 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)-canvas.height/(numboxes*5));
    c.fillText("Lives", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/4 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)-canvas.height/(numboxes));
    c.stroke();
    //current wave 
    if(round == 7 || round == 15){
        c.fillStyle = "red";
    }else{
        c.fillStyle = "white";
    }
    c.font = "60px serif";
    c.textAlign = "left";
    c.fillText("Wave# "+round, 0, 50);
    c.stroke();
    //next wave hints
    if(round == 6 || round == 14){
        c.fillStyle = "red";
    }else{
        c.fillStyle = "white";
    }
    var hint = "";
    switch (round) {
        case 0:
            hint = "easy";
            break;
        case 1:
            hint = "basic";
            break;
        case 2:
            hint = "basic again";
            break;
        case 3:
            hint = "fast";
            break;
        case 4:
            hint = "grouped enemies";
            break;
        case 5:
            hint = "final basic";
            break;
        case 6:
            hint = "mini-boss round!";
            break;
        case 7:
            hint = "fast on grouped";
            break;
        case 8:
            hint = "armored";
            break;
        case 9:
            hint = "mega grouped";
            break;
        case 10:
            hint = "everything";
            break;
        case 11:
            hint = "fast-armored";
            break;
        case 12:
            hint = "the clump";
            break;
        case 13:
            hint = "grouped-armored";
            break;
        case 14:
            hint = "final boss!";
            break;
        default:
            hint = "endless good luck";
            break;
    }
    c.font = "60px serif";
    c.textAlign = "left";
    c.fillText("Next wave: "+hint, 0, 100);
    c.stroke();
    //towers
    addText("Sniper", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(2/2), "black", numboxes);
    addText("MiniGun", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(2/2), "black", numboxes);
    addText("Cannon", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(4/2), "black", numboxes);
    addText("laser", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(4/2), "black", numboxes);
    addText("Burst", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(6/2), "black", numboxes);
    addText("Tesla", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(6/2), "black", numboxes);

    //selected tower info
    for(var i=0; i<towers.length; i++){
        if(towers[i].selected == 1){
            if(towers[i].type == "sniper" && towers[i].level == 1){//level 1 sniper
                addText("Sniper 1", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("D:5->10", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("Spd:7->7.5", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("Ran:25->30", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("sell:70", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
                addText("upgrade:90", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
            }else if(towers[i].type == "sniper" && towers[i].level == 2){//level 2 sniper
                addText("Sniper 2", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("D:10->20", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("Spd:7.5->8", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("Ran:30->35", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("sell:130", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
                addText("upgrade:150", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
            }else if(towers[i].type == "sniper" && towers[i].level == 3){//level 3 sniper
                addText("Sniper 3", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("D:20->35", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("Spd:8->8.5", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("Ran:35->40", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("sell:230", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
                addText("upgrade:400", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
            }else if(towers[i].type == "sniper" && towers[i].level == 4){//level 4 sniper
                addText("Sniper 4", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("D:35->50", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("Spd:8.5->9", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("Ran:40->45", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("sell:600", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
                addText("upgrade:350", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
            }else if(towers[i].type == "sniper" && towers[i].level == 5){//level 5 sniper
                addText("Sniper 5", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("D:50", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("Spd:9", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("Ran:45", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("sell:800", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
                addText("MaxLevel", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
            }else if(towers[i].type == "machinegun" && towers[i].level == 1){//level 1 minigun
                addText("MiniGun 1", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("D:1->(1-2)", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("Spd:1->0.75", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("Ran:11->12", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("sell:80", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
                addText("upgrade:100", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
            }else if(towers[i].type == "machinegun" && towers[i].level == 2){//level 2 minigun
                addText("MiniGun 2", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("D:(1-2)->2", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("Spd:0.75->0.5", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("Ran:12->13", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("sell:150", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
                addText("upgrade:200", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
            }else if(towers[i].type == "machinegun" && towers[i].level == 3){//level 3 minigun
                addText("MiniGun 3", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("D:2->3", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("Spd:0.5->0.4", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("Ran:13->14", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("sell:310", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
                addText("upgrade:350", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
            }else if(towers[i].type == "machinegun" && towers[i].level == 4){//level 4 minigun
                addText("MiniGun 4", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("D:3->4", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("Spd:0.4->0.3", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("Ran:14->15", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("sell:630", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
                addText("upgrade:400", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
            }else if(towers[i].type == "machinegun" && towers[i].level == 5){//level 5 minigun
                addText("MiniGun 5", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("D:4", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("Spd:0.3", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("Ran:15", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("sell:850", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
                addText("MaxLevel", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
            }else if(towers[i].type == "laser" && towers[i].level == 1){//level 1 laser
                addText("Laser 1", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("D:(.5-10)->(1-15)", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("Spd:10->9", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("Ran:15->16", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("sell:250", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
                addText("upgrade:400", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
            }else if(towers[i].type == "laser" && towers[i].level == 2){//level 2 laser
                addText("Laser 2", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("D:(1-15)->(2-20)", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("Spd:9->8", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("Ran:16->17", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("sell:550", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
                addText("upgrade:500", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
            }else if(towers[i].type == "laser" && towers[i].level == 3){//level 3 laser
                addText("Laser 3", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("D:(2-20)->(2->30)", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("Spd:8->7", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("Ran:17->8", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("sell:1000", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
                addText("upgrade:600", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
            }else if(towers[i].type == "laser" && towers[i].level == 4){//level 4 laser
                addText("Laser 4", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("D:(2-30)->(2->40)", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("Spd:7->6", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("Ran:18->19", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("sell:1500", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
                addText("upgrade:700", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
            }else if(towers[i].type == "laser" && towers[i].level == 5){//level 5 laser
                addText("Laser 5", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("D:(2-40)", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(8/2), "black", numboxes);
                addText("Spd:6", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("Ran:19", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(10/2), "black", numboxes);
                addText("sell:2000", canvas.width-canvas.width/7.5, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
                addText("MaxLevel", canvas.width-canvas.width/7.5 + (canvas.width/7.5)/2, canvas.height/(numboxes/2)*(12/2), "black", numboxes);
            }
        }
    }
    c.lineWidth = 1;
}

function addText(text, x, y, color, numboxes){//x and y of the top left
    c.fillStyle = color;
    c.textAlign = "center";
    var font = canvas.height/(numboxes)-2*text.length + "px serif";
    c.font = font;
    c.fillText(text, x+(canvas.width/7.5)/4, y+canvas.height/(numboxes) + canvas.height/(numboxes)/3, (canvas.width/7.5)/2);
    c.stroke();
}


//sending waves function
function nextWave(){
    //multipliers
    var hp :number = 1;//health
    var den :number = 1;//density
    var spd :number = 1;//speed
    switch(difficulty){
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
            spawnWave(10, 1700*den, Math.floor(10*hp), 3*spd, 10, "green"); //basic
            break;
        case 2:
            spawnWave(15, 1500*den, Math.floor(20*hp), 3*spd, 10, "green"); //basic
            break;
        case 3:
            spawnWave(20, 1300*den, Math.floor(30*hp), 3*spd, 10, "green"); //basic
            break;
        case 4:
            spawnWave(10, 1500*den, Math.floor(20*hp), 6*spd, 8, "yellow"); //fast
            break;
        case 5:
            spawnWave(40, 75, 2, 3*spd, 12, "pink"); //grouped
            break;
        case 6:
            spawnWave(20, 1300*den, Math.floor(40*hp), 3*spd, 10, "green"); //basic
            break;
        case 7:
            spawnWave(2, 4000*den, Math.floor(200*hp), 1*spd, 25, "red"); //boss / armored
            break;
        case 8:
            spawnWave(15, 1500*den, Math.floor(20*hp), 6*spd, 10, "yellow"); //fast + 
            spawnWave(50, 100, 3, 3*spd, 10, "pink"); //grouped
            break;
        case 9:
            spawnWave(10, 1300*den, Math.floor(15*hp), 3*spd, 15, "red"); //armored 
            break;
        case 10:
            spawnWave(200, 75, Math.floor(4*hp), 3*spd, 10, "pink"); //mega grouped
            break;
        case 11:
            spawnWave(15, 1500*den, Math.floor(20*hp), 6*spd, 10, "yellow"); //fast + 
            spawnWave(40, 100, Math.floor(5*hp), 3*spd, 10, "pink"); //grouped + 
            spawnWave(12, 1800*den, Math.floor(25*hp), 3*spd, 10, "red"); //armored + 
            spawnWave(20, 1000*den, Math.floor(40*hp), 3*spd, 10, "green"); //basic
            break;
        case 12:
            spawnWave(10, 2000*den, Math.floor(50*hp), 6*spd, 10, "red"); //fast / armored
            break;
        case 13:
            spawnWave(120*hp, 0, 1, 3*spd, 10, "pink"); //clump
            break;
        case 14:
            spawnWave(25, 800*den, Math.floor(50*hp), 2*spd, 15, "red"); //armored / multiple
            break;
        case 15:
            var boss = new Enemy(spawnPoint()[0], spawnPoint()[1], Math.floor(10000*hp), 0.4*spd, spawnDirection(), 50, "black");
            enemies.push(boss);
            if(difficulty != 1){//no minions for easy
                spawnWave(10, 1000*den, Math.floor(10*hp), 3*spd, 7.5*spd, "red", boss); //minions
            }
            break;
        default:
            spawnWave(25, (750-round*10)*den, Math.floor((round * 20-150)*hp), (3.5+round/20)*spd, 10, "black"); //endless
            break;
    }
}


//helper function for drawing lines found on https://www.javascripttutorial.net/web-apis/javascript-draw-line/
function drawLine(ctx, begin :number[], end :number[], stroke = 'black', width = 1) {
    if (stroke) {
        ctx.strokeStyle = stroke;
    }

    if (width) {
        ctx.lineWidth = width;
    }

    ctx.beginPath();
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.stroke();
    ctx.fillStyle = "black";
}

//deselects towers on escape press
document.addEventListener('keydown', function(event){
	if(event.key === "Escape"){
        towers.forEach(function (tower, index) {
            tower.selected = 0;
        });
        selectedTower = "none";
	}
});

//finds where to spawn the enemies
function spawnPoint() :number[]{
    var point :number[] = [];
    var x = 0;
    var y = 0;
    if (paths[0][0] == 0) { // left enterance
        x = -10;
        y = (canvas.height / 100) * paths[0][1] + 25;
    }
    else if (paths[0][1] == 0) { // top enterance
        x = (canvas.width / 100) * paths[0][0] + 25;
        y = -10;
    }
    else if (paths[0][1] == 100) { // bottom enterance
        x = (canvas.width / 100) * paths[0][0] + 25;
        y = canvas.height + 10;
    }
    else { //right enterance 
        x = canvas.width + 100;
        y = (canvas.height / 100) * paths[0][1] + 25;
    }
    point[0]=x;
    point[1]=y;
    return point;
}
//finds what direction enemies start with
function spawnDirection() :string{
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

function choosepath(i :number){
    var paths = [[]];
    switch(i){
        case 0:
            // basic path
            paths = [[0, 40], [20, 40], [20, 80], [40, 80], [40, 60], [70 ,60], [70, 20], [50, 20], [50, 0]];
            break;
        case 1:
            // castle path
            paths = [[50, 100], [50, 80], [60, 80], [60, 90], [80, 90], [80, 30], [70, 30], [70, 10], [20, 10], [20, 30], [10, 30], [10, 90], [30, 90], [30, 80], [40, 80], [40, 100]];
            break;
        case 2:
            // corner path
            paths = [[0, 40], [20, 40],[20, 0]];
            break;
        case 3:
            // diamond path
            paths = [[0, 60], [20, 60]];
            var ypath=60;
            var xpath=20
            for(var i=0; i<162; i++){
                console.log(i+" "+xpath + " "+ypath);
                if(i<40){//fist quarter
                    if(i%2 == 0){
                        ypath++;
                        paths.push([xpath, ypath]);
                    }else{
                        xpath++;
                        paths.push([xpath, ypath]);
                    }
                }else if(i<80){
                    if(i%2 == 0){
                        ypath--;
                        paths.push([xpath, ypath]);
                    }else{
                        xpath++;
                        paths.push([xpath, ypath]);
                    }
                }else if(i == 80){//middle section
                    paths.push([60, 40]);
                    ypath = 40;
                }else if(i<122){
                    if(i%2 == 0){
                        ypath--;
                        paths.push([xpath, ypath]);
                    }else{
                        xpath--;
                        paths.push([xpath, ypath]);
                    }
                }else{
                    if(i%2 == 0){
                        ypath++;
                        paths.push([xpath, ypath]);
                    }else{
                        xpath--;
                        paths.push([xpath, ypath]);
                    }
                }
            }
            paths.push([0, 40]);
            break;
        case 4:
            //circle path
            paths = [[Math.cos((80*Math.PI/180))*40+40, 100], [Math.cos((80*Math.PI/180))*40+40, Math.sin(((80-1)*Math.PI/180))*40+40]];
            for(var i=80; i>-260; i--){
                if(i%2 == 0){
                    paths.push([Math.cos((i*Math.PI/180))*40+40, Math.sin(((i-1)*Math.PI/180))*40+40]);
                    console.log(i+" "+ Math.cos((i*Math.PI/180))*40+40 + " " + Math.sin(((i-1)*Math.PI/180))*40+40);
                }else{
                    paths.push([Math.cos(((i-1)*Math.PI/180))*40+40, Math.sin((i*Math.PI/180))*40+40]);
                    console.log(i+" "+ Math.cos(((i-1)*Math.PI/180))*40+40 + " " + Math.sin((i*Math.PI/180))*40+40);
                }
            }
            paths.push([Math.cos(((-260)*Math.PI/180))*40+40, 100]);
            break;
    }
    return paths;
}