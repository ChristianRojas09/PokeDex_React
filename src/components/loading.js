import React from 'react';

class Loading extends React.Component {

    openGithub = () => {
        window.open("https://github.com/ChristianRojas09");
    }

    render() {
        return (
            <>
                <div className="app_container">
                    <div className="loading_text">
                        Loading Pokedex...
                    </div>
                    <div className="gif_container">
                        <img src="https://i.gifer.com/4OKl.gif" className="loading_gif noselect" alt="loading page gif"></img>
                    </div>
                </div>
            </>
        )
    }
}

export default Loading;