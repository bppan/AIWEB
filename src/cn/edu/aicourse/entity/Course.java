package cn.edu.aicourse.entity;

import java.util.HashSet;
import java.util.Set;

/**
 * Course entity. @author MyEclipse Persistence Tools
 */

public class Course implements java.io.Serializable {

	// Fields

	private Integer courseId;
	private String courseName;
	private Set userTeachCourses = new HashSet(0);
	private Set klgModules = new HashSet(0);

	// Constructors

	/** default constructor */
	public Course() {
	}

	/** minimal constructor */
	public Course(String courseName) {
		this.courseName = courseName;
	}

	/** full constructor */
	public Course(String courseName, Set userTeachCourses, Set klgModules) {
		this.courseName = courseName;
		this.userTeachCourses = userTeachCourses;
		this.klgModules = klgModules;
	}

	// Property accessors

	public Integer getCourseId() {
		return this.courseId;
	}

	public void setCourseId(Integer courseId) {
		this.courseId = courseId;
	}

	public String getCourseName() {
		return this.courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public Set getUserTeachCourses() {
		return this.userTeachCourses;
	}

	public void setUserTeachCourses(Set userTeachCourses) {
		this.userTeachCourses = userTeachCourses;
	}

	public Set getKlgModules() {
		return this.klgModules;
	}

	public void setKlgModules(Set klgModules) {
		this.klgModules = klgModules;
	}

}