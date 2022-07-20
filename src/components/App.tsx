import * as React from "react";
import { AppContextProvider } from "../context";
import "./../assets/scss/App.scss";
import { AsciiPane } from "./AsciiPane";
import { CopyBtn } from "./CopyBtn";
import { Menu } from "./Menu";
import { PauseBtn } from "./PauseBtn";
import { VideoCanvas } from "./VideoCanvas";

const App = () => (
  <AppContextProvider>
    <Menu />
    <VideoCanvas />
    <AsciiPane />
    <PauseBtn />
    <CopyBtn />
  </AppContextProvider>
);

export default App;
