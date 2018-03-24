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
}

class Pokemon {
  constructor(id, name, defense, attack, hp, abilities) {
    this.id = id;
    this.name = name;
    this.defense = defense;
    this.attack = attack;
    this.hp = hp;
    this.abilities = abilities;
  }
}

function createPokemon(id) {
  $.ajax({
    url: POKEMON_URL + id,
    dataType: 'json',
    type: "GET",
    success: function(data) {
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
      let myPokemon = new Pokemon(id, name, defenseStat, attackStat, hpStat, abilities);
      newTrainer.pokedex.push(myPokemon);
    },
    error: function() {
      alert("404 not found");
    }
  })
}

let newTrainer = new Trainer("mokaymon");
let squad = [130, 131, 143];
for (var i = 0; i < squad.length; i++) {
  createPokemon(squad[i]);
}

// let $pokeNameId = $(`<h2>${data.name}</h2><h2>no: ${data.id}</h2>`);
// $("#name-display").append($pokeNameId);
// let $defense = $(`<h3>${data.stats[3].stat.name}: ${data.stats[3].base_stat}</h3>`);
// let $attack = $(`<h3>${data.stats[4].stat.name}: ${data.stats[4].base_stat}</h3>`)
// let $hp = $(`<h3>${data.stats[5].stat.name.toUpperCase()}: ${data.stats[5].base_stat}</h3>`)
// $("#info-display").append($hp).append($attack).append($defense);
// let abilities = data.abilities;
// $("#info-display").append("</br><h3>abilities:</h3>");
// $(abilities).each(function(i) {
//   $("#info-display").append(`<h3>${this.ability.name}</h3>`);
// })

// $(document).ready(function () {
// })
