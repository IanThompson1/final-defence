function choosepath(i) {
    var paths = [[]];
    switch (i) {
        case 0:
            // basic path
            paths2 = [[-1]];
            paths3 = [[-1]];
            //@ts-ignore
            paths = [[0, 63], [15, 63], [15, 27], [35, 27], [35, 75], [61.5, 75], [61.5, 50], [100, 50]];
            //@ts-ignore
            walls.push([130, 220, 100, 50]);
            //@ts-ignore
            walls.push([1150, 340, 125, 100]);
            break;
        case 1:
            // castle path
            paths2 = [[-1]];
            paths3 = [[-1]];
            //@ts-ignore
            paths = [[50, 100], [50, 75], [65, 75], [65, 90], [80, 90], [80, 30], [70, 30], [70, 10], [15, 10], [15, 30], [5, 30], [5, 90], [20, 90], [20, 75], [35, 75], [35, 100]];
            break;
        case 2:
            // tripple path
            //@ts-ignore
            paths = [[0, 74], [49, 74], [49, 31], [68, 31], [68, 0]];
            paths2 = [[0, 20], [28, 20], [28, 42], [38, 42], [38, 0]];
            paths3 = [[14, 100], [14, 64], [75, 64], [75, 100]];
            //@ts-ignore
            walls.push([0, 0, 490, 70]);
            //@ts-ignore
            walls.push([0, 310, 500, 200]);
            //@ts-ignore
            walls.push([0, 800, 200, 100]);
            //@ts-ignore
            walls.push([370, 800, 450, 100]);
            //@ts-ignore
            walls.push([830, 0, 430, 250]);
            //@ts-ignore
            walls.push([1450, 0, 200, 95]);
            break;
        case 3: //symmetry path
            paths = [[25, 100], [25, 24], [58, 24], [58, 57], [35, 57], [35, 0]];
            paths2 = [[68, 0], [68, 57], [35, 57], [35, 24], [58, 24], [58, 100]];
            paths3 = [[-1]];
            break;
        case 4:
            //basic path 2.0
            //@ts-ignore
            paths = [[0, 38], [20, 38], [20, 82], [71, 82], [71, 27], [30, 27], [30, 0]];
            paths2 = [[60, 0], [60, 60], [0, 60]];
            paths3 = [[-1]];
            
            break;
        case 5:
            //cross path
            paths2 = [[-1]];
            paths3 = [[-1]];
            //@ts-ignore
            paths = [[50, 0], [50, 81], [10, 81], [10, 50], [70, 50], [70, 19], [30, 19], [30, 100]];
    }
    pathNum = i;
    return paths;
}

//old path designs
/*
circle
//@ts-ignore
paths = [[Math.cos((80*Math.PI/180))*40+40, 100], [Math.cos((80*Math.PI/180))*40+40, Math.sin(((80-1)*Math.PI/180))*40+40]];
for(var i=80; i>-260; i--){
    if(i%2 == 0){
        //@ts-ignore
        paths.push([Math.cos((i*Math.PI/180))*40+40, Math.sin(((i-1)*Math.PI/180))*40+40]);
        console.log(i+" "+ Math.cos((i*Math.PI/180))*40+40 + " " + Math.sin(((i-1)*Math.PI/180))*40+40);
    }else{
        //@ts-ignore
        paths.push([Math.cos(((i-1)*Math.PI/180))*40+40, Math.sin((i*Math.PI/180))*40+40]);
        console.log(i+" "+ Math.cos(((i-1)*Math.PI/180))*40+40 + " " + Math.sin((i*Math.PI/180))*40+40);
    }
}
//@ts-ignore
paths.push([Math.cos(((-260)*Math.PI/180))*40+40, 100]);

// diamond path
paths2 = [[-1]];
paths3 = [[-1]];
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

basic 1.0
// paths = [[0, 50], [16, 50], [16, 80], [37, 80], [37, 57], [55, 57], [55, 80], [70, 80], [70, 25], [30, 25], [30, 0]];


*/