//TODO: add states and recreate sprite sheet

export default class Monster {
	constructor(gameWidth, gameHeight) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.image = new Image();
		this.image.src = "./src/assets/monster.png";

		this.speed = 2;
		this.monsterWidth = 262;
		this.monsterHeight = 242;
		this.width = this.monsterWidth * 1.5;
		this.height = this.monsterHeight * 1.5;
		this.x = this.gameWidth;
		this.y = this.gameHeight - this.height - 100;
		this.frameX = 0;
		this.frameY = this.monsterHeight * 2;
		this.maxFrame = 12;
		this.walkSpeed = 10;
	}
	update(gameFrame) {
		this.x -= this.speed;
		if (this.x < -500) this.x = 1920;

		if (gameFrame % this.walkSpeed === 0) {
			this.frameX >= 12 ? (this.frameX = 0) : this.frameX++;
		}
	}
	draw(context) {
		context.drawImage(
			this.image,
			this.frameX * this.monsterWidth,
			this.frameY,
			this.monsterWidth,
			this.monsterHeight,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}
}
