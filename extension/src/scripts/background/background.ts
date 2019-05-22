function createAudioElement() {
  console.log('roz', document);
  const audioElement: HTMLAudioElement = document.createElement('audio');
  audioElement.setAttribute('preload', 'auto');

  const source1: HTMLSourceElement = document.createElement('source');
  source1.type = 'audio/mpeg';
  source1.src = 'http://lezotre.free.fr/Mp3/disco.mp3';
  audioElement.appendChild(source1);

  return audioElement;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const audioElement = createAudioElement();
  if (request.type == 'PLAY') {
    audioElement.load;
    audioElement.play();
  }
  if (request.type == 'PAUSE') {
    debugger;
    audioElement.pause();
  }
});
