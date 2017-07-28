package cn.edu.aicourse.entity;

import java.util.HashSet;
import java.util.Set;

/**
 * KlgPoint entity. @author MyEclipse Persistence Tools
 */

public class KlgPoint implements java.io.Serializable {

	// Fields

	private Integer klgPointId;
	private KlgUnit klgUnit;
	private String klgPointName;
	private Set klgPointContains = new HashSet(0);
	private Set algorithms = new HashSet(0);

	// Constructors

	/** default constructor */
	public KlgPoint() {
	}

	/** full constructor */
	public KlgPoint(KlgUnit klgUnit, String klgPointName, Set klgPointContains,
			Set algorithms) {
		this.klgUnit = klgUnit;
		this.klgPointName = klgPointName;
		this.klgPointContains = klgPointContains;
		this.algorithms = algorithms;
	}

	// Property accessors

	public Integer getKlgPointId() {
		return this.klgPointId;
	}

	public void setKlgPointId(Integer klgPointId) {
		this.klgPointId = klgPointId;
	}

	public KlgUnit getKlgUnit() {
		return this.klgUnit;
	}

	public void setKlgUnit(KlgUnit klgUnit) {
		this.klgUnit = klgUnit;
	}

	public String getKlgPointName() {
		return this.klgPointName;
	}

	public void setKlgPointName(String klgPointName) {
		this.klgPointName = klgPointName;
	}

	public Set getKlgPointContains() {
		return this.klgPointContains;
	}

	public void setKlgPointContains(Set klgPointContains) {
		this.klgPointContains = klgPointContains;
	}

	public Set getAlgorithms() {
		return this.algorithms;
	}

	public void setAlgorithms(Set algorithms) {
		this.algorithms = algorithms;
	}

}