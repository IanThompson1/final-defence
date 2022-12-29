//entire gui
function drawLayout() {
    //redraws the background
    // c.fillStyle = "#289E6A";
    // c.fillRect(0, 0, canvas.width, canvas.height);
    //background
    var background = new Image();
    if(difficulty < 3){
        background.src = "./img/battleground.png";
        var scal = 3;
    }else{
        background.src = "./img/stillbackground.png";
        var scal = 1;
    }
    c.drawImage(background, 0, 0, background.width*scal*scaleW, background.height*scal*scaleH);

    //@ts-ignore
    mainMenu.style.display = "none";
    //path
    c.fillStyle = "#808080";
    
    for (var i = 0; i < paths.length - 1; i++) {
        if (paths[i][0] == paths[i + 1][0] && paths[i][1] > paths[i + 1][1]) { // up 
            pathRubble((canvas.width / 100) * paths[i][0], (canvas.height / 100) * paths[i + 1][1], scaleW*75, (canvas.height / 100) * (paths[i][1] - paths[i + 1][1]) + scaleH*75);
            // c.fillRect((canvas.width / 100) * paths[i][0], (canvas.height / 100) * paths[i + 1][1], scaleW*75, (canvas.height / 100) * (paths[i][1] - paths[i + 1][1]) + scaleH*75);
        }
        else if (paths[i][0] == paths[i + 1][0] && paths[i][1] < paths[i + 1][1]) { // down
            pathRubble((canvas.width / 100) * paths[i][0], (canvas.height / 100) * paths[i][1], scaleW*75, (canvas.height / 100) * (paths[i + 1][1] - paths[i][1]) + scaleH*75);
            // c.fillRect((canvas.width / 100) * paths[i][0], (canvas.height / 100) * paths[i][1], scaleW*75, (canvas.height / 100) * (paths[i + 1][1] - paths[i][1]) + scaleH*75);
        }
        else if (paths[i][1] == paths[i + 1][1] && paths[i][0] > paths[i + 1][0]) { // left
            pathRubble((canvas.width / 100) * paths[i + 1][0], (canvas.height / 100) * paths[i][1], (canvas.width / 100) * (paths[i][0] - paths[i + 1][0]), scaleH*75);
            // c.fillRect((canvas.width / 100) * paths[i + 1][0], (canvas.height / 100) * paths[i][1], (canvas.width / 100) * (paths[i][0] - paths[i + 1][0]), scaleH*75);
        }
        else if (paths[i][1] == paths[i + 1][1] && paths[i][0] < paths[i + 1][0]) { // right
            pathRubble((canvas.width / 100) * paths[i][0], (canvas.height / 100) * paths[i][1], (canvas.width / 100) * (paths[i + 1][0] - paths[i][0]), scaleH*75);
            // c.fillRect((canvas.width / 100) * paths[i][0], (canvas.height / 100) * paths[i][1], (canvas.width / 100) * (paths[i + 1][0] - paths[i][0]), scaleH*75);
        }
    }
    //wave entrance arrow 
    // if(round == 0){
    //     c.fillStyle = "green";
    //     c.ellipse(spawnPoint()[0]+50,spawnPoint()[1],10,10,0,0,180);
    //     c.stroke();
    // }
    //menu background
    c.fillStyle = "#A6A6A6";
    c.lineWidth = 1;
    c.fillRect(canvas.width - canvas.width / 7.5, 0, canvas.width / 7.5, canvas.height);
    c.strokeRect(canvas.width - canvas.width / 7.5, 0, canvas.width / 7.5, canvas.height);
    //boxes
    for (var i = 0; i < numboxes; i++) {
        if (i % 2 == 0 && i < numboxes - 2) {
            c.strokeRect(canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (i / 2), (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2));
        }
        else if (i < numboxes - 2) {
            c.strokeRect(canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * ((i - 1) / 2), (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2));
        }
        else {
            //startwave button
            c.fillStyle = "#2CF721";
            c.fillRect(canvas.width - canvas.width / 7.5 + 2.5, canvas.height - canvas.height / (numboxes / 2) + 2.5, (canvas.width / 7.5) - 5, canvas.height / (numboxes / 2) - 5);
            addText(autostart.toString(), canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 4, canvas.height / (numboxes / 2) * (16 / 2), "black", numboxes, 1, 0.2);
            c.fillStyle = "#A6A6A6";
        }
    }
    //lives / money
    addDoubleText("Money", Math.floor(totalmoney).toString(), canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (0 / 2), "green", numboxes);
    addDoubleText("Lives", lives.toString(), canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (0 / 2), "red", numboxes);
    //placing towers button
    addText(placingTowers.toString(), canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (14 / 2), "black", numboxes);
    //speed button
    addText("Speed:"+speedModifier, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (14 / 2),"yellow",numboxes);
    //wave hints
    if (round == 6 || round == 14 || round == 24 || round == 30) {
        c.fillStyle = "red";
    }
    else {
        c.fillStyle = "black";
    }
    var hint = "";
    var bonusHint = "";
    switch (round) {
        case 0:
            hint = "easy";
            bonusHint = "you get 100 bonus cash at the end of each round";
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
            hint = "shielded";
            break;
        case 6:
            hint = "mini-boss round!";
            bonusHint = "Shields take a certain # of hits to destroy. STRONG AGAINST LASERS";
            break;
        case 7:
            hint = "fast on grouped";
            bonusHint = "Enemies with "+"\uD83D\uDEE1\uFE0F"+" take "+"\uD83D\uDEE1\uFE0F"+" less damage from your attacks";
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
            hint = "spawner boss";
            break;
        case 15:
            hint = "fast";
            bonusHint = "Bosses are immune to slows";
            break;
        case 16:
            hint = "grouped";
            break;
        case 17:
            hint = "tanks";
            break;
        case 18:
            hint = "armored";
            break;
        case 19:
            hint = "fast-armored-grouped-tanks";
            break;
        case 20:
            hint = "fast-armored on grouped-tanks";
            break;
        case 21:
            hint = "stacks";
            break;
        case 22:
            hint = "super shielded";
            break;
        case 23:
            hint = "everything again";
            bonusHint = "these shields take 100 hits to destroy";
            break;
        case 24:
            hint = "armored boss";
            break;
        case 25:
            hint = "light armor grouped";
            break;
        case 26:
            hint = "super speed";
            break;
        case 27:
            hint = "max armored";
            break;
        case 28:
            hint = "mega grouped revenge";
            break;
        case 29:
            hint = "matryoshka";
            break;
        case 30:
            hint = "doomboss";
            break;
        case 31:
            hint = "armored";
            break;
        case 32:
            hint = "the one that got away";
            break;
        case 33:
            hint = "free cash!";
            break;
        case 34:
            hint = "ALL OF THE BOSSES AT ONCE";
            break;
        default:
            hint = "endless good luck";
            break;
    }
    c.font = "40px serif";
    c.textAlign = "left";
    c.fillText("Next wave: " + hint, 0, 100);
    c.stroke();
    //current wave 
    if (round == 7 || round == 15) {
        c.fillStyle = "red";
    }
    else {
        c.fillStyle = "black";
    }
    c.font = "40px serif";
    c.textAlign = "left";
    c.fillText("Wave# " + round+" "+bonusHint, 0, 50);
    c.stroke();
    
    //towers
    if(menutype == 0){
        addDoubleText("Sniper", "Cost: 100", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, canAfford(100));
        addDoubleText("MiniGun", "Cost: 80", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, canAfford(80));
        addDoubleText("Farm", "Cost: 250", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes, canAfford(250));
        addDoubleText("laser", "Cost: 150", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes, canAfford(150));
        addDoubleText("Slow", "Cost: 200", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes, canAfford(200));
        addDoubleText("Tesla", "Cost: 150", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes, canAfford(150));
        addDoubleText("Bomb", "Cost: 100", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes, canAfford(100));
        addDoubleText("Super", "Cost: 2000", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes, canAfford(2000));
        addDoubleText("Buffer", "Cost: 400", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(400));
        addDoubleText("Railgun", "Cost: 600", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(600));
    }
    function canAfford(cost) {
        if (cost <= totalmoney) {
            return "green";
        }
        else {
            return "red";
        }
    }
    //selected tower info
    for (var i = 0; i < towers.length; i++) {
        if (towers[i].selected == 1) {
            if (towers[i].type == "Sniper" && towers[i].level<5) { //level 1-4 Sniper
                addDoubleText(towers[i].type, "level:"+towers[i].level, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].damage, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "Slow", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "Long", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("Level:"+(towers[i].level+1), canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                towers.push(new Tower(-100,-100,"Sniper",towers[i].level+1,0));
                towers[towers.length-1].update();
                addDoubleText("Damage", towers[towers.length-1].damage, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                towers.splice(towers.length-1,1);
                addDoubleText("", "", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("", "", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost:"+towers[i].cost[towers[i].level], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(towers[i].cost[towers[i].level]));
            }
            else if (towers[i].type == "Sniper" && towers[i].level == 5) { //level 5 Sniper
                addDoubleText("Sniper", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].damage, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "Slow", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "Long", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Armor", "Piercing", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Mega", "Damage", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Upgrade", "Cost:"+towers[i].cost[5], canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[5]));
                addDoubleText("Upgrade", "Cost:"+towers[i].cost[6], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[6]));
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxBasic", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "Sniper" && towers[i].level > 5) { //max Sniper
                addDoubleText("Sniper", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].damage, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "Slow", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "Long", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
                if(towers[i].level == 6){
                    addDoubleText("Armor", "Damage:100", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                }
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxSniper", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "Minigun" && towers[i].level < 5) { //level 1-4 minigun
                addDoubleText("MiniGun", "level:"+towers[i].level, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].damage, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "Fast", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "Short", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("level:"+(towers[i].level+1), canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                towers.push(new Tower(-100,-100,"Minigun",towers[i].level+1,0));
                towers[towers.length-1].update();
                addDoubleText("Damage", towers[towers.length-1].damage, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                towers.splice(towers.length-1,1);
                addDoubleText("", "", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("", "", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost:"+towers[i].cost[towers[i].level], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(towers[i].cost[towers[i].level]));
            }
            else if (towers[i].type == "Minigun" && towers[i].level == 5) { //level 5 minigun
                addDoubleText("MiniGun", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].damage, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "Fast", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "Short", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Double", "Shot", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("High", "Damage", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Upgrade", "Cost:"+towers[i].cost[5], canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[5]));
                addDoubleText("Upgrade", "Cost:"+towers[i].cost[6], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[6]));
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxBasic", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "Minigun" && towers[i].level > 5) { //max minigun
                addDoubleText("MiniGun", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                if(towers[i].level == 6){
                    addDoubleText("Damage", towers[i].damage+"x2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                }else{
                    addDoubleText("Damage", "15", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                }
                addDoubleText("Speed", "VeryFast", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "Short", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxMiniGun", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "laser" && towers[i].level < 5) { //level 1-4 laser
                addDoubleText("Laser", "level:"+towers[i].level, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].lasermin+"->"+towers[i].lasermax, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("HeatUp", towers[i].heatup, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "Medium", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("level:"+(towers[i].level+1), canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                towers.push(new Tower(-100,-100,"laser",towers[i].level+1,0));
                towers[towers.length-1].update();
                addDoubleText("Damage", towers[towers.length-1].lasermin+"->"+towers[towers.length-1].lasermax, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("HeatUp", towers[towers.length-1].heatup, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                towers.splice(towers.length-1,1);
                addDoubleText("", "", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost:"+towers[i].cost[towers[i].level], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(towers[i].cost[towers[i].level]));
            }
            else if (towers[i].type == "laser" && towers[i].level == 5) { //level 5 laser
                addDoubleText("Laser", "level:"+towers[i].level, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].lasermin+"->"+towers[i].lasermax, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("HeatUp", towers[i].heatup, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "Medium", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Multi", "Target", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Super", "Laser", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Upgrade", "Cost:"+towers[i].cost[5], canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[5]));
                addDoubleText("Upgrade", "Cost:"+towers[i].cost[6], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[6]));
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxBasic", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "laser" && towers[i].level > 5) { //max laser
                addDoubleText("Laser", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                if(towers[i].level == 6){
                    addDoubleText("Damage", towers[i].lasermax+"x5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                }else{
                    addDoubleText("Damage", towers[i].lasermin+"->"+towers[i].lasermax, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);   
                }
                addDoubleText("HeatUp", towers[i].heatup, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "Medium", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxLaser", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "tesla" && towers[i].level < 5) { //level 1-4 Tesla
                addDoubleText("Tesla", "level:"+towers[i].level, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].damage, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("NumTargets", ""+towers[i].numTargets, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);                
                addDoubleText("Speed", "Medium", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
                addDoubleText("Range", "Medium", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("Level:"+(towers[i].level+1), canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                towers.push(new Tower(-100,-100,"tesla",towers[i].level+1,0));
                towers[towers.length-1].update();
                addDoubleText("Damage", towers[towers.length-1].damage, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("NumTargets", towers[towers.length-1].numTargets, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                towers.splice(towers.length-1,1);
                addDoubleText("", "", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost:"+towers[i].cost[towers[i].level], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(towers[i].cost[towers[i].level]));
            }
            else if (towers[i].type == "tesla" && towers[i].level == 5) { //level 5 Tesla
                addDoubleText("Tesla", "level:"+towers[i].level, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].damage, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("NumTargets", ""+towers[i].numTargets, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);                
                addDoubleText("Speed", "Medium", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
                addDoubleText("Range", "Medium", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Multi", "Target", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("No", "Charge", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Upgrade", "Cost:"+towers[i].cost[5], canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[5]));
                addDoubleText("Upgrade", "Cost:"+towers[i].cost[6], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[6]));
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxBasic", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "tesla" && towers[i].level > 5) { //max Tesla
                addDoubleText("Tesla", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].damage, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                if(towers[i].level == 6){//multi
                    addDoubleText("NumTargets", ""+towers[i].numTargets, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);                
                    addDoubleText("Speed", "Medium", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
                }else{//super laser
                    addDoubleText("NumTargets", ""+towers[i].numTargets, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);                
                    addDoubleText("Speed", "VeryFast", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
                }
                addDoubleText("Range", "Medium", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxTesla", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "farm" && towers[i].level < 7) { //level 1-6 Farm
                addDoubleText("Farm", "level:"+towers[i].level, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Income", towers[i].income, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Generated", towers[i].generated, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                
                addDoubleText("Farm", "level:"+(towers[i].level+1), canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                towers.push(new Tower(-100,-100,"farm",towers[i].level+1,0));
                towers[towers.length-1].update();
                addDoubleText("Income", towers[towers.length-1].income, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                towers.splice(towers.length-1,1);
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost:"+towers[i].cost[towers[i].level], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(towers[i].cost[towers[i].level]));
            }
            else if (towers[i].type == "farm" && towers[i].level == 7) { //max Farm
                addDoubleText("Farm", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Income", towers[i].income, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Generated", towers[i].generated, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxFarm", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "ice" && towers[i].level < 5) { //level 1-4 ice
                addDoubleText("Ice", "level:"+towers[i].level, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", "Area", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Slow", towers[i].slow+"%", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "Short", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);

                addDoubleText("Ice", "level:"+(towers[i].level+1), canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                towers.push(new Tower(-100,-100,"ice",towers[i].level+1,0));
                towers[towers.length-1].update();
                addDoubleText("Slow", towers[towers.length-1].slow+"%", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                towers.splice(towers.length-1,1);
                addDoubleText("", "", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("", "", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost:"+towers[i].cost[towers[i].level], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(towers[i].cost[towers[i].level]));
            }
            else if (towers[i].type == "ice" && towers[i].level == 5) { //level 5 ice
                addDoubleText("Ice", "level:"+towers[i].level, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", "Area", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Slow", towers[i].slow+"%", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "Short", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);

                addDoubleText("Big", "Range", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Max", "Slow", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Upgrade", "Cost:"+towers[i].cost[5], canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[5]));
                addDoubleText("Upgrade", "Cost:"+towers[i].cost[6], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[6]));
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxBasic", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "ice" && towers[i].level > 5) { //max ice
                addDoubleText("Ice", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", "Area", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Slow", towers[i].slow+"%", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                if(towers[i].level == 6){
                    addDoubleText("Range", "Medium", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                }else{
                    addDoubleText("Range", "Short", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                }
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxIce", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "bomb" && towers[i].level < 5) { //level 1-4 Bomb
                addDoubleText("Bomb", "level:"+towers[i].level, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].damage, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "Short", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Splash", "Medium", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
                addDoubleText("Pierce", towers[i].pierce, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("level:"+(towers[i].level+1), canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                towers.push(new Tower(-100,-100,"bomb",towers[i].level+1,0));
                towers[towers.length-1].update();
                addDoubleText("Damage", towers[towers.length-1].damage, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Pierce", towers[towers.length-1].pierce, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                towers.splice(towers.length-1,1);
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost:"+towers[i].cost[towers[i].level], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(towers[i].cost[towers[i].level]));
            }
            else if (towers[i].type == "bomb" && towers[i].level == 5) { //level 5 Bomb
                addDoubleText("Bomb", "level:"+towers[i].level, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].damage, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "Short", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Splash", "Medium", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
                addDoubleText("Pierce", towers[i].pierce, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Big", "Splash", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Max", "Damage", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Upgrade", "Cost:"+towers[i].cost[5], canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[5]));
                addDoubleText("Upgrade", "Cost:"+towers[i].cost[6], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[6]));
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxBasic", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "bomb" && towers[i].level > 5) { //max Bomb
                addDoubleText("Bomb", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].damage, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "Short", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                if(towers[i].level == 6){
                    addDoubleText("Splash", "Large", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
                }else{
                    addDoubleText("Splash", "Medium", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
                }
                addDoubleText("Pierce", towers[i].pierce, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxBomb", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "super" && towers[i].level < 5) { //level 1-4 Super
                addDoubleText("Super", "level:"+towers[i].level, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].damage, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                if(towers[i].level == 4){
                    addDoubleText("Speed", "VeryFast", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                }else{
                    addDoubleText("Speed", "Fast", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                }
                addDoubleText("Range", "Long", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
                addText("Level:"+(towers[i].level+1), canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                towers.push(new Tower(-100,-100,"super",towers[i].level+1,0));
                towers[towers.length-1].update();
                if(towers[i].level == 3){
                    addDoubleText("Speed", "VeryFast", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                }else{
                    addDoubleText("Damage", towers[towers.length-1].damage, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                }
                towers.splice(towers.length-1,1);
                addDoubleText("", "", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("", "", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost:"+towers[i].cost[towers[i].level], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(towers[i].cost[towers[i].level]));
            }
            else if (towers[i].type == "super" && towers[i].level == 5) { //level 5 Super
                addDoubleText("Super", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].damage, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "Long", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "VeryFast", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Seeking", "Attack", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Ultimate", "Power", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Upgrade", "Cost:"+towers[i].cost[5], canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[5]));
                addDoubleText("Upgrade", "Cost:"+towers[i].cost[6], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[6]));
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxBasic", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "super" && towers[i].level > 5) { //max Super
                addDoubleText("Super", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].damage, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "Long", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "VeryFast", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxSuper", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "buffer" && towers[i].level == 1) { //level 1 Buffer
                addDoubleText("Buffer", "level:1", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Range", "1.2", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("", "", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("", "", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);

                addDoubleText("Buffer", "level:2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "1.2", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost:"+towers[i].cost[towers[i].level], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(towers[i].cost[towers[i].level]));
            }
            else if (towers[i].type == "buffer" && towers[i].level == 2) { //level 2 Buffer
                addDoubleText("Buffer", "level:2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Range", "1.2", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Speed", "1.2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("", "", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);

                addDoubleText("Buffer", "level:3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "+5", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost:"+towers[i].cost[towers[i].level], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(towers[i].cost[towers[i].level]));
            }
            else if (towers[i].type == "buffer" && towers[i].level == 3) { //level 3 Buffer
                addDoubleText("Buffer", "level:3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Range", "1.2", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Speed", "1.2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Damage", "+5", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);

                addDoubleText("Buffer", "level:4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Pierce", "+1 OR x1.2", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Pierce", "Doesnt", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "red", numboxes);
                addDoubleText("Affect", "Laser/Tesla", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "red", numboxes);                
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost:"+towers[i].cost[towers[i].level], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(towers[i].cost[towers[i].level]));
            }
            else if (towers[i].type == "buffer" && towers[i].level == 4) { //level 4 Buffer
                addDoubleText("Buffer", "level:4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Range", "1.2", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Speed", "1.2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Damage", "+5", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Pierce", "+1 OR x1.5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Buffer", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "x1.2", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost:"+towers[i].cost[towers[i].level], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(towers[i].cost[towers[i].level]));
            }
            else if (towers[i].type == "buffer" && towers[i].level == 5) { //level 5 Buffer
                addDoubleText("Buffer", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Range", "1.2", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Speed", "1.2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Damage", "+5", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Pierce", "+1 OR x1.5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
                addDoubleText("Damage", "x1.2", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxBuffer", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "railgun" && towers[i].level < 5) { //level 1-4 Railgun
                addDoubleText("Railgun", "level:"+towers[i].level, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].damage, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "VerySlow", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "Long", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
                addDoubleText("Pierce", towers[i].pierce, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("Level:"+(towers[i].level+1), canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                towers.push(new Tower(-100,-100,"railgun",towers[i].level+1,0));
                towers[towers.length-1].update();
                addDoubleText("Damage", towers[towers.length-1].damage, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Pierce", towers[towers.length-1].pierce, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);                
                towers.splice(towers.length-1,1);
                addDoubleText("", "", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost:"+towers[i].cost[towers[i].level], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(towers[i].cost[towers[i].level]));
            }
            else if (towers[i].type == "railgun" && towers[i].level == 5) { //level 5 Railgun
                addDoubleText("Railgun", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].damage, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "VerySlow", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "Long", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
                addDoubleText("Pierce", towers[i].pierce, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Fast", "Attack", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Ultimate", "Shot", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Upgrade", "Cost:"+towers[i].cost[5], canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[5]));
                addDoubleText("Upgrade", "Cost:"+towers[i].cost[6], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[6]));
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxBasic", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "railgun" && towers[i].level > 5) { //max Railgun
                addDoubleText("Railgun", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].damage, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                if(towers[i].level == 6){
                    addDoubleText("Speed", "Slow", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                }else{
                    addDoubleText("Speed", "VerySlow", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                }
                addDoubleText("Range", "Long", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
                addDoubleText("Pierce", towers[i].pierce, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxRail", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
        }
    }
    c.lineWidth = 1;
    //help box
    var temptowertype = "none";
    var temptowerlevel = 0;
    for(var i=0; i<towers.length; i++){
        if(towers[i].selected == 1){
            temptowertype = towers[i].type;
            temptowerlevel = towers[i].level;
        }
    }
    if((mouseover != "none" && mouseover != "upgrade" && mouseover != "sell" && mouseover != "startWave" && (temptowertype != "farm" || temptowerlevel != 5) && (temptowertype != "farm" || mouseover != "target") && (temptowertype != "ice" || mouseover != "target") && (temptowertype != "buffer" || mouseover != "target") && (temptowertype != "buffer" || temptowerlevel != 5)) || selectedTower != "none"){
        c.fillStyle = "white";
        c.fillRect(canvas.width - 2*(canvas.width / 7.5),0,canvas.width / 7.5, canvas.height / (numboxes / 4));
    }
    switch(mouseover){
        case "target":
            if(temptowertype != "farm" && temptowertype != "ice" && temptowertype != "buffer"){
                addText("Toggles Between",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                addText("Tower Targets",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            }
            break;
        case "Sniper":
            addText("Long range, Slow attack",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("Damage:5",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "Minigun":
            addText("Short range, Fast attack",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("Damage:1",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "laser":
            addText("Heatup for high attack",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("Weak against shields",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "tesla":
            addText("Multi attack, has to charge",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("Damage:2, Speed:Medium",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "farm":
            addText("Generates money at the end",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("of each round. Income:50",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "ice":
            addText("Slows enemies in range",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("Slow 20% Damage:0",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "bomb":
            addText("Splash damage",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("Pierce:10 Damage:1",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "super":
            addText("High damage, Fast attack",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("Damage:10",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "buffer":
            addText("Gives buffs to",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("towers in range",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "railgun":
            addText("Slow line attack",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("Pierce:10 Damage:50",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "towerPlacement":
            addText("toggles how you",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("place towers",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "speed":
            addText("toggles game speed",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("only works between rounds",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "level6":
            switch(temptowertype){
                case "Sniper": 
                    addText("Double damage to armored",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:50",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "Minigun": 
                    addText("2 Cannons, VeryFast",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:5",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "laser": 
                    addText("up to 5 Targets",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Only deals 5 Damage",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "tesla": 
                    addText("Up to 10 Targets",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:20",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "ice":
                    addText("large Range",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Slow 60%",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "bomb":
                    addText("Bigger Splash",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Pierce:50, Damage:20",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "super":
                    addText("Attack seek enemies",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:400",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "railgun":
                    addText("Speed Slow",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:1000",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
            }
            break;
        case "level7":
            switch(temptowertype){
                case "Sniper": 
                    addText("Max Damage",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:200",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "Minigun": 
                    addText("Big Damage, VeryFast",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:15",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "laser": 
                    addText("Single Target Beast",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("MaxDamage:70",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "tesla": 
                    addText("1 target, No Charge",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:20, Speed VeryFast",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "ice":
                    addText("Max Slow",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Slow 80%",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "bomb":
                    addText("Max Damage",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Pierce:50, Damage:50",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "super":
                    addText("Max Damage",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:1000",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "railgun":
                    addText("Max Damage",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:2000",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
            }
            break;
    }
    if(selectedTower != "none"){
        addText("Press Esc",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
        addText("To Cancel",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
    }
}

function addText(text, x, y, color, numboxes, double, size) {
    if (double === void 0) { double = 2; }
    if(size === void 0) { size = 1; }
    c.fillStyle = color;
    c.textAlign = "center";
    var font = canvas.height / (numboxes) - 2 * text.length * size + "px serif";
    c.font = font;
    c.fillText(text, x + (canvas.width / 7.5) / 4, y + canvas.height / (numboxes) + canvas.height / (numboxes) / 3, (canvas.width / 7.5) / double);
    c.stroke();
}

function addDoubleText(toptext, bottomtext, x, y, color, numboxes, color2) {
    if (color2 === void 0) { color2 = color; }
    c.fillStyle = color;
    c.textAlign = "center";
    var font = canvas.height / (numboxes) - 2 * toptext.length + "px serif";
    c.font = font;
    c.fillText(toptext, x + (canvas.width / 7.5) / 4, y + canvas.height / (numboxes) / 1.2, (canvas.width / 7.5) / 2);
    c.stroke();
    //lower text
    c.fillStyle = color2;
    var font = canvas.height / (numboxes) - 2 * bottomtext.length + "px serif";
    c.font = font;
    c.fillText(bottomtext, x + (canvas.width / 7.5) / 4, y + canvas.height / (numboxes) + canvas.height / (numboxes) / 1.5, (canvas.width / 7.5) / 2);
    c.stroke();
}

function pathRubble(x, y, w, h){ //takes a rect and fills it with random dirt blocks. 
    for(var i=0; i<w; i+=10){
        for(var j=0; j<h-10; j+=10){
            if(i+10 < w && j+10 <h){
                c.fillStyle = pathColor(pathColors[i][j]);
                c.fillRect(x+i, y+j, w-i, h-j);
            }else if(i+10 < w){
                c.fillStyle = pathColor(pathColors[i][j]);
                c.fillRect(x+i, y+j, w-i, 10);
            }else if(j+10 < h){
                c.fillStyle = pathColor(pathColors[i][j]);
                c.fillRect(x+i, y+j, 10, h-j);
            }else{
                c.fillStyle = pathColor(pathColors[i][j]);
                c.fillRect(x+i, y+j, 10, 10);
            }
        }
    }
    // c.fillStyle = "#808080";
}

function pathColor(col){
    switch(col){
        case 0: 
            return "#9B7653";
        case 1: 
            return "#94714F";
        case 2: 
            return "#826346";
        case 3: 
            return "#D19F70";
        case 4: 
            return "#6E533B";
        case 5: 
            return "#AD845D";
    }
}