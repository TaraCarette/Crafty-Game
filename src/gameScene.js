Crafty.scene("Game", function(pattern) {

	Crafty.audio.play("background", -1, 0.75);

	Game.pattern = pattern; //so everything can access chosen pattern


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
	// .reel("top", 1, [0, 1])
	// .reel("bottom", 1, [1, 1])
	// .reel("right", 1, [0, 0])
	// .reel("left", 1, [1, 0]);
	// .reel("topBottom", 1, [[0, 4]])
	// .reel("leftRight", 1, [[1, 4]]);

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
		this.text("hp: " + Game.hp + "/10");
		if (Game.hp == 0) {
			Crafty.scene("Game Over", time);
		}
	});


	// will pause game on space bar
	//Note: lots of weird stuff happens when paused since function call keeps going
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
	var once = false;
	var frame;

	var timer = Crafty.e("Writing")
	.textFont({size : '20px'})
	.attr({y: Game.grid.length - 25, x: 5}); //not clinging to edge

	timer.bind("EnterFrame", function(e) {
	// 	time = e.dt;
		if (!once) {
			frame = e.frame;
			once = true;
		}

		// 	//if time is miliseconds, then I want update every 1000
		// 	//in case of 20 between frame, then 1000/20 = 50. So every 50 frames update(1000 / time)
		if ((e.frame - frame) %  (1000 / e.dt) == 0) {
			timer.text(time++);
				// console.log(e.frame);
		}
	// 	// console.log(e.frame);
	});


	// function updateTimer() {
	// 	timer.text(time);
	// 	time++;
	// 	waitSecond();
	// }

	// function waitSecond() {
	// 	setTimeout(function() {
	// 		updateTimer();
	// 	}, 1000);
	// }


	//variables to only activate things once
	// var twoPlayerMode = false;
	// var patternStarted = false;




    var speed = 150; //gonna need changing
	var i = 0; //tracker for normal pattern
	var arrowTime = 400; //default for slow is 400

	var randomPattern = [];
	var randomNumber;
	var randomDirection;
	var k = 0; //tracker for random pattern
	var activateRandom= false; //keep false until get signal for random section

	var aW = Game.grid.length / 80 * 3; //so 15//(Game.grid.tileSize / 8) * 4;//Game.grid.tileSize / 8; //should be fatter for sprite
	var aH = Game.grid.length / 80 * 4; //so 20//(Game.grid.tileSize / 8) * 5;//aW * 5;
	var aX = ((Game.grid.tileAmount / 2) * Game.grid.tileSize) - (aW / 2);
	var aY = -aH; //but at 2 and 4, want touching edge since draws from left corner


	function directionShoot(dir) {

		if (dir == 0) {
			setTimeout(function() {
				shooter();
			}, arrowTime);
		} else if (dir == 1) {
			//from top
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

			setTimeout( function() {
				shooter();
			}, arrowTime);

		} else if (dir == 2) {
			//from right
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

			setTimeout( function() {
				shooter();
			}, arrowTime);

		} else if (dir == 3) {
			//from bottom
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

			setTimeout( function() {
				shooter();
			}, arrowTime);

		} else if (dir == 4) {
			//from left
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

			setTimeout( function() {
				shooter();
			}, arrowTime);

		} else if (dir == 5) {
			//change speed to slow
			speed = 60;
			arrowTime = 300; //400
			//then continue to shoot next immediately since speed change should take no time
			shooter();
		} else if (dir == 6) {
			//change speed to normal
			speed = 120; //150
			arrowTime = 500;
			shooter();
		} else if (dir == 7) {
			//change speed to fast
			speed = 330;
			arrowTime = 250; //300
			shooter();

		} else if (dir == 9) { //Game for dogsong
			speed = 300;
			arrowTime = 530;
			shooter();

		} else if (dir == 8) {
			activateRandom = true;

			for (var j = 0; j < pattern[i]; j++){ //since the dir is i-1
				randomNumber = 10 * Math.random();	

				if (randomNumber < 2.5) {
					randomDirection = 1;
				} else if (randomNumber < 5.0) {
					randomDirection = 2;
				} else if (randomNumber < 7.5) {
					randomDirection = 3;
				} else if (randomNumber < 10) {
					randomDirection = 4;	
				}
		
			randomPattern.push(randomDirection);

		} 
		i = i + 1; //setting it to next number on normal pattern for later

		shooter();
			
		}


	}


	function shooter() {
		patternStarted = true; //remanents from twoplayer mode- CLEAN UP!
		randomFinish = false;
		if (!activateRandom) {
			if (i == pattern.length - 1) { //if on last arrow, mark it
				Game.doneLevel = true; 
			}
			if (i < pattern.length){
				i++;
				directionShoot(pattern[i - 1]);
			} 

		} else { //when random has been activated
			if (i == pattern.length) { //i is moved to where none will exist if nothing after random so no -1
				randomFinish = true; //marks end of random with last arrow if nothing after random
			}
			if (k == randomPattern.length - 1 && randomFinish) {//when last arrow of random plus random is last, then final mark
					Game.doneLevel = true;
			}
			if (k < randomPattern.length) { //normal random firing function
				k++;
				directionShoot(randomPattern[k - 1]);				
			} else if (!Game.doneLevel) { //only runs if more pattern after random
				activateRandom = false;
				k = 0; //reseting k for another random
				randomPattern = []; //reseting random pattern
				shooter(); //needs to fo through shooter again to mark last if required

			}
		}
		
	}

	shooter(); //will start game immediately when on this scene
	// updateTimer(); //start timer immediately

});
	