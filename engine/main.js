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

function step() {
  ctx.clearRect(0, 0, c.width, c.height);
  
  // Draw logo
  try {
    var img = document.getElementById("logo");
    ctx.drawImage(img, gx(0-204), 40,408,120);
  } catch {}
  
  // Render
  
  
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
