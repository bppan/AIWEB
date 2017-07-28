package cn.edu.aicourse.action;

import java.util.List;
import java.util.Map;

import org.apache.log4j.MDC;

import cn.edu.aicourse.entity.User;
import cn.edu.aicourse.service.IUserService;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class RegisterLoginNameAction extends ActionSupport{

	private IUserService userservice;
	private String result;
	private String message;
	private String userLoginName;
	
	public void setUserservice(IUserService userservice)
	{
		this.userservice = userservice;
	}
	public void setUserLoginName(String userLoginName)
	{
		this.userLoginName = userLoginName;
	}
	public String getUserLoginName()
	{
		return this.userLoginName;
	}
	public void setResult(String result)
	{
		this.result = result;
	}
	public String getResult()
	{
		return this.result;
	}
	public void setMessage(String message)
	{
		this.message = message;
	}
	public String getMessage()
	{
		return this.message;
	}
	@Override
	public String execute() throws Exception {		
		
		try{
		List uselist = this.userservice.findByUserLoginName(this.getUserLoginName());		
		if(uselist.isEmpty())
		{
			this.setResult("success");
		}
		else
		{
			this.setResult("fail");
			this.setMessage("*用户名已存在！");
		}}catch(Exception e){
			this.setResult("fail");
			this.setMessage("*系统异常，请重试！");
		}
		return "success";
	}
	

}
