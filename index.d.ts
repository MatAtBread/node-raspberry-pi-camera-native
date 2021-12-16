import { EventEmitter } from 'events';

interface RaspberryPiCamera extends EventEmitter {
  start(options: CameraOptions): Promise<void>;
  stop(): Promise<void>;
  setConfig(options: CameraOptions): Promise<void>; // Currently only "quality" can be changed while the preview is running
  pause(): Promise<void>; // Note: the preview stream can't be paused or resumed. Use start and stop
  resume(): Promise<void>; // Note: the preview stream can't be paused or resumed. Use start and stop

  get running(): boolean;
  nextFrame(): Promise<Buffer>;

  // Overloads EventEmitter
  on(event: 'frame', listener: (frame:Buffer) => void): this;
  once(event: 'frame', listener: (frame:Buffer) => void): this;
}

export enum Mirror {
  NONE = 0,
  VERT = 1,
  HORZ = 2,
  BOTH = 3  
}

export interface CameraOptions {
  width: number,
  height: number,
  fps: number,
  encoding: string,
  quality: number,
  rotation: 0 | 90 | 180 | 270,
  mirror: Mirror
}

declare const _def: RaspberryPiCamera;
export default _def;
