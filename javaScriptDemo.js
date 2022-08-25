var beamCanvas = document.getElementById("beamCanvas");
var ctxbeam = beamCanvas.getContext("2d");
var width = beamCanvas.width;
var height = beamCanvas.height;
var startx = width / 10;
var endx = 9 * width / 10;
var starty = height / 2;

drawLine(ctxbeam, startx, starty, endx, starty);


function beamCalculator() {
	var span = document.getElementById("span").value;
	var load = document.getElementById("load").value;
	var loadPos = document.getElementById("loadPos").value
	var rxnB = load * loadPos / span;
	var rxnA = load - rxnB;

	var sfa = rxnA;
	var sfl_left = rxnA;
	var sfl_right = rxnA - load;
	var sfb = -rxnB

	//document.getElementById("para").innerHTML = sfl_left;

	//shear force diagram
	var shearCanvas = document.getElementById("shearCanvas");
	var ctxshear = shearCanvas.getContext("2d");
	width = shearCanvas.width;
	height = shearCanvas.height;
	ctxshear.clearRect(0, 0, shearCanvas.width, shearCanvas.height);
	startx = width / 10;
	endx = 9 * width / 10;
	starty = height / 2;

	drawLine(ctxshear, startx, starty, endx, starty);

	var scalex = (endx - startx) / span;
	var scaley;
	if (rxnA > rxnB) {
		scaley = 0.4 * height / rxnA;
	}
	else scaley = 0.4 * height / rxnB;


	drawLine(ctxshear, startx, starty, startx, starty + sfa * scaley);
	drawLine(ctxshear, startx, starty + sfa * scaley, startx + loadPos * scalex, starty + sfl_left * scaley);
	drawLine(ctxshear, startx + loadPos * scalex, starty + sfl_left * scaley, startx + loadPos * scalex, starty + (sfl_left - load) * scaley);
	drawLine(ctxshear, startx + loadPos * scalex, starty + (sfl_left - load) * scaley, startx + span * scalex, starty + (sfl_left - load) * scaley);
	drawLine(ctxshear, startx + span * scalex, starty + (sfl_left - load) * scaley, startx + span * scalex, starty);

}

function drawLine(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}


