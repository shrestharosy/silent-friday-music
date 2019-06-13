import axios from "../../popup/utils/axios";
import { wrapStore } from "webext-redux";
import { createStore } from "redux";
import devToolsEnhancer from "remote-redux-devtools";

import rootReducer from "./reducers";

let currentAudioElement: HTMLAudioElement | null = null;
let currentSourceElement: HTMLSourceElement | null = null;

function createAudioElement() {
  const audioElement: HTMLAudioElement = document.createElement("audio");
  return audioElement;
}

function createSourceElement() {
  const sourceElement: HTMLSourceElement = document.createElement("source");
  sourceElement.type = "audio/mpeg";
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
      .post<IBroadcastResponse>("/broadcast", {
        requestUrl: url
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
  currentAudioElement.setAttribute("src", url);
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
    case "LOAD_AUDIO": {
      loadAudio(request.data.requestUrl);
      break;
    }
    case "PLAY": {
      currentAudioElement.load;
      currentAudioElement.play();
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
  chrome.tabs.query({ url: "https://www.youtube.com/watch*" }, function(tabs) {
    const recentTab = tabs[tabs.length - 1];
    console.log(recentTab);
    if (recentTab) {
      const { url, title, favIconUrl } = recentTab;
      localStorage.setItem("YOUTUBE_URL", url);
      localStorage.setItem("YOUTUBE_TITLE", title);
      localStorage.setItem("YOUTUBE_IMAGE", favIconUrl);
    }
  });
}

const store = createStore(rootReducer, devToolsEnhancer());

wrapStore(store, {
  portName: "silent-friday-music"
});