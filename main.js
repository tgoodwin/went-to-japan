// assuming there's a loaded image and a canvas element in the DOM.

var tmp_canvas = document.createElement( 'canvas' );
var tmp_ctx = tmp_canvas.getContext( '2d' );

var my_canvas = document.getElementById('my-canvas');
var ctx = my_canvas.getContext('2d');

var my_image = new Image(640, 480);
my_image.src = "img/28.jpg";
my_image.onload = function() {
  ctx.drawImage(my_image, 0, -200, 300, 400);
};

var is_processing = false;
var parameters = { amount: 3, seed: 50, iterations: 20, quality: 50 };

// draw the image on the canvas
ctx.drawImage( my_image, 0,0, my_canvas.clientWidth, my_canvas.clientHeight );

var my_image_data = ctx.getImageData( 0, 0, my_canvas.clientWidth, my_canvas.clientHeight );
console.log("sampled image data");

function main() {
  $(window).scroll(function(e){
    var st = $(this).scrollTop();
    set_parameters(st);
    generate();
    //restore();
  });
  $(document).keyup(function(e) {
    if(e.keyCode == 13){
      restore();
    }
  });

}

function generate(){
  //if(!is_processing)
  //resetCanvas()
  //updateImageData()
  processImage()
}

function set_parameters( x ){
  parameters.amount = parseInt(35 + (x % 20));
  parameters.seed = parseInt(30 + (x % 10));
  parameters.iterations = parseInt(50 - (x % 10));
  parameters.quality = parseInt(20 + (x % 40));
}

function restore(){
  parameters.amount = 50;
  parameters.seed = 50;
  parameters.iterations = 5;
  parameters.quality = 50;
  processImage();
}

function processImage(){
  is_processing = true;
  glitch(my_image_data, parameters, draw);
}

//callback function for glitch()
function draw( glitched_data ) {
    ctx.putImageData(glitched_data, 0, 0);
    glitched_data = null;
    //glitched_data returned by glitch()
}

$(document).ready(main);
