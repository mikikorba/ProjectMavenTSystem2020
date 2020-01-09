package tjobs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;


@SpringBootApplication
@Configuration
public class JobsServer {

	public static void main(String[] args) {
		 SpringApplication.run(JobsServer.class, args);
	}

}
