const btnStart = document.querySelector(".start");
const wheel = document.querySelector(".wheel");
const modal = document.querySelector(".modal_wrap");
const btnClose = document.querySelector(".close");
const text = document.querySelector(".modal > p");
let isOn = false;
let rPos = 0;
let rotationSpeed = 10; // Initial rotation speed
let animationFrameId;

function rotateWheel() {
  rPos += rotationSpeed;
  wheel.style.transform = `rotate(${rPos}deg)`;
  animationFrameId = requestAnimationFrame(rotateWheel);

  if (rPos > 360) {
    rPos -= 360;
  }

  // Decrease rotation speed gradually when stopping
  if (!isOn && rotationSpeed > 0.5) {
    rotationSpeed -= 0.1; // Adjust the decrement value for desired slowdown rate
  } else if (!isOn && rotationSpeed <= 0.5) {
    stop();
    setTimeout(() => {
      modal.classList.add("on");
    }, 1000);
    if (rPos >= 0 && rPos <= 40) {
      text.innerText = "100점입니다😍";
    } else if (rPos > 40 && rPos <= 130) {
      text.innerText = "400점입니다😍";
    } else if (rPos > 130 && rPos <= 220) {
      text.innerText = "300점입니다😍";
    } else if (rPos > 220 && rPos <= 310) {
      text.innerText = "200점입니다😍";
    } else if (rPos > 310) {
      text.innerText = "100점입니다😍";
    }
  }
}

function stop() {
  cancelAnimationFrame(animationFrameId);
}

btnStart.addEventListener("click", () => {
  if (!isOn) {
    isOn = true;
    rotationSpeed = 10; // Reset rotation speed
    rotateWheel();
    wheel.classList.add("on");
    btnStart.blur();
    btnStart.innerText = "멈춤";
  } else {
    isOn = false;
    btnStart.innerText = "시작";
    btnStart.style.display = "none";
    btnStart.blur();
  }
});

btnClose.addEventListener("click", () => {
  modal.classList.remove("on");
  location.reload();
});
