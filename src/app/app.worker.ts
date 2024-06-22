/// <reference lib="webworker" />

addEventListener('message', (event) => {
  postMessage('sended');
});
