var endpoint = "ws://localhost:8080/TradersToolApplication/getPriceEndPoint";

var chatClient = null;

chatClient = new WebSocket(endpoint);
chatClient.onmessage = function(event) {
	var message = event.data;
	var jsonObj = JSON.parse(message);
	var record = stockStore.getById(jsonObj.ticker); 
	if(record == null) {
		stockStore.add(jsonObj);
	} else {
		record.set(jsonObj);
	}
};

function disconnect() {
	chatClient.close();
}

function sendMessage(message) {
	if(message !== '') {
		chatClient.send(message);
	}
}