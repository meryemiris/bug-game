export default class Enemy {
	constructor(gameWidth, gameHeight) {
		this.enemyImg = new Image();
		this.enemyImg.src = "./src/assets/enemy.png";
		this.enemyWidth = 136.5;
		this.enemyHeight = 141;
		this.speed = 2;
		this.width = this.enemyWidth;
		this.height = this.enemyHeight;
		this.x = Math.random() * (gameWidth - this.width);
		this.y = Math.random() * (gameHeight - this.height);
		this.angle = Math.random() * 5 * Math.PI;
		this.angleSpeed = Math.random() * 0.1;

		this.frame = 0;
		this.flapSpeed = Math.floor(Math.random() * 5 + 1);
	}
	update(gameFrame) {
		this.x -= this.speed;
		this.y += Math.sin(this.angle) * 2;
		this.angle += this.angleSpeed;

		if (this.x < 0) this.x = canvas.width;
		if (this.y < 0) this.y = canvas.height - this.height;

		// Animate enemies
		if (gameFrame % this.flapSpeed === 0) {
			this.frame >= 12 ? (this.frame = 0) : this.frame++;
		}
	}
	draw(context) {
		context.drawImage(
			this.enemyImg,
			this.frame * this.enemyWidth,
			0,
			this.enemyWidth,
			this.enemyHeight,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}
}
