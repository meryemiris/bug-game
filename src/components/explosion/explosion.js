export default class Explosion {
	constructor(x, y, size) {
		this.spriteWidth = 200;
		this.spriteHeight = 179;
		this.width = this.spriteWidth * size;
		this.height = this.spriteHeight * size;
		this.x = x - this.width / 2;
		this.y = y - this.height / 2;
		this.image = new Image();
		this.image.src = "./src/assets/boom.png";
		this.timer = 0;
		this.frame = 0;
		this.sound = new Audio();
		this.sound.src = "./src/assets/boom.wav";

		this.fps = 10;
		this.timeSinceLastFrame = 0;
		this.frameInterval = 1000 / this.fps;
	}
	update(deltaTime) {
		if (this.frame === 0) this.sound.play();
		this.timeSinceLastFrame += deltaTime;
		if (this.timeSinceLastFrame > this.frameInterval) {
			this.frame++;
			this.timeSinceLastFrame = 0;
		}
	}
	draw(context) {
		context.drawImage(
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
