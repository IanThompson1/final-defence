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
    addDoubleText("Money", money.toString(), canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (0 / 2), "yellow", numboxes);
    addDoubleText("Lives", lives.toString(), canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (0 / 2), "red", numboxes);
    //placing towers button
    addText(placingTowers.toString(), canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (14 / 2), "black", numboxes);
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
            hint = "boss!";
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
            hint = "tanks2";
            break;
        case 23:
            hint = "everything again";
            break;
        case 24:
            hint = "final boss";
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
    addDoubleText("Sniper", "Cost: 100", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, canAfford(100));
    addDoubleText("MiniGun", "Cost: 120", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, canAfford(120));
    // addDoubleText("Cannon", "Cost: 500", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes, canAfford(500));
    addDoubleText("laser", "Cost: 300", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes, canAfford(300));
    // addDoubleText("Burst", "Cost: 100", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes, canAfford(100));
    addDoubleText("Tesla", "Cost: 250", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes, canAfford(250));
    function canAfford(cost) {
        if (cost <= money) {
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
                addDoubleText("Sniper 1", towers[i].target, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "5 -> 10", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "7->7.5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "25->30", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:70", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 90", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(90));
            }
            else if (towers[i].type == "sniper" && towers[i].level == 2) { //level 2 sniper
                addDoubleText("Sniper 2", towers[i].target, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "10->20", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "7.5->8", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "30->35", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:130", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 150", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(150));
            }
            else if (towers[i].type == "sniper" && towers[i].level == 3) { //level 3 sniper
                addDoubleText("Sniper 3", towers[i].target, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "20->35", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "8->8.5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "35->40", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:230", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 400", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(400));
            }
            else if (towers[i].type == "sniper" && towers[i].level == 4) { //level 4 sniper
                addDoubleText("Sniper 4", towers[i].target, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "35->50", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "8.5->9", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "40->45", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:600", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 350", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(350));
            }
            else if (towers[i].type == "sniper" && towers[i].level == 5) { //level 5 sniper
                addDoubleText("Sniper 5", towers[i].target, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "50", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "9", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "45", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:800", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxLevel", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "machinegun" && towers[i].level == 1) { //level 1 minigun
                addDoubleText("MiniGun 1", towers[i].target, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "1->(1-2)", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "1->0.75", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "11->12", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:80", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 100", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(100));
            }
            else if (towers[i].type == "machinegun" && towers[i].level == 2) { //level 2 minigun
                addDoubleText("MiniGun 2", towers[i].target, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "(1-2)->2", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "0.75->0.5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "12->13", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:150", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 200", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(200));
            }
            else if (towers[i].type == "machinegun" && towers[i].level == 3) { //level 3 minigun
                addDoubleText("MiniGun 3", towers[i].target, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "2->3", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "0.5->0.4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "13->14", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:310", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 350", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(350));
            }
            else if (towers[i].type == "machinegun" && towers[i].level == 4) { //level 4 minigun
                addDoubleText("MiniGun 4", towers[i].target, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "3->4", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "0.4->0.3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "14->15", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:630", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 400", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(400));
            }
            else if (towers[i].type == "machinegun" && towers[i].level == 5) { //level 5 minigun
                addDoubleText("MiniGun 5", towers[i].target, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "4", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "0.3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "15", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:850", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxLevel", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "laser" && towers[i].level == 1) { //level 1 laser
                addDoubleText("Laser 1", towers[i].target, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "(1-10)->(1-15)", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "8->7", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "15->16", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:250", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 400", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(400));
            }
            else if (towers[i].type == "laser" && towers[i].level == 2) { //level 2 laser
                addDoubleText("Laser 2", towers[i].target, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "(1-15)->(2-20)", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "7->6", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "16->17", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:550", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 500", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(500));
            }
            else if (towers[i].type == "laser" && towers[i].level == 3) { //level 3 laser
                addDoubleText("Laser 3", towers[i].target, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "(2-20)->(2->30)", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "6->5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "17->8", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:1000", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 600", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(600));
            }
            else if (towers[i].type == "laser" && towers[i].level == 4) { //level 4 laser
                addDoubleText("Laser 4", towers[i].target, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "(2-30)->(3->40)", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "5->4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "18->19", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:1500", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 700", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(700));
            }
            else if (towers[i].type == "laser" && towers[i].level == 5) { //level 5 laser
                addDoubleText("Laser 5", towers[i].target, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "(3-40)", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Speed", "4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "19", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:2000", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxLevel", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "tesla" && towers[i].level == 1) { //level 1 Tesla
                addDoubleText("Tesla 1", towers[i].target, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "2->4", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("MaxCharge", "18->24", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "17->18", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:190", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 400", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(400));
            }
            else if (towers[i].type == "tesla" && towers[i].level == 2) { //level 2 Tesla
                addDoubleText("Tesla 2", towers[i].target, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "4->6", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("MaxCharge", "24->30", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "18->19", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:550", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 500", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(500));
            }
            else if (towers[i].type == "tesla" && towers[i].level == 3) { //level 3 Tesla
                addDoubleText("Tesla 3", towers[i].target, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "6->8", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("MaxCharge", "30->36", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "19->20", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:900", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 600", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(600));
            }
            else if (towers[i].type == "tesla" && towers[i].level == 4) { //level 4 Tesla
                addDoubleText("Tesla 4", towers[i].target, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "8->10", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("MaxCharge", "36->42", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "20->21", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:1400", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost: 700", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(700));
            }
            else if (towers[i].type == "tesla" && towers[i].level == 5) { //level 5 Tesla
                addDoubleText("Tesla 5", towers[i].target, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "10", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("MaxCharge", "42", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("Range", "21", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:1800", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxLevel", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
        }
    }
    c.lineWidth = 1;
}
function addText(text, x, y, color, numboxes, double, size) {
    if (double === void 0) { double = 2; }
    if(double === void 0) { size = 1; }
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