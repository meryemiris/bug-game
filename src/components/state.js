export const states = {
	STANDING_LEFT: 0,
	STANDING_RIGHT: 1,
	RUNNING_LEFT: 2,
	RUNNING_RIGHT: 3,
};

class State {
	constructor(state) {
		this.state = state;
	}
}

export class StandingLeft extends State {
	constructor(player) {
		super(states.STANDING_LEFT);

		this.player = player;
	}
	enter() {
		this.player.frameY = 2;
	}
	handleInput(input) {
		if (input === "PRESS left") this.player.setState(states.STANDING_RIGHT);
	}
}

export class StandingRight extends State {
	constructor(player) {
		super(states.STANDING_RIGHT);
		this.player = player;
	}
	enter() {
		this.player.frameY = 3;
	}
	handleInput(input) {
		if (input === "PRESS right") this.player.setState(states.STANDING_LEFT);
	}
}
