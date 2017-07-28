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

public class MenuNavKlgModuleAction extends ActionSupport{

	private IKlgModuleService moduleservice;
	private IKlgPointService pointservice;
	private IKlgUnitService unitservice;
	
	private String result;
	private String  moduleList;
	private String unitList;
	private String pointList;
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
	public void setResult(String result)
	{
		this.result = result;
	}
	public String getResult()
	{
		return this.result;
	}
	public String getModuleList()
	{
		return this.moduleList;
	}
	public String getUnitList()
	{
		return this.unitList;
	}
	public String getPointList()
	{
		return this.pointList;
	}
	@Override
	public String execute() throws Exception {	
		
		try
		{
			List<KlgModule> moduletemplist = this.moduleservice.findAll();
			List<KlgUnit> unittemplist = this.unitservice.findAll();
			List<KlgPoint> pointtemplist = this.pointservice.findAll();
		 	
			this.moduleList = "";

			//序列化知识模块
			for(int i = 0; i < moduletemplist.size();i++)
			{
				KlgModule temp = (KlgModule)moduletemplist.get(i);			
				if( i == moduletemplist.size() - 1)
				{
					this.moduleList = this.moduleList + temp.getKlgModuleId() +":" +temp.getKlgModuleName();
				}
				else
				{
					this.moduleList = this.moduleList + temp.getKlgModuleId() +":"+temp.getKlgModuleName() + "|";
				}
			}
			System.out.println(this.moduleList);
			//许雷华知识单元
			this.unitList = "";
			for(int i = 0; i < unittemplist.size();i++)
			{
				KlgUnit temp = (KlgUnit)unittemplist.get(i);			
				if( i == unittemplist.size() - 1)
				{
					this.unitList = this.unitList + temp.getKlgUnitId() +":" + temp.getKlgUnitName() + ":" + temp.getKlgModule().getKlgModuleId();
				}
				else
				{
					this.unitList = this.unitList + temp.getKlgUnitId() +":" + temp.getKlgUnitName() + ":" + temp.getKlgModule().getKlgModuleId() + "|";
				}
			}
			//序列化知识点
			this.pointList = "";
			for(int i = 0; i < pointtemplist.size();i++)
			{
				KlgPoint temp = (KlgPoint)pointtemplist.get(i);			
				if( i == pointtemplist.size() - 1)
				{
					this.pointList = this.pointList + temp.getKlgPointId() +":" + temp.getKlgPointName() + ":" + temp.getKlgUnit().getKlgUnitId();
				}
				else
				{
					this.pointList = this.pointList + temp.getKlgPointId() +":" + temp.getKlgPointName() + ":" + temp.getKlgUnit().getKlgUnitId() + "|";
				}
			}
			this.setResult("success");
		}
		catch(Exception e)
		{
			this.setResult("fail");
			System.out.println(e);
		}
		return "success";
	}
	

}
