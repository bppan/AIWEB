package cn.edu.aicourse.entity;

import java.sql.Timestamp;

/**
 * AbstractViewStudentId entity provides the base persistence definition of the
 * ViewStudentId entity. @author MyEclipse Persistence Tools
 */

public abstract class AbstractViewStudentId implements java.io.Serializable {

	// Fields

	private Integer userId;
	private Timestamp userIp;
	private Long userTimes;

	// Constructors

	/** default constructor */
	public AbstractViewStudentId() {
	}

	/** minimal constructor */
	public AbstractViewStudentId(Integer userId, Long userTimes) {
		this.userId = userId;
		this.userTimes = userTimes;
	}

	/** full constructor */
	public AbstractViewStudentId(Integer userId, Timestamp userIp,
			Long userTimes) {
		this.userId = userId;
		this.userIp = userIp;
		this.userTimes = userTimes;
	}

	// Property accessors

	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Timestamp getUserIp() {
		return this.userIp;
	}

	public void setUserIp(Timestamp userIp) {
		this.userIp = userIp;
	}

	public Long getUserTimes() {
		return this.userTimes;
	}

	public void setUserTimes(Long userTimes) {
		this.userTimes = userTimes;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof AbstractViewStudentId))
			return false;
		AbstractViewStudentId castOther = (AbstractViewStudentId) other;

		return ((this.getUserId() == castOther.getUserId()) || (this
				.getUserId() != null && castOther.getUserId() != null && this
				.getUserId().equals(castOther.getUserId())))
				&& ((this.getUserIp() == castOther.getUserIp()) || (this
						.getUserIp() != null && castOther.getUserIp() != null && this
						.getUserIp().equals(castOther.getUserIp())))
				&& ((this.getUserTimes() == castOther.getUserTimes()) || (this
						.getUserTimes() != null
						&& castOther.getUserTimes() != null && this
						.getUserTimes().equals(castOther.getUserTimes())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result
				+ (getUserId() == null ? 0 : this.getUserId().hashCode());
		result = 37 * result
				+ (getUserIp() == null ? 0 : this.getUserIp().hashCode());
		result = 37 * result
				+ (getUserTimes() == null ? 0 : this.getUserTimes().hashCode());
		return result;
	}

}