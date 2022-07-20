import * as React from "react";
import { AppContextProvider } from "../context";
import "./../assets/scss/App.scss";
import { AsciiPane } from "./AsciiPane";
import { Menu } from "./Menu";
import { VideoCanvas } from "./VideoCanvas";

const App = () => (
  <AppContextProvider>
    <Menu />
    <VideoCanvas />
    <AsciiPane />
  </AppContextProvider>
);

export default App;
