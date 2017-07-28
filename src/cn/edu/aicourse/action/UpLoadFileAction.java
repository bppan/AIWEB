package cn.edu.aicourse.action;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.io.File;  
import java.io.FileInputStream;  
import java.io.FileNotFoundException;  
import java.io.FileOutputStream;  
import java.io.IOException;  
import java.io.InputStream;  
import java.io.OutputStream;  







import org.apache.log4j.MDC;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

import cn.edu.aicourse.entity.Teacherfile;
import cn.edu.aicourse.entity.User;
import cn.edu.aicourse.service.ITeacherFileService;

public class UpLoadFileAction extends ActionSupport {
	 //上传文件存放路径   
    private String UPLOADDIR = "/upload";   
    
    //上传文件集合   
    private File file;   
    private Teacherfile myfile;
    //上传文件名集合   
    private String fileFileName;   
    //上传文件内容类型集合   
    private String fileContentType;     
    
    
    
	private ITeacherFileService fileservice;
	
	private String result;
	
	
    public File getFile() {   
        return file;   
    }   

    public void setFile(File file) {   
        this.file = file;   
    }   

   public String getFileFileName() {   
       return this.fileFileName;   
   }   

    public void setFileFileName(String fileFileName) {   
        this.fileFileName = fileFileName;   
    }   

    public String getFileContentType() {   
        return this.fileContentType;   
    }   

    public void setFileContentType(String fileContentType) {   
        this.fileContentType = fileContentType;   
    }   
     
	public String getResult(){
		return this.result;
	}
	public void setFileservice(ITeacherFileService fileservice){
		this.fileservice = fileservice;
	}
	@Override
	public String execute() throws Exception {		
        //循环上传每个文件   
		try{
			if(this.getFile() == null){
				this.result = "success";				
				return "success";
			}else{
				uploadFile(this.getFile());  
			}			 
        }		
       catch(Exception e) {
    	   System.out.println(e);
    	   return "fail";
        }
	    Map session=ActionContext.getContext().getSession();        
		this.result = "success";
		return "success";
	}
    //执行上传功能   
    private void uploadFile(File file) throws FileNotFoundException, IOException {   
        try {          
            Map session=ActionContext.getContext().getSession();
            User currUser = (User)session.get("user");
            this.UPLOADDIR = this.UPLOADDIR + currUser.getUserId();
            String dir = ServletActionContext.getRequest().getRealPath(UPLOADDIR);  
            File fileLocation = new File(dir);  
            //此处也可以在应用根目录手动建立目标上传目录  
            if(!fileLocation.exists()){  
                boolean isCreated  = fileLocation.mkdir();  
                if(!isCreated) {  
                	this.result = "fail";
                    //目标上传目录创建失败,可做其他处理,例如抛出自定义异常等,一般应该不会出现这种情况。  
                    return;  
                }  
            }  
            
            String fileName=this.getFileFileName();
            File uploadFile = new File(dir, fileName);               
            if(!uploadFile.exists()){    
            	this.myfile = new Teacherfile();
                InputStream in = new FileInputStream(file);    
            	OutputStream out = new FileOutputStream(uploadFile);  
                byte[] buffer = new byte[1024 * 1024];   
                int length;   
                while ((length = in.read(buffer)) > 0) {   
                    out.write(buffer, 0, length);   
                }                 
                myfile.setFileName(fileName);
                long filesize = file.length();
                myfile.setFilePath(dir);
                Date date = new Date();       
                Timestamp nousedate = new Timestamp(date.getTime());
                myfile.setFileOnlineTime(nousedate);
                myfile.setUserId(currUser.getUserId());   
                myfile.setFileSize(filesize);
                myfile.setFileDownLoadTimes(0);
                fileToDB(this.myfile);
                in.close();   
                out.close(); 
            }
            else{
            	this.result = "repeatFile";
            }
          
        } catch (FileNotFoundException ex) {   
            System.out.println("上传失败!");  
            ex.printStackTrace();   
        } catch (IOException ex) {   
            System.out.println("上传失败!");  
            ex.printStackTrace();   
        }   
    } 
   private void fileToDB(Teacherfile myDbFile){
	   this.fileservice.save(myDbFile);
	   
   }

}
