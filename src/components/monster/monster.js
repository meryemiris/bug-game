//TODO: add states and recreate sprite sheet

export default class Monster {
	constructor(gameWidth, gameHeight) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.groundHeight = this.gameHeight - 80;

		this.image = new Image();
		this.image.src = "./src/assets/monster.png";

		this.speed = 2;
		this.spriteWidth = 262;
		this.spriteHeight = 242;
		this.width = this.spriteWidth * 1.5;
		this.height = this.spriteHeight * 1.5;
		this.x = this.gameWidth;
		this.y = this.groundHeight - this.height;
		this.frameX = 0;
		this.frameY = this.spriteHeight * 2;
		this.maxFrame = 12;
		this.walkSpeed = 10;
		this.color = "red";
	}
	update(gameFrame) {
		this.x -= this.speed;
		if (this.x < -500) this.x = 1920;

		if (gameFrame % this.walkSpeed === 0) {
			this.frameX >= 12 ? (this.frameX = 0) : this.frameX++;
		}
	}
	draw(collisionCtx, context) {
		collisionCtx.fillStyle = this.color;

		collisionCtx.fillRect(this.x, this.y, this.width, this.height);
		context.drawImage(
			this.image,
			this.frameX * this.spriteWidth,
			this.frameY,
			this.spriteWidth,
			this.spriteHeight,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}
}
