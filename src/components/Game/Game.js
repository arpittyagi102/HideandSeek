import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./Game.css";
import cheeseImage from "../../media/cheese2.png";
import piggyBankImage from "../../media/piggybank.png";
import bombImage from "../../media/bomb2.png";
import jerryImage from "../../media/jerry.png";
import openImage from "../../media/open.png";
import coinsImage from "../../media/coins.png";
import emptyImage from "../../media/empty.png";
import closedImage from "../../media/closed.png";
import restartImage from "../../media/restart.webp";
import movesImage from "../../media/moves.webp";
import winningImage from "../../media/youwon.png";
import winningImage1 from "../../media/youwon.webp";
import bgImage1 from "../../media/tngbg2.webp";
import bgImage2 from "../../media/ringsbg.webp";
import bgImage3 from "../../media/piggybankbg.webp";
import sound1Audio from "../../media/sound3.ogg";
import giftFoundAudio from "../../media/giftfound.mp3";
import giftMissedAudio from "../../media/giftmissed.mp3";
import gameLoseAudio from "../../media/losingsound.mp3";
import gameWinAudio from "../../media/winningsound.mp3";

const Game = () => {  
  const [movecount, setMovecount] = useState(0);
  const [level, setLevel] = useState(4);
  const [score, setScore] = useState(0);
  const [phlanum, setPhlanum] = useState(0);
  const [dusra, setDusra] = useState(1);
  const [found, setFound] = useState(0);
  const [total, setTotal] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [b, setB] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [foundGifts, setFoundGifts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [clickedImages, setClickedImages] = useState([]);
  const [isBackgroundReady, setBackgroundReady] = useState(false);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedDifficulty = urlParams.get("difficulty");
    const selectedTheme = urlParams.get("theme");

    setMovecount(0);
    const phlanumValue = parseInt(selectedDifficulty) + 2;
  setPhlanum(phlanumValue);

  setDusra(parseInt(selectedTheme));

  // Generate random values for x, y, z, and b within the range of available gifts
  const totalGifts = phlanumValue * phlanumValue;
  const availableGifts = Array.from({ length: totalGifts }, (_, index) => index + 1);

  const getRandomValue = () => {
    const randomIndex = Math.floor(Math.random() * availableGifts.length);
    const randomValue = availableGifts.splice(randomIndex, 1)[0];
    return randomValue;
  };

  setX(getRandomValue());
  setY(getRandomValue());
  setZ(getRandomValue());
  setB(getRandomValue());

  }, []);

  
  useEffect(() => {
    // Update background image based on the selected theme
    const bgElement = document.getElementById("bg2");
    if (dusra === 1) {
      bgElement.style.backgroundImage = `url(${bgImage1})`;
    } else if (dusra === 2) {
      bgElement.style.backgroundImage = `url(${bgImage2})`;
    } else if (dusra === 3) {
      bgElement.style.backgroundImage = `url(${bgImage3})`;
    }
    setBackgroundReady(true); 

    
  }, [dusra]);  


  // useEffect(() => {
  //   // randomized variables to hide gift
  //   const total = phlanum * phlanum;
  //   const selectedValues = new Set();
  //   const values = [];

  //   while (selectedValues.size < 4) {
  //     const randomValue = Math.floor(Math.random() * total) + 1;
  //     if (!selectedValues.has(randomValue)) {
  //       selectedValues.add(randomValue);
  //       values.push(randomValue);
  //     }
  //   }

  //   const [x, y, z, b] = values;

  //   // Access the values in other functions as needed
  //   console.log(x, y, z, b);

  //   // Update state variables if necessary
    // setX(x);
    // setY(y);
    // setZ(z);
    // setB(b);

  //   // Rest of the code...
  // }, [phlanum]);
  
  useEffect(() => {
    // Code to hide the results section when the component mounts
    setShowResults(false);
  }, []);

  useEffect(() => {
    const restartButton = document.getElementById("re1");
    restartButton.addEventListener("click", restart);

    return () => {
      restartButton.removeEventListener("click", restart);
    };
  }, []);

  const restart = () => {
    window.location.reload();
  };

  const navigate = useNavigate();

  function goback() {
    navigate('/');
  }
  
  

  const generateTable = () => {
    const table = [];
    console.log([phlanum])
    for (let t = 0; t < phlanum; t++) {
      const row = [];
      for (let i = 0; i < phlanum; i++) {
        const number = t * phlanum + i + 1;
        let imageSrc = "";
        if (dusra === 1) {
          imageSrc = cheeseImage;
        } else if (dusra === 2) {
          imageSrc = closedImage;
        } else if (dusra === 3) {
          imageSrc = piggyBankImage;
        }
        row.push(
          <td key={number}>
            <img
              className="images"
              id={number}
              src={imageSrc}
              alt=""
              style={{ width: "100px", height: "100px", opacity: 0.75 }}
              onClick={clicked}
              onMouseOver={opchange}
              onMouseOut={opback}
            />
          </td>
        );
      }
      table.push(<tr key={t}>{row}</tr>);
    }
    return table;
  };

  const opchange = (e) => {
    e.target.style.opacity = 1;
  };

  const opback = (e) => {
    e.target.style.opacity = 0.75;
  };

  const opstop = (no) => {
    const clickedImage = document.getElementById(no.toString());
    clickedImage.removeEventListener("mouseover", opchange);
    clickedImage.removeEventListener("mouseout", opback);
  };

  const clicked = (e) => {
    if (gameEnded || found === 3) return; // Ignore click if game has ended or all gifts found
    const clickedId = parseInt(e.target.id);

    if (foundGifts.includes(clickedId) || clickedImages.includes(clickedId)) {
      return;
    }
    setMovecount((prevMovecount) => prevMovecount + 1);
  
    if (clickedId === b) {
      e.target.src = bombImage;
      endofthegame();
      document.getElementById("gamelose").play();
      setTimeout(losing, 2000);
    }  
    
     else if (clickedId === x || clickedId === y || clickedId === z) {
      opstop(clickedId);
      if (foundGifts.includes(clickedId)) {
        return;
      } else {
        // New gift found
        giftfound(clickedId);
        setFound((prevFound) => prevFound + 1);
        setFoundGifts((prevGifts) => [...prevGifts, clickedId]);
        setScore((prevScore) => prevScore + 1000);
        if (found + 1 === 3) {
          endofthegame();
          document.getElementById("gamewin").play();
          setTimeout(() => {
            winning();
            
          }, 2000);
        }
      }
    } else {
      giftmissed(clickedId);
      setScore((prevScore) => prevScore - 100);
    }
    setClickedImages((prevClickedImages) => [...prevClickedImages, clickedId]);
  };
  
  

    function giftfound(no) {
      if (dusra === 1) {
          document.getElementById(no).src = jerryImage;
      }
      else if (dusra === 2) {
          document.getElementById(no).src = openImage;
      }
      else if (dusra === 3) {
          document.getElementById(no).src = coinsImage;
      }

      document.getElementById("giftfound").play();
  }

  function giftmissed(no) {

    if (dusra === 1) {
        document.getElementById(no).style.visibility = "hidden";
    }
    else if (dusra === 2) {
        document.getElementById(no).src = emptyImage;
    }
    else if (dusra === 3) {
        document.getElementById(no).style.visibility = "hidden";
    }

    document.getElementById("giftmissed").play();

}



function winning() {
  setMovecount((prevMovecount) => prevMovecount + 1);
  document.getElementById("final").style.display = "block";
  document.getElementById("bg2").style.filter = "blur(8px)";
  document.getElementById("bg2").style.opacity = "o.7";
  document.getElementById("yeimg").src = "youwon.png";

}

function losing() {
  setMovecount((prevMovecount) => prevMovecount + 1);
  document.getElementById("final").style.display = "block";
  document.getElementById("bg2").style.filter = "blur(8px)";
  document.getElementById("bg2").style.opacity = "o.7";
  document.getElementById("yeimg").src = "youlost.png";
  // document.getElementById("gamelose").play();
}

// function sound1() {
//   document.getElementById("sound1").play();
// }


const endofthegame = () => {
  const images = document.getElementsByClassName("images"); // Get all image elements
  for (let i = 0; i < images.length; i++) {
    images[i].removeEventListener("click", clicked); // Remove click event listener from each image
  }
  setGameEnded(true); // Set gameEnded to true to disable further clicks
};
   

  

  return (
    <div id="wonorlost">
      <div className="bg" id="bg2" style={{ visibility: isBackgroundReady ? 'visible' : 'hidden' }}>
        <div id="restart" align="center">
          <img className="lowertext" src={restartImage} alt="" />
        </div>
        <table align="center" id="ekdoteen">
          {generateTable()}
        </table>
        <div id="lower" align="center">
          <img className="lowertext" src={movesImage} alt="" />
          <h1 id="moves">{movecount}</h1>
        </div>

        <audio id="sound1">
          <source src={sound1Audio} type="audio/mpeg" />
        </audio>
        <audio id="giftfound">
          <source src={giftFoundAudio} type="audio/mpeg" />
        </audio>
        <audio id="giftmissed">
          <source src={giftMissedAudio} type="audio/mpeg" />
        </audio>
        <audio id="gamelose">
          <source src={gameLoseAudio} type="audio/mpeg" />
        </audio>
        <audio id="gamewin">
          <source src={gameWinAudio} type="audio/mpeg" />
        </audio>
      </div>
      <div id="final" align="center" style={{ display: showResults ? "block" : "none" ,cursor:"pointer"  }}>
        <img id="yeimg" src={winningImage1} alt="" />
        <h1 id="h1">Score: {score}</h1>
        <div id="outernew">
          <div className="re" id="re1">
            Restart
          </div>
          <Link to="/" className="re" id="re2" onClick={goback} style={{ textDecoration: 'none' }}>
              Start New
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Game;
