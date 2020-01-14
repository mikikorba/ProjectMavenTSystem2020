package tjobs.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import com.google.gson.JsonObject;

@Entity
public class jobsEntity {
	@Id
	@GeneratedValue
	private int ident;

	private String MatchedObjectId = "";
	private String ApplicationDeadline = "";
	private String PositionTitle = "";
	private String PositionLocation_CityName = "";
	private String PositionLocation_CountryName = "";
//	private String TextRequirementDescription = ""; // html
//	private String TextJobDescription = ""; // html
	private String PublicationEndDate = "";
	private String PositionSchedule = "";
	private String PositionURI = "";
	private String ID = "";
	private String JobCategory = "";
	private String PublicationStartDate = "";
	private String PositionBenefit_Code = "";
	private String PositionBenefit_Name = "";
	private String CareerLevel = "";
	private String PositionID = "";
	private String ParentOrganizationName = "";

	public jobsEntity() {
	}

	public jobsEntity(JsonObject mehelo) {
		MatchedObjectId = mehelo.get("MatchedObjectId").toString();
		JsonObject tmp = mehelo.get("MatchedObjectDescriptor").getAsJsonObject();
//		ApplicationDeadline = tmp.get("ApplicationDeadline").toString();
//		System.out.println(tmp.get("ApplicationDeadline").toString());
//		ApplicationDeadline = tmp.get("ApplicationDeadline").toString();// there is some nullPointerExeptions TODO make it work
		PositionTitle = tmp.get("PositionTitle").toString();
		if (tmp.get("PositionLocation").getAsJsonArray().size() > 0) {
			JsonObject tmpLocation = tmp.get("PositionLocation").getAsJsonArray().get(0).getAsJsonObject();
			PositionLocation_CityName = tmpLocation.get("CityName").toString();
			PositionLocation_CountryName = tmpLocation.get("CountryName").toString();
		}
//		JsonObject tmpUserArea = tmp.get("UserArea").getAsJsonObject();
//		TextRequirementDescription = tmpUserArea.get("TextRequirementDescription").toString();
//		TextJobDescription = tmpUserArea.get("TextJobDescription").toString();
		PublicationEndDate = tmp.get("PublicationEndDate").toString();
		if (tmp.get("PositionSchedule").getAsJsonArray().size() > 0) {
			JsonObject tmpPositionSchedule = tmp.get("PositionSchedule").getAsJsonArray().get(0).getAsJsonObject();
			PositionSchedule = tmpPositionSchedule.get("Name").toString();
		}
		PositionURI = tmp.get("PositionURI").toString();
		ID = tmp.get("ID").toString();
		if (tmp.get("JobCategory").getAsJsonArray().size() > 0) {
			JsonObject tmpJobCategory = tmp.get("JobCategory").getAsJsonArray().get(0).getAsJsonObject();
			JobCategory = tmpJobCategory.get("Name").toString();
		}
		PublicationStartDate = tmp.get("PublicationStartDate").toString();
		if (tmp.get("PositionBenefit").getAsJsonArray().size() > 0) {
			JsonObject tmpPositionBenefit = tmp.get("PositionBenefit").getAsJsonArray().get(0).getAsJsonObject();
			PositionBenefit_Code = tmpPositionBenefit.get("Code").toString();
			PositionBenefit_Name = tmpPositionBenefit.get("Name").toString();
		}
		if (tmp.get("CareerLevel").getAsJsonArray().size() > 0) {
			JsonObject tmpCareerLevel = tmp.get("CareerLevel").getAsJsonArray().get(0).getAsJsonObject();
			CareerLevel = tmpCareerLevel.get("Name").toString();
		}
		PositionID = tmp.get("PositionID").toString();
		ParentOrganizationName = tmp.get("ParentOrganizationName").toString();

		MatchedObjectId = clear(MatchedObjectId);
		ApplicationDeadline = clear(ApplicationDeadline);
		PositionTitle = clear(PositionTitle);
		PositionLocation_CityName = clear(PositionLocation_CityName);
		PositionLocation_CountryName = clear(PositionLocation_CountryName);
//		 TextRequirementDescription=clear(TextRequirementDescription);
//		 TextJobDescription=clear(TextJobDescription);
		PublicationEndDate = clear(PublicationEndDate);
		PositionSchedule = clear(PositionSchedule);
		PositionURI = clear(PositionURI);
		ID = clear(ID);
		JobCategory = clear(JobCategory);
		PublicationStartDate = clear(PublicationStartDate);
		PositionBenefit_Code = clear(PositionBenefit_Code);
		PositionBenefit_Name = clear(PositionBenefit_Name);
		CareerLevel = clear(CareerLevel);
		PositionID = clear(PositionID);
		ParentOrganizationName = clear(ParentOrganizationName);

	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("MatchedObjectId : " + MatchedObjectId + "\r\n");
		sb.append("ApplicationDeadline : " + ApplicationDeadline + "\r\n");
		sb.append("PositionTitle : " + PositionTitle + "\r\n");
		sb.append("PositionLocation_CityName : " + PositionLocation_CityName + "\r\n");
		sb.append("PositionLocation_CountryName : " + PositionLocation_CountryName + "\r\n");
//		sb.append("TextRequirementDescription : " + TextRequirementDescription + "\r\n");
//		sb.append("TextJobDescription : " + TextJobDescription + "\r\n");
		sb.append("PublicationEndDate : " + PublicationEndDate + "\r\n");
		sb.append("PositionSchedule : " + PositionSchedule + "\r\n");
		sb.append("PositionURI : " + PositionURI + "\r\n");
		sb.append("ID : " + ID + "\r\n");
		sb.append("JobCategory : " + JobCategory + "\r\n");
		sb.append("PublicationStartDate : " + PublicationStartDate + "\r\n");
		sb.append("PositionBenefit_Code : " + PositionBenefit_Code + "\r\n");
		sb.append("PositionBenefit_Name : " + PositionBenefit_Name + "\r\n");
		sb.append("CareerLevel : " + CareerLevel + "\r\n");
		sb.append("PositionID : " + PositionID + "\r\n");
		sb.append("ParentOrganizationName : " + ParentOrganizationName + "\r\n");
		return sb.toString();
	}

	private String clear(String s) {
		if (s.isEmpty()) {
			return "";
		}
		return s.substring(1, s.length() - 1);
	}

	public int getIdent() {
		return ident;
	}

	public void setIdent(int ident) {
		this.ident = ident;
	}

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

}
