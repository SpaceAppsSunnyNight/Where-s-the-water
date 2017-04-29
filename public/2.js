var database = [];
var canvas;
var w ,h;
var max_depth ,min_specific ,max_degC;

window.onload = function(){
	document.getElementById("search").onclick = request;
}

function preload(){
	request();
}

function setup(){
    canvas = createCanvas(window.innerWidth*.8, window.innerHeight*.8);
    noLoop();
	canvas.parent("canvas")
	resizeCanvas(window.innerWidth*.9 ,database.length*30);
	h = 35;
	fill(0);
	textSize(20);
}
//specific 導電
function draw(){
	background(200);
	clear();
	var w = width/database.length;
	for(var n=0;n<database.length;n++){
		// if(database[n].depth>max_depth)
			// max_depth = database[n].depth;
		if(database[n].specific<min_specific)
			max_specific = database[n].min_specific;
		// if(database[n].degC>max_degC)
			// max_degC = database[n].degC;
	}
    for(var i=0;i<database.length-1;i++){
		fill(255);
		quad(
			w*i+w/2, (database[i].specific-min_specific+1)*100,
			w*(i+1)+w/2, (database[i+1].specific-min_specific+1)*100,
			w*(i+1)+w/2 ,height,
			w*i+w/2, height
		)
		console.log(
			(database[i].specific-min_specific-10),
			(database[i+1].specific-min_specific-10)
		)
    }
	noLoop();
}

function request(){
	console.log("start")
	document.getElementById("prompt").textContent = '請求資料中...';
	resizeCanvas(0 ,0);
	var start = document.getElementById("start").value,
		end = document.getElementById("end").value;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			database = JSON.parse(xhr.responseText);
			w = width/database.length;
			resizeCanvas(window.innerWidth*.8 ,database.length*h);
			max_depth=0 ,min_specific = database[0].specific ,max_degC=0;
			if(database.length===0)
				document.getElementById("prompt").innerHTML = 'data not found';
			else
				document.getElementById("prompt").innerHTML = "";
			draw();
		}else
			draw_error();
	};
	xhr.open("GET", "http://localhost:3000/data?begin_date="+start+"&end_date="+end, true);
	xhr.send();
}

function draw_error(){
	resizeCanvas(200,100);
	text("request error" ,10,20)
}