package cn.edu.aicourse.action;


import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;

import org.apache.struts2.ServletActionContext;

import cn.edu.aicourse.entity.Teacherfile;
import cn.edu.aicourse.service.ITeacherFileService;

import com.opensymphony.xwork2.ActionSupport;

public class DownFileAction extends ActionSupport  {
	
	private String fileName;
	private int fileid;
	private ITeacherFileService fileservice;
	private String filePath;
	
	public void setFileName(String fileName){
		System.out.println(fileName);
		try {
			this.fileName = new String(fileName.getBytes("GBK"),"ISO-8859-1");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
		//this.fileName = fileName;
	}
	public String getFileName(){
		try {
			return new String(fileName.getBytes(), "ISO-8859-1");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	public int getFileid(){
		return this.fileid;
	}
	public void setFileid(int fileid){
		this.fileid = fileid;
	}
	public void setFileservice(ITeacherFileService fileservice){
		this.fileservice = fileservice;
	}
	@Override
	public String execute() throws Exception {	
		
		Teacherfile myfile = this.fileservice.findById(this.fileid);
		int fileDownLoadTimes = myfile.getFileDownLoadTimes();
		this.fileName = myfile.getFileName();
		this.filePath = myfile.getFilePath();		
		String thefilePath = this.filePath+ "\\" +this.fileName;
		File file=new File(thefilePath);
		if(!file.exists()){
			return "fail";
		}
		fileDownLoadTimes++;
		myfile.setFileDownLoadTimes(fileDownLoadTimes);
		this.fileservice.attachDirty(myfile);
        return "success";
	}
	public InputStream getDownloadFile() throws Exception {
		String thefilePath = this.filePath+ "\\" +this.fileName;		
		File file=new File(thefilePath);
		String downloadFilePath = file.getParentFile().getName();		
        return ServletActionContext.getServletContext().getResourceAsStream(downloadFilePath + "/" + this.fileName);
	}
}
