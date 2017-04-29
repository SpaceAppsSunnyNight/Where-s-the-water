var arr = [];
for(var i=0;i<100;i++)
	arr.push(i)
arr.sort(function(){return .5-Math.random()});

function setup(){
    createCanvas(window.innerWidth*.8 ,window.innerHeight ,WEBGL);
}

function draw(){
	rotateX(.03);
	rotateY(frameCount*0.005);
	for(var i=0;i<arr.length;i++)
		box(width/arr.length ,height/100*i ,arr[i]);
}
