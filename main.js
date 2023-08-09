const btnStart = document.querySelector(".start");
const wheel = document.querySelector(".wheel");
const modal = document.querySelector(".modal_wrap");
const btnClose = document.querySelector(".close");
const text = document.querySelector(".modal > p");
const title = document.querySelector('.modal > h1')
let isOn = false; 
let rPos = 0;
let rotationSpeed = 0; 
let animationFrameId;

// 돌아가는 애니메이션
function rotateWheel() {
  rPos += rotationSpeed;
  wheel.style.transform = `rotate(${rPos}deg)`;
  animationFrameId = requestAnimationFrame(rotateWheel); 
  
  // 휠이 한바퀴 돌면 다시 처음으로 각도 리셋 (계산하기 편하게)
  if (rPos > 360) {
    rPos = 0;
  }
  
  if (!isOn && rotationSpeed > 0.1) {
    rotationSpeed *= 0.98; // 0.98 등의 값으로 곱하여 천천히 속도를 줄임
  } else if (!isOn && rotationSpeed <= 0.1) {
    rotationSpeed = 0; // 최종적으로 속도를 0으로 설정하여 애니메이션을 정확하게 멈춤
    stop();
    setTimeout(() => {
      modal.classList.add("on");
    }, 1000);// 모달창이 바로 뜨면 결과가 안보이므로 지연시킴
    
    // 선 사이에 결과가 위치하게되면 애매해지므로 10단위로 끊어서 배치함
    rPos = Math.floor(rPos / 10) * 10;
    wheel.style.transform = `rotate(${rPos}deg)`;

    // 
    if (rPos >= 0 && rPos <= 40) {
      text.innerText = "100점입니다😍";
    } else if (rPos > 40 && rPos <= 130) {
      text.innerText = "400점입니다😍";
    } else if (rPos > 130 && rPos <= 220) {
      text.innerText = "꽝 🤪";
    } else if (rPos > 220 && rPos <= 310) {
      text.innerText = "200점입니다😍";
    } else if (rPos > 310) {
      text.innerText = "100점입니다😍";
    }
  }
}

// 애니메이션 멈춤
function stop() {
  cancelAnimationFrame(animationFrameId);
}

// 버튼 클릭하면
btnStart.addEventListener("click", () => {
  if (!isOn) {
    isOn = true;
    rotationSpeed = 5; // Reset rotation speed
    rotateWheel();
    wheel.classList.add("on");
    btnStart.blur();
    btnStart.innerText = "멈춤";
  } else {
    isOn = false;
    btnStart.innerText = "시작";
    btnStart.style.opacity = 0;
    btnStart.style.cursor = 'inherit';

    btnStart.blur();
  }
});

// 확인버튼 누르면 새로고침
btnClose.addEventListener("click", () => {
  modal.classList.remove("on");
  location.reload(); // 새로고침
});
