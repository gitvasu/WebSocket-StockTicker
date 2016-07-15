var hostName = window.location.hostname;
var port = window.location.port == ""? "" : ":"+window.location.port;

var endpoint = "ws://"+hostName+port+"/StockTicker/getPrice";

var webSocket = new WebSocket(endpoint);
webSocket.onmessage = function(event) {
	var message = event.data;
	var jsonObj = JSON.parse(message);
	var stockStore = Ext.getStore('stockStore');
	if(stockStore != null) {
		var record = stockStore.getById(jsonObj.symbol);
		if(record == null) {
			stockStore.add(jsonObj);
		} else {
			record.set(jsonObj);
			var grid = Ext.getCmp('stockGrid');
			if(grid != null) {
				var color = jsonObj.increase? "ccff99": "ff8080"; 
				var row = grid.getView().getRow(record);
				Ext.get(row).highlight(color);
			}
		}
	}
};

function disconnect() {
	webSocket.close();
}

function sendMessage(message) {
	if(message !== '') {
		webSocket.send(message);
	}
}