/*

Engine by SuperSirBird

*/

// Setup Canvas

var c = document.getElementById("myCanvas");
var ctx=c.getContext("2d");
c.width  = window.innerWidth;
c.height = window.innerHeight;
ctx.imageSmoothingEnabled = false;

var curve = 0;
var xcurve = 0;
var curvegoal = 45;
var curvedir = 1;
var cooldown = 40;
var cooldown2 = 100;

// Keys detector
var keys = {};
window.onkeyup = function(e) { keys[e.keyCode] = false; }
window.onkeydown = function(e) { keys[e.keyCode] = true; }

var roadx = [0]
var roady = [0]
var roadz = [0]
var ycar = 0;

for (var i = 10;i<980;i+=10) {
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
var i;

function controls() {
  xspeed = xspeed/1.1;
  if (keys[39]) { //right
    xspeed += 3.4;
  } 
  if (keys[37]) { //left
    xspeed += -3.4;
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

function texturecell(x_,w,i_) {
  try {
    // left road
      perspec(roadx[i_]+x_-mx,roady[i_]-200-my,roadz[i_]-mz);
      var lx1 = x;
      var ly1 = y;
      perspec(roadx[i_-1]+x_-mx,roady[i_-1]-200-my,roadz[i_-1]-mz);
      var lx2 = x;
      var ly2 = y;
      // right road
      perspec(roadx[i_]+x_+w-mx,roady[i_]-200-my,roadz[i_]-mz);
      var rx1 = x;
      var ry1 = y;
      perspec(roadx[i_-1]+x_+w-mx,roady[i_-1]-200-my,roadz[i_-1]-mz);
      var rx2 = x;
      var ry2 = y;
      // draw
      ctx.fillRect(gx(lx1),gy(ly1),rx1-lx1,ly1-ly2);
  } catch(err) {alert(err)}
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
      
      // road texture
      if (roadz[i] % 40 < 11) {
      ctx.fillStyle = '#ffffff';} else {ctx.fillStyle = '#e84c3e';}
      
      texturecell(-600,20,i);
      texturecell(600-20,20,i);
      
      if (roadz[i] % 80 < 31) { ctx.fillStyle = '#ffffff'; texturecell(-10,20,i);}
      
      // fence right
      
      perspec(roadx[i]+700-mx,roady[i]-200-my,roadz[i]-mz);
      var x1 = x;
      var y1 = y;
      perspec(130,100,roadz[i]-mz);
      var x2 = x;
      var y2 = y;
      
      perspec(roadx[i-1]+700-mx,roady[i-1]-200-my,roadz[i]-mz-10);
      var x3 = x;
      
      var img = document.getElementById("fence");
      ctx.drawImage(img, gx(x1), gy(y1+y2),((gx(x3)-gx(x1))/70)*78,y2); // draw fence
      
      // intercept:
      if (roadz[i]-mz < 30 && roadz[i]-mz > 10) {
      if (mx+70>roadx[i]+700) {xspeed=-15;mx=roadx[i]+700-71}}
      
      // fence left
      
      perspec(roadx[i]-700-mx,roady[i]-200-my,roadz[i]-mz);
      var x1 = x;
      var y1 = y;
      perspec(130,100,roadz[i]-mz);
      var x2 = x;
      var y2 = y;
      
      perspec(roadx[i-1]-700-mx,roady[i-1]-200-my,roadz[i]-mz-10);
      var x3 = x;
      
      var img = document.getElementById("fence");
      ctx.drawImage(img, gx(x1), gy(y1+y2),((gx(x3)-gx(x1))/70)*78,y2); // draw fence
      
      // intercept:
      if (roadz[i]-mz < 30 && roadz[i]-mz > 10) {
      if (mx-70<roadx[i]-700) {xspeed=15;mx=roadx[i]-700+71}}
      
      // column
      if (roadz[i] % 100 === 0) {
      // column right
      
      perspec(roadx[i]+1300-mx,roady[i]-200-my,roadz[i]-mz);
      var x1 = x;
      var y1 = y;
      perspec(280,550,roadz[i]-mz);
      var x2 = x;
      var y2 = y;
      
      perspec(roadx[i-1]+1300-mx,roady[i-1]-200-my,roadz[i]-mz-10);
      var x3 = x;
      
      var img = document.getElementById("column");
      ctx.drawImage(img, gx(x1-(x2/2)), gy(y1+y2),x2,y2); // draw column
      
      // column left
      
      perspec(roadx[i]-1300-mx,roady[i]-200-my,roadz[i]-mz);
      var x1 = x;
      var y1 = y;
      perspec(280,550,roadz[i]-mz);
      var x2 = x;
      var y2 = y;
      
      perspec(roadx[i-1]-1300-mx,roady[i-1]-200-my,roadz[i]-mz-10);
      var x3 = x;
      
      var img = document.getElementById("column");
      ctx.drawImage(img, gx(x1-(x2/2)), gy(y1+y2),x2,y2); // draw column
      }
 
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
      roady.push(0);
      roadx.push(xcurve);
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

function roadgen() {
  cooldown+=1;
  cooldown2+=1;
  if (cooldown2 < 50) {xcurve+=curve;}
  if (cooldown > 500 && cooldown2 > 50) {
    xcurve+=curve;
  
    if (curvedir === 1) {
      curve+=(curvegoal/Math.abs(curvegoal))/7;
      if (Math.abs(curve) > Math.abs(curvegoal)) {curvedir=0; cooldown2=0}
    } else {
      curve-=(curvegoal/Math.abs(curvegoal))/3;
      if (curvegoal > 0 && curve < 0) {
        cooldown=0;
        curvegoal = -45;
        curve = 0
        curvedir = 1;
      }
      if (curvegoal < 0 && curve > 0) {
        cooldown=0;
        curvegoal = 45;
        curve = 0;
        curvedir = 1;
      }
    }
  }
  
}

function step() {
  ctx.clearRect(0, 0, c.width, c.height);
  mz += 4;
  // Render
  //startscreen();
  roadgen();
  deleteouts();
  playg();
  controls();
  
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
