let w;
let h;

function setup(){
    w = windowWidth;
    h = windowHeight;
    createCanvas(w,h);
}

function draw(){
    background(0);
    fill(255);
    text("HEIHEIHEI",w/2,50);



}
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	w = windowWidth;
	h = windowHeight;
  }
  