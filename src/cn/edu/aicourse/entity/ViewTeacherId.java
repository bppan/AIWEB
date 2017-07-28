package cn.edu.aicourse.entity;

/**
 * ViewTeacherId entity. @author MyEclipse Persistence Tools
 */

public class ViewTeacherId implements java.io.Serializable {

	// Fields

	private Integer userId;
	private String userName;


	// Constructors

	/** default constructor */
	public ViewTeacherId() {
	}

	/** minimal constructor */
	public ViewTeacherId(Integer userId) {
		this.userId = userId;
	}

	/** full constructor */
	public ViewTeacherId(Integer userId, String userName) {
		this.userId = userId;
		this.userName = userName;
	}

	// Property accessors

	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}



	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof ViewTeacherId))
			return false;
		ViewTeacherId castOther = (ViewTeacherId) other;

		return ((this.getUserId() == castOther.getUserId()) || (this
				.getUserId() != null && castOther.getUserId() != null && this
				.getUserId().equals(castOther.getUserId())))
				&& ((this.getUserName() == castOther.getUserName()) || (this
						.getUserName() != null
						&& castOther.getUserName() != null && this
						.getUserName().equals(castOther.getUserName())));
	}

	public int hashCode() {
		int result = 17;
		result = 37 * result
				+ (getUserId() == null ? 0 : this.getUserId().hashCode());
		result = 37 * result
				+ (getUserName() == null ? 0 : this.getUserName().hashCode());
		return result;
	}

}