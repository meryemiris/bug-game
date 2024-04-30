import {
	StandingRight,
	StandingLeft,
	RunningRight,
	RunningLeft,
	JumpingRight,
	JumpingLeft,
	FallingRight,
	FallingLeft,
} from "./state.js";

export default class Player {
	constructor(gameWidth, gameHeight) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.groundHeight = this.gameHeight - 130;
		this.states = [
			new StandingRight(this),
			new StandingLeft(this),
			new RunningRight(this),
			new RunningLeft(this),
			new JumpingRight(this),
			new JumpingLeft(this),
			new FallingRight(this),
			new FallingLeft(this),
		];
		this.currentState = this.states[0];
		this.image = new Image();
		this.image.src = "./src/assets/player.png";
		this.spriteWidth = 495;
		this.spriteHeight = 330;
		this.width = this.spriteWidth * 0.8;
		this.height = this.spriteHeight * 0.8;
		this.x = -this.gameWidth;
		this.y = this.groundHeight - this.height;

		this.velY = 0;
		this.gravity = 0.5;
		this.frameX = 0;
		this.frameY = 2;
		this.maxFrame = 19;
		this.speed = 0;
		this.maxSpeed = 10;

		this.fps = 20;
		this.timeSinceLastFrame = 0;
		this.frameInterval = 1000 / this.fps;

		this.color = "black";

		this.lives = 7;
		this.isDead = false;
	}
	draw(collisionCtx, context) {
		collisionCtx.fillStyle = this.color;
		collisionCtx.strokeRect(this.x, this.y, this.width, this.height);
		context.drawImage(
			this.image,
			this.spriteWidth * this.frameX,
			this.spriteHeight * this.frameY,
			this.spriteWidth,
			this.spriteHeight,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}
	update(input, deltaTime) {
		this.timeSinceLastFrame += deltaTime;
		if (this.timeSinceLastFrame > this.frameInterval) {
			this.frameX++;
			this.timeSinceLastFrame = 0;
		}
		if (this.frameX > this.maxFrame) this.frameX = 0;

		this.currentState.handleInput(input);

		//horizontal movement
		this.x += this.speed;
		if (this.x <= 0) this.x = 0;
		else if (this.x >= this.gameWidth - this.width)
			this.x = this.gameWidth - this.width;

		//vertical movement
		this.y += this.velY;
		if (!this.onGround()) {
			this.velY += this.gravity;
			if (this.velY > this.maxSpeed) this.velY = this.maxSpeed;
		} else {
			this.velY = 0;
		}
	}
	setState(state) {
		this.currentState = this.states[state];
		this.currentState.enter();
	}
	onGround() {
		return this.y >= this.groundHeight - this.height;
	}
	decrementLives() {
		this.lives--;
		if (this.lives <= 0) {
			this.isDead = true;
		}
	}
}
