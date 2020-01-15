package tjobs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import tjobs.entity.jobsEntity;

@Controller
public class SomeController {

	private List<jobsEntity> cash;
	private long lastRefresh = 0;

	@Autowired
	private tjobs.service.JobsService jobsService;

	@RequestMapping("/profile")
	public @ResponseBody String processAJAXRequest(@RequestParam String collum, @RequestParam int row) { // localhost/profile?collum=career_level&row=5
		long nowTime = System.currentTimeMillis();
		if (cash == null || lastRefresh > nowTime - 1000 * 60 * 60) {
			cash = jobsService.getAllJobs();
			lastRefresh = nowTime;
			System.out.println("db cash refreshed !");
		}
		if (collum.equalsIgnoreCase("rows")) {
			return cash.size() + "";
		}
		jobsEntity tmp = cash.get(row);
		StringBuilder sb = new StringBuilder();
		String[] args = collum.split(",");
		System.out.println(collum + "   " + args.length);
		for (int i = 0; i < args.length; i++) {
			if (i != 0) {
				sb.append(",");
			}
			sb.append(getFromJobsEntity(args[i], tmp));
		}
		return sb.toString();
	}

	@RequestMapping("/html")
	public String html() {
		return "html";
	}

	@RequestMapping("/tmp")
	public String dfbfgb() {
		return "tmp";
	}

	private String getFromJobsEntity(String collum, jobsEntity tmp) {//wtf to iste aj v mainController
		if (collum.equalsIgnoreCase("application_deadline")) {
			return tmp.getApplicationDeadline();
		}
		if (collum.equalsIgnoreCase("career_level")) {
			return tmp.getCareerLevel();
		}
		if (collum.equalsIgnoreCase("id")) {
			return tmp.getID();
		}
		if (collum.equalsIgnoreCase("job_category")) {
			return tmp.getJobCategory();
		}
		if (collum.equalsIgnoreCase("matched_object_id")) {
			return tmp.getMatchedObjectId();
		}
		if (collum.equalsIgnoreCase("parent_organization_name")) {
			return tmp.getParentOrganizationName();
		}
		if (collum.equalsIgnoreCase("position_benefit_code")) {
			return tmp.getPositionBenefit_Code();
		}
		if (collum.equalsIgnoreCase("position_benefit_name")) {
			return tmp.getPositionBenefit_Name();
		}
		if (collum.equalsIgnoreCase("positionid")) {
			return tmp.getPositionID();
		}
		if (collum.equalsIgnoreCase("position_location_city_name")) {
			return tmp.getPositionLocation_CityName();
		}
		if (collum.equalsIgnoreCase("position_location_country_name")) {
			return tmp.getPositionLocation_CountryName();
		}
		if (collum.equalsIgnoreCase("position_schedule")) {
			return tmp.getPositionSchedule();
		}
		if (collum.equalsIgnoreCase("position_title")) {
			return tmp.getPositionTitle();
		}
		if (collum.equalsIgnoreCase("positionuri")) {
			return tmp.getPositionURI();
		}
		if (collum.equalsIgnoreCase("publication_end_date")) {
			return tmp.getPublicationEndDate();
		}
		if (collum.equalsIgnoreCase("publication_start_date")) {
			return tmp.getPublicationStartDate();
		}
//		if (collum.equalsIgnoreCase("")) {
//			return tmp.get();
//		}
		return "null";
	}

}