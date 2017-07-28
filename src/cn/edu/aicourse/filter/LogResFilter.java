package cn.edu.aicourse.filter;

import java.io.IOException;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.MDC;

import cn.edu.aicourse.beans.ServerClientNetMessage;
import cn.edu.aicourse.entity.User;

import com.opensymphony.xwork2.ActionContext;

/**
 * ͳһ�����ַ���
 * @author Administrator
 *
 */
public class LogResFilter implements Filter {
	
	private final static double DEFAULT_USERID= 0.0; 
	
	public void destroy() {
	}

	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
			FilterChain filterChain) throws IOException, ServletException {
		//��ȡ�ͻ����������Ϣ
		HttpServletRequest request=(HttpServletRequest)servletRequest; 
		HttpServletResponse response=(HttpServletResponse)servletResponse; 
		String browser_msg = request.getHeader("User-Agent");
		MDC.put("browser_msg",browser_msg);
		//��ȡ�ͻ���ip��ַ
		ServerClientNetMessage message = new ServerClientNetMessage(request);
		String accessIp = message.getClientIpAddr();
		MDC.put("fetcherip",accessIp);		
		//��ȡ���������
		String serverName = message.getServerName();
		MDC.put("serverName",serverName);		
		//��ȡ����˶˿�
		int serverPort = message.getServerPort();
		MDC.put("serverPort",serverPort);	
		//��ȡ����˵�ַ
		String serverIp = message.getServerIp();
		MDC.put("serverIp",serverIp);
		//��ȡ�����û���id
		
		String currentURL = request.getRequestURI();
		String targetURL = currentURL.substring(currentURL.indexOf("/", 1), currentURL.length());
		Map session=ActionContext.getContext().getSession();
		if (!"/login.jsp".equals(targetURL) && !"/register.jsp".equals(targetURL) && !"/error.jsp".equals(targetURL)) 
		{
		
	        if (session.get("user")==null || session.get("loginState") == null)//�ж�û�е�¼װ��
	        {  
	            MDC.put("userId",DEFAULT_USERID);
	            response.sendRedirect(request.getContextPath() + "/login.jsp");    
	            return;
	        }
	        else
	        {
	        	User usertemp = (User)session.get("user");
	            Integer userId = usertemp.getUserId();
	           
				if("/contentManage.jsp".equals(targetURL)){
					if(usertemp.getUserType() != 1 && usertemp.getUserType() != 4){
						 response.sendRedirect(request.getContextPath() + "/menu.jsp");   
					}
					if(usertemp.getUserType() == 1){
						 response.sendRedirect(request.getContextPath() + "/manager.jsp");   
					}
				}else if("/manager.jsp".equals(targetURL)){
					if(usertemp.getUserType() != 1 && usertemp.getUserType() != 4){
						 response.sendRedirect(request.getContextPath() + "/menu.jsp");   
					}
					if(usertemp.getUserType() == 4){
						 response.sendRedirect(request.getContextPath() + "/contentManage.jsp"); 
					}
				}else if("/teacherMessage.jsp".equals(targetURL) || "/studentMessage.jsp".equals(targetURL)|| "/uploadFile.jsp".equals(targetURL)){
					if(usertemp.getUserType() == 3){
						 response.sendRedirect(request.getContextPath() + "/menu.jsp");   
					}
				}else if("/myTeaMessage.jsp".equals(targetURL)  || "/browseTeacher.jsp".equals(targetURL) ){
					if(usertemp.getUserType() == 2){
						 response.sendRedirect(request.getContextPath() + "/menu.jsp");   
					}
				}
	            else  
	            {  
	                MDC.put("userId", userId);  
	            }  
	        }
		}
		else{  
	        if (session.get("user")==null)
	        {  
	            MDC.put("userId",DEFAULT_USERID);
	        }
	        else
	        {
	        	User usertemp = (User)session.get("user");
	            Integer userId = usertemp.getUserId();
	            if (userId == null){  
	                MDC.put("userId",DEFAULT_USERID);  
	            }  
	            else  
	            {  
	                System.out.println("�û�id"+userId);
	                MDC.put("userId", userId);  
	            }  
	        }
        }  
        filterChain.doFilter(servletRequest, servletResponse);
	}

	public void init(FilterConfig filterConfig) throws ServletException {

	}


}
