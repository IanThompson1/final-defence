function choosepath(i) {
    var paths = [[]];
    switch (i) {
        case 0:
            // basic path
            walls = [];
            paths2 = [[-1]];
            paths3 = [[-1]];
            paths = [[0, 63], [15, 63], [15, 27], [35, 27], [35, 75], [61.5, 75], [61.5, 50], [100, 50]];
            walls.push([130, 220, 100, 50]);
            walls.push([1150, 340, 125, 100]);
            towerSpots1 = [];
            towerSpots2 = []; 
            towerSpots3 = [];
            towerSpots4 = [];
            towerSpots1 = [[450*scaleW, 380*scaleH], [200*scaleW, 700*scaleH], [590*scaleW, 600*scaleH], [200*scaleW, 490*scaleH], [820*scaleW, 600*scaleH], [1100*scaleW, 600*scaleH], [1340*scaleW, 600*scaleH], [960*scaleW, 490*scaleH], [590*scaleW, 380*scaleH], 
            [450*scaleW, 490*scaleH], [590*scaleW, 490*scaleH], [710*scaleW, 160*scaleH], [1100*scaleW, 490*scaleH],
            [820*scaleW, 490*scaleH], [960*scaleW, 600*scaleH], [450*scaleW, 600*scaleH], [1340*scaleW, 380*scaleH], [320*scaleW, 160*scaleH], [200*scaleW, 380*scaleH]];
            towerSpots2 = [[450*scaleW, 380*scaleH], [200*scaleW, 700*scaleH], [590*scaleW, 600*scaleH], [200*scaleW, 490*scaleH], [820*scaleW, 600*scaleH], [1100*scaleW, 600*scaleH], [1340*scaleW, 600*scaleH], [960*scaleW, 490*scaleH], [590*scaleW, 380*scaleH],
            [450*scaleW, 490*scaleH], [590*scaleW, 380*scaleH], [590*scaleW, 490*scaleH], [710*scaleW, 150*scaleH], [1100*scaleW, 490*scaleH]];
            towerSpots3 = [[450*scaleW, 380*scaleH], [200*scaleW, 700*scaleH], [590*scaleW, 600*scaleH], [200*scaleW, 490*scaleH], [820*scaleW, 600*scaleH], [1100*scaleW, 600*scaleH], [590*scaleW, 380*scaleH],  
            [1330*scaleW, 600*scaleH], [960*scaleW, 490*scaleH], [320*scaleW, 160*scaleH]];
            towerSpots4 = [[450*scaleW, 380*scaleH], [200*scaleW, 700*scaleH], [590*scaleW, 600*scaleH], [200*scaleW, 490*scaleH], [820*scaleW, 600*scaleH], [1100*scaleW, 600*scaleH], 
            [1330*scaleW, 600*scaleH], [960*scaleW, 490*scaleH]];
            break;
        case 1:
            //cross path
            walls = [];
            console.log(difficulty);
            paths2 = [[-1]];
            paths3 = [[-1]];
            paths = [[50, 0], [50, 81], [10, 81], [10, 50], [70, 50], [70, 18], [30, 18], [30, 100]];
            towerSpots1 = [];
            towerSpots2 = []; 
            towerSpots3 = [];
            towerSpots4 = [];
            towerSpots1 = [[710*scaleW, 290*scaleH], [900*scaleW, 390*scaleH], [1100*scaleW, 290*scaleH], [900*scaleW, 580*scaleH], [510*scaleW, 580*scaleH], [510*scaleW, 390*scaleH], [710*scaleW, 580*scaleH], [900*scaleW, 100*scaleH],
            [900*scaleW, 290*scaleH], [1100*scaleW, 390*scaleH], [710*scaleW, 390*scaleH],
            [330*scaleW, 580*scaleH], [1100*scaleW, 580*scaleH], [1280*scaleW, 290*scaleH]];
            towerSpots2 = [[710*scaleW, 290*scaleH], [900*scaleW, 390*scaleH], [1100*scaleW, 290*scaleH], [900*scaleW, 580*scaleH], [510*scaleW, 580*scaleH], [510*scaleW, 390*scaleH], [710*scaleW, 580*scaleH], [900*scaleW, 100*scaleH],
            [900*scaleW, 290*scaleH], [1100*scaleW, 390*scaleH], [710*scaleW, 390*scaleH]];
            towerSpots3 = [[710*scaleW, 290*scaleH], [900*scaleW, 390*scaleH], [1100*scaleW, 290*scaleH], [900*scaleW, 580*scaleH], [510*scaleW, 580*scaleH], [510*scaleW, 390*scaleH], [710*scaleW, 580*scaleH], [900*scaleW, 100*scaleH]];
            towerSpots4 = [[900*scaleW, 390*scaleH], [1100*scaleW, 290*scaleH], [900*scaleW, 580*scaleH], [510*scaleW, 580*scaleH], [510*scaleW, 390*scaleH]];
            break;// , [0*scaleW, 0*scaleH]
        case 2:
            //double
            walls = [];
            paths = [[0, 38], [20, 38], [20, 82], [71, 82], [71, 27], [30, 27], [30, 0]];
            paths2 = [[60, 0], [60, 60], [0, 60]];
            paths3 = [[-1]];
            towerSpots1 = [];
            towerSpots2 = [];
            towerSpots3 = [];
            towerSpots4 = [];
            towerSpots1 = [[320*scaleW, 480*scaleH], [1090*scaleW, 380*scaleH], [1290*scaleW, 380*scaleH], [1190*scaleW, 670*scaleH], [780*scaleW, 430*scaleH], [830*scaleW, 670*scaleH], [510*scaleW, 273*scaleH], [1290*scaleW, 577*scaleH],
            [520*scaleW, 670*scaleH], [1090*scaleW, 480*scaleH], [1290*scaleW, 180*scaleH], [940*scaleW, 430*scaleH], 
            [520*scaleW, 480*scaleH], [320*scaleW, 670*scaleH], [1090*scaleW, 180*scaleH], [1290*scaleW, 520*scaleH]];
            towerSpots2 = [[320*scaleW, 480*scaleH], [1090*scaleW, 380*scaleH], [1290*scaleW, 380*scaleH], [1190*scaleW, 670*scaleH], [780*scaleW, 430*scaleH], [830*scaleW, 670*scaleH], [510*scaleW, 273*scaleH], [1290*scaleW, 577*scaleH],
            [520*scaleW, 670*scaleH], [1090*scaleW, 480*scaleH], [1290*scaleW, 180*scaleH], [940*scaleW, 430*scaleH], 
            [520*scaleW, 480*scaleH], [320*scaleW, 670*scaleH], [1090*scaleW, 180*scaleH], [1290*scaleW, 520*scaleH]];
            towerSpots3 = [[320*scaleW, 480*scaleH], [1090*scaleW, 380*scaleH], [1290*scaleW, 380*scaleH], [1190*scaleW, 670*scaleH], [780*scaleW, 430*scaleH], [830*scaleW, 670*scaleH], [510*scaleW, 273*scaleH], [1290*scaleW, 577*scaleH],
            [520*scaleW, 670*scaleH], [1090*scaleW, 480*scaleH], [1290*scaleW, 180*scaleH], [940*scaleW, 430*scaleH]];
            towerSpots4 = [[320*scaleW, 480*scaleH], [1090*scaleW, 380*scaleH], [1290*scaleW, 380*scaleH], [1190*scaleW, 670*scaleH], [780*scaleW, 430*scaleH], [830*scaleW, 670*scaleH], [510*scaleW, 273*scaleH], [1290*scaleW, 577*scaleH]];
            break;
        case 3: //symmetry path
            walls = [];
            paths = [[25, 100], [25, 24], [58, 24], [58, 57], [35, 57], [35, 0]];
            paths2 = [[68, 0], [68, 57], [35, 57], [35, 24], [58, 24], [58, 100]];
            paths3 = [[-1]];
            towerSpots1 = [];
            towerSpots2 = []; 
            towerSpots3 = [];
            towerSpots4 = [];
            towerSpots1 = [[610*scaleW, 350*scaleH], [800*scaleW, 350*scaleH], [1050*scaleW, 450*scaleH], [1250*scaleW, 640*scaleH], [610*scaleW, 160*scaleH], [1250*scaleW, 250*scaleH], [610*scaleW, 550*scaleH],
            [1250*scaleW, 450*scaleH], [800*scaleW, 450*scaleH], [610*scaleW, 450*scaleH], [1050*scaleW, 350*scaleH],
            [1250*scaleW, 350*scaleH], [800*scaleW, 160*scaleH], [1050*scaleW, 640*scaleH], [940*scaleW, 350*scaleH], [940*scaleW, 450*scaleH]];
            towerSpots2 = [[610*scaleW, 350*scaleH], [800*scaleW, 350*scaleH], [1050*scaleW, 450*scaleH], [1250*scaleW, 640*scaleH], [610*scaleW, 160*scaleH], [1250*scaleW, 250*scaleH], [610*scaleW, 550*scaleH],
            [1250*scaleW, 450*scaleH], [800*scaleW, 450*scaleH], [610*scaleW, 450*scaleH], [1050*scaleW, 350*scaleH],
            [1250*scaleW, 350*scaleH], [800*scaleW, 160*scaleH], [1050*scaleW, 640*scaleH], [940*scaleW, 350*scaleH], [940*scaleW, 450*scaleH]];
            towerSpots3 = [[610*scaleW, 350*scaleH], [800*scaleW, 350*scaleH], [1050*scaleW, 450*scaleH], [1250*scaleW, 640*scaleH], [610*scaleW, 160*scaleH], [1250*scaleW, 250*scaleH], [610*scaleW, 550*scaleH],
            [1250*scaleW, 450*scaleH], [800*scaleW, 450*scaleH], [610*scaleW, 450*scaleH], [1050*scaleW, 350*scaleH]];
            towerSpots4 = [[610*scaleW, 350*scaleH], [800*scaleW, 350*scaleH], [1050*scaleW, 450*scaleH], [1250*scaleW, 640*scaleH], [610*scaleW, 160*scaleH], [1250*scaleW, 250*scaleH], [610*scaleW, 550*scaleH]];
            break;
        case 4:
            // castle path
            walls = [];
            paths2 = [[-1]];
            paths3 = [[-1]];
            paths = [[50, 100], [50, 75], [65, 75], [65, 90], [80, 90], [80, 30], [70, 30], [70, 10], [15, 10], [15, 30], [5, 30], [5, 90], [20, 90], [20, 75], [35, 75], [35, 100]];
            towerSpots1 = [];
            towerSpots2 = [];
            towerSpots3 = [];
            towerSpots4 = [];
            towerSpots1 = [[1190*scaleW, 810*scaleH], [1480*scaleW, 709*scaleH], [1310*scaleW, 560*scaleH], [1480*scaleW, 210*scaleH], [240*scaleW, 420*scaleH], [620*scaleW, 810*scaleH], [910*scaleW, 770*scaleH], [1480*scaleW, 400*scaleH], [440*scaleW, 230*scaleH], [1480*scaleW, 560*scaleH], [1380*scaleW, 730*scaleH], [1580*scaleW, 128*scaleH],
            [330*scaleW, 740*scaleH], [210*scaleW, 200*scaleH], [1250*scaleW, 230*scaleH], [1090*scaleW, 810*scaleH], [520*scaleW, 810*scaleH],
            [800*scaleW, 770*scaleH], [230*scaleW, 740*scaleH], [1340*scaleW, 400*scaleH], [850*scaleW, 700*scaleH], [870*scaleW, 230*scaleH], [130*scaleW, 128*scaleH]];
            towerSpots2 = [[1190*scaleW, 810*scaleH], [1480*scaleW, 709*scaleH], [1310*scaleW, 560*scaleH], [1480*scaleW, 210*scaleH], [240*scaleW, 420*scaleH], [620*scaleW, 810*scaleH], [850*scaleW, 700*scaleH], [1480*scaleW, 400*scaleH], [440*scaleW, 230*scaleH], [1480*scaleW, 560*scaleH], [1380*scaleW, 730*scaleH], [1580*scaleW, 128*scaleH],
            [270*scaleW, 740*scaleH], [210*scaleW, 200*scaleH], [1250*scaleW, 230*scaleH], [1090*scaleW, 810*scaleH], [520*scaleW, 810*scaleH]];
            towerSpots3 = [[1140*scaleW, 810*scaleH], [1480*scaleW, 709*scaleH], [1310*scaleW, 560*scaleH], [1480*scaleW, 210*scaleH], [240*scaleW, 420*scaleH], [560*scaleW, 810*scaleH], [850*scaleW, 700*scaleH], [1480*scaleW, 400*scaleH], [440*scaleW, 230*scaleH], [1480*scaleW, 560*scaleH], [1380*scaleW, 730*scaleH], [1580*scaleW, 128*scaleH]];
            towerSpots4 = [[1140*scaleW, 810*scaleH], [1480*scaleW, 709*scaleH], [1310*scaleW, 560*scaleH], [1480*scaleW, 210*scaleH], [240*scaleW, 420*scaleH], [560*scaleW, 810*scaleH], [850*scaleW, 700*scaleH], [1480*scaleW, 400*scaleH], [130*scaleW, 128*scaleH]];
            break;
        case 5:
            // tripple path
            walls = [];
            paths3 = [[0, 20], [28, 20], [28, 38], [38, 38], [38, 0]];//top
            paths = [[0, 80], [49, 80], [49, 31], [66, 31], [66, 0]];//middle
            paths2 = [[14, 100], [14, 60], [75, 60], [75, 100]];//bottom
            walls.push([0, 0, 490, 70]);
            walls.push([0, 310, 500, 200]);
            walls.push([0, 800, 200, 100]);
            walls.push([370, 800, 450, 100]);
            walls.push([830, 0, 430, 250]);
            walls.push([1350, 0, 300, 95]);
            towerSpots1 = [];
            towerSpots2 = []; 
            towerSpots3 = [];
            towerSpots4 = [];
            towerSpots1 = [[680*scaleW, 280*scaleH], [880*scaleW, 480*scaleH], [1080*scaleW, 400*scaleH], [410*scaleW, 660*scaleH], [1380*scaleW, 660*scaleH], [1080*scaleW, 660*scaleH],
            [590*scaleW, 480*scaleH], [200*scaleW, 565*scaleH], [550*scaleW, 110*scaleH],
            [880*scaleW, 660*scaleH], [730*scaleW, 480*scaleH], [650*scaleW, 660*scaleH], 
            [670*scaleW, 110*scaleH], [1200*scaleW, 400*scaleH], [1230*scaleW, 660*scaleH], [970*scaleW, 850*scaleH]];
            towerSpots2 = [[680*scaleW, 280*scaleH], [880*scaleW, 480*scaleH], [1080*scaleW, 400*scaleH], [410*scaleW, 660*scaleH], [1380*scaleW, 660*scaleH], [1080*scaleW, 660*scaleH],
            [590*scaleW, 480*scaleH], [200*scaleW, 565*scaleH], [550*scaleW, 110*scaleH],
            [880*scaleW, 660*scaleH], [730*scaleW, 480*scaleH], [650*scaleW, 660*scaleH]];
            towerSpots3 = [[680*scaleW, 280*scaleH], [880*scaleW, 480*scaleH], [1080*scaleW, 400*scaleH], [410*scaleW, 660*scaleH], [1380*scaleW, 660*scaleH], [1080*scaleW, 660*scaleH],
            [590*scaleW, 480*scaleH], [200*scaleW, 565*scaleH], [550*scaleW, 110*scaleH]];
            towerSpots4 = [[680*scaleW, 280*scaleH], [880*scaleW, 480*scaleH], [1080*scaleW, 400*scaleH], [410*scaleW, 660*scaleH], [1380*scaleW, 660*scaleH], [1080*scaleW, 660*scaleH]];
            break;
    }
    pathNum = i;
    return paths;
}

//old path designs
/*
circle

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

// diamond path
paths2 = [[-1]];
paths3 = [[-1]];

paths = [[0, 60], [20, 60]];
var ypath = 60;
var xpath = 20;
for (var i = 0; i < 162; i++) {
    console.log(i + " " + xpath + " " + ypath);
    if (i < 40) { //fist quarter
        if (i % 2 == 0) {
            ypath++;
            
            paths.push([xpath, ypath]);
        }
        else {
            xpath++;
            
            paths.push([xpath, ypath]);
        }
    }
    else if (i < 80) {
        if (i % 2 == 0) {
            ypath--;
            
            paths.push([xpath, ypath]);
        }
        else {
            xpath++;
            
            paths.push([xpath, ypath]);
        }
    }
    else if (i == 80) { //middle section
        
        paths.push([60, 35]);
        ypath = 35;
    }
    else if (i < 122) {
        if (i % 2 == 0) {
            ypath--;
            
            paths.push([xpath, ypath]);
        }
        else {
            xpath--;
            
            paths.push([xpath, ypath]);
        }
    }
    else {
        if (i % 2 == 0) {
            ypath++;
            
            paths.push([xpath, ypath]);
        }
        else {
            xpath--;
            
            paths.push([xpath, ypath]);
        }
    }
}

paths.push([0, 35]);

basic 1.0
// paths = [[0, 50], [16, 50], [16, 80], [37, 80], [37, 57], [55, 57], [55, 80], [70, 80], [70, 25], [30, 25], [30, 0]];


*/