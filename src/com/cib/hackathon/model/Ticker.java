package com.cib.hackathon.model;

public class Ticker {
	
	private String ticker;
	private double currentPrice;
	private double openPrice;
	private double high;
	private double low;
	private boolean direction;
	private double change;
	private double changePer;
	
	
	public Ticker(String ticker, double openPrice) {
		this.ticker = ticker;
		this.currentPrice = openPrice;
		this.openPrice = openPrice;
		this.high = openPrice;
		this.low = openPrice;
	}
	
	
	public String getTicker() {
		return ticker;
	}
	public double getCurrentPrice() {
		return currentPrice;
	}
	public void setCurrentPrice(double currentPrice) {
		this.direction = currentPrice > this.currentPrice;
		this.high = currentPrice > this.high? currentPrice: this.high;
		this.low = currentPrice < this.low? currentPrice: this.low;
		this.change = currentPrice - this.openPrice;
		this.changePer = this.change/100;
		this.currentPrice = currentPrice;
	}
	public double getOpenPrice() {
		return openPrice;
	}
	public double getHigh() {
		return high;
	}
	public double getLow() {
		return low;
	}
	public boolean isDirection() {
		return direction;
	}
	public double getChange() {
		return this.change;
	}
	public double getChangePer() {
		return this.changePer;
	}
}
