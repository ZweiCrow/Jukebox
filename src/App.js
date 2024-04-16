import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Player from "./Components/Player";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Home}/>
      <Route path="/Albums" Component={Home}/>
      <Route path="/Artists" Component={Home}/>
      <Route path="/SoundTracks" Component={Home}/>
      <Route path="/Play" Component={Player}/>
    </Routes>
  );
}

export default App;
