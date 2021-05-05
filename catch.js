var mode = "catch";
var swarm = [];
var swarm_img = [];
var eyes = [];
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
var togetherX = 0;
var togetherY = 0;
var swarmCount = 200;
var pattern = null;
var split_ = false;

function start() {
  mode = document.getElementById("mode").value;
  if (mode == "catch") {
    catch_shell();
    eyes = document.getElementsByClassName("eyes");
  } else {
    var circular = false;
    if (mode == "circular") {
      circular = true;
      swarmCount = 100;
    }
    for (var i = 0; i < swarmCount; i++) {
      shell(circular);
    }
    swarm = document.getElementsByClassName("swarm");
    swarm_img = document.getElementsByClassName("swarm_img");
  }

  //catch eyes
  document.addEventListener("mousemove", (evt) => {
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
    togetherX = data.clientX;
    togetherY = data.clientY;
    if (mode == "circular" && !scattered) {
      scattered = true;
      split_ = !split_;
      together(togetherY - 150, togetherX - 150);
    } else if (mode == "catch" && data.target.id == "catch_cont") {
      caught = true;
      document.getElementById("mouth").style.width = "5%";
      document.getElementById("mouth").style.marginLeft = "45%";
      document.getElementById("talk").innerText = "caught me!";
    } else if (mode == "move") {
      split_ = false;
      scatter();
      setTimeout(() => {
        together(togetherY + 10, togetherX - 5);
      }, 300);
    }
  });

  function scatter() {
    var count = 0;
    scattered = true;
    var scat = setInterval(cyc, 20);
    function cyc() {
      if (count <= swarmCount) {
        var rotat = Math.floor(Math.random() * 180) + 360;
        swarm[count].style.opacity = "0.5";
        swarm[count].style.width = "35";
        swarm[count].style.height = "35";
        count % 2 == 0
          ? (swarm_img[count].style.transform = "rotate(" + rotat + "deg)")
          : (swarm_img[count].style.transform = "rotate(-" + rotat + "deg)");

        var rand = Math.floor(Math.random() * 87) + 1;
        var rand2 = Math.floor(Math.random() * 87) + 4;
        swarm[count].style.left = rand2 + "%";
        swarm[count].style.top = rand + "%";
        count++;
      } else {
        scattered = false;
        clearInterval(scat);
      }
    }
  }

  function together(y, x) {
    var posX = Math.floor((x / window.innerWidth) * 100) - 3;
    var posY = Math.floor((y / window.innerHeight) * 100) - 3;
    var size = 100;
    var to = swarmCount;
    if (split_) to = swarmCount / 2;
    var count = 0;
    var togeth = setInterval(cyc2, 30);
    function cyc2() {
      if (count < to) {
        swarm[count].style.opacity = "1";
        swarm_img[count].style.transform = "rotate(0deg)";
        swarm_img[count].style.width = size + "px";
        swarm_img[count].style.Height = size + "px";
        swarm[count].style.top = posY + "%";
        swarm[count].style.left = posX + "%";
        count++;
      } else {
        count = 0;
        scattered = false;
        clearInterval(togeth);
      }
    }
  }

  document.getElementById("mode").addEventListener("change", function (data) {
    swarm = [];
    swarm_img = [];
    caught = false;
    mode = data.target.value;
    document.getElementById("print").innerHTML = "";
    start();
  });

  document.addEventListener("contextmenu", () => {
    var r = Math.floor(Math.random() * 5) + 1;
    for (var i = 0; i < swarm_img.length; i++) {
      swarm_img[i].src = "imgs/i" + r + ".png";
    }
  });
}

function move(y, x, target) {
  var distance = 10;
  if (mode == "catch") {
    distance = 50;
  }
  var f = true;
  while (f) {
    var rand = Math.floor(Math.random() * 84) + 1;
    var rand2 = Math.floor(Math.random() * 90) + 1;
    if (rand > y - distance && rand < y + distance) {
      if (rand2 > x - distance && rand2 < x + distance) {
        target.style.top = rand + "%";
        target.style.left = rand2 + "%";
        f = false;
      }
    }
  }
}

function shell(circular) {
  var cont = document.createElement("div");
  cont.id = "shell_cont";
  cont.className = "swarm";
  var rand = Math.floor(Math.random() * 200) + 1;
  if (circular) {
    cont.style.animationName = "orbit";
    cont.style.animationDuration = "1." + rand + "s";
    cont.style.animationTimingFunction = "linear";
    cont.style.animationIterationCount = "infinite";
    cont.style.width = "400px";
    cont.style.height = "400px";
  } else {
    cont.style.width = "200px";
    cont.style.height = "200px";
  }
  cont.style.transition = "all 0.9s ease-in-out";

  var inner = document.createElement("img");
  inner.id = "shell";
  inner.src = "imgs/i1.png";
  inner.className = "swarm_img";
  inner.style.transition = "all 0.9s ease-in-out";
  cont.appendChild(inner);
  document.getElementById("print").appendChild(cont);
}

function catch_shell() {
  var cont = document.createElement("div");
  cont.id = "catch_cont";
  cont.style.top = "50%";
  cont.style.left = "50%";
  cont.style.transition = "all 0.4s ease-in-out";

  var catchMe = document.createElement("div");
  catchMe.id = "catch";

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
  document.getElementById("print").appendChild(cont);
}
