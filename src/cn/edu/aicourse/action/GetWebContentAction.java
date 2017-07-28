package cn.edu.aicourse.action;

import java.util.Map;

import org.apache.struts2.ServletActionContext;

import java.util.List;

import cn.edu.aicourse.service.IAlgorithmService;
import cn.edu.aicourse.service.IKlgPointContentService;
import cn.edu.aicourse.service.IUserService;
import cn.edu.aicourse.entity.KlgPoint;
import cn.edu.aicourse.entity.Algorithm;
import cn.edu.aicourse.entity.KlgPointContain;
import cn.edu.aicourse.entity.User;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

import org.apache.log4j.Logger;
import org.apache.log4j.MDC;

public class GetWebContentAction extends ActionSupport {
	private IKlgPointContentService pointcontentservice;
	private IAlgorithmService algorithmservice;
	
	private int pointid;
	private String result;
	private String content;
	public int algcount;
	public String agllist;
	private static final Logger log = Logger.getLogger(LoginAction.class);
	
	public void setPointcontentservice(IKlgPointContentService pointcontentservice){
		this.pointcontentservice = pointcontentservice;
	}
	public void setAlgorithmservice(IAlgorithmService algorithmservice){
		this.algorithmservice = algorithmservice;
	}
	public void setPointid(int pointid)
	{
		this.pointid = pointid;
	}
	public String getResult()
	{
		return this.result;
	}
	public String getContent()
	{
		return this.content;
	}
	public String getAgllist(){
		return this.agllist;
	}
	public int getAlgcount(){
		return this.algcount;
	}
	@Override
	public String execute() throws Exception {		
		
		try{
			List<KlgPointContain> pointContentList = this.pointcontentservice.findAll();
			
			for(int i = 0; i < pointContentList.size(); i++){
				KlgPoint tempPoint = pointContentList.get(i).getKlgPoint();
				if(tempPoint.getKlgPointId() == this.pointid)
				{
					List<Algorithm> alglisttemp = this.algorithmservice.findAll();
					this.agllist = "";
					this.algcount =0;
					for(int j=0; j < alglisttemp.size();j++){
						KlgPoint tempPointalg = alglisttemp.get(j).getKlgPoint();
						if(tempPointalg.getKlgPointId() == this.pointid){
							this.algcount++;
							this.agllist = this.agllist + alglisttemp.get(j).getAlgorithmId() +":" + alglisttemp.get(j).getAlgorithmName() + "|";	
						}
						
					}
					if(this.agllist.length() != 0){
						this.agllist = this.agllist.substring(0, this.agllist.length() - 1);
					}
					this.result = "success";
					this.content = pointContentList.get(i).getKlgPointContainText();
					break;
				}
			}
			
		}
		catch(Exception e){
			this.result = "fail";
			System.out.println(e);
		}

		return "success";
	}


}
