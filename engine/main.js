/*

Engine by SuperSirBird

*/

// Setup Canvas

var c = document.getElementById("myCanvas");
var ctx=c.getContext("2d");
c.width  = window.innerWidth;
c.height = window.innerHeight;

function step() {
  context.clearRect(0, 0, c.width, c.height);
  
  // Draw logo
  var img = document.getElementById("logo");
  ctx.drawImage(img, 10, 10,408,200);
  
  // Render
  
  
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
