# node-raspberry-pi-camera-native

- Forked to with fixes around buffer allocation, re-entrancy and menory-leak fixes
- Includes Typescript type definitions
- All dependencies have also been updated.

Use your [Raspberry Pi Camera Module](https://www.raspberrypi.org/documentation/hardware/camera/README.md) with [Node.js](https://nodejs.org)

**NOTE:** Currently only supports still image capture with live preview

## Prerequisites

 * Hardware
   * Raspberry Pi
   * [Raspberry Pi Camera module](https://www.raspberrypi.org/documentation/hardware/camera/README.md)

 * Software
   * [Raspberry Pi camera enabled](https://www.raspberrypi.org/documentation/configuration/camera.md)
   * Node.js 8 or later installed

## Install

```
npm install pi-camera-native-ts
```

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
raspberryPiCamera.start();
```

```Typescript
import camera from 'pi-camera-native-ts';
....
await camera.start({
  width: 1920,
  height: 1080,
  fps: 20,
  encoding: 'JPEG',
  quality: 7
});

const jpegData = await camera.nextFrame();

await camera.stop();
```

### API

See the [index.d.ts](./index.d.ts) for the full API.