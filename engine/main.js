/*

Engine by SuperSirBird

*/

// Setup Canvas

var c = document.getElementById("myCanvas");
var ctx=c.getContext("2d");
c.width  = window.innerWidth;
c.height = window.innerHeight;
ctx.imageSmoothingEnabled = false;

var roadx = [0]
var roady = [0]
var roadz = [0]
for (var i = 10;i<510;i+=10) {
  roadx.push(0);
  roady.push(0);
  roadz.push(10+roadz[(i-10)/10])
}
var x;
var y;
var z;
var mz = 0;

function perspec(x_,y_,z_) {
  x = x_/(0.1+z_/40);
  y = y_/(0.1+z_/40);
  z = z_;
}

function gx(x) {
  return window.innerWidth/2+x;
}
function gy(y) {
  return window.innerHeight/2-y;
}

function playg() {
  var d = new Date();
  var n = d.getTime();
  try {
  for (var i = roadx.length-1;i>1;i-=1) {
    if (roadz[i-1]-mz > 0) {
      // fill grass
      perspec(roadx[i],roady[i]-200,roadz[i]-mz);
      var x1 = x;
      var y1 = y;
      perspec(roadx[i-1],roady[i-1]-200,roadz[i-1]-mz);
      var x2 = x;
      var y2 = y;
      ctx.fillStyle = 'rgb(255, 165,50)';
      if (roadz[i] % 20 === 10) {
        ctx.fillStyle = 'rgb(155, 165,50)';
      }
      ctx.fillRect(0,gy(y1),window.innerWidth,y1-y2);
      
      // fill road
      
      // left road
      perspec(roadx[i]-600,roady[i]-200,roadz[i]-mz);
      var lx1 = x;
      var ly1 = y;
      perspec(roadx[i-1]-600,roady[i-1]-200,roadz[i-1]-mz);
      var lx2 = x;
      var ly2 = y;
      // right road
      perspec(roadx[i]+600,roady[i]-200,roadz[i]-mz);
      var rx1 = x;
      var ry1 = y;
      perspec(roadx[i-1]+600,roady[i-1]-200,roadz[i-1]-mz);
      var rx2 = x;
      var ry2 = y;
      // draw
      ctx.fillStyle = '#5b5b5b';
      
      ctx.fillRect(gx(lx1),gy(ly1),rx1-lx1,ly1-ly2);
      
    }
  }
  } catch(err) {alert(err)}
  
  var img = document.getElementById("car");
  ctx.drawImage(img, gx(0-70), gy(-200+35),140,70); // draw car
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
      roadx.push(100*Math.sin(Math.PI/180*(((roadz[roadz.length-1]/10)*360)/20)));
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
  mz += 1;
  // Render
  //startscreen();
  playg();
  deleteouts();
  
  
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
