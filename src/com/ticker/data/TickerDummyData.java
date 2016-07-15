package com.ticker.data;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import com.ticker.model.Ticker;

public class TickerDummyData {
	
	static List<Ticker> tickerList = Collections.synchronizedList(new ArrayList<Ticker>());
	
	static {
		tickerList.add(new Ticker("GOOG", 720.30));
		tickerList.add(new Ticker("YHOO", 37.76));
		tickerList.add(new Ticker("FB", 116.83));
		tickerList.add(new Ticker("TWTR", 18.16));
		tickerList.add(new Ticker("LNKD", 189.38));
	}
	
	public static List<Ticker> getAllQuotes() {
		return tickerList;
	}
	
	public static Ticker getChangeQuote() {
		Random r = new Random();
		Ticker tickerObj = tickerList.get(r.nextInt(tickerList.size()));
		int multiplier = r.nextInt(2) == 0? -1: 1;
		tickerObj.setPrice(tickerObj.getPrice() + (Math.random() * multiplier));
		return tickerObj;
	}
	
}
