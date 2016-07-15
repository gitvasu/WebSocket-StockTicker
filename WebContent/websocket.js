var endpoint = "ws://localhost:8080/StockTicker/getPriceEndpoint";

var chatClient = null;

function connect() {
	chatClient = new WebSocket(endpoint);
	chatClient.onmessage = function(event) {
		var message = event.data;
		var jsonObj = Ext.util.JSON.encode(message);
		stockStore.getById(jsonObj.symbol);
	};
}

function disconnect() {
	chatClient.close();
}

function sendMessage(message) {
	if(message !== '') {
		chatClient.send(message);
	}
}