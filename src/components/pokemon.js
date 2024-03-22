import React from 'react'
import '../styles/Pokemon.css'
import Zoom from '@material-ui/core/Zoom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { colorTypeGradients } from '../utils/utils';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Tooltip from '@material-ui/core/Tooltip';

const Pokemon = ({ id, image, name, type, onElemClick }) => {

    let finalColor;

    if (type.length === 2) {
        finalColor = colorTypeGradients(type[0].type.name, type[1].type.name, type.length);
    } else {
        finalColor = colorTypeGradients(type[0].type.name, type[0].type.name, type.length);
    }

    return (
        <div className="thumbnail_container noselect" style={{ background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})` }}>
            <div className="card_header">
                <div className="pokemon_number">
                    #{String(id).padStart(3, '0')}
                </div>
                <div className="info_icon" onClick={() => onElemClick({ name })}>
                    <svg  
                        xmlns="http://www.w3.org/2000/svg"  
                        width="24"  
                        height="24"  
                        viewBox="0 0 24 24"  
                        fill="none"  
                        stroke="currentColor"  
                        stroke-width="2"  
                        stroke-linecap="round"  
                        stroke-linejoin="round"  
                        class="icon icon-tabler icons-tabler-outline icon-tabler-info-square">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 9h.01" />
                            <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
                            <path d="M11 12h1v4h1" />
                    </svg>                
                </div>
            </div>
            <div className="image_container">
                <LazyLoadImage
                    alt="Pokemon image"
                    height={150}
                    src={image}
                    visibleByDefault={false}
                    delayMethod={'debounce'}
                    effect="blur"
                    className="img_thumbnail"
                />
            </div>
            <div className="poke_name" >
                <h3>{name}</h3>
                <div className="poke_type">
                    {type.map((type) =>
                        <Tooltip 
                            TransitionComponent={Zoom} 
                            key={type.type.name}
                            title={type.type.name} 
                            arrow>
                            <div
                                className={`pokemon_type_bg ${type.type.name}`}>
                                <img src={`${type.type.name}.png`} alt="Pokemon type icon"></img>
                            </div>
                        </Tooltip>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Pokemon
