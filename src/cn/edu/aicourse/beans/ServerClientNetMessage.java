package cn.edu.aicourse.beans;

import javax.servlet.http.HttpServletRequest;
import java.net.*;

import org.apache.commons.lang.StringUtils;


public class ServerClientNetMessage {
	private HttpServletRequest request;
	public ServerClientNetMessage(HttpServletRequest request){	
		this.request = request;
	}
	public String getClientIpAddr() {
		   String ip = request.getHeader("x-forwarded-for"); 
	       if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {      
	           ip = request.getHeader("Proxy-Client-IP");      
	       }      
	       if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {      
	           ip = request.getHeader("WL-Proxy-Client-IP");      
	       }      
	       if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {      
	           ip = request.getRemoteAddr();      
	       }
	       return ip;    
    }
	public String getServerName(){
		String serverName = request.getServerName();
		return serverName;
	}
	public int getServerPort(){
		int serverPort = request.getServerPort();
		return serverPort;
	}
	public String getServerIp()
	{
		InetAddress serverIp = null;
		try{
			serverIp = InetAddress.getLocalHost();
		}
		catch(UnknownHostException e)
		{
			
		}
		return serverIp.getHostAddress();
	}
	
}
