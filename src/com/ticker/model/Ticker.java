package com.ticker.model;

public class Ticker {
	private String symbol;
	private double price, open, high, low, change, changePer;
	private boolean direction, increase;
	

	public Ticker(String symbol, double open) {
		this.symbol = symbol;
		this.price = this.open = this.high = this.low = open;
		this.change = this.changePer = 0.0f;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.increase = price > this.price;
		this.direction = price > this.open;
		this.high = price > this.high? price: this.high;
		this.low = price < this.low? price: this.low;
		this.change = price - this.open;
		this.changePer = this.change/this.open*100;
		this.price = price;
	}

	public boolean isIncrease() {
		return increase;
	}
	
	public String getSymbol() {
		return symbol;
	}

	public double getOpen() {
		return open;
	}

	public double getHigh() {
		return high;
	}

	public double getLow() {
		return low;
	}

	public double getChange() {
		return change;
	}

	public double getChangePer() {
		return changePer;
	}

	public boolean isDirection() {
		return direction;
	}
	
	
}
