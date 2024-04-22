// Set up player state and dropdown menu
let playerState = "idle";
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", (e) => {
	playerState = e.target.value;
});

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let gameSpeed = 0;
const numberOfEnemies = 20;
const enemiesArray = []; // Array to store enemy objects

// Set up speed slider
const slider = document.getElementById("speed");
slider.value = gameSpeed;
slider.addEventListener("change", (e) => {
	gameSpeed = e.target.value;
});

// Load background images

const backGroundLayer1 = new Image();
backGroundLayer1.src = "./assets/layer_01.png";
const backGroundLayer2 = new Image();
backGroundLayer2.src = "./assets/layer_02.png";
const backGroundLayer3 = new Image();
backGroundLayer3.src = "./assets/layer_03.png";
const backGroundLayer4 = new Image();
backGroundLayer4.src = "./assets/layer_04.png";
const backGroundLayer5 = new Image();
backGroundLayer5.src = "./assets/layer_05.png";
// Wait for images to load before starting the game
window.addEventListener("load", () => {
	class Layer {
		constructor(image, speedModifier) {
			this.x = 0;
			this.y = 0;
			this.width = 2048;
			this.height = CANVAS_HEIGHT;
			this.image = image;
			this.speedModifier = speedModifier;
			this.speed = gameSpeed * this.speedModifier;
		}
		update() {
			this.speed = gameSpeed * this.speedModifier;
			this.x = (this.x - this.speed) % this.width; //loop the background
		}
		draw() {
			ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
			ctx.drawImage(
				this.image,
				this.x + this.width,
				this.y,
				this.width,
				this.height
			);
		}
	}

	const layer1 = new Layer(backGroundLayer1, 0.2);
	const layer2 = new Layer(backGroundLayer2, 0.4);
	const layer3 = new Layer(backGroundLayer3, 0.6);
	const layer4 = new Layer(backGroundLayer4, 0.8);
	const layer5 = new Layer(backGroundLayer5, 1);

	const backgroundLayers = [layer1, layer2, layer3, layer4, layer5];

	// Create enemy objects
	const enemyImg = new Image();
	enemyImg.src = "./assets/enemy.png";
	class Enemy {
		constructor() {
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height;
			this.speed = Math.random() * 4 - 2;
			this.enemyWidth = 136.5;
			this.enemyHeight = 141;
			this.width = this.enemyWidth;
			this.height = this.enemyHeight;
			this.frame = 0;
			this.flapSpeed = Math.floor(Math.random() * 3 + 1);
		}
		update() {
			this.x += this.speed;
			this.y += this.speed;

			// Animate enemies

			if (gameFrame % this.flapSpeed === 0) {
				this.frame >= 12 ? (this.frame = 0) : this.frame++;
			}
		}
		draw(color) {
			ctx.fillStyle = this.color = color;
			ctx.drawImage(
				enemyImg,
				this.frame * this.enemyWidth,
				0,
				this.enemyWidth,
				this.enemyHeight,
				this.x,
				this.y,
				this.width,
				this.height
			);
		}
	}

	// Create enemy objects
	for (let i = 0; i < numberOfEnemies; i++) {
		enemiesArray.push(new Enemy());
	}

	// Create Monster

	const monsterImg = new Image();
	monsterImg.src = "./assets/monster_walking.png";

	class Monster {
		constructor() {
			this.x = 1800;
			this.y = 655;
			this.speed = 2;
			this.monsterWidth = 655;
			this.monsterHeight = 534;
			this.width = this.monsterWidth * 0.5;
			this.height = this.monsterHeight * 0.5;
			this.frame = 0;
			this.walkSpeed = 2;
		}
		update() {
			this.x -= this.speed;

			// Animate monsters
			if (gameFrame % this.walkSpeed === 0) {
				this.frame >= 12 ? (this.frame = 0) : this.frame++;
			}
		}
		draw(color) {
			ctx.fillStyle = this.color = color;
			ctx.drawImage(
				monsterImg,
				this.frame * this.monsterWidth,
				0,
				this.monsterWidth,
				this.monsterHeight,
				this.x,
				this.y,
				this.width,
				this.height
			);
		}
	}

	// Create monster
	const monster = new Monster();

	// Create player objects

	const playerImg = new Image();

	playerImg.src = "./assets/player.png";
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
		backgroundLayers.forEach((layer) => {
			layer.update();
			layer.draw();
		});

		// Draw player
		let position = Math.floor(
			(gameFrame / staggerFrames) % spriteAnimation[playerState].loc.length
		);
		let frameX = position * spriteWidth;
		let frameY = spriteAnimation[playerState].loc[position].y;
		ctx.drawImage(
			playerImg,
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

		// Update and Draw enemies
		enemiesArray.forEach((enemy) => {
			enemy.update();
			enemy.draw();
		});

		// Update and Draw monster
		monster.update();
		monster.draw();

		// Update game state
		requestAnimationFrame(animate);
	}

	animate();
});
