let startScrollButton = document.getElementById("start-scrolling");
let stopScrollButton = document.getElementById("stop-scrolling");
let speedEl = document.querySelector("[name=speed]");
let rateEl = document.querySelector("[name=rate]");
let speed, rate;

speedEl.addEventListener("change", () => {
  speed = parseInt(speedEl.value);
  sendToContentScript({ type: "speedChange", speed });
});

rateEl.addEventListener("change", () => {
  rate = parseInt(rateEl.value);
  sendToContentScript({ type: "rateChange", rate });
});

startScrollButton.addEventListener("click", () => {
  speed = parseInt(speedEl.value);
  rate = parseInt(rateEl.value);
  sendToContentScript({ type: "startScroll", speed, rate });
});

stopScrollButton.addEventListener("click", () => {
  sendToContentScript({ type: "stopScroll" });
});

function sendToContentScript(data) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, data);
  });
}
