import React from 'react';
import Pokemon from "./components/pokemon";
import InfoDialog from "./components/dialog";
import axios from 'axios';
import Scroll from './components/scroll';
import Header from './components/header'
import Footer from './components/footer'
import Loading from './components/loading'
import Filters from './components/filters'
import { motion } from "framer-motion"


// create list animation
const list = {
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.35,
            delayChildren: 0.55,
        },
    },
    hidden: {
        opacity: 0,
        transition: {
            when: "afterChildren",
        },
    },
};

const items = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -150 },
};

class App extends React.Component {

    //declare empty properties
    constructor(props) {
        super(props);
        this.state = {
            allPokemons: [],
            searchPokemons: [],
            filterPokemons: [],
            evoChain: [],
            stats: [],
            generationtion: "",
            abilities: "",
            height: "",
            weight: "",
            catergory: "",
            searchString: "",
            imageURL: "",
            pokeName: "",
            pokeNumber: "",
            genderRate: "",
            selectedType: "",
            description: "",
            showLoading: true,
            showInfo: false,
            isSearch: false,
            isFilter: false,
            isTypeSelected: false,
            noDataFound: false,
            limit: 151,
            offset: 0,
            isChecked: false,
            evolID: "",
            evolName: "",
            evolTypes: [],
            evolImgURL: "",
            regions: [
                {
                    name: "Kanto",
                    limit: 151,
                    offset: 0,
                },
                {
                    name: "Johto",
                    limit: 100,
                    offset: 151,
                },
                {
                    name: "Hoenn",
                    limit: 135,
                    offset: 251,
                },
                {
                    name: "Sinnoh",
                    limit: 108,
                    offset: 386,
                },
                {
                    name: "Unova",
                    limit: 155,
                    offset: 494,
                },
                {
                    name: "Kalos",
                    limit: 72,
                    offset: 649,
                },
                {
                    name: "Alola",
                    limit: 88,
                    offset: 721,
                },
                {
                    name: "Galar",
                    limit: 89,
                    offset: 809,
                }
            ],
            types: [
                "all types", 
                "grass", 
                "bug", 
                "dark", 
                "dragon", 
                "electric", 
                "fairy", 
                "fighting", 
                "fire", 
                "flying", 
                "ghost", 
                "ground", 
                "ice", 
                "normal", 
                "poison", 
                "psychic", 
                "rock", 
                "steel", 
                "water"
            ],
            sortby: [
                "ID", "Name"
            ],

        }
    };

    //run function if the theme component mounts - set the theme state
    componentDidMount() {
        this.getAllPokemons(this.state.offset, this.state.limit);
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === "dark") {
            this.setState({
                isChecked: true,
            })
        }
    };

    componentDidUpdate() {
        console.log("updated");
    };

    //call the pokeAPI to get all pokemon data
    getAllPokemons = async (offset, limit) => {

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`).catch((err) => console.log("Error:", err));
        this.getPokemonData(response.data.results);

    };

    getPokemonData = async (result) => {

        const pokemonArr = [], filterArr = [];

        await Promise.all(
            result.map((pokemonItem) => {
                return axios
                    .get(`https://pokeapi.co/api/v2/pokemon/${pokemonItem.name}`)
                    .then((result) => {
                        pokemonArr.push(result.data);
                    });
            })
        );

        pokemonArr.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))

        //store pokemon data in an array
        if (this.state.isTypeSelected) {
            for (let i = 0; i < pokemonArr.length; i++) {
                for (let j = 0; j < pokemonArr[i].types.length; j++) {
                    if (this.state.selectedType === pokemonArr[i].types[j].type.name) {
                        filterArr.push(pokemonArr[i])
                    }
                }
            }
            this.setState({
                isFilter: true,
                filterPokemons: filterArr,
                allPokemons: pokemonArr,
                showLoading: false
            })
        } else {
            this.setState({
                isFilter: false,
                allPokemons: pokemonArr,
                showLoading: false,
            })
        }

        console.log(this.state.allPokemons);

    };

    closeDialog = () => {
        this.setState({
            showInfo: false,
        })
    };

    //fetch evolution change details from pokeAPI
    fetchEvoDetails = async (url) => {

        const response = await axios.get(url).catch((err) => console.log("Error:", err));
        console.log(response);


        const evoChain = [];
        let evoData = response.data.chain;

        do {
            const evoDetails = evoData['evolution_details'][0];

            evoChain.push({
                "species_name": evoData.species.name,
                "min_level": !evoDetails ? 1 : evoDetails.min_level,
                "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
                "item": !evoDetails ? null : evoDetails.item
            });

            evoData = evoData['evolves_to'][0];
        } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

        this.fetchEvoImages(evoChain);

    };

    //fetch evolution chain data from pokeAPI
    fetchEvoImages = async (evoChainArr) => {

        for (let i = 0; i < evoChainArr.length; i++) {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evoChainArr[i].species_name}`).catch((err) => console.log("Error:", err));
            response.data.sprites.other.dream_world.front_default ? evoChainArr[i]['image_url'] = response.data.sprites.other.dream_world.front_default : evoChainArr[i]['image_url'] = response.data.sprites.other['official-artwork'].front_default;
        }

        this.setState({
            evoChain: evoChainArr,
        })

    };

    fetchPokemonData = async (number, pokemon, category, imageURL) => {


        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).catch((err) => console.log("Error:", err));

        const statistics = [], abs = [];
        const id = response.data.id;

        for (let i = 0; i < response.data.abilities.length; i++) {
            abs.push(response.data.abilities[i].ability.name);
        }

        for (let j = 0; j < response.data.stats.length; j++) {
            const Obj = {};
            Obj['stat_name'] = response.data.stats[j].stat.name;
            Obj['stat_val'] = response.data.stats[j].base_stat;
            statistics.push(Obj);
        }

        this.setState({
            weight: response.data.weight,
            height: response.data.height,
            category,
            pokeNumber: id,
            imageURL,
            pokeName: pokemon,
            showInfo: true,
            stats: statistics,
            abilities: abs,
        })

        this.setState({
            evoChain: [],
            genderRate: "",
            generation: "",
        })

        this.fetchPokemonDescription(pokemon);

    };

    //function to fetch pokemon description from pokeAPI. 
    fetchPokemonDescription = async (pokemon_name) => {

        let generation = "";

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon_name}`).catch((err) => console.log("Error:", err));
        this.fetchEvoDetails(response.data.evolution_chain.url);

        try {
            for (let i = 0; i < response.data.flavor_text_entries.length - 1; i++) {
                if (response.data.flavor_text_entries[i].language.name === "en") {
                    this.state.description = response.data.flavor_text_entries[i].flavor_text;
                    break;
                }
            }

            for (let j = 0; j < response.data.generation.length; j++) {
                if (response.data.generation[j].language.name === "en") {
                    generation = response.data.generation[j].genus;
                    break;
                }
            }

            this.setState({
                description: this.state.description,
                genderRate: response.data.gender_rate,
                generation,
            })
        } catch (e) {
            this.setState({
                description: "Description not found",
            })
        }

    };

    //function that handles region sorting. When a region is selected the pokemon list will only show pokemon available in that region
    handleChangeRegions = (event) => {

        for (let i = 0; i < this.state.regions.length; i++) {
            if (this.state.regions[i].name === event.target.value) {

                this.setState({
                    valueregion: event.target.value,
                    sorttype: "ID",
                    isSearch: false,
                    isFilter: false,
                    showLoading: true,
                })

                this.getAllPokemons(this.state.regions[i].offset, this.state.regions[i].limit);

                break;
            }
        }
    };

    //Function to handle search. Search by name and ID number
    handleChangeSearch = (event) => {


        event.target.value.length > 0 ? this.setState({ isSearch: true, valuetype: "all types", valuesearch: event.target.value }) : this.setState({ isSearch: false, isFilter: false, valuesearch: event.target.value });

        let searchArr = [];

        for (let i = 0; i < this.state.allPokemons.length; i++) {
            if (this.state.allPokemons[i].name.includes(event.target.value.toLowerCase()) 
                || this.state.allPokemons[i].id.toString().includes(event.target.value)) {
                searchArr.push(this.state.allPokemons[i]);
            }
        }

        searchArr.length === 0 ? this.setState({ noDataFound: true, searchPokemons: [], }) : this.setState({ noDataFound: false, searchPokemons: searchArr })

    };

    handleChangeSort = (event) => {

        let sortArr;

        this.state.isFilter ? sortArr = this.state.filterPokemons : sortArr = this.state.allPokemons

        if (event.target.value === "ID") {
            sortArr.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
        } else {
            sortArr.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        }


        this.state.isFilter ?
            this.setState({
                filterPokemons: sortArr,
                sorttype: event.target.value,
            }) :
            this.setState({
                allPokemons: sortArr,
                sorttype: event.target.value,
            })

    };

    //Function to handle filter by type.
    handleChangeTypes = (event) => {

        if (event.target.value === "all types") {
            const allPoks = this.state.allPokemons;
            if (this.state.sorttype === "Name") {
                allPoks.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                this.setState({
                    isFilter: false,
                    valuetype: event.target.value,
                    allPokemons: allPoks,
                    isTypeSelected: false,
                })
            } else {
                allPoks.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
                this.setState({
                    isFilter: false,
                    valuetype: event.target.value,
                    allPokemons: allPoks,
                    isTypeSelected: false,
                })
            }
            return;
        } else {
            this.setState({
                isTypeSelected: true,
                selectedType: event.target.value,
            })
        }

        let filterArr = [];

        for (let i = 0; i < this.state.allPokemons.length; i++) {
            for (let j = 0; j < this.state.allPokemons[i].types.length; j++) {
                if (event.target.value === this.state.allPokemons[i].types[j].type.name) {
                    filterArr.push(this.state.allPokemons[i])
                }
            }
        }

        this.state.sorttype === "Name" ? filterArr.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)) :
            filterArr.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))

        this.setState({
            isSearch: false,
            valuesearch: "",
            isFilter: true,
            filterPokemons: filterArr,
            valuetype: event.target.value,
        })

        filterArr.length === 0 ? this.setState({ noDataFound: true }) : this.setState({ noDataFound: false })

    };

    //scroll to top function
    handleClick = () => {
        window[`scrollTo`]({ top: document.body.scrollHeight, behavior: `smooth` })
    };

    //implement page styling
    render() {
        return (
            <>
                <Scroll showBelow={250} className="scroll_top" />
                {this.state.showLoading && <Loading />}
                {!this.state.showLoading && <div className="app_container">
                    {this.state.showInfo &&
                        <InfoDialog
                            open={this.state.showInfo}
                            abilities={this.state.abilities}
                            height={this.state.height}
                            weight={this.state.weight}
                            category={this.state.category}
                            generation={this.state.generation}
                            genderRate={this.state.genderRate}
                            stats={this.state.stats}
                            img={this.state.imageURL}
                            name={this.state.pokeName}
                            number={this.state.pokeNumber}
                            description={this.state.description}
                            evoChain={this.state.evoChain}
                            cancel={() => this.closeDialog()}
                            evolutionPokemon={this.fetchPokemonData}>
                        </InfoDialog>}
                    <Header />
                    <Filters
                        valueregion={this.state.valueregion}
                        regions={this.state.regions}
                        valuetype={this.state.valuetype}
                        sorttype={this.state.sorttype}
                        valuesearch={this.state.valuesearch}
                        types={this.state.types}
                        sortby={this.state.sortby}
                        regionsSelect={this.handleChangeRegions}
                        typesSelect={this.handleChangeTypes}
                        sortSelect={this.handleChangeSort}
                        searchChange={this.handleChangeSearch}
                    />
                    <div className="pokemon_container">
                        <div className="all_pokemons">
                            {this.state.isSearch ? Object.keys(this.state.searchPokemons).map((item) =>
                                <Pokemon
                                    key={this.state.searchPokemons[item].id}
                                    id={this.state.searchPokemons[item].id}
                                    image={this.state.searchPokemons[item].sprites.other.dream_world.front_default ? this.state.searchPokemons[item].sprites.other.dream_world.front_default : this.state.searchPokemons[item].sprites.other['official-artwork'].front_default}
                                    name={this.state.searchPokemons[item].name}
                                    type={this.state.searchPokemons[item].types}
                                    onElemClick={() => this.fetchPokemonData(this.state.searchPokemons[item].id, this.state.searchPokemons[item].name, this.state.searchPokemons[item].types, this.state.searchPokemons[item].sprites.other.dream_world.front_default ? this.state.searchPokemons[item].sprites.other.dream_world.front_default : this.state.searchPokemons[item].sprites.other['official-artwork'].front_default)}
                                />) :
                                (!this.state.isFilter ?
                                    <motion.ul
                                        style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            listStyleType: 'none',
                                            paddingInlineStart: '0px',
                                            marginBlockStart: '0px',
                                            marginBlockEnd: '0px',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        initial="hidden"
                                        animate="visible"
                                        variants={list}>
                                        {Object.keys(this.state.allPokemons).map((item) =>
                                            <motion.li variants={items}>
                                                <Pokemon
                                                    key={this.state.allPokemons[item].id}
                                                    id={this.state.allPokemons[item].id}
                                                    image={this.state.allPokemons[item].sprites.other.dream_world.front_default ? this.state.allPokemons[item].sprites.other.dream_world.front_default : this.state.allPokemons[item].sprites.other['official-artwork'].front_default}
                                                    name={this.state.allPokemons[item].name}
                                                    type={this.state.allPokemons[item].types}
                                                    onElemClick={() => this.fetchPokemonData(this.state.allPokemons[item].id, this.state.allPokemons[item].name, this.state.allPokemons[item].types, this.state.allPokemons[item].sprites.other.dream_world.front_default ? this.state.allPokemons[item].sprites.other.dream_world.front_default : this.state.allPokemons[item].sprites.other['official-artwork'].front_default)}
                                                />
                                            </motion.li>
                                        )}
                                    </motion.ul> :
                                    Object.keys(this.state.filterPokemons).map((item) =>
                                        <Pokemon
                                            key={this.state.filterPokemons[item].id}
                                            id={this.state.filterPokemons[item].id}
                                            image={this.state.filterPokemons[item].sprites.other.dream_world.front_default ? this.state.filterPokemons[item].sprites.other.dream_world.front_default : this.state.filterPokemons[item].sprites.other['official-artwork'].front_default}
                                            name={this.state.filterPokemons[item].name}
                                            type={this.state.filterPokemons[item].types}
                                            onElemClick={() => this.fetchPokemonData(this.state.filterPokemons[item].id, this.state.filterPokemons[item].name, this.state.filterPokemons[item].types, this.state.filterPokemons[item].sprites.other.dream_world.front_default ? this.state.filterPokemons[item].sprites.other.dream_world.front_default : this.state.filterPokemons[item].sprites.other['official-artwork'].front_default)}
                                        />
                                    ))
                            }
                        </div>
                    </div>
                    {this.state.noDataFound && <div className="no_data noselect">
                        Pokedex has not recorded that pokemon!
                    </div>}
                    <Footer />
                </div>}
            </>
        )
    }
};

export default App;