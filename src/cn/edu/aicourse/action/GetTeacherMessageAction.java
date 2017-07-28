package cn.edu.aicourse.action;

import java.util.List;
import java.util.Map;

import cn.edu.aicourse.entity.User;
import cn.edu.aicourse.entity.UserMessage;
import cn.edu.aicourse.entity.ViewTeacher;
import cn.edu.aicourse.entity.ViewTeacherId;
import cn.edu.aicourse.service.IUserMessageService;
import cn.edu.aicourse.service.IViewTeacherServie;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class GetTeacherMessageAction extends ActionSupport {
	
	private String teaMessage;
	private IUserMessageService userMessageService;
	private String result;
	private int teacherID;
	private String teacherName;

	
	public void setUserMessageService(IUserMessageService userMessageService){
		this.userMessageService = userMessageService;
	}
	public String getTeaMessage(){
		return this.teaMessage;
	}
	public String getResult(){
		return this.result;
	}
	public void setTeacherID(int teacherID){
		this.teacherID = teacherID;
	}
	public void setTeacherName(String teacherName){
		this.teacherName = teacherName;
	}
	@Override
	public String execute() throws Exception {	       
        try{
        	
        	if(this.teacherID == -1){
        		Map session=ActionContext.getContext().getSession();
        		if(session.get("user") == null){
        			return "fail";
        		}
        		User currUser = (User)session.get("user");
        		this.teacherID = currUser.getUserId();
        		this.teacherName = currUser.getUserName();
        	}
        	
        	List<UserMessage> theMessage = null;    
        	
        	this.teaMessage = this.teacherName;
        	theMessage = this.userMessageService.findByUserId(this.teacherID);
           	int user_sex = -1;
           	String user_birth_date = "--";
           	String user_graduate_School = "--";
           	String user_degree = "--";
           	String user_major = "--";
           	String user_post = "--";
           	String user_collage = "--";
           	String user_job = "--";
           	String user_job_title = "--";
           	String user_laboratory = "--";
           	String user_office_phone = "--";
           	String user_email = "--";
           	String user_address = "--";
           	String user_postcode = "--";
           	String user_resume = "--";
           	String user_research_direction = "--";
           	String user_teach_work = "--";
           	String user_awards = "--";
           	String user_book = "--";

        	if(theMessage != null && theMessage.size() == 1){
        		UserMessage tempMessage = theMessage.get(0);
        		if(tempMessage.getUserSex() != null){
        			user_sex  = tempMessage.getUserSex();
        		}
        		
        		if(tempMessage.getUserBirthDate() != null){
        			user_birth_date = tempMessage.getUserBirthDate();
        		}        		
      		
        		if(tempMessage.getUserGraduateSchool() != null){
        			user_graduate_School = tempMessage.getUserGraduateSchool();
        		}
        		
        	
        		if(tempMessage.getUserDegree() != null){
        			user_degree = tempMessage.getUserDegree();
        		}
        		
        		
        		if(tempMessage.getUserMajor() != null){
        			user_major = tempMessage.getUserMajor();
        		}
        		
         		
        		if(tempMessage.getUserPost() != null){
        			user_post = tempMessage.getUserPost();
        		}
        		
           		
        		if(tempMessage.getUserCollage() != null){
        			user_collage = tempMessage.getUserCollage();
        		}
        		
           		
        		if(tempMessage.getUserJob() != null){
        			user_job = tempMessage.getUserJob();
        		}
        		
          		
        		if(tempMessage.getUserJobTitle() != null){
        			user_job_title = tempMessage.getUserJobTitle();
        		}
        		
          		
        		if(tempMessage.getUserLaboratory() != null){
        			user_laboratory = tempMessage.getUserLaboratory();
        		}
        		
          		
        		if(tempMessage.getUserOfficePhone() != null){
        			user_office_phone = tempMessage.getUserOfficePhone();
        		}
        		
          		
        		if(tempMessage.getUserEmail() != null){
        			user_email = tempMessage.getUserEmail();
        		}
        		
          		
        		if(tempMessage.getUserAddress() != null){
        			user_address = tempMessage.getUserAddress();
        		}
        		
          		
        		if(tempMessage.getUserPostcode() != null){
        			user_postcode = tempMessage.getUserPostcode();
        		}
        		
          		
        		if(tempMessage.getUserResume() != null){
        			user_resume = tempMessage.getUserResume();
        		}
        		
          		
        		if(tempMessage.getUserResearchDirection() != null){
        			user_research_direction = tempMessage.getUserResearchDirection();
        		}
        		
          		
        		if(tempMessage.getUserTeachWork() != null){
        			user_teach_work = tempMessage.getUserTeachWork();
        		}
        		if(tempMessage.getUserAwards() != null){
        			user_awards = tempMessage.getUserAwards();
        		}
          		
        		if(tempMessage.getUserBook() != null){
        			user_book = tempMessage.getUserBook();
        		}
        		
        		this.teaMessage = this.teaMessage + "|" + user_sex + "|" + user_birth_date + "|" + user_degree + "|" +
        				user_graduate_School + "|" + user_major + "|" + user_collage +"|" +  user_job + "|" + 
        				user_laboratory + "|" + user_job_title + "|" + user_office_phone + "|" + user_email + "|" + 
        				user_address + "|" + user_postcode + "|" + user_resume + "|" + user_research_direction + "|" + 
        				user_teach_work + "|" + user_awards + "|" + user_book;
        	} 
        	else{
        		
        		this.teaMessage = this.teaMessage + "|" + user_sex + "|" + user_birth_date + "|" + user_degree + "|" +
        				user_graduate_School + "|" + user_major + "|" + user_collage +"|" +  user_job + "|" + 
        				user_laboratory + "|" + user_job_title + "|" + user_office_phone + "|" + user_email + "|" + 
        				user_address + "|" + user_postcode + "|" + user_resume + "|" + user_research_direction + "|" + 
        				user_teach_work + "|" + user_awards + "|" + user_book;
        	}
        	this.result = "success";
        }catch(Exception e){
        	this.result = "fail";
        	System.out.println(e);
        }
        return "success";
	}

}
