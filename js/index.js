const typeColors = {
    fire: 'radial-gradient(circle, #f8c79b, #f5b278, #f09c55, #eb8532, #e56d00)',
    grass: 'radial-gradient(circle, #22ff00, #19dd03, #11bb04, #099b04, #047c03)',
    fighting: 'radial-gradient(circle, #ffa2a2, #f3817d, #e55f56, #d23b2f, #bc0000)',
    water: 'radial-gradient(circle, #dbdbff, #b8b7ff, #9592ff, #716dff, #4545ff)',
    flying: 'radial-gradient(circle, #fbefff, #e6d4ec, #d1b9d9, #bc9fc6, #a785b3)',
    poison: 'radial-gradient(circle, #ecd0f6, #d9a6ee, #c57be5, #ae4edc, #9400d3)',
    electric: 'radial-gradient(circle, #ffffd9, #fafab1, #f5f586, #efef58, #e9e900)',
    bug: 'radial-gradient(circle, #e9d8a1, #efd990, #f4da7e, #fada6c, #ffdb58)',
    psychic: 'radial-gradient(circle, #f4a2d2, #f494cc, #f486c6, #f476c0, #f366b9)',
    rock: 'radial-gradient(circle, #ffddd9, #ffc6bf, #ffafa5, #fe988b, #fa8072)',
    ice: 'radial-gradient(circle, #c8f9e9, #b7fbe4, #a6fcdf, #93feda, #7fffd4)',
    dragon: 'radial-gradient(circle, #cf9ff2, #ae79d5, #8d55b9, #6c309d, #4b0082)',
    ghost: 'radial-gradient(circle, #e7c7ff, #bc9dd6, #9375ae, #6b4f88, #452c63)',
    dark: 'radial-gradient(circle, #d4b7a1, #c39a7b, #b17d57, #9f6135, #8b4513)',
    steel: 'radial-gradient(circle, #ffffff, #fbf8fd, #fbf0f8, #fde8ef, #ffe0e3)',
    fairy: 'radial-gradient(circle, #fdecef, #fee1e6, #ffd6dd, #ffcbd4, #ffc0cb)',
    stellar: 'radial-gradient(circle, #daf9e4, #b9edca, #98e1af, #76d594, #50c878)',
    normal: 'radial-gradient(circle, #d1d1d1, #bcbcbc, #a7a7a7, #939393, #7f7f7f)',
};

let numberPokemon = 0;
let imagePokemon = document.getElementById('screenImagePokemon');
let pokemonData = document.getElementById("screen-pokemon-data");

const searchPokemon = (id) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(function(response){
        console.log(response)
        response.json()
        .then(function(pokemon){
            addPokemon(pokemon);
            localStorage.setItem("currentPokemon", JSON.stringify(pokemon));
        })
    })
}

const increaseNumber = () =>{
    numberPokemon++;

    imagePokemon.style.display = 'inline';
    pokemonData.style.display = 'none';
    searchPokemon(numberPokemon);
}

const decreaseNumber = () =>{
    numberPokemon--;

    imagePokemon.style.display = 'inline';
    pokemonData.style.display = 'none';
    searchPokemon(numberPokemon);
}

const addPokemon = (pokemon) =>{
    //nombre pokemon
    let dataPokemon  = document.getElementById('namePokemon');
    dataPokemon.textContent = '#' + pokemon.id   + ' ' + pokemon.name;

    //tipo de pokemon
    let type = document.getElementById('pokedex-screen-left');

    type.style.backgroundImage = typeColors[pokemon.types[0].type.name];

    //imagen pokemon
    imagePokemon.setAttribute("src", pokemon.front_default);

    pokemon && pokemon.sprites && pokemon.sprites.front_default
    ?
    imagePokemon.setAttribute("src", pokemon.sprites.front_default)
    :
    console.error("La propiedad 'front_default' no está definida en el objeto 'pokemon'.");
}

const addListStatusPokemon = () =>{
    const currentPokemon = JSON.parse(localStorage.getItem("currentPokemon"));
    
    let abilitiesText = currentPokemon.abilities.map(abilityName => abilityName.ability.name);
    let abilitiesNewText = abilitiesText.join('\n').replace('-', ' ');

    let type = document.getElementById('type');
    let abilities = document.getElementById('abilities');
    let weakness = document.getElementById('weakness');
    let baseExp = document.getElementById('base-exp');
    let weight = document.getElementById('weight');
    let height = document.getElementById('height');

    if(currentPokemon.name && numberPokemon>0){
        type.textContent = `${currentPokemon.types[0].type.name}`;
        abilities.textContent = `${abilitiesNewText}`;
        weakness.textContent = `${currentPokemon.moves[0].move.name.replace('-', ' ')}`;
        baseExp.textContent = `${currentPokemon.base_experience} exp`;
        weight.textContent = `${currentPokemon.weight}kg`;
        height.textContent = `${currentPokemon.height}"`;
    }else{
        numberPokemon = 0;
    }
    
    imagePokemon.style.display = 'none';
    pokemonData.style.display = 'inline';
}
