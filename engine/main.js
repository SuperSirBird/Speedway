/*

Engine by SuperSirBird

*/

// Setup Canvas

var c = document.getElementById("myCanvas");
var ctx=c.getContext("2d");
c.width  = window.innerWidth;
c.height = window.innerHeight;
ctx.imageSmoothingEnabled = false;

var roadx = [0,0,0,0,0,0,0,0]
var roadz = [0,10,20,30,40,50,60,70]

function perspec(x,y,z) {}

function gx(x) {
  return window.innerWidth/2+x;
}
function gy(y) {
  return window.innerHeight/2-y;
}

function playg() {
  var img = document.getElementById("car");
  ctx.drawImage(img, gx(0-75), gy(-40+35),150,70);
}

function startscreen() {
  var d = new Date();
  var n = d.getTime();
  
  ctx.fillStyle = "#effdff";
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight)
  ctx.fillStyle = "#e2fbff";
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight/3.3)
  
  try {
    // Draw road
    //road
    ctx.fillStyle = "#4c4c4c";
    ctx.fillRect(0,gy(-80),window.innerWidth,500)
    ctx.fillStyle = "#f7f7f7";
    ctx.fillRect(0,gy(-176),window.innerWidth,8)
    
    // road ridges
    ctx.fillStyle = "#4c4c4c";
    for (var i = 0;i<(window.innerWidth/300)+2;i++) {
      ctx.fillRect(i*300,gy(-175),20,17)
    }
    
    
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
    ctx.drawImage(img, gx(0-204), 30  - 10*Math.sin(Math.PI/180*(((n/1000)*360)/2)),408,120);
    var img = document.getElementById("pressz");
    ctx.drawImage(img, gx(0-50), 260  - 10*Math.sin(Math.PI/180*(-20+((n/1000)*360)/2)),100,50);
  } catch {}
}

function step() {
  ctx.clearRect(0, 0, c.width, c.height);
  
  // Render
  //startscreen();
  playg();
  
  
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
