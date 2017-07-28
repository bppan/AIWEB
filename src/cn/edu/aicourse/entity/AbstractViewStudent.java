package cn.edu.aicourse.entity;

/**
 * AbstractViewStudent entity provides the base persistence definition of the
 * ViewStudent entity. @author MyEclipse Persistence Tools
 */

public abstract class AbstractViewStudent implements java.io.Serializable {

	// Fields

	private ViewStudentId id;

	// Constructors

	/** default constructor */
	public AbstractViewStudent() {
	}

	/** full constructor */
	public AbstractViewStudent(ViewStudentId id) {
		this.id = id;
	}

	// Property accessors

	public ViewStudentId getId() {
		return this.id;
	}

	public void setId(ViewStudentId id) {
		this.id = id;
	}

}