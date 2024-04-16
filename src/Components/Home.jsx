import React, { useEffect, useRef, useState } from 'react';
import "../Utils/Sass/home.scss"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../Urls';

const Home = () => {
  const [albumsList,setAlbumsList] = useState([])
  const [isLoaded,setIsLoaded] = useState(false)
  const fadin = useRef()
  let counter = 0;

  useEffect(()=>{
    const fetchList = async ()=>{
      try {
        const {data} = await axios.get(URL.albumsList)
        setAlbumsList(data)
        setIsLoaded(true)
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchList();
  },[])

  if (!isLoaded) {
    return  <div id='Loading'><p>Loading...</p></div>;
  }
  if (isLoaded) {
    setTimeout(()=>{
      fadin.current.classList.add("hide")
    },100)
    setTimeout(()=>{
      fadin.current.classList.add("fadeOut")
    },2000)
  }

  return (<>
    <div id='Loaded' ref={fadin} className='fading'></div>
    <div id="Home">
      <div>
        <h2>Albums</h2>
        <ul>
          {albumsList.map((album)=>{
            counter++;
            if (counter <= 4) {
              return(
                <Link to={`/Play?name=${album.name}`} key={album._id}>
                  <img src={album.jacketPath} alt="" />
                  <p>{album.name}</p>
                </Link>
              )
            }else{
              return(<></>)
            }
          })}
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
  </>);
};

export default Home;