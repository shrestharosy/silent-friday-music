import * as io from 'socket.io-client';
import config from '../config';

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
    this.IOInstance = io(baseURL);
  }
  getIOInstance = () => {
    return this.IOInstance;
  };
}

const socketServiceInstance = new SocketService();

export default socketServiceInstance;
