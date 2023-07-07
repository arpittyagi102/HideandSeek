import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import titleImage from '../../media/title.webp';
import playImage from '../../media/play.webp';
import leftImage from '../../media/left.webp';
import rightImage from '../../media/right.webp';
import easyImage from '../../media/easy.webp';
import normalImage from '../../media/normal.webp';
import hardImage from '../../media/hard.webp';
import cheeseImage from '../../media/cheese.webp';
import ringsImage from '../../media/rings.webp';
import bankImage from '../../media/bank.webp';
import bankbg from '../../media/piggybankbg.png'
import ringsbg from '../../media/ringsbg.png';
import cheesebg from '../../media/tngbg2.png';

const Home = () => {
  const [phla, setPhla] = useState(1);
  const [dusra, setDusra] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    preloadImages(['media/earthfromspace.webp','media/tngbg2.png']);
  }, []);

  

  const preloadImages = (imageUrls) => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  };

  const loadit = () => {
    const diffElement = document.getElementById('diff');
    const themeElement = document.getElementById('theme');
    const menubtnimagesarr = document.getElementsByClassName('menubtnimages');
    
    // Hide the difficulty and theme buttons
    diffElement.style.display = 'none';
    themeElement.style.display = 'none';
    
    // Hide all the arrow buttons
    for (let a = 0; a < menubtnimagesarr.length; a++) {
      menubtnimagesarr[a].style.display = 'none';
    }
  
    const playElement = document.getElementById('play');
  
    const selectedTheme = dusra; // Get the selected theme
    
  
    // Store the selected theme in localStorage
    localStorage.setItem('selectedTheme', selectedTheme);
  
    // Animate the play element
    playElement.animate(
      {
        top: '0px',
        left: '0px',
        height: '100%',
        width: '100%',
        borderRadius: '0px',
        margin: '0px',
      },
      1000
    );
  
  
    console.log('phla =', phla);
    console.log('dusra =', dusra);
  };
  const handleL1Click = () => {
    if (phla === 1) {
      setPhla(3);
    } else if (phla === 2 || phla === 3) {
      setPhla(phla - 1);
    }
  };

  const handleR1Click = () => {
    if (phla === 3) {
      setPhla(1);
      document.getElementById('i1').src = arrofi1[phla - 1];
    } else if (phla === 1 || phla === 2) {
      setPhla(phla + 1);
      document.getElementById('i1').src = arrofi1[phla - 1];
    }
  };

  const handleL2Click = () => {
    if (dusra === 1) {
      setDusra(3);
    } else if (dusra === 2 || dusra === 3) {
      setDusra(dusra - 1);
    }
    cpbb();
  };

  const handleR2Click = () => {
    if (dusra === 3) {
      setDusra(1);
      document.getElementById('i2').src = arrofi2[dusra - 1];
    } else if (dusra === 1 || dusra === 2) {
      setDusra(dusra + 1);
      document.getElementById('i2').src = arrofi2[dusra - 1];
    }
    cpbb();
  };

  const cpbb = () => {
    const playElement = document.getElementById('play');
    if (dusra === 1) {
      playElement.style.backgroundImage = `url(${bankbg})`;
    } else if (dusra === 2) {
      playElement.style.backgroundImage = `url(${cheesebg})`;
    } else if (dusra === 3) {
      playElement.style.backgroundImage = `url(${ringsbg})`;
    }
  };

  const arrofi1 = [easyImage, hardImage ,normalImage];
  const arrofi2 = [cheeseImage, ringsImage, bankImage];

  return (
    <div>
      <img src={titleImage} id="title" alt="" />
      <div id="play" className="lowerbuttons" onClick={loadit}>
        <img src={playImage} className="menubtnimages" alt="not working" />
      </div>
      <div id="diff" className="lowerbuttons" onClick={handleL1Click}>
        <img src={leftImage} id="l1" className="small" alt="not working" />
        <img src={arrofi1[phla - 1]} id="i1" className="menubtnimages" alt="not working" />
        <img src={rightImage} id="r1" className="small" alt="not working" />
      </div>
      <div id="theme" className="lowerbuttons" onClick={handleL2Click}>
        <img src={leftImage} id="l2" className="small" alt="not working" />
        <img src={arrofi2[dusra - 1]} id="i2" className="menubtnimages" alt="not working" />
        <img src={rightImage} id="r2" className="small" alt="not working" />
      </div>
    </div>
  );
};

export default Home;
