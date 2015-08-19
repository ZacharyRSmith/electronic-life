var BouncingCritter = require('./critters').BouncingCritter;
var Grid = require('./world').Grid;
var Vector = require('./world').Vector;
var Wall = require('./world').Wall;
var World = require('./world').World;


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
            "############################"];

var world = new World(plan, {"#": Wall,
                             "o": BouncingCritter});
setInterval(function(){
	world.turn();
  console.log(world.toString());
}, 500);
