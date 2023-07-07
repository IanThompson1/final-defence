function drawPath(path, canvas){
    for (var i = 0; i < path.length - 1; i++) {
        if (path[i][0] == path[i + 1][0] && path[i][1] > path[i + 1][1]) { // up 
            // pathRubble((canvas.width / 100) * path[i][0], (canvas.height / 100) * path[i + 1][1], scaleW*75, (canvas.height / 100) * (path[i][1] - path[i + 1][1]) + scaleH*75);
            c.fillRect((canvas.width / 100) * path[i][0], (canvas.height / 100) * path[i + 1][1], scaleW*75, (canvas.height / 100) * (path[i][1] - path[i + 1][1]) + scaleH*75);
        }
        else if (path[i][0] == path[i + 1][0] && path[i][1] < path[i + 1][1]) { // down
            // pathRubble((canvas.width / 100) * path[i][0], (canvas.height / 100) * path[i][1], scaleW*75, (canvas.height / 100) * (path[i + 1][1] - path[i][1]) + scaleH*75);
            c.fillRect((canvas.width / 100) * path[i][0], (canvas.height / 100) * path[i][1], scaleW*75, (canvas.height / 100) * (path[i + 1][1] - path[i][1]) + scaleH*75);
        }
        else if (path[i][1] == path[i + 1][1] && path[i][0] > path[i + 1][0]) { // left
            // pathRubble((canvas.width / 100) * path[i + 1][0], (canvas.height / 100) * path[i][1], (canvas.width / 100) * (path[i][0] - path[i + 1][0]), scaleH*75);
            c.fillRect((canvas.width / 100) * path[i + 1][0], (canvas.height / 100) * path[i][1], (canvas.width / 100) * (path[i][0] - path[i + 1][0]), scaleH*75);
        }
        else if (path[i][1] == path[i + 1][1] && path[i][0] < path[i + 1][0]) { // right
            // pathRubble((canvas.width / 100) * path[i][0], (canvas.height / 100) * path[i][1], (canvas.width / 100) * (path[i + 1][0] - path[i][0]), scaleH*75);
            c.fillRect((canvas.width / 100) * path[i][0], (canvas.height / 100) * path[i][1], (canvas.width / 100) * (path[i + 1][0] - path[i][0]), scaleH*75);
        }
    }
    //arrows 
    if(round == 0){
        if(path[path.length-1][0] == 0){// left exit
            //arrow sprite
            var arrowImg = new Sprite({
                position: {
                    x: 90*scaleW,
                    y: path[path.length-1][1]*scaleH*(canvas.height/100) +123
                },
                imageSrc: "./img/redArrowLeft.png",
                scale: 0.49 * (scaleH / scaleW)
            });
            arrowImg.update();
        }else if(path[path.length-1][1] == 0){// top exit
            //arrow sprite
            var tripple=0;
            if(pathNum == 2){
                tripple=70;
            }
            var arrowImg = new Sprite({
                position: {
                    x: path[path.length-1][0]*scaleW*canvas.width/100 +150+tripple,
                    y: 85*scaleH
                },
                imageSrc: "./img/redArrowUp.png",
                scale: 0.49 * (scaleH / scaleW)
            });
            arrowImg.update();
        }else if(path[path.length-1][1] == 100){// bottom exit
            //arrow sprite
            var tripple=0;
            if(pathNum == 2 || pathNum == 3){
                tripple=90;
            }
            var arrowImg = new Sprite({
                position: {
                    x: path[path.length-1][0]*scaleW*canvas.width/100 +130+tripple,
                    y: canvas.height-50*scaleH
                },
                imageSrc: "./img/redArrowDown.png",
                scale: 0.49 * (scaleH / scaleW)
            });
            arrowImg.update();
        }else{ //right exit 
            //arrow sprite
            var arrowImg = new Sprite({
                position: {
                    x: canvas.width -300*scaleW,
                    y: path[path.length-1][1]*scaleH*(canvas.height/100) +123
                },
                imageSrc: "./img/redArrowRight.png",
                scale: 0.49 * (scaleH / scaleW)
            });
            arrowImg.update();
        }
        //entrance arrow
        if(path[0][0] == 0){// left entrance
            //arrow sprite
            var arrowImg = new Sprite({
                position: {
                    x: 90*scaleW,
                    y: path[0][1]*scaleH*(canvas.height/100) +100
                },
                imageSrc: "./img/greenArrowRight.png",
                scale: 0.43 * (scaleH / scaleW)
            });
            arrowImg.update();
        }else if(path[0][1] == 0){// top entrance
            //arrow sprite
            var tripple=0;
            if(pathNum == 2){
                tripple=70;
            }
            var arrowImg = new Sprite({
                position: {
                    x: path[0][0]*scaleW*canvas.width/100 +230+tripple,
                    y: 85*scaleH
                },
                imageSrc: "./img/greenArrowDown.png",
                scale: 0.43 * (scaleH / scaleW)
            })
            arrowImg.update();
        }else if(path[0][1] == 100){// bottom entrance
            //arrow sprite
            var tripple=0;
            if(pathNum == 2){
                tripple=-100;
            }
            var arrowImg = new Sprite({
                position: {
                    x: path[0][0]*scaleW*canvas.width/100 +180+tripple,
                    y: canvas.height-50*scaleH
                },
                imageSrc: "./img/greenArrowUp.png",
                scale: 0.43 * (scaleH / scaleW)
            });
            arrowImg.update();
        }else{ //right entrance 
            
        }
    }
}



//entire gui
function drawLayout() {
    //redraws the background
    // c.fillStyle = "#289E6A";
    // c.fillRect(0, 0, canvas.width, canvas.height);
    //background
    var background = new Image();
    // if(difficulty < 3){
    //     background.src = "./img/battleground.png";
    //     var scal = 3;
    // }else 
    //stillbackground.png";
    var scal = 1;
    switch(pathNum){
        case 0: //basic
            background.src = "./img/basicMap.png";
            c.fillStyle = "#8F6443";
            break;
        case 1: //cross
            background.src = "./img/blockMap.png";
            c.fillStyle = "#8F6443";
            break;
        case 2: //double
            background.src = "./img/blockMap.png";
            c.fillStyle = "#8F6443";
            break;
        case 3: //symmetry
            background.src = "./img/blockMap.png";
            c.fillStyle = "#8F6443";
            break;
        case 4: //castle
            background.src = "./img/blockMap.png";
            c.fillStyle = "#8F6443";
            break;
        case 5: //tripple
            background.src = "./img/tripple.png";
            c.fillStyle = "#808080";
            break;
        default: // N/A
            console.log("default");
            background.src = "./img/stillbackground.png";
            c.fillStyle = "#808080";
    }
    c.drawImage(background, 0, 0, background.width*scal*scaleW, background.height*scal*scaleH);

    mainMenu.style.display = "none";
    //path
    if(pathNum != 0){ //basic map
        drawPath(paths, canvas);
        if(paths2[0][0] != -1){
            drawPath(paths2, canvas);
        }
        if(paths3[0][0] != -1){
            drawPath(paths3, canvas);
        }
    }
    //pause button 
    // var source = "./img/pauseButton.png";
    // var pos = [1620, 60];
    // var pauseImg = new Sprite({
    //     position: {
    //         x: pos[0]*scaleW,
    //         y: pos[1]*scaleH
    //     },
    //     imageSrc: source,
    //     scale: .2
    // });
    // pauseImg.update();

    // temp for testing walls
    // c.fillStyle="green";
    // for(var i=0; i<walls.length; i++){
    //     c.fillRect(walls[i][0]*scaleW, walls[i][1]*scaleH, walls[i][2]*scaleW, walls[i][3]*scaleH);
    // }

    // show possible tower spots
    if(difficulty < 5){
        c.fillStyle="green";
        for(var i=0; i<towerSpots.length; i++){
            c.fillRect(towerSpots[i][0]-towerFootPrint/2*scaleW, towerSpots[i][1]-towerFootPrint/2*scaleH, towerFootPrint*scaleW, towerFootPrint*scaleH);
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
            addText(autostart.toString(), canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 4, canvas.height / (numboxes / 2) * (18 / 2), "black", numboxes, 1, 0.2);
            c.fillStyle = "#A6A6A6";
        }
    }
    //lives / money
    addDoubleText("Money", Math.floor(totalmoney).toString(), canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (0 / 2), "green", numboxes);
    addDoubleText("Lives", lives.toString(), canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (0 / 2), "red", numboxes);
    //placing towers button
    addText(placingTowers.toString(), canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (16 / 2), "black", numboxes);
    //speed button
    addText("Speed:"+speedModifier, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (16 / 2),"yellow",numboxes);
    //pause button
    if(paused == 0){
        addDoubleText("Pause", "(esc)", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (14 / 2), "black", numboxes);
    }else{
        addDoubleText("Play", "(esc)", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (14 / 2), "black", numboxes);
    }
    //wave hints
    if (round == 0) {
        c.fillStyle = "#D5E645";
    }
    else {
        c.fillStyle = "black";
    }
    c.font = "40px serif";
    c.textAlign = "left";
    c.fillText("Next wave: " + hint, 0, 100);
    c.stroke();
    //current wave 
    if (round == 0 || round != 0) {
        c.fillStyle = "#D5E645";
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
        if(availableTowers[0] == 1){
            addDoubleText("Sniper", "Cost: 150", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, canAfford(150));
        }
        if(availableTowers[1] == 1){
            addDoubleText("Flame", "Cost: 100", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, canAfford(100));
        }
        if(availableTowers[2] == 1){
            addDoubleText("Tesla", "Cost: 200", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes, canAfford(200));
        }
        if(availableTowers[3] == 1){
            addDoubleText("laser", "Cost: 150", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes, canAfford(150));
        }
        if(availableTowers[4] == 1){
            addDoubleText("Slow", "Cost: 200", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes, canAfford(200));
        }
        if(availableTowers[5] == 1){
            addDoubleText("Bomb", "Cost: 100", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes, canAfford(100));
        }
        if(availableTowers[6] == 1){
            addDoubleText("Farm", "Cost: 800", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes, canAfford(800));
        }
        if(availableTowers[7] == 1){
            addDoubleText("Railgun", "Cost: 400", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes, canAfford(400));
        }
        if(availableTowers[8] == 1){
            addDoubleText("Buffer", "Cost: 500", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(500));
        }
        if(availableTowers[9] == 1){
            addDoubleText("Super", "Cost: 3000", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(3000));
        }
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
                towers[towers.length-1].buffs = towers[i].buffs;
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

                if(availableTowers[10] == 1){
                    addDoubleText("Armor", "Piercing", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                    addDoubleText("Upgrade", "Cost:"+towers[i].cost[5], canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[5]));
                }
                if(availableTowers[11] == 1){
                    addDoubleText("Mega", "Damage", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                    addDoubleText("Upgrade", "Cost:"+towers[i].cost[6], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[6]));
                }
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
                    addDoubleText("Armor", towers[i].damage*2, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                }
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxSniper", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "Minigun" && towers[i].level < 5) { //level 1-4 minigun
                addDoubleText("Flame", "level:"+towers[i].level, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].damage, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "Fast", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "Short", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("level:"+(towers[i].level+1), canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                towers.push(new Tower(-100,-100,"Minigun",towers[i].level+1,0));
                towers[towers.length-1].buffs = towers[i].buffs;
                towers[towers.length-1].update();
                addDoubleText("Damage", towers[towers.length-1].damage, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                towers.splice(towers.length-1,1);
                addDoubleText("", "", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addDoubleText("", "", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes);
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost:"+towers[i].cost[towers[i].level], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(towers[i].cost[towers[i].level]));
            }
            else if (towers[i].type == "Minigun" && towers[i].level == 5) { //level 5 minigun
                addDoubleText("Flame", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].damage, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Speed", "Fast", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "Short", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                if(availableTowers[10] == 1){
                    addDoubleText("Double", "Shot", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                    addDoubleText("Upgrade", "Cost:"+towers[i].cost[5], canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[5]));
                }
                if(availableTowers[11] == 1){
                    addDoubleText("High", "Damage", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                    addDoubleText("Upgrade", "Cost:"+towers[i].cost[6], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[6]));
                }
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxBasic", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "Minigun" && towers[i].level > 5) { //max minigun
                addDoubleText("Flame", "level:Max", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                if(towers[i].level == 6){
                    addDoubleText("Damage", towers[i].damage+"x2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                }else{
                    addDoubleText("Damage", towers[i].damage, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                }
                addDoubleText("Speed", "VeryFast", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Range", "Short", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addText("MaxFlame", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "#8A1212", numboxes);
            }
            else if (towers[i].type == "laser" && towers[i].level < 5) { //level 1-4 laser
                addDoubleText("Laser", "level:"+towers[i].level, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Target", towers[i].target, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Damage", towers[i].lasermin+"->"+towers[i].lasermax, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Damage", Math.floor(towers[i].damage), canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "#5E2926", numboxes);
                addDoubleText("HeatUp", towers[i].heatup, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
                addDoubleText("Range", "Medium", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addText("level:"+(towers[i].level+1), canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                towers.push(new Tower(-100,-100,"laser",towers[i].level+1,0));
                towers[towers.length-1].buffs = towers[i].buffs;
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
                addDoubleText("Damage", Math.floor(towers[i].damage), canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "#5E2926", numboxes);
                addDoubleText("HeatUp", towers[i].heatup, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
                addDoubleText("Range", "Medium", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                if(availableTowers[10] == 1){
                    addDoubleText("Multi", "Target", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                    addDoubleText("Upgrade", "Cost:"+towers[i].cost[5], canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[5]));
                }
                if(availableTowers[11] == 1){
                    addDoubleText("Super", "Laser", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                    addDoubleText("Upgrade", "Cost:"+towers[i].cost[6], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[6]));
                }
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
                
                addDoubleText("Damage", Math.floor(towers[i].damage), canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "#5E2926", numboxes);
                addDoubleText("HeatUp", towers[i].heatup, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
                addDoubleText("Range", "Medium", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
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
                towers[towers.length-1].buffs = towers[i].buffs;
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

                if(availableTowers[10] == 1){
                    addDoubleText("Multi", "Target", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                    addDoubleText("Upgrade", "Cost:"+towers[i].cost[5], canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[5]));
                }
                if(availableTowers[11] == 1){
                    addDoubleText("No", "Charge", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                    addDoubleText("Upgrade", "Cost:"+towers[i].cost[6], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[6]));
                }
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
                }else{//super tesla
                    addDoubleText("NumTargets", ""+towers[i].numTargets, canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);                
                    addDoubleText("Speed", "Medium", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
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

                if(availableTowers[10] == 1){
                    addDoubleText("Big", "Range", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                    addDoubleText("Upgrade", "Cost:"+towers[i].cost[5], canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[5]));
                }
                if(availableTowers[11] == 1){
                    addDoubleText("Max", "Slow", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                    addDoubleText("Upgrade", "Cost:"+towers[i].cost[6], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[6]));
                }
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
                towers[towers.length-1].buffs = towers[i].buffs;
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

                if(availableTowers[10] == 1){
                    addDoubleText("Big", "Splash", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                    addDoubleText("Upgrade", "Cost:"+towers[i].cost[5], canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[5]));
                }
                if(availableTowers[11] == 1){
                    addDoubleText("High", "Damage", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                    addDoubleText("Upgrade", "Cost:"+towers[i].cost[6], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[6]));
                }
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
                towers[towers.length-1].buffs = towers[i].buffs;
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

                if(availableTowers[10] == 1){
                    addDoubleText("Seeking", "Attack", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                    addDoubleText("Upgrade", "Cost:"+towers[i].cost[5], canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[5]));
                }
                if(availableTowers[11] == 1){
                    addDoubleText("Ultimate", "Power", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                    addDoubleText("Upgrade", "Cost:"+towers[i].cost[6], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[6]));
                }
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
                addDoubleText("Damage", "+10", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost:"+towers[i].cost[towers[i].level], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(towers[i].cost[towers[i].level]));
            }
            else if (towers[i].type == "buffer" && towers[i].level == 3) { //level 3 Buffer
                addDoubleText("Buffer", "level:3", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Range", "1.2", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Speed", "1.2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Damage", "+10", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);

                addDoubleText("Buffer", "level:4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Pierce", "+1 OR x1.2", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Tesla", "x2 Targets", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "red", numboxes);
                addDoubleText("Laser", "No buff", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "red", numboxes);                
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost:"+towers[i].cost[towers[i].level], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(towers[i].cost[towers[i].level]));
            }
            else if (towers[i].type == "buffer" && towers[i].level == 4) { //level 4 Buffer
                addDoubleText("Buffer", "level:4", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Range", "1.2", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Speed", "1.2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Damage", "+10", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Pierce", "+1 OR x1.2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);

                addDoubleText("Buffer", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addDoubleText("Damage", "x1.2", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "black", numboxes);
                addText("sell:"+towers[i].value, canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (12 / 2), "yellow", numboxes);
                addDoubleText("upgrade", "Cost:"+towers[i].cost[towers[i].level], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (12 / 2), "black", numboxes, canAfford(towers[i].cost[towers[i].level]));
            }
            else if (towers[i].type == "buffer" && towers[i].level == 5) { //level 5 Buffer
                addDoubleText("Buffer", "level:5", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Range", "1.2", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes);
                addDoubleText("Speed", "1.2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Damage", "+10", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (4 / 2), "black", numboxes);
                addDoubleText("Pierce", "+1 OR x1.2", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (6 / 2), "black", numboxes);
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
                towers[towers.length-1].buffs = towers[i].buffs;
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

                if(availableTowers[10] == 1){
                    addDoubleText("Fast", "Attack", canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                    addDoubleText("Upgrade", "Cost:"+towers[i].cost[5], canvas.width - canvas.width / 7.5, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[5]));
                }
                if(availableTowers[11] == 1){
                    addDoubleText("Ultimate", "Shot", canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (8 / 2), "#8A1212", numboxes);
                    addDoubleText("Upgrade", "Cost:"+towers[i].cost[6], canvas.width - canvas.width / 7.5 + (canvas.width / 7.5) / 2, canvas.height / (numboxes / 2) * (10 / 2), "black", numboxes, canAfford(towers[i].cost[6]));
                }
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
    if(((mouseover != "none" && mouseover != "upgrade" && mouseover != "sell" && mouseover != "startWave" && (temptowertype != "farm" || temptowerlevel != 5) && (temptowertype != "farm" || mouseover != "target") && (temptowertype != "ice" || mouseover != "target") && (temptowertype != "buffer" || mouseover != "target") && (temptowertype != "buffer" || temptowerlevel != 5)) || selectedTower != "none") && mouseover != "pause"){
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
            addText("Damage:10",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "Minigun":
            addText("Short range, Fast attack",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("Damage:2",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "laser":
            addText("Heatup for high attack",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("Burns through armor",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "tesla":
            addText("2x shield, has to charge",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("Damage:5, Speed:Fast",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "farm":
            addText("Generates money at the end",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("of each round. Income:100",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "ice":
            addText("Slows enemies in range",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("20% Bosses immune",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "bomb":
            addText("Splash damage",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("Pierce:25 Damage:2",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "super":
            addText("High damage, Fast attack",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("Damage:50",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "buffer":
            addText("Gives buffs to",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("towers in range",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
            break;
        case "railgun":
            addText("Slow line attack",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
            addText("Pierce:30 Damage:20",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
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
                    addText("Damage:80",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "Minigun": 
                    addText("2 Cannons",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:12x2",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "laser": 
                    addText("Up to 5 Targets",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Only deals 10 Damage",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "tesla": 
                    addText("Double Shot",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:30x2",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "ice":
                    addText("large Range",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Slow 60%",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "bomb":
                    addText("Bigger Splash",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Pierce:30, Damage:20",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "super":
                    addText("Attack seek enemies",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:300, Very Fast",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "railgun":
                    addText("Double Speed",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:120",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
            }
            break;
        case "level7":
            switch(temptowertype){
                case "Sniper": 
                    addText("Max Damage",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:110",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "Minigun": 
                    addText("High Damage",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:25",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "laser": 
                    addText("Single Target Beast",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("MaxDamage:100",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "tesla": 
                    addText("No Charge",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:50",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "ice":
                    addText("Max Slow",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Slow 80%",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "bomb":
                    addText("Max Damage",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Pierce:30, Damage:30",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "super":
                    addText("Max Damage",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:500, Very Fast",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
                    break;
                case "railgun":
                    addText("Wide Shot",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, 0, "black", numboxes, 1, 0.2);
                    addText("Damage:250",canvas.width - 2*(canvas.width / 7.5) + (canvas.width/7.5)/4, canvas.height / (numboxes / 2) * (2 / 2), "black", numboxes, 1, 0.2);
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