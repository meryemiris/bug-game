import Player from "./components/player/player.js";
import Layer from "./components/background/background.js";
import Enemy from "./components/enemy/enemy.js";
import Monster from "./components/monster/monster.js";
import Explosion from "./components/explosion/explosion.js";

import InputHandler from "./components/player/input.js";
import { drawScore, drawLives } from "./components/utils/indicators.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = innerWidth;
const CANVAS_HEIGHT = innerHeight;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const collisionCanvas = document.getElementById("collision");
const collisionCtx = collisionCanvas.getContext("2d");

collisionCanvas.width = CANVAS_WIDTH;
collisionCanvas.height = CANVAS_HEIGHT;

let gameSpeed = 0;

const numberOfEnemies = 0;
let enemiesArray = [];

let explosions = [];
let score = 0;

let isGameOver = false;

function createEnemies(numberOfEnemies) {
	for (let i = 0; i < numberOfEnemies; i++) {
		enemiesArray.push(new Enemy(CANVAS_WIDTH, CANVAS_HEIGHT));
	}
	enemiesArray.sort((a, b) => a.width - b.width);
}
createEnemies(numberOfEnemies);

window.addEventListener("click", (e) => {
	if (isGameOver) return;

	const pixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1, {
		willReadFrequently: true,
	}).data;

	enemiesArray.forEach((enemy) => {
		if (
			enemy.randomColors[0] === pixelColor[0] &&
			enemy.randomColors[1] === pixelColor[1] &&
			enemy.randomColors[2] === pixelColor[2]
		) {
			score++;
			removeEnemy(enemy);
		}
	});
});

function removeEnemy(enemy) {
	enemy.markedForDeletion = true;
	enemiesArray = enemiesArray.filter((enemy) => !enemy.markedForDeletion);

	explosions.push(new Explosion(enemy.x, enemy.y, enemy.sizeModifier));
	if (explosions.length > 4) {
		explosions.shift();
	}
	enemiesArray.length < numberOfEnemies ? createEnemies(1) : null;
}

window.addEventListener("load", () => {
	// Create player
	const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT);
	player.draw(collisionCtx, ctx);

	function handlePlayerEnemyCollisions(player, enemiesArray) {
		for (let i = 0; i < enemiesArray.length; i++) {
			const enemy = enemiesArray[i];

			if (enemy.HasCollided || player.isDead) return;

			if (detectCollisionwithEnemy(player, enemy)) {
				enemy.hasCollided = true;
				score++;
				removeEnemy(enemy);

				player.decrementLives(1);
				if (player.isDead) {
					setTimeout(() => {
						gameOver();
					}, 500);
				}
			}
		}
	}

	function detectCollisionwithEnemy(player, enemy) {
		return (
			player.x < enemy.x + enemy.width &&
			player.x + player.width > enemy.x &&
			player.y < enemy.y + enemy.height &&
			player.y + player.height > enemy.y
		);
	}

	function gameOver() {
		isGameOver = true;
		setTimeout(() => {
			location.reload();
		}, 5000);
	}

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

	const layer1 = new Layer(backGroundLayer1, 0.2, CANVAS_WIDTH, CANVAS_HEIGHT);
	const layer2 = new Layer(backGroundLayer2, 0.4, CANVAS_WIDTH, CANVAS_HEIGHT);
	const layer3 = new Layer(backGroundLayer3, 0.6, CANVAS_WIDTH, CANVAS_HEIGHT);
	const layer4 = new Layer(backGroundLayer4, 0.8, CANVAS_WIDTH, CANVAS_HEIGHT);
	const layer5 = new Layer(backGroundLayer5, 1, CANVAS_WIDTH, CANVAS_HEIGHT);

	const backgroundLayers = [layer1, layer2, layer3, layer4, layer5];

	// Create Monster
	const monster = new Monster(CANVAS_WIDTH, CANVAS_HEIGHT);

	// Create Enemies

	let lastTime = 0;
	function animate(timeStamp) {
		const deltaTime = timeStamp - lastTime;
		lastTime = timeStamp;
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		backgroundLayers.forEach((layer) => {
			layer.update(gameSpeed);
			layer.draw(ctx);
		});

		collisionCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		handlePlayerEnemyCollisions(player, enemiesArray);

		[monster, ...enemiesArray].forEach((object) => {
			object.update(deltaTime);
			object.draw(collisionCtx, ctx);
		});

		player.update(input.lastKey, deltaTime, monster, isGameOver);
		player.draw(collisionCtx, ctx);

		drawScore(ctx, score);
		drawLives(ctx, player.lives);

		// Animate explosion

		explosions.forEach((explosion) => {
			explosion.update(deltaTime);
			explosion.draw(ctx);
		});

		// Update game state

		if (!isGameOver) requestAnimationFrame(animate);
	}

	animate(0);
});
