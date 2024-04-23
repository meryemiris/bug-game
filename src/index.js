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

let gameSpeed = 5;
const numberOfEnemies = 3;
const enemiesArray = []; // Array to store enemy objects

// Set up speed slider
const slider = document.getElementById("speed");
slider.value = gameSpeed;
slider.addEventListener("change", (e) => {
	gameSpeed = e.target.value;
});

// Load background images

const backGroundLayer1 = new Image();
backGroundLayer1.src = "./src/assets/layer_01.png";
const backGroundLayer2 = new Image();
backGroundLayer2.src = "./src/assets/layer_02.png";
const backGroundLayer3 = new Image();
backGroundLayer3.src = "./src/assets/layer_03.png";
const backGroundLayer4 = new Image();
backGroundLayer4.src = "./src/assets/layer_04.png";
const backGroundLayer5 = new Image();
backGroundLayer5.src = "./src/assets/layer_05.png";

// Wait for images to load before starting the game
window.addEventListener("load", () => {
	class Layer {
		constructor(image, speedModifier) {
			this.x = 0;
			this.y = 0;
			this.width = 2048;
			this.height = 1080;
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

	// Create Enemies
	const enemyImg = new Image();
	enemyImg.src = "./src/assets/enemy.png";
	class Enemy {
		constructor() {
			this.enemyWidth = 136.5;
			this.enemyHeight = 141;
			this.speed = 0; // stop animation
			this.width = this.enemyWidth;
			this.height = this.enemyHeight;
			this.x = Math.random() * (canvas.width - this.width);
			this.y = Math.random() * (canvas.height - this.height);
			this.angle = Math.random() * 5 * Math.PI;
			this.angleSpeed = Math.random() * 0.1;

			this.frame = 0;
			this.flapSpeed = Math.floor(Math.random() * 5 + 1);
		}
		update() {
			this.x -= this.speed;
			this.y += Math.sin(this.angle) * 2;
			this.angle += this.angleSpeed;

			if (this.x < 0) this.x = canvas.width;
			if (this.y < 0) this.y = canvas.height - this.height;

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

	for (let i = 0; i < numberOfEnemies; i++) {
		enemiesArray.push(new Enemy());
	}

	// Create Monster
	const monsterImg = new Image();
	monsterImg.src = "./src/assets/monster.png";

	class Monster {
		constructor() {
			this.x = 1920;
			this.y = 600;
			this.speed = 0; // stop
			this.monsterWidth = 262;
			this.monsterHeight = 242;
			this.width = this.monsterWidth * 1.5;
			this.height = this.monsterHeight * 1.5;
			this.frame = 0;
			this.walkSpeed = 0;
		}
		update() {
			this.x -= this.speed;
			if (this.x < -500) this.x = 1920;

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
				484,
				this.monsterWidth,
				this.monsterHeight,
				this.x,
				this.y,
				this.width,
				this.height
			);
		}
	}

	const monster = new Monster();

	// Create Player

	const playerImg = new Image();
	playerImg.src = "./src/assets/player.png";

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

	// create explosion
	let explosions = [];

	class Explosion {
		constructor(x, y) {
			this.spriteWidth = 200;
			this.spriteHeight = 179;
			this.width = this.spriteWidth * 0.7;
			this.height = this.spriteHeight * 0.7;
			this.x = x - this.width / 2;
			this.y = y - this.height / 2;
			this.image = new Image();
			this.image.src = "./src/assets/boom.png";
			this.timer = 0;
			this.frame = 0;
			this.sound = new Audio();
			this.sound.src = "./src/assets/boom.wav";
		}
		update() {
			if (this.frame === 0) this.sound.play();
			this.timer++;
			if (this.timer % 10 === 0) {
				this.frame++;
			}
		}
		draw() {
			ctx.drawImage(
				this.image,
				this.spriteWidth * this.frame,
				0,
				this.spriteWidth,
				this.spriteHeight,
				this.x,
				this.y,
				this.width,
				this.height
			);
		}
	}

	// add event listener for boom
	window.addEventListener("click", (e) => {
		boomEffect(e);
	});

	function boomEffect(e) {
		const rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;

		let positionX = (e.clientX - rect.left) * scaleX;
		let positionY = (e.clientY - rect.top) * scaleY;

		explosions.push(new Explosion(positionX, positionY));
	}

	// Animation loop
	function animate() {
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		// Draw background layers
		backgroundLayers.forEach((layer) => {
			layer.update();
			layer.draw();
		});

		// Update and Draw player
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

		//animate explosion

		for (let i = 0; i < explosions.length; i++) {
			explosions[i].update();
			explosions[i].draw();
			if (explosions[i].frame > 5) {
				explosions.splice(i, 1);
				i--;
			}
		}

		// Update game state
		requestAnimationFrame(animate);
	}

	animate();
});
