package cn.edu.aicourse.entity;

import java.sql.Timestamp;

/**
 * UserAccessWeb entity. @author MyEclipse Persistence Tools
 */

public class UserAccessWeb implements java.io.Serializable {

	// Fields

	private Integer useAccessId;
	private Timestamp userLoginTime;
	private Integer userId;
	private String userIp;

	// Constructors

	/** default constructor */
	public UserAccessWeb() {
	}

	/** full constructor */
	public UserAccessWeb(Timestamp userLoginTime, Integer userId, String userIp) {
		this.userLoginTime = userLoginTime;
		this.userId = userId;
		this.userIp = userIp;
	}

	// Property accessors

	public Integer getUseAccessId() {
		return this.useAccessId;
	}

	public void setUseAccessId(Integer useAccessId) {
		this.useAccessId = useAccessId;
	}

	public Timestamp getUserLoginTime() {
		return this.userLoginTime;
	}

	public void setUserLoginTime(Timestamp userLoginTime) {
		this.userLoginTime = userLoginTime;
	}

	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getUserIp() {
		return this.userIp;
	}

	public void setUserIp(String userIp) {
		this.userIp = userIp;
	}

}