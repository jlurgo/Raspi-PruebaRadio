var radio = require('nrf').connect("/dev/spidev0.0", 25);

radio.channel(0x4c); // Set channel to 76
radio.dataRate('1Mbps') // Set data rate to 1Mbps
//radio.crcBytes(2) // Set the CRC to 2
//radio.autoRetransmit({
//	count: 15,
//	delay: 4000
//}); // Auto retransmit up to 15 times
// 
// Start the radio
radio.begin(function() {
	//radio.printDetails();
	var tx = radio.openPipe('tx', 0xe8e8f0f0e1); // Send to address
 
	// Fires when our transmission pipe is ready
	tx.on('ready', function() {
		console.log("TX Ready");
		radio.printDetails();
		tx.write("A"); // Send a quick "I'm here" message
//		setInterval(function(){
//			tx.write("1");
//		}, 1000);
	});
 
//	// Fires when our reception pipe is ready
//	rx.on('ready', function() {
//		console.log("RX Ready");
//		radio.printDetails();
//	});
// 
//	// Fires when our reception pipe recieves data
//	rx.on('data', function(d) {
//		console.log("Recieved:", d.toString('utf8')); // Decode the data and print 
//		tx.write(d); // Send back the same data we just got
//	});
// 
	// Handler for errors
	tx.on('error', function(e) {
		console.log("Error:", e);
	});
//	rx.on('error', function(e) {
//		console.log("Error:", e);
//	});
});