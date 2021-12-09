const events = require('events');

const RaspberryPiCameraNative = require('bindings')('raspberry-pi-camera').Native;

class RaspberryPiCamera extends events.EventEmitter {
  constructor() {
    super();

    this._native = new RaspberryPiCameraNative((data) => this._onData(data));
    this._frameData = [];
    this._running = false;
  }

  get running() { return this._running }
  
  start(options) {
    let err = undefined;

    try {
      this._native.start(options);
      this._running = true;
    } catch (e) {
      e = err;
    }

    return new Promise((resolve,reject) => process.nextTick(()=>err?reject(err):resolve()));
  }

  setConfig(options) {
    let err = undefined;

    try {
      this._native.setConfig(options);
    } catch (e) {
      e = err;
    }

    return new Promise((resolve,reject) => process.nextTick(()=>err?reject(err):resolve()));
  }

  pause() {
    let err = undefined;

    try {
      this._native.pause();
      this._running = false;
    } catch (e) {
      e = err;
    }

    return new Promise((resolve,reject) => process.nextTick(()=>err?reject(err):resolve()));
  }

  resume() {
    let err = undefined;

    try {
      this._native.resume();
      this._running = true;
    } catch (e) {
      e = err;
    }

    return new Promise((resolve,reject) => process.nextTick(()=>err?reject(err):resolve()));
  }

  stop() {
    let err = undefined;

    try {
      this._native.stop();
      this._running = false;
    } catch (e) {
      e = err;
    }

    return new Promise((resolve,reject) => process.nextTick(()=>err?reject(err):resolve()));
  }

  _onData(data) {
    this.emit('data', data);

    this._frameData.push(data);

    if (data.length < 81920) {
      let frame = Buffer.concat(this._frameData);

      this.emit('frame', frame);

      this._frameData = [];
    }
  }
}

module.exports = RaspberryPiCamera;
