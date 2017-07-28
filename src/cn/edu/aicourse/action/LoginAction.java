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

public class LoginAction extends ActionSupport {
	private IUserService userservice;
	private IUserAllTypesService usertypeservice;
	private IUserAccessWebService useraccesswebserivce;
	private static final Logger log = Logger.getLogger(LoginAction.class);
	private String result;
	private String userLoginName;
	private String userPassword;
	private String message;
	private String code;
	private int data;
	private boolean isFirstPassword;
	
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
    public String getCode()
    {
    	return this.code;
    }
    public void setCode(String code)
    {
    	this.code = code;
    }
    public String getMessage()
    {
    	return this.message;
    }
    public int getData()
    {
    	return this.data;
    }
	@Override
	public String execute() throws Exception {		
		this.isFirstPassword = false;
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
			if(isvalideUser(usertemp.getUserLoginName(),usertemp.getUserPassword()))
			{
				session.put("user",usertemp);
				MDC.put("userId",usertemp.getUserId());  
				
				if(!this.isFirstPassword){		
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
			    log.info("Login-success");
			    session.remove("FailTime");	    
			    this.data = usertemp.getUserId();
				}
				return "success";
			}
		}
		session.clear();
		log.info("Login-fail");
		session.put("FailTime", 1);
		this.result = "fail";
		this.message = "用户名或密码错误！";
		return "success";
	}
	private boolean isvalideUser(String userLogin, String password)
	{
		if(this.getUserLoginName().trim().equals(userLogin) && this.getUserPassword().trim().equals(password))
		{
			if(this.getUserPassword().trim().equals("111111"))
			{
				result = "fail";
				message = "needValidName";
				this.isFirstPassword = true;
			}
			else
			{
				result = "success";
				Map session=ActionContext.getContext().getSession();
				session.put("loginState", "isLogin");
				message = "";
			}	
			return true;
		}
		else
		{
			return false;
		}
	}

}
