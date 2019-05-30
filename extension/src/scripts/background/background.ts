import axios from '../../popup/utils/axios';
import { storageUtils } from '../../popup/utils';

let currentAudioElement: HTMLAudioElement | null = null;
let currentSourceElement: HTMLSourceElement | null = null;

function createAudioElement() {
  const audioElement: HTMLAudioElement = document.createElement('audio');
  return audioElement;
}

function createSourceElement() {
  const sourceElement: HTMLSourceElement = document.createElement('source');
  sourceElement.type = 'audio/mpeg';
  return sourceElement;
}

interface IBroadcastResponse {
  avatar: string;
  name: string;
  streamUrl: string;
}

async function loadAudio(url: string) {
  try {
    const { avatar, name, streamUrl } = await axios
      .post<IBroadcastResponse>('/broadcast', {
        requestUrl: url,
      })
      .then(({ data }) => {
        return data;
      })
      .catch(error => {
        throw error;
      });
    changeStreamLink(streamUrl);
    await currentAudioElement.play();
  } catch (error) {
    console.log(error);
  }
}

function changeStreamLink(url: string) {
  currentAudioElement.setAttribute('src', url);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (!currentAudioElement && !currentSourceElement) {
    const audioElement = createAudioElement();
    const sourceElement = createSourceElement();
    currentAudioElement = audioElement;
    currentSourceElement = sourceElement; // source element append is not working...
    document.body.appendChild(audioElement);
  }

  switch (request.type) {
    case 'LOAD_AUDIO': {
      loadAudio(request.data.requestUrl);
      break;
    }
    case 'PLAY': {
      currentAudioElement.load;
      currentAudioElement.play();
    }
    case 'GET_YOUTUBE_URL': {
      console.log('roz', localStorage.getItem('YOUTUBE_URL'));
      return localStorage.getItem('YOUTUBE_URL');
    }
    default:
  }
});

function addTabListener() {
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    fetchActiveYoutubeUrl();
  });

  chrome.tabs.onCreated.addListener(function(tab) {
    fetchActiveYoutubeUrl();
  });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  fetchActiveYoutubeUrl();
});

chrome.tabs.onCreated.addListener(function(tab) {
  fetchActiveYoutubeUrl();
});

function fetchActiveYoutubeUrl() {
  chrome.tabs.query({ url: 'https://www.youtube.com/watch*' }, function(tabs) {
    const recentTab = tabs[tabs.length - 1];
    // console.log("bg", "recent", recentTab, recentTab.url);
    if (recentTab) {
      const action = {
        type: 'YOUTUBE_URL',
        data: {
          url: recentTab.url,
          title: recentTab.title,
        },
      };
      localStorage.setItem('YOUTUBE_URL', recentTab.url);
    }
  });
}

function performBroadCast(action) {
  // chrome.tabs.query({ active: true }, tabs => {
  //   if (tabs.length) {
  //     chrome.tabs.sendMessage(tabs[0].id, action, response => {
  //       console.log('broadcasted');
  //     });
  //   }
  // });
  chrome.runtime.sendMessage(action);
}
