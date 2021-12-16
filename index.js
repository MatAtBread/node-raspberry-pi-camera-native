const RaspberryPiCamera = require('./lib/raspberry-pi-camera');

module.exports = new RaspberryPiCamera();
module.exports.Mirror = {
    NONE: 0,
    VERT: 1,
    HORZ: 2,
    BOTH: 3   
}