import React, { useEffect, useRef, useState } from 'react';
import "../Utils/Sass/about.scss";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../Urls';

const About = () => {
  //  States
  const [albumsList, setAlbumsList] = useState([])
  const [artist, setArtist] = useState({})
  const [isLoaded,setIsLoaded] = useState(false)

  //  Refs
  const fadin = useRef()
  
  //  Variables
  const [queryParameters] = useSearchParams()
  const ArtistName = queryParameters.get("name")
  const navigate = useNavigate();
  
  const Artistzc = {
    "name": "Currents",
    "photoPath": "/Artists/Currents.jpg",
    "spotifyLink": "aaaaa",
  }
  const Artistz = {
    "name": "Nick Johnston",
    "photoPath": "/Artists/NickJohnston.jpg",
    "spotifyLink": "https://open.spotify.com/intl-fr/artist/3d5yBCe5SBKkJnWvl9GB7r"
  }

  //  Functions

  // Fonctions for navigation within the website
  const GoHome = () => {
    navigate('/');
  }
  const GoBack = () => {
    navigate(-1);
  }

  useEffect(()=>{
    const getDisco = async ()=>{
      try {
        const {data} = await axios.get(URL.albumsBy+ArtistName)
        setAlbumsList(data)
        setIsLoaded(true)
      } catch (error) {
        console.error(error.message);
      }
    };
    const getArtist = async ()=>{
      try {
        const {data} = await axios.get(URL.artist+ArtistName)
        setArtist(data)
        getDisco()
      } catch (error) {
        console.error(error.message);
      }
    };
    getArtist()
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
    <div id='SiteNav'>
      <div id='HomeButton' onClick={GoHome}>
        <svg width="30" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 33.8314V11.3314L15 0L30 11.3314V33.8314H18.8743V20.1493H11.1257V33.8314H0Z" fill="#303030"/>
        </svg>
      </div>
      <div id='BackButton' onClick={GoBack}>
      <svg width="36" height="31" viewBox="0 0 36 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5182 0.77467C16.7179 0.973688 16.8763 1.21017 16.9845 1.47056C17.0926 1.73095 17.1482 2.01013 17.1482 2.29207C17.1482 2.57402 17.0926 2.85319 16.9845 3.11358C16.8763 3.37397 16.7179 3.61045 16.5182 3.80947L7.32628 13.0014L33.5684 13.0014C34.1366 13.0014 34.6815 13.2271 35.0832 13.6288C35.4849 14.0306 35.7106 14.5754 35.7106 15.1436C35.7106 15.7117 35.4849 16.2566 35.0832 16.6584C34.6815 17.0601 34.1366 17.2858 33.5684 17.2858L7.32628 17.2858L16.5182 26.4813C16.9206 26.8837 17.1467 27.4295 17.1467 27.9987C17.1467 28.5678 16.9206 29.1136 16.5182 29.5161C16.1157 29.9185 15.5699 30.1446 15.0008 30.1446C14.4316 30.1446 13.8858 29.9185 13.4834 29.5161L0.630073 16.6628C0.430361 16.4637 0.271901 16.2273 0.163779 15.9669C0.0556569 15.7065 0 15.4273 0 15.1454C0 14.8634 0.0556569 14.5842 0.163779 14.3239C0.271901 14.0635 0.430361 13.827 0.630073 13.628L13.4834 0.77467C13.6824 0.574957 13.9189 0.416496 14.1793 0.308374C14.4397 0.200253 14.7188 0.144592 15.0008 0.144592C15.2827 0.144592 15.5619 0.200253 15.8223 0.308374C16.0827 0.416496 16.3192 0.574957 16.5182 0.77467Z" fill="#303030"/>
      </svg>
      </div>
    </div>
    <div id='Loaded' ref={fadin} className='fading'></div>
    <div id='AboutPage'>
      <div id='AboutUp'>
        <h1>{artist.name}
          <Link to={artist.spotifyLink} target="_blank">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.85 13.35C19.05 10.5 11.025 10.2 6.45 11.625C5.7 11.85 4.95 11.4 4.725 10.725C4.5 9.975 4.95 9.225 5.625 9C10.95 7.425 19.725 7.725 25.275 11.025C25.95 11.4 26.175 12.3 25.8 12.975C25.425 13.5 24.525 13.725 23.85 13.35ZM23.7 17.55C23.325 18.075 22.65 18.3 22.125 17.925C18.075 15.45 11.925 14.7 7.2 16.2C6.6 16.35 5.925 16.05 5.775 15.45C5.625 14.85 5.925 14.175 6.525 14.025C12 12.375 18.75 13.2 23.4 16.05C23.85 16.275 24.075 17.025 23.7 17.55ZM21.9 21.675C21.6 22.125 21.075 22.275 20.625 21.975C17.1 19.8 12.675 19.35 7.425 20.55C6.9 20.7 6.45 20.325 6.3 19.875C6.15 19.35 6.525 18.9 6.975 18.75C12.675 17.475 17.625 18 21.525 20.4C22.05 20.625 22.125 21.225 21.9 21.675ZM15 0C13.0302 0 11.0796 0.387987 9.25975 1.14181C7.43986 1.89563 5.78628 3.00052 4.3934 4.3934C1.58035 7.20644 0 11.0218 0 15C0 18.9782 1.58035 22.7936 4.3934 25.6066C5.78628 26.9995 7.43986 28.1044 9.25975 28.8582C11.0796 29.612 13.0302 30 15 30C18.9782 30 22.7936 28.4196 25.6066 25.6066C28.4196 22.7936 30 18.9782 30 15C30 13.0302 29.612 11.0796 28.8582 9.25975C28.1044 7.43986 26.9995 5.78628 25.6066 4.3934C24.2137 3.00052 22.5601 1.89563 20.7403 1.14181C18.9204 0.387987 16.9698 0 15 0Z" fill="#303030"/>
            </svg>
          </Link>
        </h1>
        <div className='filter'></div>
        <img src={artist.photoPath} alt="" />
      </div>

      <div id='AboutDown'>
        <h2>Discography</h2>
        <ul>
          {albumsList.map((album)=>{
            return(
              <Link to={`/Play?name=${album.name}`} key={album._id}>
                <img src={album.jacketPath} alt="jacket" />
                <p>{album.name}</p>
              </Link>
            )
          })}
        </ul>
      </div>
    </div>
  </>);
};

export default About;