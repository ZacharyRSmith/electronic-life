var randomElement = require('./_helpers').randomElement;
var Vector = require('./world').Vector;

// CRITTER STUFF:
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
