package cn.edu.aicourse.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import cn.edu.aicourse.entity.User;
import cn.edu.aicourse.entity.UserAccessWeb;
import cn.edu.aicourse.service.IUserAccessWebService;
import cn.edu.aicourse.service.IUserService;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class GetTeacherList extends ActionSupport {
	
	private String teaList;
	private IUserService userservice;
	private IUserAccessWebService userwebservice;
	private String result;
	private int teacherID;
	private String teacherLoginName;

	
	public void setUserservice(IUserService userservice){
		this.userservice = userservice;
	}
	public void setUserwebservice(IUserAccessWebService userwebservice){
		this.userwebservice = userwebservice;
	}
	public String getTeaList(){
		return this.teaList;
	}
	public String getResult(){
		return this.result;
	}
	public void setTeacherID(int teacherID){
		this.teacherID = teacherID;
	}
	public void setTeacherLoginName(String teacherLoginName){
		this.teacherLoginName = teacherLoginName;
	}
	@Override
	public String execute() throws Exception {	
		
         try{
        	 
        	List<User> userList = null;
        	this.teaList = "";
           	boolean isRightSearch = false;;
           	if(this.teacherID != -1 || !this.teacherLoginName.equals("")){
           		isRightSearch = true;
           	}
           	userList = this.userservice.findByUserType(2);
        	if(userList != null){
                for(int i = 0; i< userList.size();i++){              	
                 	User tempUser = userList.get(i);            	
                    UserAccessWeb tese = this.userwebservice.findById(6);
                    List<UserAccessWeb> tempUserWeb = this.userwebservice.findByUserId(tempUser.getUserId());
                    String onTime = "--";
                    if(!tempUserWeb.isEmpty()){
                    	onTime = tempUserWeb.get(0).getUserLoginTime().toString();
                    }
                    if(isRightSearch){
                     	if(tempUser.getUserId() == this.teacherID || (!this.teacherLoginName.isEmpty()&&tempUser.getUserLoginName().contains(this.teacherLoginName))){
                            this.teaList = this.teaList + tempUser.getUserId()+ "|"+tempUser.getUserLoginName() + "|"+tempUser.getUserName()+"|"+ onTime; 
                            this.teaList += "+";     
                     	}                     		
                    }
                    else{
                    	   this.teaList = this.teaList + tempUser.getUserId()+ "|"+tempUser.getUserLoginName() + "|"+tempUser.getUserName()+"|"+ onTime; 
                           this.teaList += "+";   
                    }	
                }
        	}
        	if(this.teaList.isEmpty()){
        		 this.result = "empty";
        	 }
        	 else{
        		 this.teaList = this.teaList.substring(0, this.teaList.length() - 1);
        		 this.result = "success";
        	 } 
         }catch(Exception e){
        	 this.result = "fail";
        	 System.out.println(e);
         }
         return "success";
	}

}
