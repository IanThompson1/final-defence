//entire gui
function drawLayout() {
    //redraws the background
    // c.fillStyle = "#289E6A";
    // c.fillRect(0, 0, canvas.width, canvas.height);
    c.drawImage(backgroundImage, 0, 0);
    //@ts-ignore
    mainMenu.style.display = "none";
    //path
    c.fillStyle = "#808080";
    for (var i = 0; i < paths.length - 1; i++) {
        if (paths[i][0] == paths[i + 1][0] && paths[i][1] > paths[i + 1][1]) { // up 
            c.fillRect((canvas.width / 100) * paths[i][0], (canvas.height / 100) * paths[i + 1][1], scaleW*50, (canvas.height / 100) * (paths[i][1] - paths[i + 1][1]) + scaleH*50);
        }
        else if (paths[i][0] == paths[i + 1][0] && paths[i][1] < paths[i + 1][1]) { // down
            c.fillRect((canvas.width / 100) * paths[i][0], (canvas.height / 100) * paths[i][1], scaleW*50, (canvas.height / 100) * (paths[i + 1][1] - paths[i][1]) + scaleH*50);
        }
        else if (paths[i][1] == paths[i + 1][1] && paths[i][0] > paths[i + 1][0]) { // left
            c.fillRect((canvas.width / 100) * paths[i + 1][0], (canvas.height / 100) * paths[i][1], (canvas.width / 100) * (paths[i][0] - paths[i + 1][0]), scaleH*50);
        }
        else if (paths[i][1] == paths[i + 1][1] && paths[i][0] < paths[i + 1][0]) { // right
            c.fillRect((canvas.width / 100) * paths[i][0], (canvas.height / 100) * paths[i][1], (canvas.width / 100) * (paths[i + 1][0] - paths[i][0]), scaleH*50);
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
    if (round == 6 || round == 14 || round == 24) {
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
            hint = "matrioshkas";
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
        addDoubleText("MiniGun", "Cost: 120", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, canAfford(120));
        // addDoubleText("Cannon", "Cost: 500", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes, canAfford(500));
        addDoubleText("laser", "Cost: 150", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes, canAfford(150));
        // addDoubleText("Burst", "Cost: 100", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes, canAfford(100));
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
                addDoubleText("Upgrade", "Cost: 500", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(500));
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
                addText("sell:540", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxSniper", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "sniper" && towers[i].level == 7) { //level 7 sniper
                addDoubleText("Sniper", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "100", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "75", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "50", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("sell:540", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxSniper", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "machinegun" && towers[i].level == 1) { //level 1 minigun
                addDoubleText("MiniGun", "level:1", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "1", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "20", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "11", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("MiniGun", "level:2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "1->(1-2)", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "20->15", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "11->12", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:80", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 150", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(150));
            }
            else if (towers[i].type == "machinegun" && towers[i].level == 2) { //level 2 minigun
                addDoubleText("MiniGun", "level:2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "(1-2)", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "15", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "12", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("MiniGun", "level:3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "(1-2)->2", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "15->10", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "12->13", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:180", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 200", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(200));
            }
            else if (towers[i].type == "machinegun" && towers[i].level == 3) { //level 3 minigun
                addDoubleText("MiniGun", "level:3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "10", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "13", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("MiniGun", "level:4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "2->3", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "10->9", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "13->14", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:320", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 250", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(250));
            }
            else if (towers[i].type == "machinegun" && towers[i].level == 4) { //level 4 minigun
                addDoubleText("MiniGun", "level:4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "9", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "14", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("MiniGun", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "3->4", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "9->8", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "14->15", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:480", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 300", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(300));
            }
            else if (towers[i].type == "machinegun" && towers[i].level == 5) { //level 5 minigun
                addDoubleText("MiniGun", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "8", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "15", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Double", "Shot", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("High", "Damage", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Upgrade", "Cost: 800", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(800));
                addDoubleText("Upgrade", "Cost: 900", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(900));
                addText("sell:680", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxBasic", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "machinegun" && towers[i].level == 6) { //level 6 minigun
                addDoubleText("MiniGun", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "4x2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "6", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "16", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("sell:680", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxMiniGun", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "machinegun" && towers[i].level == 7) { //level 7 minigun
                addDoubleText("MiniGun", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "10", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "6", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "16", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("sell:680", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxMiniGun", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "laser" && towers[i].level == 1) { //level 1 laser
                addDoubleText("Laser", "level:1", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "1->10", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("HeatUp", "0.5", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "15", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Laser", "level:2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "(1-10)->(1-20)", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("HeatUp", "0.5->0.6", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "15->16", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:100", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 200", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(200));
            }
            else if (towers[i].type == "laser" && towers[i].level == 2) { //level 2 laser
                addDoubleText("Laser", "level:2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "1->20", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("HeatUp", "0.6", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "16", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Laser", "level:3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "(1-20)->(1-30)", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("HeatUp", "0.6->0.7", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "16->17", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:240", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 300", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(300));
            }
            else if (towers[i].type == "laser" && towers[i].level == 3) { //level 3 laser
                addDoubleText("Laser", "level:3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "1->30", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("HeatUp", "0.7", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "17", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Laser", "level:4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "(1-30)->(1->40)", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("HeatUp", "0.7->0.8", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "17->18", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:440", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 350", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(350));
            }
            else if (towers[i].type == "laser" && towers[i].level == 4) { //level 4 laser
                addDoubleText("Laser", "level:4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "1->40", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("HeatUp", "0.8", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "18", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Laser", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "(1-40)->(1->50)", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("HeatUp", "0.8->1", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "18->19", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:670", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 450", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(450));
            }
            else if (towers[i].type == "laser" && towers[i].level == 5) { //level 5 laser
                addDoubleText("Laser", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "1->50", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("HeatUp", "1", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "19", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Multi", "Target", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Super", "Laser", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Upgrade", "Cost: 1000", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(1000));
                addDoubleText("Upgrade", "Cost: 1200", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(1200));
                addText("sell:970", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxBasic", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "laser" && towers[i].level == 6) { //level 6 laser
                addDoubleText("Laser", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "10x5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("HeatUp", "0", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "20", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("sell:970", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxLaser", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "laser" && towers[i].level == 7) { //level 7 laser
                addDoubleText("Laser", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "5->75", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("HeatUp", "2", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "20", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("sell:970", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
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
                addDoubleText("upgrade", "Cost: 300", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(300));
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
                addText("sell:440", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 350", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(350));
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
                addText("sell:670", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 450", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(450));
            }
            else if (towers[i].type == "tesla" && towers[i].level == 5) { //level 5 Tesla
                addDoubleText("Tesla", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "10", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("MaxCharge", "42", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "21", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Multi", "Target", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("No", "Charge", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                addDoubleText("Upgrade", "Cost: 1300", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(1300));
                addDoubleText("Upgrade", "Cost: 1500", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(1500));
                addText("sell:970", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxBasic", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "tesla" && towers[i].level == 6) { //level 6 Tesla
                addDoubleText("Tesla", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "10x5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("MaxCharge", "150", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "21", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("sell:970", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxTesla", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "tesla" && towers[i].level == 7) { //level 7 Tesla
                addDoubleText("Tesla", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", "20", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("MaxCharge", "Infinite", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "21", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("sell:970", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxTesla", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
        }
    }
    c.lineWidth = 1;
    //help box
    if((mouseover != "none" && mouseover != "cannon" && mouseover != "upgrade" && mouseover != "sell" && mouseover != "startWave") || selectedTower != "none"){
        c.fillStyle = "white";
        c.fillRect(canvas.width - 2*(canvas.width / 7.5),0,canvas.width / 7.5, canvas.height / (numboxes / 4));
    }
    var temptowertype = "none";
    for(var i=0; i<towers.length; i++){
        if(towers[i].selected == 1){
            temptowertype = towers[i].type;
        }
    }
    switch(mouseover){
        case "target":
            addText("Toggles Between",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("Tower Targets",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
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
            }
            break;
        case "level7":
            switch(temptowertype){
                case "sniper": 
                    addText("Max Damage",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:100",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "machinegun": 
                    addText("Higher Damage",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:10",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "laser": 
                    addText("Single Target Beast",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("MaxDamage:75",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "tesla": 
                    addText("Always Max Charge",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:20",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
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