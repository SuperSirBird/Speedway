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
    //bush
    var img = document.getElementById("bush");
    for (var i = 0;i<(window.innerWidth/80)+1;i++) {
      ctx.drawImage(img, i*80, gy(-50),80,80);
    }
    
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
