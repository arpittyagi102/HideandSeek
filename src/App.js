import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
// import Game from './components/Game/Game';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/play" element={<Game phlanum={phlanum}/>} /> */}
      </Routes>
    </Router>
    //  <Game/>
  );
}

export default App;