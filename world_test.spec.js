var Grid = require('./world').Grid;
var Vector = require('./world').Vector;


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
});