declare module 'winston-logger-setup' {
  export function cnsl(...message: Array<string>): void;
  export function error(...message: Array<string>): void;
  export function info(...message: Array<string>): void;
}
