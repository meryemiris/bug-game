export function drawScore(context, score) {
	context.font = "50px Impact";
	context.fillStyle = "black";
	context.fillText("Score: " + score, 50, 75);
	context.fillStyle = "#eee";
	context.fillText("Score: " + score, 52, 77);
}

export function drawLives(context, lives) {
	context.font = "50px Impact";
	context.fillStyle = "black";

	context.fillText("Lives: " + lives + "/7", context.canvas.width - 250, 75);
	context.fillStyle = "#eee";
	context.fillText("Lives: " + lives + "/7", context.canvas.width - 252, 77);

	if (lives <= 0) {
		context.font = "100px Impact";
		context.fillStyle = "black";
		context.fillText(
			"GAME OVER",
			context.canvas.width / 2 - 250,
			context.canvas.height / 2
		);
		context.fillStyle = "#eee";
		context.fillText(
			"GAME OVER",
			context.canvas.width / 2 - 252,
			context.canvas.height / 2 + 3
		);
	}
}
