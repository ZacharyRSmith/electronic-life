var randomElement = require('./_helpers').randomElement;
var Vector = require('./world').Vector;

// CRITTER HELPERS:
var directionNames = "n ne e se s sw w nw".split(" ");

function dirPlus(dir, n) {
  var index = directionNames.indexOf(dir);
  return directionNames[(index + n + 8) % 8];
}

// CRITTER CONSTRUCTORS/PROTOTYPES:
function BouncingCritter() {
  this.dir = randomElement(directionNames);
}
BouncingCritter.prototype.act = function(view) {
  if (view.look(this.dir) != " ")
    this.dir = view.find(" ") || "s";

  return {type: "move", direction: this.dir};
};

function Plant() {
  this.energy = 3 + Math.random() * 4;
}
Plant.prototype.act = function(view) {
  if (this.energy > 15) {
    var space = view.find(" ");
    if (space)
      return {type: "reproduce", direction: space};
  }
  if (this.energy < 20)
    return {type: "grow"};
};

function PlantEater () {
  this.energy = 20;
}
PlantEater.prototype = {
	act: function (view) {
		var space = view.find(" ");

		if (!space)
			return;

		if (this.energy > 60)
			return {type: "reproduce", direction: space};

		var plant = view.find("*");

		if (plant)
			return {type: "eat", direction: plant};

		return {type: "move", direction: space};
	}
};

function Tiger () {
	this.energy = 60;
}
Tiger.prototype = {
	act: function (view) {
		var user = view.find("U");

		if (user)
			return { type: "eat", direction: user };

		var plantEater = view.find("O");

		if (plantEater)
			return { type: "eat", direction: plantEater };

		var space = view.find(" ");

		if (!space)
			return;

		if (this.energy > 90)
			return {type: "reproduce", direction: space};

		return {type: "move", direction: space};
	}
};

function UserCritter () {
	PlantEater.call(this);
	this.dir = 'e';
}
UserCritter.prototype = Object.create(PlantEater.prototype);
UserCritter.prototype.act = function (view) {
	var action = { type: "move", direction: this.dir },
			destination = view.look(this.dir);

	if (destination === "*")
		action.type = "eat";

	if (this.energy > 60)
		action.type = "reproduce";

	return action;
};

function WallFollower() {
  this.dir = "s";
}
WallFollower.prototype = {
	act: function(view) {
		var start;

		// If there is a wall to the back-left, turn to the left 90* before
		// trying to find an empty space to move to.
		if (view.look(dirPlus(this.dir, -3)) === "#")
			start = this.dir = dirPlus(this.dir, -2);
		else
			start = this.dir;

		while (view.look(this.dir) !== " ") {
			this.dir = dirPlus(this.dir, 1);

			if (this.dir === start) break;
		}

		return {type: "move", direction: this.dir};
	}
};

module.exports.BouncingCritter = BouncingCritter;
module.exports.Plant = Plant;
module.exports.PlantEater = PlantEater;
module.exports.Tiger = Tiger;
module.exports.UserCritter = UserCritter;
module.exports.WallFollower = WallFollower;
