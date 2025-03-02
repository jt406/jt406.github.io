var startingHp = 100;
var currHp = startingHp;
var weaponStrength = 2;

window.onload = function() {
  document.getElementById("myText").innerHTML = startingHp;
};

function myFunction() {
  currHp = currHp - weaponStrength;
  document.getElementById("myText").innerHTML = currHp;
}