package cn.edu.aicourse.action;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;

import org.apache.log4j.MDC;

import cn.edu.aicourse.service.IKlgModuleService;
import cn.edu.aicourse.service.IKlgPointService;
import cn.edu.aicourse.service.IKlgUnitService;
import cn.edu.aicourse.entity.*;

import com.opensymphony.xwork2.ActionSupport;

public class GetModuleUnitPointListAction extends ActionSupport{

	private IKlgModuleService moduleservice;
	private IKlgPointService pointservice;
	private IKlgUnitService unitservice;
	
	private String result;
	private String  resultList;
	private int type;
	private int moduleId;
	private int unitId;

	public void setModuleservice(IKlgModuleService moduleservice)
	{
		this.moduleservice = moduleservice;
	}
	public void setPointservice(IKlgPointService pointservice)
	{
		this.pointservice = pointservice;
	}
	public void setUnitservice(IKlgUnitService unitservice)
	{
		this.unitservice = unitservice;
	}
	
	public int getModuleId() {
		return moduleId;
	}
	public void setModuleId(int moduleId) {
		this.moduleId = moduleId;
	}
	public int getUnitId() {
		return unitId;
	}
	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public void setResult(String result)
	{
		this.result = result;
	}
	public void setType(int type){
		this.type = type;
	}
	public String getResult()
	{
		return this.result;
	}
	
	public String getResultList()
	{
		return this.resultList;
	}

	@Override
	public String execute() throws Exception {	
		
		try
		{	
			this.resultList = "";
			if(this.type == 0){
				List<KlgModule> moduletemplist = this.moduleservice.findAll();
				for(int i = 0; i < moduletemplist.size();i++)
				{
					KlgModule temp = (KlgModule)moduletemplist.get(i);			
					if( i == moduletemplist.size() - 1)
					{
						this.resultList = this.resultList + temp.getKlgModuleId() +":" +temp.getKlgModuleName();
					}
					else
					{
						this.resultList = this.resultList + temp.getKlgModuleId() +":"+temp.getKlgModuleName() + "|";
					}
				}
	        	 this.result = "success";
			}
			else if(this.type == 1){
				List<KlgUnit> unittemplist = this.unitservice.findAll();
				for(int i = 0; i < unittemplist.size();i++)
				{			
					KlgUnit temp = (KlgUnit)unittemplist.get(i);	
					if(temp.getKlgModule().getKlgModuleId() == this.moduleId){
						this.resultList = this.resultList + temp.getKlgUnitId() +":" + 
								temp.getKlgUnitName() + "|";
					}

				}				
				if(this.resultList.equals("")){
					this.result = "empty";
				}
				else{
					this.resultList = this.resultList.substring(0, this.resultList.length() - 1);
	        		 this.result = "success";
				}
				
			}
			else if(this.type == 2){
				List<KlgPoint> pointtemplist = this.pointservice.findAll();
				for(int i = 0; i < pointtemplist.size();i++)
				{
					KlgPoint temp = (KlgPoint)pointtemplist.get(i);		
					if(temp.getKlgUnit().getKlgUnitId() == this.unitId){
						this.resultList = this.resultList + temp.getKlgPointId() +":" + temp.getKlgPointName() + "|";
					}
				}
				if(this.resultList.equals("")){
					this.result = "empty";
				}
				else{
					this.resultList = this.resultList.substring(0, this.resultList.length() - 1);
	        		 this.result = "success";
				}				
			}			
		}
		catch(Exception e)
		{
			this.setResult("fail");
			System.out.println(e);
		}
		return "success";
	}
	

}
