import { useEffect, useState } from 'react';
import { useAppContext } from '../context';

const getCharFromByte = (byte: number) => {
  if (byte < 64) {
    return '@';
  }
  if (byte < 125) {
    return '+';
  }
  if (byte < 190) {
    return '-';
  }
  return '\u00A0';
}

export const AsciiPane = () => {
  const {pixels, width, height, ratio, fontSize} = useAppContext();
  const [lines, setLines] = useState<Array<any>>(null);
  const lineH = fontSize / ratio;

  useEffect( () => {
    if (pixels) {
      let lines = [];
      for (let y = 0; y < height; y++) {
        let line = [];
        for (let x = 0; x < width; x++) {
          const index = (y*width + x)*4;
          line.push(getCharFromByte( pixels[index] ));
        }
        lines.push(line);
      }
      setLines(lines);
    }
  }, [pixels]);

  const makeP = (line, index) => (
    <p key={index} style={{fontSize: `${fontSize}px`, lineHeight: `${lineH}px`}}>{line}</p>
  )
  
  return (<>
    <div className='ascii'>
      {lines && lines.map(makeP)}
    </div>
  </>);
}