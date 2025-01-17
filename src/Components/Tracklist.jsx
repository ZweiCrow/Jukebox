import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../Urls';
import "../Utils/Sass/tracklist.scss"

const Tracklist = () => {
  const [queryParameters] = useSearchParams()
  const AlbumName = queryParameters.get("name")
  const navigate = useNavigate();
  let counter = 0;

  // States
  const [AlbumData, setAlbumData] = useState({})
  const [isLoaded,setIsLoaded] = useState(false) 

  // Refs
  const fadin = useRef()

  // Functions
  const GoHome = () => {
    navigate('/');
  }
  const GoBack = () => {
    navigate(-1);
  }

  useEffect(()=>{
    const fetchList = async ()=>{
      try {
        const {data} = await axios.get(`${URL.album}${AlbumName}`)
        setAlbumData(data)
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
    <div id='Tracklist'>
      <div id='TrackTop'>
        <img src={AlbumData.jacketPath} alt="Album Jacket" />
        <div id='trackF1'></div>
        <div id='trackF2'></div>
        <h1>{AlbumData.name}</h1>
        <p>by <Link to={`/`}>{AlbumData.artist}</Link></p>
      </div>
      <div id='TrackBottom'>
        <div id='tableHeader'>
          <div className='TrackOrder'><p>#</p></div>
          <div className='TrackTitle'><p>Title</p></div>
        </div>
        <ul>
          {AlbumData.tracklist.map((song)=>{
            counter++;
            return(
              <Link to={`/Play?name=${AlbumName}&index=${counter-1}`} key={song.nom}>
                <div className='TrackOrder TrackOrderBorder'><p>{counter}</p></div>
                <div className='TrackTitle'><p>{song.nom}</p></div>
              </Link>
            )
          })}
        </ul>
      </div>
    </div>
  </>);
};

export default Tracklist;