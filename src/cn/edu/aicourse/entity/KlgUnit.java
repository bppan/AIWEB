package cn.edu.aicourse.entity;

import java.util.HashSet;
import java.util.Set;

/**
 * KlgUnit entity. @author MyEclipse Persistence Tools
 */

public class KlgUnit implements java.io.Serializable {

	// Fields

	private Integer klgUnitId;
	private KlgModule klgModule;
	private String klgUnitName;
	private Set klgPoints = new HashSet(0);

	// Constructors

	/** default constructor */
	public KlgUnit() {
	}

	/** minimal constructor */
	public KlgUnit(String klgUnitName) {
		this.klgUnitName = klgUnitName;
	}

	/** full constructor */
	public KlgUnit(KlgModule klgModule, String klgUnitName, Set klgPoints) {
		this.klgModule = klgModule;
		this.klgUnitName = klgUnitName;
		this.klgPoints = klgPoints;
	}

	// Property accessors

	public Integer getKlgUnitId() {
		return this.klgUnitId;
	}

	public void setKlgUnitId(Integer klgUnitId) {
		this.klgUnitId = klgUnitId;
	}

	public KlgModule getKlgModule() {
		return this.klgModule;
	}

	public void setKlgModule(KlgModule klgModule) {
		this.klgModule = klgModule;
	}

	public String getKlgUnitName() {
		return this.klgUnitName;
	}

	public void setKlgUnitName(String klgUnitName) {
		this.klgUnitName = klgUnitName;
	}

	public Set getKlgPoints() {
		return this.klgPoints;
	}

	public void setKlgPoints(Set klgPoints) {
		this.klgPoints = klgPoints;
	}

}