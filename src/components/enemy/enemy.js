export default class Enemy {
	constructor(gameWidth, gameHeight) {
		this.enemyImg = new Image();
		this.enemyImg.src = "./src/assets/enemy.png";
		this.enemyWidth = 136.5;
		this.enemyHeight = 141;
		this.speed = 2;
		this.sizeModifier = 0.5 + Math.random() * 0.5;

		this.width = this.enemyWidth * this.sizeModifier;
		this.height = this.enemyHeight * this.sizeModifier;
		this.x = Math.random() * (gameWidth - this.width);
		this.y = Math.random() * (gameHeight - this.height);
		this.angle = Math.random() * 5 * Math.PI;
		this.angleSpeed = Math.random() * 0.1;

		this.frame = 0;
		this.flapSpeed = Math.floor(Math.random() * 5 + 1);

		this.markedForDeletion = false;
		this.randomColors = [
			Math.floor(Math.random() * 255),
			Math.floor(Math.random() * 255),
			Math.floor(Math.random() * 255),
		];
		this.color =
			"rgb(" +
			this.randomColors[0] +
			"," +
			this.randomColors[1] +
			"," +
			this.randomColors[2] +
			")";
		this.timeSinceLastFrame = 0;
		this.frameInterval = 200;

		this.hasCollided = false;
	}
	update(deltaTime) {
		this.x -= this.speed;
		this.y += Math.sin(this.angle) * 2;
		this.angle += this.angleSpeed;

		if (this.x < 0) this.x = canvas.width;
		if (this.y < 0) this.y = canvas.height - this.height;

		// Animate enemies
		this.timeSinceLastFrame += deltaTime;
		if (this.timeSinceLastFrame > this.frameInterval) {
			this.frame++;
			this.timeSinceLastFrame = 0;
		}
		if (this.frame >= 12) this.frame = 0;

		// Check for collision
	}
	draw(collisionCtx, context) {
		// Draw collision box

		collisionCtx.fillStyle = this.color;
		collisionCtx.fillRect(this.x, this.y, this.width, this.height, this.color);

		// Draw enemy

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
