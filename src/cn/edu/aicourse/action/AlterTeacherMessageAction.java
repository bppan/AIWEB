package cn.edu.aicourse.action;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import cn.edu.aicourse.entity.User;
import cn.edu.aicourse.entity.UserMessage;
import cn.edu.aicourse.service.IUserMessageService;
import cn.edu.aicourse.service.IUserService;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class AlterTeacherMessageAction extends ActionSupport {
	
	private IUserMessageService userMessageService; 
	private IUserService userservice;


	private int user_id;
	private String user_name;

	private int user_sex;
	private String user_birth_date;
	private String user_degree;
	private String user_graduate_School;
	private String user_major;
	private String user_collage;
	private String user_job;
	private String user_laboratory;
	private String user_job_title;
	private String user_office_phone;
	
	private String user_email;
	private String user_address;
	private String user_postcode;
	private String user_resume;
	private String user_research_direction;
	
	private String user_teach_work;
	private String user_awards;
	private String user_book;
	
	private String result;
	
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public void setUserMessageService(IUserMessageService userMessageService) {
		this.userMessageService = userMessageService;
	}
	public void setUserservice(IUserService userservice) {
		this.userservice = userservice;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public int getUser_sex() {
		return user_sex;
	}
	public void setUser_sex(int user_sex) {
		this.user_sex = user_sex;
	}
	public String getUser_birth_date() {
		return user_birth_date;
	}
	public void setUser_birth_date(String user_birth_date) {
		this.user_birth_date = user_birth_date;
	}
	public String getUser_degree() {
		return user_degree;
	}
	public void setUser_degree(String user_degree) {
		this.user_degree = user_degree;
	}
	public String getUser_graduate_School() {
		return user_graduate_School;
	}
	public void setUser_graduate_School(String user_graduate_School) {
		this.user_graduate_School = user_graduate_School;
	}
	public String getUser_major() {
		return user_major;
	}
	public void setUser_major(String user_major) {
		this.user_major = user_major;
	}
	public String getUser_collage() {
		return user_collage;
	}
	public void setUser_collage(String user_collage) {
		this.user_collage = user_collage;
	}
	public String getUser_job() {
		return user_job;
	}
	public void setUser_job(String user_job) {
		this.user_job = user_job;
	}
	public String getUser_laboratory() {
		return user_laboratory;
	}
	public void setUser_laboratory(String user_laboratory) {
		this.user_laboratory = user_laboratory;
	}
	public String getUser_job_title() {
		return user_job_title;
	}
	public void setUser_job_title(String user_job_title) {
		this.user_job_title = user_job_title;
	}
	public String getUser_office_phone() {
		return user_office_phone;
	}
	public void setUser_office_phone(String user_office_phone) {
		this.user_office_phone = user_office_phone;
	}
	public String getUser_email() {
		return user_email;
	}
	public void setUser_email(String user_email) {
		this.user_email = user_email;
	}
	public String getUser_address() {
		return user_address;
	}
	public void setUser_address(String user_address) {
		this.user_address = user_address;
	}
	public String getUser_postcode() {
		return user_postcode;
	}
	public void setUser_postcode(String user_postcode) {
		this.user_postcode = user_postcode;
	}
	public String getUser_resume() {
		return user_resume;
	}
	public void setUser_resume(String user_resume) {
		this.user_resume = user_resume;
	}
	public String getUser_research_direction() {
		return user_research_direction;
	}
	public void setUser_research_direction(String user_research_direction) {
		this.user_research_direction = user_research_direction;
	}
	public String getUser_teach_work() {
		return user_teach_work;
	}
	public void setUser_teach_work(String user_teach_work) {
		this.user_teach_work = user_teach_work;
	}
	public String getUser_awards() {
		return user_awards;
	}
	public void setUser_awards(String user_awards) {
		this.user_awards = user_awards;
	}
	public String getUser_book() {
		return user_book;
	}
	public void setUser_book(String user_book) {
		this.user_book = user_book;
	}

	@Override
	public String execute() throws Exception {	
		
		try
		{
    		Map session=ActionContext.getContext().getSession();
    		if(session.get("user") == null){
    			return "fail";
    		}
    		User currUser = (User)session.get("user");
    		this.user_id = currUser.getUserId();
			//修改姓名
    		User tempUser = this.userservice.findById(this.user_id);
    		tempUser.setUserName(this.user_name);    	
    		currUser.setUserName(this.user_name);
    		session.put("user",currUser);
    		session.put("userName",currUser.getUserName());
    		this.userservice.attachDirty(tempUser);
    		//修改该个人信息
			List<UserMessage> usermessage = this.userMessageService.findByUserId(this.user_id);
			UserMessage tempMessage;
			if(usermessage == null || usermessage.size() != 1){
				tempMessage = new UserMessage();
				tempMessage.setUserId(this.user_id);
			}else{
				tempMessage = usermessage.get(0);
			}
			tempMessage.setUserSex(this.user_sex);
			tempMessage.setUserBirthDate(this.user_birth_date);
			tempMessage.setUserDegree(this.user_degree);
			tempMessage.setUserAddress(this.user_address);
			tempMessage.setUserAwards(this.user_awards);
			tempMessage.setUserBook(this.user_book);
			tempMessage.setUserCollage(this.user_collage);
			tempMessage.setUserEmail(this.user_email);
			tempMessage.setUserGraduateSchool(this.user_graduate_School);
			tempMessage.setUserJob(this.user_job);
			tempMessage.setUserJobTitle(this.user_job_title);
			tempMessage.setUserLaboratory(this.user_laboratory);
			tempMessage.setUserMajor(this.user_major);
			tempMessage.setUserOfficePhone(this.user_office_phone);
			tempMessage.setUserPostcode(this.user_postcode);
			tempMessage.setUserResearchDirection(this.user_research_direction);
			tempMessage.setUserResume(this.user_resume);
			tempMessage.setUserTeachWork(this.user_teach_work);
			if(usermessage == null || usermessage.size() != 1){
				this.userMessageService.save(tempMessage);
			}else{
				this.userMessageService.attachDirty(tempMessage);
			}
			this.result = "success";			
		}
		catch(Exception e)
		{
			this.result = "fail";
			System.out.println(e);
		}
		return "success";
	}
	
}