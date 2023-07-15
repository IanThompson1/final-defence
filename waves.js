function nextWave() {
    waveEnded = 1;
    //multipliers
    var hp = 1; //health
    var den = 1; //density
    var spd = 1; //speed
    switch (difficulty) {
        case 1:
            hp = 0.7;
            den = 1.4;
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
            hp = 1.2;
            den = 0.9;
            spd = 1.2;
            break;
    }
    //final map
    if(pathNum == 5){
        hp = 1; //health
        den = 1; //density
        spd = 1; //speed
    }
    //rounds    
    if(pathNum == 0 && difficulty != 5 || (pathNum == 5 && difficulty == 1)){//basic
        switch(round){
            case 1: //money 50
                spawnWave(10, 1000 * den, Math.floor(10 * hp), 3 * spd, 20, "green", 5, 0, 0, 0); //basic 
                hint = "";
                bonusHint = "";
                break;
            case 2: //money 50
                spawnWave(10, 1000 * den, Math.floor(10 * hp), 3 * spd, 20, "green", 5, 0, 0, 0); //basic 
                hint = "a few more";
                bonusHint = "";
                break;
            case 3: //money 100
                var multi = [];
                multi.push([5, 500 * den, Math.floor(10 * hp), 3 * spd, 20, "green", 5, 0, 0, 0]); //tighter pack
                multi.push([10, 1000 * den, Math.floor(10 * hp), 3 * spd, 20, "green", 5, 0, 0, 0]); //basics
                multi.push([5, 500 * den, Math.floor(10 * hp), 3 * spd, 20, "green", 5, 0, 0, 0]); //tighter pack
                spawnMultiWaves(multi);
                hint = "tighter";
                break;
            case 4: //money 100
                spawnWave(20, 500 * den, Math.floor(10 * hp), 3 * spd, 20, "green", 5, 0, 0, 0); //basic 
                hint = "stronger";
                break;
            case 5: //money 50
                spawnWave(10, 1000 * den, Math.floor(20 * hp), 3 * spd, 20, "green", 5, 0, 0, 0); //basic 
                hint = "";
                break;
            case 6: //money 100
                var multi = [];
                multi.push([5, 500 * den, Math.floor(20 * hp), 3 * spd, 20, "green", 5, 0, 0, 0]); //tighter pack
                multi.push([10, 1000 * den, Math.floor(30 * hp), 3 * spd, 20, "green", 5, 0, 0, 0]); //basics
                multi.push([5, 500 * den, Math.floor(20 * hp), 3 * spd, 20, "green", 5, 0, 0, 0]); //tighter pack
                spawnMultiWaves(multi);
                hint = "";
                break;
            case 7: //money 100
                spawnWave(20, 500 * den, Math.floor(20 * hp), 3 * spd, 20, "green", 5, 0, 0, 0); //basic 
                hint = "4 stronger enemies";
                break;
            case 8: //money 80
                spawnWave(4, 2000 * den, Math.floor(80 * hp), 3 * spd, 20, "green", 20, 0, 0, 0); //basic 
                hint = "";
                break;
            case 9: //money 100
                spawnWave(20, 1000 * den, Math.floor(40 * hp), 3 * spd, 20, "green", 5, 0, 0, 0); //basic 
                hint = "";
                break;
            case 10: //money 100
                spawnWave(20, 1000 * den, Math.floor(50 * hp), 3 * spd, 20, "green", 5, 0, 0, 0); //basic 
                hint = "shields";
                break;
            case 11: //money 100
                spawnWave(20, 1000 * den, Math.floor(30 * hp), 3 * spd, 20, "green", 5, 0, 1, 0); //basic 
                hint = "2 shields";
                bonusHint = "shields take a certain # of hits to destroy";
                break;
            case 12: //money 100
                spawnWave(20, 1000 * den, Math.floor(30 * hp), 3 * spd, 20, "green", 5, 0, 2, 0); //basic 
                hint = "more shields";
                break;
            case 13: //money 100
                spawnWave(20, 1000 * den, Math.floor(30 * hp), 3 * spd, 20, "green", 5, 0, 5, 0); //basic 
                hint = "high shields";
                bonusHint = "";
                break;
            case 14: //money 200
                spawnWave(20, 1000 * den, Math.floor(30 * hp), 3 * spd, 20, "green", 10, 0, 10, 0); //shields 
                hint = "back to basics";
                break;
            case 15: //money 200
                spawnWave(20, 1000 * den, Math.floor(60 * hp), 3 * spd, 20, "green", 10, 0, 0, 0); //basic 
                hint = "";
                break;
            case 16: //money 200
                spawnWave(20, 800 * den, Math.floor(60 * hp), 3 * spd, 20, "green", 10, 0, 0, 0); //basic 
                hint = "";
                break;
            case 17: //money 200
                spawnWave(20, 600 * den, Math.floor(60 * hp), 3 * spd, 20, "green", 10, 0, 0, 0); //basic 
                hint = "armored enemies";
                break;
            case 18: //money 200
                spawnWave(20, 1000 * den, Math.floor(50 * hp), 3 * spd, 20, "red", 10, 1, 0, 0); //armored 
                hint = "2 armor";
                bonusHint = "enemies with Armor take Armor less damage (minimum 1)";
                break;
            case 19: //money 200
                spawnWave(20, 1000 * den, Math.floor(50 * hp), 3 * spd, 20, "red", 10, 2, 0, 0); //armored 
                hint = "more armor";
                break;
            case 20: //money 200
                spawnWave(20, 1000 * den, Math.floor(50 * hp), 3 * spd, 20, "red", 10, 5, 0, 0); //armored 
                hint = "high armor";
                bonusHint = "";
                break;
            case 21: //money 200
                spawnWave(20, 1000 * den, Math.floor(50 * hp), 3 * spd, 20, "red", 10, 10, 0, 0); //armored 
                hint = "";
                break;
            case 22: //money 100
                spawnWave(10, 1000 * den, Math.floor(100 * hp), 3 * spd, 20, "green", 10, 0, 0, 0); //high health 
                hint = "armored shields";
                break;
            case 23: //money 200
                spawnWave(20, 1000 * den, Math.floor(100 * hp), 3 * spd, 20, "red", 10, 2, 2, 0); //armored shields 
                hint = "5 armor, 5 shield";
                break;
            case 24: //money 200
                spawnWave(20, 1000 * den, Math.floor(100 * hp), 3 * spd, 20, "red", 10, 5, 5, 0); //armored shields  
                hint = "final wave";
                break;
            case 25: //money 500
                var multi = [];
                multi.push([10, 600 * den, Math.floor(50 * hp), 3 * spd, 20, "green", 10, 0, 0, 0]); //tighter pack
                multi.push([10, 600 * den, Math.floor(50 * hp), 3 * spd, 20, "green", 10, 0, 5, 0]); //shielded
                multi.push([10, 600 * den, Math.floor(50 * hp), 3 * spd, 20, "red", 10, 5, 0, 0]); //armored
                multi.push([10, 600 * den, Math.floor(50 * hp), 3 * spd, 20, "red", 10, 5, 5, 0]); //both
                multi.push([3, 5000 * den, Math.floor(700 * hp), 2 * spd, 20, "red", 100, 5, 10, 0]); //mini boss
                spawnMultiWaves(multi);
                bonusHint = "final wave";
                break;
            default:
                //win
                console.log("you win");
                gameIsOver = 1;
                gameOver();
        }
    }else if(pathNum == 1 && difficulty != 5 || (pathNum == 5 && difficulty == 2)){//cross
        switch(round){
            case 1: //money 50
                spawnWave(10, 1000 * den, Math.floor(10 * hp), 3 * spd, 20, "green", 5, 0, 0, 0); //basic 
                if(pathNum == 5){
                    hint = "These are the same waves as first challenge";
                    bonusHint = "but now they come from 3 paths!";
                }else{
                    hint = "Selecting the tower and clicking \"target\" in the top right";
                    bonusHint = "To prioritize enemies you can change a towers target by";
                }
                break;
            case 2: //money 100
                spawnWave(20, 800 * den, Math.floor(10 * hp), 3 * spd, 20, "green", 5, 0, 0, 0); //basic 
                if(pathNum == 5){
                    hint = "You are also very restricted in your tower use";
                    bonusHint = "Extreme Difficulty: Selling return 0 Money!";
                }else{
                    hint = "Selecting the tower and clicking \"target\" in the top right";
                    bonusHint = "To prioritize enemies you can change a towers target by";
                }
                break;
            case 3: //money 100
                var multi = [];
                multi.push([5, 500 * den, Math.floor(10 * hp), 3 * spd, 20, "green", 5, 0, 0, 0]); //tighter pack
                multi.push([10, 800 * den, Math.floor(10 * hp), 3 * spd, 20, "green", 5, 0, 0, 0]); //basics
                multi.push([5, 500 * den, Math.floor(10 * hp), 3 * spd, 20, "green", 5, 0, 0, 0]); //tighter pack
                spawnMultiWaves(multi);
                hint = "";
                break;
            case 4: //money 150
                spawnWave(30, 500 * den, Math.floor(10 * hp), 3 * spd, 20, "green", 5, 0, 0, 0); //basic 
                hint = "stronger";
                bonusHint = "";
                break;
            case 5: //money 100
                spawnWave(20, 500 * den, Math.floor(20 * hp), 3 * spd, 20, "green", 5, 0, 0, 0); //basic 
                hint = "";
                break;
            case 6: //money 150
                var multi = [];
                multi.push([10, 500 * den, Math.floor(20 * hp), 3 * spd, 20, "green", 5, 0, 0, 0]); //tighter pack
                multi.push([10, 800 * den, Math.floor(30 * hp), 3 * spd, 20, "green", 5, 0, 0, 0]); //basics
                multi.push([10, 500 * den, Math.floor(20 * hp), 3 * spd, 20, "green", 5, 0, 0, 0]); //tighter pack
                spawnMultiWaves(multi);
                hint = "grouped enemies";
                break;
            case 7: //money 80
                spawnWave(40, 200 * den, Math.floor(5 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                hint = "denser";
                break;
            case 8: //money 80
                spawnWave(40, 100 * den, Math.floor(5 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                hint = "more";
                break;
            case 9: //money 160
                spawnWave(80, 100 * den, Math.floor(5 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                hint = "stronger";
                break;
            case 10: //money 160
                spawnWave(80, 100 * den, Math.floor(10 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                hint = "";
                break;
            case 11: //money 100
                spawnWave(20, 1000 * den, Math.floor(40 * hp), 3 * spd, 20, "green", 5, 0, 1, 0); //basic 
                hint = "fast";
                bonusHint = "Slow towers are more effective the faster the enemies are";
                break;
            case 12: //money 100
                spawnWave(10, 1000 * den, Math.floor(40 * hp), 5 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "faster";
                break;
            case 13: //money 100
                spawnWave(10, 1000 * den, Math.floor(40 * hp), 6 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "faster";
                bonusHint = "";
                break;
            case 14: //money 200
                spawnWave(20, 1000 * den, Math.floor(40 * hp), 7 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "stronger";
                break;
            case 15: //money 200
                spawnWave(20, 1000 * den, Math.floor(60 * hp), 7 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "progressive";
                break;
            case 16: //money 250
                var multi = [];
                multi.push([10, 700 * den, Math.floor(50 * hp), 2 * spd, 20, "green", 5, 0, 0, 0]); //they will stack 
                multi.push([10, 700 * den, Math.floor(40 * hp), 3 * spd, 20, "green", 5, 0, 0, 0]); //
                multi.push([10, 700 * den, Math.floor(30 * hp), 4 * spd, 20, "green", 5, 0, 0, 0]); //
                multi.push([10, 700 * den, Math.floor(20 * hp), 5 * spd, 20, "green", 5, 0, 0, 0]); //
                multi.push([10, 700 * den, Math.floor(10 * hp), 6 * spd, 20, "green", 5, 0, 0, 0]); //
                spawnMultiWaves(multi);
                hint = "2 stacked";
                break;
            case 17: //money 200
                spawnWave(20, 600 * den, Math.floor(60 * hp), 3 * spd, 20, "green", 5, 0, 0, 0); //basic 
                spawnWave(20, 600 * den, Math.floor(60 * hp), 3 * spd, 20, "green", 5, 0, 0, 0); //basic 
                hint = "3";
                break;
            case 18: //money 300
                spawnWave(20, 600 * den, Math.floor(60 * hp), 3 * spd, 20, "green", 5, 0, 0, 0); //basic 
                spawnWave(20, 600 * den, Math.floor(60 * hp), 3 * spd, 20, "green", 5, 0, 0, 0); //basic 
                spawnWave(20, 600 * den, Math.floor(60 * hp), 3 * spd, 20, "green", 5, 0, 0, 0); //basic 
                hint = "grouped & fast";
                break;
            case 19: //money 300
                spawnWave(100, 150 * den, Math.floor(20 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                spawnWave(10, 1500 * den, Math.floor(60 * hp), 5 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "again but harder";
                break;
            case 20: //money 300
                spawnWave(100, 100 * den, Math.floor(20 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                spawnWave(10, 1000 * den, Math.floor(60 * hp), 6 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "again but stronger";
                break;
            case 21: //money 300
                spawnWave(100, 100 * den, Math.floor(30 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                spawnWave(10, 1000 * den, Math.floor(100 * hp), 6 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "what if the fast ones had shields?";
                break;
            case 22: //money 300
                spawnWave(100, 100 * den, Math.floor(30 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                spawnWave(10, 1000 * den, Math.floor(100 * hp), 6 * spd, 20, "yellow", 10, 0, 5, 0); //fast 
                hint = "basics";
                break;
            case 23: //money 100
                spawnWave(20, 1000 * den, Math.floor(300 * hp), 3 * spd, 20, "green", 5, 0, 0, 0); //high health
                hint = "regen basics";
                break;
            case 24: //money 200
                spawnWave(10, 2000 * den, Math.floor(500 * hp), 2 * spd, 20, "green", 20, 0, 0, 100); //high health 
                hint = "";
                bonusHint = "regen are slow but increase by 10 health periodically";
                break;
            case 25: //money 200
                spawnWave(10, 2000 * den, Math.floor(500 * hp), 2 * spd, 20, "green", 20, 0, 0, 75); //high health 
                hint = "";
                break;
            case 26: //money 200
                spawnWave(10, 2000 * den, Math.floor(500 * hp), 2 * spd, 20, "green", 20, 0, 0, 50); //high health 
                hint = "now with armor";
                bonusHint = "";
                break;
            case 27: //money 200
                spawnWave(10, 2000 * den, Math.floor(500 * hp), 2 * spd, 20, "red", 20, 10, 0, 50); //high health 
                hint = "grouped again";
                break;
            case 28: //money 200
                spawnWave(100, 100 * den, Math.floor(50 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                hint = "there is a boss coming soon";
                bonusHint = "Bosses cannot be slowed and cost 100 lives";
                break;
            case 29: //money 500
                var multi = [];
                multi.push([10, 1000 * den, Math.floor(100 * hp), 3 * spd, 20, "green", 10, 0, 0, 0]); //basic
                multi.push([50, 50 * den, Math.floor(20 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0]); //grouped
                multi.push([4, 2000 * den, Math.floor(800 * hp), 3 * spd, 20, "green", 20, 0, 0, 50]); //regen
                multi.push([10, 1000 * den, Math.floor(80 * hp), 6 * spd, 20, "yellow", 10, 0, 0, 0]); //fast
                multi.push([1, 5000 * den, Math.floor(1000 * hp), 2 * spd, 20, "red", 100, 10, 10, 40]); //everything
                spawnMultiWaves(multi);
                hint = "Spawner Boss";
                break;
            case 30:
                var boss = new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], Math.floor(5000 * hp), 1.4 * spd, spawnDirection(paths), 60, "boss", 500, 0, 0, 0, 1);
                enemies.push(boss);
                spawnWave(10, 1000 * den, Math.floor(50 * hp), 3 * spd, 15, "pink", 0, 0, 0, 0, 0, boss); //minions
                break;
            default:
                //win
                console.log("you win");
                gameIsOver = 1;
                gameOver();
        }
    }else if(pathNum == 2 && difficulty != 5 || (pathNum == 5 && difficulty == 3)){//double
        switch(round){
            case 1: //money 100
                spawnWave(20, 1000 * den, Math.floor(10 * hp), 3 * spd, 20, "green", 5, 0, 0, 0, 1); //basic 
                if(pathNum == 5){
                    hint = "These are the same waves as double";
                    bonusHint = "Unfinished challenge!";
                }else{
                    hint = "";
                    bonusHint = "";
                }
                break;
            case 2: //money 100
                spawnWave(20, 1000 * den, Math.floor(20 * hp), 3 * spd, 20, "green", 5, 0, 0, 0, 2); //basic 
                hint = "split";
                bonusHint = "";
                break;
            case 3: //money 150
                var multi = [];
                multi.push([10, 700 * den, Math.floor(20 * hp), 3 * spd, 20, "green", 5, 0, 0, 0, 2]); //tighter pack
                multi.push([10, 1000 * den, Math.floor(20 * hp), 3 * spd, 20, "green", 5, 0, 0, 0, 1]); //basics
                multi.push([10, 700 * den, Math.floor(20 * hp), 3 * spd, 20, "green", 5, 0, 0, 0, 2]); //tighter pack
                spawnMultiWaves(multi);
                hint = "tighter";
                break;
            case 4: //money 150
                spawnWave(30, 700 * den, Math.floor(20 * hp), 3 * spd, 20, "green", 5, 0, 0, 0); //basic 
                hint = "stronger";
                break;
            case 5: //money 100
                spawnWave(20, 1000 * den, Math.floor(40 * hp), 3 * spd, 20, "green", 5, 0, 0, 0); //basic 
                hint = "path 1";
                break;
            case 6: //money 150
                spawnWave(30, 750 * den, Math.floor(40 * hp), 3 * spd, 20, "green", 5, 0, 0, 0, 1); //basic 
                hint = "path 2";
                break;
            case 7: //money 200
                spawnWave(40, 600 * den, Math.floor(40 * hp), 3 * spd, 20, "green", 5, 0, 0, 0, 2); //basic  
                hint = "speedy & grouped";
                break;
            case 8: //money 250
                spawnWave(50, 200 * den, Math.floor(5 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0, 2); //grouped 
                spawnWave(15, 1000 * den, Math.floor(30 * hp), 6 * spd, 20, "yellow", 10, 0, 0, 0, 1); //fast 
                hint = "swapped";
                break;
            case 9: //money 250
                spawnWave(50, 200 * den, Math.floor(5 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0, 1); //grouped 
                spawnWave(15, 1000 * den, Math.floor(30 * hp), 6 * spd, 20, "yellow", 10, 0, 0, 0, 2); //fast 
                hint = "mixed";
                break;
            case 10: //money 450
                spawnWave(100, 200 * den, Math.floor(5 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0, 0); //grouped 
                spawnWave(25, 1000 * den, Math.floor(30 * hp), 6 * spd, 20, "yellow", 10, 0, 0, 0, 0); //fast 
                hint = "basic";
                bonusHint = "When in a good spot, the railgun can do a lot of damage on last";
                break;
            case 11: //money 200
                spawnWave(20, 800 * den, Math.floor(60 * hp), 3 * spd, 20, "green", 10, 0, 0, 0); //basic 
                hint = "stronger";
                break;
            case 12: //money 200
                spawnWave(20, 800 * den, Math.floor(80 * hp), 3 * spd, 20, "green", 10, 0, 0, 0); //basic 
                hint = "stronger";
                bonusHint = "";
                break;
            case 13: //money 200
                spawnWave(20, 800 * den, Math.floor(100 * hp), 3 * spd, 20, "green", 10, 0, 0, 0); //basic 
                hint = "armor";
                break;
            case 14: //money 200
                spawnWave(20, 1000 * den, Math.floor(100 * hp), 3 * spd, 20, "red", 10, 3, 0, 0); //armored 
                hint = "";
                break;
            case 15: //money 200
                spawnWave(20, 1000 * den, Math.floor(100 * hp), 3 * spd, 20, "red", 10, 5, 0, 0); //armored 
                hint = "regen";
                break;
            case 16: //money 400
                spawnWave(20, 1000 * den, Math.floor(200 * hp), 2 * spd, 20, "green", 20, 0, 0, 30); //regen 
                hint = "high regen";
                break;
            case 17: //money 400
                spawnWave(20, 1000 * den, Math.floor(200 * hp), 2 * spd, 20, "green", 20, 0, 0, 20); //regen 
                hint = "basic";
                break;
            case 18: //money 200
                spawnWave(20, 1000 * den, Math.floor(250 * hp), 3 * spd, 20, "green", 10, 0, 0, 0); //basic
                hint = "faster regen";
                break;
            case 19: //money 400
                spawnWave(10, 2000 * den, Math.floor(200 * hp), 2 * spd, 20, "green", 20, 0, 0, 10); //regen
                hint = "fast";
                break;
            case 20: //money 200
                spawnWave(20, 1000 * den, Math.floor(70 * hp), 6 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "faster";
                bonusHint = "";
                break;
            case 21: //money 200
                spawnWave(20, 1000 * den, Math.floor(70 * hp), 7 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "really fast";
                break;
            case 22: //money 100
                spawnWave(20, 1000 * den, Math.floor(70 * hp), 8 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "grouped";
                break;
            case 23: //money 500
                spawnWave(250, 100 * den, Math.floor(10 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0); //grouped
                hint = "dense";
                break;
            case 24: //money 500
                spawnWave(250, 70 * den, Math.floor(10 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                hint = "really dense";
                break;
            case 25: //money 1000
                spawnWave(250, 70 * den, Math.floor(10 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0, 1); //grouped 
                spawnWave(250, 70 * den, Math.floor(10 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0, 2); //grouped 
                hint = "stronger";
                break;
            case 26: //money 1000
                spawnWave(250, 70 * den, Math.floor(20 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0, 1); //grouped 
                spawnWave(250, 70 * den, Math.floor(20 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0, 2); //grouped 
                hint = "shielded grouped";
                break;
            case 27: //money 500
                spawnWave(250, 100 * den, Math.floor(20 * hp), 3 * spd, 20, "pink", 2, 0, 1, 0); //grouped
                hint = "basics";
                break;
            case 28: //money 200
                spawnWave(10, 2000 * den, Math.floor(500 * hp), 3 * spd, 20, "green", 20, 0, 0, 0); //basic
                hint = "high regen";
                break;
            case 29: //money 400
                spawnWave(10, 2000 * den, Math.floor(500 * hp), 2 * spd, 30, "green", 40, 0, 0, 20); //regen
                hint = "";
                break;
            case 30: //money 400
                spawnWave(10, 2000 * den, Math.floor(500 * hp), 2 * spd, 30, "green", 40, 0, 0, 15); //regen
                hint = "";
                break;
            case 31: //money 400
                spawnWave(10, 2000 * den, Math.floor(500 * hp), 2 * spd, 30, "green", 40, 0, 0, 10); //regen
                hint = "armored";
                break;
            case 32: //money 400
                spawnWave(10, 2000 * den, Math.floor(300 * hp), 3 * spd, 30, "red", 40, 5, 0, 0); //armored
                hint = "";
                break;
            case 33: //money 400
                spawnWave(10, 2000 * den, Math.floor(300 * hp), 3 * spd, 30, "red", 40, 10, 0, 0); //armored
                hint = "The Armored Boss";
                break;
            case 34: //money 1000
                spawnWave(0, 0, 1, .7, 1, "clear", 0, 0, 0, 0, 1);
                var armoredBoss = new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], Math.floor(5000 * hp), 0.7 * spd, spawnDirection(paths), 60, "boss", 1000, 15, 10, 0, 1);
                enemies.push(armoredBoss);
                hint = "The Real Armored Boss";
                bonusHint = "nah this is just his lil brother";
                break;
            case 35: //money 1000
                spawnWave(0, 0, 1, .4, 1, "clear", 0, 0, 0, 0, 1);
                var armoredBoss = new Enemy(spawnPoint(paths2)[0], spawnPoint(paths2)[1], Math.floor(10000 * hp), 0.4 * spd, spawnDirection(paths2), 60, "boss", 1000, 20, 15, 30, 2);
                enemies.push(armoredBoss);
                hint = "Final Wave";
                bonusHint = "I will Crush You All!!!";
                break;
            case 36: //money 100
                spawnWave(10, 1000 * den, Math.floor(10 * hp), 3 * spd, 30, "green", 5, 0, 0, 0); //basic
                bonusHint = "I will return just you wait..."
                break;
            default:
                //win
                console.log("you win");
                gameIsOver = 1;
                gameOver();
        }
    }else if(pathNum == 3 && difficulty != 5 || (pathNum == 5 && difficulty == 4)){//symmetry
        switch(round){
            case 1: //money 100
                spawnWave(20, 500 * den, Math.floor(20 * hp), 3.5 * spd, 20, "green", 5, 0, 0, 0); //basic 
                if(pathNum == 5){
                    hint = "These are the same waves as Symmetry";
                    bonusHint = "Unfinished challenge!";
                }else{
                    hint = "Farms Generate Money at the END of each round";
                    bonusHint = "";
                }
                break;
            case 2: //money 150
                var multi = [];
                multi.push([10, 500 * den, Math.floor(20 * hp), 3.5 * spd, 20, "green", 5, 0, 0, 0]); //tighter pack
                multi.push([10, 800 * den, Math.floor(30 * hp), 3.5 * spd, 20, "green", 5, 0, 0, 0]); //basics
                multi.push([10, 500 * den, Math.floor(20 * hp), 3.5 * spd, 20, "green", 5, 0, 0, 0]); //tighter pack
                spawnMultiWaves(multi);
                hint = "grouped enemies";
                bonusHint = "Enemies here go a full circle before leaving";
                break;
            case 3: //money 160
                spawnWave(80, 200 * den, Math.floor(5 * hp), 3.5 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                hint = "denser";
                bonusHint = "";
                break;
            case 4: //money 160
                spawnWave(80, 100 * den, Math.floor(5 * hp), 3.5 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                hint = "more";
                break;
            case 5: //money 320
                spawnWave(160, 100 * den, Math.floor(5 * hp), 3.5 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                hint = "stronger";
                bonusHint = "Remember you can also upgrade your farm!";
                break;
            case 6: //money 320
                spawnWave(160, 100 * den, Math.floor(10 * hp), 3.5 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                hint = "";
                break;
            case 7: //money 100
                spawnWave(20, 800 * den, Math.floor(50 * hp), 3.5 * spd, 20, "green", 5, 0, 1, 0); //basic 
                hint = "fast";
                break;
            case 8: //money 200
                spawnWave(20, 500 * den, Math.floor(40 * hp), 6 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "faster";
                break;
            case 9: //money 200
                spawnWave(20, 500 * den, Math.floor(40 * hp), 7 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "faster";
                bonusHint = "";
                break;
            case 10: //money 300
                spawnWave(30, 500 * den, Math.floor(40 * hp), 8 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "stronger";
                break;
            case 11: //money 200
                spawnWave(20, 500 * den, Math.floor(80 * hp), 8 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "5 stacked";
                break;
            case 12: //money 500
                spawnWave(20, 800 * den, Math.floor(50 * hp), 3.5 * spd, 20, "green", 5, 0, 0, 0) //basic
                spawnWave(20, 800 * den, Math.floor(50 * hp), 3.5 * spd, 20, "green", 5, 0, 0, 0) //basic
                spawnWave(20, 800 * den, Math.floor(50 * hp), 3.5 * spd, 20, "green", 5, 0, 0, 0) //basic
                spawnWave(20, 800 * den, Math.floor(50 * hp), 3.5 * spd, 20, "green", 5, 0, 0, 0) //basic
                spawnWave(20, 800 * den, Math.floor(50 * hp), 3.5 * spd, 20, "green", 5, 0, 0, 0) //basic
                hint = "";
                break;
            case 13: //money 500
                spawnWave(20, 800 * den, Math.floor(50 * hp), 3.5 * spd, 20, "green", 5, 0, 1, 0) //basic
                spawnWave(20, 800 * den, Math.floor(50 * hp), 3.5 * spd, 20, "green", 5, 0, 1, 0) //basic
                spawnWave(20, 800 * den, Math.floor(50 * hp), 3.5 * spd, 20, "green", 5, 0, 1, 0) //basic
                spawnWave(20, 800 * den, Math.floor(50 * hp), 3.5 * spd, 20, "green", 5, 0, 1, 0) //basic
                spawnWave(20, 800 * den, Math.floor(50 * hp), 3.5 * spd, 20, "green", 5, 0, 1, 0) //basic
                hint = "";
                break;
            case 14: //money 500
                spawnWave(20, 800 * den, Math.floor(50 * hp), 3.5 * spd, 20, "green", 5, 0, 2, 0) //basic
                spawnWave(20, 800 * den, Math.floor(50 * hp), 3.5 * spd, 20, "green", 5, 0, 2, 0) //basic
                spawnWave(20, 800 * den, Math.floor(50 * hp), 3.5 * spd, 20, "green", 5, 0, 2, 0) //basic
                spawnWave(20, 800 * den, Math.floor(50 * hp), 3.5 * spd, 20, "green", 5, 0, 2, 0) //basic
                spawnWave(20, 800 * den, Math.floor(50 * hp), 3.5 * spd, 20, "green", 5, 0, 2, 0) //basic
                hint = "grouped & fast";
                break;
            case 15: //money 400
                spawnWave(100, 100 * den, Math.floor(30 * hp), 3.5 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                spawnWave(20, 500 * den, Math.floor(80 * hp), 6 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "armored";
                break;
            case 16: //money 400
                spawnWave(100, 100 * den, Math.floor(30 * hp), 3.5 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                spawnWave(20, 500 * den, Math.floor(80 * hp), 6 * spd, 20, "yellow", 10, 5, 0, 0); //fast 
                hint = "shielded";
                break;
            case 17: //money 400
                spawnWave(100, 100 * den, Math.floor(30 * hp), 3.5 * spd, 20, "pink", 2, 0, 1, 0); //grouped 
                spawnWave(20, 500 * den, Math.floor(80 * hp), 6 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "tanks";
                break;
            case 18: //money 400
                spawnWave(10, 2000 * den, Math.floor(800 * hp), 2 * spd, 30, "green", 40, 0, 0, 0); //slow 
                hint = "shield";
                break;
            case 19: //money 400
                spawnWave(10, 2000 * den, Math.floor(800 * hp), 2 * spd, 30, "green", 40, 0, 10, 0); //slow  
                hint = "armor";
                break;
            case 20: //money 400
                spawnWave(10, 2000 * den, Math.floor(800 * hp), 2 * spd, 30, "red", 40, 10, 0, 0); //slow  
                hint = "regen";
                break;
            case 21: //money 400
                spawnWave(10, 2000 * den, Math.floor(800 * hp), 2 * spd, 30, "green", 40, 0, 0, 10); //slow  
                hint = "really strong";
                break;
            case 22: //money 400
                spawnWave(10, 2000 * den, Math.floor(1200 * hp), 2 * spd, 30, "green", 40, 0, 0, 10); //slow  
                hint = "just health";
                break;
            case 23: //money 400
                spawnWave(10, 2000 * den, Math.floor(2000 * hp), 2 * spd, 30, "green", 40, 0, 0, 0); //high health 
                hint = "grouped again";
                break;
            case 24: //money 200
                spawnWave(100, 100 * den, Math.floor(50 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                hint = "";
                break;
            case 25: //money 400
                spawnWave(200, 90 * den, Math.floor(50 * hp), 3.5 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                hint = "";
                break;
            case 26: //money 600
                spawnWave(300, 80 * den, Math.floor(50 * hp), 4 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                hint = "";
                break;
            case 27://money 600
                spawnWave(300, 70 * den, Math.floor(50 * hp), 4.5 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                bonusHint = "Hope you have some max towers!";
                hint = "mini speed boss";
                break;
            case 28://money 1000
                spawnWave(0, 0, 1, 3.5, 1, "clear", 0, 0, 0, 0, 1);
                var speedBoss = new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], Math.floor(2500 * hp), 3.5 * spd, spawnDirection(paths), 60, "boss", 1000, 0, 0, 0, 1);
                enemies.push(speedBoss);
                hint = "mega tanks approaching";
                break;
            case 29: //money 2600
                var multi = [];
                multi.push([20, 1000 * den, Math.floor(100 * hp), 3 * spd, 20, "green", 20, 0, 0, 0, 1]); //tighter pack
                multi.push([20, 1000 * den, Math.floor(100 * hp), 3 * spd, 20, "green", 20, 0, 10, 0, 2]); //shielded
                multi.push([20, 1000 * den, Math.floor(100 * hp), 3 * spd, 20, "red", 20, 10, 0, 0, 1]); //armored
                multi.push([20, 1000 * den, Math.floor(100 * hp), 3 * spd, 20, "red", 20, 10, 10, 0, 2]); //both
                multi.push([5, 3000 * den, Math.floor(1000 * hp), 3 * spd, 20, "red", 200, 10, 10, 0]); //mini boss
                spawnMultiWaves(multi);
                hint = "mega basic";
                bonusHint = "Max towers are usually around 2x as good as the level 5";
                break;
            case 30: //money 600
                spawnWave(20, 1000 * den, Math.floor(2000 * hp), 3 * spd, 20, "green", 60, 0, 0, 0); //basic 
                hint = "mega speed";
                break;
            case 31: //money 600
                spawnWave(10, 500 * den, Math.floor(200 * hp), 10 * spd, 20, "yellow", 60, 0, 0, 0); //fast 
                hint = "mega grouped"; 
                bonusHint = "";
                break;
            case 32://money 1000
                spawnWave(500, 10 * den, Math.floor(2 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                hint = "mega shield";
                break;
            case 33: //money 600
                spawnWave(8, 1000 * den, Math.floor(1000 * hp), 3 * spd, 40, "green", 75, 0, 50, 0); //shielded 
                hint = "mega armor";
                break;
            case 34://money 600
                spawnWave(4, 2000 * den, Math.floor(1000 * hp), 3 * spd, 40, "red", 150, 50, 0, 0); //armored 
                hint = "mega regen";
                break;
            case 35: //money 600
                spawnWave(2, 2000 * den, Math.floor(2500 * hp), 1.7 * spd, 40, "green", 300, 0, 0, 5); //slow 
                hint = "combinations fast+grouped+regen";
                break;
            case 36://money 600
                spawnWave(100, 100 * den, Math.floor(100 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                spawnWave(5, 2000 * den, Math.floor(2000 * hp), 2 * spd, 40, "green", 40, 0, 0, 10); //slow 
                spawnWave(20, 500 * den, Math.floor(300 * hp), 10 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "longer";
                break;
            case 37: //money 1200
                spawnWave(200, 100 * den, Math.floor(100 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                spawnWave(10, 2000 * den, Math.floor(2000 * hp), 2 * spd, 40, "green", 40, 0, 0, 10); //slow 
                spawnWave(40, 500 * den, Math.floor(300 * hp), 10 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "armored + shielded + basic";
                break;
            case 38: //money 1200
                var multi = [];
                for(var i=0; i<10; i++){
                    multi.push([1, 500 * den, Math.floor(500 * hp), 3 * spd, 40, "green", 20, 0, 10, 0, 1]); //shielded
                    multi.push([1, 500 * den, Math.floor(500 * hp), 3 * spd, 20, "red", 20, 10, 0, 0, 1]); //armored
                    multi.push([1, 500 * den, Math.floor(500 * hp), 3 * spd, 20, "green", 20, 0, 0, 0, 1]); //basic
                }
                spawnMultiWaves(multi);
                var multi = [];
                for(var i=0; i<10; i++){
                    multi.push([1, 500 * den, Math.floor(500 * hp), 3 * spd, 40, "green", 20, 0, 10, 0, 2]); //shielded
                    multi.push([1, 500 * den, Math.floor(500 * hp), 3 * spd, 20, "red", 20, 10, 0, 0, 2]); //armored
                    multi.push([1, 500 * den, Math.floor(500 * hp), 3 * spd, 20, "green", 20, 0, 0, 0, 2]); //basic
                }
                spawnMultiWaves(multi);
                break;
            case 39: //money 2400
                var multi = [];
                for(var i=0; i<20; i++){
                    multi.push([1, 500 * den, Math.floor(500 * hp), 3 * spd, 40, "green", 20, 0, 10, 0, 1]); //shielded
                    multi.push([1, 500 * den, Math.floor(500 * hp), 3 * spd, 20, "red", 20, 10, 0, 0, 1]); //armored
                    multi.push([1, 500 * den, Math.floor(500 * hp), 3 * spd, 20, "green", 20, 0, 0, 0, 1]); //basic
                }
                spawnMultiWaves(multi);
                var multi = [];
                for(var i=0; i<20; i++){
                    multi.push([1, 500 * den, Math.floor(500 * hp), 3 * spd, 40, "green", 20, 0, 10, 0, 2]); //shielded
                    multi.push([1, 500 * den, Math.floor(500 * hp), 3 * spd, 20, "red", 20, 10, 0, 0, 2]); //armored
                    multi.push([1, 500 * den, Math.floor(500 * hp), 3 * spd, 20, "green", 20, 0, 0, 0, 2]); //basic
                }
                spawnMultiWaves(multi);
                hint = "Double Speed Boss";
                break;
            case 40:
                spawnWave(0, 0, 1, 5, 1, "clear", 0, 0, 0, 0, 1);
                var speedBoss = new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], Math.floor(4000 * hp), 5 * spd, spawnDirection(paths), 60, "boss", 500, 0, 0, 0, 1);
                enemies.push(speedBoss);
                spawnWave(0, 0, 1, 5, 1, "clear", 0, 0, 0, 0, 2);
                var speedBoss2 = new Enemy(spawnPoint(paths2)[0], spawnPoint(paths2)[1], Math.floor(4000 * hp), 5 * spd, spawnDirection(paths2), 60, "boss", 500, 0, 0, 0, 2);
                enemies.push(speedBoss2);
                break;
            default:
                //win
                console.log("you win");
                gameIsOver = 1;
                gameOver();
        }
    }else if(pathNum == 4 && difficulty != 5 || (pathNum == 5 && difficulty == 3)){//castle
        switch(round){
            case 1: //money 100
                spawnWave(20, 700 * den, Math.floor(30 * hp), 3 * spd, 20, "green", 5, 0, 0, 0); //basic 
                hint = "";
                break;
            case 2: //money 150
                var multi = [];
                multi.push([10, 700 * den, Math.floor(30 * hp), 3 * spd, 20, "green", 5, 0, 0, 0]); //basic
                multi.push([10, 400 * den, Math.floor(30 * hp), 3 * spd, 20, "green", 5, 0, 0, 0]); //tighter 
                multi.push([10, 700 * den, Math.floor(30 * hp), 3 * spd, 20, "green", 5, 0, 0, 0]); //basic
                spawnMultiWaves(multi);
                hint = "grouped";
                bonusHint = "";
                break;
            case 3: //money 70
                spawnWave(35, 120 * den, Math.floor(10 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                hint = "";
                bonusHint = "";
                break;
            case 4: //money 90
                spawnWave(45, 120 * den, Math.floor(12 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                hint = "";
                break;
            case 5: //money 110
                spawnWave(55, 120 * den, Math.floor(15 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                hint = "shielded";
                bonusHint = "";
                break;
            case 6: //money 200
                spawnWave(20, 700 * den, Math.floor(60 * hp), 3 * spd, 20, "green", 10, 0, 2, 0); //basic 
                hint = "";
                break;
            case 7: //money 400
                spawnWave(40, 700 * den, Math.floor(60 * hp), 3 * spd, 20, "green", 10, 0, 3, 0); //basic 
                hint = "fast";
                break;
            case 8: //money 400
                spawnWave(40, 350 * den, Math.floor(40 * hp), 6 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "";
                break;
            case 9: //money 400
                spawnWave(40, 350 * den, Math.floor(40 * hp), 7 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "";
                bonusHint = "";
                break;
            case 10: //money 500
                spawnWave(50, 350 * den, Math.floor(40 * hp), 8 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "armored";
                break;
            case 11: //money 200
                spawnWave(10, 1000 * den, Math.floor(100 * hp), 3 * spd, 30, "red", 20, 10, 0, 0); //armored 
                hint = "stacked";
                break;
            case 12: //money 500
                spawnWave(20, 1000 * den, Math.floor(50 * hp), 3 * spd, 20, "green", 5, 0, 0, 0) //basic
                spawnWave(20, 1000 * den, Math.floor(50 * hp), 3 * spd, 20, "green", 5, 0, 0, 0) //basic
                spawnWave(20, 1000 * den, Math.floor(50 * hp), 3 * spd, 20, "green", 5, 0, 0, 0) //basic
                spawnWave(20, 1000 * den, Math.floor(50 * hp), 3 * spd, 20, "green", 5, 0, 0, 0) //basic
                spawnWave(20, 1000 * den, Math.floor(50 * hp), 3 * spd, 20, "green", 5, 0, 0, 0) //basic
                hint = "";
                break;
            case 13: //money 800
                spawnWave(20, 1000 * den, Math.floor(50 * hp), 3 * spd, 20, "green", 5, 0, 0, 0) //basic
                spawnWave(20, 1000 * den, Math.floor(50 * hp), 3 * spd, 20, "green", 5, 0, 0, 0) //basic
                spawnWave(20, 1000 * den, Math.floor(50 * hp), 3 * spd, 20, "green", 5, 0, 0, 0) //basic
                spawnWave(20, 1000 * den, Math.floor(50 * hp), 3 * spd, 20, "green", 5, 0, 0, 0) //basic
                spawnWave(20, 1000 * den, Math.floor(50 * hp), 3 * spd, 20, "green", 5, 0, 0, 0) //basic
                spawnWave(20, 1000 * den, Math.floor(50 * hp), 3 * spd, 20, "green", 5, 0, 0, 0) //basic
                spawnWave(20, 1000 * den, Math.floor(50 * hp), 3 * spd, 20, "green", 5, 0, 0, 0) //basic
                spawnWave(20, 1000 * den, Math.floor(50 * hp), 3 * spd, 20, "green", 5, 0, 0, 0) //basic
                hint = "regen";
                break;
            case 14: //money 200
                spawnWave(10, 1000 * den, Math.floor(250 * hp), 2 * spd, 20, "green", 20, 0, 0, 15) //regen
                hint = "???";
                break;
            case 15: //money 500
                var newBoss = new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], Math.floor(200 * hp), 0.7 * spd, spawnDirection(paths), 60, "boss", 500, 100, 10, 0, 1);
                enemies.push(newBoss);
                spawnWave(10, 2000, 200, 0.4, 20, "red", 10, 100, 10, 0, 0, newBoss);
                hint = "grouped + fast";
                break;
            case 16: //money 600
                spawnWave(150, 100 * den, Math.floor(40 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0); //grouped 
                spawnWave(30, 500 * den, Math.floor(80 * hp), 6 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "fast + armored";
                break;
            case 17: //money 550
                spawnWave(25, 800 * den, Math.floor(50 * hp), 3 * spd, 20, "red", 10, 20, 0, 0); //armored 
                spawnWave(30, 500 * den, Math.floor(80 * hp), 6 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                hint = "armored + regen";
                break;
            case 18: //money 550
                spawnWave(25, 800 * den, Math.floor(50 * hp), 3 * spd, 20, "red", 10, 20, 0, 0); //armored 
                spawnWave(20, 1000 * den, Math.floor(150 * hp), 2 * spd, 30, "green", 10, 0, 0, 15); //regen
                hint = "regen + shield";
                break;
            case 19: //money 600
                spawnWave(30, 700 * den, Math.floor(200 * hp), 3 * spd, 20, "green", 10, 0, 10, 0); //shielded
                spawnWave(20, 1000 * den, Math.floor(150 * hp), 2 * spd, 30, "green", 10, 0, 0, 15); //regen
                hint = "high health";
                break;
            case 20: //money 500
                spawnWave(50, 1000 * den, Math.floor(500 * hp), 3 * spd, 30, "green", 10, 0, 0, 0); //basic  
                hint = "everything";
                break;
            case 21: //money 1450
                spawnWave(150, 100 * den, Math.floor(40 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0); //grouped  
                spawnWave(25, 800 * den, Math.floor(50 * hp), 3 * spd, 20, "red", 10, 20, 0, 0); //armored 
                spawnWave(30, 500 * den, Math.floor(80 * hp), 6 * spd, 20, "yellow", 10, 0, 0, 0); //fast 
                spawnWave(30, 700 * den, Math.floor(200 * hp), 3 * spd, 20, "green", 10, 0, 10, 0); //shielded
                spawnWave(20, 1000 * den, Math.floor(150 * hp), 2 * spd, 30, "green", 10, 0, 0, 15); //regen
                hint = "heavy tanks";
                break;
            case 22: //money 300
                spawnWave(6, 8000 * den, Math.floor(1000 * hp), 1 * spd, 30, "green", 50, 20, 10, 5); //slow  
                hint = "2k";
                break;
            case 23: //money 500
                spawnWave(10, 4000 * den, Math.floor(5000 * hp), 2 * spd, 30, "green", 50, 0, 0, 0); //high health 
                hint = "the clump";
                break;
            case 24: //money 500
                spawnWave(500, 1, 1, 3 * spd, 20, "pink", 1, 0, 0, 0); //clumped 
                hint = "super shields";
                break;
            case 25: //money 400
                spawnWave(40, 2300, 1, 1, 20, "green", 10, 0, 100, 8, 0); //shielded
                hint = "Shielded boss";
                break;
            case 26: //money 600
                waveTimeout([0, 0, 1, 1, 1, "clear", 0, 0, 0, 0, 1], 0);
                var shieldedBoss = new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], 1, 1 * spd, spawnDirection(paths), 60, "boss", 600, 0, 1000, 0, 1);
                bossTimeout(shieldedBoss, 0);
                hint = "grouped fast";
                break;
            case 27: //money 600
                spawnWave(150, 100 * den, Math.floor(100 * hp), 7 * spd, 20, "yellow", 4, 0, 0, 0); //grouped fast 
                hint = "fast armored";
                break;
            case 28: //money 300
                spawnWave(30, 600 * den, Math.floor(250 * hp), 7 * spd, 20, "red", 10, 20, 0, 0); //armored fast
                hint = "armored regen";
                break;
            case 29: //money 600
                spawnWave(30, 1000 * den, Math.floor(400 * hp), 2 * spd, 30, "red", 20, 30, 0, 5); //armored regen
                hint = "shielded regen";
                break;
            case 30: //money 600
                spawnWave(30, 1000 * den, Math.floor(500 * hp), 2 * spd, 30, "green", 20, 0, 30, 5); //shielded regen
                hint = "Boss Rush!";
                break;
            case 31: //money 500+
                waveTimeout([0, 0, 1, 1, 1, "clear", 0, 0, 0, 0, 1], 0);
                var miniBoss = new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], Math.floor(10000 * hp), 1 * spd, spawnDirection(paths), 60, "boss", 100, 0, 0, 0, 1);
                bossTimeout(miniBoss, 0);
                waveTimeout([150, 200 * den, Math.floor(100 * hp), 3 * spd, 20, "pink", 2, 0, 0, 0, 0, miniBoss], 100); //grouped 

                waveTimeout([0, 0, 1, 1, 1, "clear", 0, 0, 0, 0, 1], 6000);
                var miniBoss1 = new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], Math.floor(10000 * hp), 1 * spd, spawnDirection(paths), 60, "boss", 100, 0, 0, 0, 1);
                bossTimeout(miniBoss1, 6000);
                waveTimeout([25, 1000 * den, Math.floor(150 * hp), 3 * spd, 20, "red", 10, 20, 0, 0, 0, miniBoss1], 6100); //armored
                
                waveTimeout([0, 0, 1, 1, 1, "clear", 0, 0, 0, 0, 1], 12000);
                var miniBoss2 = new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], Math.floor(10000 * hp), 1 * spd, spawnDirection(paths), 60, "boss", 100, 0, 0, 0, 1);
                bossTimeout(miniBoss2, 12000);
                waveTimeout([30, 1500 * den, Math.floor(200 * hp), 8 * spd, 20, "yellow", 10, 0, 0, 0, 0, miniBoss2], 12100); //speed 

                waveTimeout([0, 0, 1, 1, 1, "clear", 0, 0, 0, 0, 1], 18000);
                var miniBoss3 = new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], Math.floor(10000 * hp), 1 * spd, spawnDirection(paths), 60, "boss", 100, 0, 0, 0, 1);
                bossTimeout(miniBoss3, 18000);
                waveTimeout([30, 1800 * den, Math.floor(300 * hp), 3 * spd, 20, "green", 10, 0, 20, 0, 0, miniBoss3], 18100); //shielded 

                waveTimeout([0, 0, 1, 1, 1, "clear", 0, 0, 0, 0, 1], 24000);
                var miniBoss4 = new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], Math.floor(10000 * hp), 1 * spd, spawnDirection(paths), 60, "boss", 100, 0, 0, 0, 1);
                bossTimeout(miniBoss4, 24000);
                waveTimeout([20, 2500 * den, Math.floor(500 * hp), 2 * spd, 30, "green", 10, 0, 0, 6, 0, miniBoss4], 24100); //regen 
                hint = "Something is approaching";
                break;
            case 32: //money 600
                spawnWave(20, 500 * den, Math.floor(100 * hp), 15 * spd, 20, "yellow", 30, 0, 0, 0); //fast 
                hint = "Armored Boss"; 
                bonusHint = "Return of the armored Bohemoth";
                break;
            case 33: //money 1000
                spawnWave(0, 0, 1, .3, 1, "clear", 0, 0, 0, 0, 1);
                var armoredBoss = new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], Math.floor(20000 * hp), 0.3 * spd, spawnDirection(paths), 60, "boss", 1000, 200, 500, 1, 1);
                enemies.push(armoredBoss);
                hint = "Final Wave";
                break;
            default:
                //win
                console.log("you win");
                gameIsOver = 1;
                gameOver();
        }
    }else if(pathNum == 5 && difficulty == 4){//tripple
        switch(round){
            case 1: //money 100
                spawnWave(10, 1000 * den, Math.floor(10 * hp), 3 * spd, 20, "green", 10, 0, 0, 0); //basic 
                hint = "not finished yet";
                bonusHint = "no waves created for this map yet";
                break;
            default:
                //win
                console.log("you win");
                gameIsOver = 1;
                gameOver();
        }
    }else if(difficulty == 5){//sandbox
        switch (round) {
            case 1: //money 100
                spawnWave(10, 1000 * den, Math.floor(10 * hp), 3 * spd, 20, "green", 10, 0, 0, 0); //basic 
                hint = "basic";
                bonusHint = "";
                break;
            case 2: //money 110
                spawnWave(11, 1000 * den, Math.floor(15 * hp), 3 * spd, 20, "green", 10, 0, 0, 0); //basic
                break;
            case 3: //money 120
                spawnWave(12, 1000 * den, Math.floor(20 * hp), 3 * spd, 20, "green", 10, 0, 0, 0); //basic
                break;
            case 4: //money 130
                spawnWave(13, 1000 * den, Math.floor(25 * hp), 3 * spd, 20, "green", 10, 0, 0, 0); //basic
                break;
            case 5: //money 140
                spawnWave(14, 1000 * den, Math.floor(30 * hp), 3 * spd, 20, "green", 10, 0, 0, 0); //basic
                hint = "fast";
                break;
            case 6: //money 150
                spawnWave(15, 1000 * den, Math.floor(30 * hp), 5.5 * spd, 20, "yellow", 10, 0, 0, 0); //fast
                break;
            case 7: //money 160
                spawnWave(16, 1000 * den, Math.floor(40 * hp), 6 * spd, 20, "yellow", 10, 0, 0, 0); //fast
                break;
            case 8: //money 170
                spawnWave(17, 1000 * den, Math.floor(50 * hp), 6.5 * spd, 20, "yellow", 10, 0, 0, 0); //fast
                hint = "grouped";
                break;
            case 9: //money 180
                spawnWave(30, 80, 5, 3 * spd, 15, "pink", 6, 0, 0, 0); //grouped
                break;
            case 10: //money 190
                spawnWave(40, 70, 5, 3 * spd, 15, "pink", 4.75, 0, 0, 0); //grouped
                break;
            case 11: //money 200
                spawnWave(50, 60, 5, 3 * spd, 15, "pink", 4, 0, 0, 0); //grouped
                hint = "shielded";
                break;
            case 12: //money 210
                spawnWave(20, 1000 * den, Math.floor(50 * hp), 3 * spd, 20, "green", 10.5, 0, 1, 0); //shielded
                break;
            case 13: //money 220
                spawnWave(20, 1000 * den, Math.floor(50 * hp), 3 * spd, 20, "green", 11, 0, 2, 0); //shielded
                break;
            case 14: //money 230
                spawnWave(20, 1000 * den, Math.floor(50 * hp), 3 * spd, 20, "green", 11.5, 0, 4, 0); //shielded
                hint = "armored";
                break;
            case 15: //money 240
                spawnWave(10, 1000 * den, Math.floor(100 * hp), 3 * spd, 35, "red", 18, 5, 0, 0); //armored
                break;
            case 16: //money 250
                spawnWave(10, 1000 * den, Math.floor(100 * hp), 3 * spd, 35, "red", 18, 10, 0, 0); //armored
                break;
            case 17: //money 260
                spawnWave(10, 1000 * den, Math.floor(100 * hp), 3 * spd, 35, "red", 18, 15, 0, 0); //armored
                hint = "grouped then fast";
                break;
            case 18: //money 270 
                var multi = [];
                multi.push([50, 200, 5, 3 * spd, 15, "pink", 4, 0, 0, 0]); //grouped then fast
                multi.push([10, 500 * den, Math.floor(20 * hp), 6 * spd, 20, "yellow", 7, 0, 0, 0]);
                spawnMultiWaves(multi);
                break;
            case 19: //money 280
                var multi = [];
                multi.push([50, 150, 5, 3 * spd, 15, "pink", 4, 0, 0]); //grouped then fast
                multi.push([10, 500 * den, Math.floor(30 * hp), 6 * spd, 20, "yellow", 8, 0, 0, 0]);
                spawnMultiWaves(multi);
                break;
            case 20: //money 290
                var multi = [];
                multi.push([50, 100, 5, 3 * spd, 15, "pink", 4, 0, 0]); //grouped then fast
                multi.push([10, 500 * den, Math.floor(40 * hp), 6 * spd, 20, "yellow", 9, 0, 0, 0]);
                spawnMultiWaves(multi);
                hint = "mini boss";
                break;
            case 21: //money 300 
                var multi = [];
                multi.push([10, 1000 * den, Math.floor(150 * hp), 3 * spd, 20, "green", 6, 0, 0, 0]); //basic
                multi.push([10, 1000 * den, Math.floor(40 * hp), 6 * spd, 20, "yellow", 6, 0, 0, 0]); //fast
                multi.push([50, 150, Math.floor(10 * hp), 3 * spd, 15, "pink", 1, 0, 0, 0]); //grouped
                multi.push([10, 1000 * den, Math.floor(150 * hp), 3 * spd, 20, "green", 6, 0, 5, 0]); //shielded
                multi.push([4, 5000 * den, Math.floor(500 * hp), 2, 40, "red", 17.5, 10, 0, 0]); //mini boss
                spawnMultiWaves(multi);
                hint = "basic";
                break;
            case 22: //money 310 
                spawnWave(20, 800 * den, Math.floor(250 * hp), 3 * spd, 20, "green", 15.5, 0, 0, 0); //basic
                break;
            case 23: //money 320 
                spawnWave(20, 800 * den, Math.floor(300 * hp), 3 * spd, 20, "green", 16, 0, 0, 0); //basic
                break;
            case 24: //money 330 
                spawnWave(20, 800 * den, Math.floor(350 * hp), 3 * spd, 20, "green", 16.5, 0, 0, 0); //basic
                hint = "spawner boss";
                break;
            case 25: // money 340+500
                spawnWave(1, 1, 1, 1, 20, "clear", 0, 0, 0, 0, 1);
                var boss = new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], Math.floor(8000 * hp), 1 * spd, spawnDirection(paths), 60, "boss", 840, 0, 0, 0, 1);
                enemies.push(boss);
                spawnWave(10, 1000 * den, Math.floor(50 * hp), 3 * spd, 15, "pink", 0, 0, 0, 0, boss); //minions
                hint = "fast";
                break;
            case 26: //fast 350
                spawnWave(25, 800 * den, Math.floor(100 * hp), 7 * spd, 20, "yellow", 14, 0, 0, 0);
                break;
            case 27: //fast 360
                spawnWave(25, 800 * den, Math.floor(100 * hp), 8 * spd, 20, "yellow", 14.4, 0, 0, 0);
                break;
            case 28: //fast 370
                spawnWave(25, 800 * den, Math.floor(100 * hp), 9 * spd, 20, "yellow", 14.8, 0, 0, 0);
                hint = "grouped";
                break;
            case 29: //grouped 380
                spawnWave(100, 150 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 3.8, 0, 0, 0);
                break;
            case 30: //grouped 390
                spawnWave(150, 100 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 2.6, 0, 0, 0);
                break;
            case 31: //grouped 400
                spawnWave(200, 50 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 2, 0, 0, 0);
                hint = "tanks";
                break;
            case 32: //tanks 410
                spawnWave(10, 3000 * den, Math.floor(1000 * hp), 3 * spd, 20, "green", 41, 0, 0, 0);
                break;
            case 33: //tanks 420
                spawnWave(10, 3000 * den, Math.floor(1500 * hp), 3 * spd, 20, "green", 42, 0, 0, 0);
                break;
            case 34: //tanks 430
                spawnWave(10, 3000 * den, Math.floor(2000 * hp), 3 * spd, 20, "green", 43, 0, 0, 0);
                hint = "armored";
                break;
            case 35: // armored 440
                spawnWave(20, 1000 * den, Math.floor(200 * hp), 3 * spd, 35, "red", 22, 20, 0, 0);
                break;
            case 36: // armored 450
                spawnWave(20, 1000 * den, Math.floor(200 * hp), 3 * spd, 35, "red", 22.5, 30, 0, 0);
                break;
            case 37: // armored 460
                spawnWave(20, 1000 * den, Math.floor(200 * hp), 3 * spd, 35, "red", 23, 40, 0, 0);
                hint = "shielded";
                break;
            case 38: // shielded 470
                spawnWave(20, 1000, 200, 3 * spd, 35, "green", 23.5, 0, 10, 0);
                break;
            case 39: // shielded 480
                spawnWave(20, 1000, 200, 3 * spd, 35, "green", 24, 0, 20, 0);
                break;
            case 40: // shielded 490
                spawnWave(20, 1000, 200, 3 * spd, 35, "green", 24.5, 0, 30, 0);
                hint = "miniboss + fast armored";
                break;
            case 41: // 4 mini boss + speedy armored 500
                spawnWave(4, 10000, Math.floor(1200 * hp), 3 * spd, 35, "red", 55, 50, 0, 0);
                spawnWave(40, 1000, 210 * hp, 6 * spd, 35, "yellow", 7, 0, 0, 0);
                hint = "evearything but shielded";
                break;
            case 42: // everything again 510
                spawnWave(30, 1900 * den, Math.floor(40 * hp), 2.5 * spd, 35, "red", 2, 5, 1, 0); //armored + 
                spawnWave(25, 2500 * den, Math.floor(150 * hp), 6 * spd, 20, "yellow", 4, 0, 1, 0); //fast + 
                spawnWave(20, 1500 * den, Math.floor(400 * hp), 2.8 * spd, 20, "green", 5, 0, 1, 0); //basic +
                spawnWave(250, 170 * den, Math.floor(30 * hp), 2 * spd, 15, "pink", 1, 0, 1, 0); //grouped
                hint = "stack";
                break;
            case 43: // stack 520
                for (var i = 0; i < 52; i++) {
                    spawnWave(5, 1000 * den, Math.floor(30 * hp), 3 * spd, 15, "pink", 2, 0, 0, 0);
                }
                hint = "fast grouped";
                break;
            case 44: // fast grouped 530
                spawnWave(106, 200, 50, 8, 35, "yellow", 5, 0, 1, 0);
                hint = "armored boss";
                break;
            case 45: // armored boss 540+1000
                var fboss = new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], Math.floor(30000 * hp), 0.5 * spd, spawnDirection(paths), 60, "boss", 1540, 50, 50, 0, 1);
                enemies.push(fboss);
                spawnWave(1, 1, 1, .5, 20, "clear", 0, 0, 0, 0, 1);
                hint = "wave overlap";
                break;
            case 46: // 550 multi wave overlap
                var multi = [];
                multi.push([10, 1000 * den, Math.floor(300 * hp), 2 * spd, 35, "red", 20, 80, 0, 0]);
                multi.push([10, 800 * den, Math.floor(1000 * hp), 4 * spd, 20, "green", 20, 0, 0, 0]);
                multi.push([10, 600 * den, Math.floor(100 * hp), 8 * spd, 20, "yellow", 15, 0, 5, 0]);
                spawnMultiWaves(mult);
                hint = "long round";
                break;
            case 47: // 560 long round
                var multi = [];
                multi.push([10, 800 * den, Math.floor(800 * hp), 2.5 * spd, 35, "green", 10, 0, 0, 0]);
                multi.push([100, 200 * den, Math.floor(50 * hp), 2.5 * spd, 20, "pink", 1, 0, 0, 0]);
                multi.push([10, 800 * den, Math.floor(1), 2.5 * spd, 20, "green", 10, 0, 15, 0]);
                multi.push([10, 800 * den, Math.floor(1200 * hp), 2.5 * spd, 35, "green", 10, 0, 0, 0]);
                multi.push([100, 100 * den, Math.floor(50 * hp), 2.5 * spd, 20, "pink", 1, 0, 0, 0]);
                multi.push([10, 800 * den, Math.floor(1), 2.5 * spd, 20, "green", 10, 0, 30, 0]);
                spawnMultiWaves(multi);
                hint = "matryoshka";
                break;
            case 48: // 570 matryoshka
                spawnWave(10, 5000 * den, Math.floor(1000 * hp), 2 * spd, 50, "green", 11.4, 0, 0, 0);
                spawnWave(10, 5000 * den, Math.floor(1000 * hp), 2 * spd, 40, "green", 11.4, 0, 0, 0);
                spawnWave(10, 5000 * den, Math.floor(1000 * hp), 2 * spd, 30, "green", 11.4, 0, 0, 0);
                spawnWave(10, 5000 * den, Math.floor(1000 * hp), 2 * spd, 20, "green", 11.4, 0, 0, 0);
                spawnWave(10, 5000 * den, Math.floor(1000 * hp), 2 * spd, 10, "green", 11.4, 0, 0, 0);
                hint = "smart wave (actually really hard)";
                break;
            case 49: // 580 grouped shields
                //counts defensive towers
                var total = towers.length;
                var single = 0;
                var laser = 0;
                var slow = 0;
                var splash = 0;
                var farm = 0;
                var buff = 0;
                var sup = 0;
                for(var i=0; i<towers.length; i++){
                    if(towers[i].type == "Sniper" || towers[i].type == "Minigun" || towers[i].type == "tesla" || towers[i].type == "laser" || towers[i].type == "super"){
                        single++;
                        if(towers[i].type == "laser"){
                            laser++;
                        }else if(towers[i].type == "super"){
                            sup++;
                        }
                    }else if(towers[i].type == "bomb" || towers[i].type == "railgun"){
                        splash++;
                    }else if(towers[i].type == "ice"){
                        slow++;
                    }else if(towers[i].type == "farm"){
                        farm++;
                    }else if(towers[i].type == "buffer"){
                        buff++;
                    }
                }
                spawnWave((total*total+10)*(buff+1), 1000/((single*2)+1), ((splash*splash)*(farm+1))+100, (2+farm/2)*(slow+1), 25, "black", 10, splash+splash*farm, sup*sup*10, 10/(buff*buff));
                bonusHint = "adaptive wave to your defence";
                hint = "speed boss";
                break;
            case 50: // 590+1500 speed boss
                spawnWave(1, 1 * den, 1, 6, 20, "clear", 0, 0, 0, 0);
                var doomBoss = new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], Math.floor(5000 * hp), 6 * spd, spawnDirection(paths), 45, "boss", 2090, 0, 0, 0, 1);
                enemies.push(doomBoss);
                hint = "progressive";
                break;
            case 51: //600*3=1800
                var multi = [];
                for (var i = 0; i < 100; i++) {
                    multi.push([1, 700 - i * 3, 500 + 30 * i, 3 + i / 20, 35, "black", 18, 0, 0, 110-i]);
                }
                spawnMultiWaves(multi);
                hint = "fat";
                break;
            case 52: // 610 fat
                spawnWave(1, 100 * den, 150000 * hp, 0.18 * spd, 30, "boss", 610, 0, 500, 5);
                hint = "the one that got away";
                break;
            case 53: // 620 shielded then that 1 fast one
                spawnWave(10, 1000 * den, 5000 * hp, 2 * spd, 35, "green", 60, 0, 20, 20);
                spawnWave(1, 15000 * den, 1000 * hp, 10 * spd, 20, "yellow", 20, 0, 20, 0);
                break;
            case 54: // 5000 cash in preparation
                spawnWave(10, 1000 * den, 100 * hp, 3 * spd, 25, "green", 500, 0, 0, 0);
                hint = "all bosses";
                break;
            case 55: // all bosses
                var doomBoss = new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], Math.floor(5000 * hp), 8 * spd, spawnDirection(paths), 45, "boss", 5000, 0, 0, 0, 1);
                enemies.push(doomBoss);
                var fboss = new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], Math.floor(50000 * hp), 0.5 * spd, spawnDirection(paths), 60, "boss", 5000, 1000, 0, 0, 1);
                enemies.push(fboss);
                spawnWave(10, 10000 * den, Math.floor(100 * hp), 2 * spd, 35, "red", 0, 100, 100, 0, fboss); //minions
                var boss = new Enemy(spawnPoint(paths)[0], spawnPoint(paths)[1], Math.floor(25000 * hp), 2 * spd, spawnDirection(paths), 60, "boss", 5000, 0, 0, 0, 1);
                enemies.push(boss);
                spawnWave(10, 150 * den, Math.floor(100 * hp), 3 * spd, 15, "pink", 0, 0, 0, 0, boss); //minions
                hint="progressive x2";
                break;
            case 56: //5600
                var multi = [];
                for (var i = 0; i < 100; i++) {
                    multi.push([1, 800 - i * 4, 400 + 50 * i, 1 + i / 15, 35, "black", 10, 0, 0, 100-i]);
                }
                spawnMultiWaves(multi);
                hint = "last custom wave";
                break;
            case 57: 
                spawnWave(1, 1 * den, Math.floor(100000), 0.5 * spd, 20, "green", 10, 1000, 0, 1); //regen 
                spawnWave(1, 10000 * den, Math.floor(1), 0.5 * spd, 20, "green", 10, 0, 1000, 0); //shield 
                hint = "free play";
                bonusHint = "enemies don't give money, try to get as far as you can";
                break;
            default: // 0 money
                spawnWave(50, 500, Math.floor((round * 20) * hp), 7 * spd, 35, "black", 0, 10, 1, 10); //endless
                break;
        }
    }
}