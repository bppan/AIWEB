package cn.edu.aicourse.action;

import com.opensymphony.xwork2.ActionSupport;
import cn.edu.aicourse.entity.User;
import cn.edu.aicourse.service.IUserService;

public class AddTeacherAction extends ActionSupport {

	private IUserService userservice;
	private String userLoginName;
	private String userRealName;
	private String result;
	
	public String getResult(){
		return this.result;
	}
	public void setUserservice(IUserService userservice){
		this.userservice = userservice;
	}
	public void setUserRealName(String userRealName){
		this.userRealName = userRealName;
	}
	public void setUserLoginName(String userLoginName){
		this.userLoginName = userLoginName;
	}
	
	@Override
	public String execute() throws Exception {	
		
		try{
			User tempUser = new User();
			tempUser.setUserLoginName(this.userLoginName);
			tempUser.setUserName(this.userRealName);
			tempUser.setUserPassword("111111");
			tempUser.setUserType(2);
			this.userservice.save(tempUser);
			this.result = "success";
			
		}catch(Exception e){
			this.result = "fail";
			System.out.println(e);
		}
        return "success";
	}
}
