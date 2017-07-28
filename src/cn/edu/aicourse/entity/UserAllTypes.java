package cn.edu.aicourse.entity;

/**
 * UserAllTypes entity. @author MyEclipse Persistence Tools
 */

public class UserAllTypes implements java.io.Serializable {

	// Fields

	private Integer userType;
	private String userTypeName;

	// Constructors

	/** default constructor */
	public UserAllTypes() {
	}

	/** full constructor */
	public UserAllTypes(String userTypeName) {
		this.userTypeName = userTypeName;
	}

	// Property accessors

	public Integer getUserType() {
		return this.userType;
	}

	public void setUserType(Integer userType) {
		this.userType = userType;
	}

	public String getUserTypeName() {
		return this.userTypeName;
	}

	public void setUserTypeName(String userTypeName) {
		this.userTypeName = userTypeName;
	}

}