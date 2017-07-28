package cn.edu.aicourse.action;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import cn.edu.aicourse.entity.User;
import cn.edu.aicourse.service.IUserService;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class AlterTeacherAction extends ActionSupport {
	
	private int teacherid;
	private String teacherRealName;
	private IUserService userservice;
	private String result;
	
	public void setTeacherid(int teacherid)
	{
		this.teacherid = teacherid;
	}
	public void setTeacherRealName(String teacherRealName)
	{
		this.teacherRealName = teacherRealName;
	}
	public void setUserservice(IUserService userservice)
	{
		this.userservice = userservice;
	}
	public String getResult()
	{
		return this.result;
	}
	@Override
	public String execute() throws Exception {	
		
		try
		{
			User tempUser = this.userservice.findById(this.teacherid);
			tempUser.setUserName(this.teacherRealName);
			tempUser.setUserPassword("111111");
			this.userservice.attachDirty(tempUser);
			this.result = "success";			
		}
		catch(Exception e)
		{
			this.result = "fail";
			System.out.println(e);
		}
		return "success";
	}
	
}
