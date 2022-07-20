import isMobile from 'is-mobile';
import * as React from 'react';
import { useAppContext } from '../context';
import { Burger } from './Burger';

export const Menu = () => {
  const {
    fps,
    setFps,
    width,
    setWidth,
    disableImageCapture,
    setDisableImageCapture,
    imageSource,
    fontSize,
    setFontSize,
  } = useAppContext();

  const [open, setOpen] = React.useState<boolean>(!isMobile());

  const handleFpsChanged = (event) => {
    setFps(event.target.value);
  }

  const handleWidthChanged = (event) => {
    setWidth(event.target.value);
  }

  const handleDisableImageCaptureChanged = (event) => {
    setDisableImageCapture(event.target.value > 0);
  }

  const handleFontChanged = (event) => {
    setFontSize(event.target.value);
  }

  const toogleOpen = () => {
    setOpen(!open);
  }

  const makeInput = (name, value, rootValue, hook) => (
    <div className="input-group">
        <input type="radio" name={name} id={`${name}_${value}`} value={value} onChange={hook} checked={rootValue==value}/>
        <label htmlFor={`${name}_${value}`}>{value}</label>
    </div>
  );


  return (<>
    <Burger open={open} onClick={toogleOpen} />
    <div className={"menu "+ (open ? '' :'hidden')}>
      <fieldset className={open ? '' : 'hidden'}>
        <legend>FPS</legend>
        {makeInput('fps',1, fps, handleFpsChanged)}
        {makeInput('fps',5, fps, handleFpsChanged)}
        {makeInput('fps',10, fps, handleFpsChanged)}
        {makeInput('fps',15, fps, handleFpsChanged)}
        {makeInput('fps','max', fps, handleFpsChanged)}
      </fieldset>
      <fieldset className={open ? '' : 'hidden'}>
        <legend>Width</legend>
        {makeInput('width',100, width, handleWidthChanged)}
        {makeInput('width',150, width, handleWidthChanged)}
        {makeInput('width',200, width, handleWidthChanged)}
      </fieldset>
      <fieldset className={open ? '' : 'hidden'}>
        <legend>Font</legend>
        {makeInput('font',5, fontSize, handleFontChanged)}
        {makeInput('font',10, fontSize, handleFontChanged)}
        {makeInput('font',15, fontSize, handleFontChanged)}
        {makeInput('font',20, fontSize, handleFontChanged)}
      </fieldset>
      <fieldset className={open ? '' : 'hidden'}>
        <legend>disable ImageCapture</legend>
        <div className="input-group">
          <input type="radio" name="disableImageCapture" id="disableImageCapture_true" value="1" onChange={handleDisableImageCaptureChanged} checked={disableImageCapture}/>
          <label htmlFor="disableImageCapture_true">True</label>
        </div>
        <div className="input-group">
          <input type="radio" name="disableImageCapture" id="disableImageCapture_false" value="0" onChange={handleDisableImageCaptureChanged} checked={!disableImageCapture}/>
          <label htmlFor="disableImageCapture_false">False</label>
        </div>
        <div>Capturer Type: {imageSource.type}</div>
      </fieldset>
    </div>
    </>)
};