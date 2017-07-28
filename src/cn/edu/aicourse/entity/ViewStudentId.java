package cn.edu.aicourse.entity;

import java.sql.Timestamp;

/**
 * ViewStudentId entity. @author MyEclipse Persistence Tools
 */

public class ViewStudentId implements java.io.Serializable {

	// Fields

	private Integer userId;
	private String userLoginName;
	private String userName;

	private Long userTimes;
	private Integer userType;

	// Constructors

	/** default constructor */
	public ViewStudentId() {
	}

	/** minimal constructor */
	public ViewStudentId(Integer userId, String userLoginName, String userName,Long userTimes,Integer userType) {		
		this.userId = userId;
		this.userLoginName = userLoginName;
		this.userName = userName;
		this.userTimes = userTimes;
		this.userType = userType;
	}

	/** full constructor */

	// Property accessors

	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getUserLoginName() {
		return this.userLoginName;
	}

	public void setUserLoginName(String userLoginName) {
		this.userLoginName = userLoginName;
	}

	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}



	public Long getUserTimes() {
		return this.userTimes;
	}

	public void setUserTimes(Long userTimes) {
		this.userTimes = userTimes;
	}

	public Integer getUserType() {
		return this.userType;
	}

	public void setUserType(Integer userType) {
		this.userType = userType;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof ViewStudentId))
			return false;
		ViewStudentId castOther = (ViewStudentId) other;

		return ((this.getUserId() == castOther.getUserId()) || (this
				.getUserId() != null && castOther.getUserId() != null && this
				.getUserId().equals(castOther.getUserId())))
				&& ((this.getUserLoginName() == castOther.getUserLoginName()) || (this
						.getUserLoginName() != null
						&& castOther.getUserLoginName() != null && this
						.getUserLoginName()
						.equals(castOther.getUserLoginName())))
				&& ((this.getUserName() == castOther.getUserName()) || (this
						.getUserName() != null
						&& castOther.getUserName() != null && this
						.getUserName().equals(castOther.getUserName())))
				&& ((this.getUserTimes() == castOther.getUserTimes()) || (this
						.getUserTimes() != null
						&& castOther.getUserTimes() != null && this
						.getUserTimes().equals(castOther.getUserTimes())))
				&& ((this.getUserType() == castOther.getUserType()) || (this
						.getUserType() != null
						&& castOther.getUserType() != null && this
						.getUserType().equals(castOther.getUserType())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result
				+ (getUserId() == null ? 0 : this.getUserId().hashCode());
		result = 37
				* result
				+ (getUserLoginName() == null ? 0 : this.getUserLoginName()
						.hashCode());
		result = 37 * result
				+ (getUserName() == null ? 0 : this.getUserName().hashCode());
		result = 37 * result
				+ (getUserTimes() == null ? 0 : this.getUserTimes().hashCode());
		result = 37 * result
				+ (getUserType() == null ? 0 : this.getUserType().hashCode());
		return result;
	}

}