loadRoot('https://kaboomjs.com/');

loadSprite("bean", "sprites/bean.png")
loadSprite("coin", "sprites/coin.png")
loadSprite("spike", "sprites/spike.png")
loadSprite("grass", "sprites/grass.png")
loadSprite("ghosty", "sprites/ghosty.png")
loadSprite("portal", "sprites/portal.png")
loadSprite("steel", "sprites/steel.png")


const SPEED = 480

var grav = 2400;






onUpdate(() => {
   setGravity(grav) 
})



const level = addLevel([
	
	"=====================",
	"                     ",
	"                     ",
	"                     ",
	"@        ^ $       & ",
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
	player.pos = level.tile2Pos(0, 0)
})


player.onCollide("coin", (coin) => {
	destroy(coin)
	onUpdate(() => {
	var key = 1;
	debug.log(key)
	})
	
	
})

var end = 0;

player.onCollide("portal", (portal) => {
		if (key == 1) {
			end = end + 1;
			debug.log(end);
		}
})
