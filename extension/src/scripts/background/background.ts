import axios from '../../popup/utils/axios';
import { wrapStore } from 'webext-redux';
import { createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';

import rootReducer from './reducers';
import * as io from 'socket.io-client';

let currentAudioElement: HTMLAudioElement | null = null;
let currentSourceElement: HTMLSourceElement | null = null;
let testAudioElement: HTMLAudioElement | null = null;
let currentIoInstance: SocketIOClient.Socket | null = null;

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
    currentAudioElement.muted = true;
  } catch (error) {
    console.log(error);
  }
}

function changeStreamLink(url: string) {
  currentAudioElement.setAttribute('src', url);
  testAudioElement.setAttribute('src', url);
}

function initializeEventListeners() {
  // const ioInstance = io('http://localhost:3002');
  // console.log('init....');
  // ioInstance.on('connect', () => {
  //   console.log('connected...');
  // });
  console.log('init event listeners....');
  currentAudioElement.addEventListener('timeupdate', () => {
    // console.log(currentAudioElement.currentTime, ioInstance);
    currentIoInstance.emit('time-update', {
      timeStamp: currentAudioElement.currentTime,
      src: currentAudioElement.src,
    });
  });
  currentIoInstance.on('broadcast-time-update', ({ timeStamp, src }: { timeStamp: number; src: string }) => {
    if (testAudioElement.src !== src) {
      testAudioElement.src = src;
    }
    if (timeStamp - testAudioElement.currentTime > 1) {
      testAudioElement.pause;
      testAudioElement.currentTime = timeStamp;
      console.log(testAudioElement.currentTime, timeStamp, timeStamp - currentAudioElement.currentTime, 'diff');
    }
    testAudioElement.play();
    console.log(testAudioElement.currentTime - timeStamp);
    testAudioElement.addEventListener('playing', () => {
      console.log(testAudioElement.currentTime, timeStamp);
    });
  });
}

function initializeIOEventListeners() {
  if (!currentIoInstance) {
    const ioInstance = io('http://localhost:3002');
    console.log('init....');
    ioInstance.on('connect', () => {
      console.log('connected...');
    });
    // ioInstance.on('broadcast-time-update', ({ timeStamp, src }: { timeStamp: number, src: string}) => {
    //   console.log({timeStamp, src})
    // })
    currentIoInstance = ioInstance;
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (!currentAudioElement && !currentSourceElement && !testAudioElement) {
    const audioElement = createAudioElement();
    const sourceElement = createSourceElement();
    currentAudioElement = audioElement;
    currentSourceElement = sourceElement; // source element append is not working...
    testAudioElement = createAudioElement();
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
    case 'INIT': {
      initializeIOEventListeners();
      initializeEventListeners();
    }
    default:
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  fetchActiveYoutubeUrl();
});

chrome.tabs.onCreated.addListener(function(tab) {
  fetchActiveYoutubeUrl();
});

function fetchActiveYoutubeUrl() {
  chrome.tabs.query({ url: 'https://www.youtube.com/watch*' }, function(tabs) {
    const recentTab = tabs[tabs.length - 1];
    console.log(recentTab);
    if (recentTab) {
      const { url, title, favIconUrl } = recentTab;
      localStorage.setItem('YOUTUBE_URL', url);
      localStorage.setItem('YOUTUBE_TITLE', title);
      localStorage.setItem('YOUTUBE_IMAGE', favIconUrl);
    }
  });
}

const store = createStore(rootReducer, devToolsEnhancer());

wrapStore(store, {
  portName: 'silent-friday-music',
});
