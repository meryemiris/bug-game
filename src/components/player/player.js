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
		// this.velX = 0;
		this.velY = 0;
		this.gravity = 0.5;
		this.frameX = 0;
		this.frameY = 2;
		this.maxFrame = 19;
		this.speed = 0;
		this.maxSpeed = 10;

		this.fps = 10;
		this.frameInterval = 1000 / this.fps;
		this.frameTimer = 0;

		this.color = "black";
	}
	draw(collisionCtx, context, deltaTime) {
		if (this.frameTimer > this.frameInterval) {
			if (this.frameX < this.maxFrame) this.frameX++;
			else this.frameX = 0;
			this.frameTimer = 0;
		} else {
			this.frameTimer += this.frameInterval;
		}

		collisionCtx.fillStyle = this.color;
		collisionCtx.fillRect(this.x, this.y, this.width, this.height);
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
	update(input) {
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
}
