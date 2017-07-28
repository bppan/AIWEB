package cn.edu.aicourse.entity;

/**
 * Algorithm entity. @author MyEclipse Persistence Tools
 */

public class Algorithm implements java.io.Serializable {

	// Fields

	private Integer algorithmId;
	private KlgPoint klgPoint;
	private String algorithmName;

	// Constructors

	/** default constructor */
	public Algorithm() {
	}

	/** full constructor */
	public Algorithm(KlgPoint klgPoint, String algorithmName) {
		this.klgPoint = klgPoint;
		this.algorithmName = algorithmName;
	}

	// Property accessors

	public Integer getAlgorithmId() {
		return this.algorithmId;
	}

	public void setAlgorithmId(Integer algorithmId) {
		this.algorithmId = algorithmId;
	}

	public KlgPoint getKlgPoint() {
		return this.klgPoint;
	}

	public void setKlgPoint(KlgPoint klgPoint) {
		this.klgPoint = klgPoint;
	}

	public String getAlgorithmName() {
		return this.algorithmName;
	}

	public void setAlgorithmName(String algorithmName) {
		this.algorithmName = algorithmName;
	}

}