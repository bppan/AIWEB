package cn.edu.aicourse.action;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import cn.edu.aicourse.entity.User;
import cn.edu.aicourse.service.IUserService;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class ValidateUserName extends ActionSupport {
	private String contentUserName;
	private String contentLoginName;
	private IUserService userservice;
	private String result;
	private String message;
	
	public void setContentLoginName(String contentLoginName){
		this.contentLoginName = contentLoginName;
	}
	public void setContentUserName(String contentUserName)
	{
		this.contentUserName = contentUserName;
	}
	public String getContentUserName()
	{
		return this.contentUserName;
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
			try{
				Map session=ActionContext.getContext().getSession();
				User usertemp = (User)session.get("user");
				if(!this.contentLoginName.equals(usertemp.getUserLoginName())){
					this.result = "fail";
					this.message = "*用户名填写错误！";
					return "success";
				}
				
				if(!this.contentUserName.equals(usertemp.getUserName())){
					this.result = "fail";
					this.message = "*真实姓名填写错误！";
					return "success";
				}
				
				List<User> uselist = this.userservice.findByUserLoginName(this.contentLoginName);		
				if(uselist.isEmpty())
				{
					this.message = "*用户名不存在！";
					this.result = "fail";
				}
				else
				{
					if(uselist.get(0).getUserName().equals(this.contentUserName.trim())){						
						this.result = "success";
					}
					else{
						this.message = "*真实姓名不存在！";
						this.result = "fail";
					}
				}
				}
			catch(Exception e){
				this.result = "fail";
				this.message = "*系统出错。请重试！";
			}
		return "success";
	}
	
}
