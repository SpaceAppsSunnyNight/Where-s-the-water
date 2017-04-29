var database = [];
var canvas;
var w ,h;
window.onload = function(){
	document.getElementById("search").onclick = request;
}

function setup(){
	request();
    canvas = createCanvas(window.innerWidth*.8, window.innerHeight*.8);
    noLoop();
	canvas.parent("canvas")
	resizeCanvas(window.innerWidth*.9 ,database.length*30);
	h = 35;
	textSize(20);
}
//specific 導電
function draw(){
	// for(var i=0;i<database.length;i++){
		
	// }
    for(var i=0;i<database.length;i++){
		fill(255 , 0, 0);
		rect(0 ,i*h ,database[i].depth*20 ,h/5);
		fill(0 , 200, 0);
		rect(0 ,i*h+h/5*1 ,(database[i].degC)*20 ,h/5);
		fill(0 , 0, 200);
		rect(0 ,i*h+h/5*2 ,(database[i].specific-650)*20 ,h/5);
		fill(0 , 200, 200);
		rect(0 ,i*h+h/5*3 ,(database[i].specific-600)*5 ,h/5);
		fill(200 , 200, 0);
		rect(0 ,i*h+h/5*4 ,(database[i].specific-600)*5 ,h/5);
		fill(0,0,255);
		text(database[i].date ,width-textWidth(database[i].date) ,height/database.length*(i+1)-height/database.length/3);
    }
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
	document.getElementById("prompt").textContent = '請求資料中...';
	var start = document.getElementById("start").value,
		end = document.getElementById("end").value;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			// console.log(xhr.responseText);
			database = JSON.parse(xhr.responseText);
			w = width/database.length;
			resizeCanvas(window.innerWidth*.8 ,database.length*h);
			document.getElementById("prompt").innerHTML = '';
		}
	};
	xhr.open("GET", "http://localhost:3000/data?begin_date="+start+"&end_date="+end, true);
	xhr.send();
}