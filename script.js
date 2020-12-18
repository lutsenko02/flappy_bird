const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const bird = new Image();
bird.src = "птица.png";

const bg = new Image();
bg.src = "фон.png";

const fg = new Image();
fg.src = "земля.png";

const pipeUp = new Image();
pipeUp.src = "верхняя палка.png";

const pipeBottom = new Image();
pipeBottom.src = "нижняя палка.png";

const gap = 90;

const gravity = 0.65;
const acceleration = 0.7;


document.addEventListener("keydown", function(event) {

	if (event.key == " ") {
		fallSpeed -= 20; 
	}
});


let pipe = [{
	x: cvs.width,
	y: 0
}];


let score = 0;

let fallSpeed = 0;

const xPos = 10;

let yPos = 150;


function draw() {

	ctx.drawImage(bg, 0, 0);

	ctx.drawImage(bird, xPos, yPos);


	for (let i = 0; i < pipe.length; i++) {

		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

		pipe[i].x--;

		if (pipe[i].x == 125) {
			pipe.push({
				x: cvs.width, 
				y: rnd(pipeUp.height)
			});
		}

		if (isCollided(bird,pipe[i])) {
			alert('Упс... попробуйте ещё раз, у Вас все получится!');
			location.reload();
		}

		if (pipe[i].x == 5) {
			score++;
		}
	}


	ctx.drawImage(fg, 0, cvs.height - fg.height);


	fallSpeed = acceleration*(fallSpeed + gravity);
	yPos += fallSpeed;


	ctx.fillStyle = "#000";
	ctx.font = "24px Verdana";
	ctx.fillText("Счет: " + score, 10, cvs.height - 20);
	

	requestAnimationFrame(draw);
}


function isCollided(bird, pipe) {
	const bird_l = xPos, bird_r = xPos + bird.width, bird_t = yPos, bird_b = yPos + bird.height,
	pipe_l = pipe.x, pipe_r = pipe.x + pipeUp.width,pipe_b = pipe.y + pipeUp.height, pipe_t = pipe_b + gap,
	ground = cvs.height - fg.height;
	
	return (bird_r >= pipe_l
	&& bird_l <= pipe_r
	&& (bird_t <= pipe_b
	|| bird_b >= pipe_t)
	|| bird_b >=ground )
}


function rnd(max) {
	return Math.floor(Math.random() * max) - max;
}


pipeBottom.onload = draw;