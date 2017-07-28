package cn.edu.aicourse.action;

import java.util.List;

import com.opensymphony.xwork2.ActionSupport;

import cn.edu.aicourse.entity.Algorithm;
import cn.edu.aicourse.entity.KlgModule;
import cn.edu.aicourse.entity.KlgPoint;
import cn.edu.aicourse.entity.KlgUnit;
import cn.edu.aicourse.entity.User;
import cn.edu.aicourse.service.IAlgorithmService;
import cn.edu.aicourse.service.IKlgModuleService;
import cn.edu.aicourse.service.IKlgPointService;
import cn.edu.aicourse.service.IKlgUnitService;

public class AddPMUAAction extends ActionSupport{
	private IKlgModuleService moduleservice;
	private IKlgPointService pointservice;
	private IKlgUnitService unitservice;
	private IAlgorithmService algorithmservice;

	private String result;
	private String pMUAName;
	private int  pMUAId;
	private int type;
	private int theAlgId;
	
	public int getTheAlgId() {
		return this.theAlgId;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public int getPMUAId() {
		return pMUAId;
	}
	public void setPMUAId(int pMUAId) {
		this.pMUAId = pMUAId;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public String getPMUAName() {
		return pMUAName;
	}
	public void setPMUAName(String pMUAName) {		
		this.pMUAName = pMUAName;
	}
	public void setModuleservice(IKlgModuleService moduleservice) {
		this.moduleservice = moduleservice;
	}
	public void setPointservice(IKlgPointService pointservice) {
		this.pointservice = pointservice;
	}
	public void setUnitservice(IKlgUnitService unitservice) {
		this.unitservice = unitservice;
	}
	public void setAlgorithmservice(IAlgorithmService algorithmservice) {
		this.algorithmservice = algorithmservice;
	}
	@Override
	public String execute() throws Exception {	
		try{
			System.out.println(this.getPMUAName());	
			if(this.type == 0){
				KlgModule saveModule = new KlgModule();
				saveModule.setKlgModuleName(this.getPMUAName());
				this.moduleservice.save(saveModule);
			}
			else if(this.type == 1){
				KlgUnit saveUnit = new KlgUnit();
				saveUnit.setKlgUnitName(this.getPMUAName());
				saveUnit.setKlgModule(this.moduleservice.findById(this.getPMUAId()));
				this.unitservice.save(saveUnit);
			}else if(this.type == 2){
				KlgPoint savePoint = new KlgPoint();
				savePoint.setKlgPointName(this.pMUAName);
				savePoint.setKlgUnit(this.unitservice.findById(this.pMUAId));
				this.pointservice.save(savePoint);
			}else if(this.type == 3){
				List<Algorithm> testalgList = this.algorithmservice.findAll();
				for(int i = 0; i < testalgList.size();i++){
					if(testalgList.get(i).getAlgorithmName().equals(this.getPMUAName()) && testalgList.get(i).getKlgPoint().getKlgPointId() == this.pMUAId){
						this.result = "rename";
					    return "success";
					}
				}				
				Algorithm savealg = new Algorithm();
				savealg.setAlgorithmName(this.getPMUAName());
				savealg.setKlgPoint(this.pointservice.findById(this.getPMUAId()));
				this.algorithmservice.save(savealg);
				List<Algorithm> algList = this.algorithmservice.findAll();				
				for(int i = 0; i < algList.size();i++){
					if(algList.get(i).getAlgorithmName().equals(this.getPMUAName()) && algList.get(i).getKlgPoint().getKlgPointId() == this.pMUAId){
						this.theAlgId = algList.get(i).getAlgorithmId();
						break;
					}
				}
			}
			this.result = "success";		
		}catch(Exception e){
			this.result = "fail";
			System.out.println(e);
		}
        return "success";
	}
}
