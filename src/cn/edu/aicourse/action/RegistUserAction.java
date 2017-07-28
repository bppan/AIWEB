package cn.edu.aicourse.action;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import cn.edu.aicourse.entity.User;
import cn.edu.aicourse.service.IUserService;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class RegistUserAction extends ActionSupport {
	private String contentLoginName;
	private String contentUserName;
	private String contentPwd;
	private String code;
	private IUserService userservice;
	private String result;
	private String message;
	
	public void setContentLoginName(String contentLoginName)
	{
		this.contentLoginName = contentLoginName;
	}
	public String getContentLoginName()
	{
		return this.contentLoginName;
	}
	
	public void setContentUserName(String contentUserName)
	{
		this.contentUserName = contentUserName;
	}
	public String getContentUserName()
	{
		return this.contentUserName;
	}
	
	public void setContentPwd(String contentPwd)
	{
		this.contentPwd = contentPwd;
	}
	public String getContentPwd()
	{
		return this.contentPwd;
	}
	
	public void setCode(String code)
	{
		this.code = code;
	}
	public String getCode()
	{
		return this.code;
	}
	public void setUserservice(IUserService userservice)
	{
		this.userservice = userservice;
	}
	public String getResult()
	{
		return this.result;
	}
	public String getMessage()
	{
		return this.message;
	}
	@Override
	public String execute() throws Exception {	
		
		Map session=ActionContext.getContext().getSession();
		
	    if(session.get("imageCode") != null && !code.isEmpty())
	    {
	    	String imageCode = (String)session.get("imageCode");
	    	if(!(code.trim().equalsIgnoreCase(imageCode)))
	    	{
	    		message = "ÑéÖ¤Âë´íÎó£¡";
	    		result = "fail";
	    		return "success";
	    	}
	    }	
		try
		{
			User user = new User();
			user.setUserLoginName(this.getContentLoginName());
			user.setUserName(this.getContentUserName());
			user.setUserPassword(this.getContentPwd());
			user.setUserType(3);
			this.userservice.save(user);
			this.result = "success";			
		}
		catch(Exception e)
		{
			this.result = "fail";
			this.message = "×¢²áÊ§°Ü";
			System.out.println(e);
		}
		return "success";
	}
	
}
