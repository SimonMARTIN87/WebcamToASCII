import { useEffect, useRef } from 'react';
import { useAppContext } from '../context';

export const VideoCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const {imageSource, setPixels, width, height} = useAppContext();

  useEffect( () => {
    if (canvasRef.current && imageSource.value) {
      canvasRef.current.style.filter = 'grayscale(1)';

      const ctx = canvasRef.current.getContext('2d');
      ctx.drawImage(imageSource.value, 0, 0, width, height);

      // get computable pixel array and push it in the context !
      const imageData = ctx.getImageData(0, 0, width, height);
      setPixels(imageData.data);

    }

  }, [imageSource]);

  return (
    <canvas ref={canvasRef} width={width} height={height} style={{display: 'none'}}>

    </canvas>
  )
}