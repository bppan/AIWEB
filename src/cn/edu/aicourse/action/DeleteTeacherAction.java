package cn.edu.aicourse.action;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

import cn.edu.aicourse.entity.Teacherfile;
import cn.edu.aicourse.entity.User;
import cn.edu.aicourse.service.ITeacherFileService;
import cn.edu.aicourse.service.IUserService;

public class DeleteTeacherAction extends ActionSupport {

	private IUserService userservice;
	private String result;
	private int teacherid;
	
	public String getResult(){
		return this.result;
	}
	public void setUserservice(IUserService userservice){
		this.userservice = userservice;
	}
	public void setTeacherid(int teacherid){
		this.teacherid = teacherid;
	}
	
	@Override
	public String execute() throws Exception {		
		try{
			User tempUser = new User();
			tempUser = this.userservice.findById(this.teacherid);
			this.userservice.delete(tempUser);
			this.result = "success";
			
		}catch(Exception e){
			this.result = "fail";
			System.out.println(e);
		}
        return "success";
	}
}
