var database = [];
var canvas;

window.onload = function(){
	document.getElementById("search").onclick = request;
}

function setup(){
	request();
    canvas = createCanvas(window.innerWidth*.8, window.innerHeight*.8);
    noLoop();
	canvas.parent("canvas")
	resizeCanvas(window.innerWidth*.9 ,database.length*30);
}

function draw(){
	var n = 10;
	for(var i=0;i<database.length;i++){
		console.log(database[0].depth)
		fill((database[i].specific-650)*10 ,0, 0);
		rect(0 ,height/database.length*i , (database[i].specific-650)*20 ,height/database.length);
		fill(0, 0, 255);
		textSize(20);
		text(database[i].date ,width-textWidth(database[i].date) ,height/database.length*(i+1)-height/database.length/3);
	}
}

function request(){
	var start = document.getElementById("start").value,
		end = document.getElementById("end").value;
	console.log("search")
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			// console.log(xhr.responseText);
			database = JSON.parse(xhr.responseText);
			resizeCanvas(window.innerWidth*.8 ,database.length*30);
		}
	};
	xhr.open("GET", "http://localhost:3000/data?begin_date="+start+"&end_date="+end, true);
	xhr.send();
}