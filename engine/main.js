/*

Engine by SuperSirBird

*/

// Setup Canvas

var c = document.getElementById("myCanvas");
var ctx=c.getContext("2d");
c.width  = window.innerWidth;
c.height = window.innerHeight;

function step() {
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
