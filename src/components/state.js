export const states = {
	STANDING_RIGHT: 0,
	STANDING_LEFT: 1,
	RUNNING_RIGHT: 2,
	RUNNING_LEFT: 3,
	JUMPING_RIGHT: 4,
	JUMPING_LEFT: 5,
	FALLING_LEFT: 6,
	FALLING_RIGHT: 7,
	PUNCING_ONE_LEFT: 8,
	PUNCHING__ONE_RIGHT: 9,
	PUNCHING_DOWNWARD_LEFT: 10,
	PUNCHING_DOWNWARD_RIGHT: 11,
	PUNCHING_TWO_LEFT: 12,
	PUNCHING_TWO_RIGHT: 13,
};

class State {
	constructor(state) {
		this.state = state;
	}
}

export class StandingRight extends State {
	constructor(player) {
		super(states.STANDING_RIGHT);
		this.player = player;
	}
	enter() {
		this.player.frameY = 2;
	}
	handleInput(input) {
		if (input === "PRESS left" || input === "RELEASE left") {
			this.player.setState(states.STANDING_LEFT);
		} else if (input === "PRESS right") {
			this.player.setState(states.RUNNING_RIGHT);
		} else if (input === "PRESS up") {
			this.player.setState(states.JUMPING_RIGHT);
		}
	}
}

export class StandingLeft extends State {
	constructor(player) {
		super(states.STANDING_LEFT);
		this.player = player;
	}
	enter() {
		this.player.frameY = 3;
	}
	handleInput(input) {
		if (input === "PRESS right") {
			this.player.setState(states.STANDING_RIGHT);
		} else if (input === "PRESS left") {
			this.player.setState(states.RUNNING_LEFT);
		} else if (input === "PRESS up") {
			this.player.setState(states.JUMPING_LEFT);
		}
	}
}

export class RunningRight extends State {
	constructor(player) {
		super(states.RUNNING_RIGHT);

		this.player = player;
	}
	enter() {
		this.player.frameY = 4;
	}
	handleInput(input) {
		if (input === "PRESS left") this.player.setState(states.RUNNING_LEFT);
	}
}

export class RunningLeft extends State {
	constructor(player) {
		super(states.RUNNING_LEFT);
		this.player = player;
	}
	enter() {
		this.player.frameY = 5;
		console.log("Running left");
	}
	handleInput(input) {
		if (input === "PRESS right") this.player.setState(states.RUNNING_RIGHT);
	}
}

export class JumpingRight extends State {
	constructor(player) {
		super(states.JUMPING_RIGHT);

		this.player = player;
	}
	enter() {
		this.player.frameY = 6;
	}
	handleInput(input) {
		if (input === "PRESS left") this.player.setState(states.JUMPING_LEFT);
	}
}

export class JumpingLeft extends State {
	constructor(player) {
		super(states.JUMPING_LEFT);

		this.player = player;
	}
	enter() {
		this.player.frameY = 7;
	}
	handleInput(input) {
		if (input === "PRESS right") this.player.setState(states.JUMPING_RIGHT);
	}
}
