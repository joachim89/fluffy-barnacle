// COMMANDER KEEN
let isMobile = false; //initiate as false
let ref;
let dbHi=0;
let textcounter=0;
let tekst = "";
let player;
let ground;
let grnd = [];
let grndHit = [];
let grndHitEnemy = [];
let block;
let blocks = [];
let hiScore = 0;
let enemies = [];
let canMove = true;
let vivas = [];
let vivasimg=[];
let vivCounter = 0;
let points = 0; 
let playerName;
//let v = 0;
let newRecord=false;
let lives = 3;
let started = false;
let randomName;



/// Lengde, antall monstre og antall vivas

const nrBlocksConst = 5;//antall platformer per lvl
let nrEnemiesConst= 0;  //antall monstre
let nrVivasConst = 8; //antall vivas


let nrBlocks = nrBlocksConst; //antall platformer per lvl
let nrEnemies= nrEnemiesConst;  //antall monstre
let nrVivas = nrVivasConst; //antall vivas
let lvlnr = 0;

let newScoreVar=0;
let newScorePrevHit=0;


let prevPostedScore;


let nameBtn;
let inputField;

let portrait;
let bg = [];
let groundY;
let hitName = 0;
let enemyHitName;
let pressed;
let button;
//vars til spillerbevegelser
let right = false; //går til høyre eller venstre?
let falling = true; //faller?
let canJump = true;
let jump = false;
let pogo = false;
let fallcount =0;
let boost = 0;
let touchON=false;
let touchON2=false;

//scroller
let xscroll = 0;
let yscroll = 0;

//versjonsnr, for å sjekke om ting blir oppdatert.
let vernr = "0.1.1.0";
//sound vars
let song = [];
let jumpsnd;
let walksnd;
// bilder til spiller
let playerWalk = [];
let playerJump = [];
let playerJumpl = [];
let playerWalkl = [];
let playerStatic;
let playerStaticl;
let playerLookDown = [];
let playerLookUp;
let playerDead;
let playerPogo = [];
let playerPogol = [];
let finish = [];
let enemy = [];
let enemyl = [];
let rock = [];
let potion;


function preload() {
    bigfont = loadFont('assets/bigfont.ttf');
    regularfont = loadFont('assets/regularfont.ttf');

    life0 = loadImage("imgs/moves/life0.png");    
    life1 = loadImage("imgs/moves/life1.png");

    playerWalk[0] = loadImage("imgs/moves/walk1.png");
    playerWalk[1] = loadImage("imgs/moves/walk2.png");
    playerWalk[2] = loadImage("imgs/moves/walk3.png");
    playerWalk[4] = loadImage("imgs/moves/walk4.png");
    playerWalkl[0] = loadImage("imgs/moves/walk1l.png");
    playerWalkl[1] = loadImage("imgs/moves/walk2l.png");
    playerWalkl[2] = loadImage("imgs/moves/walk3l.png");
    playerWalkl[4] = loadImage("imgs/moves/walk4l.png");
    playerJump[0] = loadImage("imgs/moves/jump1.png");
    playerJump[1] = loadImage("imgs/moves/jump2.png");
    playerJump[2] = loadImage("imgs/moves/jump3.png");
    playerJumpl[0] = loadImage("imgs/moves/jump1l.png");
    playerJumpl[1] = loadImage("imgs/moves/jump2l.png");
    playerJumpl[2] = loadImage("imgs/moves/jump3l.png");
    playerLookDown[0] = loadImage("imgs/moves/lookdown1.png");
    playerLookDown[1] = loadImage("imgs/moves/lookdown2.png");
    playerLookUp = loadImage("imgs/moves/lookup.png")
    playerStatic = loadImage("imgs/moves/static.png");
    playerStaticl = loadImage("imgs/moves/staticl.png");
    playerPogo[0] = loadImage("imgs/moves/pogo1.png");
    playerPogo[1] = loadImage("imgs/moves/pogo2.png");
    playerPogol[0] = loadImage("imgs/moves/pogo1l.png");
    playerPogol[1] = loadImage("imgs/moves/pogo2l.png");
    playerDead = loadImage("imgs/moves/dead.png");
    ground = loadImage("imgs/ground.png");

    rock[0] = loadImage("imgs/grnd/rock1.png");
    rock[1] = loadImage("imgs/grnd/rock2.png");
    rock[2] = loadImage("imgs/grnd/rock3.png");

    bg[0] = loadImage("imgs/bg0.png");
    bg[1] = loadImage("imgs/bg1.png");
    bg[2] = loadImage("imgs/bg2.png");
    bg[3] = loadImage("imgs/bg3.png");
    bg[4] = loadImage("imgs/bg4.png");
    bg[5] = loadImage("imgs/bg5.png");
    bg[6] = loadImage("imgs/bg6.png");
    bg[7] = loadImage("imgs/bg7.png");
    bg[8] = loadImage("imgs/bg8.png");
    bg[9] = loadImage("imgs/bg9.png");
    bg[10] = loadImage("imgs/bg10.png");
    bg[11] = loadImage("imgs/bg11.png");
    bg[12] = loadImage("imgs/bg12.png");
    bg[13] = loadImage("imgs/bg13.png");
    bg[14] = loadImage("imgs/bg14.png");
    bg[15] = loadImage("imgs/bg15.png");
    bg[16] = loadImage("imgs/bg16.png");
    bg[17] = loadImage("imgs/bg17.png");
    bg[18] = loadImage("imgs/bg18.png");
    bg[19] = loadImage("imgs/bg19.png");
    bg[20] = loadImage("imgs/bg20.png");

    finish[0] = loadImage("imgs/finish.png");
    finish[1] = loadImage("imgs/finish2.png");
    finish[2] = loadImage("imgs/finish3.png");
    finish[3] = loadImage("imgs/finish4.png");

    potion = loadImage("imgs/potion.png");

    enemy[0] = loadImage("imgs/enemies/en1.png");
    enemy[1] = loadImage("imgs/enemies/en2.png");
    enemy[2] = loadImage("imgs/enemies/en3.png");
    enemy[3] = loadImage("imgs/enemies/en4.png");
    enemyl[0] = loadImage("imgs/enemies/enl1.png");
    enemyl[1] = loadImage("imgs/enemies/enl2.png");
    enemyl[2] = loadImage("imgs/enemies/enl3.png");
    enemyl[3] = loadImage("imgs/enemies/enl4.png");

    vivasimg[0] = loadImage("imgs/vivas1.png");
    vivasimg[1] = loadImage("imgs/vivas2.png");
    vivasimg[2] = loadImage("imgs/vivas3.png");


    //sounds
    song[0] = loadSound("sounds/oasis.mp3");
    // song[1] = loadSound("sounds/faster.mp3");

    walksnd = loadSound("sounds/walk2.mp3");
    jumpsnd = loadSound("sounds/jump.mp3");
    vivsnd = loadSound("sounds/vivas.mp3");
    deadsnd = loadSound("sounds/dead.mp3");
    levelcompsnd = loadSound("sounds/levelcomplete.mp3");
}

// GROUND

class Block {
	constructor() {
		this.x;
		this.y;
		this.len = round(random(2, 10));
		this.id;
		this.w;
        this.hit = false;
        this.enemyHit=false;
        this.shift = 50;
        this.finishBlock=false;
        this.fimg = round(random(3));

	}
	show() {
		for (var a = 0; a < this.len; a++) {
			if (a == 0) {
				image(rock[0], this.x + xscroll, this.y + this.shift + yscroll, 80, 100);
			}
			if (a > 0 && a < this.len - 1) {
                image(rock[1], this.x + (a * 80) + xscroll, this.y + this.shift +yscroll, 80, 100);
              	
            }
			if (a == this.len - 1) {
                image(rock[2], this.x + (a * 80) + xscroll, this.y + this.shift +yscroll, 80, 100);
                if(this.finishBlock){
                    image(finish[lvlnr % finish.length],this.x + (a * 80) -200 + xscroll, this.y -200  +yscroll, 300, 300);
                    
                }	
			}
		}
	}
	checkCollision(who) {
		if (who.y < (this.y + 100 + yscroll) &&
			who.y > (this.y - 1 + yscroll) &&
			who.x > (this.x -45 + xscroll) &&
			who.x < (this.x + (this.w - 50) + xscroll)
		) {
			fill(255, 0, 0, 80);
			this.hit = true;
            hitName = this.id;
            if(who==enemy){this.enemyHit=true;enemyHitName=this.id;}
			who.ny = 0;
            who.vy = 0;
            if(!player.dead){
			who.y = this.y + yscroll;}else{player.y+=20;}
		} else {
            this.hit = false;
           // this.enemyHit=false;
		}
	}

}

function makeLvl() {
    canMove=true;
    hitName=0;
    newScorePrevHit=0;
  
    for(i=0;i<nrBlocks;i++){
    if(blocks[i]){        blocks[i].finishBlock=false;}
    }

	for (i = 0; i < nrBlocks; i++) {
        
		blocks.push(new Block);
		if (i > 0 && i<nrBlocks-1) {
            blocks[i].len = round(random(2, 10));
			blocks[i].w = blocks[i].len * 80;
			blocks[i].x = blocks[i - 1].x + blocks[i - 1].w + random(200);
		} else if(i==0){
			blocks[i].w = blocks[i].len * 80;
			blocks[i].x = 50;
		}else if(i==nrBlocks-1){
            blocks[i].len = 8;
            blocks[i].w = blocks[i].len * 80;
            blocks[i].x = blocks[i - 1].x + blocks[i - 1].w + random(200);
            blocks[i].finishBlock=true;
        }

		if (i == 0) {
            blocks[0].len=15;
            blocks[0].w = blocks[i].len * 80;
			blocks[0].y =(windowHeight/2)-10;
		} else {
			blocks[i].y = prevY + (random(400) - 150);
		}
		blocks[i].id = i;
		var prevY = blocks[i].y;
    }
    for(var v = 0; v <vivas.length;v++){
        vivas.pop();
    }
    if(vivas.length>0){
    for(var v = 0; v<nrVivas;v++){   
        vivas[v] = new Vivas;
        vivas[v].v=true;
        vivas[v].x2=random(500);
        vivas[v].y2=random(150);
     }
    }


//lager enemies og sånn
for(i=0;i<nrEnemies;i++){
    enemies.push(new Enemy);
}
for(i=0;i<nrVivas;i++){
    vivas.push(new Vivas);
}
if(enemies[0] && vivas[0]){
    
for(i=0;i<nrEnemies;i++){
   enemies[i].blocknr = round(random(nrBlocks-3)+1);
    if(blocks[enemies[i].blocknr].len < 4){
        enemies[i].blocknr = round(random(nrBlocks-3)+1);
    }
}
for(v=0; v<nrVivas;v++){
    vivas[v].x2 = random(500);
    vivas[v].y2 = random(150);
    vivas[v].blocknr = round(random(nrBlocks));
}
}
}
function drawAndMoveBlocks() {

	for (i = 0; i < nrBlocks; i++) {
		blocks[i].show();
		fill(255, 0, 0, 80);
	}
}








function restartGame(){
   nrBlocks = nrBlocksConst; //antall platformer per lvl
   nrEnemies= nrEnemiesConst;  //antall monstre
   nrVivas = nrVivasConst; //antall vivas
    hitName=0;
    newScoreVar=0;
    newScorePrevHit=0;

    makeLvl();
    player.dead = false;
    player.y = windowHeight/2;
    player.x = 100;
    xscroll=0;
    yscroll=0; 
    lvlnr=0;
    points=0;
    lives = 3;
  
}
// ################ HER ER PLAYER KLASSEN. ALL INFO OG FUNKSJONER.. ###################
class Player {
    constructor() {
        this.walkCount = 0;
        this.jumpCount = 0;
        this.img = playerStatic;
        this.x = 110;
        this.y = 100;
        this.w = 100;
        this.h = 100;
        this.jumpHeight = 18;
        this.lookCounter = 0;
        this.vx = 0;
        this.vy = 0;
        this.nx = 0;
        this.ny = 0;
        this.maxVelocity = 40;
        this.friction = 0.5;
        this.fallspeed = 10;;
        this.dead = false;
    }

    //TYNGDEKRAFT
    gravity() {
        if (falling) {
            this.ny = this.fallspeed;
            if(this.fallspeed<30){this.fallspeed += 3;}
            canJump=false;
            if (this.vx < 0) {
                this.img = playerJumpl[1];
            } else {
                this.img = playerJump[1];
            }
            fallcount ++;
           if(fallcount>20){
               this.img = playerDead;
               deadsnd.playMode("untilDone");
               if(!deadsnd.isPlaying()){deadsnd.play();}
           }
            if(fallcount>50){
                lives--;
                if(lives!=1){
                    //prevpoints+ points
                    var lifetekst = " Lives";
                }else{var lifetekst= " Life";}
                bigtext(lives + lifetekst + " left..."); // blir kanskje en bug med at teksten kommer opp rett før game over her?
                if(lives==0){
                var data = {
                    name: playerName,
                    score: newScoreVar,
                    time: Date().toString()
                }
                var nyttNavn = playerName.substring(0,9)+"...";
                bigtext("GAME OVER! \n\n" + nyttNavn.toUpperCase() + ": " + newScoreVar + "p",60);
                
                console.log(data);
                if(newScoreVar){
                    if(newScoreVar!=prevPostedScore){
                        if(!connected){bigtext("GAME OVER! \n\nNO INTERNET! \n\nfailed saving \nscore",90);}
                        ref.push(data);
                        prevPostedScore=newScoreVar;
                    }
                 }else{
                     ref.push(data);
                     prevPostedScore=newScoreVar;
                 }

               
                //FÅ INN EN SET INTERVALGREIEE HER
            }
               // if(hiScore>dbHi){ref.push(data);}
                if(lives>0){
                
                
                player.y = windowHeight/2;
                player.x = 100;
                xscroll=0;
                yscroll=0;
                canMove=true;
                
                player.dead = false;
                hitName=0;
                newScorePrevHit=0;
               

            }else{
                setInterval(restartGame(),2000);
               
                
            }


            }

        } else {
            this.fallspeed = 10;
            this.jumpCount = 0;
            canJump = true;
            fallcount=0;
        }

    }


    //Bare viser spilleren på canvasen
    show() {
        player.move();
        player.gravity();
        image(this.img, this.x, this.y, this.w, this.h);
        if (pogo) {
           // player.pogo();
        }
    }

    //GÅFUNKSJONEN
    move(dir) {
        if (jump) {
            player.jump();
            jumpsnd.playMode("untilDone");
            jumpsnd.play();
        }
        this.vx += this.nx;
        this.vy += this.ny;

        this.vx *= this.friction;
        this.vy *= this.friction;

        if (this.x < (windowWidth / 2) - 100 && ( keyIsDown(LEFT_ARROW)||(touchON && mouseX<(windowWidth/3)))) {
            xscroll -= this.vx;
        } else if (this.x > (windowWidth / 2) + 100 && (keyIsDown(RIGHT_ARROW) || (touchON && mouseX>(windowWidth-(windowWidth/3))))) {
            xscroll -= this.vx;
        } else {
            this.x += this.vx;
        }


        // if(this.x>(windowWidth/2)-100 && this.x <(windowWidth/2)+100){
        //     xscroll-=this.vx;
        // }else{
        //     this.x+=this.vx;
           
        // }
        // if(this.y>(windowHeight/2)-100 && this.y <(windowHeight/2)+100){
        //     yscroll-=this.vy;
        // }else{
          
        //     this.y+=this.vy;
        // }

        if (this.y < (windowHeight / 2) - 100 && !falling ) {
            yscroll -= this.vy;
        } else if (this.y > (windowHeight / 2) + 100 && !jump) {
            yscroll -= this.vy;
        } else {
            this.y += this.vy;
        }
        
       
        if (dir == "right") {
            if(jump||falling){
                player.nx=20+boost;
            }else{
            player.nx = 15+boost;
            if(boost<12){
                boost+=2;
                }
             }
        } else if (dir == "left") {
            if(jump||falling){
                player.nx=-20-boost;
            }else{
            player.nx = -15-boost;
            if(boost<12){
                boost+=2;
                }
            }
        } else {
            player.nx = 0;
        }
        walksnd.playMode("untilDone");
        if (this.vx < -1.9 && this.vy > -2) {
            this.img = playerWalkl[this.walkCount % 3];
            
            walksnd.play();
        } else if (this.vx > 1.9 && this.vy < 2) {
            walksnd.play();
            this.img = playerWalk[this.walkCount % 3];
        } else if (!pressed && !pogo) {
            if (this.vx < 0) { this.img = playerStaticl; } else { this.img = playerStatic; }
        }
        this.walkCount++;

    }
    //HOPPING
    jump() {
        this.jumpHeight = 18;
        // console.log("JUMP: " + this.jumpCount);
        if (this.jumpCount < this.jumpHeight) {
            player.ny = -(this.jumpHeight - this.jumpCount) * 1.7;
            this.jumpCount++;
        }
        if (this.vx < -1.9) {
            this.img = playerJump[0];

        } else if (this.vx > 1.9) {

            this.img = playerJumpl[0];
        }
        this.jumpCount++;
        if (this.jumpCount > this.jumpHeight) {
            //console.log("NOT JUMPING ANYMORE!");
            jump = false;
        }

    }

    // POGOSTICK! 
    pogo() {
        this.jumpHeight = 30;


        if (this.jumpCount < this.jumpHeight) {
            player.ny = -(this.jumpHeight - this.jumpCount) * 1.7;
            this.jumpCount++;
        }
        if (this.vx < -1.9) {
            this.img = playerPogol[0];

        } else if (this.vx > 1.9) {
            this.img = playerPogo[0];
        }
        this.jumpCount++;


    }

    //LOOK DOWN!
    lookdown() {
        //console.log("lookdown");
        this.img = playerLookDown[this.lookCounter];
        if (this.lookCounter == 0) {
            this.lookCounter = 1;
        }
    }

    //LOOK UP!
    lookup() {
        //console.log("lookup");
        this.img = playerLookUp;

        ///LAST TILE THING
        if(hitName == nrBlocks-1){
            //console.log("CONGRATS");
            canMove=false;
            levelcompsnd.play();
            setTimeout(nextLevel, 2000 );
                
        }
    }
    //FUNKSJON FOR BARE Å STÅ STILLE OG NULLSTILLE TELLERE OG INSTILLINGER
    static() {

       
    }

}
function nextLevel(){
    lvlnr +=1;
    //More blocks and 
    nrBlocks+= round(random(7)+2); //Bør kanskje fjernes?
    var randomTall = random(1);
    console.log("RNDTLL: " + randomTall);
    if(randomTall>0.3){nrEnemies+=1;}

    nrVivas=round(random(liksomnrBlocks*2)+10);

    console.log("BLOCKS: " + nrBlocks + "\nEnemies: " + nrEnemies + "\nVivas: " + nrVivas);
    hitName=0;
    
    makeLvl();
        player.y = windowHeight/2;
        player.x = 100;
        xscroll=0;
        yscroll=0;
        
}
function bigtext(in_text,timez){
    tekst = in_text;
    if(timez){textcounter=timez;}else{
    textcounter=30;}
}
function bigtextshow(){
    push();
  scale(1.5);
 // textFont(bigfont);
    fill(0);
    textAlign(CENTER);
    text(tekst,(windowWidth/3)+2,(windowHeight/3)+2);
    fill(255);
    text(tekst,windowWidth/3,windowHeight/3);
    if(textcounter>0){ textcounter--; }
    
    pop();
}

class Vivas {
    constructor(){
        this.x = random(500);
        this.y = random(150) + 20;
        this.x2 = random(500);
        this.y2 = random(150);
        this.v = true;
        this.blocknr = round(random(nrBlocks));


        
    }
    show(){
        this.x=blocks[this.blocknr].x + xscroll+ this.x2;
        this.y =blocks[this.blocknr].y + yscroll -this.y2 + (sin(vivCounter+this.x2)*5) ;
        if(this.v){
           image(vivasimg[vivCounter % 3],this.x,this.y,50,50);
         }
         this.hit();
    }
    hit(){
        if(player.x > this.x-70&&player.x<this.x+50 &&player.y<this.y+60&&player.y>this.y-60&&this.v){
            this.v=false;
            vivsnd.play();
            points++;
           // console.log(points);
        }
    }
}
class Enemy {
    constructor() {
        this.x = 200 ;
        this.y = 200;
        this.jmpy = 0;
        this.counter = 0;
        this.speed = random(6)+5;
        this.img = enemyl[0];
        this.left = false;
        this.falling=false;
        this.vx = 0;
        this.vy = 0;
        this.nx = 0;
        this.ny = 0;
        this.maxVelocity = 40;
        this.friction = 0.5;
        this.fallspeed = 10;
        this.left;
        this.xmov=0;
        this.blocknr = round(random(nrBlocks-3)+1);
        if(blocks[this.blocknr].len < 4){
            this.blocknr = round(random(nrBlocks-3)+1);
        }

    }
    show() {

        this.bnf();
        this.hitPlayer();
        image(this.img,this.x,this.y,100,100);
        this.counter++;
        if(blocks[this.blocknr].len < 4){
            this.blocknr = round(random(nrBlocks-3)+1);
        }
      
    }
    hitPlayer(){
        if(player.x > this.x - 50 && player.x < this.x + 50 && player.y < this.y +50 && player.y>this.y-50){
            //console.log("DEAD");
            player.dead=true;
            canMove=false;
            jump = false;
            deadsnd.playMode("untilDone");
            if(!deadsnd.isPlaying()){deadsnd.play();}
            // player.y+=120;
        }
    }
    bnf (){
        this.x=blocks[this.blocknr].x + this.xmov + xscroll ;
        this.y =blocks[this.blocknr].y + yscroll ;
       // console.log(this.x + "thisx \n" +(blocks[4].x+blocks[4].w+this.xmov+xscroll ) + " x" );
        if((this.x>(blocks[this.blocknr].x+blocks[this.blocknr].w-100+xscroll ))){
            this.left=true;
        }
        if((this.x<(blocks[this.blocknr].x+0+xscroll))){
            this.left=false;
        }
        if(this.left){
            this.xmov-= this.speed;
           this.img = enemyl[this.counter % 4];
        
        }else{
            this.xmov+=this.speed;
           this.img = enemy[this.counter % 4];
        }
    }

     //GÅFUNKSJONEN
     move() {
        
        // this.vx += this.nx;
        // this.vy += this.ny;

        // this.vx *= this.friction;
        // this.vy *= this.friction;

        // this.x += this.vx;
        // this.y += this.vy;
        this.vx+=this.nx;
        this.vy+=this.ny;

        this.x=xscroll+this.vx;
        this.y=yscroll+this.vy;
        
        if (this.x > player.x) {
            this.left = true;
            this.nx-=1;
        } else {
            this.left = false;
            this.nx +=1;
            
        }

        
         for (i = 0; i < nrBlocks; i++) {
             blocks[i].checkCollision(this);
             grndHitEnemy[i] = blocks[i].enemyHit;
         }
         if (grndHitEnemy.includes(true)) {
            this.vy=0;
            this.nx=0;
            this.y=blocks[enemyHitName].y;
          
         } else{
            this.ny +=2;
         }
        
         
        
        //this.y += this.vy;

        
    

    }
      

}




function gotData(data){
    // console.log(data.val());
    var dbscores = data.val();
    var dbkeys = Object.keys(dbscores);
   // console.log(dbkeys);
    for(var dbi = 0; dbi<dbkeys.length;dbi++){
        var k = dbkeys[dbi];
        var name = dbscores[k].name;
        var dbscore = dbscores[k].score;
        //console.log(name + ": " + dbscore + "p");
        if(dbscore > hiScore){
            if(dbscore>dbHi){dbHi = dbscore;}
            
        }

    }
    //console.log("HIGHEST SCORE: " + dbHi + "p");
}
function errData(err){
    //console.log("Error");
    //console.log(err);
}



function gotTada(data){
   var arrr = data.val();
   dbHi = arrr.score;
}










// #################### SETUP ######################


function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(20);
    player = new Player;
    blocks[0] = new Block;
    makeLvl();
    for(i=0;i<nrEnemies;i++){
        enemies.push(new Enemy);
    }
    for(v=0; v<nrVivas;v++){
    vivas.push(new Vivas);
}
    //console.log(blocks.length);
   
    // makeLevel();
   
    song[0].loop();

//mobilsjekk


// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}






  eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('9 a={b:"8",7:"0-2.5.3",6:"c://0-2.k.3",i:"0-2",d:"0-2.h.3",g:"4",e:"1:4:f:j"};',21,21,'fluffy||barnacle|com|747065307498|firebaseapp|databaseURL|authDomain|AIzaSyBfAwlHcWXp7d2WFbyxzPe4aa16n7GFp30|var|firebaseConfig|apiKey|https|storageBucket|appId|web|messagingSenderId|appspot|projectId|5815c34f19da2bb9|firebaseio'.split('|'),0,{}))

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //console.log(firebase);

  
  var database = firebase.database();
  ref = database.ref('scores');

//   ref.on('value',gotData,errData);


  
firebase.database().ref("scores").orderByChild("score").limitToLast(1).on('child_added',gotTada,errData);

    // button = createButton('MUTE/\nUNMUTE');
    // button.position(windowWidth/2, windowHeight-(windowHeight/4));
    // button.mousePressed(startStop);
    if(randomNames){
         randomName = randomNames[round(random(randomNames.length))];
    }else{randomName = "Anonymous";}
    inputField = createInput(randomName,"text");
    
    inputField.position((windowWidth/2)-120, windowHeight/3);

    nameBtn = createButton('START');
    nameBtn.position((windowWidth/2)+70, windowHeight/3);
    nameBtn.mousePressed(startGame);
  //  inputField.mousePressed(resetname);

    
}

function resetname(){
    inputField.value("");
}

function startStop(){

    if (song[0].isPlaying()) {
        // .isPlaying() returns a boolean
        song[0].stop();
      } else {
        song[0].play();
      }
}

// #################### DRAW ######################

function startGame(){
    if(!started){
    playerName = String(inputField.value());
    
    if(playerName == "" || playerName==undefined){playerName="Anonymous";}
    console.log("original: " + playerName);
    playerName = playerName.replace(/(<([^>]+)>)/ig,"");
    console.log("stripped: " + playerName);
    window.localStorage.setItem("name",playerName);
    nameBtn.hide();
    inputField.hide();
    started=true;
}else{
    nameBtn.hide();
    started=true;

}
}


//UTREGNING AV VANSKELIGHETSGRAD
let liksomlvl=0;
let liksomnrBlocks=5;
let liksomnrEnemies =0;
let liksomnrVivas = 8;
let totblockslik=0;
let totenemyslik=0;
let totVivlik=0;
let totratio = 0;

function matte(){

    //More blocks and 
    liksomnrBlocks+= round(random(7)+2); //Bør kanskje fjernes?
    if(random(1)>0.3){liksomnrEnemies+=1;}
    liksomnrVivas=round(random(liksomnrBlocks*2));
    totblockslik += liksomnrBlocks;
    totenemyslik += liksomnrEnemies;
    totVivlik += liksomnrVivas;
    totratio += liksomnrEnemies/liksomnrBlocks;
    if(liksomlvl<bg.length){console.log("BLOCKS: " + liksomnrBlocks + "\nEnemies: " + liksomnrEnemies + "\nVivas: " + liksomnrVivas + "\nRATIO: " + liksomnrEnemies/liksomnrBlocks);}
   if(liksomlvl==bg.length){console.log("tot blocks: " + totblockslik + "\ntot enemy: " + totenemyslik + "\ntot viv: " + totVivlik + "\navg Rat: " + totratio/bg.length);}
   liksomlvl +=1;
} 

function draw() {
    //matte();
    if(newScorePrevHit<hitName){
        newScoreVar+=hitName-newScorePrevHit;
        newScorePrevHit=hitName;
    }
    // console.log(newScoreVar);
    if(windowHeight>windowWidth){
      portrait=true;
    }else{portrait=false;}

    if(!playerName){
    playerName=window.localStorage.getItem("name");
}
  
//   window.addEventListener('blur', function(){
//     noLoop();
//     song[0].stop();
//  }, false);
 
//  window.addEventListener('focus', function(){
//      loop();
//     if(!song[0].isPlaying()){
//         song[0].play();
//     }
//  }, false);


 var connectedRef = firebase.database().ref(".info/connected");
 connectedRef.on("value", function(snap) {
   if (snap.val() === true) {
     connected = true;
   } else {
     connected = false;
   }
 });



    //window.localStorage.clear();
    textFont(regularfont);
    if(!started){
        if(!window.localStorage.getItem("name") || window.localStorage.getItem("name")=="Anonymous"){
        background(0);


        if(portrait){ if(bg[lvlnr]){image(bg[lvlnr], 0,0,windowHeight*1.597,windowHeight);} }else{    if(bg[lvlnr]){image(bg[lvlnr], 0,0,windowWidth,windowHeight);} }// 0+(xscroll/100), 0+(yscroll/100), windowWidth+200, windowHeight+200);}else{}//console.log("NO BG!");}
        fill(255);
        textAlign(CENTER);
        text("WHATS YA NAME?",windowWidth/2,windowHeight/4);

        inputField.elt.focus();
        // if(touchON&&mouseX>(windowWidth/2)+70 && mouseX<(windowWidth/2)+270){//} && mouseY>(windowHeight/3)-100 && mouseY<(windowHeight/3)+100){
        //     startGame();
        // }
            if((touchON || mouseIsPressed) && mouseX<windowWidth/2 && mouseX>(windowWidth/2)-300){
                if(randomNames.includes(inputField.value())){;inputField.value("");}else{console.log("nup");}
            }

        
        
        if(keyIsDown(13)&&inputField.value()){
            //console.log("ENTER");
            startGame();
        }
       
        //INPUT TEXT OG KNAPP FOR NAVN




    }else{
        nameBtn.hide();
        inputField.hide();
       started=true;
    }
    }
    if(started){
    
    // kan bruke scale(0.5); for å få ting til å bli mindre
    background(0); 


   

    //BACKGROUND IMAGE
    if(portrait){ if(bg[lvlnr]){image(bg[lvlnr], 0,0,windowHeight*1.597,windowHeight);} }else{    if(bg[lvlnr]){image(bg[lvlnr], 0,0,windowWidth,windowHeight);} }// 0+(xscroll/100), 0+(yscroll/100), windowWidth+200, windowHeight+200);}else{}//console.log("NO BG!");}
    // if(bg[lvlnr]){image(bg[lvlnr], 0,0,windowWidth,windowHeight);}// 0+(xscroll/100), 0+(yscroll/100), windowWidth+200, windowHeight+200);}else{}//console.log("NO BG!");}
    
    // TEKSTER  PLASSER FORNUFTIG: 
     translate(0,30);
    if(isMobile && windowWidth<windowHeight){
        push();
        scale(0.5);
        var multiplo = 2;
    }else {var multiplo=1;}
    textAlign(RIGHT);
    fill(0);
    text("SCORE: " + newScoreVar, ((windowWidth )*multiplo)-28, 29);
    fill(255);
    text("SCORE: " + newScoreVar, (windowWidth )*multiplo-30, 27); //String(hitName + (lvlnr * nrBlocks))
    // if(hitName + (lvlnr * nrBlocks)>hiScore){
    //     hiScore=hitName + ((lvlnr) * nrBlocks);
       
    // }

    //Sjekker at ny hiscore er høyere enn localstoragen.
    if(newScoreVar>hiScore){
        hiScore=newScoreVar;
        if(newScoreVar>window.localStorage.getItem("hiscore")||!window.localStorage.getItem("hiscore")){
        window.localStorage.setItem("hiscore", hiScore);
    }
       
    }
    textAlign(CENTER);
    push();
    scale(1.5);
 
    if(dbHi!=0){
        
        fill(0);
        text("ALL TIME HIGH: " + dbHi,((windowWidth/3)*multiplo)+2,24);
        fill(255);
        text("ALL TIME HIGH: " + dbHi,(windowWidth/3)*multiplo,22);
    
    }else{ 
        
        fill(0);
        text("LOADING HIGHSCORES",((windowWidth/3)*multiplo)+2,24);
        fill(255);
        text("LOADING HIGHSCORES",(windowWidth/3)*multiplo,22);
    }
    pop();
    fill(0);
    if(window.localStorage.getItem("hiscore")){var hiScoreText = window.localStorage.getItem("hiscore");}else{var hiScoreText=newScoreVar;
    }
    text("Your hightest score: " + hiScoreText, ((windowWidth / 2)*multiplo)+2, 60);
    fill(255);
    text("Your hightest score: " + hiScoreText, (windowWidth / 2)*multiplo, 58);
    textAlign(LEFT);
    //LEFT SIDE:
    fill(0);
    text("Vivas: " + points,30,60);
    fill(255);
    text("Vivas: " + points,28,58);
    for(i=0;i<3;i++){
        if(i<lives){image(life1,100+(25*i),10,20,20);}else{image(life0,100+(25*i),10,20,20);}
    }
    fill(0);
    text("Lives: ",30,29);// + lives + "/3",windowWidth/2,70);
    fill(255);
    text("Lives: ",28,27);// + lives + "/3",windowWidth/2,70);

    if(dbHi!=0){
    if(newScoreVar>dbHi){//dbHi
        
        hiScore= newScoreVar;
        // var data = {
        //     name: playerName,
        //     score: hiScore,
        //     time: Date.now()
        // }
        if(!newRecord){
            bigtext("NEW WORLD RECORD!!!");
           newRecord=true;
        }
        //ref.push(data);
    }
  
}

    //POINTS = VIVAS TYDELIGVIS :S GIR NYTT LIV FOR 100 VIVAS
    if(points>100&&lives!=3){
        points -=100;
        lives++;
        bigtext("1 UP!");
    }

    //Sjekker at 
    if(isMobile && windowWidth<windowHeight){
        pop();
    }



    push();
   
    //FLYTTER ALT LITT NED:
    translate(0,windowHeight/5);

    if(isMobile){
       // text("MOBIL",windowWidth/2,20);
        scale(0.35);
    }else{
        //text("PC",windowWidth/2,20);
            scale(0.5);
            //text("PC",windowWidth/2,20);
        }
   // background(122, 90, 18);
  
   drawAndMoveBlocks();
   
   for(var e=0;e<nrEnemies;e++){
       enemies[e].show();
   }
   for(v = 0; v<nrVivas;v++){   
       vivas[v].show();
    }
    vivCounter++;
   for (i = 0; i < nrBlocks; i++) {
       blocks[i].checkCollision(player);
       grndHit[i] = blocks[i].hit;
   }
   if (grndHit.includes(true)) {
    falling = false;
} else {
    falling = true;
}


    noStroke();
   
    
 
    // for(i=0;i<(windowWidth/80);i++){ // lager bakgrunnsbildet rett bortover.
    //     image(ground,80*i,groundY,80,188);
    // }

    
        //if(player.x<grnd[45].x+xscroll){image(potion,grnd[45].x+xscroll,(grnd[45].y-100)+yscroll,34  ,50);}else{text("100p",grnd[45].x+xscroll,(grnd[45].y-100)+yscroll);}
    
    //for(i=0;i<blocks.length;i++){blocks[i].make();}

    // for (i = 0; i < grnd.length; i++) { // lager bakgrunnsbildet.
    //     grnd[i].checkCollision();
    //     grndHit[i] = grnd[i].hit;

    // }
    // if (grndHit.includes(true)) {
    //     falling = false;
    // } else {
    //     falling = true;
    // }





    //####### HER KOMMER KONTROLLENE FOR Å STYRE SPILLERN  ##########////////////
    //check all controls:
    if(canMove){
    if (keyIsDown(UP_ARROW) || keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW) || keyIsDown(DOWN_ARROW) || keyIsDown(17) || keyIsDown(16) || touchON) {
        pressed = true;
    } else {
        if (!falling) { player.static(); }
        pressed = false;
        boost=0;
    }

    //CONTROLS

    //hopp
    if (keyIsDown(17) && canJump) {
        jump = true;
    }
    //console.log(canJump);

    //TOGGLE POGO
    if (keyIsDown(16)) {
        if (!pogo) {
            pogo = true;
        } else {
            pogo = false;
        }

    }

    //høyre og venstre
    if (keyIsDown(RIGHT_ARROW)) {
        player.move("right");
    } else if (keyIsDown(LEFT_ARROW)) {
        player.move("left");
    } else {
        //player.move("0");
    }

    //se opp
    if (keyIsDown(UP_ARROW) && !keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && !keyIsDown(DOWN_ARROW)) {
        player.lookup();
    }
    //ned
    if (keyIsDown(DOWN_ARROW) && !keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && !keyIsDown(UP_ARROW)) {
        player.lookdown();
    }
    //muskontroller og mobil

    if(touchON){
        if(mouseX<windowWidth/3 ){
            if(mouseY<windowHeight/3){
                if(canJump){
                    jump = true;
                }
                player.move("left");
            }
            if(mouseY>windowHeight/3 ){
                player.move("left");
            }
            

        }
        if(mouseX>windowWidth/3 && mouseX < windowWidth-(windowWidth/3)){
            if(mouseY<windowHeight/4){
                if(canJump){
                    jump = true;
                }
            }
            if(mouseY>windowHeight/4 && mouseY < windowHeight-(windowHeight/3)){
                player.lookup();
            }
            if(mouseY>windowHeight-(windowHeight/3)){
                player.lookdown();

            }
        }
        if(mouseX>windowWidth-(windowWidth/3)){
            if(mouseY<windowHeight/3){
                if(canJump){
                    jump = true;
                }
                player.move("right");
            }
            if(mouseY>windowHeight/3 ){
                player.move("right");
            }
           
        }
        if(!touchON2){
           //ACTIONS FOR PRESSING FIRST BUTTON
           
       }else{
           //ACTIONS FOR TWO BUTTONS PRESSED
          if(canJump){
              jump = true;
          }
       }
   }

    if (mouseIsPressed) {
        touchON=true;
        
    }
    }




    //############### OG HER VISES SPILLEREN:
    player.show();
    fill(255);
   pop();
    if(hitName == nrBlocks-1){
        if(lvlnr<2){
            bigtext("LOOK UP TO ENTER \nTHE NEXT LEVEL!");
        }
    }
    if(textcounter>0){
        bigtextshow();
        }
    //###############################################
    // textAlign(CENTER);
    // fill(0);
    // text(vernr, windowWidth / 2, 100)
}
}




function touchStarted(event) {
    if(event.touches){
       
	if(event.touches[0]){
		touchON=true;
			
	}
	if(event.touches[1]){
		touchON2=true;
	}
	//return false;
  }
}


function touchEnded(event){
	if(touchON){
		if(!touchON2){
			touchON=false;
		}else{
			touchON2=false;
		}
	}
	//return false;
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
 
    inputField.position((windowWidth/2)-120, windowHeight/3);
    nameBtn.position((windowWidth/2)+70, windowHeight/3);
    if(player){player.y = blocks[hitName].y;}
}
function startStop(){
     //Cordova fix
 
 document.addEventListener('pause', function(){
    noLoop();
    song[0].stop();
 }, false);
 
 document.addEventListener('resume', function(){
    if(!song[0].isPlaying()){
        song[0].play();
    }
    loop();
 }, false);
}
document.addEventListener("deviceready", startStop(), false); 