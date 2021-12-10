import { EventEmitter } from 'events';

interface RaspberryPiCamera extends EventEmitter {
  start(options: CameraOptions): Promise<void>;
  setConfig(options: CameraOptions): Promise<void>;
  pause(): Promise<void>;
  resume(): Promise<void>;
  stop(): Promise<void>;

  get running(): boolean;

  // Overloads EventEmitter
  on(event: 'frame', listener: (frame:Buffer) => void): this;
  once(event: 'frame', listener: (frame:Buffer) => void): this;
}

interface CameraOptions {
  width: number,
  height: number,
  fps: number,
  encoding: string,
  quality: number
}

declare const _def: RaspberryPiCamera;
export default _def;
