import React, { useEffect, useRef, useState } from 'react';
import "../Utils/Sass/albums.scss"
import axios from 'axios';
import { URL } from '../Urls';
import { Link, useNavigate } from 'react-router-dom';

const Albums = () => {
  const navigate = useNavigate();

  // States
  const [Search, setSearch] = useState("")
  const [albumsList,setAlbumsList] = useState([])
  const [isLoaded,setIsLoaded] = useState(false)
  const [pageMin,setPageMin] = useState(1)
  const [pageMax,setPageMax] = useState(8)

  // Refs
  const fadin = useRef()

  let counter = 0;

  // Functions
  const Previous = () => {
    console.log("previous");
    setPageMax(pageMax-8)
    setPageMin(pageMin-8)
  }
  const Next = () => {
    console.log("next");
    setPageMax(pageMax+8)
    setPageMin(pageMin+8)
  }

  // Fonctions for navigation within the website
  const GoHome = () => {
    navigate('/');
  }
  const GoBack = () => {
    navigate(-1);
  }

  useEffect(()=>{
    const getData = async ()=>{
      try {
        const {data} = await axios.get(URL.albumsList)
        setAlbumsList(data)
        setIsLoaded(true)
      } catch (error) {
        console.error(error.message);
      }
    };
    getData();
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
    <div id="AlbumsPage">
      <h1>Albums</h1>
      <div id="Searchbar">
        <div className="pagesNav" onClick={Previous}>
          <svg
            width="36"
            height="31"
            viewBox="0 0 36 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.5182 0.77467C16.7179 0.973688 16.8763 1.21017 16.9845 1.47056C17.0926 1.73095 17.1482 2.01013 17.1482 2.29207C17.1482 2.57402 17.0926 2.85319 16.9845 3.11358C16.8763 3.37397 16.7179 3.61045 16.5182 3.80947L7.32628 13.0014L33.5684 13.0014C34.1366 13.0014 34.6815 13.2271 35.0832 13.6288C35.4849 14.0306 35.7106 14.5754 35.7106 15.1436C35.7106 15.7117 35.4849 16.2566 35.0832 16.6584C34.6815 17.0601 34.1366 17.2858 33.5684 17.2858L7.32628 17.2858L16.5182 26.4813C16.9206 26.8837 17.1467 27.4295 17.1467 27.9987C17.1467 28.5678 16.9206 29.1136 16.5182 29.5161C16.1157 29.9185 15.5699 30.1446 15.0008 30.1446C14.4316 30.1446 13.8858 29.9185 13.4834 29.5161L0.630073 16.6628C0.430361 16.4637 0.271901 16.2273 0.163779 15.9669C0.0556569 15.7065 0 15.4273 0 15.1454C0 14.8634 0.0556569 14.5842 0.163779 14.3239C0.271901 14.0635 0.430361 13.827 0.630073 13.628L13.4834 0.77467C13.6824 0.574957 13.9189 0.416496 14.1793 0.308374C14.4397 0.200253 14.7188 0.144592 15.0008 0.144592C15.2827 0.144592 15.5619 0.200253 15.8223 0.308374C16.0827 0.416496 16.3192 0.574957 16.5182 0.77467Z"
              fill="#5A5A5A"
            />
          </svg>
        </div>
        <input type="text" name="" id="" value={Search} onChange={(e)=>{setSearch(e.target.value)}}/>
        <div className="pagesNav" onClick={Next}>
          <svg
            width="36"
            height="30"
            viewBox="0 0 36 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.4818 29.3699C19.2821 29.1709 19.1237 28.9344 19.0155 28.674C18.9074 28.4136 18.8518 28.1345 18.8518 27.8525C18.8518 27.5706 18.9074 27.2914 19.0155 27.031C19.1237 26.7706 19.2821 26.5341 19.4818 26.3351L28.6737 17.1432L2.43158 17.1432C1.86342 17.1432 1.31854 16.9175 0.916801 16.5158C0.515057 16.114 0.28936 15.5692 0.28936 15.001C0.28936 14.4329 0.515057 13.888 0.916801 13.4862C1.31854 13.0845 1.86342 12.8588 2.43158 12.8588L28.6737 12.8588L19.4818 3.66333C19.0794 3.26089 18.8533 2.71507 18.8533 2.14593C18.8533 1.5768 19.0794 1.03097 19.4818 0.628529C19.8843 0.226089 20.4301 5.99683e-09 20.9992 0C21.5684 -5.99683e-09 22.1142 0.226089 22.5166 0.628529L35.3699 13.4818C35.5696 13.6808 35.7281 13.9173 35.8362 14.1777C35.9443 14.4381 36 14.7173 36 14.9992C36 15.2812 35.9443 15.5603 35.8362 15.8207C35.7281 16.0811 35.5696 16.3176 35.3699 16.5166L22.5166 29.3699C22.3176 29.5696 22.0811 29.7281 21.8207 29.8362C21.5603 29.9443 21.2812 30 20.9992 30C20.7173 30 20.4381 29.9443 20.1777 29.8362C19.9173 29.7281 19.6808 29.5696 19.4818 29.3699Z"
              fill="#5A5A5A"
            />
          </svg>
        </div>
      </div>
      <div id="AlbumsPanel">
        <ul>
          {albumsList.map((album)=>{
            counter++
            if(album.name.toLowerCase().includes(Search.toLowerCase()) && counter <= pageMax && counter >= pageMin){
              return(
                <Link to={`/Play?name=${album.name}`} key={album._id}>
                  <img src={album.jacketPath} alt="" />
                  <p>{album.name}</p>
                </Link>
              )
            } else {
              return(<></>)
            }
          })}
        </ul>
      </div>
    </div>
  </>);
};

export default Albums;