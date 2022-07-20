import { ImageSourceType } from "../context";

export const getCapturer = (stream: MediaStream, disableImageCapture: boolean): [ImageSourceType, CanvasImageSource] => {

  if (window.ImageCapture && !disableImageCapture) {
    const track = stream.getVideoTracks()[0];
    if (!track) {
      throw Error('No video track in the stream.');
    }
    const capturer = new window.ImageCapture(track);
    return ['capturer',capturer];
  } else {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    return ['video', video];
  }
};