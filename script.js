// Position of the mouse relative to the canvas
$(document).ready(function(){
	createGameField();
	$("canvas").click(function(e){	
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		coorHandler(x, y);
	});
})

var symbol = "cross";
var arr = new Array();
var arrO = new Array();
var arrX = new Array();
var square = 0;
var squaresFilled = 0;
var winnigCombinations = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

function coorHandler(x, y) {
	if(x <= 130 && x >= 40 && y <= 120 && y >= 40) {
		square = 1;
		if(checkIfAvailable(arr, square)) {
			checkWhosTurn(85, 80, square);
		}
		
	}else if(x <= 130 && x >= 40 && y <= 220 && y >= 122) {
		square = 2;
		if(checkIfAvailable(arr, square)) {
			checkWhosTurn(85, 170, square);
		}
		
	}else if(x <= 130 && x >= 40 && y <= 320 && y >= 204) {
		square = 3;
		if(checkIfAvailable(arr, square)) {
			checkWhosTurn(85, 270, square);
		}
		
	}else if(x <= 220 && x >= 132 && y <= 120 && y >= 40) {
		square = 4;
		if(checkIfAvailable(arr, square)) {
			checkWhosTurn(175, 80, square);
		}
		
	}else if(x <= 220 && x >= 132 && y <= 220 && y >= 122) {
		square = 5;
		if(checkIfAvailable(arr, square)) {
			checkWhosTurn(175, 170, square);
		}
		
	}else if(x <= 220 && x >= 132 && y <= 320 && y >= 204) {
		square = 6;
		if(checkIfAvailable(arr, square)) {
			checkWhosTurn(175, 270, square);
		}
		
	}else if(x <= 310 && x >= 222 && y <= 120 && y >= 40) {
		square = 7;
		if(checkIfAvailable(arr, square)) {
			checkWhosTurn(260, 80, square);
		}
		
	}else if(x <= 310 && x >= 222 && y <= 220 && y >= 122) {
		square = 8;
		if(checkIfAvailable(arr, square)) {
			checkWhosTurn(260, 170, square);
		}
		
	}else if(x <= 310 && x >= 222 && y <= 320 && y >= 204) {
		square = 9;
		if(checkIfAvailable(arr, square)) {
			checkWhosTurn(260, 270, square);
		}
	}
}
    	
function createGameField() {
	// Canvas
	var canvas = document.createElement('canvas');
	canvas.id     				= "position";
	canvas.width  				= 350;
	canvas.height 				= 350;
	canvas.style.zIndex   		= 8;
	canvas.style.position 		= "absolute";
	canvas.style.border   		= "1px solid";
	canvas.style.borderRadius   = "5px";
	
	document.body.appendChild(canvas);
	
	// Game field
	var ctx = canvas.getContext("2d");
	
	//Top line
	ctx.beginPath();
	ctx.moveTo(310,120);
	ctx.lineTo(40,120);
	ctx.closePath();
	ctx.stroke();
	
	//Bottom line
	ctx.beginPath();
	ctx.moveTo(310,220);
	ctx.lineTo(40,220);
	ctx.closePath();
	ctx.stroke();
	
	//Left line
	ctx.beginPath();
	ctx.moveTo(130,310);
	ctx.lineTo(130,40);
	ctx.closePath();
	ctx.stroke();
	
	//Right line
	ctx.beginPath();
	ctx.moveTo(220,310);
	ctx.lineTo(220,40);
	ctx.closePath();
	ctx.stroke();
}

function winCheckO(arrO) {
	 var counter = 0;
	 
	 if(arrO.length > 2) {
		for(var i=0; i<winnigCombinations.length; i++) {
			for(var k=0; k<3; k++) {
				for(var j=0; j<arrO.length; j++) {
					if(winnigCombinations[i][k] === arrO[j]) {
						counter++;
			 			if(counter === 3) {
			 				alert("Zmagal KROG!");
			 				location.reload(true);
			 			}
		 			}	
				}
		 	}
		 	counter=0;	
		}
	}
}

function winCheckX(arrX) {
	var counter = 0;
 	
 	if(arrX.length > 2) {
		for(var i=0; i<winnigCombinations.length; i++) {
			for(var k=0; k<3; k++) {
				for(var j=0; j<arrX.length; j++) {
					if(winnigCombinations[i][k] === arrX[j]) {
						counter++;
			 			if(counter === 3) {
			 				alert("Zmagal KRIZ!");
			 				location.reload(true);
			 			}
		 			}	
				}
		 	}
		 	counter=0;	
	 	}
	}
}

function checkIfAvailable(arr, square) {
	for(var i=0; i<=arr.length; i++) {
		if(arr[i] === square) {
			return false;
		}
	}
	arr.push(square);
	return true;
}

function checkWhosTurn(x, y, squareFilled) {
	if(symbol === "circle") {
		symbol = "cross";	
		arrO.push(square);
		drawCircle(x, y);
	}else {
		symbol = "circle";
		arrX.push(square);
		drawCross(x, y);
	}
}

function drawCircle(x, y) {
	var ctx = $("canvas")[0].getContext("2d");
	ctx.beginPath();
	ctx.arc(x, y, 20, 0, Math.PI*2); 
	ctx.lineWidth = 5;
	ctx.closePath();
	ctx.strokeStyle = '#ff0000';
	ctx.stroke();
	winCheckO(arrO);
	squaresFilled++;
}

function drawCross(x, y) {
	var ctx = $("canvas")[0].getContext("2d");
	ctx.beginPath();
	ctx.moveTo(x - 20, y - 20);
    ctx.lineTo(x + 20, y + 20);
    ctx.moveTo(x + 20, y - 20);
    ctx.lineTo(x - 20, y + 20);
    ctx.lineWidth = 5;
	ctx.closePath();
	ctx.strokeStyle = '#000';
	ctx.stroke();
	winCheckX(arrX);
	squaresFilled++;
}

function winLine() {
	var ctx = $("canvas")[0].getContext("2d");
	ctx.beginPath();
	ctx.moveTo(220,310);
	ctx.lineTo(220,40);
	ctx.lineWidth = 7;
	ctx.closePath();
	ctx.stroke();
}

   




