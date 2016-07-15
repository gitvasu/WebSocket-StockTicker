Ext.define('StockTicker.view.Ticker.Main', {
	extend : 'Ext.container.Viewport',
	
	requires: ['StockTicker.view.Ticker.MainModel', 'StockTicker.view.Ticker.MainController',
	           'StockTicker.model.Ticker'],

	layout : 'fit',
	items : [ {
		xtype : 'grid',
		viewModel : {
			type : 'ticker'
		},
		controller : 'ticker',
		title : 'Stock Ticker',
		reference: 'stockGrid',
		id: 'stockGrid',
		bind: {
			store : '{stockStore}'
		},
		viewConfig: {
			markDirty: false
		},
		columns : {
			defaults : {
				flex : 1
			},
			items : [
			    {text: 'Symbol', dataIndex: 'symbol'},
			    {text: 'Price', dataIndex: 'price'},
			    {text: 'Open', dataIndex: 'open'},
			    {text: 'High', dataIndex: 'high'},
			    {text: 'Low', dataIndex: 'low'},
			    {text: 'Direction', dataIndex: 'direction', align: 'center', renderer: function(value) { return value?"<span style='color: green'>&#9650;</span>":"<span style='color: red'>&#9660;</span>" }},
			    {text: 'Change', dataIndex: 'change', renderer: function(value) { return value >= 0?"<span style='color: green'>"+value+"</span>":"<span style='color: red'>"+value+"</span>" }},
			    {text: '%', dataIndex: 'changePer', renderer: function(value) { return value >= 0?"<span style='color: green'>"+value+"</span>":"<span style='color: red'>"+value+"</span>" }}
			]
		},
		buttons: [ {
			text: 'Buy',
			bind: {
				disabled: '{!stockGrid.selection}'
			}
		}, {
			text: 'Sell',
			bind: {
				disabled: '{!stockGrid.selection}'
			}
		} ]
	} ]

});