import axios from '../../popup/utils/axios';

function createAudioElement(url: string) {
  const audioElement: HTMLAudioElement = document.createElement('audio');
  audioElement.setAttribute('preload', 'auto');

  const source: HTMLSourceElement = document.createElement('source');
  source.type = 'audio/mpeg';
  source.src = url;
  audioElement.appendChild(source);

  return audioElement;
}

interface IBroadcastResponse {
  avatar: string;
  name: string;
  streamUrl: string;
}

async function loadAudio(url: string) {
  const { avatar, name, streamUrl } = await axios
    .post<IBroadcastResponse>('/broadcast', {
      requestUrl: url,
    })
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch(error => {
      throw error;
    });

  const audioElement = createAudioElement(streamUrl);
  audioElement.play();
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const url = 'http://lezotre.free.fr/Mp3/disco.mp3';
  const audioElement = createAudioElement(url);

  switch (request.type) {
    case 'LOAD_AUDIO': {
      loadAudio(request.data);
      break;
    }
    case 'PLAY': {
      audioElement.load;
      audioElement.play();
    }
    default:
  }
});
