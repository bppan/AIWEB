package cn.edu.aicourse.action;

import java.util.List;

import cn.edu.aicourse.entity.ViewTeacher;
import cn.edu.aicourse.entity.ViewTeacherId;
import cn.edu.aicourse.service.IViewTeacherServie;
import com.opensymphony.xwork2.ActionSupport;

public class GetTeaMessageListAction extends ActionSupport {
	
	private String teaList;
	private IViewTeacherServie teacherservice;
	private String result;
	private int teacherID;
	private String teacherLoginName;

	
	public void setTeacherservice(IViewTeacherServie teacherservice){
		this.teacherservice = teacherservice;
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
        	
        	List<ViewTeacher> userList = null;
        	this.teaList = "";
           	boolean isRightSearch = false;;
           	if(this.teacherID != -1 || !this.teacherLoginName.equals("")){
           		isRightSearch = true;
           	}
           	userList = this.teacherservice.findAll();       	
        	if(userList != null){
                for(int i = 0; i< userList.size();i++){                  	
                	ViewTeacher tempTeacher = userList.get(i);                     	
                	ViewTeacherId tempTeacherId = tempTeacher.getId();                            	
                    String  user_sex = "--";
                    if(tempTeacher.getUserSex() !=  null){
                    	if(tempTeacher.getUserSex() == 0){
                    		user_sex = "Å®";
                    	}else{
                    		user_sex = "ÄÐ";
                    	}
                    }                   
                    String  user_collage = "--";
                    if(tempTeacher.getUserCollage() != null && !tempTeacher.getUserCollage().isEmpty()){
                    	user_collage = tempTeacher.getUserCollage();
                    }                    
                    String user_job_title = "--";
                    if(tempTeacher.getUserJobTitle() != null && !tempTeacher.getUserJobTitle().isEmpty()){
                    	user_job_title = tempTeacher.getUserJobTitle();
                    }
                    if(isRightSearch){
                     	if(tempTeacherId.getUserId() == this.teacherID|| (!this.teacherLoginName.isEmpty() &&tempTeacherId.getUserName().contains(this.teacherLoginName))){
                     		System.out.println("NONONO");
                            this.teaList = this.teaList + tempTeacherId.getUserId()+ "|"+tempTeacherId.getUserName() + 
                            		"|"+ user_sex + "|"+ user_collage +"|" + user_job_title; 
                            this.teaList += "+";     
                     	}                     		
                    }
                    else{
                        this.teaList = this.teaList + tempTeacherId.getUserId()+ "|"+tempTeacherId.getUserName() + 
                        		"|"+ user_sex + "|"+ user_collage +"|" + user_job_title; 
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
