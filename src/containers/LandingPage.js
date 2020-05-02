import React, { useContext } from 'react';
import store from '../store';

function Landing() {
    const { reducers } = useContext(store);
    const { signInAnonymously } = reducers;
    return (
        <div className="card shadow-lg">
            <div className="card-body">
                <h3>Welcome new user</h3>
                <p>You currently don't have an account. Click below to create and
                anonymous account. You can also watch a demo video first to
                see how the game is played.
                </p>
            </div>
            <div className="card-footer d-flex justify-content-around">
                <button className="btn btn-outline-info"
                    onClick={signInAnonymously}>
                    Create account
                </button>
                <button className="btn btn-outline-info">
                    View demo video
                </button>
            </div>
        </div>
    )
}

export default Landing;