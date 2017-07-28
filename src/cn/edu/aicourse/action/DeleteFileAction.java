package cn.edu.aicourse.action;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

import cn.edu.aicourse.entity.Teacherfile;
import cn.edu.aicourse.service.ITeacherFileService;

public class DeleteFileAction extends ActionSupport {

	private ITeacherFileService fileservice;
	private String result;
	private String fileName;
	private int fileid;
    private final static String UPLOADDIR = "/upload";   
	
	public String getResult(){
		return this.result;
	}
	public void setFileservice(ITeacherFileService fileservice){
		this.fileservice = fileservice;
	}
	public void setFileName(String fileName){
		this.fileName = fileName;
	}
	public void setFileid(int fileid){
		this.fileid = fileid;
	}
	@Override
	public String execute() throws Exception {	
		
		Teacherfile myfiles = this.fileservice.findById(this.fileid);
		this.fileName = myfiles.getFileName();
		String thefilePath = myfiles.getFilePath()+ "\\" +myfiles.getFileName();
		File file=new File(thefilePath);
		String uploadFilePath = file.getParentFile().getName();
		
		Teacherfile myfile = new Teacherfile();
		myfile.setFileId(this.fileid);
		try{			
			String dir = ServletActionContext.getRequest().getRealPath(uploadFilePath);  
			File deleteFile = new File(dir, this.fileName); 		
			if(deleteFile.delete()){
				this.fileservice.delete(myfile);
				this.result = "success";
			}else{
				this.result = "fail";
			}			
		}catch(Exception e){
			this.result = "fail";
			System.out.println(e);
		}
        return "success";
	}
}
