import React from 'react';


function Navbar({ props }) {

    const { functions, state } = props;

    const open = () => {
        functions.openModal('AvatarSelectModal')
    }

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark primary-color">

                <span className="navbar-brand brand">Animal TicTacToe</span>

                <span className="navbar-brand brand">{state.avatar === null ? ``: 
                `${state.avatar[0]}`}</span>    

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobileNav"
                    aria-controls="mobileNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mobileNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <span className="nav-link">Profile</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link" onClick={open}>Select Animal</span>
                        </li>
                    </ul>
                </div>
                            
            </nav>
        </React.Fragment>
    )
}

export default Navbar;