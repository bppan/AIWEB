package cn.edu.aicourse.entity;

import java.util.HashSet;
import java.util.Set;

/**
 * KlgModule entity. @author MyEclipse Persistence Tools
 */

public class KlgModule implements java.io.Serializable {

	// Fields

	private Integer klgModuleId;
	private Course course;
	private String klgModuleName;
	private Set klgUnits = new HashSet(0);

	// Constructors

	/** default constructor */
	public KlgModule() {
	}

	/** full constructor */
	public KlgModule(Course course, String klgModuleName, Set klgUnits) {
		this.course = course;
		this.klgModuleName = klgModuleName;
		this.klgUnits = klgUnits;
	}

	// Property accessors

	public Integer getKlgModuleId() {
		return this.klgModuleId;
	}

	public void setKlgModuleId(Integer klgModuleId) {
		this.klgModuleId = klgModuleId;
	}

	public Course getCourse() {
		return this.course;
	}

	public void setCourse(Course course) {
		this.course = course;
	}

	public String getKlgModuleName() {
		return this.klgModuleName;
	}

	public void setKlgModuleName(String klgModuleName) {
		this.klgModuleName = klgModuleName;
	}

	public Set getKlgUnits() {
		return this.klgUnits;
	}

	public void setKlgUnits(Set klgUnits) {
		this.klgUnits = klgUnits;
	}

}