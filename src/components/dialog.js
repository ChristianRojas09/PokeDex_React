import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { StylesProvider } from "@material-ui/core/styles";
import '../styles/InfoDialog.css';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Delayed from './delayed';
import { colorTypeGradients } from '../utils/utils';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { motion } from "framer-motion"

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

//define gender rates - this populates at the bottom of the dialog
const fetchGenderRate = (genderRate) => {

    switch (genderRate) {
        case 0:
            return <div>
                <span class="gender-male">100% <i class="fa fa-mars"></i></span>
                <span> 0% <i class="fa fa-venus"></i></span></div>;
        case 1:
            return <div>
                <span>87.5% <i class="fa fa-mars"></i></span>
                <span>  12.5% <i class="fa fa-venus"></i></span></div>;
        case 2:
            return <div><span>75% <i class="fa fa-mars"></i></span>
            <span>  25% <i class="fa fa-venus"></i></span></div>;
        case 3:
            return <div><span>62.5% <i class="fa fa-mars"></i></span>
            <span>  37.5% <i class="fa fa-venus"></i></span></div>;
        case 4:
            return <div><span>50% <i class="fa fa-mars"></i></span>
            <span>  50% <i class="fa fa-venus"></i></span></div>;
        case 5:
            return <div><span>37.5% <i class="fa fa-mars"></i></span>
            <span>  62.5% <i class="fa fa-venus"></i></span></div>;
        case 6:
            return <div><span>25% <i class="fa fa-mars"></i></span>
            <span>  75% <i class="fa fa-venus"></i></span></div>;
        case 7:
            return <div><span>12.5% <i class="fa fa-mars"></i></span>
            <span>  87.5% <i class="fa fa-venus"></i></span></div>;
        case 8:
            return <div><span>0% <i class="fa fa-mars"></i></span>
            <span>  100% <i class="fa fa-venus"></i></span></div>;
        default:
            return <span>Loading pokemon...</span>
    }
}

//fill properties with their values/logic
export default function InfoDialog(props) {

    let finalColor;

    if (props.category.length === 2) {
        finalColor = colorTypeGradients(props.category[0].type.name, props.category[1].type.name, props.category.length);
    } else {
        finalColor = colorTypeGradients(props.category[0].type.name, props.category[0].type.name, props.category.length);
    }

    return <>
        <StylesProvider injectFirst>
            <div>
                <Dialog aria-labelledby="customized-dialog-title" 
                    open={props.open} 
                    onBackdropClick={props.cancel} 
                    fullWidth maxWidth="md" 
                    className="dialog_bg noselect">
                    <DialogContent style={{ 
                            background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})` }} className="dialog_content">
                        <div className="info_container">
                            <div className="info_container_img">
                                <div className="pokemon_id">
                                    #{String(props.number).padStart(3, '0')}
                                </div>
                                <div className="pokemon_name">
                                    {props.name}
                                </div>
                                <div className="pokemon_generation" style={{ background: finalColor[0] }}>
                                    {props.generation}
                                </div>
                                <div>
                                    <img src={props.img} alt="pokemon image" />
                                </div>
                                <div className="info_container_data_type">
                                    {props.category.map((category) =>
                                        <Tooltip 
                                            TransitionComponent={Zoom} 
                                            key={category.type.name} 
                                            title={category.type.name} 
                                            arrow>
                                            <div key={category.type.name} className={`pokemon_type_bg ${category.type.name}`}>
                                                <img src={`${category.type.name}.png`} alt="Pokemon type"></img>
                                            </div>
                                        </Tooltip>
                                    )}
                                </div>
                                <div className="dimensions">
                                    <p ><span className="info_container_headings" style={{ fontSize: "20px" }}>Height</span> {`${props.height / 10} m/${`${Math.floor(props.height / 10 * 3.28)}'${Math.round(((props.height / 10 * 3.28) % 1) * 12)}"`} `} </p>
                                    <p ><span className="info_container_headings" style={{ fontSize: "20px" }}>Weight</span>{` ${(props.weight / 10).toFixed(1)} kg/${(props.weight * 0.2205).toFixed(1)} lbs`}</p>
                                </div>
                                <div className="gender_container">
                                    {props.genderRate === -1 ? "Genderless" : fetchGenderRate(props.genderRate)}
                                </div>
                            </div>
                            <div className="info_container_data">
                                <div className="right_box">
                                    <div>
                                        <div className="info_container_headings">About</div>
                                        <div className="desc">
                                            {props.description}
                                        </div>
                                    </div>
                                    <div className="info_container_data_header">
                                        <div className="info_container_data_abilities">
                                            <div className="info_container_headings">Abilities</div>
                                            <div className="ability_list_bg">
                                                <ul className="ability_list">
                                                    {props.abilities.map((ability) =>
                                                        <li key={ability}>
                                                            <div className="ability">{ability}</div>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="info_container_headings stats">Base Stats</div>
                                        <div className="info_container_data_data">
                                            {props.stats.map((stat) =>
                                                <div key={stat['stat_name']} className="info_container_stat_columns">
                                                    <div className="info_container_stat_columns_name">{stat['stat_name']}</div>
                                                    <div className="info_container_stat_columns_val">{stat['stat_val']}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="info_container_headings">Evolution</div>
                                        <div className="evolution_box">
                                            {props.evoChain.map((value, index, elements) =>
                                                <Delayed waitBeforeShow={(index + 0) * 800} key={elements[index].species_name}>
                                                    <div className="evolution_sub_box">
                                                        
                                                        <div>
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 2, ease: "easeOut", type:'spring', bounce: 0.65,  damping: 25 }}
                                                            whileHover={{ scale: 1.05 }}
                                                        >
                                                            <div className="evolution_img_div" style={{ background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})` }}>
                                                                <div className="transparency_div">
                                                                    <LazyLoadImage
                                                                        alt="Pokemon evolution image"
                                                                        height={80}
                                                                        width={80}
                                                                        src={elements[index].image_url}
                                                                        visibleByDefault={false}
                                                                        delayMethod={'debounce'}
                                                                        effect="opacity"
                                                                        className="evo_img"
                                                                        onClick={() => props.evolutionPokemon(props.number, elements[index].species_name, props.category, elements[index].image_url)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            </motion.div>
                                                            <div className="evolution_poke_name">{elements[index].species_name}</div>
                                                        </div>
                                                        {elements[index + 1] && <ArrowRightAltIcon className="arrow_right"></ArrowRightAltIcon>}
                                                    </div>
                                                </Delayed>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </StylesProvider>
    </>;
}