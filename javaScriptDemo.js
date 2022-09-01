var span; var load; var loadPos;
var scalex;
var scaley;
var ctx;

var beamCanvas = document.getElementById("beamCanvas");
var ctxbeam = beamCanvas.getContext("2d");
var width = beamCanvas.width;
var height = beamCanvas.height;
var startx = width / 10;
var endx = 9 * width / 10;
var starty = height / 2;

drawLine(ctxbeam, startx, starty, endx, starty);

drawLine(ctxbeam, startx, starty, startx + 10, starty + 10);
drawLine(ctxbeam, startx + 10, starty + 10, startx - 10, starty + 10);
drawLine(ctxbeam, startx - 10, starty + 10, startx, starty);
drawLine(ctxbeam, endx, starty, endx + 10, starty + 10);
drawLine(ctxbeam, endx + 10, starty + 10, endx - 10, starty + 10);
drawLine(ctxbeam, endx - 10, starty + 10, endx, starty);

function beamCalculator() {
	span = parseInt(document.getElementById("span").value);
	load = parseInt(document.getElementById("load").value);
	loadPos = parseInt(document.getElementById("loadPos").value);

	if (loadPos > span || loadPos < 0) {
		alert("Load location should be greater than 0 and smaller than span.");
		return;
	}

	//draw beam loading

	ctxbeam.clearRect(0, 0, beamCanvas.width, beamCanvas.height / 2);
	ctxbeam.clearRect(0, beamCanvas.height / 2+15, beamCanvas.width, beamCanvas.height / 2+15);
	//drawLine(ctxbeam, startx, starty, endx, starty);
	getScale(beamCanvas, load);
	//document.getElementById("para").innerHTML= scalex;	
	drawLine(ctxbeam, startx + loadPos * scalex, starty, startx + loadPos * scalex, starty - load * scaley);
	drawLine(ctxbeam, startx + loadPos * scalex, starty, startx + loadPos * scalex - 10, starty - 10);
	drawLine(ctxbeam, startx + loadPos * scalex, starty, startx + loadPos * scalex + 10, starty - 10);
	ctxbeam.font = "12px Arial";
	ctxbeam.fillText(load, startx + loadPos * scalex + 2, starty - beamCanvas.height / 5,);


	var rxnB = load * loadPos / span;
	var rxnA = load - rxnB;

	var sfa = rxnA;
	var sfl_left = rxnA;
	var sfl_right = rxnA - load;
	var sfb = -rxnB

	ctxbeam.fillText("R= "+rxnA, startx-15 , starty + beamCanvas.height / 3,);
	ctxbeam.fillText("R= "+rxnB, endx-15 , starty + beamCanvas.height / 3,);

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

	scalex = (endx - startx) / span;


	if (rxnA > rxnB) {
		scaley = 0.4 * height / rxnA;
	}
	else scaley = 0.4 * height / rxnB;

	


	drawLine(ctxshear, startx, starty, startx, starty + sfa * scaley);
	drawLine(ctxshear, startx, starty + sfa * scaley, startx + loadPos * scalex, starty + sfl_left * scaley);
	drawLine(ctxshear, startx + loadPos * scalex, starty + sfl_left * scaley, startx + loadPos * scalex, starty + (sfl_left - load) * scaley);
	drawLine(ctxshear, startx + loadPos * scalex, starty + (sfl_left - load) * scaley, startx + span * scalex, starty + (sfl_left - load) * scaley);
	drawLine(ctxshear, startx + span * scalex, starty + (sfl_left - load) * scaley, startx + span * scalex, starty);

	//adding text
	ctxshear.font = "12px Arial";
	ctxshear.fillText(rxnA.toFixed(1), startx + loadPos * scalex + 2, starty + sfa * scaley);
	ctxshear.fillText(rxnB.toFixed(1), startx + loadPos * scalex - 15, starty + (sfl_left - load) * scaley);

	//bending moment diagram
	var bendCanvas = document.getElementById("bendCanvas");
	var ctxbend = bendCanvas.getContext("2d");
	width = bendCanvas.width;
	height = bendCanvas.height;
	ctxbend.clearRect(0, 0, bendCanvas.width, bendCanvas.height);
	startx = width / 10;
	endx = 9 * width / 10;
	starty = height / 4;
	drawLine(ctxbend, startx, starty, endx, starty);

	var moment_loc = load * loadPos * (span - loadPos) / span;
	scalex = (endx - startx) / span;
	scaley = 0.6 * height / moment_loc;




	drawLine(ctxbend, startx, starty, startx + loadPos * scalex, starty + moment_loc * scaley);
	drawLine(ctxbend, startx + loadPos * scalex, starty + moment_loc * scaley, startx + span * scalex, starty);
	ctxbend.font = "12px Arial";
	ctxbend.fillText(moment_loc.toFixed(1), startx + loadPos * scalex - 5, starty + moment_loc * scaley - 10);
}
function getScale(canvas, max_force) {
	ctx = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;
	startx = width / 10;
	endx = 9 * width / 10;
	starty = height / 2;

	scalex = (endx - startx) / span;
	scaley = 0.4 * height / max_force;
}
function drawLine(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}




