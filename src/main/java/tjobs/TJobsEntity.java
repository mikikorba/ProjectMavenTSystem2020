package tjobs;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class TJobsEntity {
	@Id
	@GeneratedValue
	private int JobID;
	private String JobTitle;
	private String Location;
	private String JobLevel;
	private String EmploymentType;
	private String ApplicationDeadline;
	private String Benefits;
	@Column (length = 3000)
	private String YourTask;
	@Column (length = 3000)
	private String YourProfile;
	private String timeAdded;
	
	
	public int getJobID() {
		return JobID; 
	}


	public void setJobID(int jobID) {
		JobID = jobID;
	}


	public String getJobTitle() {
		return JobTitle;
	}


	public void setJobTitle(String jobTitle) {
		JobTitle = jobTitle;
	}


	public String getLocation() {
		return Location;
	}


	public void setLocation(String location) {
		Location = location;
	}


	public String getJobLevel() {
		return JobLevel;
	}


	public void setJobLevel(String jobLevel) {
		JobLevel = jobLevel;
	}


	public String getEmploymentType() {
		return EmploymentType;
	}


	public void setEmploymentType(String employmentType) {
		EmploymentType = employmentType;
	}


	public String getApplicationDeadline() {
		return ApplicationDeadline;
	}


	public void setApplicationDeadline(String applicationDeadline) {
		ApplicationDeadline = applicationDeadline;
	}


	public String getBenefits() {
		return Benefits;
	}


	public void setBenefits(String benefits) {
		Benefits = benefits;
	}


	public String getYourTask() {
		return YourTask;
	}


	public void setYourTask(String yourTask) {
		YourTask = yourTask;
	}


	public String getYourProfile() {
		return YourProfile;
	}


	public void setYourProfile(String yourProfile) {
		YourProfile = yourProfile;
	}


	public String getTimeAdded() {
		return timeAdded;
	}


	public void setTimeAdded(String timeAdded) {
		this.timeAdded = timeAdded;
	}


	public TJobsEntity(int jobID, String jobTitle, String location, String jobLevel, String employmentType,
			String applicationDeadline, String benefits, String yourTask, String yourProfile, String timeAdded) {
		super();
		JobID = jobID;
		JobTitle = jobTitle;
		Location = location;
		JobLevel = jobLevel;
		EmploymentType = employmentType;
		ApplicationDeadline = applicationDeadline;
		Benefits = benefits;
		YourTask = yourTask;
		YourProfile = yourProfile;
		this.timeAdded = timeAdded;
	}


 

 

}