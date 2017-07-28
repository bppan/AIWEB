package cn.edu.aicourse.action;

import java.util.Map;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class LoginStateAction  extends ActionSupport{
	String result;
	public String getResult()
	{
		return result;
	}
	public void setResult(String result)
	{
		this.result = result;
	}
	@Override
	public String execute() throws Exception {		
		Map session=ActionContext.getContext().getSession();
		if(session.get("loginState") == null)
		{
			this.setResult("fail");
		}
		else if(session.get("loginState").equals("isLogin"))
		{
			this.setResult("success");
		}
		else
		{
			this.setResult("fail");
		}
		return "success";
	}

}
