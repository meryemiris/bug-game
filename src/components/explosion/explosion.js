export default class Explosion {
	constructor(x, y) {
		this.spriteWidth = 200;
		this.spriteHeight = 179;
		this.width = this.spriteWidth * 0.7;
		this.height = this.spriteHeight * 0.7;
		this.x = x - this.width / 2; // center the explosion on the point of impact
		this.y = y - this.height / 2;
		this.image = new Image();
		this.image.src = "./src/assets/boom.png";
		this.timer = 0;
		this.frame = 0;
		this.sound = new Audio();
		this.sound.src = "./src/assets/boom.wav";
	}
	update() {
		if (this.frame === 0) this.sound.play();
		this.timer++;
		if (this.timer % 10 === 0) {
			this.frame++;
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
