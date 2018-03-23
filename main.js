const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon";
// const POKEMON_URL = "http://pokeapi.salestock.net/api/v2/pokemon";

$(document).ready(function () {
  $.ajax({
    url: POKEMON_URL + "/131",
    type: "GET",
    success: function(data) {
      let $pokeNameId = $(`<h2>${data.name}</h2><h2>no: ${data.id}</h2>`);
      $("#name-display").append($pokeNameId);
      let $defense = $(`<h3>${data.stats[3].stat.name}: ${data.stats[3].base_stat}</h3>`);
      let $attack = $(`<h3>${data.stats[4].stat.name}: ${data.stats[4].base_stat}</h3>`)
      let $hp = $(`<h3>${data.stats[5].stat.name.toUpperCase()}: ${data.stats[5].base_stat}</h3>`)
      $("#info-display").append($hp).append($attack).append($defense);
      let abilities = data.abilities;
      $("#info-display").append("</br><h3>abilities:</h3>");
      $(abilities).each(function(i) {
        $("#info-display").append(`<h3>${this.ability.name}</h3>`);
      })
    },
    error: function() {
      alert("404 not found: lapras");
    }
  })

});
