import Player from "./components/player/player.js";
import Layer from "./components/background/background.js";
import Enemy from "./components/enemy/enemy.js";
import Monster from "./components/monster/monster.js";
import Explosion from "./components/explosion/explosion.js";

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

let lastTime = 0;

const numberOfEnemies = 5;
let enemiesArray = [];

let explosions = [];

window.addEventListener("load", () => {
	// Create player
	const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT);
	player.draw(ctx);

	// Create input handler for player
	const input = new InputHandler();

	// Create background
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

	// Create Monster
	const monster = new Monster(CANVAS_WIDTH, CANVAS_HEIGHT);
	monster.draw(ctx);

	// Create Enemies
	function createEnemies(numberOfEnemies) {
		for (let i = 0; i < numberOfEnemies; i++) {
			enemiesArray.push(new Enemy(CANVAS_WIDTH, CANVAS_HEIGHT));
			enemiesArray[i].draw(ctx);
		}
	}
	createEnemies(numberOfEnemies);

	// create explosion

	function createExplosion(e) {
		const rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;

		let positionX = (e.clientX - rect.left) * scaleX;
		let positionY = (e.clientY - rect.top) * scaleY;

		explosions.push(new Explosion(positionX, positionY));
	}

	window.addEventListener("click", (e) => {
		createExplosion(e);
	});

	// Animation loop
	function animate(timeStamp) {
		const deltaTime = timeStamp - lastTime;
		lastTime = timeStamp;
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		// Update Draw background layers
		backgroundLayers.forEach((layer) => {
			layer.update(gameSpeed);
			layer.draw(ctx);
		});

		// Update and Draw player
		player.update(input.lastKey);
		player.draw(ctx, deltaTime);

		// Update and Draw monster
		monster.update(gameFrame);
		monster.draw(ctx);

		// Update and Draw enemies
		enemiesArray.forEach((enemy) => {
			enemy.update(gameFrame);
			enemy.draw(ctx);
		});

		// Draw text
		drawStatusText(ctx, input, player);

		// Animate explosion

		for (let i = 0; i < explosions.length; i++) {
			explosions[i].update();
			explosions[i].draw(ctx);
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
