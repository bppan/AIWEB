package cn.edu.aicourse.entity;

/**
 * ViewTeacher entity. @author MyEclipse Persistence Tools
 */

public class ViewTeacher implements java.io.Serializable {

	// Fields

	private ViewTeacherId id;
	private Integer userSex;
	private String userCollage;
	private String userJobTitle;

	// Constructors

	/** default constructor */
	public ViewTeacher() {
	}

	/** full constructor */
	public ViewTeacher(ViewTeacherId id) {
		this.id = id;
	}

	// Property accessors

	public ViewTeacherId getId() {
		return this.id;
	}

	public void setId(ViewTeacherId id) {
		this.id = id;
	}
	
	public Integer getUserSex() {
		return this.userSex;
	}

	public void setUserSex(Integer userSex) {
		this.userSex = userSex;
	}

	public String getUserCollage() {
		return this.userCollage;
	}

	public void setUserCollage(String userCollage) {
		this.userCollage = userCollage;
	}

	public String getUserJobTitle() {
		return this.userJobTitle;
	}

	public void setUserJobTitle(String userJobTitle) {
		this.userJobTitle = userJobTitle;
	}

}