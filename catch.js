var mode = "catch";
var swarm = [];
var eyes = [];
var screenY = 0;
var screenX = 0;
var screenWidth = 0;
var screenHeight = 0;
var scattered = false;
var sayings = [
  "click me",
  "best you got?",
  "close one",
  "best you got?",
  "try again haha",
  "keep trying",
];
var sayingsCount = 0;
var caught = false;

function start() {
  mode = document.getElementById("mode").value;
  if (mode == "catch") {
    shell(3);
    eyes = document.getElementsByClassName("eyes");
  } else {
    var ii = 100;
    if (mode == "swarm") ii = 800;
    for (var i = 0; i < ii; i++) shell(i);
    swarm = document.getElementsByClassName("swarm");
  }

  //catch eyes
  window.addEventListener("mousemove", (evt) => {
    screenY = evt.pageY;
    screenX = evt.pageX;
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    if (mode == "catch") {
      const x = -(window.innerWidth / 2 - evt.pageX) / 60;
      const y = -(window.innerHeight / 2 - evt.pageY) / 60;
      for (var i = 0; i < eyes.length; i++) {
        eyes[i].style.transform = `translateY(${y}px) translateX(${x}px)`;
      }
    }
  });

  //swarm
  document.getElementById("print").addEventListener("click", (data) => {
    if (mode == "swarm") {
      var holdX = screenX;
      var holdY = screenY;
      if (!scattered) {
        scattered = true;
        scatter();
        setTimeout(() => {
          together(holdY, holdX);
        }, 1200);
      }
    } else if (mode == "catch" && data.target.id == "cont") {
      caught = true;
      document.getElementById("mouth").style.width = "5%";
      document.getElementById("mouth").style.marginLeft = "45%";
      document.getElementById("talk").innerText = "caught me!";
    }
  });

  function scatter() {
    for (var i = 0; i < swarm.length; i++) {
      var x = swarm[i].style.left.replaceAll("%", "");
      var y = swarm[i].style.top.replaceAll("%", "");
      var xx = parseInt(x);
      var yy = parseInt(y);
      move(yy, xx, swarm[i]);
    }
  }

  function together(holdY, holdX) {
    var posX = Math.floor((holdX / screenWidth) * 100) - 3;
    var posY = Math.floor((holdY / screenHeight) * 100) - 3;
    for (var i = 0; i < swarm.length; i++) {
      swarm[i].style.top = posY + "%";
      swarm[i].style.left = posX + "%";
    }
    scattered = false;
  }

  //follow
  window.addEventListener("mousemove", (evt) => {
    if (mode == "follow") {
      together(screenY, screenX);
    }
  });

  document.getElementById("mode").addEventListener("change", function (data) {
    caught = false;
    mode = data.target.value;
    document.getElementById("print").innerHTML = "";
    start();
  });
}

function move(y, x, target) {
  var distance = 1;
  var f = true;
  while (f) {
    var rand = Math.floor(Math.random() * 84) + 1;
    var rand2 = Math.floor(Math.random() * 93) + 1;
    if (rand > y + distance || rand < y - distance) {
      if (rand2 > x + distance || rand2 < x - distance) {
        target.style.top = rand + "%";
        target.style.left = rand2 + "%";
        f = false;
      }
    }
  }
}

function shell(i) {
  var cont = document.createElement("div");
  cont.id = "cont";
  cont.style.top = "50%";
  cont.style.left = "50%";

  if (mode == "catch") {
    cont.style.transition = "all 0." + i + "s ease-in-out";
    var catchMe = document.createElement("div");
    catchMe.id = "catchMe";

    var eyeCont = document.createElement("div");
    eyeCont.id = "eyeCont";

    var eye = document.createElement("div");
    eye.id = "eye";
    eye.className = "eyes";

    var eyeCont2 = document.createElement("div");
    eyeCont2.id = "eyeCont";

    var eye2 = document.createElement("div");
    eye2.id = "eye2";
    eye2.className = "eyes";

    var mouth = document.createElement("div");
    mouth.id = "mouth";

    var talk = document.createElement("p");
    talk.innerText = sayings[0];
    talk.id = "talk";

    eyeCont.appendChild(eye);
    eyeCont2.appendChild(eye2);
    catchMe.appendChild(eyeCont);
    catchMe.appendChild(eyeCont2);

    cont.onmouseover = function () {
      if (!caught) {
        var left_ = cont.style.left.replaceAll("%", "");
        var top_ = cont.style.top.replaceAll("%", "");
        move(parseInt(top_), parseInt(left_), cont);
        sayingsCount++;
        if (sayingsCount > 20) {
          var rand = Math.floor(Math.random() * 5) + 1;
          talk.innerText = sayings[rand];
          sayingsCount = 0;
        }
      }
    };

    cont.appendChild(catchMe);
    cont.appendChild(mouth);
    cont.appendChild(talk);
  } else {
    cont.style.transition = "all 1." + i + "s ease-in-out";
    var catchMe = document.createElement("img");
    catchMe.id = "catchMe";
    catchMe.src = "doge.png";
    cont.className = "swarm";
    cont.appendChild(catchMe);
  }
  document.getElementById("print").appendChild(cont);
}
// var rand = Math.floor(Math.random() * 4) + 1;
// catchMe.style.background = colors[rand];
// window.addEventListener("mousemove", (data) => {
//   var left_ = data.target.style.left.replaceAll("%", "");
//   const dist = 5;
//   if (left_ != "") {
//     var top_ = data.target.style.top.replaceAll("%", "");
//     var top = parseInt(top_);
//     var left = parseInt(left_);
//     move(top, left, data.target);

//     for (var i = 0; i < swarm.length; i++) {
//       var x = swarm[i].style.left.replaceAll("%", "");
//       var y = swarm[i].style.top.replaceAll("%", "");
//       var xx = parseInt(x);
//       var yy = parseInt(y);
//       if (yy >= top - dist && yy <= top + dist) {
//         if (xx >= left - dist && xx <= left + dist) {
//           move(yy, xx, swarm[i]);
//         }
//       }
//     }
//   }
// });
