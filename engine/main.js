/*

Engine by SuperSirBird

*/

// Setup Canvas

var c = document.getElementById("myCanvas");
var ctx=c.getContext("2d");
c.width  = window.innerWidth;
c.height = window.innerHeight;
ctx.imageSmoothingEnabled = false;

function gx(x) {
  return window.innerWidth/2+x;
}
function gy(y) {
  return window.innerHeight/2-y;
}
function startscreen() {
  ctx.fillStyle = "#effdff";
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight)
  try {
    // Draw road
    //road
    ctx.fillStyle = "#e8d93a";
    ctx.fillRect(0,gy(-80),window.innerWidth,20)
    
    //bush
    var img = document.getElementById("bush");
    for (var i = 0;i<(window.innerWidth/70)+1;i++) {
      ctx.drawImage(img, i*70, gy(-1),80,80);
    }
    //other
    var img = document.getElementById("grassrock");
    for (var i = 0;i<(window.innerWidth/200)+1;i++) {
      ctx.drawImage(img, (i*200)-35, gy(-10),80,80);
    }
    
    
    // text
    var img = document.getElementById("logo");
    ctx.drawImage(img, gx(0-204), 80,408,120);
    var img = document.getElementById("pressz");
    ctx.drawImage(img, gx(0-50), 390,100,50);
  } catch {}
}

function step() {
  ctx.clearRect(0, 0, c.width, c.height);
  
  // Render
  startscreen();
  
  
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
