var BouncingCritter = require('./critters').BouncingCritter;
var Grid = require('./world').Grid;
var Vector = require('./world').Vector;
var Wall = require('./world').Wall;
var World = require('./world').World;


describe("Grid", function () {
  var grid;

  beforeEach(function() {
    grid = new Grid(5, 5);
  });

  afterEach(function() {
    grid = null;
  });

  it("cannot get a nonexistent vector", function () {
    expect(grid.get(new Vector(1, 1))).toBe(undefined);
  });

  it("can get a vector", function () {
    grid.set(new Vector(1, 1), "X");
		expect(grid.get(new Vector(1, 1))).toBe("X");
  });

	it("should return true from isInside() if passed a valid Vector", function () {
		expect(grid.isInside(new Vector(0, 0))).toBe(true);
	});

	it("should return false from isInside() if passed an invalid Vector", function () {
		expect(grid.isInside(new Vector(-1, 0))).toBe(false);
	});

	it("should call forEach's callback correct num of times", function () {
		for (var i = 0; i < 5; i++) { grid.set(new Vector(i, i), "X"); }

		var c = 0;
		grid.forEach(function () { c += 1; });
		expect(c).toBe(5);
	});
});

describe("World", function () {
	var plan = ["############################",
							"#o     #    #      o      ##",
							"#                          #",
							"#          #####           #",
							"##         #   #    ##     #",
							"###           ##     #     #",
							"#           ###      #     #",
							"#   ####                   #",
							"#   ##       o             #",
							"# o  #         o       ### #",
							"#    #                     #",
							"############################"],
			world;

  beforeEach(function() {
    world = new World(plan, {'#': Wall,
														 'o': BouncingCritter });
  });

  afterEach(function() {
    world = null;
  });

	it("should set grid correctly", function () {
		var vecWithWall = world.grid.get(new Vector(0, 0));
		expect(vecWithWall.constructor).toBe(Wall);
		var vecWithCritter = world.grid.get(new Vector(1, 1));
		expect(vecWithCritter.constructor).toBe(BouncingCritter);
	});

	it("should move critters", function () {
		var vecInitWithCritter = world.grid.get(new Vector(1, 1));
		expect(vecInitWithCritter.constructor).toBe(BouncingCritter);
		world.turn();
		vecInitWithCritter = world.grid.get(new Vector(1, 1));
		expect(vecInitWithCritter).toBe(null);
	});
});