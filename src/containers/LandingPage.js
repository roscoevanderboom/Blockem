import React, { useContext, useEffect } from 'react';
import store from '../store';

import '../assets/css/AvatarSelect.css';
import styles from '../assets/js-css/main';

function Landing() {
    const { reducers, setState } = useContext(store);
    const { signInAnonymously } = reducers;

    useEffect(() => {
        setState.setLoading(false);
        // eslint-disable-next-line
    }, [])
    return (
        <div className="card shadow-lg">
            <div className="card-body">
                <h3 style={styles.header}>Welcome new user</h3>
                <p style={styles.par}>You are currently not signed in. Click below to create an
                anonymous account. Anonymous users have to reset their display name after
                every game. After 5 days, this account will be deleted and you will 
                have to create a new one!
                </p>
            </div>
            <div className="card-footer d-flex justify-content-around">
                <button className="btn btn-outline-info"
                    onClick={signInAnonymously}>
                    Create account
                </button>
            </div>
        </div>
    )
}

export default Landing;