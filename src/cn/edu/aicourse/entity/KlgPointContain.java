package cn.edu.aicourse.entity;

/**
 * KlgPointContain entity. @author MyEclipse Persistence Tools
 */

public class KlgPointContain implements java.io.Serializable {

	// Fields

	private Integer klgPointContainId;
	private KlgPoint klgPoint;
	private String klgPointContainText;

	// Constructors

	/** default constructor */
	public KlgPointContain() {
	}

	/** full constructor */
	public KlgPointContain(KlgPoint klgPoint, String klgPointContainText) {
		this.klgPoint = klgPoint;
		this.klgPointContainText = klgPointContainText;
	}

	// Property accessors

	public Integer getKlgPointContainId() {
		return this.klgPointContainId;
	}

	public void setKlgPointContainId(Integer klgPointContainId) {
		this.klgPointContainId = klgPointContainId;
	}

	public KlgPoint getKlgPoint() {
		return this.klgPoint;
	}

	public void setKlgPoint(KlgPoint klgPoint) {
		this.klgPoint = klgPoint;
	}

	public String getKlgPointContainText() {
		return this.klgPointContainText;
	}

	public void setKlgPointContainText(String klgPointContainText) {
		this.klgPointContainText = klgPointContainText;
	}

}