var score=0;
var gscore=0;
var ghost=false;
var ghost2=false;
var countblink=10;
var maxscore=10;
var player={
  x:50,
  y:100,
  pacmouth:320,
  pacdir:0,
  speed:5
}
var enemy={
  x:150,
  y:200,
  speed:3,
  moving:0,
  dirx:0,
  diry:0,
  flash:0,
  ghosteat:false
}
var enemy2={
  x:150,
  y:200,
  speed:3,
  moving:0,
  dirx:0,
  diry:0,
  flash:0,
  ghosteat:false
}
var power={
  x:10,
  y:10,
  powerup:false,
  pcount:0,
  ghostnum:0,
  ghostnum2:0
}
var canvas=document.getElementById('gamecanvas');
var ctx= canvas.getContext('2d');
var mainImage= new Image();
mainImage.ready=false;
mainImage.onload=checkready;
mainImage.src="pac.png";

var keyclick={};
document.addEventListener("keydown",function (e) {
  keyclick[e.keyCode]=true;
  move(keyclick);
},false);
document.addEventListener("keyup",function (e) {
  delete keyclick[e.keyCode]

},false);

function move(keyclick) {
  if (37 in keyclick) {
    player.x-=player.speed;
    player.pacdir=64;
  }
  if (38 in keyclick) {
    player.y-=player.speed;
    player.pacdir=96;
  }
  if (39 in keyclick) {
    player.x+=player.speed;
    player.pacdir=0;
  }
  if (40 in keyclick) {
    player.y+=player.speed;
    player.pacdir=32;
  }
  if (player.x >=(canvas.width-32)) {
    player.x=0;
  }
  if (player.y >=(canvas.height-32)) {
    player.y=0;
  }
  if (player.x <0) {
    player.x=canvas.width-32;
  }
  if (player.y <0 ) {
    player.y=canvas.height-32;
  }
  if (player.pacmouth==320) {
    player.pacmouth=352;
  }else {
    player.pacmouth=320;
  }
  render();
}
function checkready() {
  this.ready=true;
  playgame();
}
function playgame() {
  render();
  requestAnimationFrame(playgame);
}
function mynum(n) {
  return Math.floor(Math.random()*n);
}
function render() {
  ctx.fillStyle="black";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  if (!power.powerup && power.pcount<=5) {
    power.x=mynum(450)+30;
    power.y=mynum(250)+30;
    power.powerup=true;
  }
  if (!ghost) {
    enemy.ghostnum=mynum(5)*64;
    enemy.x=mynum(450);
    enemy.y=mynum(250)+30;
    ghost=true;
  }
  if (!ghost2) {
      enemy2.ghostnum=mynum(5)*64;
      enemy2.x=mynum(450);
      enemy2.y=mynum(250)+30;
      ghost2=true;
  }
  if (enemy.moving<0) {
    enemy.moving=(mynum(20)*3)+mynum(1);
    enemy.speed=mynum(2)+1;
    enemy.dirx=0;
    enemy.diry=0;
    if (power.ghosteat) {
      enemy.speed= -enemy.speed;
    }
    if (enemy.moving%2) {
      if (player.x<enemy.x) {
        enemy.dirx =-enemy.speed;
      }else {
          enemy.dirx =enemy.speed;
      }
    }else {
      if (player.y<enemy.y) {
        enemy.diry =-enemy.speed;
      }else {
          enemy.diry =enemy.speed;
      }
    }
  }
    enemy.moving--;
    enemy.x=enemy.x+enemy.dirx;
    enemy.y=enemy.y+enemy.diry;

    if (enemy.x >=(canvas.width-32)) {
      enemy.x=0;
    }
    if (enemy.y >=(canvas.height-32)) {
      enemy.y=0;
    }
    if (enemy.x <0) {
      enemy.x=canvas.width-32;
    }
    if (enemy.y <0 ) {
      enemy.y=canvas.height-32;
    }
//enemy 2
    if (enemy2.moving<0) {
      enemy2.moving=(mynum(20)*3)+mynum(1);
      enemy2.speed=mynum(2)+1;
      enemy2.dirx=0;
      enemy2.diry=0;
      if (power.ghosteat) {
        enemy2.speed= -enemy2.speed;
      }
      if (enemy2.moving%2) {
        if (player.x<enemy2.x) {
          enemy2.dirx =-enemy2.speed;
        }else {
            enemy2.dirx =enemy2.speed;
        }
      }else {
        if (player.y<enemy2.y) {
          enemy2.diry =-enemy2.speed;
        }else {
            enemy2.diry =enemy2.speed;
        }
      }
    }
      enemy2.moving--;
      enemy2.x+=enemy2.dirx;
      enemy2.y+=enemy2.diry;

      if (enemy2.x >=(canvas.width-32)) {
        enemy2.x=0;
      }
      if (enemy2.y >=(canvas.height-32)) {
        enemy2.y=0;
      }
      if (enemy2.x <0) {
        enemy2.x=canvas.width-32;
      }
      if (enemy2.y <0 ) {
        enemy2.y=canvas.height-32;
      }

    if (player.x<=(enemy.x+26) && enemy.x<=(player.x+26) && player.y<=(enemy.y+26) && enemy.y<=(player.y+32)) {
      if (power.ghosteat) {
        score++;
      }else {
        gscore++;
      }
      if (score==1) {
        alert("You Win. Congratulations. Your score is "+score);
        document.location.reload();
      }else if (gscore==maxscore) {
        alert("You Loose. Hard Luck");
        document.location.reload();
      }
    else {
      player.x=10;
      player.y=100;
      enemy.x=300;
      enemy.y=200;
      power.pcount=0;
    }
  }

    if (player.x<=(enemy2.x+26) && enemy2.x<=(player.x+26) && player.y<=(enemy2.y+26) && enemy2.y<=(player.y+32)) {
      if (power.ghosteat) {
        score++;
      }else {
        gscore++;
      }
        if (score==1) {
          alert("You Win. Congratulations.Your score is "+score);
          document.location.reload();
        }else if (gscore==maxscore) {
          alert("You Loose. Hard Luck");
          document.location.reload();
        }
      else {
        player.x=10;
        player.y=100;
        enemy2.x=300;
        enemy2.y=200;
        power.pcount=0;
      }
    }
    if (player.x<=power.x&& power.x<=(player.x+32) && player.y<=power.y && power.y<=(player.y+32)) {
      power.powerup=false;
      power.pcount=500;
      power.ghostnum=enemy.ghostnum;
      power.ghostnum2=enemy2.ghostnum;
      enemy.ghostnum=384;
      enemy2.ghostnum=384;
      power.x=0;
      power.y=0;
      power.ghosteat=true;
      player.speed=15;
    }

    if (power.ghosteat) {
      power.pcount--;
      if (power.pcount<=0) {
        power.ghosteat=false;
        enemy.ghostnum=power.ghostnum;
        enemy2.ghostnum=power.ghostnum2;
        player.speed=5;
      }
    }

    if (power.powerup) {
      ctx.fillStyle="white";
      ctx.beginPath();
      ctx.arc(power.x,power.y,5,0,2*Math.PI,false);
      ctx.closePath();
      ctx.fill();
    }
    if (countblink>0) {
      countblink--;
    }else {
      countblink=10;
      if (enemy.flash==0) {
        enemy.flash=32;
        enemy2.flash=32;
      }else {
        enemy.flash=0;
        enemy2.flash=0;
      }
    }
  ctx.font="20px Verdana";
  ctx.fillStyle='white';
  ctx.fillText("Pacman: " +score+ " vs Ghost: "+gscore,20,20);
  ctx.drawImage(mainImage,enemy.ghostnum,enemy.flash,32,32,enemy.x,enemy.y,32,32);
  ctx.drawImage(mainImage,enemy2.ghostnum,enemy2.flash,32,32,enemy2.x,enemy2.y,32,32);
  ctx.drawImage(mainImage,player.pacmouth,player.pacdir,32,32,player.x,player.y,32,32);
}
