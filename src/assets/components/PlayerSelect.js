import React, { useState, useEffect } from 'react';

function PlayerSelect({ props }) {

    const [name, setName] = useState(null);

    const { functions, state } = props;

    const tokens = [
        ['🦊', 'Fox', 'cunning'],
        ['🐰', 'Rabbit', 'fluffy'],
        ['🐸', 'Frog', 'trippy'],
        ['🦁', 'Lion', 'mighty'],
        ['🐯', 'Tiger', 'stealthy'],
        ['🐭', 'Mouse', 'mischievious'],
        ['🦄', 'Unicorn', 'majestic'],
        ['🐲', 'Dragon', 'fierce'],
        ['🐷', 'Pig', 'joyous'],
        ['🐺', 'Wolf', 'lonesome'],
        ['🐼', 'Panda', 'cuddly'],
        ['🐻', 'Bear', 'powerful'],
    ]; 

    const setAvatar = (av) => {
        setName(av[1])
    }


    return (
        <React.Fragment>
            <div className="fadeOut" id="AvatarSelectModal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header row justify-content-around">
                            <h5 className="modal-title text-center" id="AvatarIcon">
                            {state.avatar === null ? `Select your avatar`: 
                            `Good luck ${state.avatar[2]} ${state.avatar[1]}` }
                            </h5>                            
                        </div>
                        <div className="modal-body">
                            {tokens.map((token, key) =>
                                <div key={key} className="token">
                                    <span role='img' aria-label={token[1]} onClick={() => {
                                        functions.selectAvatar(token)
                                    }}>{token[0]}</span>
                                </div>)}
                        </div>

                        <div className="modal-footer row justify-content-center">
                            <button type="button" className="btn btn-primary" onClick={() => {                                
                                if (state.avatar !== null) {
                                    functions.closeModal('AvatarSelectModal');
                                    functions.openModal('boardModal');
                                    return;
                                }
                                alert('Please select an avatar');
                            }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default PlayerSelect;