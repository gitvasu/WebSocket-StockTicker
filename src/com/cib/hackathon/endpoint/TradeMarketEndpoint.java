package com.cib.hackathon.endpoint;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.codehaus.jackson.map.ObjectMapper;

import com.cib.hackathon.model.Ticker;

@ServerEndpoint("/getPriceEndPoint")
public class TradeMarketEndpoint {

	static List<Session> listSession = Collections.synchronizedList(new ArrayList<Session>());
	static List<Ticker> listTicker = Collections.synchronizedList(new ArrayList<Ticker>());

	private static final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

	static {
		Ticker goggle = new Ticker("GOOG", 505.12);
		listTicker.add(goggle);
		Ticker infy = new Ticker("INFY", 245.01);
		listTicker.add(infy);
		Ticker amd = new Ticker("AMD", 378.67);
		listTicker.add(amd);
		Ticker emphsys = new Ticker("EMPSYS", 207.12);
		listTicker.add(emphsys);
		Ticker tcs = new Ticker("TCS", 298.12);
		listTicker.add(tcs);

		final Runnable generateData = new Runnable() {
			public void run() {
				generateData();
			}
		};

		scheduler.scheduleAtFixedRate(generateData, 0, 2, TimeUnit.SECONDS);
	}

	@OnOpen
	public void handleOpen(Session usersession) {
		listSession.add(usersession);
	}

	@OnClose
	public void handleClose(Session usersession) {
		listSession.remove(usersession);
	}

	@OnError
	public void handleError(Throwable t) {
		t.printStackTrace();
	}

	private static void generateData() {
		Random random = new Random();
		Ticker tickerObj = listTicker.get(random.nextInt(listTicker.size()));
		int multiplier = random.nextInt(2) == 0 ? -1 : 1;
		tickerObj.setCurrentPrice(tickerObj.getCurrentPrice() + (Math.random() * multiplier));

		Iterator<Session> sessionIterator = listSession.iterator();
		String ticker = null;

		while (sessionIterator.hasNext()) {
			ObjectMapper mapper = new ObjectMapper();
			try {
				ticker = mapper.writeValueAsString(tickerObj);
				sessionIterator.next().getBasicRemote().sendText(ticker);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
