import React from 'react';
import "../assets/css/Loading.css"

function Loading(props) {
    const { loading } = props;
    const [width, setWidth] = React.useState(100);

    React.useEffect(() => {
        setInterval(() => {
            setWidth(width => width - 1);
        }, 50);
    }, [])

    React.useEffect(() => {
        if (width < 20) {
            setWidth(100)
        }
    }, [width])

    return (
        <div id="loading" style={{ display: loading ? 'block' : 'none' }}>
            <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                {/* <img data-recalc-dims="1" className="image" alt="loading"
                src="https://i1.wp.com/media.boingboing.net/wp-content/uploads/2015/10/oqnfwbC2.gif?w=970"  /> */}

                {/* <img id="image" alt="monkey" src="https://miro.medium.com/max/978/0*JeAUeQMcb2TcNDvN.gif"></img> */}

                <div id="gif-div">
                    <img alt="running-dog" id="dog" style={{ marginRight: width }}
                        src="https://faviconer.net/preloaders/480/Running%20dog.gif" />
                    <img src="https://faviconer.net/preloaders/820/Running%20deer.gif" alt="running-deer" />
                </div>
                <h4 className="p-2">Loading...</h4>

            </div>
            {/* <div id="credits">
                <p>Animation by-</p><br></br><a href="https://dribbble.com/ohboy-fr">-Eric Martin-Ballo</a>
            </div> */}
        </div>
    )
}

export default Loading;