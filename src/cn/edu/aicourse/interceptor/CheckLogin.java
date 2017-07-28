package cn.edu.aicourse.interceptor;

import java.util.Map;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;
import cn.edu.aicourse.entity.*;
import org.apache.log4j.MDC;

public class CheckLogin implements Interceptor {

	@Override
	public void destroy() {
		System.out.println("------CheckLogin.destroy------");
	}

	@Override
	public void init() {
		System.out.println("------CheckLogin.init------");

	}

	@Override
	public String intercept(ActionInvocation actionInvocation) throws Exception {
		

		Map session=ActionContext.getContext().getSession();
		
		System.out.println("------CheckLogin.intercept------");
		
		if(session.get("user")!= null)
		{
			System.out.println("------YYYYYYYYYYYYY------");
			System.out.println("sdhgsjdhgjs" + session.get("user"));
			User usertemp =  (User)session.get("user");
			MDC.put("userId",usertemp.getUserId());
			
			return actionInvocation.invoke();
		
		}
		System.out.println("------NNNNNNNNNNNNNNNN------");
		return "checkLoginFail";
	}

}
