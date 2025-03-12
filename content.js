// SPDX-License-Identifier: MIT https://opensource.org/license/MIT
// Author: instak1ll
// Description: This is a simple chrome extension that allows you to control the playback speed of YouTube videos using keyboard shortcuts and on-screen buttons.
// Website: https://chromewebstore.google.com/
// GitHub: https://github.com/instak1ll/YouTube-Speed-Controller
// Donate: EVM = 0x08BA2c5d7E56bD586917AA04f16a7c021B6DB156 SVM = 2oBxonosCSdb6mXg8a4euz5GqUTXLcpnfnXWKt2Vb8pT BTC = bc1q0v6j2x2zpca5al0ws2prqvmn98rjs5va9pellq

function createSpeedControl() {
  const container = document.createElement("div");
  container.className = "yt-speed-control";

  const display = document.createElement("div");
  display.className = "speed-display";
  display.textContent = "1.00x";

  const controls = document.createElement("div");
  controls.className = "speed-buttons";

  const decreaseBtn = document.createElement("button");
  decreaseBtn.textContent = "-";
  decreaseBtn.onclick = () => adjustSpeed("decrease");

  const increaseBtn = document.createElement("button");
  increaseBtn.textContent = "+";
  increaseBtn.onclick = () => adjustSpeed("increase");

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset";
  resetBtn.onclick = () => resetSpeed();

  controls.appendChild(decreaseBtn);
  controls.appendChild(display);
  controls.appendChild(increaseBtn);
  controls.appendChild(resetBtn);

  container.appendChild(controls);
  document.body.appendChild(container);

  return { container, display };
}

let currentSpeed = 1;
const speedStep = 0.5;
const maxSpeed = 16;
let ui;

function adjustSpeed(action) {
  const video = document.querySelector("video");
  if (!video) return;

  if (action === "increase" && currentSpeed < maxSpeed) {
    currentSpeed += speedStep;
  } else if (action === "decrease" && currentSpeed > 0.25) {
    currentSpeed -= speedStep;
  }

  currentSpeed = Math.round(currentSpeed * 100) / 100;
  video.playbackRate = currentSpeed;
  ui.display.textContent = currentSpeed.toFixed(2) + "x";
}

function resetSpeed() {
  const video = document.querySelector("video");
  if (!video) return;

  currentSpeed = 1;
  video.playbackRate = 1;
  ui.display.textContent = "1.00x";
}

document.addEventListener("keydown", (e) => {
  if (document.activeElement.tagName === "INPUT") return;

  switch (e.key.toLowerCase()) {
    case "d":
      adjustSpeed("increase");
      break;
    case "s":
      adjustSpeed("decrease");
      break;
    case "r":
      resetSpeed();
      break;
  }
});

function init() {
  ui = createSpeedControl();

  const observer = new MutationObserver(() => {
    const video = document.querySelector("video");
    if (video && video.playbackRate !== currentSpeed) {
      video.playbackRate = currentSpeed;
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
