let player;
let ground;
let grnd = [];
let grndHit = [];
let grndHitEnemy = [];
let block;
let blocks = [];
let hiScore = 0;
let nrBlocks = 50;

let bg = [];
let groundY;
let hitName;
let enemyHitName;
let pressed;
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
let vernr = "0.0.0.3";
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
let playerPogo = [];
let playerPogol = [];
let enemy = [];
let enemyl = [];
let rock = [];
let potion;

function preload() {
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
    ground = loadImage("imgs/ground.png");

    rock[0] = loadImage("imgs/grnd/rock1.png");
    rock[1] = loadImage("imgs/grnd/rock2.png");
    rock[2] = loadImage("imgs/grnd/rock3.png");

    bg[0] = loadImage("imgs/bg.png");
    bg[1] = loadImage("imgs/bg1.png");
    bg[2] = loadImage("imgs/bg2.gif");

    potion = loadImage("imgs/potion.png");

    enemy[0] = loadImage("imgs/enemies/ball1.png");
    enemy[1] = loadImage("imgs/enemies/ball2.png");
    enemy[2] = loadImage("imgs/enemies/ball3.png");
    enemy[3] = loadImage("imgs/enemies/ball4.png");
    enemyl[0] = loadImage("imgs/enemies/ball1l.png");
    enemyl[1] = loadImage("imgs/enemies/ball2l.png");
    enemyl[2] = loadImage("imgs/enemies/ball3l.png");
    enemyl[3] = loadImage("imgs/enemies/ball4l.png");


    //sounds
    song[0] = loadSound("sounds/oasis.mp3");
    song[1] = loadSound("sounds/faster.mp3");

    walksnd = loadSound("sounds/walk2.mp3");
    jumpsnd = loadSound("sounds/jump.mp3");
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
			}
		}
	}
	checkCollision(who) {
		if (who.y < (this.y + 100 + yscroll) &&
			who.y > (this.y - 1 + yscroll) &&
			who.x > (this.x + 20 + xscroll) &&
			who.x < (this.x + (this.w - 20) + xscroll)
		) {
			fill(255, 0, 0, 80);
			this.hit = true;
            hitName = this.id;
            if(who==enemy){this.enemyHit=true;console.log("ENEMYHIT");enemyHitName=this.id;}
			who.ny = 0;
			who.vy = 0;
			who.y = this.y + yscroll;
		} else {
            this.hit = false;
           // this.enemyHit=false;
		}
	}

}

function makeLvl() {
	for (i = 0; i < nrBlocks; i++) {
		blocks.push(new Block);
		if (i > 0) {
			blocks[i].w = blocks[i].len * 80;
			blocks[i].x = blocks[i - 1].x + blocks[i - 1].w + random(100);
		} else {
			blocks[i].w = blocks[i].len * 80;
			blocks[i].x = 50;
		}

		if (i == 0) {
			blocks[i].y =(windowHeight/2)-10;
		} else {
			blocks[i].y = prevY + (random(400) - 150);
		}
		blocks[i].id = i;
		var prevY = blocks[i].y;
	}
}
function drawAndMoveBlocks() {

	for (i = 0; i < nrBlocks; i++) {
		blocks[i].show();
		fill(255, 0, 0, 80);
	}
}

// //OLD:
// class Ground {
//     constructor() {
//         this.x = random(windowWidth / 81) * 81;
//         this.y = random(windowHeight);
//         this.hit;
//         this.id;
//         this.type = 0;

//     }
//     checkCollision() {
//         image(rock[this.type], this.x + xscroll, this.y +yscroll + 50, 81, 100);
//         if (this.type == 0) { this.pluss = 20; this.minus = 0; } else if (this.type == 2) { this.minus = 20; this.pluss = 0; } else { this.pluss = 0; this.minus = 0; }
//         if (player.y < (this.y + 100 + yscroll) &&
//             player.y > (this.y - 1 + yscroll) &&
//             player.x > (this.x - 40 + this.pluss + xscroll) &&
//             player.x < (this.x + 40 - this.minus + xscroll)
//         ) {
//             fill(255, 0, 0, 80);
//             this.hit = true;
//             hitName = this.id;
//             player.ny = 0;
//             player.vy = 0;

//             //player.y-=30; // husk å endre til gravity
//             player.y = this.y + yscroll;
//             //rect(this.x + xscroll, this.y + yscroll + 50, 81, 100); // setter en rød firkant på den klossen du er på
//         } else {
//             this.hit = false;
//         }
//     }
// }
// function makeLevel(){
//     for(i=0;i<300;i++){
//         grnd.pop();
//     }
//     for (i = 0; i < 300; i++) {
//         grnd.push(new Ground);
//         grnd[i].id = i;
//         grnd[i].type = i % 3;
        
//         if (i < 150) {
//             if(i%3==0){
//                 var r = random( 40)+1;
               
//             }
//             grnd[i].y = 200 + round((i - 1) / 3) * r; // +(i*10);
//             grnd[i].x = 0 + (i * 81);
//         } else {
//             grnd[i].y = 600 + round((i - 1) / 3) * -30 //-(i*2);
//             grnd[i].x = -800 + (i * 81);
//         }
//     }
// }

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
           
            if(fallcount>50){
                makeLvl();
                player.y = windowHeight/2;
                player.x = 100;
                xscroll=0;
                yscroll=0;

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
            player.pogo();
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

        if (this.y < (windowHeight / 2) - 100 && !falling ) {
            yscroll -= this.vy;
        } else if (this.y > (windowHeight / 2) + 100 && !jump) {
            yscroll -= this.vy;
        } else {
            this.y += this.vy;
        }
        //this.y += this.vy;

        
          
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
            console.log("NOT JUMPING ANYMORE!");
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
        console.log("lookdown");
        this.img = playerLookDown[this.lookCounter];
        if (this.lookCounter == 0) {
            this.lookCounter = 1;
        }
    }

    //LOOK UP!
    lookup() {
        console.log("lookdown");
        this.img = playerLookUp;
    }
    //FUNKSJON FOR BARE Å STÅ STILLE OG NULLSTILLE TELLERE OG INSTILLINGER
    static() {


    }

}

class Enemy {
    constructor() {
        this.x = 200 ;
        this.y = 200;
        this.jmpy = 0;
        this.counter = 0;
        this.speed = 5;
        this.img = enemy[0];
        this.left = false;
        this.falling=false;
        this.vx = 0;
        this.vy = 0;
        this.nx = 0;
        this.ny = 0;
        this.maxVelocity = 40;
        this.friction = 0.5;
        this.fallspeed = 10;
        this.left=false;

    }
    show() {
        this.move();
        image(this.img,this.x,this.y,50,50);
       
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







// #################### SETUP ######################
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(20);
    player = new Player;
    blocks[0] = new Block;
    enemy = new Enemy;
    //console.log(blocks.length);
   
    // makeLevel();
    makeLvl();
    song[0].loop();
}






// #################### DRAW ######################

function draw() {
    // kan bruke scale(0.5); for å få ting til å bli mindre
    background(0); 
    
    //console.log(boost);
    image(bg[2], 0+(xscroll/100), 0+(yscroll/100), windowWidth+200, windowHeight+200);
    fill(255);
    text("Platform number: " + String(hitName), windowWidth / 2, 50);
    if(hitName>hiScore){
        hiScore=hitName;
    }
    text("Hiscore: " + hiScore, windowWidth / 2, 40);
    scale(0.5);
   // background(122, 90, 18);
  
   drawAndMoveBlocks();
   enemy.show();

   
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
            if(mouseY>windowHeight/3 && mouseY < windowHeight-(windowHeight/3)){
                player.move("left");
            }
            if(mouseY>windowHeight-(windowHeight/3)){
                player.lookdown();

            }

        }
        if(mouseX>windowWidth/3 && mouseX < windowWidth-(windowWidth/3)){
            if(mouseY<windowHeight/3){
                if(canJump){
                    jump = true;
                }
            }
            if(mouseY>windowHeight/3 && mouseY < windowHeight-(windowHeight/3)){
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
            if(mouseY>windowHeight/3 && mouseY < windowHeight-(windowHeight/3)){
                player.move("right");
            }
            if(mouseY>windowHeight-(windowHeight/3)){
                player.lookdown();

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
        // if(mouseY<player.y){
        //    player.jump();
        // }
        // if (mouseX < player.x) {
        //     right = false;
        // } else {
        //     right = true;
        // }
        // if (abs(player.x - mouseX) > abs(player.y - mouseY)) {
        //     if (mouseX < player.x) {

        //          player.move("left");
        //     } else {

        //         player.move("right");
        //     }
        // } else {
        //     if (mouseY < player.y && canJump) {
        //         jump=true;
        //     } else if(mouseY>player.y){

        //         player.lookdown();
        //     }
        // }


      



    }





    //############### OG HER VISES SPILLEREN:

    player.show();
    fill(255);
   
    
    //###############################################
    textAlign(CENTER);
    fill(0);
    text(vernr, windowWidth / 2, 100)
}

function touchStarted(event) {
    if(event.touches){
	if(event.touches[0]){
		touchON=true;
			
	}
	if(event.touches[1]){
		touchON2=true;
	}
	return false;
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
	return false;
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if(player){player.y = blocks[hitName].y;}
}