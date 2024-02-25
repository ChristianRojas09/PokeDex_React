import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';

class Footer extends React.Component {

    openGithub = () => {
        window.open("https://github.com/ChristianRojas09");
    }

    render() {
        return (
            <>
                <div className="app_footer noselect">
                    <div>
                        Built using the wonderful <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">PokéAPI</a>, <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a> and <a href="https://material-ui.com/" target="_blank" rel="noopener noreferrer">Material-UI</a>.
                    </div>
                    <div onClick={this.openGithub} className="github_icon" alt="Github icon">
                        <GitHubIcon></GitHubIcon>
                    </div>
                </div>
            </>
        )
    }
}

export default Footer;