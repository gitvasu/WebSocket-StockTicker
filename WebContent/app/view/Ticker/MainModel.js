Ext.define('StockTicker.view.Ticker.MainModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.ticker',
	
	stores: {
		stockStore: {
			storeId: 'stockStore',
			model: 'StockTicker.model.Ticker'
		}
	}
});