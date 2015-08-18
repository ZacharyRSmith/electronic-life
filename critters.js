var randomElement = require('./_helpers').randomElement;
var Vector = require('./world').Vector;

// CRITTER STUFF:
var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};
var directionNames = "n ne e se s sw w nw".split(" ");

// CRITTER CONSTRUCTORS/PROTOTYPES:
function BouncingCritter() {
  this.direction = randomElement(directionNames);
}
BouncingCritter.prototype.act = function(view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";

  return {type: "move", direction: this.direction};
};

module.exports.BouncingCritter = BouncingCritter;
