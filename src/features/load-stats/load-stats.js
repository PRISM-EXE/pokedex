let pokemonStats;
let pokemonName;
let pokemon = [];

// Functions to call when button pressed
let Stats = class {
    constructor(button) {
        this._id;
        this._results;

        this._name;
        this._displayId;
        this._abilities;
        this._types;
        this._stats;
        this._height;
        this._weight;
    }

    getElementId(button) {
        this._id = button.id;
        this._displayId = this._id;
        return this._id;
    }

    getFetchId(button) {
        this.getElementId(button);
        
        let idChars = this._id.slice(-3).split('');

        while(idChars[0] === '0') {
            idChars = idChars.slice(1);
        }

        let idNum = idChars.join('');

        this._id = idNum;
        return this._id;
    }

    async getData(button) {
        this.getFetchId(button);

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this._id}`);
            const data = await response.json();
            this._results = await data;
            // console.log(this._results);
        } catch (err) {
            console.log('Error: ', err);
        }

        return this._results;
    }
}

let getStats = new Stats;



// Event listener to get which button is clicked

gallery.addEventListener('click', async function(event) {
    let target = event.target;
    let parent = target.parentElement;

    while(parent.tagName != 'BUTTON') {
        parent = await parent.parentElement;
    }

    let buttonPressed = parent;

    await getStats.getData(buttonPressed);
    let results = await getStats._results;

    let pokemonName = results.name;
    let pokemonId = results.id;
    let pokemonAbilities = results.abilities;
    let pokemonWeight = results.weight;
    let pokemonHeight = results.height;
    let pokemonStats = results.stats;
    let pokemonTypes = results.types;

    console.log(pokemonName);

    pokemon = [pokemonId, pokemonAbilities, pokemonWeight, pokemonHeight, pokemonStats, pokemonStats];

    return pokemon;
})

export const pokemonInfo = pokemon;