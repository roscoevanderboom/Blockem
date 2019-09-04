import React from 'react';


// Styles
import './styles/Navbar.css'


function Navbar({ props }) {

    const { functions, state } = props;

    console.log(functions.signOut)

    console.log(state.avatar)
    console.log(state.player)

    const newAvatar = () => {
        functions.setAvatar(null)
        functions.setInGame(false)
    }
    // functions.signOut() 

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark primary-color">

                <span className="navbar-brand brand">Animal TicTacToe</span>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobileNav"
                    aria-controls="mobileNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <button className="btn btn-border p-3"
                    onClick={() => {                        
                        functions.signOut()                     
                    }}>Sign out</button>

                <div className="collapse navbar-collapse" id="mobileNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <span className="nav-link" onClick={newAvatar}>Select New Animal</span>
                        </li>
                    </ul>
                </div>

            </nav>
        </React.Fragment>
    )
}

export default Navbar;