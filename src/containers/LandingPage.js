import React, { useContext, useEffect } from 'react';
import store from '../store';

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
                <h3>Welcome new user</h3>
                <p>You currently don't have an account. Click below to create an
                anonymous account.
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