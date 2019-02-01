// function activateTwoPlayer() {
Crafty.scene("TwoPlayerMode", function() {

	Crafty.audio.play("background", -1, 0.75);


	//in terms of 400 length:
	//player is 40 by 40
	// location is 160 by 160
	//keeping location consistent regardless of size
	var pSide = Game.grid.tileSize;
	var pLocation = ((Game.grid.tileAmount / 2) - 0.5) * pSide;

	var player = Crafty.e("Player")
	.attr({h: pSide, w: pSide, x: pLocation, y: pLocation});

	//currently, exact distances in terms of length being 100:
	//w 50, h 5, x 155, y 150, with 210 AND 150 FOR SIDEWAYS
	//distance from player is 5
	//shield hangs over player by 5 on each side
	//from perspective of when above player
	var sH = pSide  / 8;//Game.grid.length / 80;
	var sW = pSide + (2 * sH);//Game.grid.length / 8;
	var sX = pLocation - ((sW - pSide) / 2);
	var sY = pLocation - (2 * sH);
	var shield = Crafty.e("Shield, Color, SpriteAnimation")
	.attr({w: sW, h: sH, x: sX, y: sY})
	.color("green");

	shield.bind("KeyDown", function(e) {
		if (e.key == Crafty.keys.UP_ARROW) {    			
			this.y = sY;
			this.x = sX;
			this.w = sW;
			this.h = sH;
			// shield.animate("top");
		} else if (e.key == Crafty.keys.DOWN_ARROW) {
			this.y = sY + pSide + (3 * sH);
			this.x = sX;
			this.w = sW;
			this.h = sH;
			// shield.animate("bottom");
		} else if (e.key == Crafty.keys.RIGHT_ARROW) {
			this.y = sX;
			this.x = pLocation + pSide + sH;
			this.w = sH;
			this.h = sW;
			// shield.animate("right");
		} else if (e.key == Crafty.keys.LEFT_ARROW) {
			this.y = sX;
			this.x = pLocation - (2 * sH);
			this.w = sH;
			this.h = sW;
			// shield.animate("left");
		}
	});


	var health = Crafty.e("Writing")
	.textFont({size : '20px'})
	.attr({y: Game.grid.length - 25, w: Game.grid.length - 5}) //not clinging to edge
	.textAlign("right")
	.text("hp : 10/10");

	health.bind("EnterFrame", function() {
		this.text("hp: " + player.hp + "/10");
		if (player.hp == 0) {
			Crafty.scene("Game Over", time);
		}
	});

	Crafty.bind("KeyDown", function(e) {
		if (e.key == Crafty.keys.SPACE) {
			Crafty.audio.togglePause("background");
			Crafty.pause();
			// Crafty.scene("Pause");
		}
		// if (e.key == Crafty.keys.ENTER && !twoPlayerMode && !patternStarted) {
		// 	shooter();
		// 	updateTimer(); //start timer when start game
		// 	//this is a Game
		// 	// Crafty.audio.play("dog");
		// }
		// if (e.key == Crafty.keys.BACKSPACE && !twoPlayerMode && !patternStarted) {
		// 	twoPlayerMode = true;
		// 	activateTwoPlayer();
		// }
	});

	var time = 0;

	var timer = Crafty.e("Writing")
	.textFont({size : '20px'})
	.attr({y: Game.grid.length - 25, x: 5}); //not clinging to edge


	function updateTimer() {
		timer.text(time);
		time++;
		waitSecond();
	}

	function waitSecond() {
		setTimeout(function() {
			updateTimer();
		}, 1000);
	}

	var aW = (Game.grid.tileSize / 8) * 4;//Game.grid.tileSize / 8; //should be fatter for sprite
	var aH = (Game.grid.tileSize / 8) * 5;//aW * 5;
	var aX = ((Game.grid.tileAmount / 2) * Game.grid.tileSize) - (aW / 2);
	var aY = -aH; //but at 2 and 4, want touching edge since draws from left corner

	var speed = 150; //make it normal speed (what 6 does)
	var arrowTime = 500; //normal as well

	Crafty.bind("KeyDown", function(e) {
		if (e.key == Crafty.keys.W) {
			var arrow = Crafty.e("Arrow, Motion, upBlue, SpriteAnimation")
			.reel("closestArrow", 1, [[1, 1]])
			.attr({sp: speed, y: aY, x: aX, w: aW, h: aH});
			
			arrow.velocity().y = arrow.sp;
			Game.arrowCount++;

			arrow.bind("EnterFrame", function() {
				if (Game.closest == arrow.number && !arrow.switched) {
					arrow.animate("closestArrow");
					arrow.switched = true;
				}
			});
		} else if (e.key == Crafty.keys.D) {
			var arrow = Crafty.e("Arrow, Motion, rightBlue, SpriteAnimation")
			.reel("closestArrow", 1, [[1, 1]])
			.attr({sp: speed, y:aX, x: Game.grid.length, w: aH, h: aW});

			arrow.velocity().x = -1 * arrow.sp;
			Game.arrowCount++;

			arrow.bind("EnterFrame", function() {
				if (Game.closest == arrow.number && !arrow.switched) {
					arrow.animate("closestArrow");
					arrow.switched = true;
				}
			});
		} else if (e.key == Crafty.keys.S) {
			var arrow = Crafty.e("Arrow, Motion, downBlue, SpriteAnimation")
			.reel("closestArrow", 1, [[1, 0]])
			.attr({sp: speed, y:Game.grid.length, x: aX, w: aW, h: aH});

			arrow.velocity().y = -1 * arrow.sp;
			Game.arrowCount++;

			arrow.bind("EnterFrame", function() {
				if (Game.closest == arrow.number && !arrow.switched) {
					arrow.animate("closestArrow");
					arrow.switched = true;
				}
			});
		} else if (e.key == Crafty.keys.A) {
			var arrow = Crafty.e("Arrow, Motion, leftBlue, SpriteAnimation")
			.reel("closestArrow", 1, [[1, 0]])
			.attr({sp: speed, y:aX, x: aY, w: aH, h: aW});

			arrow.velocity().x = arrow.sp;
			Game.arrowCount++;

			arrow.bind("EnterFrame", function() {
				if (Game.closest == arrow.number && !arrow.switched) {
					arrow.animate("closestArrow");
					arrow.switched = true;
				}
			});
		} else if (e.key == 49) {
			speed = 60;
			arrowTime = 400;
		} else if (e.key == 50) {
			speed = 150;
			arrowTime = 500;
		} else if (e.key == 51) {
			speed = 350;
			arrowTime = 600;
		}
	});
// }

	updateTimer();
});