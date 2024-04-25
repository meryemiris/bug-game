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
		this.width = this.spriteWidth;
		this.height = this.spriteHeight;
		this.x = this.gameWidth / 2 - this.width / 2;
		this.y = this.gameHeight - this.height - 160;
		this.vy = 0;
		this.vx = 0;
		this.weight = 1;
		this.frameX = 0;
		this.frameY = 2;
		this.maxFrame = 10;
		this.speed = 0;
		this.maxSpeed = 10;

		this.fps = 60;
		this.frameInterval = 1000 / this.fps;
		this.frameTimer = 0;
	}
	draw(context, deltaTime = 0) {
		if (this.frameTimer > this.frameInterval) {
			if (this.frameX < this.maxFrame) this.frameX++;
			else this.frameX = 0;
			this.frameTimer = 0;
		} else {
			this.frameTimer += this.frameInterval;
		}

		context.drawImage(
			this.image,
			this.width * this.frameX,
			this.height * this.frameY,
			this.width,
			this.height,
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
		this.y += this.vy;
		if (!this.onGround()) {
			this.vy += this.weight;
		} else {
			this.vy = 0;
		}
	}
	setState(state) {
		this.currentState = this.states[state];
		this.currentState.enter();
	}
	onGround() {
		return this.y >= this.gameHeight - this.height - 160;
	}
}
