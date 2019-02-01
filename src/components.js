Crafty.c("Player", {
	init : function() {
		this.addComponent("2D, Canvas, Player, Collision, Color")
		.attr({hp: Game.hp})
		.color("red")
		.onHit("Arrow", function() {
			Game.hp--;
			this.hp = Game.hp; 
		});
	}
});


Crafty.c("Shield", {
	init : function() {
		this.addComponent("2D, Canvas, Shield");
		// .color("green");
	}
});

Crafty.c("Arrow", {
	init : function() {
		this.requires("2D, Canvas, Collision") 
		.attr({sp: (Game.grid.length / 400) * 3, number: Game.arrowCount, switched: false, last: Game.doneLevel}) //still need default sp?
		.onHit("Shield", function() {
			this.destroy();
			Game.closest++;
			Crafty.audio.play("hit");
			if (this.last) {
				//delay switch for a second
				setTimeout( function() {
					Crafty.scene("Win", Game.arrowCount);
				}, 200);
				
			}
			
		})
		.onHit("Player", function() {
			this.destroy();
			Game.closest++;
			Crafty.audio.play("impact");
			if (this.last && Game.hp > 0) { // > in case goes down really fast and goes negative
				//delay switch for a second
				setTimeout( function() {
					Crafty.scene("Win");
				}, 200);
				
			}

		})
	}


});

Crafty.c("Writing", {
	init: function() {
		this.requires("2D, DOM, Text")
		.textFont({family: "Ar Essence"})
		.attr({w: Game.grid.length, h: Game.grid.length}); //to make positioning relative to full screen by default
	}
});

Crafty.c("MenuItem", {
	init: function() {
		this.requires("2D, DOM, Text")
		.attr({w: Game.grid.length, h: Game.grid.length, y: 20, x:20}) //adjust more
		.textFont({size: "20px", family: "Ar Essence"}); //size relative
	}
});

Crafty.c("ReturnButton", {
	init: function() {
		this.requires("2D, DOM, Text")
		.attr({w: Game.grid.length - 20, y: Game.grid.length - 40})
		.textAlign("right")//, y: 20, x:20}) //adjust more
		.textFont({size: "20px", family: "Ar Essence"}); //size relative
	}
});

Crafty.c("Header", {
	init: function() {
		this.requires("2D, DOM, Text")
		.textAlign("center")
		.textFont({size: "40px", family: "Ar Essence"})
		.attr({w: Game.grid.length, h: Game.grid.length, y: 5}); //to make positioning relative to full screen by default
	}
});

