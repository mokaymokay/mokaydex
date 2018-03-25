const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon/";
// const POKEMON_URL = "http://pokeapi.salestock.net/api/v2/pokemon"; // backup url

class Trainer {
  constructor(name) {
    this.name = name;
    this.pokedex = [];
  }

  all() {
    return this.pokedex;
  }

  get(pokemon) { // pass in pokemon name as a string
    for (var i = 0; i < this.pokedex.length; i++) {
      if (this.pokedex[i].name === pokemon) { return this.pokedex[i] }
    }
  }

  show(i = 0) {
    let $pokeNameId = $(`<h2>${this.pokedex[i].name}</h2><h2>no: ${this.pokedex[i].id}</h2>`);
    $("#name-display").append($pokeNameId);
    let $defense = $(`<h3>defense: ${this.pokedex[i].defense}</h3>`);
    let $attack = $(`<h3>attack: ${this.pokedex[i].attack}</h3>`)
    let $hp = $(`<h3>HP: ${this.pokedex[i].hp}</h3>`)
    $("#info-display").append($hp).append($attack).append($defense);
    $("#info-display").append("</br><h3>abilities:</h3>");
    for (var a = 0; a < this.pokedex[i].abilities.length; a++) {
      $("#info-display").append(`<h3>${this.pokedex[i].abilities[a]}</h3>`);
    }
    let $image = $(`<img class="pokemon-image" src="${this.pokedex[i].image}" alt="${this.pokedex[i].name}">`);
    $("#image-display").append($image);
  }
}

class Pokemon {
  constructor(id, name, defense, attack, hp, abilities, image) {
    this.id = id;
    this.name = name;
    this.defense = defense;
    this.attack = attack;
    this.hp = hp;
    this.abilities = abilities;
    this.image = image;
  }
}

function createPokemon(id) {
  return $.ajax({
    url: POKEMON_URL + id,
    dataType: 'json',
    type: "GET",
  }).done(function(data) {
      console.log("success!");
      name = data.name;
      defenseStat = data.stats[3].base_stat;
      attackStat = data.stats[4].base_stat;
      hpStat = data.stats[5].base_stat;
      let sortAbilities = function() {
        let abilities = [];
        for (var i = 0; i < data.abilities.length; i++) {
          abilities.push(data.abilities[i].ability.name);
        }
        return abilities;
      }
      abilities = sortAbilities();
      image = data.sprites.front_default;
      let myPokemon = new Pokemon(id, name, defenseStat, attackStat, hpStat, abilities, image);
      newTrainer.pokedex.push(myPokemon);
  }).fail(function() {
      alert("404 not found");
  });
}

let newTrainer = new Trainer("mokaymon");
createPokemon(130).done(function() {
  newTrainer.show();
})

createPokemon(131).done(createPokemon(143));

  // $( "#name-display" ).click(function() {
  //   newTrainer.show();
  // });
