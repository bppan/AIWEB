package cn.edu.aicourse.action;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import java.util.List;

import cn.edu.aicourse.service.IUserAccessWebService;
import cn.edu.aicourse.service.IUserAllTypesService;
import cn.edu.aicourse.service.IUserService;
import cn.edu.aicourse.beans.ServerClientNetMessage;
import cn.edu.aicourse.entity.User;
import cn.edu.aicourse.entity.UserAccessWeb;
import cn.edu.aicourse.entity.UserAllTypes;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

import org.apache.log4j.Logger;
import org.apache.log4j.MDC;

public class LoginValidateNameAction extends ActionSupport {
	
	private IUserService userservice;
	private IUserAllTypesService usertypeservice;
	private IUserAccessWebService useraccesswebserivce;
	private static final Logger log = Logger.getLogger(LoginAction.class);
	private String result;
	private String userLoginName;
	private String userPassword;
	private String userName;
	private String message;
	private int data;
	private String code;
	private boolean isPass;
	
	public void setUserLoginName(String userLoginName)
	{
		this.userLoginName = userLoginName;
	}
	public String getUserLoginName()
	{
		return this.userLoginName;	
	}
	public void setUserPassword(String userPassword)
	{
		this.userPassword = userPassword;
	}
	public String getUserPassword()
	{
		return this.userPassword;
	}
	public void setUserservice(IUserService userservice)
	{
		this.userservice = userservice;
	}
	public void setUsertypeservice(IUserAllTypesService usertypeservice){
		this.usertypeservice = usertypeservice;
	}
	public void setUseraccesswebserivce(IUserAccessWebService useraccesswebserivce){
		this.useraccesswebserivce = useraccesswebserivce;
	}
    public String getResult()
    {
    	return this.result;
    }

    public String getMessage()
    {
    	return this.message;
    }
    public int getData()
    {
    	return this.data;
    }
    public void setUserName(String userName)
    {
    	this.userName = userName;
    }
    public String getUserName()
    {
    	return this.userName;
    }
    public void setCode(String code)
    {
    	this.code = code;
    }
	@Override
	public String execute() throws Exception {		
		this.isPass = true;
		List<User> userlist = (List<User>)userservice.findAll();
		Map session=ActionContext.getContext().getSession();
	    if(session.get("imageCode") != null && !code.isEmpty())
	    {
	    	String imageCode = (String)session.get("imageCode");
	    	if(!(code.trim().equalsIgnoreCase(imageCode)))
	    	{
	    		message = "验证码错误！";
	    		result = "fail";
	    		return "success";
	    	}
	    }
		for(int i = 0; i < userlist.size(); i++)
		{
			User usertemp = userlist.get(i);
			if(isvalideUser(usertemp))
			{
				session.put("user",usertemp);
				MDC.put("userId",usertemp.getUserId());  
						
				if(this.isPass){
					UserAllTypes tempUserTypes = usertypeservice.findById(usertemp.getUserType());
					session.put("userTypes",tempUserTypes.getUserTypeName());
					session.put("userName",usertemp.getUserName());
					//记录用户登录信息
					UserAccessWeb access = new UserAccessWeb();
					access.setUserId(usertemp.getUserId());
				    Date date = new Date();       
	                Timestamp nousedate = new Timestamp(date.getTime());
	                access.setUserLoginTime(nousedate);
	                ServerClientNetMessage userIp = new ServerClientNetMessage(ServletActionContext.getRequest());
	                access.setUserIp(userIp.getClientIpAddr());
					useraccesswebserivce.save(access);
					if(tempUserTypes.getUserType() == 1){
						this.message = "manager";
					}	
					else if(tempUserTypes.getUserType() == 4){
						this.message = "contentManager";
					}
					session.put("loginState", "isLogin");
				    log.info("LoginvalidateName-success");   
				    session.remove("FailTime");
				    
				}
				return "success";
			}
		}
		session.clear();
		log.info("LoginvalidateName-fail");
		this.result = "fail";
		this.message = "用户名或密码错误！";
		return "success";
	}
	private boolean isvalideUser(User usertemp)
	{
		if(this.getUserLoginName().trim().equals(usertemp.getUserLoginName()) && this.getUserPassword().trim().equals(usertemp.getUserPassword()))
		{
			if(this.getUserName().trim().equals(usertemp.getUserName()))
			{
				result = "success";
				this.data = usertemp.getUserId();
				message = "";
			}
			else
			{
				this.isPass = false;
				result = "fail";
				message = "您所输入的真实姓名错误！";
			}	
			return true;
		}
		else
		{
			return false;
		}
	}
}
