package cn.edu.aicourse.entity;

/**
 * UserTeachCourse entity. @author MyEclipse Persistence Tools
 */

public class UserTeachCourse implements java.io.Serializable {

	// Fields

	private UserTeachCourseId id;

	// Constructors

	/** default constructor */
	public UserTeachCourse() {
	}

	/** full constructor */
	public UserTeachCourse(UserTeachCourseId id) {
		this.id = id;
	}

	// Property accessors

	public UserTeachCourseId getId() {
		return this.id;
	}

	public void setId(UserTeachCourseId id) {
		this.id = id;
	}

}