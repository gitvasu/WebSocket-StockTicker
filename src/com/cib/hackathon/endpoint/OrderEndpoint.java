package com.cib.hackathon.endpoint;

import java.io.IOException;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;



@ServerEndpoint("/buyOrder")
public class OrderEndpoint {

	@OnOpen
	public void handleOpen(Session userSession)
	{
		System.out.println("Connction Open -- OrderEndpoint");
	}
	
	@OnMessage
	public void handleMessage(String message, Session userSession)
	{
		ObjectMapper mapper = new ObjectMapper();
		
//		try {
////			OrderVo order = mapper.readValue(message, OrderVo.class);
////			GetTrades.orders.add(order);
//		} catch (JsonParseException e) {
//			e.printStackTrace();
//		} catch (JsonMappingException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
	}
	
	@OnClose
	public void handleClose(Session userSession)
	{
		
	}
	
	@OnError
	public void handleError(Throwable t)
	{
		t.printStackTrace();	
	}
}
