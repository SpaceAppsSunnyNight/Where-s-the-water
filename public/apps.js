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
	textSize(20);
}
//specific 導電
function draw(){
	for(var n=0;n<database.length;n++){
		// if(database[n].depth>max_depth)
			// max_depth = database[n].depth;
		if(database[n].specific<min_specific)
			max_specific = database[n].min_specific;
		// if(database[n].degC>max_degC)
			// max_degC = database[n].degC;
	}
    for(var i=0;i<database.length;i++){
		fill(255 , 0, 0);
		rect(0 ,i*h ,database[i].depth*width/20 ,h/5);
		fill(100 , 200, 0);
		rect(0 ,i*h+h/5*1.5 ,(database[i].degC)*width/20 ,h/5);
		fill(0 , 200, 200);
		rect(0 ,i*h+h/5*3 ,(database[i].specific-min_specific+5)*width/10 ,h/5);
		fill(0 , 200, 200);
		// rect(0 ,i*h+h/5*3 ,(database[i].specific-600)*5 ,h/5);
		// fill(200 , 200, 0);
		// rect(0 ,i*h+h/5*4 ,(database[i].specific-600)*5 ,h/5);
		fill(0,100,200);
		text(database[i].date ,width-textWidth(database[i].date) ,height/database.length*(i+1)-height/database.length/3);
    }
	noLoop();
	// var n = 10;
	// for(var i=0;i<database.length;i++){
		// fill((database[i].specific-650)*10 ,255-(database[i].specific-650)*10, 0);
		// rect(0 ,height/database.length*i , (database[i].specific-650)*width/25 ,height/database.length/2);

		// fill(0 ,0, (database[i].specific-650)*10);
		// rect(0 ,height/database.length*i+height/database.length/2 , (database[i].depth)*width/25 ,height/database.length/2);
		// textSize(20);
		// text(database[i].date ,width-textWidth(database[i].date) ,height/database.length*(i+1)-height/database.length/3);
	// }
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
			console.log(xhr.responseText);
			database = JSON.parse(xhr.responseText);
			w = width/database.length;
			resizeCanvas(window.innerWidth*.8 ,database.length*h);
			max_depth=0 ,min_specific = database[0].specific ,max_degC=0;
			if(database.length===0)
				document.getElementById("prompt").innerHTML = 'data not found';
			else
				document.getElementById("prompt").innerHTML = "";
			draw();
		}
	};
	xhr.open("GET", "http://localhost:3000/data?begin_date="+start+"&end_date="+end, true);
	xhr.send();
}