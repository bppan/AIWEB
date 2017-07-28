package cn.edu.aicourse.action;

import java.util.List;
import java.util.Map;

import cn.edu.aicourse.entity.User;
import cn.edu.aicourse.entity.Teacherfile;
import cn.edu.aicourse.service.ITeacherFileService;
import cn.edu.aicourse.service.IUserService;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class GetfileListAction extends ActionSupport {
	private String fileList;
	private ITeacherFileService fileservice;
	private IUserService userservice;
	private String result;
	private int isupload;
	
	public void setFileservice(ITeacherFileService fileservice){
		this.fileservice = fileservice;
	}
	public void setUserservice(IUserService userservice){
		this.userservice = userservice;
	}
	public String getFileList(){
		return this.fileList;
	}
	public String getResult(){
		return this.result;
	}
	public void setIsupload(int isupload){
		this.isupload = isupload;
	}
	@Override
	public String execute() throws Exception {	
		
	     Map session=ActionContext.getContext().getSession();
         User currUser = (User)session.get("user");
         int userId = -1;
         if(currUser != null){
        	 userId = currUser.getUserId();
         }
         else{
        	 //请注意这是测试，请删除此项
        	 userId = 1;
         }
         System.out.println(userId);
        
         
         try{
        	 
        	List<Teacherfile> dbFileList = null;
        	this.fileList = "";
        	if(isupload != 0){
        		 dbFileList = this.fileservice.findByUserId(userId);
             	 for(int i = 0; i< dbFileList.size();i++){
             		Teacherfile tempFile = dbFileList.get(i);
                    this.fileList = this.fileList + tempFile.getFileId() + "|"+tempFile.getFileName() + "|"+tempFile.getFileSize()+"|"+ tempFile.getFileOnlineTime()+"|" + tempFile.getFileDownLoadTimes(); 
                 	this.fileList += "+";    
             	}
        	}
        	else{
        		dbFileList = this.fileservice.findAll();
            	for(int i = 0; i< dbFileList.size();i++){
             		 Teacherfile tempFile = dbFileList.get(i);
             		 String userName = "-";
             		 if(tempFile.getUserId() != null){
             			 User tempUser = this.userservice.findById(tempFile.getUserId());
             			 userName = tempUser.getUserName();
             		 }
             		 this.fileList = this.fileList + tempFile.getFileId() + "|"+tempFile.getFileName() + "|"+tempFile.getFileSize()+"|"+ tempFile.getFileOnlineTime()+"|" +userName+ "|"+ tempFile.getFileDownLoadTimes(); 
             		 this.fileList += "+";         
             	}
        	}

        	if(this.fileList.isEmpty()){
        		 this.result = "empty";
        	 }
        	 else{
        		 this.fileList = this.fileList.substring(0, this.fileList.length() - 1);
        		 this.result = "success";
        	 } 
         }catch(Exception e){
        	 this.result = "fail";
        	 System.out.println(e);
         }
         return "success";
	}

}
