export function drawStatusText(context, input, player) {
	context.font = "30px Arial";
	context.fillText("last input: " + input.lastKey, 10, 50);
	context.fillText("player: " + player.currentState.state, 10, 100);
}
