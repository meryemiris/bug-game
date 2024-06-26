export const states = {
	STANDING_RIGHT: 0,
	STANDING_LEFT: 1,
	RUNNING_RIGHT: 2,
	RUNNING_LEFT: 3,
	JUMPING_RIGHT: 4,
	JUMPING_LEFT: 5,
	FALLING_RIGHT: 6,
	FALLING_LEFT: 7,
	ATTACK_RIGHT: 8,
	ATTACK_LEFT: 9,
	GETHIT_RIGHT: 10,
	GETHIT_LEFT: 11,
	DEAD_RIGHT: 12,
	DEAD_LEFT: 13,
};

const frames = {
	IDLE_FRAMES: 19,
	RUN_FRAMES: 12,
	JUMP_FRAMES: 10,
	FALL_FRAMES: 10,
	DIZZY_FRAMES: 20,
	GETHIT_FRAMES: 10,
	ATTACK_FRAMES: 15,
	DOUBLE_ATTACK_FRAMES: 20,
	DEAD_FRAMES: 30,
};

class State {
	constructor(state) {
		this.state = state;
	}
}

export class StandingRight extends State {
	constructor(player) {
		super("STANDING RIGHT");
		this.player = player;
	}
	enter() {
		this.player.maxFrame = frames.IDLE_FRAMES;
		this.player.frameY = 2;
		this.player.speed = 0;
	}
	handleInput(input) {
		if (input === "PRESS left") this.player.setState(states.RUNNING_LEFT);
		else if (input === "PRESS right")
			this.player.setState(states.RUNNING_RIGHT);
		else if (input === "PRESS up") this.player.setState(states.JUMPING_RIGHT);
		else if (input === "PRESS space") this.player.setState(states.ATTACK_RIGHT);
	}
}

export class StandingLeft extends State {
	constructor(player) {
		super("STANDING LEFT");
		this.player = player;
	}
	enter() {
		this.player.frameY = 3;
		this.player.maxFrame = frames.IDLE_FRAMES;
		this.player.speed = 0;
	}
	handleInput(input) {
		if (input === "PRESS right") this.player.setState(states.RUNNING_RIGHT);
		else if (input === "PRESS left") this.player.setState(states.RUNNING_LEFT);
		else if (input === "PRESS up") this.player.setState(states.JUMPING_LEFT);
		else if (input === "PRESS space") this.player.setState(states.ATTACK_LEFT);
	}
}

export class RunningRight extends State {
	constructor(player) {
		super("RUNNING RIGHT");
		this.player = player;
	}
	enter() {
		this.player.frameY = 4;
		this.player.maxFrame = frames.RUN_FRAMES;
		this.player.speed = this.player.maxSpeed;
	}
	handleInput(input) {
		if (input === "PRESS left") this.player.setState(states.RUNNING_LEFT);
		else if (input === "RELEASE right")
			this.player.setState(states.STANDING_RIGHT);
		else if (input === "PRESS up") this.player.setState(states.JUMPING_RIGHT);
		else if (input === "PRESS space") this.player.setState(states.ATTACK_RIGHT);
	}
}

export class RunningLeft extends State {
	constructor(player) {
		super("RUNNING LEFT");
		this.player = player;
	}
	enter() {
		this.player.frameY = 5;
		this.player.maxFrame = frames.RUN_FRAMES;
		this.player.speed = -this.player.maxSpeed;
	}
	handleInput(input) {
		if (input === "PRESS right") this.player.setState(states.RUNNING_RIGHT);
		else if (input === "RELEASE left")
			this.player.setState(states.STANDING_LEFT);
		else if (input === "PRESS up") this.player.setState(states.JUMPING_LEFT);
		else if (input === "PRESS space") this.player.setState(states.ATTACK_LEFT);
	}
}

export class JumpingRight extends State {
	constructor(player) {
		super("JUMPING RIGHT");
		this.player = player;
	}
	enter() {
		this.player.frameY = 6;
		this.player.maxFrame = frames.JUMP_FRAMES;
		if (this.player.onGround()) {
			this.player.velY -= 20;
		}
	}
	handleInput(input) {
		if (input === "PRESS left") this.player.setState(states.JUMPING_LEFT);
		else if (input === "PRESS right") this.player.speed = this.player.maxSpeed;
		else if (input === "PRESS left") this.player.speed = -this.player.maxSpeed;
		else if (input === "PRESS down") this.player.speed = 0;
		else if (this.player.onGround())
			this.player.setState(states.STANDING_RIGHT);
		else if (this.player.velY >= 0) this.player.setState(states.FALLING_RIGHT);
		else if (input === "PRESS space") this.player.setState(states.ATTACK_RIGHT);
	}
}

export class JumpingLeft extends State {
	constructor(player) {
		super("JUMPING LEFT");
		this.player = player;
	}
	enter() {
		this.player.frameY = 7;
		this.player.maxFrame = frames.JUMP_FRAMES;
		if (this.player.onGround()) this.player.velY -= 20;
		this.player.speed = -this.player.maxSpeed * 0.8;
	}
	handleInput(input) {
		if (input === "PRESS right") this.player.setState(states.JUMPING_RIGHT);
		else if (input === "PRESS left") this.player.speed = -this.player.maxSpeed;
		else if (input === "PRESS right") this.player.speed = this.player.maxSpeed;
		else if (this.player.onGround()) this.player.setState(states.STANDING_LEFT);
		else if (this.player.velY >= 0) this.player.setState(states.FALLING_LEFT);
	}
}

export class FallingRight extends State {
	constructor(player) {
		super("FALLING RIGHT");

		this.player = player;
	}
	enter() {
		this.player.frameY = 8;
		this.player.maxFrame = frames.FALL_FRAMES;
	}
	handleInput(input) {
		if (input === "PRESS left") this.player.setState(states.FALLING_LEFT);
		else if (this.player.onGround())
			this.player.setState(states.STANDING_RIGHT);
		else if (input === "PRESS space") this.player.setState(states.ATTACK_RIGHT);
	}
}

export class FallingLeft extends State {
	constructor(player) {
		super("FALLING LEFT");

		this.player = player;
	}
	enter() {
		this.player.frameY = 9;
		this.player.maxFrame = frames.FALL_FRAMES;
	}
	handleInput(input) {
		if (input === "PRESS right") this.player.setState(states.FALLING_RIGHT);
		else if (this.player.onGround()) this.player.setState(states.STANDING_LEFT);
	}
}

export class AttackRight extends State {
	constructor(player) {
		super("ATTACK RIGHT");
		this.player = player;
	}

	enter() {
		this.player.frameY = 14;
		this.player.maxFrame = frames.ATTACK_FRAMES;
	}
	handleInput(input) {
		if (input === "PRESS left") this.player.setState(states.STANDING_LEFT);
		else if (input === "PRESS right")
			this.player.setState(states.STANDING_RIGHT);
		else if (input === "PRESS up") this.player.setState(states.JUMPING_RIGHT);
	}
}

export class AttackLeft extends State {
	constructor(player) {
		super("ATTACK LEFT");
		this.player = player;
	}

	enter() {
		this.player.frameY = 15;
		this.player.maxFrame = frames.ATTACK_FRAMES;
	}
	handleInput(input) {
		if (input === "PRESS right") this.player.setState(states.STANDING_RIGHT);
		else if (input === "PRESS up") this.player.setState(states.JUMPING_LEFT);
	}
}

export class GetHitRight extends State {
	constructor(player) {
		super("GET HIT RIGHT");
		this.player = player;
	}
	enter() {
		this.player.frameY = 12;
		this.player.maxFrame = frames.GETHIT_FRAMES;
	}
	handleInput(input) {
		if (this.isDead) this.player.setState(states.DEAD_RIGHT);
		if (this.player.frameX === this.player.maxFrame)
			this.player.setState(states.STANDING_RIGHT);
	}
}

export class GetHitLeft extends State {
	constructor(player) {
		super("GET HIT LEFT");
		this.player = player;
	}
	enter() {
		this.player.frameY = 13;
		this.player.maxFrame = frames.GETHIT_FRAMES;
	}
	handleInput(input) {
		if (this.isDead) this.player.setState(states.DEAD_LEFT);
		if (this.player.frameX === this.player.maxFrame)
			this.player.setState(states.STANDING_LEFT);
	}
}

export class DeadRight extends State {
	constructor(player) {
		super("DEAD");
		this.player = player;
	}
	enter() {
		this.player.frameY = 0;
		this.player.maxFrame = frames.DEAD_FRAMES;
	}
	handleInput(input) {
		if (input === "PRESS enter") this.player.setState(states.STANDING_RIGHT);
	}
}
export class DeadLeft extends State {
	constructor(player) {
		super("DEAD");
		this.player = player;
	}
	enter() {
		if (this.isDead) this.player.setState(states.DEAD_RIGHT);
		this.player.frameY = 1;
		this.player.maxFrame = frames.DEAD_FRAMES;
	}
	handleInput(input) {
		if (input === "PRESS enter") this.player.setState(states.STANDING_LEFT);
	}
}
