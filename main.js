const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon/";
// const POKEMON_URL = "http://pokeapi.salestock.net/api/v2/pokemon/"; // backup url

class Trainer {
  constructor(name) {
    this.name = name;
    this.pokedex = [];
  }

  all() {
    return this.pokedex;
  }

  get(pokemon) { // takes in pokemon name as argument and returns index of pokemon in pokedex
    for (var i = 0; i < this.pokedex.length; i++) {
      if (this.pokedex[i].name === pokemon) {
        return this.show(i);
      }
    }
    return "error";
  }

  // i = index of pokemon in pokedex
  show(i) {
    let $pokeNameId = $(`<h2>${this.pokedex[i].name}</h2><h2>no: ${this.pokedex[i].id}</h2>`);
    $( "#name-display" ).html($pokeNameId);
    let $biometrics = $(`<h3>height: ${this.pokedex[i].height / 10}m</h3><h3>weight: ${this.pokedex[i].weight / 10}kg</h3>`);
    $( "#biometrics" ).html($biometrics);
    let $baseStats = $(`</br><h3>HP: ${this.pokedex[i].hp}</h3><div class="stat-bar" style="width: ${this.pokedex[i].hp * 2}px"></div><h3>attack: ${this.pokedex[i].attack}</h3><div class="stat-bar" style="width: ${this.pokedex[i].attack * 2}px"></div><h3>defense: ${this.pokedex[i].defense}</h3><div class="stat-bar" style="width: ${this.pokedex[i].defense * 2}px"></div>`);
    $( "#base-stats" ).html($baseStats);
    $( "#abilities" ).html("</br><h3>abilities:</h3>" + `<h3>${this.pokedex[i].abilities.join(", ")}</h3>`);
    let $image = $(`<img class="pokemon-image" src="${this.pokedex[i].image}" alt="${this.pokedex[i].name}">`);
    $ ("#image-display" ).html($image);
    $( "#types" ).html("</br><h3>type:</h3>" + `<h3>${this.pokedex[i].type.join("/")}</h3>`);

    let self = this;

    $( "#right-arrow" ).click(function(e) {
      i === self.pokedex.length - 1 ? i = 0 : i++;
      self.show(i);
    });

    $( "#left-arrow" ).click(function() {
      i === 0 ? i = self.pokedex.length - 1 : i--;
      self.show(i);
    });

    if (this.pokedex[i].type.length === 2) {
      $( "#image-display" ).css("background", `linear-gradient(90deg, var(--${this.pokedex[i].type[0]}) 50%, var(--${this.pokedex[i].type[1]}) 50%)`);
    } else {
      $( "#image-display" ).css("background", `var(--${this.pokedex[i].type[0]})`);
    }

  }
}

class Pokemon {
  constructor(id, name, height, weight, defense, attack, hp, abilities, type, image) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.defense = defense;
    this.attack = attack;
    this.hp = hp;
    this.abilities = abilities;
    this.type = type;
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
      let id = data.id;
      let name = data.name;
      let height = data.height;
      let weight = data.weight;
      let defenseStat = data.stats[3].base_stat;
      let attackStat = data.stats[4].base_stat;
      let hpStat = data.stats[5].base_stat;
      let abilities = data.abilities.map(x => x.ability.name);
      let type = data.types.map(x => x.type.name);
      let image = data.sprites.front_default;
      let myPokemon = new Pokemon(id, name, height, weight, defenseStat, attackStat, hpStat, abilities, type, image);
      newTrainer.pokedex.push(myPokemon);
  }).fail(function() {
      if (newTrainer) {
        newTrainer.show(0);
      } else {
        alert("404 not found");
      }
  });
}

let newTrainer = new Trainer("mokaymon");
$.when(createPokemon(130)
  ).done(
    createPokemon(131)
  ).done(
    createPokemon(143)
  ).done(function() {
    $("#image-preloader").hide()
    newTrainer.show(0); // pass in 0 by default to show first pokemon in pokedex
});

function toggleStats() {
  if ($( "#hide-yo-stats" ).css('display') == 'none') {
    $( "#hide-yo-stats" ).slideDown(800);
  } else {
    $( "#hide-yo-stats" ).hide();
  }
}

$( "#stats-button" ).click(function() {
  toggleStats();
})

$( "#add-button" ).click(function(e) {
  e.preventDefault();
  let pokemon = $( "#add-input-field" ).val().toLowerCase();
  // hide current data and show preloader
  $( "#add-input-field" ).val("");
  $( "img, h2, #hide-yo-stats" ).hide();
  $( "#image-display" ).css("background", "#FFF");
  $( "#image-preloader" ).show();
  createPokemon(pokemon).done(function() {
    // show current data and hide preloader
    $( "#image-preloader" ).hide();
    toggleStats();
    newTrainer.show(newTrainer.pokedex.length - 1);
  })
})

$( "#show-button" ).click(function(e) {
  e.preventDefault();
  let pokemon = $( "#show-input-field" ).val().toLowerCase();
  $( "#show-input-field" ).val("");
  newTrainer.get(pokemon);
  if ( newTrainer.get(pokemon) === "error") {
    $( "#show-input-field" ).val("Not found");
  }
})
