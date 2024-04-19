let playerState = "idle";

const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", (e) => {
	playerState = e.target.value;
});

// Get the canvas and context

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

const playerImage = new Image();
playerImage.src = "player.png";
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
	let position = Math.floor(
		(gameFrame / staggerFrames) % spriteAnimation[playerState].loc.length
	);
	let frameX = position * spriteWidth;
	let frameY = spriteAnimation[playerState].loc[position].y;

	// Draw the image

	ctx.drawImage(
		playerImage,
		frameX,
		frameY,
		spriteWidth,
		spriteHeight,
		0,
		0,
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
