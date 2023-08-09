const btnStart = document.querySelector(".start");
const wheel = document.querySelector(".wheel");
const modal = document.querySelector(".modal_wrap");
const btnClose = document.querySelector(".close");
const text = document.querySelector(".modal > p");
let isOn = false;
let rPos = 0;
let animationFrameId;

function rotateWheel() {
  rPos += 10;
  wheel.style.transform = `rotate(${rPos}deg)`;
  animationFrameId = requestAnimationFrame(rotateWheel);

  if (rPos > 360) {
    rPos = 0;
  }
}

function stop() {
  cancelAnimationFrame(animationFrameId);
}

// 시작 누르면 3초후 돌림판 멈추고 버튼 사라짐

// btnStart.addEventListener("click", () => {
//   if (!isOn) {
//     rotateWheel();
//     wheel.classList.add("on");
//     btnStart.style.display = "none";

//     // 휠을 회전시키는 동안의 시간 설정 (여기서는 5000밀리초, 즉 5초)
//     setTimeout(() => {
//       stop();
//       wheel.classList.remove("on");
//       btnStart.innerText = "시작";
//       isOn = false;
//     }, 3000); // 5000밀리초 = 5초
//   }
//   isOn = !isOn;
// });

// 시작, 멈춤 버튼으로 조절가능
btnStart.addEventListener("click", () => {
  if (!isOn) {
    rotateWheel();
    wheel.classList.add("on");
    btnStart.blur();

    btnStart.innerText = "멈춤";
  } else {
    stop();
    modal.classList.add("on");
    btnStart.innerText = "시작";
    if (0 <= rPos && rPos <= 40) {
      text.innerText = "100점입니다😍";
    } else if (50 <= rPos && rPos <= 130) {
      text.innerText = "400점입니다😍";
    } else if (130 <= rPos && rPos <= 220) {
      text.innerText = "300점입니다😍";
    } else if (230 <= rPos && rPos <= 310) {
      text.innerText = "200점입니다😍";
    } else if (320 <= rPos && rPos <= 360) {
      text.innerText = "100점입니다😍";
    }
    btnStart.blur();
  }
  isOn = !isOn;
});

btnClose.addEventListener("click", () => {
  modal.classList.remove("on");
  location.reload();
});

// 엔터로 동작
// document.addEventListener("keydown", (event) => {
//   if (event.key === "Enter" && !isOn) {
//     rotateWheel();
//     wheel.classList.add("on");
//     btnStart.innerText = "멈춤";
//   } else if (event.key === "Enter" && isOn) {
//     stop();
//     btnStart.innerText = "시작";
//     if (rPos <= 40) {
//       alert("100점입니다😍");
//       location.reload();
//     } else if (50 < rPos && rPos <= 130) {
//       alert("400점입니다😍");
//       location.reload();
//     } else if (140 <= rPos && rPos <= 220) {
//       alert("300점입니다😍");
//       location.reload();
//     } else if (230 <= rPos && rPos <= 310) {
//       alert("200점입니다😍");
//       location.reload();
//     }
//   }
//   isOn = !isOn;
// });
