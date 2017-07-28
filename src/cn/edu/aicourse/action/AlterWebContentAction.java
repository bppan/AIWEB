package cn.edu.aicourse.action;

import java.util.Map;

import org.apache.struts2.ServletActionContext;

import java.util.List;

import cn.edu.aicourse.service.IKlgPointContentService;
import cn.edu.aicourse.service.IKlgPointService;
import cn.edu.aicourse.entity.KlgPoint;
import cn.edu.aicourse.entity.KlgPointContain;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

import org.apache.log4j.Logger;
import org.apache.log4j.MDC;

public class AlterWebContentAction extends ActionSupport {
	
	private IKlgPointContentService pointcontentservice;
	private IKlgPointService pointservice;
	
	private int pointid;
	private String result;
	private String pointContent;
	
	public int getPointid() {
		return pointid;
	}
	public void setPointid(int pointid) {
		this.pointid = pointid;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getPointContent() {
		return pointContent;
	}
	public void setPointContent(String pointContent) {
		this.pointContent = pointContent;
	}
	
	private static final Logger log = Logger.getLogger(LoginAction.class);
	
	public void setPointcontentservice(IKlgPointContentService pointcontentservice){
		this.pointcontentservice = pointcontentservice;
	}
	public void setPointservice(IKlgPointService pointservice)
	{
		this.pointservice = pointservice;
	}
	@Override
	public String execute() throws Exception {		
		
		try{		
			List<KlgPointContain> pointContentList = this.pointcontentservice.findAll();
			boolean isfind = false;
			for(int i = 0; i < pointContentList.size(); i++){
				KlgPointContain tempContent = pointContentList.get(i);
				if(tempContent.getKlgPoint().getKlgPointId() == this.pointid){
					tempContent.setKlgPointContainText(this.pointContent);
					pointcontentservice.attachDirty(tempContent);
					isfind = true;
					break;
					
				}
			}
			if(!isfind){
				KlgPointContain savecontain = new KlgPointContain();
				KlgPoint relationPoint = this.pointservice.findById(this.pointid);
				savecontain.setKlgPoint(relationPoint);
				savecontain.setKlgPointContainText(this.pointContent);
				this.pointcontentservice.save(savecontain);
			}
			this.result = "success";		
		}
		catch(Exception e){
			this.result = "fail";
			System.out.println(e);
		}

		return "success";
	}


}
