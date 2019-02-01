Game = {

	//have to change length in 2 places for changes, and 2 for tile number
	grid: {
		//square game with length that is changeable 400
		length : 400,

		//need odd number of tiles 11
		tileSize: 400 / 11,

		tileAmount: 11
	},

	doneLevel: false,

	pattern: [], //empty array until select pattern

	closest: 0,

	arrowCount: 0,

	hp: 10,

	menuSelection: function(array) { //lets arrow keys and enter control list

		var selected = 0;

		//defaultly selecting the first item on list
		array[selected].textColor("red");


		Crafty.bind("KeyDown", function(e) {
		if (e.key == Crafty.keys.UP_ARROW) {
			if (selected != 0) {
				Crafty.audio.play("menuChange");
				array[selected].textColor("black"); //switch color back to black
				selected -= 1; //change to focus on new item then turn red
				array[selected].textColor("red");
			}
		} else if (e.key == Crafty.keys.DOWN_ARROW) {
			if (selected != (array.length - 1)) {
				Crafty.audio.play("menuChange");
				array[selected].textColor("black");
				selected += 1;
				array[selected].textColor("red");
			}
		} else if (e.key == Crafty.keys.ENTER) {
			Crafty.unbind("KeyDown"); //doesn't keep trying to do these functions on key presses
			Crafty.audio.play("menuEnter");
			array[selected].trigger("newScene");
		}
	});

	},

	start: function() {

		Crafty.init(Game.grid.length, Game.grid.length);
    	Crafty.background('rgb(249, 223, 125');


    	Crafty.scene("Loading");

    }
}

//do I need this?
function mute() {
	Crafty.audio.toggleMute();
}








