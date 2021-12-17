const events = require('events');

const RaspberryPiCameraNative = require('bindings')('raspberry-pi-camera').Native;

class RaspberryPiCamera extends events.EventEmitter {
  constructor() {
    super();

    this._native = new RaspberryPiCameraNative((data) => this._onData(data));
    this._frameData = [];
    this.lastFrame = undefined;
  }

  get running() { return !this._native.isPaused() }
  
  nextFrame() {
    return new Promise(resolve => this.once('frame',resolve));
  }

  _delayed(method,options) {
    const location = new Error();
    return new Promise((resolve,reject)=>{
      process.nextTick(()=>{
        try {
          if (options !== undefined) {
            this._native[method](Object.fromEntries(Object.entries(options).map(([k,v]) => [k,typeof v==='number' ? v|0 : v])));
          } else {
            this._native[method]();
          }
          resolve();
        } catch (e) {
          e.stack = location.stack;
          reject(e);
        }
      })
    });
  }

  start(options) {
    return this._delayed('start', options);
  }

  setConfig(options) {
    return this._delayed('setConfig', options);
  }

  pause() {
    return this._delayed('pause');
  }

  resume() {
    return this._delayed('resume');
  }

  stop() {
    return this._delayed('stop');
  }

  _onData(data) {
    this.emit('data', data);

    this._frameData.push(data);

    if (data.length < 81920) {
      this.lastFrame = Buffer.concat(this._frameData);
      this.emit('frame', this.lastFrame);

      this._frameData = [];
    }
  }
}

module.exports = RaspberryPiCamera;
