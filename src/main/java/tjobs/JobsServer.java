package tjobs;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

@SpringBootApplication
@Configuration
public class JobsServer {

	public static void main(String[] args) {
		SpringApplication.run(JobsServer.class, args);
		try {
			refreshDatabase();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static List<TJobsEntity> items = new ArrayList<>();
	private static TJobsEntity tmp;

	public static void refreshDatabase() throws Exception {
		String quarry = "{\"JobadID\":\"\",\"LanguageCode\":\"2\",\"SearchParameters\":{\"FirstItem\":1,\"CountItem\":50,\"Sort\":[{\"Criterion\":\"FavoriteJobIndicator\",\"Direction\":\"DESC\"}],\"MatchedObjectDescriptor\":[\"ID\",\"RelevanceRank\",\"PositionID\",\"PositionTitle\",\"ParentOrganization\",\"ParentOrganizationName\",\"PositionURI\",\"PositionLocation.CountryName\",\"PositionLocation.CountrySubDivisionName\",\"PositionLocation.CityName\",\"PositionLocation.Longitude\",\"PositionLocation.Latitude\",\"PositionIndustry.Name\",\"JobCategory.Name\",\"CareerLevel.Name\",\"PositionSchedule.Name\",\"PublicationStartDate\",\"UserArea.TextWorkingHoursPerWeek\",\"PublicationEndDate\",\"ApplicationDeadline\",\"UserArea.TextRequiredWorkExperience\",\"UserArea.TextTravel\",\"UserArea.TextRequiredLanguageSkills\",\"UserArea.TextJobDescription\",\"UserArea.TextRequirementDescription\",\"PositionBenefit.Code\",\"PositionBenefit.Name\",\"FavoriteJobIndicator\",\"FavoriteJobIndicatorName\",\"PositionStartDate\",\"Partnerhochschule\"]},\"SearchCriteria\":[{\"CriterionName\":\"PositionLocation.Latitude\",\"CriterionValue\":[\"48.7163857\"]},{\"CriterionName\":\"PositionLocation.Longitude\",\"CriterionValue\":[\"21.2610746\"]},{\"CriterionName\":\"PositionLocation.Distance\",\"CriterionValue\":[\"13.975119302957982\"]},{\"CriterionName\":\"PositionLocation.CountryCode\",\"CriterionValue\":[\"SK\"]},{\"CriterionName\":\"PositionLocation.AreaCode\",\"CriterionValue\":[\"SK\"]},{\"CriterionName\":\"ParentOrganization\",\"CriterionValue\":[\"5460\",\"1278\"]},{\"CriterionName\":\"PositionLocation.City\",\"CriterionValue\":[\"Ko�ice, Slovakia\"]},{\"CriterionName\":\"PositionLocation.Country\",\"CriterionValue\":[\"29\"]}]}";
		String json = getJson(new URL("https://t-systems.jobs/globaljobboard_api/v3/search/"), quarry);
		Gson gs = new Gson();
		JsonObject jsonObject = gs.fromJson(json, JsonObject.class);

		JsonArray lol = jsonObject.get("SearchResult").getAsJsonObject().get("SearchResultItems").getAsJsonArray();
		for (int i = 0; i < lol.size(); i++) {
			JsonObject mehelo = lol.get(i).getAsJsonObject();
			tmp = new TJobsEntity(mehelo);
			System.out.println(tmp);
			items.add(tmp);
		}

	}

	private static String getJson(URL url, String quarry) throws Exception {
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.setRequestMethod("POST");
		connection.setRequestProperty("Content-Type", "application/json; utf-8");
		connection.setRequestProperty("Accept", "application/json");
		connection.setDoOutput(true);
		OutputStream out = connection.getOutputStream();
		byte[] input = quarry.getBytes("utf-8");
		out.write(input, 0, input.length);
		BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));
		StringBuilder response = new StringBuilder();
		String responseLine = null;
		while ((responseLine = reader.readLine()) != null) {
			response.append(responseLine.trim());
		}
		String output = response.toString();
		out.close();
		reader.close();

		return output;
	}

}
