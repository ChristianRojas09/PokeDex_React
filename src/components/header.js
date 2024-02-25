import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import Pokedex from "../assets/images/pokedex.png";

class Header extends React.Component {

    //logic for the light/dark mode switch.
    changeTheme = () => {

        const currentTheme = document.documentElement.getAttribute('data-theme');
        console.log(currentTheme);

        let targetTheme = "dark";

        //this statement will check if the target theme is active. If not, it will select the secondary theme
        if (currentTheme === "dark") {
            targetTheme = "light";

            this.setState({
                isChecked: true,
            })
        } else {
            this.setState({
                isChecked: false,
            })
        }
        document.documentElement.setAttribute('data-theme', targetTheme)
    }

    //function to open github on click
    openGithub = () => {
        window.open("https://github.com/ChristianRojas09");
    }

    //header styling
    render() {
        return (
            <>
                <div className="app_header">
                    <div className="switch">

                        <div className="toggle">
                            <label htmlFor="themeSwitch"></label>
                            <input 
                                type="checkbox" 
                                name="swich-theme" 
                                id="themeSwitch" 
                                onClick={this.changeTheme} 
                                defaultChecked />
                            <div className="toggle-bg"></div>
                            <div className="toggle-thumb">
                                <i className="fas fa-sun"></i>
                                <i className="fas fa-moon"></i>
                            </div>
                        </div>
                    </div>
                    <div className="poke_logos noselect">
                        <img src={Pokedex} alt="Pokemon logo" 
                            className="poke_logo" />
                    </div>
                    <div className="pokeball_box github_icon" 
                        onClick={this.openGithub}>
                        <GitHubIcon></GitHubIcon>
                    </div>
                </div>
            </>
        )
    }
}

export default Header;