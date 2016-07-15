Ext.define('StockTicker.model.Ticker', {
	extend: 'Ext.data.Model',
	fields:[
	   'symbol', 'direction',
	   {
		   name: 'price', 
		   convert: function(value) {
			   return Ext.util.Format.number(value, '0.00');
		   }
	   }, {
		   name: 'open',
		   convert: function(value) {
			   return Ext.util.Format.number(value, '0.00');
		   }
	   }, {
		   name: 'high',
		   convert: function(value) {
			   return Ext.util.Format.number(value, '0.00');
		   }
	   }, {
		   name: 'low',
		   convert: function(value) {
			   return Ext.util.Format.number(value, '0.00');
		   }
	   }, {
		   name: 'change',
		   convert: function(value) {
			   var val =  Ext.util.Format.number(value, '0.00');
			   return val <= 0? val: "+"+val;
		   }
	   }, {
		   name: 'changePer',
		   convert: function(value) {
			   var val =  Ext.util.Format.number(value, '0.00');
			   return val <= 0? val: "+"+val;
		   }
	   }
	],
	proxy: {
    	type: 'memory'
    },
    idProperty: 'symbol'
});

'open', 'high', 'low', 'direction', 'change', 'changePer'