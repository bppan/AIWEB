package cn.edu.aicourse.action;

import java.util.List;
import java.util.Map;

import org.apache.log4j.MDC;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class LoginFailTimeAction extends ActionSupport{
	private int message;
	private String result;
	public int getMessage()
	{
		return message;
	}
	public String getResult()
	{
		return result;
	}
	@Override
	public String execute() throws Exception {		
		Map session=ActionContext.getContext().getSession();
		if(session.get("FailTime") == null)
		{
			this.message = 0;
			result = "fail";
		}
		else
		{
			result = "success";
			this.message = 1;
		}
		return "success";
	}
}
