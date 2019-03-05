/*

Engine by SuperSirBird

*/

// Setup Canvas

var c = document.getElementById("myCanvas");
var ctx=c.getContext("2d");
c.width  = window.innerWidth;
c.height = window.innerHeight;
ctx.imageSmoothingEnabled = false;

// Keys detector
var keys = {};
window.onkeyup = function(e) { keys[e.keyCode] = false; }
window.onkeydown = function(e) { keys[e.keyCode] = true; }

var roadx = [0]
var roady = [0]
var roadz = [0]
var ycar = 0;

for (var i = 10;i<510;i+=10) {
  roadx.push(0);
  roady.push(0);
  roadz.push(10+roadz[(i-10)/10])
}
var x;
var y;
var z;
var mz = 0;
var mx = 0;
var my = 0;
var xspeed = 0;

function controls() {
  xspeed = xspeed/1.1;
  if (keys[39]) { //right
    xspeed += 2;
  } 
  if (keys[37]) { //left
    xspeed += -2;
  } 
  mx += xspeed
}

function perspec(x_,y_,z_) {
  x = x_/(z_/40);
  y = y_/(z_/40);
  z = z_;
}

function gx(x) {
  return window.innerWidth/2+x;
}
function gy(y) {
  return window.innerHeight/2-y;
}

function drawcar() {
  my = my + ((roady[4]+(((roady[1]-roady[0])/10)*(mz%10)))-my)/5
  ycar = ycar + ((roady[4]+(((roady[5]-roady[4])/10)*((mz+40)%10)))-ycar)/5;
  perspec(0,0-200+ycar-my,40);
  
  //draw
  ctx.strokeStyle = 'rgba(0,0,0,0.4)'
  ctx.beginPath();
  ctx.lineWidth = 30;
  ctx.lineCap = "round";
  ctx.moveTo(gx(x-60), gy(y));
  ctx.lineTo(gx(x+60), gy(y));
  ctx.stroke();
  ctx.lineWidth = 0;
  
  var img = document.getElementById("car");
  ctx.drawImage(img, gx(x-70), gy(y+70),140,70); // draw car
  
  
}

function playg() {
  var d = new Date();
  var n = d.getTime();
  try {
  for (var i = roadx.length-1;i>1;i-=1) {
    if (roadz[i-1]-mz > 0) {
      // fill grass
      perspec(roadx[i]-mx,roady[i]-200-my,roadz[i]-mz);
      var x1 = x;
      var y1 = y;
      perspec(roadx[i-1]-mx,roady[i-1]-200-my,roadz[i-1]-mz);
      var x2 = x;
      var y2 = y;
      ctx.fillStyle = 'rgb(255, 165,50)';
      if (roadz[i] % 20 === 10) {
        ctx.fillStyle = 'rgb(155, 165,50)';
      }
      ctx.fillRect(0,gy(y1),window.innerWidth,y1-y2);
      
      // fill road
      
      // left road
      perspec(roadx[i]-600-mx,roady[i]-200-my,roadz[i]-mz);
      var lx1 = x;
      var ly1 = y;
      perspec(roadx[i-1]-600-mx,roady[i-1]-200-my,roadz[i-1]-mz);
      var lx2 = x;
      var ly2 = y;
      // right road
      perspec(roadx[i]+600-mx,roady[i]-200-my,roadz[i]-mz);
      var rx1 = x;
      var ry1 = y;
      perspec(roadx[i-1]+600-mx,roady[i-1]-200-my,roadz[i-1]-mz);
      var rx2 = x;
      var ry2 = y;
      // draw
      ctx.fillStyle = '#5b5b5b';
      
      ctx.fillRect(gx(lx1),gy(ly1),rx1-lx1,ly1-ly2);
      
      // fence
      
      perspec(roadx[i]-620-mx,roady[i]-200-my+40,roadz[i]-mz);
      var x1 = x;
      var y1 = y;
      perspec(80,70,roadz[i]-mz);
      var x2 = x;
      var y2 = y;
      
      var img = document.getElementById("fence");
      ctx.drawImage(img, gx(x1-(x2/2)), gy(y1+y2),x2,y2); // draw fence
      
    }
  }
  } catch(err) {alert(err)}
  
  drawcar();
}

function deleteouts() {
  var oldlen = roadx.length;
  for (var i = 0;i<oldlen;i++) {
    if (roadz[i]-mz < 0) {
      roadz.splice(i,1);
      roadx.splice(i,1);
      roady.splice(i,1);
      roadz.push(roadz[roadz.length-1]+10);
      roady.push(150*Math.sin(Math.PI/180*(((roadz[roadz.length-1]/10)*360)/31)));
      roadx.push(250*Math.sin(Math.PI/180*(((roadz[roadz.length-1]/10)*360)/31)));
      i-=1;
    }
  }
    
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
  mz += 2;
  // Render
  //startscreen();
  deleteouts();
  playg();
  controls();
  
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
