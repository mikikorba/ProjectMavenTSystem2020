package tjobs.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import tjobs.entity.jobsEntity;
import tjobs.utils.Hash;
import tjobs.utils.qrCodeGen;

@Controller
public class MasterController {

	private static final boolean DEBUG = false;
	private static long dbLastRefresh = 0;

//	@Autowired
//	private ServletContext servletContext;

	@Autowired
	private tjobs.service.JobsService jobsService;

	@RequestMapping("")
	public String index() {
		return refreshDB() ? "loading" : "mainpage";
	}

	private boolean refreshDB() {
		long nowTime = System.currentTimeMillis();
		if (dbLastRefresh < nowTime - 1000 * 60 * 60) {
			dbLastRefresh = nowTime;
			new Thread(new Runnable() {
				@Override
				public void run() {
					List<jobsEntity> inDatabase = jobsService.getAllJobs();
					List<jobsEntity> addToDatabase = new ArrayList<>();
					addToDB_IfNotExist(inDatabase, addToDatabase);
					regenQRcodes(inDatabase);
				}

			}).start();
			return true;
		}
		return false;
	}

	private void addToDB_IfNotExist(List<jobsEntity> inDatabase, List<jobsEntity> addToDatabase) {
		boolean executeAdding = true;
		try {
			JsonArray tmp = getAsJsonArray();
			for (int i = 0; i < tmp.size(); i++) {
				addToDatabase.add(new jobsEntity(tmp.get(i).getAsJsonObject()));
			}
			if (addToDatabase.isEmpty()) {
				executeAdding = false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			executeAdding = false;
		}
		if (executeAdding) {
			for (jobsEntity je : addToDatabase) {
				boolean add = true;
				for (jobsEntity dat : inDatabase) {
					if (je.getID().equals(dat.getID())) {
						add = false;
					}
				}
				if (add) {
					jobsService.addComment(je);
					if (DEBUG) {
						System.out.println("ADDED: |ID:" + je.getID() + " |IDENT:" + je.getIdent());
					}
				}
			}
		}
	}

	private void regenQRcodes(List<jobsEntity> inDatabase) {
		boolean isLinux = java.lang.System.getProperties().getProperty("os.name").equalsIgnoreCase("linux");
		String prefix = "src/main/resources/static/qrCodes/";
		if (isLinux) {
			prefix = "/usr/local/tomcat/webapps/team2/WEB-INF/classes/static/qrCodes/";
		}
		File f = new File(prefix);
		if (f.exists()) {
			File[] tmp = f.getAbsoluteFile().listFiles();
			for (File file : tmp) {
				file.delete();
			}
			f.delete();
		}
		f.mkdirs();
		for (jobsEntity je : inDatabase) {
			qrCodeGen.qrFromURLtoFile("https://t-systems.jobs/global-careers-en/" + je.getPositionURI(), 1000,
					prefix + Hash.fingerprintString(je.getPositionURI()) + ".png");
		}
	}

	private JsonArray getAsJsonArray() throws MalformedURLException, IOException {// MalformedURLException what to do
																					// with this
		String quarry = "{\"JobadID\":\"\",\"LanguageCode\":\"2\",\"SearchParameters\":{\"FirstItem\":1,\"CountItem\":50,\"Sort\":[{\"Criterion\":\"FavoriteJobIndicator\",\"Direction\":\"DESC\"}],\"MatchedObjectDescriptor\":[\"ID\",\"RelevanceRank\",\"PositionID\",\"PositionTitle\",\"ParentOrganization\",\"ParentOrganizationName\",\"PositionURI\",\"PositionLocation.CountryName\",\"PositionLocation.CountrySubDivisionName\",\"PositionLocation.CityName\",\"PositionLocation.Longitude\",\"PositionLocation.Latitude\",\"PositionIndustry.Name\",\"JobCategory.Name\",\"CareerLevel.Name\",\"PositionSchedule.Name\",\"PublicationStartDate\",\"UserArea.TextWorkingHoursPerWeek\",\"PublicationEndDate\",\"ApplicationDeadline\",\"UserArea.TextRequiredWorkExperience\",\"UserArea.TextTravel\",\"UserArea.TextRequiredLanguageSkills\",\"UserArea.TextJobDescription\",\"UserArea.TextRequirementDescription\",\"PositionBenefit.Code\",\"PositionBenefit.Name\",\"FavoriteJobIndicator\",\"FavoriteJobIndicatorName\",\"PositionStartDate\",\"Partnerhochschule\"]},\"SearchCriteria\":[{\"CriterionName\":\"PositionLocation.Latitude\",\"CriterionValue\":[\"48.7163857\"]},{\"CriterionName\":\"PositionLocation.Longitude\",\"CriterionValue\":[\"21.2610746\"]},{\"CriterionName\":\"PositionLocation.Distance\",\"CriterionValue\":[\"13.975119302957982\"]},{\"CriterionName\":\"PositionLocation.CountryCode\",\"CriterionValue\":[\"SK\"]},{\"CriterionName\":\"PositionLocation.AreaCode\",\"CriterionValue\":[\"SK\"]},{\"CriterionName\":\"ParentOrganization\",\"CriterionValue\":[\"1070\",\"1099\",\"1104\",\"1158\",\"2922\",\"1165\",\"1175\",\"1176\",\"1207\",\"1234\",\"1235\",\"1236\",\"1237\",\"1238\",\"1239\",\"1240\",\"1241\",\"1242\",\"1243\",\"1244\",\"1245\",\"1246\",\"1247\",\"1248\",\"1249\",\"7834\",\"7814\",\"1250\",\"1251\",\"1252\",\"1253\",\"1254\",\"1255\",\"1256\",\"1257\",\"1258\",\"1259\",\"2923\",\"1260\",\"1261\",\"1262\",\"1263\",\"1264\",\"1265\",\"2924\",\"1268\",\"1269\",\"2925\",\"2926\",\"1273\",\"1274\",\"1275\",\"1276\",\"2927\",\"5460\",\"1278\",\"1279\",\"1280\",\"1281\",\"1282\",\"1283\"]},{\"CriterionName\":\"PositionLocation.City\",\"CriterionValue\":[\"KoÅ¡ice, Slovakia\"]},{\"CriterionName\":\"PositionLocation.Country\",\"CriterionValue\":[\"29\"]},{\"CriterionName\":\"CareerLevel.Code\",\"CriterionValue\":[\"2\",\"5\",\"7\"]}]}";
		String json = getJson(new URL("https://t-systems.jobs/globaljobboard_api/v3/search/"), quarry);
		Gson gs = new Gson();
		JsonObject jsonObject = gs.fromJson(json, JsonObject.class);
		JsonArray lol = jsonObject.get("SearchResult").getAsJsonObject().get("SearchResultItems").getAsJsonArray();
		return lol;
	}

	private String getJson(URL url, String quarry) throws IOException {
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
