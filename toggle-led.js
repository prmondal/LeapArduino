var Leap = require('leapjs');
var five = require("johnny-five");

var ledPin = 13;

var board = new five.Board({
	port: "COM17"
});

var leapControllerOptions = {
	enableGestures: true
};

board.on("ready", function() {
	console.log('Welcome to awesome world!');

	var led = new five.Led(ledPin);

	//leap controller loops to check for frames when browser is ready to draw
  	var controller = Leap.loop(leapControllerOptions, function(frame){
	  //turn on LED if single hand is detected
	  //(frame.hands.length == 1) ? led.on() : led.off();

	  //turn on LED if circular gesture is detected
	  //turn off LED if swipe gesture is detected
	  if(frame.gestures.length > 0) {
	  	frame.gestures.forEach(function(g) {
	  		switch(g.type) {
	  			case 'circle':
	  				console.log('circle gesture detected.')
	  				led.on();
	  				break;

	  			case 'swipe':
	  				console.log('swipe gesture detected.')
	  				led.off();
	  				break;

	  			default:
	  				console.log('no gesture detected.')
	  				break;
	  		}
	  	});
	  }
	});
});

console.log('Connecting to awesome world...');


