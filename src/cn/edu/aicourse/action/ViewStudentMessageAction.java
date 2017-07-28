package cn.edu.aicourse.action;

import java.util.List;

import cn.edu.aicourse.entity.ViewStudent;
import cn.edu.aicourse.entity.ViewStudentId;
import cn.edu.aicourse.service.IViewStudentService;

import com.opensymphony.xwork2.ActionSupport;

public class ViewStudentMessageAction extends ActionSupport {
	private String studentMessageList;
	private IViewStudentService studentservice;
	private String result;
	private int studentId;
	private String studentLoginName;
	
	public void setStudentservice(IViewStudentService studentservice){
		this.studentservice = studentservice;
	}
	public String getStudentMessageList(){
		return this.studentMessageList;
	}
	public String getResult(){
		return this.result;
	}
	public void setStudentId( int studentId){
		this.studentId = studentId;
	}
	public void setStudentLoginName(String studentLoginName){
		this.studentLoginName = studentLoginName;
	}
	@Override
	public String execute() throws Exception {	
         try{
        	 boolean isRightSearch = false;;
        	if(this.studentId != -1 || !this.studentLoginName.equals("")){
        		isRightSearch = true;
        	}
        	List<ViewStudent> stuentList = null;
        	this.studentMessageList = "";
        	stuentList = this.studentservice.findAll();
            for(int i = 0; i< stuentList.size();i++){        	 
            	 ViewStudentId tempStdudentMessage = stuentList.get(i).getId();
            	 String studetnOnTime = "--";
            	 if(stuentList.get(i).getUserLoginTime() != null && !stuentList.get(i).getUserLoginTime().toString().isEmpty()){
            		 studetnOnTime = stuentList.get(i).getUserLoginTime().toString();
            	 }
            	 String studentIP = "--";
            	 if(stuentList.get(i).getUserIp() != null && !stuentList.get(i).getUserIp().isEmpty()){
            		 studentIP = stuentList.get(i).getUserIp();
            	 }
            	 if(isRightSearch){
            		 if(tempStdudentMessage.getUserId() == this.studentId || (!this.studentLoginName.isEmpty()&&tempStdudentMessage.getUserLoginName().contains(this.studentLoginName))){
                     	 this.studentMessageList = this.studentMessageList + tempStdudentMessage.getUserId() + 
                     			 "|"+ tempStdudentMessage.getUserLoginName() + "|"+ tempStdudentMessage.getUserName()+"|"+ 
                     			studetnOnTime + "|" +tempStdudentMessage.getUserTimes()+ "|"+ studentIP; 
                     	 this.studentMessageList += "+";       
            		 }
            	 }else{
                  	 this.studentMessageList = this.studentMessageList + tempStdudentMessage.getUserId() + 
                 			 "|"+ tempStdudentMessage.getUserLoginName() + "|"+ tempStdudentMessage.getUserName()+"|"+ 
                 			studetnOnTime + "|" +tempStdudentMessage.getUserTimes()+ "|"+ studentIP; 
                 	 this.studentMessageList += "+";    
            	 }  
             	}
        	 if(this.studentMessageList.isEmpty()){
        		 this.result = "empty";
        	 }
        	 else{
        		 this.studentMessageList = this.studentMessageList.substring(0, this.studentMessageList.length() - 1);
        		 this.result = "success";
        	 } 
         }catch(Exception e){
        	 this.result = "fail";
        	 System.out.println(e);
         }
         System.out.println(this.result); 
         return "success";
	}

}
