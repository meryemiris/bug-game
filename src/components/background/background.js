export default class Layer {
	constructor(image, speedModifier) {
		this.x = 0;
		this.y = 0;
		this.width = 2048;
		this.height = 1080;
		this.image = image;
		this.speedModifier = speedModifier;
		this.speed = 0;
	}
	update(gameSpeed) {
		this.speed = gameSpeed * this.speedModifier;
		this.x = (this.x - this.speed) % this.width;
	}
	draw(context) {
		context.drawImage(this.image, this.x, this.y, this.width, this.height);
		context.drawImage(
			this.image,
			this.x + this.width,
			this.y,
			this.width,
			this.height
		);
	}
}
