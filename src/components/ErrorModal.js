import React, { useEffect, useState } from 'react';
import "../assets/css/WinnerModal.css";
import styles from '../assets/js-css/main';
const {
    fixed_top_left_cover,
    flex_absolute_center,
    modalBackground,
    fonts
} = styles;

const style = {
    modalPage: {
        ...fixed_top_left_cover,
        ...flex_absolute_center,
        ...modalBackground,
    },
    modalContainer: {
        marginTop: '-5em'
    },
    errorModalHeader: {
        fontFamily: fonts.default,
        fontSize: '2.25rem'
    },
    errorMessage: {
        fontFamily: fonts.default,
        fontSize: '1.25rem'
    }
}

const ErrorModal = (props) => {
    const { state, reducers } = props;
    const [message, setMessage] = useState(false);

    useEffect(() => {
        setMessage(state.error);
    }, [state.error])

    return (
        <React.Fragment>
            <div style={style.modalPage} className={message ? "fadeIn" : "fadeOut"}>
                <div style={style.modalContainer} className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="pt-2 pl-3 pr-3">
                            <h3 style={style.errorModalHeader} className="modal-title">Error</h3>
                            <p style={style.errorMessage} >{message ? message : ''}</p>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="button"
                                className="btn-sm mr-1 mb-1 btn-outline-danger"
                                onClick={reducers.handleErrors}>Got it!</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ErrorModal;