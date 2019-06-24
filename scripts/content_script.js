let interval;
let speed = 1,
  rate = 20;

window.onload = () => {
  Shortcuts.set(["go", startScrolling], ["stop", stopScrolling]);
  Shortcuts.listen();

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.type) {
      case "speedChange":
        ({ speed } = request);
        startScrolling();
        break;
      case "rateChange":
        ({ rate } = request);        
        startScrolling();
        break;
      case "startScroll":
        ({ speed, rate } = request);
        startScrolling();
        break;
      case "stopScroll":
        stopScrolling();
        break;
      default:
        break;
    }
  });
};

function startScrolling() {
  if (interval) clearInterval(interval);
  interval = setInterval(() => window.scrollBy(0, speed), rate);
}

function stopScrolling() {
  clearInterval(interval);
}
