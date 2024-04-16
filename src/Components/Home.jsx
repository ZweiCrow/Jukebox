import React from 'react';
import "../Utils/Sass/home.scss"
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div id="Home">
      <div>
        <h2>Albums</h2>
        <ul>
          <Link to={"/Play"}>
            <img src="./Jackets/EternalBlue.jpg" alt="" />
            <p>Eternal Blue</p>
          </Link>
          <Link to={"/"}>
            <img src="./Jackets/HolyHell.jpg" alt="" />
            <p>Holy Hell</p>
          </Link>
          <Link to={"/"}>
            <img src="./Jackets/TheWayItEnds.jpg" alt="" />
            <p>The Way It Ends</p>
          </Link>
          <Link to={"/"}>
            <img src="./Jackets/Renaissance.jpg" alt="" />
            <p>Renaissance</p>
          </Link>
          <Link to={"/Albums"} id='More'>
            <p>More</p>
          </Link>
        </ul>
      </div>
      <div>
        <h2>Artists</h2>
        <ul>
          <Link to={"/"}>
            <img src="./Artists/Spiritbox.jpg" alt="" />
            <p>Spiritbox</p>
          </Link>
          <Link to={"/"}>
            <img src="./Artists/Architects.jpg" alt="" />
            <p>Architects</p>
          </Link>
          <Link to={"/"}>
            <img src="./Artists/Currents.jpg" alt="" />
            <p>Currents</p>
          </Link>
          <Link to={"/"}>
            <img src="./Artists/Polyphia.jpg" alt="" />
            <p>Polyphia</p>
          </Link>
          <Link to={"/Artists"} id='More'>
            <p>More</p>
          </Link>
        </ul>
      </div>
      <div>
        <h2>Soundtracks</h2>
        <ul></ul>
      </div>
    </div>
  );
};

export default Home;