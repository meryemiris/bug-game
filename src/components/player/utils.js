export function drawScore(context, score) {
	context.font = "50px Impact";
	context.fillStyle = "black";
	context.fillText("Score: " + score, 50, 75);
	context.fillStyle = "#eee";
	context.fillText("Score: " + score, 52, 77);
}
