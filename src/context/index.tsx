declare global {
  interface Window {
    ImageCapture?: any;
  }
}

import {createContext, useContext, useEffect, useState} from 'react';
import {isMobile} from 'is-mobile';
import { getCapturer } from '../utils/getCapturer';


export type FPSValue = 1 | 5 | 10 | 15 | 'max';

export type ImageSourceType = "none" | "capturer" | "video";

export type ImageSource = {
  type: ImageSourceType;
  value: CanvasImageSource;
};

export interface AppState {
  fps: FPSValue;
  setFps: (fps: FPSValue) => void;
  width: number;
  setWidth: (width: number) => void;
  height: number;
  ratio: number;
  fontSize: number;
  setFontSize: (number) => void;
  videoStream: MediaStream;
  capturer: any;
  imageSource: ImageSource;
  pixels: Uint8ClampedArray;
  setPixels: (pixels: Uint8ClampedArray) => void;
  disableImageCapture: boolean;
  setDisableImageCapture: (boolean) => void;
}

const isMob = isMobile();
console.log({isMob});
export const defaultAppState: AppState = {
  fps: isMob ? 1 : 'max',
  width: isMob ? 100 : 200,
  height: 100,
  ratio: 4/3,
  fontSize: isMob ? 5 : 10,
  setFontSize: (n) => {},
  imageSource: {
    type: 'none',
    value: undefined
  },
  videoStream: undefined,
  capturer: undefined,
  pixels: undefined,
  setPixels: (pixels) => {},
  setFps: (fps) => {},
  setWidth: (w) => {},
  disableImageCapture: isMob,
  setDisableImageCapture: (d) => {},
};

export const AppContext = createContext<AppState>(defaultAppState);

export const AppContextProvider = ({children}) => {
  const [videoStream, setVideoStream] = useState<MediaStream>(null);
  const [capturer, setCapturer] = useState(null);
  const [fps, setFps] = useState(defaultAppState.fps);
  const [pixels, setPixels] = useState<Uint8ClampedArray>(null);
  const [ratio, setRatio] = useState<number>(defaultAppState.ratio);
  const [width, setWidth] = useState<number>(defaultAppState.width);
  const [height, setHeight] = useState<number>(defaultAppState.height);
  const [imageSource, setImageSource] = useState<ImageSource>(defaultAppState.imageSource);
  const [disableImageCapture, setDisableImageCapture] = useState<boolean>(defaultAppState.disableImageCapture);
  const [fontSize, setFontSize] = useState<number>(defaultAppState.fontSize);
  let intervalId;

  const loadNewStream = () => 
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    }).then( (stream) => {
      setVideoStream(stream);
    }).catch( (err) => {
      console.error(err);
      setVideoStream(null);
    });

  // onLoad
  useEffect( () => {
    loadNewStream();
  }, []);

  // videoStream changed
  useEffect( () => {
    if (!videoStream) {
      setCapturer(null);
      return;
    }
    const track = videoStream.getVideoTracks()[0];
    if (track) {
      track.onmute = (event) => {
        // this is kinda dirty... but browsers sometimes disable tracks after a small idle timeout (less than 1 second !)
        videoStream.getTracks().forEach(t => t.stop());
        loadNewStream();
      };

      setRatio(track.getSettings()?.aspectRatio || 4/3);

      const [type, cpt] = getCapturer(videoStream, disableImageCapture);
      setImageSource( {...imageSource, type} );
      setCapturer(cpt);
    }
  }, [videoStream, disableImageCapture]);

  // fps loop
  useEffect( () => {
    if (capturer) {
      const draw = async () => {
        if (imageSource.type == 'capturer') {
          try {
            const value = await capturer.grabFrame();
            setImageSource({...imageSource, value}); 
          } catch (error) {
            // DO nothing !?
          }
        } else if (imageSource.type == 'video') {
          setImageSource({...imageSource, value: capturer}); 
        }
      }

      if (fps !== 'max') {
        clearInterval(intervalId);
        intervalId = setInterval( draw , 1000/fps);
      } else {
        const loop = () => {
          draw();
          intervalId = requestAnimationFrame(loop);
        }
        loop();
      }
    }
    return () => {
      clearInterval(intervalId);
      cancelAnimationFrame(intervalId);
    }

  }, [fps, capturer]);

  //ratio
  useEffect( () => {
    setHeight(width / ratio);
  }, [ratio, width]);

  const appStateValue = {
    ...defaultAppState,
    capturer,
    videoStream,
    pixels,
    setPixels,
    width,
    setWidth,
    height,
    ratio,
    fps,
    setFps,
    imageSource,
    disableImageCapture,
    setDisableImageCapture,
    fontSize,
    setFontSize,
  };

  return (
    <AppContext.Provider value={appStateValue}>
      {children}
    </AppContext.Provider>
  )
};

export const useAppContext = () => useContext(AppContext);