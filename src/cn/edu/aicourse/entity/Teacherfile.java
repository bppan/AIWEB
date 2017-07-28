package cn.edu.aicourse.entity;

import java.sql.Timestamp;

/**
 * Teacherfile entity. @author MyEclipse Persistence Tools
 */

public class Teacherfile implements java.io.Serializable {

	// Fields

	private Integer fileId;
	private String fileName;
	private String filePath;
	private Long fileSize;
	private Timestamp fileOnlineTime;
	private Integer userId;
	private Integer fileDownLoadTimes;

	// Constructors

	/** default constructor */
	public Teacherfile() {
	}

	/** full constructor */
	public Teacherfile(String fileName, String filePath, Long fileSize,
			Timestamp fileOnlineTime, Integer userId, Integer fileDownLoadTimes) {
		this.fileName = fileName;
		this.filePath = filePath;
		this.fileSize = fileSize;
		this.fileOnlineTime = fileOnlineTime;
		this.userId = userId;
		this.fileDownLoadTimes = fileDownLoadTimes;
	}

	// Property accessors

	public Integer getFileId() {
		return this.fileId;
	}

	public void setFileId(Integer fileId) {
		this.fileId = fileId;
	}

	public String getFileName() {
		return this.fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFilePath() {
		return this.filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public Long getFileSize() {
		return this.fileSize;
	}

	public void setFileSize(Long fileSize) {
		this.fileSize = fileSize;
	}

	public Timestamp getFileOnlineTime() {
		return this.fileOnlineTime;
	}

	public void setFileOnlineTime(Timestamp fileOnlineTime) {
		this.fileOnlineTime = fileOnlineTime;
	}

	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getFileDownLoadTimes() {
		return this.fileDownLoadTimes;
	}

	public void setFileDownLoadTimes(Integer fileDownLoadTimes) {
		this.fileDownLoadTimes = fileDownLoadTimes;
	}

}