Crafty.scene("Menu", function() {

	// var num = 0;
	// var frame;
	// var once = false;

	// var t = Crafty.e("Writing")
	// 	.attr({y:300})
	// 	.textFont({size: "20px"})
	// 	.text(num);

	// t.bind("EnterFrame", function(e) {
	// // 	time = e.dt;
	// 	if (!once) {
	// 		frame = e.frame;
	// 		once = true;
	// 	}

	// 	// 	//if time is miliseconds, then I want update every 1000
	// 	// 	//in case of 20 between frame, then 1000/20 = 50. So every 50 frames update(1000 / time)
	// 	if ((e.frame - frame) %  (1000 / e.dt) == 0) {
	// 		t.text(num++);
	// 			// console.log(e.frame);
	// 	}
	// // 	// console.log(e.frame);
	// });





	Crafty.e("Header")
	.text("Menu");



	var startGame = Crafty.e("MenuItem")
	.text("Select Level")
	.attr({y: 80})
	.bind("newScene", function() {
		Crafty.scene("LevelSelect");
	});

	var twoPlayer = Crafty.e("MenuItem")
	.text("Two Player Mode")
	.attr({y:130})
	.bind("newScene", function() {
		Crafty.scene("TwoPlayerMode");
	});

	var seeRules = Crafty.e("MenuItem")
	.text("How to Play")
	.attr({y: 180})
	.bind("newScene", function() {
		Crafty.scene("Rules");
	});

	var seeCredits = Crafty.e("MenuItem")
	.text("Credits")
	.attr({y: 230})
	.bind("newScene", function() {
		Crafty.scene("Credits");
	});

	var array = [
	startGame,
	twoPlayer,
	seeRules,
	seeCredits
	];


	Game.menuSelection(array);

});



Crafty.scene("Loading", function() {
	Crafty.e("Header")
	.text("Loading Screen");
	// .textFont({size: "50px"})
	// .textAlign("center");


	var loader = {
		"audio": {
    		"background" : "assets/Undyne.mp3",
    		"hit" : "assets/Beep.wav",
    		"impact" : "assets/Impact.mp3",
    		"menuChange" : "assets/Beep4.mp3",
    		"menuEnter" : "assets/MenuSelect.mp3",
    		"lose" : "assets/GameOver.mp3",
    		"dog" : "assets/Dog.mp3",
    		"trueHero" : "assets/TrueHero.mp3",
    		"win" : "assets/Showtime.mp3"
    	},

		"sprites" : {

			"assets/upDownArrows.png" : {
				"tile" : 70,
				"tileh" : 100,
				"map" : {
					"downBlue" : [0, 0],
					"upBlue" : [0, 1]
				}
			},

			"assets/rightLeftArrows.png" : {
				"tile" : 100,
				"tileh" : 70,
				"map" : {
					"leftBlue" : [0, 0],
					"rightBlue" : [0, 1]
				}
			},

			"assets/shieldGame.png" : {
				"tile" : 100,
				"tileh" : 100,
				"map" : {
					"rightShield" : [0, 0],
					"leftShield" : [1, 0],
					"topShield" : [0, 1],
					"bottomShield" : [1, 1]
				}
			}

			

			// "assets/tpShield.png" : {
			// 	"tile" : 50,
			// 	"tileh" : 7,
			// 	"map" : {
			// 		"topBottomShield" : [0,0]
			// 	}
			// }

			// "assets/upDownShield.png" : {

			// 	"tile" : 100,
			// 	"tileh" : 10,
			// 	"map" : {
			// 		 "topShield" : [0, 0],
			// 		 "bottomShield" : [0, 1]
			// 	}
			// },

			// "assets/rightLeftShield.png" : {

			// 	"tile" : 10,
			// 	"tileh" : 100,
			// 	"map" : {
			// 		 "rightShield" : [0, 0],
			// 		 "leftShield" : [0, 1]
			// 	}
			// }
		}
	};


	Crafty.load(loader, function() {
		Crafty.scene("Menu");
	});
});

Crafty.scene("LevelSelect", function() {
	Crafty.e("Header")
	.text("Level Selection");

	var level1 = Crafty.e("MenuItem")
	.text("A level")
	.attr({y: 80})
	.bind("newScene", function() {
		Crafty.scene("Game", p1());
	});

	var level2 = Crafty.e("MenuItem")
	.text("Another level")
	.attr({y: 130})
	.bind("newScene", function() {
		Crafty.scene("Game", p2());
	});

	var level3 = Crafty.e("MenuItem")
	.text("Last Game level")
	.attr({y: 180})
	.bind("newScene", function() {
		Crafty.scene("Game", p3());
	});

	var goBack = Crafty.e("ReturnButton")
	.text("Return to menu")
	.bind("newScene", function() {
		Crafty.scene("Menu");
	});

	var array = [
	level1,
	level2,
	level3,
	goBack
	];

	Game.menuSelection(array);
});

Crafty.scene("Rules", function() {
	Crafty.e("Header")
	.text("Rules");

	var rules = Crafty.e("Writing")
	.text("you got here!! to the rules!");

	var temporarySpeech = "It's basically just an Undyne simulator, just use the arrow keys" +
	" to control the shield to avoid getting hit. Just reload the page to return to the menu." +
	" You can pause with the space bar but it makes things go funny- something I'll fix later" +
	". two player mode uses the AWSD as arrow keys to shoot arrows. You can also use 1 2 3" +
	" to change the speed of the arrows you are shooting."

	var message = Crafty.e("Writing")
	.text(temporarySpeech)
	.textFont({size : "20px"})
	.attr({y: 100});

	var goBack = Crafty.e("ReturnButton")
	.text("Return to menu")
	.bind("newScene", function() {
		Crafty.scene("Menu");
	});

	var array = [goBack];


	Game.menuSelection(array);
});


Crafty.scene("Credits", function() {
	Crafty.e("Header")
	.text("Credits");

	Crafty.e("Writing").text("Tara did this.");

	var goBack = Crafty.e("ReturnButton")
	.text("Return to menu")
	.bind("newScene", function() {
		Crafty.scene("Menu");
	});

	var array = [goBack];


	Game.menuSelection(array);
});




Crafty.scene("Game Over", function(time) { //acts funny when play again and last time arrows still going
	Crafty.e("Header")
	.text("You lost!");

	Crafty.e("Writing")
	.text("you lost, and lasted " + time + " seconds");

	var playAgain = Crafty.e("MenuItem")
	.text("Play again")
	.textAlign("center")
	.attr({y: 100, x: 0}) //since automatically 20, doesn't center right
	.bind("newScene", function() {
		Crafty.audio.stop("lose"); //need to stop winning music if switch scene
		Crafty.scene("Game", Game.pattern);
	});

	var returnMenu = Crafty.e("MenuItem")
	.text("Return to menu")
	.textAlign("center")
	.attr({y: 150, x: 0})
	.bind("newScene", function() {
		Crafty.audio.stop("lose");
		Game.pattern = []; //reset pattern to nothing
		Crafty.scene("Menu");
	});

	var array = [playAgain, returnMenu];

	Game.menuSelection(array);

	//reset all values so can replay except pattern, which is only reset if return to menu

	Game.closest = 0;
	Game.arrowCount = 0;
	Game.doneLevel = false;
	Game.hp = 10;

	Crafty.audio.stop("background");
	Crafty.audio.play("lose", -1);
});

Crafty.scene("Win", function(number) {
	Crafty.e("Header")
	.text("You won!");

	Crafty.e("Writing")
	.text("You lasted " + number + " arrows")
	.textAlign("center")
	.textFont({size: "30px"})
	.attr({y: 50});

	var playAgain = Crafty.e("MenuItem")
	.text("Play again")
	.textAlign("center")
	.attr({y: 100, x: 0}) //since automatically 20, doesn't center right
	.bind("newScene", function() {
		Crafty.audio.stop("win"); //need to stop winning music if switch scene
		Crafty.scene("Game", Game.pattern);
	});

	var returnMenu = Crafty.e("MenuItem")
	.text("Return to menu")
	.textAlign("center")
	.attr({y: 150, x: 0})
	.bind("newScene", function() {
		Crafty.audio.stop("win");
		Game.pattern = []; //reset pattern to nothing
		Crafty.scene("Menu");
	});

	var array = [playAgain, returnMenu];

	Game.menuSelection(array);

	//reset all values so can replay except pattern, which is only reset if return to menu

	Game.closest = 0;
	Game.arrowCount = 0;
	Game.doneLevel = false;
	Game.hp = 10;

	Crafty.audio.stop("background");
	Crafty.audio.play("win", -1);

});

