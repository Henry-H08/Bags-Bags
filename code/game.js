loadRoot('https://kaboomjs.com/');

loadSprite("bean", "sprites/bean.png")
loadSprite("coin", "sprites/coin.png")
loadSprite("spike", "sprites/spike.png")
loadSprite("grass", "sprites/grass.png")
loadSprite("ghosty", "sprites/ghosty.png")
loadSprite("portal", "sprites/portal.png")
loadSprite("steel", "sprites/steel.png")
loadSprite("bag", "sprite/bag.png")

 

const SPEED = 480;

var grav = 2400;

var key = 0;




onUpdate(() => {
   setGravity(grav);
});



const level = addLevel([
	
	"==!!===========!!====",
	"=      #            =",
	"=                   =",
	"=                   =",
	"=@      ^^^ $      &=",
	"=====================",
], {
	
	
	tileWidth: 64,
	tileHeight: 64,

	pos: vec2(10, 200),

	tiles: {
		"@": () => [
			sprite("bean"),
			area(),
			body(),
			anchor("bot"),
			"player",
		],
		"=": () => [
			sprite("grass"),
			area(),
			body({ isStatic: true }),
			anchor("bot"),
		],
		"$": () => [
			sprite("coin"),
			area(),
			anchor("bot"),
			"coin",
		],
		"^": () => [
			sprite("spike"),
			area(),
			anchor("bot"),
			"danger",
		],
		"&": () => [
			sprite("portal"),
			area(),
			anchor("bot"),
			"portal",
		],
		"!": () => [
			sprite("spike"),
			area(),
			anchor("bot"),
			rotate(180),
			"danger",
		],
		"#": () => [
			sprite("bag"),
			area(),
			anchor("bot"),
			"bag",
		],
	},
})



const player = level.get("player")[0]


onKeyPress("space", () => {
	grav = grav * -1
	debug.log(grav)
	player.jump()


		
	
})

onKeyDown("left", () => {
	player.move(-SPEED, 0)
})

onKeyDown("right", () => {
	player.move(SPEED, 0)
})


player.onCollide("danger", () => {
	player.pos = level.tile2Pos(1,3)
	grav = Math.abs(grav);
})

var key = 0;

player.onCollide("coin", (coin) => {
	destroy(coin)
	 key = 1;
	debug.log(key)
	
	
})

var score = 0;

player.onCollide("bag", (bag) => {
	destroy(apple)
	 score = score + 1;
	 debug.log(score)



})

var end = 0;

player.onCollide("portal", (portal) => {
		if (key == 1) {
			end = end + 1;
			debug.log(end);
		}
})
