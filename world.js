var charFromElement = require('./_helpers').charFromElement;
var elementFromChar = require('./_helpers').elementFromChar;
var randomElement = require('./_helpers').randomElement;


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

function Grid (width, height) {
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
}
Grid.prototype = {
	forEach: function (f, context) {
		for (var x = 0; x < this.width; x++) {
			for (var y = 0; y < this.height; y++) {
				var val = this.space[x + y * this.width];

				if (val)
					f.call(context, val, new Vector(x, y));
			}
		}
	},

	get: function (vector) {
		return this.space[vector.x + this.width * vector.y];
	},

	isInside: function (vector) {
		return vector.x >= 0 && vector.x < this.width &&
					 vector.y >= 0 && vector.y < this.height;
	},

	set: function (vector, value) {
		this.space[vector.x + this.width * vector.y] = value;
	}
};

function Vector (x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype = {
	plus: function (other) {
  	return new Vector(this.x + other.x, this.y + other.y);
	}
};

function View(world, vector) {
  this.world = world;
  this.vector = vector;
}
View.prototype = {
	find: function(char) {
		var found = this.findAll(char);

		if (found.length === 0) return null;

		return randomElement(found);
	},

	findAll: function(char) {
		var found = [];

		for (var dir in directions)
			if (this.look(dir) == char)
				found.push(dir);

		return found;
	},

	look: function(dir) {
		var target = this.vector.plus(directions[dir]);

		if (this.world.grid.isInside(target))
			return charFromElement(this.world.grid.get(target));
		else
			return "#";
	},
};

function Wall() {}

function World (map, legend) {
  var grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;

  map.forEach(function (line, y) {
    for (var x = 0; x < line.length; x++)
      grid.set(new Vector(x, y),
               elementFromChar(legend, line[x]));
  });
}
World.prototype = {
	_checkDestination: function (action, vector) {
		if (!directions.hasOwnProperty(action.direction)) return;

		var dest = vector.plus(directions[action.direction]);

		if (!this.grid.isInside(dest)) return;

		return dest;
	},

	_letAct: function (critter, vector) {
		var action = critter.act(new View(this, vector));

		if (!action || action.type != "move") return;

		var dest = this._checkDestination(action, vector);

		if (!dest || this.grid.get(dest)) return;

		this.grid.set(vector, null);
		this.grid.set(dest, critter);
	},

	toString: function () {
		var output = "";
		for (var y = 0; y < this.grid.height; y++) {
			for (var x = 0; x < this.grid.width; x++) {
				var element = this.grid.get(new Vector(x, y));
				output += charFromElement(element);
			}
			output += "\n";
		}

		return output;
	},

	turn: function () {
		var acted = [];

		this.grid.forEach(function (critter, vector) {

			if (!critter.act || acted.indexOf(critter) !== -1) return;

			acted.push(critter);
			this._letAct(critter, vector);
		}, this);
	}
};

module.exports.Grid = Grid;
module.exports.Vector = Vector;
module.exports.Wall = Wall;
module.exports.World = World;
