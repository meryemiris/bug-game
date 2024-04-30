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
}
