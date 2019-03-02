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
  return window.innerHeigh/2-y;
}
function startscreen() {
  try {
    var img = document.getElementById("logo");
    ctx.drawImage(img, gx(0-204), 40,408,120);
    var img = document.getElementById("pressz");
    ctx.drawImage(img, gx(0-50), 340,100,50);
  } catch {}
}

function step() {
  ctx.clearRect(0, 0, c.width, c.height);
  
  // Render
  startscreen();
  
  
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
