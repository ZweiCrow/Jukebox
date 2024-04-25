import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Player from "./Components/Player";
import Albums from "./Components/Albums";
import Tracklist from "./Components/Tracklist";
import About from "./Components/About";
import Artists from "./Components/Artists";

function App() {
  return (
    <Routes>
      <Route index element={Home}/>
      <Route path="/" Component={Home}/>
      <Route path="/Albums" Component={Albums}/>
      <Route path="/Artists" Component={Artists}/>
      <Route path="/SoundTracks" Component={Home}/>
      <Route path="/Play" Component={Player}/>
      <Route path="/About" Component={About}/>
      <Route path="/Tracklist" Component={Tracklist}/>
    </Routes>
  );
}

export default App;
