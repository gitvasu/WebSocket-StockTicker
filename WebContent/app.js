Ext.define('StockTicker.model.Ticker', {
	extend: 'Ext.data.Model',
	fields:['ticker', 'currentPrice', 'openPrice', 'high', 'low', 'direction', 'change', 'changePer'],
    proxy: {
    	type: 'memory'
    },
    idProperty: 'ticker'
})

var stockStore = Ext.create('Ext.data.Store', {
    model: 'StockTicker.model.Ticker'
});

Ext.define('StockTicker.ViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.stock'
});

Ext.define('StockTicker.ViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.stock',
	
	currentRecord: null,
	
	onBuy: function(record) {
		this.currentRecord = record;
		var ticker = this.currentRecord.get('symbol'); 
        Ext.MessageBox.prompt('Buy '+ticker, 'Please enter the quantity:', this.doBuy, this);
    },
    
    onSell: function(record) {
    	this.currentRecord = record;
    	var ticker = this.currentRecord.get('symbol');
        Ext.MessageBox.prompt('Sell '+ticker, 'Please enter the quantity:', this.doSell, this);
    },
    
    doBuy: function(btn, text) {
    	if(btn === 'ok') {
    		var ticker = this.currentRecord.get('symbol');
    		this.showToast('Your order to buy ' + ticker + ' has been placed. Quantity: ' + text);
    	}
    },
    
    doSell: function(btn, text) {
    	if(btn === 'ok') {
    		var ticker = this.currentRecord.get('symbol');
    		this.showToast('Your order to sell ' + ticker + ' has been placed. Quantity: ' + text);
    	}
    },
    
    showToast: function(s) {
        Ext.toast({
            html: s,
            closable: false,
            align: 't',
            slideInDuration: 400,
            minWidth: 400
        });
    }
	
});

Ext.application({
    name : 'StockTicker',
    
    launch : function(){
        
        Ext.create('Ext.container.Viewport', 
        {
            layout : 'fit',
            
            items : [{
                xtype: 'grid',
                viewModel: {
                	type: 'stock'
                },
                controller: 'stock',
            	title : 'Stock Ticker',
            	reference: 'stockGrid',
            	store: stockStore,
            	viewConfig: {
            		markDirty: false
            	},
            	columns:  {
            		defaults: {
            			flex: 1
            		},
            		items: [
      	    	          { header: 'Symbol',  dataIndex: 'ticker' },
    	    	          { header: 'Price', dataIndex: 'currentPrice', renderer: Ext.util.Format.numberRenderer('0.000')},
    	    	          { header: 'Open', dataIndex: 'openPrice', renderer: Ext.util.Format.numberRenderer('0.000') },
    	    	          { header: 'High', dataIndex: 'high', renderer: Ext.util.Format.numberRenderer('0.000') },
    	    	          { header: 'Low', dataIndex: 'low', renderer: Ext.util.Format.numberRenderer('0.000') },
    	    	          { header: 'Direction', dataIndex: 'direction', align: 'center', renderer: function(value) { return value?"<span style='color: green'>&#9650;</span>":"<span style='color: red'>&#9660;</span>" }},
    	    	          { header: 'Change', dataIndex: 'change', renderer: Ext.util.Format.numberRenderer('0.000') },
    	    	          { header: '%', dataIndex: 'changePer', renderer: Ext.util.Format.numberRenderer('0.000') }
        	          ]
            	},
            	buttons: [{
            		text: 'Buy',
            		bind: {
            			disabled: '{!stockGrid.selection}'
            		},
            		handler: function(btn) {
        				var record = btn.up('grid').getSelection()[0];
        				btn.up('grid').getController().onBuy(record);
        			}
            	}, {
            		text: 'Sell',
            		bind: {
            			disabled: '{!stockGrid.selection}'            			
            		},
            		handler: function(btn) {
        				var record = btn.up('grid').getSelection()[0];
        				btn.up('grid').getController().onSell(record);
        			}
            	}]
            }]
        });
        
    }
});