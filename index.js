var canvas;
var context;
var height;
var width;
const flock = [];

setup = () => {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    height = canvas.height;
    width = canvas.width;
    context.lineWidth = 3;
    context.fillStyle = "white"; 
    context.strokeStyle = "white";

    for(var i = 0; i< 250; i ++)
        flock.push(new Boid(width*Math.random(),height*Math.random()));

    setInterval(draw,
    50);
    

}

draw = () => {
    context.clearRect(0, 0, width, height);
    for(let boid of flock) {
        boid.update(flock, width, height);
        boid.draw(context);
    }
}

setup();

