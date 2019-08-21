// Main imports
import React, { useState, useEffect } from 'react';

// Components
import Navbar from "./assets/components/Navbar";
import PlayerSelect from "./assets/components/PlayerSelect";
import Board from "./assets/components/Board";

// Styles
import './assets/components/styles/App.css';

const openModal = (id) => {
  let x = document.getElementById(id)
  x.classList.replace('fadeOut', 'fadeIn');  
}
const closeModal = (id) => {
  let x = document.getElementById(id)
  x.classList.replace('fadeIn', 'fadeOut');   
}

function App() {  
  const [avatar, setAvatar] = useState(null);  

  const selectAvatar = (token) => {
    setAvatar(token);    
  }

  useEffect(() => {
    openModal('AvatarSelectModal')    
  })

  const props = {
    AvatarSelectModal: {
      functions: {
        openModal: openModal,
        closeModal: closeModal,
        selectAvatar: selectAvatar,
      },
      state: {
        avatar: avatar, 
      }
    },
    Navbar: {
      functions: {
        openModal: openModal,        
      },
      state: {
        avatar: avatar,        
      }
    },
    Board: {

    }
  }

  return (
    <div className="App">
      <Navbar props={props.Navbar} />
      <PlayerSelect props={props.AvatarSelectModal} />
      <Board props={props.Board} />
    </div>
  );
}

export default App;
