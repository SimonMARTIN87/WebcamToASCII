import { ReactEventHandler, useState } from "react"
import { FPSValue, useAppContext } from "../context"

export interface PauseBtnProps {
}

export const PauseBtn = (props: PauseBtnProps) => {
  const {fps, setFps} = useAppContext();
  const [oldFPS, setOldFPS] = useState<FPSValue>(0); //?

  const handleClick = () => {
    const actual = oldFPS;
    setOldFPS(fps);
    setFps(actual);
  }

  return (
    <button className="btn-pause" onClick={handleClick}>
      {fps==0 ? 'Play' : 'Pause'}
    </button>
  )
}