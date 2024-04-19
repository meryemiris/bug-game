let playerState = "run";

const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", (e) => {
	playerState = e.target.value;
});

// Get the canvas and context

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// Create background objects
let gameSpeed = 5;
const backGroundLayer1 = new Image();
backGroundLayer1.src = "layer_01.png";
const backGroundLayer2 = new Image();
backGroundLayer2.src = "layer_02.png";
const backGroundLayer3 = new Image();
backGroundLayer3.src = "layer_03.png";
const backGroundLayer4 = new Image();
backGroundLayer4.src = "layer_04.png";
const backGroundLayer5 = new Image();
backGroundLayer5.src = "layer_05.png";

// Create player objects

const playerImg = new Image();

playerImg.src = "player.png";
const spriteWidth = 330;
const spriteHeight = 221;
let gameFrame = 0;
const staggerFrames = 5;

const spriteAnimation = [];
const animationStates = [
	{ name: "idle", frames: 7 },
	{ name: "run", frames: 13 },
	{ name: "jump", frames: 11 },
	{ name: "fall", frames: 11 },
	{ name: "dizzy", frames: 21 },
	{ name: "gethit", frames: 11 },
	{ name: "attack", frames: 16 },
];

animationStates.forEach((state, index) => {
	let frames = { loc: [] };
	for (let i = 0; i < state.frames; i++) {
		let positionX = i * spriteWidth;
		let positionY = index * spriteHeight;

		frames.loc.push({ x: positionX, y: positionY });
	}
	spriteAnimation[state.name] = frames;
});

// Animation loop

function animate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	// Draw background layers
	ctx.drawImage(backGroundLayer1, 0, 0);
	ctx.drawImage(backGroundLayer2, 0, 0);
	ctx.drawImage(backGroundLayer3, 0, 0);
	ctx.drawImage(backGroundLayer4, 0, 0);
	ctx.drawImage(backGroundLayer5, 0, 0);

	// Draw player
	let position = Math.floor(
		(gameFrame / staggerFrames) % spriteAnimation[playerState].loc.length
	);
	let frameX = position * spriteWidth;
	let frameY = spriteAnimation[playerState].loc[position].y;
	ctx.drawImage(
		playerImage,
		frameX,
		frameY,
		spriteWidth,
		spriteHeight,
		0,
		700,
		spriteWidth,
		spriteHeight
	);
	if (gameFrame % staggerFrames === 0) {
		if (frameX < 6) frameX++;
		else frameX = 0;
	}
	gameFrame++;

	requestAnimationFrame(animate);
}

animate();
