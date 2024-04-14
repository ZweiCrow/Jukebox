import React, { useEffect, useRef, useState } from 'react';
import "../Utils/Sass/player.scss"
import { Link } from 'react-router-dom';

const Player = () => {
  // States
  const [isTurning, setIsTurning] = useState(false) 
  const [song, setSong] = useState(0) 
  const [duration, setDuration] = useState(0) 
  const [currentTime, setCurrentTime] = useState(0) 

  // References
  const disc = useRef()
  const audio = useRef()
  const playIcon = useRef()
  const pauseIcon = useRef()
  const progressBar = useRef()
  const animationRef = useRef() // animation de la barre de progres

  const Album = [
    {nom: "Sun Killer", path: "./Albums/Eternal Blue/Sun Killer.mp3"},
    {nom: "Hurt You", path: "./Albums/Eternal Blue/Hurt You.mp3"},
    {nom: "Yellowjacket", path: "./Albums/Eternal Blue/Yellowjacket (feat. Sam Carter).mp3", ft: "Ft. Sam Carter"},
    {nom: "The Summit", path: "./Albums/Eternal Blue/The Summit.mp3"},
    {nom: "Secret Garden", path: "./Albums/Eternal Blue/Secret Garden.mp3"},
    {nom: "Silk In The Strings", path: "./Albums/Eternal Blue/Silk In The Strings.mp3"},
    {nom: "Holy Roller", path: "./Albums/Eternal Blue/Holy Roller.mp3"},
    {nom: "Eternal Blue", path: "./Albums/Eternal Blue/Eternal Blue.mp3"},
    {nom: "We Live In A Strange Wolrd", path: "./Albums/Eternal Blue/We Live In A Strange World.mp3"},
    {nom: "Halcyon", path: "./Albums/Eternal Blue/Halcyon.mp3"},
    {nom: "Circle With Me", path: "./Albums/Eternal Blue/Circle With Me.mp3"},
    {nom: "Constance", path: "./Albums/Eternal Blue/Constance.mp3"},
  ]
  const AlbumData = {
    name: "Eternal Blue",
    artist: "Spiritbox",
    jacket: "./Jackets/eternalBlue.jpg",
    disc: "./Discs/eternalBlue.jpg",
    spotify: "https://open.spotify.com/intl-fr/artist/4MzJMcHQBl9SIYSjwWn8QW",
  }

  // Functions to change the song
  const GoToPrevious = ()=> {
    if (song > 0) {
      PlayPause(false)
      setSong(song-1)
      setTimeout(()=>{
        PlayPause(true)
      },100)
    }
  }
  const GoToNext = ()=> {
    if (song < Album.length-1){
      PlayPause(false)
      setSong(song+1)
      setTimeout(()=>{
        PlayPause(true)
      },100)
    } else if (song === Album.length-1) {
      setSong(0)
      disc.current.style.animationPlayState = 'paused';
      setIsTurning(!isTurning)
    }
  }

  // Function to turn or stop the disc
  const TurningDisc = () => {
    if(isTurning === false){
      disc.current.style.animationPlayState = 'running';
      PlayPause(true)
      setIsTurning(!isTurning)
    }
    if(isTurning === true){
      disc.current.style.animationPlayState = 'paused';
      PlayPause(false)
      setIsTurning(!isTurning)
    }
  }

  // Function to play or pause the song
  const PlayPause = (x) => {
    if(x){
      // console.log("play!");
      audio.current.play()
      playIcon.current.classList.toggle("hide")
      pauseIcon.current.classList.toggle("hide")
      animationRef.current = requestAnimationFrame(WhilePlaying)
    }
    if(!x){
      // console.log("stop!");
      audio.current.pause()
      playIcon.current.classList.toggle("hide")
      pauseIcon.current.classList.toggle("hide")
      cancelAnimationFrame(animationRef.current)
    }
  }

  // Update and synchronise play time 
  const WhilePlaying = ()=>{
    progressBar.current.value = audio.current.currentTime
    setCurrentTime(progressBar.current.value)
    animationRef.current = requestAnimationFrame(WhilePlaying)
  }
  const ChangeRange = () => {
    audio.current.currentTime = progressBar.current.value
    setCurrentTime(progressBar.current.value)
  }

  // Function to display time
  const CalculateTime = (x) => {
      const minutes = Math.floor(x/60)
      const seconds = Math.floor(x%60)
      const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
      const time = `${minutes}:${returnedSeconds}`
      return time;
  }

  // What to do when a song end
  if (audio?.current) {
    audio.current.onended = ()=>{
      TurningDisc()
    }
  }
  
  const onLoadedMetaData = ()=>{
    const seconds = Math.floor(audio.current.duration)
    setDuration(audio.current.duration)
    progressBar.current.max = seconds
  }


  return (
    <div id="Player">
      <div id="Jacket">
        <div id="Naming">
          <audio onLoadedMetadata={onLoadedMetaData} ref={audio} src={Album[song].path} preload="metadata" ></audio>
          <h2>{AlbumData.name}</h2>
          <p>{AlbumData.artist}</p>
        </div>
        <div id="Links">
          <Link to={AlbumData.spotify} target="_blank" >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.85 13.35C19.05 10.5 11.025 10.2 6.45 11.625C5.7 11.85 4.95 11.4 4.725 10.725C4.5 9.975 4.95 9.225 5.625 9C10.95 7.425 19.725 7.725 25.275 11.025C25.95 11.4 26.175 12.3 25.8 12.975C25.425 13.5 24.525 13.725 23.85 13.35ZM23.7 17.55C23.325 18.075 22.65 18.3 22.125 17.925C18.075 15.45 11.925 14.7 7.2 16.2C6.6 16.35 5.925 16.05 5.775 15.45C5.625 14.85 5.925 14.175 6.525 14.025C12 12.375 18.75 13.2 23.4 16.05C23.85 16.275 24.075 17.025 23.7 17.55ZM21.9 21.675C21.6 22.125 21.075 22.275 20.625 21.975C17.1 19.8 12.675 19.35 7.425 20.55C6.9 20.7 6.45 20.325 6.3 19.875C6.15 19.35 6.525 18.9 6.975 18.75C12.675 17.475 17.625 18 21.525 20.4C22.05 20.625 22.125 21.225 21.9 21.675ZM15 0C13.0302 0 11.0796 0.387987 9.25975 1.14181C7.43986 1.89563 5.78628 3.00052 4.3934 4.3934C1.58035 7.20644 0 11.0218 0 15C0 18.9782 1.58035 22.7936 4.3934 25.6066C5.78628 26.9995 7.43986 28.1044 9.25975 28.8582C11.0796 29.612 13.0302 30 15 30C18.9782 30 22.7936 28.4196 25.6066 25.6066C28.4196 22.7936 30 18.9782 30 15C30 13.0302 29.612 11.0796 28.8582 9.25975C28.1044 7.43986 26.9995 5.78628 25.6066 4.3934C24.2137 3.00052 22.5601 1.89563 20.7403 1.14181C18.9204 0.387987 16.9698 0 15 0Z"
                fill="#303030"
              />
            </svg>
            <p>Listen on Spotify</p>
          </Link>
          <Link to={"/"}>
            <svg
              width="32"
              height="34"
              viewBox="0 0 32 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="about"
                d="M21.7896 9.94363C19.5179 8.10496 16.6839 7.10178 13.7614 7.10177C6.71363 7.10177 1 12.8154 1 19.8632C1.00008 23.0026 2.15731 26.0318 4.2504 28.3717C5.84646 30.1556 7.91202 31.4546 10.2112 32.1205C12.5104 32.7864 14.9505 32.7923 17.2529 32.1375C19.3039 31.5539 21.1759 30.4658 22.6981 28.9724C24.2202 27.479 25.3438 25.628 25.9663 23.5884C26.5888 21.5489 26.6903 19.3859 26.2615 17.2971C25.8327 15.2083 24.8874 13.2602 23.5118 11.6308M24.3229 4.56248L25.4853 5.47615M23.4545 5.3035L24.6169 6.21802M25.9733 3.02147L27.1357 3.93513M25.1049 3.76334L26.2673 4.67615M27.7391 1.51977L28.9023 2.43258M26.8716 2.26164L28.034 3.17446M4.24954 28.3683C5.57859 27.4794 6.78542 26.3768 6.88542 23.5777C6.97089 21.1829 8.53071 18.6444 10.5298 18.5265C11.1409 18.4906 11.7982 18.8914 10.9888 20.6333C10.029 22.6965 12.4948 24.7016 13.823 22.5905L23.6562 6.9693C23.4297 6.49665 22.9366 6.09067 23.8041 5.36504L28.7493 1.24028C29.2391 0.830032 30.4288 0.93174 30.7955 1.64883C31.3878 2.80437 30.6698 4.15992 28.9502 4.05052L27.934 6.62058C27.787 6.99323 27.6186 7.28724 27.163 7.23767C26.2972 7.14707 25.7724 7.63425 25.3972 8.29236L15.0794 26.4161C15.4392 28.1101 17.0161 28.5614 18.9631 26.9896C20.3272 25.8888 20.8075 26.9597 20.5494 28.4811C20.2674 30.1486 19.0409 30.7289 17.6956 31.6947C17.5127 31.8229 17.3494 31.9759 17.2084 32.1494"
                stroke="#303030"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>About Spiritbox</p>
          </Link>
          <Link to={"/"}>
            <svg
              width="30"
              height="35"
              viewBox="0 0 30 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 8.07824V9.77892C29.9978 10.5705 29.8115 11.3507 29.4558 12.0578C29.1106 12.7711 28.604 13.3941 27.9762 13.8776C27.3493 14.3561 26.6227 14.6874 25.8503 14.8469C25.0731 14.9953 24.2734 14.9779 23.5034 14.7959L16.2925 12.7551V26.7347C16.297 28.6103 15.6541 30.43 14.4723 31.8866C13.2906 33.3431 11.6424 34.3473 9.80616 34.7294C7.96988 35.1116 6.05796 34.8484 4.39324 33.9843C2.72851 33.1202 1.41297 31.7081 0.668738 29.9864C-0.0754962 28.2648 -0.202826 26.339 0.308248 24.5344C0.819322 22.7297 1.93749 21.1567 3.47395 20.0809C5.01041 19.0052 6.87102 18.4925 8.74164 18.6296C10.6123 18.7667 12.3783 19.5451 13.7415 20.8333V1.22449C13.7236 1.11181 13.7236 0.99703 13.7415 0.884354V0.7483C13.8238 0.559393 13.9501 0.392912 14.1099 0.262743C14.2696 0.132573 14.4582 0.0424873 14.6599 0H15.4082L26.1224 3.04422C27.2153 3.33841 28.1793 3.98763 28.8628 4.88971C29.5463 5.79178 29.9105 6.89552 29.898 8.02722L30 8.07824Z"
                fill="#303030"
              />
            </svg>
            <p>Tracklist</p>
          </Link>
        </div>
        <div className="filter"></div>
        <img id="Pic" src={AlbumData.jacket} alt="Jacket" />
        <div id="disc" ref={disc}>
          <img id="vinyl" src="./Photos/Disc.png" alt="" />
          <img id="Dcenter" src={AlbumData.disc} alt="" />
        </div>
        <div id="play" onClick={TurningDisc}>
          <svg
            id="playButton"
            ref={playIcon}
            width="30"
            height="32"
            viewBox="0 0 30 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.4888 11.6109C28.2472 12.0142 28.8815 12.6162 29.3239 13.3525C29.7663 14.0888 30 14.9315 30 15.7905C30 16.6494 29.7663 17.4922 29.3239 18.2285C28.8815 18.9648 28.2472 19.5668 27.4888 19.9701L7.25866 30.971C4.00118 32.7442 0 30.4389 0 26.7929V4.78959C0 1.1421 4.00118 -1.16166 7.25866 0.6084L27.4888 11.6109Z"
              fill="#303030"
            />
          </svg>
          <svg
            id="pauseButton"
            className="hide"
            ref={pauseIcon}
            width="24"
            height="30"
            viewBox="0 0 24 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 0H3C2.20435 0 1.44129 0.31607 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V27C0 27.7956 0.316071 28.5587 0.87868 29.1213C1.44129 29.6839 2.20435 30 3 30H6C6.79565 30 7.55871 29.6839 8.12132 29.1213C8.68393 28.5587 9 27.7956 9 27V3C9 2.20435 8.68393 1.44129 8.12132 0.87868C7.55871 0.31607 6.79565 0 6 0ZM21 0H18C17.2044 0 16.4413 0.31607 15.8787 0.87868C15.3161 1.44129 15 2.20435 15 3V27C15 27.7956 15.3161 28.5587 15.8787 29.1213C16.4413 29.6839 17.2044 30 18 30H21C21.7956 30 22.5587 29.6839 23.1213 29.1213C23.6839 28.5587 24 27.7956 24 27V3C24 2.20435 23.6839 1.44129 23.1213 0.87868C22.5587 0.31607 21.7956 0 21 0Z"
              fill="#303030"
            />
          </svg>
        </div>
        <div id="card">
          <div id="song">
            <p>{Album[song].nom}</p>
          </div>
          <div id="ft">
            <p>{Album[song].ft}</p>
          </div>
          <div id="progressbar">
            <p>{CalculateTime(currentTime)}</p>
            <input
              ref={progressBar}
              onChange={ChangeRange}
              type="range"
              defaultValue={0}
            />
            <p>{duration && !isNaN(duration) && CalculateTime(duration)}</p>
          </div>
        </div>
        <div id="navigation">
          <div id="prev" onClick={()=>{GoToPrevious()}}>
            <svg
              width="36"
              height="31"
              viewBox="0 0 36 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5182 0.77467C16.7179 0.973688 16.8763 1.21017 16.9845 1.47056C17.0926 1.73095 17.1482 2.01013 17.1482 2.29207C17.1482 2.57402 17.0926 2.85319 16.9845 3.11358C16.8763 3.37397 16.7179 3.61045 16.5182 3.80947L7.32628 13.0014L33.5684 13.0014C34.1366 13.0014 34.6815 13.2271 35.0832 13.6288C35.4849 14.0306 35.7106 14.5754 35.7106 15.1436C35.7106 15.7117 35.4849 16.2566 35.0832 16.6584C34.6815 17.0601 34.1366 17.2858 33.5684 17.2858L7.32628 17.2858L16.5182 26.4813C16.9206 26.8837 17.1467 27.4295 17.1467 27.9987C17.1467 28.5678 16.9206 29.1136 16.5182 29.5161C16.1157 29.9185 15.5699 30.1446 15.0008 30.1446C14.4316 30.1446 13.8858 29.9185 13.4834 29.5161L0.630073 16.6628C0.430361 16.4637 0.271901 16.2273 0.163779 15.9669C0.0556569 15.7065 0 15.4273 0 15.1454C0 14.8634 0.0556569 14.5842 0.163779 14.3239C0.271901 14.0635 0.430361 13.827 0.630073 13.628L13.4834 0.77467C13.6824 0.574957 13.9189 0.416496 14.1793 0.308374C14.4397 0.200253 14.7188 0.144592 15.0008 0.144592C15.2827 0.144592 15.5619 0.200253 15.8223 0.308374C16.0827 0.416496 16.3192 0.574957 16.5182 0.77467Z"
                fill="#303030"
              />
            </svg>
          </div>
          <div id="next" onClick={()=>{GoToNext()}}>
            <svg
              width="36"
              height="30"
              viewBox="0 0 36 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.4818 29.3699C19.2821 29.1709 19.1237 28.9344 19.0155 28.674C18.9074 28.4136 18.8518 28.1345 18.8518 27.8525C18.8518 27.5706 18.9074 27.2914 19.0155 27.031C19.1237 26.7706 19.2821 26.5341 19.4818 26.3351L28.6737 17.1432L2.43158 17.1432C1.86342 17.1432 1.31854 16.9175 0.916801 16.5158C0.515057 16.114 0.28936 15.5692 0.28936 15.001C0.28936 14.4329 0.515057 13.888 0.916801 13.4862C1.31854 13.0845 1.86342 12.8588 2.43158 12.8588L28.6737 12.8588L19.4818 3.66333C19.0794 3.26089 18.8533 2.71507 18.8533 2.14593C18.8533 1.5768 19.0794 1.03097 19.4818 0.628529C19.8843 0.226089 20.4301 5.99683e-09 20.9992 0C21.5684 -5.99683e-09 22.1142 0.226089 22.5166 0.628529L35.3699 13.4818C35.5696 13.6808 35.7281 13.9173 35.8362 14.1777C35.9443 14.4381 36 14.7173 36 14.9992C36 15.2812 35.9443 15.5603 35.8362 15.8207C35.7281 16.0811 35.5696 16.3176 35.3699 16.5166L22.5166 29.3699C22.3176 29.5696 22.0811 29.7281 21.8207 29.8362C21.5603 29.9443 21.2812 30 20.9992 30C20.7173 30 20.4381 29.9443 20.1777 29.8362C19.9173 29.7281 19.6808 29.5696 19.4818 29.3699Z"
                fill="#303030"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;