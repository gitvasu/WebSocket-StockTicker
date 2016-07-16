# StockTicker
A simple fake stock ticker - WebSocket implementation

The UI is implemented using Ext

![alt tag](images/Screenshot.png?raw=true)

![alt tag](images/Screenshot_mobile.png?raw=true)

The WebSocket connection is established once the index.html is loaded. The fake stock prices are refreshed on the screen by sending messages from the server (Tomcat). This is an implementation of Comet and there is no polling mechanism involved. The server can send the prices to multiple active clients (browser).

###Other Links
[Comet](https://en.wikipedia.org/wiki/Comet_(programming))

[WebSocket](https://en.wikipedia.org/wiki/WebSocket)
