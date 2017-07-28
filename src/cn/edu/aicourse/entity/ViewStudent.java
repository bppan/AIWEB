package cn.edu.aicourse.entity;

import java.sql.Timestamp;

/**
 * ViewStudent entity. @author MyEclipse Persistence Tools
 */

public class ViewStudent implements java.io.Serializable {

	// Fields
	private String userIp;
	private Timestamp userLoginTime;
	private ViewStudentId id;

	// Constructors

	/** default constructor */
	public ViewStudent() {
	}

	/** full constructor */
	public ViewStudent(ViewStudentId id) {
		this.id = id;
	}

	// Property accessors

	public ViewStudentId getId() {
		return this.id;
	}

	public void setId(ViewStudentId id) {
		this.id = id;
	}
	public String getUserIp() {
		return this.userIp;
	}

	public void setUserIp(String userIp) {
		this.userIp = userIp;
	}

	public Timestamp getUserLoginTime() {
		return this.userLoginTime;
	}

	public void setUserLoginTime(Timestamp userLoginTime) {
		this.userLoginTime = userLoginTime;
	}

}