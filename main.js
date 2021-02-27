const dropzone = document.getElementsByClassName("dropzone");
var ball = document.getElementById("ball");
var ball2 = document.getElementById("ball2");
const ballZone = document.getElementsByClassName("ball-zone");
var score = 0;
document.getElementById("score").innerHTML = score;
var isPaused = false;
var timeToTry;
var timerFlag = false;

// Start
$("#start").on("click", function (e) {
  score = 0;
  isPaused = false;
  $("#ball").hide();
  $("#ball2").hide();
  countdown("timer", 3, 0);
  let inrevalball = setInterval(game, 8000);
  let inrevalball2 = setInterval(ball2game, getRandomInt(20000, 30000));
});

// Pause or continue
$("#pause").click(function (e) {
  e.preventDefault();
  isPaused = !isPaused;
  let $this = $(this);
  let id = $this.attr("id").replace(/btn/, "");
  $this.toggleClass("active");
  if ($this.hasClass("active")) {
    $this.text("Continue");
  } else {
    $this.text("Pause");
  }
});

// Countdown - check the second issue
function countdown(element, minutes, seconds) {
  var mainTimer = minutes * 60 + seconds;
  let interval = setInterval(function () {
    if (!this.isPaused) {
      let el = document.getElementById(element);
      // If the time is 0 then end the counter
      if (mainTimer <= -1) {
        if (score >= 10) {
          document.getElementById("message").innerHTML = "You Win";
          
        } else {
          document.getElementById("message").innerHTML = "You Lose";
        }
        isPaused = true;
        clearInterval(interval);
        return;
      }
      let minutes = Math.floor(mainTimer / 60);
      if (minutes < 10) minutes = "0" + minutes;
      let seconds = mainTimer % 60;
      if (seconds < 10) seconds = "0" + seconds;
      let text = minutes + ":" + seconds;
      el.innerHTML = text;
      mainTimer--;
    }
  }, 1000);
}

// Start drag
function onDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.currentTarget.style.backgroundColor = "yellow";
}

function onDragOver(event) {
  event.preventDefault();
}

// Drop
function onDrop(event) {
  event.preventDefault();
  const id = event.dataTransfer.getData("text");
  const draggableElement = document.getElementById(id);
  if ($("#ball2").is(":visible") && id == "ball") {
    this.failed(ball2.id);
  } else {
    const dropTarget = event.target;
    dropTarget.appendChild(draggableElement);
    this.success(draggableElement.id);
  }
  event.dataTransfer.clearData();
}

function game() {
  if (!this.isPaused) {
    const balldrag = document.getElementById("ball");
    balldrag.style.backgroundColor = "#000000";

    if ($("#ball").is(":visible") && !dropzone[0].contains(ball)) {
      this.failed(ball.id);
    }

    if (dropzone[0].contains(ball)) {
      dropzone[0].removeChild(ball);
      ballZone[0].appendChild(ball);
    }

    $("#ball").is(":visible") ? $("#ball").hide() : $("#ball").show();

    let timeOut1 = setTimeout(setDraggable1, 3000);
  }
}

function ball2game() {
  if (!this.isPaused) {
    const ball2 = document.getElementById("ball2");
    ball2.style.backgroundColor = "#000000";

    $("#ball2").show();

    if (dropzone[0].contains(ball2)) {
      dropzone[0].removeChild(ball2);
      ballZone[0].appendChild(ball2);
    }

    let timeOut2 = setTimeout(setDraggable2, 3000);
  }
}

function setDraggable1() {
  if (!isPaused) {
    if (ball.draggable) {
      ball.setAttribute("draggable", false);
    } else {
      ball.setAttribute("draggable", true);

      let timeleft = 4;
      let downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
          clearInterval(downloadTimer);
          document.getElementById("timeToTry").innerHTML = "Your turn is over";
        } else {
          document.getElementById("timeToTry").innerHTML =
            timeleft + " seconds";
        }
        timeleft -= 1;
      }, 1000);
    }
  }
}

function setDraggable2() {
  if (!isPaused) {
    ball2.setAttribute("draggable", true);

    let timeleft = 4;
    let downloadTimer = setInterval(function () {
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
        document.getElementById("timeToTry").innerHTML = "Your turn is over";

        if ($("#ball2").is(":visible") && !dropzone[0].contains(ball2)) {
          this.failed(ball2.id);
        }

        $("#ball2").hide();

        ball2.setAttribute("draggable", false);
      } else {
        document.getElementById("timeToTry").innerHTML = timeleft + " seconds";
      }
      timeleft -= 1;
    }, 1000);
  }
}

// Get number between 20-30
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function success(draggableElementId) {
  let times = 0;
  let interval = setInterval(function () {
    $(dropzone).toggleClass("backgroundGreen");
    times++;
    if (times == 10) {
      clearInterval(interval);
      times = 0;
    }
  }, 100);
  if (draggableElementId == "ball") {
    this.score++;
  } else {
    this.score += 2;
  }
  document.getElementById("score").innerHTML = score;
}

function failed(draggableElementId) {
  let times = 0;
  let interval = setInterval(function () {
    $(dropzone).toggleClass("backgroundRed");
    times++;
    if (times == 10) {
      clearInterval(interval);
      times = 0;
    }
  }, 100);
  if (draggableElementId == "ball") {
    this.score--;
  } else {
    this.score -= 2;
  }
  document.getElementById("score").innerHTML = score;
}
