package tjobs;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class TJobsEntity {
	@Id
	@GeneratedValue
	private String MatchedObjectId;
	private String ApplicationDeadline;
	private String PositionTitle;
	private String PositionLocation_CityName;
	private String PositionLocation_CountryName;
	@Column (length = 3000)
	private String TextRequirementDescription;
	@Column (length = 3000)
	private String TextJobDescription;
	private String PublicationEndDate;
	private String PositionSchedule;
	private String PositionURI;
	private String ID;
	private String JobCategory;
	private String PublicationStartDate;
	private String PositionBenefit_Code;
	private String PositionBenefit_Name;
	private String CareerLevel;
	private String PositionID;
	private String ParentOrganizationName;
	


	public String getMatchedObjectId() {
		return MatchedObjectId;
	}



	public void setMatchedObjectId(String matchedObjectId) {
		MatchedObjectId = matchedObjectId;
	}



	public String getApplicationDeadline() {
		return ApplicationDeadline;
	}



	public void setApplicationDeadline(String applicationDeadline) {
		ApplicationDeadline = applicationDeadline;
	}



	public String getPositionTitle() {
		return PositionTitle;
	}



	public void setPositionTitle(String positionTitle) {
		PositionTitle = positionTitle;
	}



	public String getPositionLocation_CityName() {
		return PositionLocation_CityName;
	}



	public void setPositionLocation_CityName(String positionLocation_CityName) {
		PositionLocation_CityName = positionLocation_CityName;
	}



	public String getPositionLocation_CountryName() {
		return PositionLocation_CountryName;
	}



	public void setPositionLocation_CountryName(String positionLocation_CountryName) {
		PositionLocation_CountryName = positionLocation_CountryName;
	}



	public String getTextRequirementDescription() {
		return TextRequirementDescription;
	}



	public void setTextRequirementDescription(String textRequirementDescription) {
		TextRequirementDescription = textRequirementDescription;
	}



	public String getTextJobDescription() {
		return TextJobDescription;
	}



	public void setTextJobDescription(String textJobDescription) {
		TextJobDescription = textJobDescription;
	}



	public String getPublicationEndDate() {
		return PublicationEndDate;
	}



	public void setPublicationEndDate(String publicationEndDate) {
		PublicationEndDate = publicationEndDate;
	}



	public String getPositionSchedule() {
		return PositionSchedule;
	}



	public void setPositionSchedule(String positionSchedule) {
		PositionSchedule = positionSchedule;
	}



	public String getPositionURI() {
		return PositionURI;
	}



	public void setPositionURI(String positionURI) {
		PositionURI = positionURI;
	}



	public String getID() {
		return ID;
	}



	public void setID(String iD) {
		ID = iD;
	}



	public String getJobCategory() {
		return JobCategory;
	}



	public void setJobCategory(String jobCategory) {
		JobCategory = jobCategory;
	}



	public String getPublicationStartDate() {
		return PublicationStartDate;
	}



	public void setPublicationStartDate(String publicationStartDate) {
		PublicationStartDate = publicationStartDate;
	}



	public String getPositionBenefit_Code() {
		return PositionBenefit_Code;
	}



	public void setPositionBenefit_Code(String positionBenefit_Code) {
		PositionBenefit_Code = positionBenefit_Code;
	}



	public String getPositionBenefit_Name() {
		return PositionBenefit_Name;
	}



	public void setPositionBenefit_Name(String positionBenefit_Name) {
		PositionBenefit_Name = positionBenefit_Name;
	}



	public String getCareerLevel() {
		return CareerLevel;
	}



	public void setCareerLevel(String careerLevel) {
		CareerLevel = careerLevel;
	}



	public String getPositionID() {
		return PositionID;
	}



	public void setPositionID(String positionID) {
		PositionID = positionID;
	}



	public String getParentOrganizationName() {
		return ParentOrganizationName;
	}



	public void setParentOrganizationName(String parentOrganizationName) {
		ParentOrganizationName = parentOrganizationName;
	}



	public TJobsEntity(String matchedObjectId, String applicationDeadline, String positionTitle,
			String positionLocation_CityName, String positionLocation_CountryName, String textRequirementDescription,
			String textJobDescription, String publicationEndDate, String positionSchedule, String positionURI,
			String iD, String jobCategory, String publicationStartDate, String positionBenefit_Code,
			String positionBenefit_Name, String careerLevel, String positionID, String parentOrganizationName) {
		super();
		MatchedObjectId = matchedObjectId;
		ApplicationDeadline = applicationDeadline;
		PositionTitle = positionTitle;
		PositionLocation_CityName = positionLocation_CityName;
		PositionLocation_CountryName = positionLocation_CountryName;
		TextRequirementDescription = textRequirementDescription;
		TextJobDescription = textJobDescription;
		PublicationEndDate = publicationEndDate;
		PositionSchedule = positionSchedule;
		PositionURI = positionURI;
		ID = iD;
		JobCategory = jobCategory;
		PublicationStartDate = publicationStartDate;
		PositionBenefit_Code = positionBenefit_Code;
		PositionBenefit_Name = positionBenefit_Name;
		CareerLevel = careerLevel;
		PositionID = positionID;
		ParentOrganizationName = parentOrganizationName;
	}
}
	
	