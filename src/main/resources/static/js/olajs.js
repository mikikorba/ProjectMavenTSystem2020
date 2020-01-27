// var mqttClient = new Paho.MQTT.Client("openlab.kpi.fei.tuke.sk", 80, "TSDemo_" + new Date().getTime());
// mqttClient.onConnectionLost = onConnectionLost;
// mqttClient.onMessageArrived = onMessageArrived;
// mqttClient.connect({onSuccess : onConnect});

// function onConnect() {
// 	console.log("onConnect");
// 	mqttClient.subscribe("openlab/voice/recognition");
// }

// function onConnectionLost(responseObject) {
// 	if (responseObject.errorCode !== 0) {
// 		console.log("onConnectionLost:" + responseObject.errorMessage);
// 	}
// }

// function onMessageArrived(message) {
// 	console.log("onMessageArrived:" + message.topic + " "+ message.payloadString);
// 	var result = JSON.parse(message.payloadString);
// 	if (result.status === 'recognized') {
// 		var x = result.recognized;
// 	}
// }

var mqttClient = new Paho.MQTT.Client("openlab.kpi.fei.tuke.sk", 443, "TSDemo_"
		+ new Date().getTime());
mqttClient.onConnectionLost = onConnectionLost;
mqttClient.onMessageArrived = onMessageArrived;
mqttClient.connect({
	onSuccess : onConnect,
	useSSL: true
// , reconnect: true
});

function appendLog(string) {
	 document.getElementById('ee').innerHTML = document.getElementById('ee').innerHTML + "<br>" + string;
}

function onConnect() {
	console.log("onConnect");
//	appendLog("onConnect");
	mqttClient.subscribe("openlab/voice/recognition");
}

function onConnectionLost(responseObject) {
	appendLog("onConnectionLost:" + responseObject.errorMessage);
	if (responseObject.errorCode !== 0) {
		console.log("onConnectionLost:" + responseObject.errorMessage);
	}
}
function say(text) {
    var content = JSON.stringify( {"say" : text});
    var message = new Paho.MQTT.Message(content);
    message.destinationName = "openlab/audio";
    mqttClient.send(message);
    console.log("say : " + message.payloadString);
}

function onMessageArrived(message) {
	// appendLog("onMessageArrived:" + message.payloadString);
	// appendLog("message.topic:" + message.topic);

	console.log("onMessageArrived:" + message.payloadString);
	// if (message.topic === "openlab/voice/recognition") {
	var result = JSON.parse(message.payloadString);
	// appendLog("result.status:" + result.status);
	if (result.status === 'recognized') {
		console.log("recognized: " + result.recognized);
//		appendLog("result.recognized: " + result.recognized);
		var input = result.recognized;
		// }
		getInputAction(input);
	}
}
