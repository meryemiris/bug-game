import Player from "./components/player/player.js";
import Layer from "./components/background/background.js";
import Enemy from "./components/enemy/enemy.js";
import InputHandler from "./components/player/input.js";
import { drawStatusText } from "./components/player/utils.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 2048;
const CANVAS_HEIGHT = 1080;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let gameSpeed = 10;
let gameFrame = 0;

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

const layer1 = new Layer(backGroundLayer1, 0.2);
const layer2 = new Layer(backGroundLayer2, 0.4);
const layer3 = new Layer(backGroundLayer3, 0.6);
const layer4 = new Layer(backGroundLayer4, 0.8);
const layer5 = new Layer(backGroundLayer5, 1);

const backgroundLayers = [layer1, layer2, layer3, layer4, layer5];

// Wait for images to load before starting the game
window.addEventListener("load", () => {
	// Create Enemies
	const numberOfEnemies = 3;
	const enemiesArray = [];
	function createEnemies(numberOfEnemies) {
		for (let i = 0; i < numberOfEnemies; i++) {
			enemiesArray.push(new Enemy(CANVAS_WIDTH, CANVAS_HEIGHT));
		}
	}
	createEnemies(numberOfEnemies);

	// Create Monster
	class Monster {
		constructor() {
			this.image = new Image();
			this.image.src = "./src/assets/monster.png";
			this.x = 1200;
			this.y = 600;
			this.speed = 2;
			this.monsterWidth = 262;
			this.monsterHeight = 242;
			this.width = this.monsterWidth * 1.5;
			this.height = this.monsterHeight * 1.5;
			this.frameX = 0;
			this.walkSpeed = 10;
		}
		update() {
			this.x -= this.speed;
			if (this.x < -500) this.x = 1920;

			if (gameFrame % this.walkSpeed === 0) {
				this.frameX >= 12 ? (this.frameX = 0) : this.frameX++;
			}
		}
		draw() {
			ctx.drawImage(
				this.image,
				this.frameX * this.monsterWidth,
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
			// if (this.frame === 0) this.sound.play();
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

	const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT);
	player.draw(ctx);

	const input = new InputHandler();

	let lastTime = 0;

	// Animation loop
	function animate(timeStamp) {
		const deltaTime = timeStamp - lastTime;
		lastTime = timeStamp;
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		// Draw background layers
		backgroundLayers.forEach((layer) => {
			layer.update(gameSpeed);
			layer.draw(ctx);
		});

		// Update and Draw player
		player.update(input.lastKey);
		player.draw(ctx, deltaTime);

		// Update and Draw monster
		monster.update();
		monster.draw();

		// Update and Draw enemies
		enemiesArray.forEach((enemy) => {
			enemy.update(gameFrame);
			enemy.draw(ctx);
		});

		// draw text
		drawStatusText(ctx, input, player);

		//animate explosion

		for (let i = 0; i < explosions.length; i++) {
			explosions[i].update();
			explosions[i].draw();
			if (explosions[i].frame > 5) {
				explosions.splice(i, 1);
				i--;
			}
		}
		gameFrame++;

		// Update game state
		requestAnimationFrame(animate);
	}

	animate(0);
});
