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
            c.fillRect((canvas.width / 100) * paths[i][0], (canvas.height / 100) * paths[i + 1][1], scaleW*75, (canvas.height / 100) * (paths[i][1] - paths[i + 1][1]) + scaleH*75);
        }
        else if (paths[i][0] == paths[i + 1][0] && paths[i][1] < paths[i + 1][1]) { // down
            c.fillRect((canvas.width / 100) * paths[i][0], (canvas.height / 100) * paths[i][1], scaleW*75, (canvas.height / 100) * (paths[i + 1][1] - paths[i][1]) + scaleH*75);
        }
        else if (paths[i][1] == paths[i + 1][1] && paths[i][0] > paths[i + 1][0]) { // left
            c.fillRect((canvas.width / 100) * paths[i + 1][0], (canvas.height / 100) * paths[i][1], (canvas.width / 100) * (paths[i][0] - paths[i + 1][0]), scaleH*75);
        }
        else if (paths[i][1] == paths[i + 1][1] && paths[i][0] < paths[i + 1][0]) { // right
            c.fillRect((canvas.width / 100) * paths[i][0], (canvas.height / 100) * paths[i][1], (canvas.width / 100) * (paths[i + 1][0] - paths[i][0]), scaleH*75);
        }
    }
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
    //current wave 
    if (round == 7 || round == 15) {
        c.fillStyle = "red";
    }
    else {
        c.fillStyle = "white";
    }
    c.font = "60px serif";
    c.textAlign = "left";
    c.fillText("Wave# " + round, 0, 50);
    c.stroke();
    //next wave hints
    if (round == 6 || round == 14 || round == 24 || round == 30) {
        c.fillStyle = "red";
    }
    else {
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
            hint = "spawner boss";
            break;
        case 15:
            hint = "fast";
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
            hint = "super armored";
            break;
        case 23:
            hint = "everything again";
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
        default:
            hint = "endless good luck";
            break;
    }
    c.font = "60px serif";
    c.textAlign = "left";
    c.fillText("Next wave: " + hint, 0, 100);
    c.stroke();
    
    //towers
    if(menutype == 0){
        addDoubleText("Sniper", "Cost: 100", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, canAfford(100));
        addDoubleText("MiniGun", "Cost: 80", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, canAfford(80));
        addDoubleText("Farm", "Cost: 300", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes, canAfford(300));
        addDoubleText("laser", "Cost: 150", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes, canAfford(150));
        addDoubleText("Slow", "Cost: 200", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes, canAfford(200));
        addDoubleText("Tesla", "Cost: 150", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes, canAfford(150));
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
            if (towers[i].type == "sniper" && towers[i].level == 1) { //level 1 sniper
                addDoubleText("Sniper", "level:1", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "75", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "25", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Sniper", "level:2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "5 -> 10", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "75", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "25->30", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:70", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 110", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(110));
            }
            else if (towers[i].type == "sniper" && towers[i].level == 2) { //level 2 sniper
                addDoubleText("Sniper", "level:2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "10", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "75", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "30", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Sniper", "level:3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "10->20", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "75", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "30->35", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:140", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 150", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(150));
            }
            else if (towers[i].type == "sniper" && towers[i].level == 3) { //level 3 sniper
                addDoubleText("Sniper", "level:3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "20", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "75", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "35", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Sniper", "level:4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "20->30", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "75", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "35->40", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:240", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 200", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(200));
            }
            else if (towers[i].type == "sniper" && towers[i].level == 4) { //level 4 sniper
                addDoubleText("Sniper", "level:4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "30", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "75", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "40", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Sniper", "level5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "30->40", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "75", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "40->45", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:380", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 250", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(250));
            }
            else if (towers[i].type == "sniper" && towers[i].level == 5) { //level 5 sniper
                addDoubleText("Sniper", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "40", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "75", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "45", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Armor", "Piercing", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Mega", "Damage", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Upgrade", "Cost: 400", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(400));
                addDoubleText("Upgrade", "Cost: 800", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(800));
                addText("sell:540", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxBasic", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "sniper" && towers[i].level == 6) { //level 6 sniper
                addDoubleText("Sniper", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "50", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "75", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "50", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Armor", "Damage:100", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addText("sell:810", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxSniper", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "sniper" && towers[i].level == 7) { //level 7 sniper
                addDoubleText("Sniper", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "200", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "100", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "50", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("sell:1080", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxSniper", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "machinegun" && towers[i].level == 1) { //level 1 minigun
                addDoubleText("MiniGun", "level:1", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "1", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "20", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "13", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("MiniGun", "level:2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "1->(1-2)", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "20->15", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "13->14", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:60", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 100", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(100));
            }
            else if (towers[i].type == "machinegun" && towers[i].level == 2) { //level 2 minigun
                addDoubleText("MiniGun", "level:2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "(1-2)", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "15", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "14", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("MiniGun", "level:3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "(1-2)->2", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "15->10", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "14->15", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:120", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 120", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(120));
            }
            else if (towers[i].type == "machinegun" && towers[i].level == 3) { //level 3 minigun
                addDoubleText("MiniGun", "level:3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "10", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "15", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("MiniGun", "level:4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "2->3", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "10->9", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "15->16", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:200", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 150", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(150));
            }
            else if (towers[i].type == "machinegun" && towers[i].level == 4) { //level 4 minigun
                addDoubleText("MiniGun", "level:4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "9", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "16", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("MiniGun", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "3->4", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "9->8", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "16->17", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:300", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 200", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(200));
            }
            else if (towers[i].type == "machinegun" && towers[i].level == 5) { //level 5 minigun
                addDoubleText("MiniGun", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "8", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "17", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Double", "Shot", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("High", "Damage", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Upgrade", "Cost: 650", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(650));
                addDoubleText("Upgrade", "Cost: 650", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(650));
                addText("sell:440", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxBasic", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "machinegun" && towers[i].level == 6) { //level 6 minigun
                addDoubleText("MiniGun", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "4x2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "6", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "18", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("sell:870", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxMiniGun", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "machinegun" && towers[i].level == 7) { //level 7 minigun
                addDoubleText("MiniGun", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "10", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "6", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "18", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("sell:870", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxMiniGun", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "laser" && towers[i].level == 1) { //level 1 laser
                addDoubleText("Laser", "level:1", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "1->10", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("HeatUp", "0.5", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "17", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Laser", "level:2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "(1-10)->(1-20)", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("HeatUp", "0.5->0.6", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "17->18", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:100", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 200", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(200));
            }
            else if (towers[i].type == "laser" && towers[i].level == 2) { //level 2 laser
                addDoubleText("Laser", "level:2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "1->20", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("HeatUp", "0.6", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "18", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Laser", "level:3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "(1-20)->(1-30)", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("HeatUp", "0.6->0.7", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "18->19", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:240", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 250", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(250));
            }
            else if (towers[i].type == "laser" && towers[i].level == 3) { //level 3 laser
                addDoubleText("Laser", "level:3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "1->30", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("HeatUp", "0.7", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "19", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Laser", "level:4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "(1-30)->(1->40)", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("HeatUp", "0.7->0.8", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "19->20", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:400", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 300", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(300));
            }
            else if (towers[i].type == "laser" && towers[i].level == 4) { //level 4 laser
                addDoubleText("Laser", "level:4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "1->40", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("HeatUp", "0.8", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "20", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Laser", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "(1-40)->(1->50)", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("HeatUp", "0.8->1", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "20->21", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:600", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 350", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(350));
            }
            else if (towers[i].type == "laser" && towers[i].level == 5) { //level 5 laser
                addDoubleText("Laser", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "1->50", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("HeatUp", "1", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "21", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Multi", "Target", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Super", "Laser", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Upgrade", "Cost: 850", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(850));
                addDoubleText("Upgrade", "Cost: 900", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(900));
                addText("sell:840", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxBasic", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "laser" && towers[i].level == 6) { //level 6 laser
                addDoubleText("Laser", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "10x5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("HeatUp", "0", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "22", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("sell:1400", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxLaser", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "laser" && towers[i].level == 7) { //level 7 laser
                addDoubleText("Laser", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "5->70", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("HeatUp", "2", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "21", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("sell:1440", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxLaser", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "tesla" && towers[i].level == 1) { //level 1 Tesla
                addDoubleText("Tesla", "level:1", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("MaxCharge", "18", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "17", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Tesla", "level:2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "2->4", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("MaxCharge", "18->24", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "17->18", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:100", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 200", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(200));
            }
            else if (towers[i].type == "tesla" && towers[i].level == 2) { //level 2 Tesla
                addDoubleText("Tesla", "level:2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("MaxCharge", "24", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "18", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Tesla", "level:3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "4->6", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("MaxCharge", "24->30", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "18->19", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:240", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 250", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(250));
            }
            else if (towers[i].type == "tesla" && towers[i].level == 3) { //level 3 Tesla
                addDoubleText("Tesla", "level:3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "6", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("MaxCharge", "30", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "19", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Tesla", "level:4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "6->8", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("MaxCharge", "30->36", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "19->20", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:400", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 300", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(300));
            }
            else if (towers[i].type == "tesla" && towers[i].level == 4) { //level 4 Tesla
                addDoubleText("Tesla", "level:4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "8", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("MaxCharge", "36", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "20", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Tesla", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "8->10", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("MaxCharge", "36->42", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "20->21", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:600", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 350", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(350));
            }
            else if (towers[i].type == "tesla" && towers[i].level == 5) { //level 5 Tesla
                addDoubleText("Tesla", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "10", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("MaxCharge", "42", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "21", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Multi", "Target", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("No", "Charge", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Upgrade", "Cost: 800", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(800));
                addDoubleText("Upgrade", "Cost: 900", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(900));
                addText("sell:840", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxBasic", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "tesla" && towers[i].level == 6) { //level 6 Tesla
                addDoubleText("Tesla", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "5x5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("MaxCharge", "150", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "21", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("sell:1370", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxTesla", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "tesla" && towers[i].level == 7) { //level 7 Tesla
                addDoubleText("Tesla", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "10", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("MaxCharge", "Infinite", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "21", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("sell:1440", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxTesla", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "farm" && towers[i].level == 1) { //level 1 Farm
                addDoubleText("Farm", "level:1", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Income", "50", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Generated", towers[i].generated, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                
                addDoubleText("Farm", "level:2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Income", "120", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addText("sell:200", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 400", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(400));
            }
            else if (towers[i].type == "farm" && towers[i].level == 2) { //level 2 Farm
                addDoubleText("Farm", "level:2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Income", "120", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Generated", towers[i].generated, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                
                addDoubleText("Farm", "level:3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Income", "210", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addText("sell:470", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 500", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(500));
            }
            else if (towers[i].type == "farm" && towers[i].level == 3) { //level 3 Farm
                addDoubleText("Farm", "level:3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Income", "210", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Generated", towers[i].generated, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                
                addDoubleText("Farm", "level:4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Income", "320", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addText("sell:800", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 600", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(600));
            }
            else if (towers[i].type == "farm" && towers[i].level == 4) { //level 4 Farm
                addDoubleText("Farm", "level:4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Income", "320", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Generated", towers[i].generated, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                
                addDoubleText("Farm", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Income", "450", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addText("sell:1200", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 700", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(700));
            }
            else if (towers[i].type == "farm" && towers[i].level == 5) { //level 5 Farm
                addDoubleText("Farm", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Income", "450", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Generated", towers[i].generated, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                
                addDoubleText("Farm", "level:6", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Income", "600", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addText("sell:1670", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 800", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(800));
            }
            else if (towers[i].type == "farm" && towers[i].level == 6) { //level 6 Farm
                addDoubleText("Farm", "level:6", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Income", "600", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Generated", towers[i].generated, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                
                addDoubleText("Farm", "level:7", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Income", "770", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addText("sell:2200", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 900", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(900));
            }
            else if (towers[i].type == "farm" && towers[i].level == 7) { //level 7 Farm
                addDoubleText("Farm", "level:7", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Income", "770", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Generated", towers[i].generated, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                
                addText("sell:2800", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxFarm", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "ice" && towers[i].level == 1) { //level 1 ice
                addDoubleText("Ice", "level:1", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", "Area", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Slow", "20%", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "12", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);

                addDoubleText("Ice", "level:2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Slow", "20% -> 30%", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addText("sell:140", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 120", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(120));
            }
            else if (towers[i].type == "ice" && towers[i].level == 2) { //level 2 ice
                addDoubleText("Ice", "level:2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", "Area", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Slow", "30%", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "12", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);

                addDoubleText("Ice", "level:3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Slow", "30% -> 40%", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addText("sell:220", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 150", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(150));
            }
            else if (towers[i].type == "ice" && towers[i].level == 3) { //level 3 ice
                addDoubleText("Ice", "level:3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", "Area", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Slow", "40%", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "12", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);

                addDoubleText("Ice", "level:4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Slow", "40% -> 50%", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addText("sell:320", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 180", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(180));
            }
            else if (towers[i].type == "ice" && towers[i].level == 4) { //level 4 ice
                addDoubleText("Ice", "level:4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", "Area", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Slow", "50%", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "12", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);

                addDoubleText("Ice", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Slow", "50% -> 60%", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addText("sell:440", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 220", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(220));
            }
            else if (towers[i].type == "ice" && towers[i].level == 5) { //level 5 ice
                addDoubleText("Ice", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", "Area", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Slow", "60%", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "12", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);

                addDoubleText("Big", "Range", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Max", "Slow", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Upgrade", "Cost: 500", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(500));
                addDoubleText("Upgrade", "Cost: 600", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(600));
                addText("sell:580", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxBasic", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "ice" && towers[i].level == 6) { //level 6 ice
                addDoubleText("Ice", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", "Area", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Slow", "60%", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "20", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);

                addText("sell:920", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxIce", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "ice" && towers[i].level == 7) { //level 7 ice
                addDoubleText("Ice", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", "Area", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Slow", "80%", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "12", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);

                addText("sell:980", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxIce", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
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
    if((mouseover != "none" && mouseover != "upgrade" && mouseover != "sell" && mouseover != "startWave" && (temptowertype != "farm" || temptowerlevel != 5) && (temptowertype != "farm" || mouseover != "target")) || selectedTower != "none"){
        c.fillStyle = "white";
        c.fillRect(canvas.width - 2*(canvas.width / 7.5),0,canvas.width / 7.5, canvas.height / (numboxes / 4));
    }
    switch(mouseover){
        case "target":
            if(temptowertype != "farm"){
                addText("Toggles Between",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                addText("Tower Targets",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            }
            break;
        case "sniper":
            addText("long range, slow attack",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("Damage:5",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "machinegun":
            addText("short range, fast attack",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("Damage:1",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "laser":
            addText("Heatup for high attack",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("Ignores all armor",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "tesla":
            addText("fast attack, has to charge",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("Damage:2",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "farm":
            addText("generates money at the end",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("of each round. income:50",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "ice":
            addText("Slows Enemies in range",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("Slow 20% Damage:0",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
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
                case "sniper": 
                    addText("Double damage to armored",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:50",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "machinegun": 
                    addText("2 Cannons",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:4",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "laser": 
                    addText("up to 5 Targets",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Only deals 5 Damage",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "tesla": 
                    addText("Up to 5 Targets",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:5",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "ice":
                    addText("large Range",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Slow 60%",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
            }
            break;
        case "level7":
            switch(temptowertype){
                case "sniper": 
                    addText("Slow Max Damage",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:200",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "machinegun": 
                    addText("Higher Damage",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:10",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "laser": 
                    addText("Single Target Beast",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("MaxDamage:70",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "tesla": 
                    addText("Always Max Charge",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:10",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "ice":
                    addText("Max Slow",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Slow 80%",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
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