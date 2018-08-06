var board = document.getElementById("gameContainer");
var fdiv = document.getElementById("div_life");
var note = document.getElementById('start');
var Gdiv = document.getElementById("Gdiv");
var movex = 1;
var movey = 1;
var first = 1;




//initialise the ball
function initBall()
{
	var ball = document.createElement('img');
	ball.id = 'ball';
	ball.src = 'the_ball.jpg';
	ball.style.position = 'absolute';
	ball.style.top = '290px';
	ball.style.left = '180px';
	board.appendChild(ball);
	return ball;
}

//intialize paddle
function initPaddle()
{
	var paddle = document.createElement('img');
	paddle.id = 'paddle';
	paddle.src = 'paddle.JPG';
	paddle.style.position = 'absolute';
	paddle.style.top = '550px';
	paddle.style.left = '150px';
	
	board.appendChild(paddle);
	return paddle;
}

//initialize bricks
function initBricks()
{
	var bricks = [];
	for (var i = 0, n = 0; i < 50 ; i++) {
		bricks.push(document.createElement('img'));

		//align base on color
		if (i < 10)
		{
			bricks[i].src = "red.jpg";
			bricks[i].style.position = 'absolute';
			bricks[i].style.left = ((n * 36) + (n * 2))+'px';
			bricks[i].style.top = '50px';

			board.appendChild(bricks[i]);
			n++;
			if(i == 9)
				n = 0;
			
		}else if (i < 20)
		{
			bricks[i].src = "yellowp.jpg";
			bricks[i].style.position = 'absolute';
			bricks[i].style.left = ((n * 36) + (n * 2))+'px';
			bricks[i].style.top = (50+10+4)+'px';
			
			board.appendChild(bricks[i]);
			n++;
			if(i == 19)
				n = 0;
			
		}else if (i < 30)
		{
			bricks[i].src = "yollownp.jpg";
			bricks[i].style.position = 'absolute';
			bricks[i].style.left = ((n * 36) + (n * 2))+'px';
			bricks[i].style.top = (50+20+8)+'px';

			board.appendChild(bricks[i]);
			n++;
			if(i == 29)
				n = 0;
		}else if (i < 40)
		{
			bricks[i].src = "green.jpg";
			bricks[i].style.position = 'absolute';
			bricks[i].style.left = ((n * 36) + (n * 2))+'px';
			bricks[i].style.top = (50+30+12)+'px';
			
			board.appendChild(bricks[i]);
			n++;
			if(i == 39)
				n = 0;
		}else
		{
			bricks[i].src = "blue.jpg";
			bricks[i].style.position = 'absolute';
			bricks[i].style.left = ((n * 36) + (n * 2))+'px';
			bricks[i].style.top = (50+40+16)+'px';
			
		 	board.appendChild(bricks[i]);
			n++;
		}
	}
	return bricks;
}


//funtion init score board
function initScore()
{
	var score = document.createElement('div');
	score.style.position = 'absolute';
	score.style.top = '220px';
	score.style.left = '176px';
	score.style.fontSize = '50px';
	score.style.color = '#fd00d6';
	score.innerHTML = '0';
	board.appendChild(score);
	return score;
}

//init life
function initlife()
{
	var life = document.createElement('div');
	life.style.width = '200px';
	life.style.textAlign = "center";
	life.style.margin = 'auto';
	life.style.fontFamily = 'bloody';
	life.style.fontsize = '50px';
	life.style.background = "#e3dad0";
	life.style.color = '#fd00d6';
	life.innerHTML = 'Remaining life(s) : 4';
	fdiv.appendChild(life);
	return life;

}
//move the bale on the board
function moveBall(ball, paddle, bricks, score)
{
	//make move base on the direction or colision with the extremity
	if (ball.offsetLeft+20+1 >= 380)
	{
		ball.style.left = (ball.offsetLeft-1)+'px';
		movex = 0;
	}else if (ball.offsetLeft <= 0)
	{
		ball.style.left = (ball.offsetLeft+1)+'px';
		movex = 1;
	}

	if (ball.offsetTop+20+1 >= 600)
	{
		ball.style.top = '290px' ;
		ball.style.left = '180px';
		currentNLife--;
		Updatelife(life, currentNLife);
		if (currentNLife == 0)
			failed = 1;
		movey = 1;
	}else if (ball.offsetTop <= 0)
	{
		ball.style.top = (ball.offsetTop+1)+'px';
		movey = 1;
	}

	if (movex == 0)
		ball.style.left = (ball.offsetLeft-1)+'px';
	else
		ball.style.left = (ball.offsetLeft+1)+'px';


	if (movey == 0)
		ball.style.top = (ball.offsetTop-1)+'px';
	else
		ball.style.top = (ball.offsetTop+1)+'px';

	//move collision with respect to paddle
	if (ball.offsetTop >= 550 - 20)
	{
		if (ball.offsetLeft >= (paddle.offsetLeft - 20) && ball.offsetLeft <= (paddle.offsetLeft + 80 + 20))
		{
			movey = 0;
		}

	}

	//ball and brick touch,le haut du brick when comming from down
	if (ball.offsetTop <= 116 && ball.offsetTop >= 104 && movey == 0)
	{	
		
		for (var i = 40; i < 50 ; i++) {
			if ((ball.offsetLeft >= bricks[i].offsetLeft - 20) && (ball.offsetLeft <= bricks[i].offsetLeft + 36))
			{
				if (getComputedStyle(bricks[i], null).visibility != 'hidden')
				{
					bricks[i].style.visibility = 'hidden';
					movey = 1;

					//score update
					current_score = current_score + 5;
					score.innerHTML = current_score+'';

					//check if win
					for (var j = 0; j < 50; j++) {
						if (bricks[j].style.visibility != 'hidden')
						{
							win = 0;
							break;
						}else
						{
							win = 1;
						}
					};
				}

			}
			

		};
	}else if (ball.offsetTop <= 112 && ball.offsetTop >= 100 && movey == 0)
	{
		
		for (var i = 30; i < 40 ; i++) {
			if ((ball.offsetLeft >= bricks[i].offsetLeft - 20) && (ball.offsetLeft <= bricks[i].offsetLeft + 36))
			{
				
				if (getComputedStyle(bricks[i], null).visibility != 'hidden')
				{
					bricks[i].style.visibility = 'hidden';
					movey = 1;

					current_score = current_score + 10;
					score.innerHTML = current_score+'';

					for (var j = 0; j < 50; j++) {
						if (bricks[j].style.visibility != 'hidden')
						{
							win = 0;
							break;
						}else
						{
							win = 1;
						}
					};
				}
			}
			

		};
	}else if (ball.offsetTop <= 88 && ball.offsetTop >= 76 && movey == 0)
	{
		
		for (var i = 20; i < 30 ; i++) {
			if ((ball.offsetLeft >= bricks[i].offsetLeft - 20) && (ball.offsetLeft <= bricks[i].offsetLeft + 36))
			{
				
				if (getComputedStyle(bricks[i], null).visibility != 'hidden')
				{
					bricks[i].style.visibility = 'hidden';
					movey = 1;

					current_score = current_score + 15;
					score.innerHTML = current_score+'';

					for (var j = 0; j < 50; j++) {
						if (bricks[j].style.visibility != 'hidden')
						{
							win = 0;
							break;
						}else
						{
							win = 1;
						}
					};
				}
			}
			

		};
	}else if (ball.offsetTop <= 74 && ball.offsetTop >= 62 && movey == 0)
	{
		
		for (var i = 10; i < 20 ; i++) {
			if ((ball.offsetLeft >= bricks[i].offsetLeft - 20) && (ball.offsetLeft <= bricks[i].offsetLeft + 36))
			{
				
				if (getComputedStyle(bricks[i], null).visibility != 'hidden')
				{
					bricks[i].style.visibility = 'hidden';
					movey = 1;

					current_score = current_score + 20;
					score.innerHTML = current_score+'';

					for (var j = 0; j < 50; j++) {
						if (bricks[j].style.visibility != 'hidden')
						{
							win = 0;
							break;
						}else
						{
							win = 1;
						}
					};
				}
			}
			

		};
	}else if (ball.offsetTop <= 50 && ball.offsetTop >= 38 && movey == 0)
	{
		
		for (var i = 0; i < 10 ; i++) {
			if ((ball.offsetLeft >= bricks[i].offsetLeft - 20) && (ball.offsetLeft <= bricks[i].offsetLeft + 36))
			{
				
				if (getComputedStyle(bricks[i], null).visibility != 'hidden')
				{
					bricks[i].style.visibility = 'hidden';
					movey = 1;

					current_score = current_score + 25;
					score.innerHTML = current_score+'';

					for (var j = 0; j < 50; j++) {
						if (bricks[j].style.visibility != 'hidden')
						{
							win = 0;
							break;
						}else
						{
							win = 1;
						}
					};
				}
			}
			

		};
	}

	//ball colision with the up of briks
	if (ball.offsetTop + 20 >= 50 && ball.offsetTop + 20 <= 60 && movey == 1 )
	{
		for (var i = 0; i < 10 ; i++) {
			if ((ball.offsetLeft >= bricks[i].offsetLeft - 20) && (ball.offsetLeft <= bricks[i].offsetLeft + 36))
			{
				
				if (getComputedStyle(bricks[i], null).visibility != 'hidden')
				{
					bricks[i].style.visibility = 'hidden';
					movey = 0;

					current_score = current_score + 25;
					score.innerHTML = current_score+'';

					for (var j = 0; j < 50; j++) {
						if (bricks[j].style.visibility != 'hidden')
						{
							win = 0;
							break;
						}else
						{
							win = 1;
						}
					};
				}
			}
			

		};

	}else if (ball.offsetTop + 22 >= 64 && ball.offsetTop + 22 <= 74)
	{
		for (var i = 10; i < 20 ; i++) {
			if ((ball.offsetLeft >= bricks[i].offsetLeft - 20) && (ball.offsetLeft <= bricks[i].offsetLeft + 36))
			{
				
				if (getComputedStyle(bricks[i], null).visibility != 'hidden')
				{
					bricks[i].style.visibility = 'hidden';
					movey = 0;

					current_score = current_score + 20;
					score.innerHTML = current_score+'';

					for (var j = 0; j < 50; j++) {
						if (bricks[j].style.visibility != 'hidden')
						{
							win = 0;
							break;
						}else
						{
							win = 1;
						}
					};
				}
			}
			

		};

	}else if (ball.offsetTop + 22 >=78 && ball.offsetTop + 22 <= 88)
	{
		for (var i = 20; i < 30 ; i++) {
			if ((ball.offsetLeft >= bricks[i].offsetLeft - 20) && (ball.offsetLeft <= bricks[i].offsetLeft + 36))
			{
				
				if (getComputedStyle(bricks[i], null).visibility != 'hidden')
				{
					bricks[i].style.visibility = 'hidden';
					movey = 0;

					current_score = current_score + 15;
					score.innerHTML = current_score+'';

					for (var j = 0; j < 50; j++) {
						if (bricks[j].style.visibility != 'hidden')
						{
							win = 0;
							break;
						}else
						{
							win = 1;
						}
					};
				}
			}
			

		};

	}else if (ball.offsetTop + 22 >= 92 && ball.offsetTop + 22 <= 102)
	{
		for (var i = 30; i < 40 ; i++) {
			if ((ball.offsetLeft >= bricks[i].offsetLeft - 20) && (ball.offsetLeft <= bricks[i].offsetLeft + 36))
			{
				
				if (getComputedStyle(bricks[i], null).visibility != 'hidden')
				{
					bricks[i].style.visibility = 'hidden';
					movey = 0;

					current_score = current_score + 10;
					score.innerHTML = current_score+'';

					for (var j = 0; j < 50; j++) {
						if (bricks[j].style.visibility != 'hidden')
						{
							win = 0;
							break;
						}else
						{
							win = 1;
						}
					};
				}
			}
			

		};

	}else if (ball.offsetTop + 22 >= 106 && ball.offsetTop + 22 <= 116)
	{
		for (var i = 40; i < 50 ; i++) {
			if ((ball.offsetLeft >= bricks[i].offsetLeft - 20) && (ball.offsetLeft <= bricks[i].offsetLeft + 36))
			{
				
				if (getComputedStyle(bricks[i], null).visibility != 'hidden')
				{
					bricks[i].style.visibility = 'hidden';
					movey = 0;

					current_score = current_score + 5;
					score.innerHTML = current_score+'';

					for (var j = 0; j < 50; j++) {
						if (bricks[j].style.visibility != 'hidden')
						{
							win = 0;
							break;
						}else
						{
							win = 1;
						}
					};
				}
			}
			

		};

	}

	if(win)
	{
		board.parentNode.removeChild(board);
		win = 0;
		//show_message(1);
		Endmessage(1);
	}

	if (failed)
	{
		board.parentNode.removeChild(board);
		failed = 0;
		//show message
		Endmessage(0);
	}


}

//mouve paddle base on mouse move event
function paddleMove(paddle)
{
	document.addEventListener('mousemove',function(e){

		paddle.style.left = (e.clientX - 485 - 40) +'px';
		//handle colision of paddle

		if (paddle.offsetLeft >= 380 - 80 )
			paddle.style.left = '300px';

		if (paddle.offsetLeft <= 0)
			paddle.style.left = '0px';
		
		
			
	},false)
}

function Updatelife(lifeb, c_life)
{
	lifeb.innerHTML = 'remaining life(s) : '+c_life;
}

function Endmessage(state)
{
	var messaj = document.createElement('p');
	messaj.style.fontFamily = "bloody";
	messaj.style.fontSize = "100px";
	messaj.style.margin = 'auto';
	messaj.style.width = '500px';
	messaj.style.textAlign = 'center';
	messaj.style.color = '#fd00d6';

	if (state)
	{
		messaj.innerHTML = "Congratulation ,You won; Score : "+current_score;
	}else
	{
		messaj.innerHTML = "Oooooooooops,You failed; Score : "+current_score;
	}

	Gdiv.style.backgroundImage = 'url("ballon.jpg")';
	fdiv.appendChild(messaj);

}


var bricks = initBricks();
var ball = initBall();
var paddle = initPaddle();
var score = initScore();
var life = initlife();
var current_score = 0;
var win = 0;
var failed = 0;
var currentNLife = 4;
var click = 0;

 
board.addEventListener('click',function(e)
{
	


	paddleMove(paddle);
	if (first == 1)
	{
		note.parentNode.removeChild(note);
		first = 0;
	}
	setInterval(moveBall, 0.000005, ball, paddle, bricks, score, life);
	
},false);


