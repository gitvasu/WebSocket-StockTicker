package com.ticker.endpoint;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ticker.data.TickerDummyData;
import com.ticker.model.Ticker;

@ServerEndpoint("/getPrice")
public class TickerEndpoint {

	static List<Session> sessionList = Collections.synchronizedList(new ArrayList<Session>());
	private static ObjectMapper mapper = new ObjectMapper();
	static {
		final Runnable generateData = new Runnable() {
			Random r = new Random();
			@Override
			public void run() {
				while(true) {
					generateData();
					try {
						Thread.sleep(r.nextInt(500) + 500);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
			}
		};
		new Thread(generateData).start();
	}

	@OnOpen
	public void handleOpen(Session session) {
		sessionList.add(session);
	}
	

	private static void generateData() {
		Ticker tickerObj = TickerDummyData.getChangeQuote();
		try {
			String tickerText = mapper.writeValueAsString(tickerObj);
			for(Session s: sessionList) {
				s.getBasicRemote().sendText(tickerText);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@OnClose
	public void handleClose(Session session) {
		sessionList.remove(session);
	}
	
	@OnError
	public void handleError(Throwable t) {
		t.printStackTrace();
	}
}
