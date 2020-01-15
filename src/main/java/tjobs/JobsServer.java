package tjobs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@Configuration
public class JobsServer {

	public static void main(String[] args) {
		SpringApplication.run(JobsServer.class, args);
		try {
			Runtime rt = Runtime.getRuntime();
			Process pr = rt.exec("\"C:\\Program Files\\Mozilla Firefox\\firefox.exe\" localhost:8080/refreshdb");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
