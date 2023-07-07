// import React, { useEffect } from "react";
// import "./Game.css";
// import cheeseImage from "../../media/cheese2.png";
// import piggyBankImage from "../../media/piggybank.png";
// import bombImage from "../../media/bomb2.png";
// import jerryImage from "../../media/jerry.png";
// import openImage from "../../media/open.png";
// import coinsImage from "../../media/coins.png";
// import emptyImage from "../../media/empty.png";
// import restartImage from "../../media/restart.webp";
// import movesImage from "../../media/moves.webp";
// import winningImage from "../../media/youwon.png";
// import winningImage1 from "../../media/youwon.webp";
// import bgImage1 from "../../media/tngbg2.webp";
// import bgImage2 from "../../media/ringsbg.webp";
// import bgImage3 from "../../media/piggybankbg.webp";
// import sound1Audio from "../../media/sound3.ogg";
// import giftFoundAudio from "../../media/giftfound.mp3";
// import giftMissedAudio from "../../media/giftmissed.mp3";
// import gameLoseAudio from "../../media/losingsound.mp3";
// import gameWinAudio from "../../media/winningsound.mp3";

// const Game = () => {

//     useEffect(() => {
//         const urlParams = new URLSearchParams(window.location.search);
//         const selectedTheme = urlParams.get("mode");
    
//         const bgElement = document.getElementById("bg2");
    
//         if (selectedTheme === "1") {
//           bgElement.style.backgroundImage = `url(${bgImage1})`;
//         } else if (selectedTheme === "2") {
//           bgElement.style.backgroundImage = `url(${bgImage2})`;
//         } else if (selectedTheme === "3") {
//           bgElement.style.backgroundImage = `url(${bgImage3})`;
//         }
//       }, []);

//   return (
//     <div id="wonorlost">
//       <div className="bg" id="bg2">
//         <div id="restart" align="center">
//           <img className="lowertext" src={restartImage} alt="" />
//         </div>
//         <table align="center" id="ekdoteen"></table>
//         <div id="lower" align="center">
//           <img className="lowertext" src={movesImage} alt="" />
//           <h1 id="moves"></h1>
//         </div>

//         <audio id="sound1">
//           <source src={sound1Audio} type="audio/mpeg" />
//         </audio>
//         <audio id="giftfound">
//           <source src={giftFoundAudio} type="audio/mpeg" />
//         </audio>
//         <audio id="giftmissed">s
//           <source src={giftMissedAudio} type="audio/mpeg" />
//         </audio>
//         <audio id="gamelose">
//           <source src={gameLoseAudio} type="audio/mpeg" />
//         </audio>
//         <audio id="gamewin">
//           <source src={gameWinAudio} type="audio/mpeg" />
//         </audio>
//       </div>
//       <div id="final" align="center">
//         <img id="yeimg" src={winningImage1} alt="" />
//         <h1 id="h1">Score :</h1>
//         <div id="outernew">
//           <div className="re" id="re1" >Restart</div>
//           <div className="re" id="re2" >Start New</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Game;