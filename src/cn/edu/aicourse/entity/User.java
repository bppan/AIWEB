package cn.edu.aicourse.entity;

/**
 * User entity. @author MyEclipse Persistence Tools
 */

public class User implements java.io.Serializable {

	// Fields

	private Integer userId;
	private String userLoginName;
	private String userName;
	private String userPassword;
	private Integer userType;

	// Constructors

	/** default constructor */
	public User() {
	}

	/** minimal constructor */
	public User(String userLoginName, String userPassword) {
		this.userLoginName = userLoginName;
		this.userPassword = userPassword;
	}

	/** full constructor */
	public User(String userLoginName, String userName, String userPassword,
			Integer userType) {
		this.userLoginName = userLoginName;
		this.userName = userName;
		this.userPassword = userPassword;
		this.userType = userType;
	}

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

	public String getUserPassword() {
		return this.userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public Integer getUserType() {
		return this.userType;
	}

	public void setUserType(Integer userType) {
		this.userType = userType;
	}

}