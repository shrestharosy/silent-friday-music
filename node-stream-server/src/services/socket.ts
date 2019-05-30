import socket, { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';

let socketInstance: SocketService | null = null;

interface ISocket {
  initialize: (httpInstance: HTTPServer) => Server;
  getIOInstance: () => Server;
}

class SocketService implements ISocket {
  private ioInstance: Server;
  constructor(httpInstance: HTTPServer) {
    const ioInstance = this.initialize(httpInstance);
    this.ioInstance = ioInstance;
  }
  initialize = (httpInstance: HTTPServer) => {
    const ioInstance = socket(httpInstance);
    return ioInstance;
  };
  getIOInstance = () => {
    return this.ioInstance;
  };
}

function createSocketInstance(httpInstance: HTTPServer) {
  return new SocketService(httpInstance);
}

export default function getSocketInstance(httpInstance?: HTTPServer) {
  if (socketInstance === null) {
    if (httpInstance) {
      socketInstance = createSocketInstance(httpInstance);
    } else {
      throw new Error('Socket is not initialized');
    }
  }
  return socketInstance;
}
