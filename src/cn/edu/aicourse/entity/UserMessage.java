package cn.edu.aicourse.entity;

/**
 * UserMessage entity. @author MyEclipse Persistence Tools
 */

public class UserMessage implements java.io.Serializable {

	// Fields

	private Integer userMessageId;
	private Integer userId;
	private Integer userSex;
	private String userBirthDate;
	private String userGraduateSchool;
	private String userDegree;
	private String userMajor;
	private String userPost;
	private String userCollage;
	private String userJobTitle;
	private String userLaboratory;
	private String userOfficePhone;
	private String userEmail;
	private String userAddress;
	private String userPostcode;
	private String userResume;
	private String userResearchDirection;
	private String userTeachWork;
	private String userAwards;
	private String userBook;
	private String userJob;

	// Constructors

	/** default constructor */
	public UserMessage() {
	}

	/** minimal constructor */
	public UserMessage(String userJobTitle) {
		this.userJobTitle = userJobTitle;
	}

	/** full constructor */
	public UserMessage(Integer userId, Integer userSex, String userBirthDate,
			String userGraduateSchool, String userDegree, String userMajor,
			String userPost, String userCollage, String userJobTitle,
			String userLaboratory, String userOfficePhone, String userEmail,
			String userAddress, String userPostcode, String userResume,
			String userResearchDirection, String userTeachWork,
			String userAwards, String userBook, String userJob) {
		this.userId = userId;
		this.userSex = userSex;
		this.userBirthDate = userBirthDate;
		this.userGraduateSchool = userGraduateSchool;
		this.userDegree = userDegree;
		this.userMajor = userMajor;
		this.userPost = userPost;
		this.userCollage = userCollage;
		this.userJobTitle = userJobTitle;
		this.userLaboratory = userLaboratory;
		this.userOfficePhone = userOfficePhone;
		this.userEmail = userEmail;
		this.userAddress = userAddress;
		this.userPostcode = userPostcode;
		this.userResume = userResume;
		this.userResearchDirection = userResearchDirection;
		this.userTeachWork = userTeachWork;
		this.userAwards = userAwards;
		this.userBook = userBook;
		this.userJob = userJob;
	}

	// Property accessors

	public Integer getUserMessageId() {
		return this.userMessageId;
	}

	public void setUserMessageId(Integer userMessageId) {
		this.userMessageId = userMessageId;
	}

	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getUserSex() {
		return this.userSex;
	}

	public void setUserSex(Integer userSex) {
		this.userSex = userSex;
	}

	public String getUserBirthDate() {
		return this.userBirthDate;
	}

	public void setUserBirthDate(String userBirthDate) {
		this.userBirthDate = userBirthDate;
	}

	public String getUserGraduateSchool() {
		return this.userGraduateSchool;
	}

	public void setUserGraduateSchool(String userGraduateSchool) {
		this.userGraduateSchool = userGraduateSchool;
	}

	public String getUserDegree() {
		return this.userDegree;
	}

	public void setUserDegree(String userDegree) {
		this.userDegree = userDegree;
	}

	public String getUserMajor() {
		return this.userMajor;
	}

	public void setUserMajor(String userMajor) {
		this.userMajor = userMajor;
	}

	public String getUserPost() {
		return this.userPost;
	}

	public void setUserPost(String userPost) {
		this.userPost = userPost;
	}

	public String getUserCollage() {
		return this.userCollage;
	}

	public void setUserCollage(String userCollage) {
		this.userCollage = userCollage;
	}

	public String getUserJobTitle() {
		return this.userJobTitle;
	}

	public void setUserJobTitle(String userJobTitle) {
		this.userJobTitle = userJobTitle;
	}

	public String getUserLaboratory() {
		return this.userLaboratory;
	}

	public void setUserLaboratory(String userLaboratory) {
		this.userLaboratory = userLaboratory;
	}

	public String getUserOfficePhone() {
		return this.userOfficePhone;
	}

	public void setUserOfficePhone(String userOfficePhone) {
		this.userOfficePhone = userOfficePhone;
	}

	public String getUserEmail() {
		return this.userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getUserAddress() {
		return this.userAddress;
	}

	public void setUserAddress(String userAddress) {
		this.userAddress = userAddress;
	}

	public String getUserPostcode() {
		return this.userPostcode;
	}

	public void setUserPostcode(String userPostcode) {
		this.userPostcode = userPostcode;
	}

	public String getUserResume() {
		return this.userResume;
	}

	public void setUserResume(String userResume) {
		this.userResume = userResume;
	}

	public String getUserResearchDirection() {
		return this.userResearchDirection;
	}

	public void setUserResearchDirection(String userResearchDirection) {
		this.userResearchDirection = userResearchDirection;
	}

	public String getUserTeachWork() {
		return this.userTeachWork;
	}

	public void setUserTeachWork(String userTeachWork) {
		this.userTeachWork = userTeachWork;
	}

	public String getUserAwards() {
		return this.userAwards;
	}

	public void setUserAwards(String userAwards) {
		this.userAwards = userAwards;
	}

	public String getUserBook() {
		return this.userBook;
	}

	public void setUserBook(String userBook) {
		this.userBook = userBook;
	}

	public String getUserJob() {
		return this.userJob;
	}

	public void setUserJob(String userJob) {
		this.userJob = userJob;
	}

}