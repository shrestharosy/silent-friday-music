import * as io from 'socket.io-client';
import config from '../config';
import * as storage from 'src/utils/storage.utils';
import { ACCESS_TOKEN } from 'src/constants/storage';

let socketServiceInstance: SocketService | null = null;

export interface ISocketMessage {
  type: string;
  payload: Object;
}

interface ISocket {
  getIOInstance(): SocketIOClient.Socket;
  initialize: (baseURL: string) => void;
}

class SocketService implements ISocket {
  private IOInstance: SocketIOClient.Socket;

  constructor() {
    this.initialize(config.ApiEnv.baseURL);
  }
  initialize(baseURL: string) {
    this.IOInstance = io(baseURL, {
      query: {
        authorization: `Bearer ${storage.getFromStorage(ACCESS_TOKEN)}`,
      },
    });
  }
  getIOInstance = () => {
    return this.IOInstance;
  };
}

function createSocketInstance() {
  return new SocketService();
}

export default function getSocketInstance() {
  if (socketServiceInstance === null) {
    socketServiceInstance = createSocketInstance();
  }
  return socketServiceInstance;
}
