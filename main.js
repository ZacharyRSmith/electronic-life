var BouncingCritter = require('./critters').BouncingCritter;
var Plant = require('./critters').Plant;
var PlantEater = require('./critters').PlantEater;
var Tiger = require('./critters').Tiger;
var UserCritter = require('./critters').UserCritter;
var WallFollower = require('./critters').WallFollower;

var Grid = require('./world').Grid;
var LifelikeWorld = require('./world').LifelikeWorld;
var Vector = require('./world').Vector;
var Wall = require('./world').Wall;
var World = require('./world').World;


// var plan = ["############################",
//             "#o     #    #      o      ##",
//             "#                          #",
//             "#          #####           #",
//             "##         #   #    ##     #",
//             "###           ##     #     #",
//             "#           ###      #     #",
//             "#   ####                   #",
//             "#   ##       o             #",
//             "# o  #         o       ### #",
//             "#    #                     #",
//             "############################"];

// var world = new World(plan, {"#": Wall,
//                              "o": BouncingCritter});

// var world = new LifelikeWorld(
// 		["############",
// 		 "#     #    #",
// 		 "#   ~    ~ #",
// 		 "#  ##      #",
// 		 "#  ##  o####",
// 		 "#          #",
// 		 "############"],
// 		{"#": Wall,
// 		 "~": WallFollower,
// 		 "o": BouncingCritter}
// );

// var world = new LifelikeWorld(
//   ["############################",
//    "#####Y                ######",
//    "##   ***                **##",
//    "#   *##**         **  O  *##",
//    "#    ***     O    ##**    *#",
//    "#       O         ##***    #",
//    "#                 ##**     #",
//    "#   O       #*             #",
//    "#*          #**       O    #",
//    "#***        ##**    O    **#",
//    "##****     ###***       *###",
//    "############################"],
//   {"#": Wall,
//    "O": PlantEater,
//    "*": Plant,
// 	 "Y": UserCritter}
// );

// var userCritter = world.grid.get(new Vector(5, 1));

var world = new LifelikeWorld(
  ["####################################################",
   "#                 ####         ****              ###",
   "#   *  U  ##                 ########       OO    ##",
   "#   *    ##        O O                 ****       *#",
   "#       ##*                        ##########     *#",
   "#      ##***  *         ****                     **#",
   "#* **  #  *  ***      #########                  **#",
   "#* **  #      *               #   *              **#",
   "#     ##              #   O   #  ***          ######",
   "#*            @       #       #   *        O  #    #",
   "#*                    #  ######                 ** #",
   "###          ****          ***                  ** #",
   "#       O                        @         O       #",
   "#   *     ##  ##  ##  ##               ###      *  #",
   "#   **         #              *       #####  O     #",
   "##  **  O   O  #  #    ***  ***        ###      ** #",
   "###               #   *****                    ****#",
   "####################################################"],
  {"#": Wall,
   "@": Tiger,
   "O": PlantEater,
	 "U": UserCritter,
   "*": Plant}
);

var userCritter = world.grid.get(new Vector(7, 2));

var intervalId = setInterval(function(){
	world.turn();
  console.log(world.toString());
	console.log(userCritter);
}, 500);

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
	var directionNames = "n ne e se s sw w nw".split(" "),
			text = text.trim();

	if (text.trim() === 'quit')
		done();

	if (directionNames.indexOf(text) === -1)
		return;

	userCritter.dir = text;
});

function done() {
	console.log('WHY U QUITZ?!?!');
	clearInterval(intervalId);
	process.exit();
}