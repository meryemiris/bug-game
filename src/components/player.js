import { StandingLeft, StandingRight } from "./state.js";

export default class Player {
	constructor(gameWidth, gameHeight) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.states = [new StandingLeft(this), new StandingRight(this)];
		this.currentState = this.states[0];
		this.image = new Image();
		this.image.src = "./src/assets/player.png";
		this.spriteWidth = 495;
		this.spriteHeight = 330;
		this.width = this.spriteWidth;
		this.height = this.spriteHeight;
		this.x = this.gameWidth / 2 - this.width / 2;
		this.y = this.gameHeight - this.height - 160;
		this.speed = 10;
		this.frameX = 0;
		this.frameY = 2;
	}
	draw(context) {
		context.drawImage(
			this.image,
			this.width * this.frameX,
			this.height * this.frameY,
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
	}
	setState(state) {
		this.currentState = this.states[state];
		this.currentState.enter();
	}
}
