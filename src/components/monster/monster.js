//TODO: add states and recreate sprite sheet

export default class Monster {
	constructor(gameWidth, gameHeight) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.groundHeight = this.gameHeight - 100;

		this.image = new Image();
		this.image.src = "./src/assets/monster.png";

		this.speed = 2;
		this.spriteWidth = 393;
		this.spriteHeight = 363;
		this.width = this.spriteWidth;
		this.height = this.spriteHeight;
		this.x = this.gameWidth - this.width;
		this.y = this.groundHeight - this.height;
		this.frameX = 0;
		this.frameY = 3;
		this.maxFrame = 12;

		this.fps = 10;
		this.timeSinceLastFrame = 0;
		this.frameInterval = 1000 / this.fps;

		this.color = "red";
	}
	update(deltaTime) {
		this.x -= this.speed;
		if (this.x < -500) this.x = this.gameWidth + 500;

		this.timeSinceLastFrame += deltaTime;
		if (this.timeSinceLastFrame > this.frameInterval) {
			this.frameX++;
			this.timeSinceLastFrame = 0;
		}
		if (this.frameX >= this.maxFrame) this.frameX = 0;
	}
	draw(collisionCtx, context) {
		collisionCtx.fillStyle = this.color;

		collisionCtx.fillRect(this.x, this.y, this.width, this.height);
		context.drawImage(
			this.image,
			this.frameX * this.spriteWidth,
			this.frameY * this.spriteHeight,
			this.spriteWidth,
			this.spriteHeight,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}
}
