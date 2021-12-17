# node-raspberry-pi-camera-native

- Forked to fix errors/crashes to do with buffer recycling (esp. on stop), re-entrancy, menory-leak fixes and expand the API
- Includes Typescript type definitions
- All dependencies have also been updated

Use your [Raspberry Pi Camera Module](https://www.raspberrypi.org/documentation/hardware/camera/README.md) with [Node.js](https://nodejs.org)

**NOTE:** Currently only supports image capture and live preview as *MJPEG*

## Prerequisites

 * Hardware
   * Raspberry Pi
   * [Raspberry Pi Camera module](https://www.raspberrypi.org/documentation/hardware/camera/README.md)

 * Software
   * [Raspberry Pi camera enabled](https://www.raspberrypi.org/documentation/configuration/camera.md)
   * Node.js 8 or later installed

## Install

```
npm install pi-camera-native-ts --only=prod 
```

`npm install pi-camera-native-ts` will also install development dependencies, but you're probably better off with `git clone https://github.com/MatAtBread/node-raspberry-pi-camera-native.git && cd node-raspberry-pi-camera-native && npm i`


## Usage

```javascript
// require module
const raspberryPiCamera = require(pi-camera-native-ts);

// add frame data event listener
raspberryPiCamera.on('frame', (frameData) => {
  // frameData is a Node.js Buffer
  // ...
});

// start capture
raspberryPiCamera.start({
  width: 1920,
  height: 1080,
  fps: 20,
  encoding: 'JPEG',
  quality: 12,
  rotation: 0,
  mirror: Mirror.NONE
});
```

```Typescript
import camera from 'pi-camera-native-ts';
....
await camera.start({
  width: 1920,
  height: 1080,
  fps: 20,
  encoding: 'JPEG',
  quality: 12,
  rotation: 0,
  mirror: Mirror.NONE
});

const jpegData = await camera.nextFrame();

await camera.stop();
```

Some fuller examples of the API in action can be found in ["Obscura"](https://github.com/MatAtBread/obscura/blob/master/src/index.ts)

### API

See the [index.d.ts](./index.d.ts) for the full API.
